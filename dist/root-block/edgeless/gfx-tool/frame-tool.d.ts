import type { PointerEventState } from '@blocksuite/block-std';
import { BaseTool } from '@blocksuite/block-std/gfx';
import type { EdgelessFrameManager, FrameOverlay } from '../frame-manager.js';
export declare class FrameTool extends BaseTool {
    static toolName: string;
    private _frame;
    private _startPoint;
    get frameManager(): EdgelessFrameManager;
    get frameOverlay(): FrameOverlay;
    private _toModelCoord;
    dragEnd(): void;
    dragMove(e: PointerEventState): void;
    dragStart(e: PointerEventState): void;
}
declare module '@blocksuite/block-std/gfx' {
    interface GfxToolsMap {
        frame: FrameTool;
    }
}
//# sourceMappingURL=frame-tool.d.ts.map