import type { ShapeName } from '@blocksuite/affine-model';
import type { PointerEventState } from '@blocksuite/block-std';
import { BaseTool } from '@blocksuite/block-std/gfx';
export type ShapeToolOption = {
    shapeName: ShapeName;
};
export declare class ShapeTool extends BaseTool<ShapeToolOption> {
    static toolName: string;
    private _disableOverlay;
    private _draggingElement;
    private _draggingElementId;
    private _shapeOverlay;
    private _spacePressedCtx;
    private _addNewShape;
    private _hideOverlay;
    private _resize;
    private _updateOverlayPosition;
    activate(): void;
    clearOverlay(): void;
    click(e: PointerEventState): void;
    createOverlay(): void;
    deactivate(): void;
    dragEnd(): void;
    dragMove(e: PointerEventState): void;
    dragStart(e: PointerEventState): void;
    mounted(): void;
    pointerMove(e: PointerEventState): void;
    pointerOut(e: PointerEventState): void;
    setDisableOverlay(disable: boolean): void;
}
declare module '@blocksuite/block-std/gfx' {
    interface GfxToolsMap {
        shape: ShapeTool;
    }
    interface GfxToolsOption {
        shape: ShapeToolOption;
    }
}
//# sourceMappingURL=shape-tool.d.ts.map