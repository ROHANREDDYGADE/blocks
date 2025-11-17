import { on } from '@blocksuite/affine-shared/utils';
import { BaseTool, MouseButton } from '@blocksuite/block-std/gfx';
import { Signal } from '@preact/signals-core';
export class PanTool extends BaseTool {
    constructor() {
        super(...arguments);
        this._lastPoint = null;
        this.panning$ = new Signal(false);
    }
    static { this.toolName = 'pan'; }
    get allowDragWithRightButton() {
        return true;
    }
    dragEnd(_) {
        this._lastPoint = null;
        this.panning$.value = false;
    }
    dragMove(e) {
        if (!this._lastPoint)
            return;
        const { viewport } = this.gfx;
        const { zoom } = viewport;
        const [lastX, lastY] = this._lastPoint;
        const deltaX = lastX - e.x;
        const deltaY = lastY - e.y;
        this._lastPoint = [e.x, e.y];
        viewport.applyDeltaCenter(deltaX / zoom, deltaY / zoom);
    }
    dragStart(e) {
        this._lastPoint = [e.x, e.y];
        this.panning$.value = true;
    }
    mounted() {
        this.addHook('pointerDown', evt => {
            const shouldPanWithMiddle = evt.raw.button === MouseButton.MIDDLE;
            if (!shouldPanWithMiddle) {
                return;
            }
            evt.raw.preventDefault();
            const currentTool = this.controller.currentToolOption$.peek();
            const restoreToPrevious = () => {
                this.controller.setTool(currentTool);
            };
            this.controller.setTool('pan', {
                panning: true,
            });
            const dispose = on(document, 'pointerup', evt => {
                if (evt.button === MouseButton.MIDDLE) {
                    restoreToPrevious();
                    dispose();
                }
            });
            return false;
        });
    }
}
//# sourceMappingURL=pan-tool.js.map