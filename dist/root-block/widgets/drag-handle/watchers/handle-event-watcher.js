import { DRAG_HANDLE_CONTAINER_PADDING, DRAG_HANDLE_GRABBER_BORDER_RADIUS, DRAG_HANDLE_GRABBER_WIDTH_HOVERED, } from '../config.js';
export class HandleEventWatcher {
    constructor(widget) {
        this.widget = widget;
        this._onDragHandlePointerDown = () => {
            if (!this.widget.isHoverDragHandleVisible || !this.widget.anchorBlockId)
                return;
            this.widget.dragHoverRect = this.widget.draggingAreaRect.value;
        };
        this._onDragHandlePointerEnter = () => {
            const container = this.widget.dragHandleContainer;
            const grabber = this.widget.dragHandleGrabber;
            if (!container || !grabber)
                return;
            if (this.widget.isHoverDragHandleVisible && this.widget.anchorBlockId) {
                const block = this.widget.anchorBlockComponent;
                if (!block)
                    return;
                const padding = DRAG_HANDLE_CONTAINER_PADDING * this.widget.scale.peek();
                container.style.paddingTop = `${padding}px`;
                container.style.paddingBottom = `${padding}px`;
                container.style.transition = `padding 0.25s ease`;
                grabber.style.width = `${DRAG_HANDLE_GRABBER_WIDTH_HOVERED * this.widget.scaleInNote.peek()}px`;
                grabber.style.borderRadius = `${DRAG_HANDLE_GRABBER_BORDER_RADIUS * this.widget.scaleInNote.peek()}px`;
                this.widget.isDragHandleHovered = true;
            }
            else if (this.widget.isTopLevelDragHandleVisible) {
                this.widget.dragHoverRect =
                    this.widget.edgelessWatcher.hoverAreaRectTopLevelBlock;
                this.widget.isDragHandleHovered = true;
            }
        };
        this._onDragHandlePointerLeave = () => {
            this.widget.isDragHandleHovered = false;
            this.widget.dragHoverRect = null;
            if (this.widget.isTopLevelDragHandleVisible)
                return;
            if (this.widget.dragging)
                return;
            this.widget.pointerEventWatcher.showDragHandleOnHoverBlock();
        };
        this._onDragHandlePointerUp = () => {
            if (!this.widget.isHoverDragHandleVisible)
                return;
            this.widget.dragHoverRect = null;
        };
    }
    watch() {
        const { dragHandleContainer, disposables } = this.widget;
        // When pointer enter drag handle grabber
        // Extend drag handle grabber to the height of the hovered block
        disposables.addFromEvent(dragHandleContainer, 'pointerenter', this._onDragHandlePointerEnter);
        disposables.addFromEvent(dragHandleContainer, 'pointerdown', this._onDragHandlePointerDown);
        disposables.addFromEvent(dragHandleContainer, 'pointerup', this._onDragHandlePointerUp);
        // When pointer leave drag handle grabber, should reset drag handle grabber style
        disposables.addFromEvent(dragHandleContainer, 'pointerleave', this._onDragHandlePointerLeave);
    }
}
//# sourceMappingURL=handle-event-watcher.js.map