import type { AffineDragHandleWidget } from '../drag-handle.js';
export declare class PointerEventWatcher {
    readonly widget: AffineDragHandleWidget;
    private _canEditing;
    /**
     * When click on drag handle
     * Should select the block and show slash menu if current block is not selected
     * Should clear selection if current block is the first selected block
     */
    private _clickHandler;
    private _getTopWithBlockComponent;
    private _containerStyle;
    private _grabberStyle;
    private _lastHoveredBlockId;
    private _lastShowedBlock;
    /**
     * When pointer move on block, should show drag handle
     * And update hover block id and path
     */
    private _pointerMoveOnBlock;
    private _pointerOutHandler;
    private _throttledPointerMoveHandler;
    showDragHandleOnHoverBlock: () => void;
    constructor(widget: AffineDragHandleWidget);
    reset(): void;
    watch(): void;
}
//# sourceMappingURL=pointer-event-watcher.d.ts.map