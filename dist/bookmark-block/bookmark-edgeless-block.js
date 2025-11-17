import { EMBED_CARD_HEIGHT, EMBED_CARD_WIDTH, } from '@blocksuite/affine-shared/consts';
import { toGfxBlockComponent } from '@blocksuite/block-std';
import { styleMap } from 'lit/directives/style-map.js';
import { BookmarkBlockComponent } from './bookmark-block.js';
export class BookmarkEdgelessBlockComponent extends toGfxBlockComponent(BookmarkBlockComponent) {
    constructor() {
        super(...arguments);
        this.blockDraggable = false;
        this.#blockContainerStyles_accessor_storage = {};
    }
    getRenderingRect() {
        const elementBound = this.model.elementBound;
        const style = this.model.style$.value;
        return {
            x: elementBound.x,
            y: elementBound.y,
            w: EMBED_CARD_WIDTH[style],
            h: EMBED_CARD_HEIGHT[style],
            zIndex: this.toZIndex(),
        };
    }
    renderGfxBlock() {
        const style = this.model.style$.value;
        const width = EMBED_CARD_WIDTH[style];
        const height = EMBED_CARD_HEIGHT[style];
        const bound = this.model.elementBound;
        const scaleX = bound.w / width;
        const scaleY = bound.h / height;
        this.containerStyleMap = styleMap({
            width: `100%`,
            height: `100%`,
            transform: `scale(${scaleX}, ${scaleY})`,
            transformOrigin: '0 0',
        });
        return this.renderPageContent();
    }
    #blockContainerStyles_accessor_storage;
    get blockContainerStyles() { return this.#blockContainerStyles_accessor_storage; }
    set blockContainerStyles(value) { this.#blockContainerStyles_accessor_storage = value; }
}
//# sourceMappingURL=bookmark-edgeless-block.js.map