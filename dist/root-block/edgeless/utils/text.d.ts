import type { ConnectorElementModel, FrameBlockModel, GroupElementModel } from '@blocksuite/affine-model';
import type { PointerEventState } from '@blocksuite/block-std';
import type { IVec } from '@blocksuite/global/utils';
import { type IModelCoord } from '@blocksuite/affine-block-surface';
import { ShapeElementModel, TextElementModel } from '@blocksuite/affine-model';
import type { EdgelessRootBlockComponent } from '../edgeless-root-block.js';
export declare function mountTextElementEditor(textElement: TextElementModel, edgeless: EdgelessRootBlockComponent, focusCoord?: IModelCoord): void;
export declare function mountShapeTextEditor(shapeElement: ShapeElementModel, edgeless: EdgelessRootBlockComponent): void;
export declare function mountFrameTitleEditor(frame: FrameBlockModel, edgeless: EdgelessRootBlockComponent): void;
export declare function mountGroupTitleEditor(group: GroupElementModel, edgeless: EdgelessRootBlockComponent): void;
/**
 * @deprecated
 *
 * Canvas Text has been deprecated
 */
export declare function addText(edgeless: EdgelessRootBlockComponent, event: PointerEventState): void;
export declare function mountConnectorLabelEditor(connector: ConnectorElementModel, edgeless: EdgelessRootBlockComponent, point?: IVec): void;
//# sourceMappingURL=text.d.ts.map