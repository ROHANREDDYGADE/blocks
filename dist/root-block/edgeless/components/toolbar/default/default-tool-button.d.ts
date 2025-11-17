import type { GfxToolsFullOptionValue } from '@blocksuite/block-std/gfx';
import { LitElement } from 'lit';
declare const EdgelessDefaultToolButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/quick-tool.mixin.js").QuickToolMixinClass>;
export declare class EdgelessDefaultToolButton extends EdgelessDefaultToolButton_base {
    static styles: import("lit").CSSResult;
    type: GfxToolsFullOptionValue['type'][];
    private _changeTool;
    private _fadeIn;
    private _fadeOut;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor currentIcon: HTMLInputElement;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-default-tool-button': EdgelessDefaultToolButton;
    }
}
export {};
//# sourceMappingURL=default-tool-button.d.ts.map