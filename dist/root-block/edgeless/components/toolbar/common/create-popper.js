import { assertExists } from '@blocksuite/global/utils';
// more than 100% due to the shadow
const leaveToPercent = `calc(100% + 10px)`;
// store active poppers
const popMap = new WeakMap();
function animateEnter(el) {
    el.style.transform = 'translateY(0)';
}
function animateLeave(el) {
    el.style.transform = `translateY(${leaveToPercent})`;
}
export function createPopper(tagName, reference, options) {
    const duration = options?.duration ?? 230;
    if (!popMap.has(reference))
        popMap.set(reference, new Map());
    const elMap = popMap.get(reference);
    assertExists(elMap);
    // if there is already a popper, cancel leave transition and apply enter transition
    if (elMap.has(tagName)) {
        const popper = elMap.get(tagName);
        assertExists(popper);
        popper.cancel?.();
        requestAnimationFrame(() => animateEnter(popper.element));
        return popper;
    }
    const clipWrapper = document.createElement('div');
    const menu = document.createElement(tagName);
    options?.setProps?.(menu);
    assertExists(reference.shadowRoot);
    clipWrapper.append(menu);
    reference.shadowRoot.append(clipWrapper);
    // apply enter transition
    menu.style.transition = `all ${duration}ms ease`;
    animateLeave(menu);
    requestAnimationFrame(() => animateEnter(menu));
    Object.assign(clipWrapper.style, {
        height: '100px',
        pointerEvents: 'none',
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        left: '0px',
        bottom: '100%',
        display: 'flex',
        alignItems: 'end',
    });
    Object.assign(menu.style, {
        width: '100%',
        marginLeft: '30px',
        maxWidth: 'calc(100% - 60px)',
        bottom: '0%',
        pointerEvents: 'auto',
    });
    const remove = () => {
        clipWrapper.remove();
        menu.remove();
        popMap.get(reference)?.delete(tagName);
        options?.onDispose?.();
    };
    const popper = {
        element: menu,
        dispose: () => {
            // apply leave transition
            animateLeave(menu);
            menu.addEventListener('transitionend', remove, { once: true });
            popper.cancel = () => menu.removeEventListener('transitionend', remove);
        },
    };
    popMap.get(reference)?.set(tagName, popper);
    return popper;
}
//# sourceMappingURL=create-popper.js.map