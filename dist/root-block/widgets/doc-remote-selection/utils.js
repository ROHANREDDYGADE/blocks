import { styleMap } from 'lit/directives/style-map.js';
export function selectionStyle(rect, color) {
    return styleMap({
        position: 'absolute',
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        backgroundColor: rect.transparent ? 'transparent' : color,
        pointerEvent: 'none',
        opacity: '20%',
        borderRadius: '3px',
    });
}
export function cursorStyle(rect, color) {
    return styleMap({
        position: 'absolute',
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        backgroundColor: color,
        pointerEvent: 'none',
    });
}
//# sourceMappingURL=utils.js.map