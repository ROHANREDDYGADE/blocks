import type { PointerEventState } from '@blocksuite/block-std';
import { BaseTool } from '@blocksuite/block-std/gfx';
import { Signal } from '@preact/signals-core';
export type PanToolOption = {
    panning: boolean;
};
export declare class PanTool extends BaseTool<PanToolOption> {
    static toolName: string;
    private _lastPoint;
    readonly panning$: Signal<boolean>;
    get allowDragWithRightButton(): boolean;
    dragEnd(_: PointerEventState): void;
    dragMove(e: PointerEventState): void;
    dragStart(e: PointerEventState): void;
    mounted(): void;
}
declare module '@blocksuite/block-std/gfx' {
    interface GfxToolsMap {
        pan: PanTool;
    }
    interface GfxToolsOption {
        pan: PanToolOption;
    }
}
//# sourceMappingURL=pan-tool.d.ts.map