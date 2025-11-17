import type { GfxToolsFullOptionValue } from '@blocksuite/block-std/gfx';
import { LitElement } from 'lit';
declare const EdgelessFrameToolButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/quick-tool.mixin.js").QuickToolMixinClass>;
export declare class EdgelessFrameToolButton extends EdgelessFrameToolButton_base {
    static styles: import("lit").CSSResult;
    type: GfxToolsFullOptionValue['type'];
    private _toggleFrameMenu;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-frame-tool-button': EdgelessFrameToolButton;
    }
}
export {};
//# sourceMappingURL=frame-tool-button.d.ts.map