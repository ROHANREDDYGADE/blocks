import type { GfxToolsFullOptionValue } from '@blocksuite/block-std/gfx';
import { LitElement } from 'lit';
declare const EdgelessTemplateButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/tool.mixin.js").EdgelessToolbarToolClass>;
export declare class EdgelessTemplateButton extends EdgelessTemplateButton_base {
    static styles: import("lit").CSSResult;
    private _cleanup;
    private _prevTool;
    enableActiveBackground: boolean;
    type: GfxToolsFullOptionValue['type'];
    get cards(): import("lit-html").TemplateResult<2>[];
    private _closePanel;
    private _togglePanel;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _openedPanel;
}
export {};
//# sourceMappingURL=template-tool-button.d.ts.map