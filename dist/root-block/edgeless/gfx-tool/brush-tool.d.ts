import type { PointerEventState } from '@blocksuite/block-std';
import { BaseTool } from '@blocksuite/block-std/gfx';
export declare class BrushTool extends BaseTool {
    static BRUSH_POP_GAP: number;
    static toolName: string;
    private _draggingElement;
    private _draggingElementId;
    private _lastPoint;
    private _lastPopLength;
    private _pressureSupportedPointerIds;
    private _straightLineType;
    protected _draggingPathPoints: number[][] | null;
    protected _draggingPathPressures: number[] | null;
    private _getStraightLineType;
    private _tryGetPressurePoints;
    dragEnd(): void;
    dragMove(e: PointerEventState): void;
    dragStart(e: PointerEventState): void;
}
declare module '@blocksuite/block-std/gfx' {
    interface GfxToolsMap {
        brush: BrushTool;
    }
}
//# sourceMappingURL=brush-tool.d.ts.map