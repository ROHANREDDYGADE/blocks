import type { GfxController } from '@blocksuite/block-std/gfx';
import type { XYWH } from '@blocksuite/global/utils';
import { type Options, Overlay, type RoughCanvas } from '@blocksuite/affine-block-surface';
import { type Color, type ShapeStyle } from '@blocksuite/affine-model';
import { DisposableGroup, Slot } from '@blocksuite/global/utils';
export declare abstract class Shape {
    options: Options;
    shapeStyle: ShapeStyle;
    type: string;
    xywh: XYWH;
    constructor(xywh: XYWH, type: string, options: Options, shapeStyle: ShapeStyle);
    abstract draw(ctx: CanvasRenderingContext2D, rc: RoughCanvas): void;
}
export declare class RectShape extends Shape {
    draw(ctx: CanvasRenderingContext2D, rc: RoughCanvas): void;
}
export declare class TriangleShape extends Shape {
    draw(ctx: CanvasRenderingContext2D, rc: RoughCanvas): void;
}
export declare class DiamondShape extends Shape {
    draw(ctx: CanvasRenderingContext2D, rc: RoughCanvas): void;
}
export declare class EllipseShape extends Shape {
    draw(ctx: CanvasRenderingContext2D, rc: RoughCanvas): void;
}
export declare class RoundedRectShape extends Shape {
    draw(ctx: CanvasRenderingContext2D, rc: RoughCanvas): void;
}
export declare class ShapeFactory {
    static createShape(xywh: XYWH, type: string, options: Options, shapeStyle: ShapeStyle): Shape;
}
declare class ToolOverlay extends Overlay {
    protected disposables: DisposableGroup;
    globalAlpha: number;
    x: number;
    y: number;
    constructor(gfx: GfxController);
    dispose(): void;
    render(_ctx: CanvasRenderingContext2D, _rc: RoughCanvas): void;
}
export declare class ShapeOverlay extends ToolOverlay {
    shape: Shape;
    constructor(gfx: GfxController, type: string, options: Options, style: {
        shapeStyle: ShapeStyle;
        fillColor: Color;
        strokeColor: Color;
    });
    render(ctx: CanvasRenderingContext2D, rc: RoughCanvas): void;
}
export declare class NoteOverlay extends ToolOverlay {
    backgroundColor: string;
    text: string;
    constructor(gfx: GfxController, background: Color);
    private _getOverlayText;
    render(ctx: CanvasRenderingContext2D): void;
}
export declare class DraggingNoteOverlay extends NoteOverlay {
    height: number;
    slots: {
        draggingNoteUpdated: Slot<{
            xywh: XYWH;
        }>;
    };
    width: number;
    constructor(gfx: GfxController, background: Color);
    render(ctx: CanvasRenderingContext2D): void;
}
export {};
//# sourceMappingURL=tool-overlay.d.ts.map