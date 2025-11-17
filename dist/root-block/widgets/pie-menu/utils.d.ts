import type { ToolController } from '@blocksuite/block-std/gfx';
import type { IVec } from '@blocksuite/global/utils';
import type { ActionFunction, IPieNodeWithAction, PieColorNodeModel, PieCommandNodeModel, PieMenuContext, PieNodeModel, PieNonRootNode, PieRootNodeModel, PieSubmenuNodeModel } from './base.js';
import { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
export declare function updateShapeOverlay(rootComponent: EdgelessRootBlockComponent): void;
export declare function getActiveShapeColor(type: 'fill' | 'stroke'): ({ rootComponent }: PieMenuContext) => string;
export declare function getActiveConnectorStrokeColor({ rootComponent, }: PieMenuContext): string;
export declare function setEdgelessToolAction(callback: (tool: ToolController) => void): ActionFunction;
export declare function getPosition(angleRad: number, v: IVec): IVec;
export declare function isNodeWithChildren(node: PieNodeModel): node is PieNodeModel & {
    children: PieNonRootNode[];
};
export declare function isRootNode(model: PieNodeModel): model is PieRootNodeModel;
export declare function isSubmenuNode(model: PieNodeModel): model is PieSubmenuNodeModel;
export declare function isCommandNode(model: PieNodeModel): model is PieCommandNodeModel;
export declare function isColorNode(model: PieNodeModel): model is PieColorNodeModel;
export declare function isNodeWithAction(node: PieNodeModel): node is IPieNodeWithAction;
export declare function calcNodeAngles(node: {
    angle?: number;
}[], parentAngle?: number): number[];
export declare function calcNodeWedges(nodeAngles: number[], parentAngle?: number): {
    start: number;
    end: number;
}[];
export declare function isAngleBetween(angle: number, start: number, end: number): boolean;
//# sourceMappingURL=utils.d.ts.map