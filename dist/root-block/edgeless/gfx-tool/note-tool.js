import { DEFAULT_NOTE_HEIGHT, DEFAULT_NOTE_WIDTH, } from '@blocksuite/affine-model';
import { EditPropsStore } from '@blocksuite/affine-shared/services';
import { BaseTool } from '@blocksuite/block-std/gfx';
import { Point } from '@blocksuite/global/utils';
import { effect } from '@preact/signals-core';
import { hasClassNameInList, } from '../../../_common/utils/index.js';
import { addNote } from '../utils/common.js';
import { EXCLUDING_MOUSE_OUT_CLASS_LIST } from '../utils/consts.js';
import { DraggingNoteOverlay, NoteOverlay } from '../utils/tool-overlay.js';
export class NoteTool extends BaseTool {
    constructor() {
        super(...arguments);
        this._draggingNoteOverlay = null;
        this._noteOverlay = null;
    }
    static { this.toolName = 'affine:note'; }
    // Ensure clear overlay before adding a new note
    _clearOverlay() {
        this._noteOverlay = this._disposeOverlay(this._noteOverlay);
        this._draggingNoteOverlay = this._disposeOverlay(this._draggingNoteOverlay);
        this.gfx.surfaceComponent.refresh();
    }
    _disposeOverlay(overlay) {
        if (!overlay)
            return null;
        overlay.dispose();
        this.gfx.surfaceComponent?.renderer.removeOverlay(overlay);
        return null;
    }
    // Should hide overlay when mouse is out of viewport or on menu and toolbar
    _hideOverlay() {
        if (!this._noteOverlay)
            return;
        this._noteOverlay.globalAlpha = 0;
        this.gfx.surfaceComponent?.refresh();
    }
    _resize(shift = false) {
        const { _draggingNoteOverlay } = this;
        if (!_draggingNoteOverlay)
            return;
        const draggingArea = this.controller.draggingArea$.peek();
        const { startX, startY } = draggingArea;
        let { endX, endY } = this.controller.draggingArea$.peek();
        if (shift) {
            const w = Math.abs(endX - startX);
            const h = Math.abs(endY - startY);
            const m = Math.max(w, h);
            endX = startX + (endX > startX ? m : -m);
            endY = startY + (endY > startY ? m : -m);
        }
        _draggingNoteOverlay.slots.draggingNoteUpdated.emit({
            xywh: [
                Math.min(startX, endX),
                Math.min(startY, endY),
                Math.abs(startX - endX),
                Math.abs(startY - endY),
            ],
        });
    }
    _updateOverlayPosition(x, y) {
        if (!this._noteOverlay)
            return;
        this._noteOverlay.x = x;
        this._noteOverlay.y = y;
        this.gfx.surfaceComponent.refresh();
    }
    activate() {
        const attributes = this.std.get(EditPropsStore).lastProps$.value['affine:note'];
        const background = attributes.background;
        this._noteOverlay = new NoteOverlay(this.gfx, background);
        this._noteOverlay.text = this.activatedOption.tip;
        this.gfx.surfaceComponent.renderer.addOverlay(this._noteOverlay);
    }
    click(e) {
        this._clearOverlay();
        const { childFlavour, childType } = this.activatedOption;
        const options = {
            childFlavour,
            childType,
            collapse: false,
        };
        const point = new Point(e.point.x, e.point.y);
        addNote(this.std, point, options);
    }
    deactivate() {
        this._clearOverlay();
    }
    dragEnd() {
        if (!this._draggingNoteOverlay)
            return;
        const { x, y, width, height } = this._draggingNoteOverlay;
        this._disposeOverlay(this._draggingNoteOverlay);
        const { childFlavour, childType } = this.activatedOption;
        const options = {
            childFlavour,
            childType,
            collapse: true,
        };
        const [viewX, viewY] = this.gfx.viewport.toViewCoord(x, y);
        const point = new Point(viewX, viewY);
        this.doc.captureSync();
        addNote(this.std, point, options, Math.max(width, DEFAULT_NOTE_WIDTH), Math.max(height, DEFAULT_NOTE_HEIGHT));
    }
    dragMove(e) {
        if (!this._draggingNoteOverlay)
            return;
        this._resize(e.keys.shift || this.gfx.keyboard.shiftKey$.peek());
    }
    dragStart() {
        this._clearOverlay();
        const attributes = this.std.get(EditPropsStore).lastProps$.value['affine:note'];
        const background = attributes.background;
        this._draggingNoteOverlay = new DraggingNoteOverlay(this.gfx, background);
        this.gfx.surfaceComponent.renderer.addOverlay(this._draggingNoteOverlay);
    }
    mounted() {
        this.disposable.add(effect(() => {
            const shiftPressed = this.gfx.keyboard.shiftKey$.value;
            if (!this._draggingNoteOverlay) {
                return;
            }
            this._resize(shiftPressed);
        }));
    }
    pointerMove(e) {
        if (!this._noteOverlay)
            return;
        // if mouse is in viewport and move, update overlay pointion and show overlay
        if (this._noteOverlay.globalAlpha === 0)
            this._noteOverlay.globalAlpha = 1;
        const [x, y] = this.gfx.viewport.toModelCoord(e.x, e.y);
        this._updateOverlayPosition(x, y);
    }
    pointerOut(e) {
        // should not hide the overlay when pointer on the area of other notes
        if (e.raw.relatedTarget &&
            hasClassNameInList(e.raw.relatedTarget, EXCLUDING_MOUSE_OUT_CLASS_LIST))
            return;
        this._hideOverlay();
    }
}
//# sourceMappingURL=note-tool.js.map