import { LitElement } from 'lit';
import type { EmbedBlockComponent } from './type.js';
declare const EmbedCardMoreMenu_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EmbedCardMoreMenu extends EmbedCardMoreMenu_base {
    static styles: import("lit").CSSResult;
    private get _doc();
    private get _model();
    get _openButtonDisabled(): boolean;
    private get _std();
    private _copyBlock;
    private _duplicateBlock;
    private _open;
    private _peek;
    private _peekable;
    private _refreshData;
    render(): import("lit-html").TemplateResult<1>;
    accessor abortController: AbortController;
    accessor block: EmbedBlockComponent;
}
declare global {
    interface HTMLElementTagNameMap {
        'embed-card-more-menu': EmbedCardMoreMenu;
    }
}
export {};
//# sourceMappingURL=embed-card-more-menu-popper.d.ts.map