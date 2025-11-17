import type { GfxToolsFullOptionValue } from '@blocksuite/block-std/gfx';
import { LitElement } from 'lit';
declare const EdgelessEraserToolButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/tool.mixin.js").EdgelessToolbarToolClass>;
export declare class EdgelessEraserToolButton extends EdgelessEraserToolButton_base {
    static styles: import("lit").CSSResult;
    enableActiveBackground: boolean;
    type: GfxToolsFullOptionValue['type'];
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-eraser-tool-button': EdgelessEraserToolButton;
    }
}
export {};
//# sourceMappingURL=eraser-tool-button.d.ts.map