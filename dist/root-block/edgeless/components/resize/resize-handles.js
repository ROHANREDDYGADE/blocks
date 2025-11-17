import { html, nothing } from 'lit';
export var HandleDirection;
(function (HandleDirection) {
    HandleDirection["Bottom"] = "bottom";
    HandleDirection["BottomLeft"] = "bottom-left";
    HandleDirection["BottomRight"] = "bottom-right";
    HandleDirection["Left"] = "left";
    HandleDirection["Right"] = "right";
    HandleDirection["Top"] = "top";
    HandleDirection["TopLeft"] = "top-left";
    HandleDirection["TopRight"] = "top-right";
})(HandleDirection || (HandleDirection = {}));
function ResizeHandle(handleDirection, onPointerDown, updateCursor, hideEdgeHandle) {
    const handlerPointerDown = (e) => {
        e.stopPropagation();
        onPointerDown && onPointerDown(e, handleDirection);
    };
    const pointerEnter = (type) => (e) => {
        e.stopPropagation();
        if (e.buttons === 1 || !updateCursor)
            return;
        const { clientX, clientY } = e;
        const target = e.target;
        const point = [clientX, clientY];
        updateCursor(true, { type, point, target });
    };
    const pointerLeave = (e) => {
        e.stopPropagation();
        if (e.buttons === 1 || !updateCursor)
            return;
        updateCursor(false);
    };
    const rotationTpl = handleDirection === HandleDirection.Top ||
        handleDirection === HandleDirection.Bottom ||
        handleDirection === HandleDirection.Left ||
        handleDirection === HandleDirection.Right
        ? nothing
        : html `<div
          class="rotate"
          @pointerover=${pointerEnter('rotate')}
          @pointerout=${pointerLeave}
        ></div>`;
    return html `<div
    class="handle"
    aria-label=${handleDirection}
    @pointerdown=${handlerPointerDown}
  >
    ${rotationTpl}
    <div
      class="resize${hideEdgeHandle && ' transparent-handle'}"
      @pointerover=${pointerEnter('resize')}
      @pointerout=${pointerLeave}
    ></div>
  </div>`;
}
export function ResizeHandles(resizeMode, onPointerDown, updateCursor) {
    const getCornerHandles = () => {
        const handleTopLeft = ResizeHandle(HandleDirection.TopLeft, onPointerDown, updateCursor);
        const handleTopRight = ResizeHandle(HandleDirection.TopRight, onPointerDown, updateCursor);
        const handleBottomLeft = ResizeHandle(HandleDirection.BottomLeft, onPointerDown, updateCursor);
        const handleBottomRight = ResizeHandle(HandleDirection.BottomRight, onPointerDown, updateCursor);
        return {
            handleTopLeft,
            handleTopRight,
            handleBottomLeft,
            handleBottomRight,
        };
    };
    const getEdgeHandles = (hideEdgeHandle) => {
        const handleLeft = ResizeHandle(HandleDirection.Left, onPointerDown, updateCursor, hideEdgeHandle);
        const handleRight = ResizeHandle(HandleDirection.Right, onPointerDown, updateCursor, hideEdgeHandle);
        return { handleLeft, handleRight };
    };
    const getEdgeVerticalHandles = (hideEdgeHandle) => {
        const handleTop = ResizeHandle(HandleDirection.Top, onPointerDown, updateCursor, hideEdgeHandle);
        const handleBottom = ResizeHandle(HandleDirection.Bottom, onPointerDown, updateCursor, hideEdgeHandle);
        return { handleTop, handleBottom };
    };
    switch (resizeMode) {
        case 'corner': {
            const { handleTopLeft, handleTopRight, handleBottomLeft, handleBottomRight, } = getCornerHandles();
            // prettier-ignore
            return html `
        ${handleTopLeft}
        ${handleTopRight}
        ${handleBottomLeft}
        ${handleBottomRight}
      `;
        }
        case 'edge': {
            const { handleLeft, handleRight } = getEdgeHandles();
            return html `${handleLeft} ${handleRight}`;
        }
        case 'all': {
            const { handleTopLeft, handleTopRight, handleBottomLeft, handleBottomRight, } = getCornerHandles();
            const { handleLeft, handleRight } = getEdgeHandles(true);
            const { handleTop, handleBottom } = getEdgeVerticalHandles(true);
            // prettier-ignore
            return html `
        ${handleTopLeft}
        ${handleTop}
        ${handleTopRight}
        ${handleRight}
        ${handleBottomRight}
        ${handleBottom}
        ${handleBottomLeft}
        ${handleLeft}
      `;
        }
        case 'edgeAndCorner': {
            const { handleTopLeft, handleTopRight, handleBottomLeft, handleBottomRight, } = getCornerHandles();
            const { handleLeft, handleRight } = getEdgeHandles(true);
            return html `
        ${handleTopLeft} ${handleTopRight} ${handleRight} ${handleBottomRight}
        ${handleBottomLeft} ${handleLeft}
      `;
        }
        case 'none': {
            return nothing;
        }
    }
}
//# sourceMappingURL=resize-handles.js.map