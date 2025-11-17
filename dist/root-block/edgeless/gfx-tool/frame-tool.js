import { OverlayIdentifier } from '@blocksuite/affine-block-surface';
import { TelemetryProvider } from '@blocksuite/affine-shared/services';
import { BaseTool, getTopElements, GfxExtensionIdentifier, } from '@blocksuite/block-std/gfx';
import { Bound, Vec } from '@blocksuite/global/utils';
import { DocCollection, Text } from '@blocksuite/store';
export class FrameTool extends BaseTool {
    constructor() {
        super(...arguments);
        this._frame = null;
        this._startPoint = null;
    }
    static { this.toolName = 'frame'; }
    get frameManager() {
        return this.std.get(GfxExtensionIdentifier('frame-manager'));
    }
    get frameOverlay() {
        return this.std.get(OverlayIdentifier('frame'));
    }
    _toModelCoord(p) {
        return this.gfx.viewport.toModelCoord(p.x, p.y);
    }
    dragEnd() {
        if (this._frame) {
            const frame = this._frame;
            this.doc.transact(() => {
                frame.pop('xywh');
            });
            this.gfx.tool.setTool('default');
            this.gfx.selection.set({
                elements: [frame.id],
                editing: false,
            });
            this.frameManager.addElementsToFrame(frame, getTopElements(this.frameManager.getElementsInFrameBound(frame)));
            this.doc.captureSync();
        }
        this._frame = null;
        this._startPoint = null;
        this.frameOverlay.clear();
    }
    dragMove(e) {
        if (!this._startPoint)
            return;
        const currentPoint = this._toModelCoord(e.point);
        if (Vec.dist(this._startPoint, currentPoint) < 8 && !this._frame)
            return;
        if (!this._frame) {
            const frames = this.gfx.layer.blocks.filter(block => block.flavour === 'affine:frame');
            const id = this.doc.addBlock('affine:frame', {
                title: new Text(new DocCollection.Y.Text(`Frame ${frames.length + 1}`)),
                xywh: Bound.fromPoints([this._startPoint, currentPoint]).serialize(),
                index: this.gfx.layer.generateIndex(true),
                presentationIndex: this.frameManager.generatePresentationIndex(),
            }, this.gfx.surface);
            this.std.getOptional(TelemetryProvider)?.track('CanvasElementAdded', {
                control: 'canvas:draw',
                page: 'whiteboard editor',
                module: 'toolbar',
                segment: 'toolbar',
                type: 'frame',
            });
            this._frame = this.gfx.getElementById(id);
            this._frame.stash('xywh');
            return;
        }
        this.gfx.doc.updateBlock(this._frame, {
            xywh: Bound.fromPoints([this._startPoint, currentPoint]).serialize(),
        });
        this.frameOverlay.highlight(this._frame, true);
    }
    dragStart(e) {
        this.doc.captureSync();
        const { point } = e;
        this._startPoint = this._toModelCoord(point);
    }
}
//# sourceMappingURL=frame-tool.js.map