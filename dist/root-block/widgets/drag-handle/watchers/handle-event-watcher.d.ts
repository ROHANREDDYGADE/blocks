import type { AffineDragHandleWidget } from '../drag-handle.js';
export declare class HandleEventWatcher {
    readonly widget: AffineDragHandleWidget;
    private _onDragHandlePointerDown;
    private _onDragHandlePointerEnter;
    private _onDragHandlePointerLeave;
    private _onDragHandlePointerUp;
    constructor(widget: AffineDragHandleWidget);
    watch(): void;
}
//# sourceMappingURL=handle-event-watcher.d.ts.map