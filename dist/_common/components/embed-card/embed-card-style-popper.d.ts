import type { BookmarkBlockModel, ColorScheme, EmbedGithubModel, EmbedLinkedDocModel } from '@blocksuite/affine-model';
import { LitElement } from 'lit';
declare const EmbedCardStyleMenu_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EmbedCardStyleMenu extends EmbedCardStyleMenu_base {
    static styles: import("lit").CSSResult;
    private _setEmbedCardStyle;
    render(): import("lit-html").TemplateResult<1>;
    accessor abortController: AbortController;
    accessor model: BookmarkBlockModel | EmbedGithubModel | EmbedLinkedDocModel;
    accessor theme: ColorScheme;
}
declare global {
    interface HTMLElementTagNameMap {
        'embed-card-style-menu': EmbedCardStyleMenu;
    }
}
export {};
//# sourceMappingURL=embed-card-style-popper.d.ts.map