import { getClosestBlockComponentByPoint, isInsidePageEditor, matchFlavours, } from '@blocksuite/affine-shared/utils';
import { assertExists, Point } from '@blocksuite/global/utils';
import { calcDropTarget } from '../../_common/utils/index.js';
export class FileDropManager {
    static { this._dropResult = null; }
    get doc() {
        return this._blockService.doc;
    }
    get editorHost() {
        return this._blockService.std.host;
    }
    get targetModel() {
        let targetModel = FileDropManager._dropResult?.modelState.model || null;
        if (!targetModel && isInsidePageEditor(this.editorHost)) {
            const rootModel = this.doc.root;
            assertExists(rootModel);
            let lastNote = rootModel.children[rootModel.children.length - 1];
            if (!lastNote || !matchFlavours(lastNote, ['affine:note'])) {
                const newNoteId = this.doc.addBlock('affine:note', {}, rootModel.id);
                const newNote = this.doc.getBlockById(newNoteId);
                assertExists(newNote);
                lastNote = newNote;
            }
            const lastItem = lastNote.children[lastNote.children.length - 1];
            if (lastItem) {
                targetModel = lastItem;
            }
            else {
                const newParagraphId = this.doc.addBlock('affine:paragraph', {}, lastNote, 0);
                const newParagraph = this.doc.getBlockById(newParagraphId);
                assertExists(newParagraph);
                targetModel = newParagraph;
            }
        }
        return targetModel;
    }
    get type() {
        return !FileDropManager._dropResult ||
            FileDropManager._dropResult.type !== 'before'
            ? 'after'
            : 'before';
    }
    constructor(blockService, fileDropOptions) {
        this._onDrop = (event) => {
            this._indicator.rect = null;
            const { onDrop } = this._fileDropOptions;
            if (!onDrop)
                return;
            const dataTransfer = event.dataTransfer;
            if (!dataTransfer)
                return;
            const effectAllowed = dataTransfer.effectAllowed;
            if (effectAllowed === 'none')
                return;
            const droppedFiles = dataTransfer.files;
            if (!droppedFiles || !droppedFiles.length)
                return;
            event.preventDefault();
            const { targetModel, type: place } = this;
            const { x, y } = event;
            onDrop({
                files: [...droppedFiles],
                targetModel,
                place,
                point: [x, y],
            })?.catch(console.error);
        };
        this.onDragLeave = () => {
            FileDropManager._dropResult = null;
            this._indicator.rect = null;
        };
        this.onDragOver = (event) => {
            event.preventDefault();
            const dataTransfer = event.dataTransfer;
            if (!dataTransfer)
                return;
            const effectAllowed = dataTransfer.effectAllowed;
            if (effectAllowed === 'none')
                return;
            const { clientX, clientY } = event;
            const point = new Point(clientX, clientY);
            const element = getClosestBlockComponentByPoint(point.clone());
            let result = null;
            if (element) {
                const model = element.model;
                const parent = this.doc.getParent(model);
                if (!matchFlavours(parent, ['affine:surface'])) {
                    result = calcDropTarget(point, model, element);
                }
            }
            if (result) {
                FileDropManager._dropResult = result;
                this._indicator.rect = result.rect;
            }
            else {
                FileDropManager._dropResult = null;
                this._indicator.rect = null;
            }
        };
        this._blockService = blockService;
        this._fileDropOptions = fileDropOptions;
        this._indicator = document.querySelector('affine-drag-indicator');
        if (!this._indicator) {
            this._indicator = document.createElement('affine-drag-indicator');
            document.body.append(this._indicator);
        }
        if (fileDropOptions.onDrop) {
            this._blockService.disposables.addFromEvent(this._blockService.std.host, 'drop', this._onDrop);
        }
    }
}
//# sourceMappingURL=file-drop-manager.js.map