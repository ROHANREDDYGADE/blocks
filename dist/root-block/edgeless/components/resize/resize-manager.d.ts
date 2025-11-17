import { type IPoint, type PointLocation } from '@blocksuite/global/utils';
import { Bound } from '@blocksuite/global/utils';
import type { SelectableProps } from '../../utils/query.js';
import { HandleDirection, type ResizeMode } from './resize-handles.js';
type DragStartHandler = () => void;
type DragEndHandler = () => void;
type ResizeMoveHandler = (bounds: Map<string, {
    bound: Bound;
    path?: PointLocation[];
    matrix?: DOMMatrix;
}>, direction: HandleDirection) => void;
type RotateMoveHandler = (point: IPoint, rotate: number) => void;
export declare class HandleResizeManager {
    private _aspectRatio;
    private _bounds;
    /**
     * Current rect of selected elements, it may change during resizing or moving
     */
    private _currentRect;
    private _dragDirection;
    private _dragging;
    private _dragPos;
    private _locked;
    private _onDragEnd;
    private _onDragStart;
    private _onResizeMove;
    private _onRotateMove;
    private _origin;
    /**
     * Record inital rect of selected elements
     */
    private _originalRect;
    private _proportion;
    private _proportional;
    private _resizeMode;
    private _rotate;
    private _rotation;
    private _shiftKey;
    private _target;
    private _zoom;
    onPointerDown: (e: PointerEvent, direction: HandleDirection, proportional?: boolean) => void;
    get bounds(): Map<string, {
        bound: Bound;
        rotate: number;
    }>;
    get currentRect(): DOMRect;
    get dragDirection(): HandleDirection;
    get dragging(): boolean;
    get originalRect(): DOMRect;
    get rotation(): boolean;
    constructor(onDragStart: DragStartHandler, onResizeMove: ResizeMoveHandler, onRotateMove: RotateMoveHandler, onDragEnd: DragEndHandler);
    private _onResize;
    private _onRotate;
    onPressShiftKey(pressed: boolean): void;
    updateBounds(bounds: Map<string, SelectableProps>): void;
    updateRectPosition(delta: {
        x: number;
        y: number;
    }): DOMRect;
    updateState(resizeMode: ResizeMode, rotate: number, zoom: number, position?: {
        x: number;
        y: number;
    }, originalRect?: DOMRect, proportion?: boolean): void;
}
export {};
//# sourceMappingURL=resize-manager.d.ts.map