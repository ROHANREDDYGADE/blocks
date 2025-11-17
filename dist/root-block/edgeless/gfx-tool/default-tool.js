import { ConnectorUtils, OverlayIdentifier, } from '@blocksuite/affine-block-surface';
import { focusTextModel } from '@blocksuite/affine-components/rich-text';
import { ConnectorElementModel, GroupElementModel, MindmapElementModel, ShapeElementModel, TextElementModel, } from '@blocksuite/affine-model';
import { TelemetryProvider } from '@blocksuite/affine-shared/services';
import { clamp, handleNativeRangeAtPoint, resetNativeSelection, } from '@blocksuite/affine-shared/utils';
import { BaseTool, getTopElements, GfxExtensionIdentifier, isGfxGroupCompatibleModel, } from '@blocksuite/block-std/gfx';
import { Bound, DisposableGroup, getCommonBoundWithRotation, last, noop, Vec, } from '@blocksuite/global/utils';
import { effect } from '@preact/signals-core';
import { isSingleMindMapNode } from '../../../_common/edgeless/mindmap/index.js';
import { prepareCloneData } from '../utils/clone-utils.js';
import { calPanDelta } from '../utils/panning-utils.js';
import { isCanvasElement, isEdgelessTextBlock, isFrameBlock, isNoteBlock, } from '../utils/query.js';
import { addText, mountConnectorLabelEditor, mountFrameTitleEditor, mountGroupTitleEditor, mountShapeTextEditor, mountTextElementEditor, } from '../utils/text.js';
import { fitToScreen } from '../utils/viewport.js';
import { CanvasElementEventExt } from './default-tool-ext/event-ext.js';
import { DefaultModeDragType } from './default-tool-ext/ext.js';
import { MindMapExt } from './default-tool-ext/mind-map-ext/mind-map-ext.js';
export class DefaultTool extends BaseTool {
    constructor() {
        super(...arguments);
        this._accumulateDelta = [0, 0];
        this._alignBound = new Bound();
        this._autoPanTimer = null;
        this._clearDisposable = () => {
            if (this._disposables) {
                this._disposables.dispose();
                this._disposables = null;
            }
        };
        this._clearSelectingState = () => {
            this._stopAutoPanning();
            this._clearDisposable();
            this._wheeling = false;
        };
        this._disposables = null;
        this._extHandlers = [];
        this._exts = [];
        this._hoveredFrame = null;
        // Do not select the text, when click again after activating the note.
        this._isDoubleClickedOnMask = false;
        this._lock = false;
        this._panViewport = (delta) => {
            this._accumulateDelta[0] += delta[0];
            this._accumulateDelta[1] += delta[1];
            this.gfx.viewport.applyDeltaCenter(delta[0], delta[1]);
        };
        this._pendingUpdates = new Map();
        this._rafId = null;
        this._selectedBounds = [];
        // For moving the connector label
        this._selectedConnector = null;
        this._selectedConnectorLabelBounds = null;
        this._selectionRectTransition = null;
        this._startAutoPanning = (delta) => {
            this._panViewport(delta);
            this._updateSelectingState(delta);
            this._stopAutoPanning();
            this._autoPanTimer = window.setInterval(() => {
                this._panViewport(delta);
                this._updateSelectingState(delta);
            }, 30);
        };
        this._stopAutoPanning = () => {
            if (this._autoPanTimer) {
                clearTimeout(this._autoPanTimer);
                this._autoPanTimer = null;
            }
        };
        this._toBeMoved = [];
        this._updateSelectingState = (delta = [0, 0]) => {
            const { gfx } = this;
            if (gfx.keyboard.spaceKey$.peek() && this._selectionRectTransition) {
                /* Move the selection if space is pressed */
                const curDraggingViewArea = this.controller.draggingViewArea$.peek();
                const { w, h, startX, startY, endX, endY } = this._selectionRectTransition;
                const { endX: lastX, endY: lastY } = curDraggingViewArea;
                const dx = lastX + delta[0] - endX + this._accumulateDelta[0];
                const dy = lastY + delta[1] - endY + this._accumulateDelta[1];
                this.controller.draggingViewArea$.value = {
                    ...curDraggingViewArea,
                    x: Math.min(startX + dx, lastX),
                    y: Math.min(startY + dy, lastY),
                    w,
                    h,
                    startX: startX + dx,
                    startY: startY + dy,
                };
            }
            else {
                const curDraggingArea = this.controller.draggingViewArea$.peek();
                const newStartX = curDraggingArea.startX - delta[0];
                const newStartY = curDraggingArea.startY - delta[1];
                this.controller.draggingViewArea$.value = {
                    ...curDraggingArea,
                    startX: newStartX,
                    startY: newStartY,
                    x: Math.min(newStartX, curDraggingArea.endX),
                    y: Math.min(newStartY, curDraggingArea.endY),
                    w: Math.abs(curDraggingArea.endX - newStartX),
                    h: Math.abs(curDraggingArea.endY - newStartY),
                };
            }
            const { x, y, w, h } = this.controller.draggingArea$.peek();
            const bound = new Bound(x, y, w, h);
            let elements = gfx.getElementsByBound(bound).filter(el => {
                if (isFrameBlock(el)) {
                    return el.childElements.length === 0 || bound.contains(el.elementBound);
                }
                if (el instanceof MindmapElementModel) {
                    return bound.contains(el.elementBound);
                }
                return true;
            });
            elements = getTopElements(elements).filter(el => !el.isLocked());
            const set = new Set(gfx.keyboard.shiftKey$.peek()
                ? [...elements, ...gfx.selection.selectedElements]
                : elements);
            this.edgelessSelectionManager.set({
                elements: Array.from(set).map(element => element.id),
                editing: false,
            });
        };
        this._wheeling = false;
        this.dragType = DefaultModeDragType.None;
        this.enableHover = true;
    }
    static { this.toolName = 'default'; }
    get _edgeless() {
        const block = this.std.view.getBlock(this.doc.root.id);
        return block ?? null;
    }
    get _frameMgr() {
        return this.std.get(GfxExtensionIdentifier('frame-manager'));
    }
    get _supportedExts() {
        return this._exts.filter(ext => ext.supportedDragTypes.includes(this.dragType));
    }
    /**
     * Get the end position of the dragging area in the model coordinate
     */
    get dragLastPos() {
        const { endX, endY } = this.controller.draggingArea$.peek();
        return [endX, endY];
    }
    /**
     * Get the start position of the dragging area in the model coordinate
     */
    get dragStartPos() {
        const { startX, startY } = this.controller.draggingArea$.peek();
        return [startX, startY];
    }
    get edgelessSelectionManager() {
        return this.gfx.selection;
    }
    get frameOverlay() {
        return this.std.get(OverlayIdentifier('frame'));
    }
    get snapOverlay() {
        return this.std.get(OverlayIdentifier('snap-manager'));
    }
    _addEmptyParagraphBlock(block) {
        const blockId = this.doc.addBlock('affine:paragraph', { type: 'text' }, block.id);
        if (blockId) {
            focusTextModel(this.std, blockId);
        }
    }
    async _cloneContent() {
        this._lock = true;
        if (!this._edgeless)
            return;
        const clipboardController = this._edgeless?.clipboardController;
        const snapshot = prepareCloneData(this._toBeMoved, this.std);
        const bound = getCommonBoundWithRotation(this._toBeMoved);
        const { canvasElements, blockModels } = await clipboardController.createElementsFromClipboardData(snapshot, bound.center);
        this._toBeMoved = [...canvasElements, ...blockModels];
        this.edgelessSelectionManager.set({
            elements: this._toBeMoved.map(e => e.id),
            editing: false,
        });
    }
    _determineDragType(e) {
        const { x, y } = e;
        // Is dragging started from current selected rect
        if (this.edgelessSelectionManager.isInSelectedRect(x, y)) {
            if (this.edgelessSelectionManager.selectedElements.length === 1) {
                let selected = this.edgelessSelectionManager.selectedElements[0];
                // double check
                const currentSelected = this._pick(x, y);
                if (!isFrameBlock(selected) &&
                    !(selected instanceof GroupElementModel) &&
                    currentSelected &&
                    currentSelected !== selected) {
                    selected = currentSelected;
                    this.edgelessSelectionManager.set({
                        elements: [selected.id],
                        editing: false,
                    });
                }
                if (isCanvasElement(selected) &&
                    ConnectorUtils.isConnectorWithLabel(selected) &&
                    selected.labelIncludesPoint(this.gfx.viewport.toModelCoord(x, y))) {
                    this._selectedConnector = selected;
                    this._selectedConnectorLabelBounds = Bound.fromXYWH(this._selectedConnector.labelXYWH);
                    return DefaultModeDragType.ConnectorLabelMoving;
                }
            }
            return this.edgelessSelectionManager.editing
                ? DefaultModeDragType.NativeEditing
                : DefaultModeDragType.ContentMoving;
        }
        else {
            const selected = this._pick(x, y);
            if (selected) {
                this.edgelessSelectionManager.set({
                    elements: [selected.id],
                    editing: false,
                });
                if (isCanvasElement(selected) &&
                    ConnectorUtils.isConnectorWithLabel(selected) &&
                    selected.labelIncludesPoint(this.gfx.viewport.toModelCoord(x, y))) {
                    this._selectedConnector = selected;
                    this._selectedConnectorLabelBounds = Bound.fromXYWH(this._selectedConnector.labelXYWH);
                    return DefaultModeDragType.ConnectorLabelMoving;
                }
                return DefaultModeDragType.ContentMoving;
            }
            else {
                return DefaultModeDragType.Selecting;
            }
        }
    }
    _filterConnectedConnector() {
        this._toBeMoved = this._toBeMoved.filter(ele => {
            if (ele instanceof ConnectorElementModel &&
                ele.source?.id &&
                ele.target?.id) {
                if (this._toBeMoved.some(e => e.id === ele.source.id) &&
                    this._toBeMoved.some(e => e.id === ele.target.id)) {
                    return false;
                }
            }
            return true;
        });
    }
    _isDraggable(element) {
        return !(element instanceof ConnectorElementModel &&
            !ConnectorUtils.isConnectorAndBindingsAllSelected(element, this._toBeMoved));
    }
    _moveContent([dx, dy], alignBound, shifted, shouldClone) {
        alignBound.x += dx;
        alignBound.y += dy;
        const alignRst = this.snapOverlay.align(alignBound);
        const delta = [dx + alignRst.dx, dy + alignRst.dy];
        if (shifted) {
            const angle = Math.abs(Math.atan2(delta[1], delta[0]));
            const direction = angle < Math.PI / 4 || angle > 3 * (Math.PI / 4) ? 'x' : 'y';
            delta[direction === 'x' ? 1 : 0] = 0;
        }
        this._toBeMoved.forEach((element, index) => {
            const isGraphicElement = isCanvasElement(element);
            if (isGraphicElement && !this._isDraggable(element))
                return;
            let bound = this._selectedBounds[index];
            if (shouldClone)
                bound = bound.clone();
            bound.x += delta[0];
            bound.y += delta[1];
            if (isGraphicElement) {
                if (!this._lock) {
                    this._lock = true;
                    this.doc.captureSync();
                }
                if (element instanceof ConnectorElementModel) {
                    element.moveTo(bound);
                }
            }
            this._scheduleUpdate(element, {
                xywh: bound.serialize(),
            });
        });
        this._hoveredFrame = this._frameMgr.getFrameFromPoint(this.dragLastPos, this._toBeMoved.filter(ele => isFrameBlock(ele)));
        this._hoveredFrame && !this._hoveredFrame.isLocked()
            ? this.frameOverlay.highlight(this._hoveredFrame)
            : this.frameOverlay.clear();
    }
    _moveLabel(delta) {
        const connector = this._selectedConnector;
        let bounds = this._selectedConnectorLabelBounds;
        if (!connector || !bounds)
            return;
        bounds = bounds.clone();
        const center = connector.getNearestPoint(Vec.add(bounds.center, delta));
        const distance = connector.getOffsetDistanceByPoint(center);
        bounds.center = center;
        this.gfx.updateElement(connector, {
            labelXYWH: bounds.toXYWH(),
            labelOffset: {
                distance,
            },
        });
    }
    _pick(x, y, options) {
        const modelPos = this.gfx.viewport.toModelCoord(x, y);
        const tryGetLockedAncestor = (e) => {
            if (e?.isLockedByAncestor()) {
                return e.groups.findLast(group => group.isLocked());
            }
            return e;
        };
        const frameByPickingTitle = last(this.gfx
            .getElementByPoint(modelPos[0], modelPos[1], {
            ...options,
            all: true,
        })
            .filter(el => isFrameBlock(el) && el.externalBound?.isPointInBound(modelPos)));
        if (frameByPickingTitle)
            return tryGetLockedAncestor(frameByPickingTitle);
        const result = this.gfx.getElementInGroup(modelPos[0], modelPos[1], options);
        if (result instanceof MindmapElementModel) {
            const picked = this.gfx.getElementByPoint(modelPos[0], modelPos[1], {
                ...(options ?? {}),
                all: true,
            });
            let pickedIdx = picked.length - 1;
            while (pickedIdx >= 0) {
                const element = picked[pickedIdx];
                if (element === result) {
                    pickedIdx -= 1;
                    continue;
                }
                break;
            }
            return tryGetLockedAncestor(picked[pickedIdx]) ?? null;
        }
        // if the frame has title, it only can be picked by clicking the title
        if (isFrameBlock(result) && result.externalXYWH) {
            return null;
        }
        return tryGetLockedAncestor(result);
    }
    _scheduleUpdate(element, updates) {
        this._pendingUpdates.set(element, updates);
        if (this._rafId !== null)
            return;
        this._rafId = requestAnimationFrame(() => {
            this._pendingUpdates.forEach((updates, element) => {
                this.gfx.updateElement(element, updates);
            });
            this._pendingUpdates.clear();
            this._rafId = null;
        });
    }
    initializeDragState(dragType, event) {
        this.dragType = dragType;
        if ((this._toBeMoved.length &&
            this._toBeMoved.every(ele => !(ele.group instanceof MindmapElementModel))) ||
            (isSingleMindMapNode(this._toBeMoved) &&
                this._toBeMoved[0].id ===
                    this._toBeMoved[0].group.tree.id)) {
            const mindmap = this._toBeMoved[0].group;
            this._alignBound = this.snapOverlay.setupAlignables(this._toBeMoved, [
                mindmap,
                ...(mindmap?.childElements || []),
            ]);
        }
        this._clearDisposable();
        this._disposables = new DisposableGroup();
        const ctx = {
            movedElements: this._toBeMoved,
            dragType,
            event,
        };
        this._extHandlers = this._supportedExts.map(ext => ext.initDrag(ctx));
        this._selectedBounds = this._toBeMoved.map(element => Bound.deserialize(element.xywh));
        // If the drag type is selecting, set up the dragging area disposable group
        // If the viewport updates when dragging, should update the dragging area and selection
        if (this.dragType === DefaultModeDragType.Selecting) {
            this._disposables.add(this.gfx.viewport.viewportUpdated.on(() => {
                if (this.dragType === DefaultModeDragType.Selecting &&
                    this.controller.dragging$.peek() &&
                    !this._autoPanTimer) {
                    this._updateSelectingState();
                }
            }));
            return;
        }
        if (this.dragType === DefaultModeDragType.ContentMoving) {
            this._disposables.add(this.gfx.viewport.viewportMoved.on(delta => {
                if (this.dragType === DefaultModeDragType.ContentMoving &&
                    this.controller.dragging$.peek() &&
                    !this._autoPanTimer) {
                    if (this._toBeMoved.every(ele => {
                        return !this._isDraggable(ele);
                    })) {
                        return;
                    }
                    if (!this._wheeling) {
                        this._wheeling = true;
                        this._selectedBounds = this._toBeMoved.map(element => Bound.deserialize(element.xywh));
                    }
                    this._alignBound = this.snapOverlay.setupAlignables(this._toBeMoved);
                    this._moveContent(delta, this._alignBound);
                }
            }));
            return;
        }
    }
    activate(_) {
        if (this.gfx.selection.lastSurfaceSelections.length) {
            this.gfx.selection.set(this.gfx.selection.lastSurfaceSelections);
        }
    }
    click(e) {
        if (this.doc.readonly)
            return;
        const selected = this._pick(e.x, e.y, {
            ignoreTransparent: true,
        });
        if (selected) {
            const { selectedIds, surfaceSelections } = this.edgelessSelectionManager;
            const editing = surfaceSelections[0]?.editing ?? false;
            // click active canvas text, edgeless text block and note block
            if (selectedIds.length === 1 &&
                selectedIds[0] === selected.id &&
                editing) {
                // edgeless text block and note block
                if ((isNoteBlock(selected) || isEdgelessTextBlock(selected)) &&
                    selected.children.length === 0) {
                    this._addEmptyParagraphBlock(selected);
                }
                // canvas text
                return;
            }
            // click non-active edgeless text block and note block, and then enter editing
            if (!selected.isLocked() &&
                !e.keys.shift &&
                selectedIds.length === 1 &&
                (isNoteBlock(selected) || isEdgelessTextBlock(selected)) &&
                ((selectedIds[0] === selected.id && !editing) ||
                    (editing && selectedIds[0] !== selected.id))) {
                // issue #1809
                // If the previously selected element is a noteBlock and is in an active state,
                // then the currently clicked noteBlock should also be in an active state when selected.
                this.edgelessSelectionManager.set({
                    elements: [selected.id],
                    editing: true,
                });
                this._edgeless?.updateComplete
                    .then(() => {
                    // check if block has children blocks, if not, add a paragraph block and focus on it
                    if (selected.children.length === 0) {
                        this._addEmptyParagraphBlock(selected);
                    }
                    else {
                        const block = this.std.host.view.getBlock(selected.id);
                        if (block) {
                            const rect = block
                                .querySelector('.affine-block-children-container')
                                .getBoundingClientRect();
                            const offsetY = 8 * this.gfx.viewport.zoom;
                            const offsetX = 2 * this.gfx.viewport.zoom;
                            const x = clamp(e.raw.clientX, rect.left + offsetX, rect.right - offsetX);
                            const y = clamp(e.raw.clientY, rect.top + offsetY, rect.bottom - offsetY);
                            handleNativeRangeAtPoint(x, y);
                        }
                        else {
                            handleNativeRangeAtPoint(e.raw.clientX, e.raw.clientY);
                        }
                    }
                })
                    .catch(console.error);
                return;
            }
            this.edgelessSelectionManager.set({
                // hold shift key to multi select or de-select element
                elements: e.keys.shift
                    ? this.edgelessSelectionManager.has(selected.id)
                        ? selectedIds.filter(id => id !== selected.id)
                        : [...selectedIds, selected.id]
                    : [selected.id],
                editing: false,
            });
        }
        else if (!e.keys.shift) {
            this.edgelessSelectionManager.clear();
            resetNativeSelection(null);
        }
        this._isDoubleClickedOnMask = false;
        this._supportedExts.forEach(ext => ext.click?.(e));
    }
    deactivate() {
        this._stopAutoPanning();
        this._clearDisposable();
        this._accumulateDelta = [0, 0];
        noop();
    }
    doubleClick(e) {
        if (this.doc.readonly) {
            const viewport = this.gfx.viewport;
            if (viewport.zoom === 1) {
                // Fit to Screen
                fitToScreen([...this.gfx.layer.blocks, ...this.gfx.layer.canvasElements], this.gfx.viewport);
            }
            else {
                // Zoom to 100% and Center
                const [x, y] = viewport.toModelCoord(e.x, e.y);
                viewport.setViewport(1, [x, y], true);
            }
            return;
        }
        const selected = this._pick(e.x, e.y, {
            hitThreshold: 10,
        });
        if (!this._edgeless) {
            return;
        }
        if (!selected) {
            const textFlag = this.doc.awarenessStore.getFlag('enable_edgeless_text');
            if (textFlag) {
                const [x, y] = this.gfx.viewport.toModelCoord(e.x, e.y);
                this.std.command.exec('insertEdgelessText', { x, y });
            }
            else {
                addText(this._edgeless, e);
            }
            this.std.getOptional(TelemetryProvider)?.track('CanvasElementAdded', {
                control: 'canvas:dbclick',
                page: 'whiteboard editor',
                module: 'toolbar',
                segment: 'toolbar',
                type: 'text',
            });
            return;
        }
        else {
            if (selected.isLocked())
                return;
            const [x, y] = this.gfx.viewport.toModelCoord(e.x, e.y);
            if (selected instanceof TextElementModel) {
                mountTextElementEditor(selected, this._edgeless, {
                    x,
                    y,
                });
                return;
            }
            if (selected instanceof ShapeElementModel) {
                mountShapeTextEditor(selected, this._edgeless);
                return;
            }
            if (selected instanceof ConnectorElementModel) {
                mountConnectorLabelEditor(selected, this._edgeless, [x, y]);
                return;
            }
            if (isFrameBlock(selected)) {
                mountFrameTitleEditor(selected, this._edgeless);
                return;
            }
            if (selected instanceof GroupElementModel) {
                mountGroupTitleEditor(selected, this._edgeless);
                return;
            }
        }
        this._supportedExts.forEach(ext => ext.click?.(e));
        if (e.raw.target &&
            e.raw.target instanceof HTMLElement &&
            e.raw.target.classList.contains('affine-note-mask')) {
            this.click(e);
            this._isDoubleClickedOnMask = true;
            return;
        }
    }
    dragEnd(e) {
        this._extHandlers.forEach(handler => handler.dragEnd?.(e));
        this._toBeMoved.forEach(el => {
            this.doc.transact(() => {
                el.pop('xywh');
            });
            if (el instanceof ConnectorElementModel) {
                el.pop('labelXYWH');
            }
        });
        {
            const frameManager = this._frameMgr;
            const toBeMovedTopElements = getTopElements(this._toBeMoved.map(el => el.group instanceof MindmapElementModel ? el.group : el));
            if (this._hoveredFrame) {
                frameManager.addElementsToFrame(this._hoveredFrame, toBeMovedTopElements);
            }
            else {
                // only apply to root nodes of trees
                toBeMovedTopElements.map(element => frameManager.removeFromParentFrame(element));
            }
        }
        if (this._lock) {
            this.doc.captureSync();
            this._lock = false;
        }
        if (this.edgelessSelectionManager.editing)
            return;
        this._selectedBounds = [];
        this.snapOverlay.cleanupAlignables();
        this.frameOverlay.clear();
        this._toBeMoved = [];
        this._selectedConnector = null;
        this._selectedConnectorLabelBounds = null;
        this._clearSelectingState();
        this.dragType = DefaultModeDragType.None;
    }
    dragMove(e) {
        const { viewport } = this.gfx;
        switch (this.dragType) {
            case DefaultModeDragType.Selecting: {
                // Record the last drag pointer position for auto panning and view port updating
                this._updateSelectingState();
                const moveDelta = calPanDelta(viewport, e);
                if (moveDelta) {
                    this._startAutoPanning(moveDelta);
                }
                else {
                    this._stopAutoPanning();
                }
                break;
            }
            case DefaultModeDragType.AltCloning:
            case DefaultModeDragType.ContentMoving: {
                if (this._toBeMoved.length &&
                    this._toBeMoved.every(ele => {
                        return !this._isDraggable(ele);
                    })) {
                    return;
                }
                if (this._wheeling) {
                    this._wheeling = false;
                }
                const dx = this.dragLastPos[0] - this.dragStartPos[0];
                const dy = this.dragLastPos[1] - this.dragStartPos[1];
                const alignBound = this._alignBound.clone();
                const shifted = e.keys.shift || this.gfx.keyboard.shiftKey$.peek();
                this._moveContent([dx, dy], alignBound, shifted, true);
                this._extHandlers.forEach(handler => handler.dragMove?.(e));
                break;
            }
            case DefaultModeDragType.ConnectorLabelMoving: {
                const dx = this.dragLastPos[0] - this.dragStartPos[0];
                const dy = this.dragLastPos[1] - this.dragStartPos[1];
                this._moveLabel([dx, dy]);
                break;
            }
            case DefaultModeDragType.NativeEditing: {
                // TODO reset if drag out of note
                break;
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async dragStart(e) {
        if (this.edgelessSelectionManager.editing)
            return;
        // Determine the drag type based on the current state and event
        let dragType = this._determineDragType(e);
        const elements = this.edgelessSelectionManager.selectedElements;
        if (elements.some(e => e.isLocked()))
            return;
        const toBeMoved = new Set(elements);
        elements.forEach(element => {
            if (isGfxGroupCompatibleModel(element)) {
                element.descendantElements.forEach(ele => {
                    toBeMoved.add(ele);
                });
            }
        });
        this._toBeMoved = Array.from(toBeMoved);
        // If alt key is pressed and content is moving, clone the content
        if (e.keys.alt && dragType === DefaultModeDragType.ContentMoving) {
            dragType = DefaultModeDragType.AltCloning;
            await this._cloneContent();
        }
        this._filterConnectedConnector();
        // Connector needs to be updated first
        this._toBeMoved.sort((a, _) => a instanceof ConnectorElementModel ? -1 : 1);
        // Set up drag state
        this.initializeDragState(dragType, e);
        // stash the state
        this._toBeMoved.forEach(ele => {
            ele.stash('xywh');
            if (ele instanceof ConnectorElementModel) {
                ele.stash('labelXYWH');
            }
        });
        this._extHandlers.forEach(handler => handler.dragStart?.(e));
    }
    mounted() {
        this.disposable.add(effect(() => {
            const pressed = this.gfx.keyboard.spaceKey$.value;
            if (pressed) {
                const currentDraggingArea = this.controller.draggingViewArea$.peek();
                this._selectionRectTransition = {
                    w: currentDraggingArea.w,
                    h: currentDraggingArea.h,
                    startX: currentDraggingArea.startX,
                    startY: currentDraggingArea.startY,
                    endX: currentDraggingArea.endX,
                    endY: currentDraggingArea.endY,
                };
            }
            else {
                this._selectionRectTransition = null;
            }
        }));
        this._exts = [MindMapExt, CanvasElementEventExt].map(constructor => new constructor(this));
        this._exts.forEach(ext => ext.mounted());
    }
    pointerDown(e) {
        this._supportedExts.forEach(ext => ext.pointerDown(e));
    }
    pointerMove(e) {
        const hovered = this._pick(e.x, e.y, {
            hitThreshold: 10,
        });
        if (isFrameBlock(hovered) &&
            hovered.externalBound?.isPointInBound(this.gfx.viewport.toModelCoord(e.x, e.y))) {
            this.frameOverlay.highlight(hovered);
        }
        else {
            this.frameOverlay.clear();
        }
        this._supportedExts.forEach(ext => ext.pointerMove(e));
    }
    pointerUp(e) {
        this._supportedExts.forEach(ext => ext.pointerUp(e));
    }
    tripleClick() {
        if (this._isDoubleClickedOnMask)
            return;
    }
    unmounted() {
        this._exts.forEach(ext => ext.unmounted());
    }
}
//# sourceMappingURL=default-tool.js.map