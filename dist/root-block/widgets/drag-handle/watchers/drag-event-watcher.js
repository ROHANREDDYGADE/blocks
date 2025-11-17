import { EMBED_CARD_HEIGHT, EMBED_CARD_WIDTH, } from '@blocksuite/affine-shared/consts';
import { DndApiExtensionIdentifier, DocModeProvider, TelemetryProvider, } from '@blocksuite/affine-shared/services';
import { captureEventTarget, getBlockComponentsExcludeSubtrees, getClosestBlockComponentByPoint, matchFlavours, } from '@blocksuite/affine-shared/utils';
import { isGfxBlockComponent, } from '@blocksuite/block-std';
import { GfxControllerIdentifier } from '@blocksuite/block-std/gfx';
import { Bound, Point } from '@blocksuite/global/utils';
import { Job, Slice } from '@blocksuite/store';
import { HtmlAdapter, MarkdownAdapter, } from '../../../../_common/adapters/index.js';
import { calcDropTarget, } from '../../../../_common/utils/index.js';
import { addNoteAtPoint } from '../../../edgeless/utils/common.js';
import { DropIndicator } from '../components/drop-indicator.js';
import { AFFINE_DRAG_HANDLE_WIDGET } from '../consts.js';
import { newIdCrossDoc } from '../middleware/new-id-cross-doc.js';
import { surfaceRefToEmbed } from '../middleware/surface-ref-to-embed.js';
import { containBlock, includeTextSelection } from '../utils.js';
export class DragEventWatcher {
    get _dndAPI() {
        return this._std.get(DndApiExtensionIdentifier);
    }
    get _std() {
        return this.widget.std;
    }
    constructor(widget) {
        this.widget = widget;
        this._computeEdgelessBound = (x, y, width, height) => {
            const controller = this._std.get(GfxControllerIdentifier);
            const border = 2;
            const noteScale = this.widget.noteScale.peek();
            const { viewport } = controller;
            const { left: viewportLeft, top: viewportTop } = viewport;
            const currentViewBound = new Bound(x - viewportLeft, y - viewportTop, width + border / noteScale, height + border / noteScale);
            const currentModelBound = viewport.toModelBound(currentViewBound);
            return new Bound(currentModelBound.x, currentModelBound.y, width * noteScale, height * noteScale);
        };
        this._createDropIndicator = () => {
            if (!this.widget.dropIndicator) {
                this.widget.dropIndicator = new DropIndicator();
                this.widget.rootComponent.append(this.widget.dropIndicator);
            }
        };
        this._dragEndHandler = () => {
            this.widget.clearRaf();
            this.widget.hide(true);
        };
        this._dragMoveHandler = ctx => {
            if (this.widget.isHoverDragHandleVisible ||
                this.widget.isTopLevelDragHandleVisible) {
                this.widget.hide();
            }
            if (!this.widget.dragging || this.widget.draggingElements.length === 0) {
                return false;
            }
            ctx.get('defaultState').event.preventDefault();
            const state = ctx.get('dndState');
            // call default drag move handler if no option return true
            return this._onDragMove(state);
        };
        /**
         * When start dragging, should set dragging elements and create drag preview
         */
        this._dragStartHandler = ctx => {
            const state = ctx.get('dndState');
            // If not click left button to start dragging, should do nothing
            const { button } = state.raw;
            if (button !== 0) {
                return false;
            }
            return this._onDragStart(state);
        };
        this._dropHandler = (context) => {
            this._onDrop(context);
            this._std.selection.setGroup('gfx', []);
            this.widget.clearRaf();
            this.widget.hide(true);
        };
        this._onDragMove = (state) => {
            this.widget.clearRaf();
            this.widget.rafID = requestAnimationFrame(() => {
                this.widget.edgelessWatcher.updateDragPreviewPosition(state);
                this.widget.updateDropIndicator(state, true);
            });
            return true;
        };
        this._onDragStart = (state) => {
            // Get current hover block element by path
            const hoverBlock = this.widget.anchorBlockComponent.peek();
            if (!hoverBlock)
                return false;
            const element = captureEventTarget(state.raw.target);
            const dragByHandle = !!element?.closest(AFFINE_DRAG_HANDLE_WIDGET);
            const isInSurface = isGfxBlockComponent(hoverBlock);
            if (isInSurface && dragByHandle) {
                this._startDragging([hoverBlock], state);
                return true;
            }
            const selectBlockAndStartDragging = () => {
                this._std.selection.setGroup('note', [
                    this._std.selection.create('block', {
                        blockId: hoverBlock.blockId,
                    }),
                ]);
                this._startDragging([hoverBlock], state);
            };
            if (this.widget.draggingElements.length === 0) {
                const dragByBlock = hoverBlock.contains(element) && !hoverBlock.model.text;
                const canDragByBlock = matchFlavours(hoverBlock.model, [
                    'affine:attachment',
                    'affine:bookmark',
                ]) || hoverBlock.model.flavour.startsWith('affine:embed-');
                if (!isInSurface && dragByBlock && canDragByBlock) {
                    selectBlockAndStartDragging();
                    return true;
                }
            }
            // Should only start dragging when pointer down on drag handle
            // And current mouse button is left button
            if (!dragByHandle) {
                this.widget.hide();
                return false;
            }
            if (this.widget.draggingElements.length === 1) {
                if (!isInSurface) {
                    selectBlockAndStartDragging();
                    return true;
                }
            }
            if (!this.widget.isHoverDragHandleVisible)
                return false;
            let selections = this.widget.selectionHelper.selectedBlocks;
            // When current selection is TextSelection
            // Should set BlockSelection for the blocks in native range
            if (selections.length > 0 && includeTextSelection(selections)) {
                const nativeSelection = document.getSelection();
                const rangeManager = this._std.range;
                if (nativeSelection && nativeSelection.rangeCount > 0 && rangeManager) {
                    const range = nativeSelection.getRangeAt(0);
                    const blocks = rangeManager.getSelectedBlockComponentsByRange(range, {
                        match: el => el.model.role === 'content',
                        mode: 'highest',
                    });
                    this.widget.selectionHelper.setSelectedBlocks(blocks);
                    selections = this.widget.selectionHelper.selectedBlocks;
                }
            }
            // When there is no selected blocks
            // Or selected blocks not including current hover block
            // Set current hover block as selected
            if (selections.length === 0 ||
                !containBlock(selections.map(selection => selection.blockId), this.widget.anchorBlockId.peek())) {
                const block = this.widget.anchorBlockComponent.peek();
                if (block) {
                    this.widget.selectionHelper.setSelectedBlocks([block]);
                }
            }
            const blocks = this.widget.selectionHelper.selectedBlockComponents;
            // This could be skipped if we can ensure that all selected blocks are on the same level
            // Which means not selecting parent block and child block at the same time
            const blocksExcludingChildren = getBlockComponentsExcludeSubtrees(blocks);
            if (blocksExcludingChildren.length === 0)
                return false;
            this._startDragging(blocksExcludingChildren, state);
            this.widget.hide();
            return true;
        };
        this._onDrop = (context) => {
            const state = context.get('dndState');
            const event = state.raw;
            const { clientX, clientY } = event;
            const point = new Point(clientX, clientY);
            const element = getClosestBlockComponentByPoint(point.clone());
            if (!element) {
                const target = captureEventTarget(event.target);
                const isEdgelessContainer = target?.classList.contains('edgeless-container');
                if (!isEdgelessContainer)
                    return;
                // drop to edgeless container
                this._onDropOnEdgelessCanvas(context);
                return;
            }
            const model = element.model;
            const parent = this._std.doc.getParent(model.id);
            if (!parent)
                return;
            if (matchFlavours(parent, ['affine:surface'])) {
                return;
            }
            const result = calcDropTarget(point, model, element);
            if (!result)
                return;
            const index = parent.children.indexOf(model) + (result.type === 'before' ? 0 : 1);
            event.preventDefault();
            if (matchFlavours(parent, ['affine:note'])) {
                const snapshot = this._deserializeSnapshot(state);
                if (snapshot) {
                    const [first] = snapshot.content;
                    if (first.flavour === 'affine:note') {
                        if (parent.id !== first.id) {
                            this._onDropNoteOnNote(snapshot, parent.id, index);
                        }
                        return;
                    }
                }
            }
            this._deserializeData(state, parent.id, index).catch(console.error);
        };
        this._onDropNoteOnNote = (snapshot, parent, index) => {
            const [first] = snapshot.content;
            const id = first.id;
            const std = this._std;
            const job = this._getJob();
            const snapshotWithoutNote = {
                ...snapshot,
                content: first.children,
            };
            job
                .snapshotToSlice(snapshotWithoutNote, std.doc, parent, index)
                .then(() => {
                const block = std.doc.getBlock(id)?.model;
                if (block) {
                    std.doc.deleteBlock(block);
                }
            })
                .catch(console.error);
        };
        this._onDropOnEdgelessCanvas = (context) => {
            const state = context.get('dndState');
            // If drop a note, should do nothing
            const snapshot = this._deserializeSnapshot(state);
            const edgelessRoot = this.widget
                .rootComponent;
            if (!snapshot) {
                return;
            }
            const [first] = snapshot.content;
            if (first.flavour === 'affine:note')
                return;
            if (snapshot.content.length === 1) {
                const importToSurface = (width, height, newBound) => {
                    first.props.xywh = newBound.serialize();
                    first.props.width = width;
                    first.props.height = height;
                    const std = this._std;
                    const job = this._getJob();
                    job
                        .snapshotToSlice(snapshot, std.doc, edgelessRoot.surfaceBlockModel.id)
                        .catch(console.error);
                };
                if (['affine:attachment', 'affine:bookmark'].includes(first.flavour) ||
                    first.flavour.startsWith('affine:embed-')) {
                    const style = (first.props.style ?? 'horizontal');
                    const width = EMBED_CARD_WIDTH[style];
                    const height = EMBED_CARD_HEIGHT[style];
                    const newBound = this._computeEdgelessBound(state.raw.clientX, state.raw.clientY, width, height);
                    if (!newBound)
                        return;
                    if (first.flavour === 'affine:embed-linked-doc') {
                        this._trackLinkedDocCreated(first.id);
                    }
                    importToSurface(width, height, newBound);
                    return;
                }
                if (first.flavour === 'affine:image') {
                    const noteScale = this.widget.noteScale.peek();
                    const width = Number(first.props.width || 100) * noteScale;
                    const height = Number(first.props.height || 100) * noteScale;
                    const newBound = this._computeEdgelessBound(state.raw.clientX, state.raw.clientY, width, height);
                    if (!newBound)
                        return;
                    importToSurface(width, height, newBound);
                    return;
                }
            }
            const { left: viewportLeft, top: viewportTop } = edgelessRoot.viewport;
            const newNoteId = addNoteAtPoint(edgelessRoot.std, new Point(state.raw.x - viewportLeft, state.raw.y - viewportTop), {
                scale: this.widget.noteScale.peek(),
            });
            const newNoteBlock = this.widget.doc.getBlock(newNoteId)?.model;
            if (!newNoteBlock)
                return;
            const bound = Bound.deserialize(newNoteBlock.xywh);
            bound.h *= this.widget.noteScale.peek();
            bound.w *= this.widget.noteScale.peek();
            this.widget.doc.updateBlock(newNoteBlock, {
                xywh: bound.serialize(),
                edgeless: {
                    ...newNoteBlock.edgeless,
                    scale: this.widget.noteScale.peek(),
                },
            });
            this._deserializeData(state, newNoteId).catch(console.error);
        };
        this._startDragging = (blocks, state, dragPreviewEl, dragPreviewOffset) => {
            if (!blocks.length) {
                return;
            }
            this.widget.draggingElements = blocks;
            this.widget.dragPreview = this.widget.previewHelper.createDragPreview(blocks, state, dragPreviewEl, dragPreviewOffset);
            const slice = Slice.fromModels(this._std.doc, blocks.map(block => block.model));
            this.widget.dragging = true;
            this._createDropIndicator();
            this.widget.hide();
            this._serializeData(slice, state);
        };
        this._trackLinkedDocCreated = (id) => {
            const isNewBlock = !this._std.doc.hasBlock(id);
            if (!isNewBlock) {
                return;
            }
            const mode = this._std.getOptional(DocModeProvider)?.getEditorMode() ?? 'page';
            const telemetryService = this._std.getOptional(TelemetryProvider);
            telemetryService?.track('LinkedDocCreated', {
                control: `drop on ${mode}`,
                module: 'drag and drop',
                type: 'doc',
                other: 'new doc',
            });
        };
    }
    async _deserializeData(state, parent, index) {
        try {
            const dataTransfer = state.raw.dataTransfer;
            if (!dataTransfer)
                throw new Error('No data transfer');
            const std = this._std;
            const job = this._getJob();
            const snapshot = this._deserializeSnapshot(state);
            if (snapshot) {
                if (snapshot.content.length === 1) {
                    const [first] = snapshot.content;
                    if (first.flavour === 'affine:embed-linked-doc') {
                        this._trackLinkedDocCreated(first.id);
                    }
                }
                // use snapshot
                const slice = await job.snapshotToSlice(snapshot, std.doc, parent, index);
                return slice;
            }
            const html = dataTransfer.getData('text/html');
            if (html) {
                // use html parser;
                const htmlAdapter = new HtmlAdapter(job);
                const slice = await htmlAdapter.toSlice({ file: html }, std.doc, parent, index);
                return slice;
            }
            const text = dataTransfer.getData('text/plain');
            const textAdapter = new MarkdownAdapter(job);
            const slice = await textAdapter.toSlice({ file: text }, std.doc, parent, index);
            return slice;
        }
        catch {
            return null;
        }
    }
    _deserializeSnapshot(state) {
        try {
            const dataTransfer = state.raw.dataTransfer;
            if (!dataTransfer)
                throw new Error('No data transfer');
            const data = dataTransfer.getData(this._dndAPI.mimeType);
            const snapshot = this._dndAPI.decodeSnapshot(data);
            return snapshot;
        }
        catch {
            return null;
        }
    }
    _getJob() {
        const std = this._std;
        return new Job({
            collection: std.collection,
            middlewares: [newIdCrossDoc(std), surfaceRefToEmbed(std)],
        });
    }
    _serializeData(slice, state) {
        const dataTransfer = state.raw.dataTransfer;
        if (!dataTransfer)
            return;
        const job = this._getJob();
        const snapshot = job.sliceToSnapshot(slice);
        if (!snapshot)
            return;
        const data = this._dndAPI.encodeSnapshot(snapshot);
        dataTransfer.setData(this._dndAPI.mimeType, data);
    }
    watch() {
        this.widget.handleEvent('pointerDown', ctx => {
            const state = ctx.get('pointerState');
            const event = state.raw;
            const target = captureEventTarget(event.target);
            if (!target)
                return;
            if (this.widget.contains(target)) {
                return true;
            }
            return;
        });
        this.widget.handleEvent('dragStart', ctx => {
            const state = ctx.get('pointerState');
            const event = state.raw;
            const target = captureEventTarget(event.target);
            if (!target)
                return;
            if (this.widget.contains(target)) {
                return true;
            }
            return;
        });
        this.widget.handleEvent('nativeDragStart', this._dragStartHandler, {
            global: true,
        });
        this.widget.handleEvent('nativeDragMove', this._dragMoveHandler, {
            global: true,
        });
        this.widget.handleEvent('nativeDragEnd', this._dragEndHandler, {
            global: true,
        });
        this.widget.handleEvent('nativeDrop', this._dropHandler, {
            global: true,
        });
    }
}
//# sourceMappingURL=drag-event-watcher.js.map