import { BaseTool, MouseButton } from '@blocksuite/block-std/gfx';
import { IS_MAC } from '@blocksuite/global/env';
import { Bound, getCommonBoundWithRotation } from '@blocksuite/global/utils';
import { Slot } from '@blocksuite/store';
import { AFFINE_AI_PANEL_WIDGET, } from '../../widgets/ai-panel/ai-panel.js';
export class CopilotTool extends BaseTool {
    constructor() {
        super(...arguments);
        this._dragging = false;
        this.draggingAreaUpdated = new Slot();
        this.dragLastPoint = [0, 0];
        this.dragStartPoint = [0, 0];
    }
    static { this.toolName = 'copilot'; }
    get allowDragWithRightButton() {
        return true;
    }
    get area() {
        const start = new DOMPoint(this.dragStartPoint[0], this.dragStartPoint[1]);
        const end = new DOMPoint(this.dragLastPoint[0], this.dragLastPoint[1]);
        const minX = Math.min(start.x, end.x);
        const minY = Math.min(start.y, end.y);
        const maxX = Math.max(start.x, end.x);
        const maxY = Math.max(start.y, end.y);
        return new DOMRect(minX, minY, maxX - minX, maxY - minY);
    }
    // AI processing
    get processing() {
        const aiPanel = this.gfx.std.view.getWidget(AFFINE_AI_PANEL_WIDGET, this.doc.root.id);
        return aiPanel && aiPanel.state !== 'hidden';
    }
    get selectedElements() {
        return this.gfx.selection.selectedElements;
    }
    _initDragState(e) {
        this.dragStartPoint = this.gfx.viewport.toModelCoord(e.x, e.y);
        this.dragLastPoint = this.dragStartPoint;
    }
    abort() {
        this._dragging = false;
        this.dragStartPoint = [0, 0];
        this.dragLastPoint = [0, 0];
        this.gfx.tool.setTool('default');
    }
    activate() {
        this.gfx.viewport.locked = true;
        if (this.gfx.selection.lastSurfaceSelections) {
            this.gfx.selection.set(this.gfx.selection.lastSurfaceSelections);
        }
    }
    deactivate() {
        this.gfx.viewport.locked = false;
    }
    dragEnd() {
        if (!this._dragging)
            return;
        this._dragging = false;
        this.draggingAreaUpdated.emit(true);
    }
    dragMove(e) {
        if (!this._dragging)
            return;
        this.dragLastPoint = this.gfx.viewport.toModelCoord(e.x, e.y);
        const area = this.area;
        const bound = new Bound(area.x, area.y, area.width, area.height);
        if (area.width & area.height) {
            const elements = this.gfx.getElementsByBound(bound);
            const set = new Set(elements);
            this.gfx.selection.set({
                elements: Array.from(set).map(element => element.id),
                editing: false,
                inoperable: true,
            });
        }
        this.draggingAreaUpdated.emit();
    }
    dragStart(e) {
        if (this.processing)
            return;
        this._initDragState(e);
        this._dragging = true;
        this.draggingAreaUpdated.emit();
    }
    mounted() {
        this.addHook('pointerDown', evt => {
            const useCopilot = evt.raw.button === MouseButton.SECONDARY ||
                (evt.raw.button === MouseButton.MAIN && IS_MAC
                    ? evt.raw.metaKey
                    : evt.raw.ctrlKey);
            if (useCopilot) {
                this.controller.setTool('copilot');
                return false;
            }
            return;
        });
    }
    pointerDown(e) {
        if (this.processing) {
            e.raw.stopPropagation();
            return;
        }
        this.gfx.tool.setTool('default');
    }
    updateDragPointsWith(selectedElements, padding = 0) {
        const bounds = getCommonBoundWithRotation(selectedElements).expand(padding / this.gfx.viewport.zoom);
        this.dragStartPoint = bounds.tl;
        this.dragLastPoint = bounds.br;
    }
    updateSelectionWith(selectedElements, padding = 0) {
        const { selection } = this.gfx;
        selection.clear();
        this.updateDragPointsWith(selectedElements, padding);
        selection.set({
            elements: selectedElements.map(e => e.id),
            editing: false,
            inoperable: true,
        });
        this.draggingAreaUpdated.emit(true);
    }
}
//# sourceMappingURL=copilot-tool.js.map