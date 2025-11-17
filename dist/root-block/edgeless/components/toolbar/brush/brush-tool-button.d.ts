import { LitElement } from 'lit';
declare const EdgelessBrushToolButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/tool.mixin.js").EdgelessToolbarToolClass>;
export declare class EdgelessBrushToolButton extends EdgelessBrushToolButton_base {
    static styles: import("lit").CSSResult;
    private _color$;
    enableActiveBackground: boolean;
    type: "brush";
    private _toggleBrushMenu;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-brush-tool-button': EdgelessBrushToolButton;
    }
}
export {};
//# sourceMappingURL=brush-tool-button.d.ts.map