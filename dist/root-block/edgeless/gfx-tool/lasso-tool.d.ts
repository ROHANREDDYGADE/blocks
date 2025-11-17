import type { PointerEventState } from '@blocksuite/block-std';
import { type SurfaceBlockComponent } from '@blocksuite/affine-block-surface';
import { BaseTool } from '@blocksuite/block-std/gfx';
import { LassoMode } from '../../../_common/types.js';
export type LassoToolOption = {
    mode: LassoMode;
};
export declare class LassoTool extends BaseTool<LassoToolOption> {
    static toolName: string;
    private _currentSelectionState;
    private _isSelecting;
    private _lassoPoints;
    private _lastPoint;
    private _loop;
    private _overlay;
    private _raf;
    get isSelecting(): boolean;
    get selection(): import("@blocksuite/block-std/gfx").GfxSelectionManager;
    get surfaceComponent(): SurfaceBlockComponent;
    private _clearLastSelection;
    private _getElementsInsideLasso;
    private _getSelectionMode;
    private _reset;
    private _setSelectionState;
    private _updateSelection;
    private isInsideLassoSelection;
    private toModelCoord;
    abort(): void;
    activate(): void;
    deactivate(): void;
    dragEnd(e: PointerEventState): void;
    dragMove(e: PointerEventState): void;
    dragStart(e: PointerEventState): void;
    pointerDown(e: PointerEventState): void;
    pointerMove(e: PointerEventState): void;
}
declare module '@blocksuite/block-std/gfx' {
    interface GfxToolsMap {
        lasso: LassoTool;
    }
    interface GfxToolsOption {
        lasso: LassoToolOption;
    }
}
//# sourceMappingURL=lasso-tool.d.ts.map