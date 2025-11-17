import type { AffineDragHandleWidget } from '../drag-handle.js';
export declare class DragEventWatcher {
    readonly widget: AffineDragHandleWidget;
    private _computeEdgelessBound;
    private _createDropIndicator;
    private _dragEndHandler;
    private _dragMoveHandler;
    /**
     * When start dragging, should set dragging elements and create drag preview
     */
    private _dragStartHandler;
    private _dropHandler;
    private _onDragMove;
    private _onDragStart;
    private _onDrop;
    private _onDropNoteOnNote;
    private _onDropOnEdgelessCanvas;
    private _startDragging;
    private _trackLinkedDocCreated;
    private get _dndAPI();
    private get _std();
    constructor(widget: AffineDragHandleWidget);
    private _deserializeData;
    private _deserializeSnapshot;
    private _getJob;
    private _serializeData;
    watch(): void;
}
//# sourceMappingURL=drag-event-watcher.d.ts.map