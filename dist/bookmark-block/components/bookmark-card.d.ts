import { ShadowlessElement } from '@blocksuite/block-std';
import type { BookmarkBlockComponent } from '../bookmark-block.js';
declare const BookmarkCard_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class BookmarkCard extends BookmarkCard_base {
    static styles: import("lit").CSSResult;
    private _handleClick;
    private _handleDoubleClick;
    private _selectBlock;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _isSelected;
    accessor bookmark: BookmarkBlockComponent;
    accessor error: boolean;
    accessor loading: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'bookmark-card': BookmarkCard;
    }
}
export {};
//# sourceMappingURL=bookmark-card.d.ts.map