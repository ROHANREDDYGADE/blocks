import { LitElement } from 'lit';
declare const EdgelessLinkToolButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/quick-tool.mixin.js").QuickToolMixinClass>;
export declare class EdgelessLinkToolButton extends EdgelessLinkToolButton_base {
    static styles: import("lit").CSSResult;
    type: "default";
    private _onClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-link-tool-button': EdgelessLinkToolButton;
    }
}
export {};
//# sourceMappingURL=link-tool-button.d.ts.map