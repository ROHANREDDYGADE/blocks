import type { PointerEventState } from '@blocksuite/block-std';
export declare class ImageResizeManager {
    private _activeComponent;
    private _dragMoveTarget;
    private _imageCenterX;
    private _imageContainer;
    private _zoom;
    onEnd(): void;
    onMove(e: PointerEventState): void;
    onStart(e: PointerEventState): void;
}
//# sourceMappingURL=image-resize-manager.d.ts.map