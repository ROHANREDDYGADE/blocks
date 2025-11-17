import { LitElement } from 'lit';
import { PieNode } from '../node.js';
export declare class PieNodeCenter extends LitElement {
    static styles: import("lit").CSSResult[];
    protected render(): import("lit-html").TemplateResult<1>;
    accessor hoveredNode: PieNode | null;
    accessor isActive: boolean;
    accessor node: PieNode;
    accessor onMouseEnter: (ev: MouseEvent) => void;
    accessor rotatorAngle: number | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'pie-node-center': PieNodeCenter;
    }
}
//# sourceMappingURL=pie-node-center.d.ts.map