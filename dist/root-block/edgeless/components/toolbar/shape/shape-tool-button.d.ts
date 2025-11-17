import { LitElement } from 'lit';
declare const EdgelessShapeToolButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/tool.mixin.js").EdgelessToolbarToolClass>;
export declare class EdgelessShapeToolButton extends EdgelessShapeToolButton_base {
    static styles: import("lit").CSSResult;
    private _handleShapeClick;
    private _handleWrapperClick;
    type: "shape";
    private _toggleMenu;
    private _updateOverlay;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-shape-tool-button': EdgelessShapeToolButton;
    }
}
export {};
//# sourceMappingURL=shape-tool-button.d.ts.map