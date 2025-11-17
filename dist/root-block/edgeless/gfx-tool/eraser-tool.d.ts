import type { PointerEventState } from '@blocksuite/block-std';
import { BaseTool } from '@blocksuite/block-std/gfx';
export declare class EraserTool extends BaseTool {
    static toolName: string;
    private _erasable;
    private _eraserPoints;
    private _eraseTargets;
    private _loop;
    private _overlay;
    private _prevEraserPoint;
    private _prevPoint;
    private _timer;
    private _timestamp;
    private _reset;
    activate(): void;
    dragEnd(_: PointerEventState): void;
    dragMove(e: PointerEventState): void;
    dragStart(e: PointerEventState): void;
}
declare module '@blocksuite/block-std/gfx' {
    interface GfxToolsMap {
        eraser: EraserTool;
    }
}
//# sourceMappingURL=eraser-tool.d.ts.map