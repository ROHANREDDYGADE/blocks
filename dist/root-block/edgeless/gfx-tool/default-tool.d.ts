import type { PointerEventState } from '@blocksuite/block-std';
import type { IVec } from '@blocksuite/global/utils';
import { BaseTool } from '@blocksuite/block-std/gfx';
import type { EdgelessSnapManager } from '../utils/snap-manager.js';
import { DefaultModeDragType } from './default-tool-ext/ext.js';
export declare class DefaultTool extends BaseTool {
    static toolName: string;
    private _accumulateDelta;
    private _alignBound;
    private _autoPanTimer;
    private _clearDisposable;
    private _clearSelectingState;
    private _disposables;
    private _extHandlers;
    private _exts;
    private _hoveredFrame;
    private _isDoubleClickedOnMask;
    private _lock;
    private _panViewport;
    private _pendingUpdates;
    private _rafId;
    private _selectedBounds;
    private _selectedConnector;
    private _selectedConnectorLabelBounds;
    private _selectionRectTransition;
    private _startAutoPanning;
    private _stopAutoPanning;
    private _toBeMoved;
    private _updateSelectingState;
    private _wheeling;
    dragType: DefaultModeDragType;
    enableHover: boolean;
    private get _edgeless();
    private get _frameMgr();
    private get _supportedExts();
    /**
     * Get the end position of the dragging area in the model coordinate
     */
    get dragLastPos(): IVec;
    /**
     * Get the start position of the dragging area in the model coordinate
     */
    get dragStartPos(): IVec;
    get edgelessSelectionManager(): import("@blocksuite/block-std/gfx").GfxSelectionManager;
    private get frameOverlay();
    get snapOverlay(): EdgelessSnapManager;
    private _addEmptyParagraphBlock;
    private _cloneContent;
    private _determineDragType;
    private _filterConnectedConnector;
    private _isDraggable;
    private _moveContent;
    private _moveLabel;
    private _pick;
    private _scheduleUpdate;
    private initializeDragState;
    activate(_: Record<string, unknown>): void;
    click(e: PointerEventState): void;
    deactivate(): void;
    doubleClick(e: PointerEventState): void;
    dragEnd(e: PointerEventState): void;
    dragMove(e: PointerEventState): void;
    dragStart(e: PointerEventState): Promise<void>;
    mounted(): void;
    pointerDown(e: PointerEventState): void;
    pointerMove(e: PointerEventState): void;
    pointerUp(e: PointerEventState): void;
    tripleClick(): void;
    unmounted(): void;
}
declare module '@blocksuite/block-std/gfx' {
    interface GfxToolsMap {
        default: DefaultTool;
    }
}
//# sourceMappingURL=default-tool.d.ts.map