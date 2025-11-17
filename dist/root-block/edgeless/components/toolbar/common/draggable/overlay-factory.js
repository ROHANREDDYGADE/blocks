import { render } from 'lit';
export const defaultInfo = {
    startPos: { x: 0, y: 0 },
    offsetPos: { x: 0, y: 0 },
    startTime: 0,
    scopeRect: {},
    edgelessRect: {},
    elementRectOriginal: {},
    element: null,
    elementInfo: null,
    parentToMount: null,
    moved: false,
    validMoved: false,
};
const className = (name) => `edgeless-draggable-control-overlay-${name}`;
const addClass = (node, name) => node.classList.add(className(name));
export const createShapeDraggingOverlay = (info) => {
    const { edgelessRect, parentToMount, element: originalElement } = info;
    const elementStyle = getComputedStyle(originalElement);
    const mask = document.createElement('div');
    addClass(mask, 'mask');
    Object.assign(mask.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: edgelessRect.width + 'px',
        height: edgelessRect.height + 'px',
        overflow: 'hidden',
        zIndex: '9999',
        // for debug purpose
        // background: 'rgba(255, 0, 0, 0.1)',
    });
    const element = document.createElement('div');
    addClass(element, 'element');
    const transitionWrapper = document.createElement('div');
    addClass(transitionWrapper, 'transition-wrapper');
    Object.assign(transitionWrapper.style, {
        transition: 'all 0.18s ease',
        transform: 'scale(var(--scale, 1)) rotate(var(--rotate, 0deg))',
        width: elementStyle.width,
        height: elementStyle.height,
    });
    transitionWrapper.style.setProperty('--rotate', '0deg');
    transitionWrapper.style.setProperty('--scale', '1');
    render(info.elementInfo.preview, transitionWrapper);
    Object.assign(element.style, {
        transform: 'translate(var(--translate-x, 0), var(--translate-y, 0)) rotate(var(--rotate, 0deg)) scale(var(--scale, 1))',
        position: 'absolute',
        cursor: 'grabbing',
        transition: 'inherit',
    });
    const styleTag = document.createElement('style');
    styleTag.textContent = `
    .${className('transition-wrapper')} > * {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;
    mask.append(styleTag);
    element.append(transitionWrapper);
    mask.append(element);
    parentToMount.append(mask);
    return { mask, element, transitionWrapper };
};
//# sourceMappingURL=overlay-factory.js.map