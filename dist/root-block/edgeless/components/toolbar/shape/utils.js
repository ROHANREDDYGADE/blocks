import { render } from 'lit';
/**
 * Helper function to build the CSS variables object for the shape
 * @returns
 */
export const buildVariablesObject = (style) => {
    const states = [
        'default',
        'hover',
        'next',
    ];
    const variables = ['x', 'y', 's', 'z'];
    const resolveValue = (variable, value) => {
        if (['x', 'y'].includes(variable)) {
            return typeof value === 'number' ? `${value}px` : value;
        }
        return value;
    };
    return states.reduce((acc, state) => {
        return {
            ...acc,
            ...variables.reduce((acc, variable) => {
                const defaultValue = style.default?.[variable];
                const value = style[state]?.[variable] ?? defaultValue;
                if (value === undefined)
                    return acc;
                return {
                    ...acc,
                    [`--${state}-${variable}`]: resolveValue(variable, value),
                };
            }, {}),
        };
    }, {});
};
export const touchResolver = (event) => ({
    inputType: 'touch',
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
    el: event.currentTarget,
    originalEvent: event,
});
export const mouseResolver = (event) => ({
    inputType: 'mouse',
    x: event.clientX,
    y: event.clientY,
    el: event.currentTarget,
    originalEvent: event,
});
// overlay helper
export const defaultDraggingInfo = {
    startPos: { x: 0, y: 0 },
    toolbarRect: {},
    edgelessRect: {},
    shapeRectOriginal: {},
    shapeEl: null,
    parentToMount: null,
    moved: false,
    shape: null,
    style: {},
};
export const createShapeDraggingOverlay = (info) => {
    const { edgelessRect, parentToMount } = info;
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: edgelessRect.width + 'px',
        // always clip
        // height: toolbarRect.bottom - edgelessRect.top + 'px',
        height: edgelessRect.height + 'px',
        overflow: 'hidden',
        zIndex: '9999',
        // for debug purpose
        // background: 'rgba(255, 0, 0, 0.1)',
    });
    const shape = document.createElement('div');
    const shapeScaleWrapper = document.createElement('div');
    Object.assign(shapeScaleWrapper.style, {
        transform: 'scale(var(--s, 1))',
        transition: 'transform 0.1s',
        transformOrigin: 'var(--o, center)',
    });
    render(info.shape.svg, shapeScaleWrapper);
    Object.assign(shape.style, {
        position: 'absolute',
        color: info.style.color,
        stroke: info.style.stroke,
        filter: `var(--shape-filter, ${info.style.filter})`,
        transform: 'translate(var(--x, 0), var(--y, 0))',
        left: 'var(--left, 0)',
        top: 'var(--top, 0)',
        cursor: 'grabbing',
        transition: 'inherit',
    });
    shape.append(shapeScaleWrapper);
    overlay.append(shape);
    parentToMount.append(overlay);
    return overlay;
};
//# sourceMappingURL=utils.js.map