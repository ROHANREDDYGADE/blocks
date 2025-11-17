import { LitElement } from 'lit';
import { LassoMode } from '../../../../../_common/types.js';
declare const EdgelessLassoToolButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass> & import("@blocksuite/global/utils").Constructor<import("../mixins/quick-tool.mixin.js").QuickToolMixinClass>;
export declare class EdgelessLassoToolButton extends EdgelessLassoToolButton_base {
    static styles: import("lit").CSSResult;
    private _changeTool;
    type: "lasso";
    private _fadeIn;
    private _fadeOut;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor curMode: LassoMode;
    accessor currentIcon: HTMLInputElement;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-lasso-tool-button': EdgelessLassoToolButton;
    }
}
export {};
//# sourceMappingURL=lasso-tool-button.d.ts.map