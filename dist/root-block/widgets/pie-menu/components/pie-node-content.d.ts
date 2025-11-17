import { LitElement, type PropertyValues } from 'lit';
import type { PieNode } from '../node.js';
export declare class PieNodeContent extends LitElement {
    static styles: import("lit").CSSResult;
    private _renderCenterNodeContent;
    private _renderChildNodeContent;
    protected render(): import("lit-html").TemplateResult<1>;
    protected updated(changedProperties: PropertyValues): void;
    private accessor _nodeContentElement;
    accessor hoveredNode: PieNode | null;
    accessor isActive: boolean;
    accessor node: PieNode;
}
declare global {
    interface HTMLElementTagNameMap {
        'pie-node-content': PieNodeContent;
    }
}
//# sourceMappingURL=pie-node-content.d.ts.map