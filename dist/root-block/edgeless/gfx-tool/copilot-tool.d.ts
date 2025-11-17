import type { PointerEventState } from '@blocksuite/block-std';
import { BaseTool } from '@blocksuite/block-std/gfx';
import { Slot } from '@blocksuite/store';
export declare class CopilotTool extends BaseTool {
    static toolName: string;
    private _dragging;
    draggingAreaUpdated: Slot<boolean | void>;
    dragLastPoint: [number, number];
    dragStartPoint: [number, number];
    get allowDragWithRightButton(): boolean;
    get area(): DOMRect;
    get processing(): boolean;
    get selectedElements(): import("@blocksuite/block-std/gfx").GfxModel[];
    private _initDragState;
    abort(): void;
    activate(): void;
    deactivate(): void;
    dragEnd(): void;
    dragMove(e: PointerEventState): void;
    dragStart(e: PointerEventState): void;
    mounted(): void;
    pointerDown(e: PointerEventState): void;
    updateDragPointsWith(selectedElements: BlockSuite.EdgelessModel[], padding?: number): void;
    updateSelectionWith(selectedElements: BlockSuite.EdgelessModel[], padding?: number): void;
}
declare module '@blocksuite/block-std/gfx' {
    interface GfxToolsMap {
        copilot: CopilotTool;
    }
}
//# sourceMappingURL=copilot-tool.d.ts.map