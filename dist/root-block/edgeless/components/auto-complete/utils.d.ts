import type { GfxController } from '@blocksuite/block-std/gfx';
import type { XYWH } from '@blocksuite/global/utils';
import { type Options, Overlay, type RoughCanvas } from '@blocksuite/affine-block-surface';
import { type NoteBlockModel, ShapeElementModel, type ShapeName, type ShapeStyle } from '@blocksuite/affine-model';
import { Bound } from '@blocksuite/global/utils';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
export declare enum Direction {
    Right = 0,
    Bottom = 1,
    Left = 2,
    Top = 3
}
export declare const PANEL_WIDTH = 136;
export declare const PANEL_HEIGHT = 108;
export declare const MAIN_GAP = 100;
export declare const SECOND_GAP = 20;
export declare const DEFAULT_NOTE_OVERLAY_HEIGHT = 110;
export declare const DEFAULT_TEXT_WIDTH = 116;
export declare const DEFAULT_TEXT_HEIGHT = 24;
export type TARGET_SHAPE_TYPE = ShapeName;
export type AUTO_COMPLETE_TARGET_TYPE = TARGET_SHAPE_TYPE | 'text' | 'note' | 'frame';
declare class AutoCompleteTargetOverlay extends Overlay {
    xywh: XYWH;
    constructor(gfx: GfxController, xywh: XYWH);
    render(_ctx: CanvasRenderingContext2D, _rc: RoughCanvas): void;
}
export declare class AutoCompleteTextOverlay extends AutoCompleteTargetOverlay {
    constructor(gfx: GfxController, xywh: XYWH);
    render(ctx: CanvasRenderingContext2D, _rc: RoughCanvas): void;
}
export declare class AutoCompleteNoteOverlay extends AutoCompleteTargetOverlay {
    private _background;
    constructor(gfx: GfxController, xywh: XYWH, background: string);
    render(ctx: CanvasRenderingContext2D, _rc: RoughCanvas): void;
}
export declare class AutoCompleteFrameOverlay extends AutoCompleteTargetOverlay {
    private _strokeColor;
    constructor(gfx: GfxController, xywh: XYWH, strokeColor: string);
    render(ctx: CanvasRenderingContext2D, _rc: RoughCanvas): void;
}
export declare class AutoCompleteShapeOverlay extends Overlay {
    private _shape;
    constructor(gfx: GfxController, xywh: XYWH, type: TARGET_SHAPE_TYPE, options: Options, shapeStyle: ShapeStyle);
    render(ctx: CanvasRenderingContext2D, rc: RoughCanvas): void;
}
export declare function nextBound(type: Direction, curShape: ShapeElementModel, elements: ShapeElementModel[]): Bound;
export declare function getPosition(type: Direction): {
    startPosition: [number, number];
    endPosition: [number, number];
};
export declare function isShape(element: unknown): element is ShapeElementModel;
export declare function capitalizeFirstLetter(str: string): string;
export declare function createEdgelessElement(edgeless: EdgelessRootBlockComponent, current: ShapeElementModel | NoteBlockModel, bound: Bound): string;
export declare function createShapeElement(edgeless: EdgelessRootBlockComponent, current: ShapeElementModel | NoteBlockModel, targetType: TARGET_SHAPE_TYPE): string;
export {};
//# sourceMappingURL=utils.d.ts.map