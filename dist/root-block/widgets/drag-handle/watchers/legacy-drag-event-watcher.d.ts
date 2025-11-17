import type { AffineDragHandleWidget } from '../drag-handle.js';
export declare class LegacyDragEventWatcher {
    readonly widget: AffineDragHandleWidget;
    private _changeCursorToGrabbing;
    private _createDropIndicator;
    /**
     * When drag end, should move blocks to drop position
     */
    private _dragEndHandler;
    /**
     * When dragging, should:
     * Update drag preview position
     * Update indicator position
     * Update drop block id
     */
    private _dragMoveHandler;
    /**
     * When start dragging, should set dragging elements and create drag preview
     */
    private _dragStartHandler;
    private _onDragEnd;
    private _onDragMove;
    private _onDragStart;
    private _startDragging;
    constructor(widget: AffineDragHandleWidget);
    watch(): void;
}
//# sourceMappingURL=legacy-drag-event-watcher.d.ts.map