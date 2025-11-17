import { GfxPrimitiveElementModel, } from '@blocksuite/block-std/gfx';
import { MenuContext } from '../../../configs/toolbar.js';
import { isAttachmentBlock, isBookmarkBlock, isEmbeddedLinkBlock, isEmbedLinkedDocBlock, isEmbedSyncedDocBlock, isFrameBlock, isImageBlock, isNoteBlock, } from '../../../edgeless/utils/query.js';
export class ElementToolbarMoreMenuContext extends MenuContext {
    #empty = true;
    #includedFrame = false;
    #multiple = false;
    #single = false;
    get doc() {
        return this.edgeless.doc;
    }
    get firstBlockComponent() {
        return this.getBlockComponent(this.firstElement.id);
    }
    get firstElement() {
        return this.selection.firstElement;
    }
    get host() {
        return this.edgeless.host;
    }
    get selectedBlockModels() {
        const [result, { selectedModels }] = this.std.command
            .chain()
            .getSelectedModels()
            .run();
        if (!result)
            return [];
        return selectedModels ?? [];
    }
    get selectedElements() {
        return this.selection.selectedElements;
    }
    get selection() {
        return this.service.selection;
    }
    get service() {
        return this.edgeless.service;
    }
    get std() {
        return this.edgeless.host.std;
    }
    get surface() {
        return this.edgeless.surface;
    }
    get view() {
        return this.host.view;
    }
    constructor(edgeless) {
        super();
        this.edgeless = edgeless;
        const selectedElements = this.selection.selectedElements;
        const len = selectedElements.length;
        this.#empty = len === 0;
        this.#single = len === 1;
        this.#multiple = !this.#empty && !this.#single;
        this.#includedFrame = !this.#empty && selectedElements.some(isFrameBlock);
    }
    getBlockComponent(id) {
        return this.view.getBlock(id);
    }
    getLinkedDocBlock() {
        const valid = this.#single &&
            (isEmbedLinkedDocBlock(this.firstElement) ||
                isEmbedSyncedDocBlock(this.firstElement));
        if (!valid)
            return null;
        return this.firstElement;
    }
    getNoteBlock() {
        const valid = this.#single && isNoteBlock(this.firstElement);
        if (!valid)
            return null;
        return this.firstElement;
    }
    hasFrame() {
        return this.#includedFrame;
    }
    isElement() {
        return (this.#single && this.firstElement instanceof GfxPrimitiveElementModel);
    }
    isEmpty() {
        return this.#empty;
    }
    isMultiple() {
        return this.#multiple;
    }
    isSingle() {
        return this.#single;
    }
    refreshable(model) {
        return (isImageBlock(model) ||
            isBookmarkBlock(model) ||
            isAttachmentBlock(model) ||
            isEmbeddedLinkBlock(model));
    }
}
//# sourceMappingURL=context.js.map