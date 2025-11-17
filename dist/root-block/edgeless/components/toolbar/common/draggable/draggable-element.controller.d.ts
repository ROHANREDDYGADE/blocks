import { type ReactiveController, type ReactiveControllerHost } from 'lit';
import { type DraggingInfo } from './overlay-factory.js';
import { type EdgelessDraggableElementHost, type EdgelessDraggableElementOptions, type ElementInfo, type OverlayLayer } from './types.js';
interface ReactiveState<T> {
    cancelled: boolean;
    draggingElement: ElementInfo<T> | null;
    dragOut: boolean | null;
}
interface EventCache {
    onMouseUp?: (e: MouseEvent) => void;
    onMouseMove?: (e: MouseEvent) => void;
    onTouchMove?: (e: TouchEvent) => void;
    onTouchEnd?: (e: TouchEvent) => void;
}
export declare class EdgelessDraggableElementController<T> implements ReactiveController {
    host: EdgelessDraggableElementHost & ReactiveControllerHost;
    options: EdgelessDraggableElementOptions<T>;
    clearTimeout: ReturnType<typeof setTimeout> | null;
    events: EventCache;
    info: DraggingInfo<T>;
    overlay: OverlayLayer | null;
    states: ReactiveState<T>;
    constructor(host: EdgelessDraggableElementHost & ReactiveControllerHost, options: EdgelessDraggableElementOptions<T>);
    /**
     * let overlay shape animate back to the original position
     */
    private _animateCancelDrop;
    private _createOverlay;
    private _onDragEnd;
    private _onDragMove;
    private _onDragStart;
    /**
     * Update overlay shape scale according to the current zoom level
     */
    private _updateOverlayScale;
    /**
     * @internal
     */
    private _updateState;
    private _updateStates;
    /**
     * Cancel the current dragging & animate even if dragOut
     */
    cancel(): void;
    /**
     * Same as {@link cancel} but without animation
     */
    cancelWithoutAnimation(): void;
    /**
     * A workaround to apply click event manually
     */
    clickToDrag(target: HTMLElement, startPos: {
        x: number;
        y: number;
    }): void;
    hostConnected(): void;
    hostDisconnected(): void;
    onMouseDown(e: MouseEvent, elementInfo: ElementInfo<T>): void;
    onTouchStart(e: TouchEvent, elementInfo: ElementInfo<T>): void;
    removeAllEvents(): void;
    reset(): void;
    updateElementInfo(elementInfo: Partial<ElementInfo<T>>): void;
}
export {};
//# sourceMappingURL=draggable-element.controller.d.ts.map