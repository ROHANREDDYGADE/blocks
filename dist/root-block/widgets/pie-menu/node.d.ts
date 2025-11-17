import type { IVec } from '@blocksuite/global/utils';
import { LitElement } from 'lit';
import type { PieNodeModel } from './base.js';
import type { PieMenu } from './menu.js';
declare const PieNode_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class PieNode extends PieNode_base {
    static styles: import("lit").CSSResult;
    private _handleChildNodeClick;
    private _handleGoBack;
    private _onPointerAngleUpdated;
    private _rotatorAngle;
    get icon(): import("lit-html").TemplateResult | undefined;
    private _renderCenterNode;
    private _renderChildNode;
    private _setupEvents;
    connectedCallback(): void;
    isActive(): boolean;
    isCenterNode(): boolean;
    protected render(): import("lit-html").TemplateResult<1>;
    select(): void;
    private accessor _isHovering;
    accessor angle: number;
    accessor containerNode: PieNode | null;
    accessor endAngle: number;
    accessor index: number;
    accessor menu: PieMenu;
    accessor model: PieNodeModel;
    accessor position: IVec;
    accessor startAngle: number;
}
declare global {
    interface HTMLElementTagNameMap {
        'pie-node': PieNode;
    }
}
export {};
//# sourceMappingURL=node.d.ts.map