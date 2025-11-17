import { LitElement } from 'lit';
import { PieNode } from '../node.js';
export declare class PieNodeChild extends LitElement {
    static styles: import("lit").CSSResult[];
    protected render(): import("lit-html").TemplateResult<1>;
    accessor hovering: boolean;
    accessor node: PieNode;
    accessor onClick: (ev: MouseEvent) => void;
    accessor visible: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'pie-node-child': PieNodeChild;
    }
}
//# sourceMappingURL=pie-node-child.d.ts.map