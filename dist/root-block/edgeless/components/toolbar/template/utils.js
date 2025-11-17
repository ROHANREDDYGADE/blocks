import { on } from '@blocksuite/affine-shared/utils';
export function onClickOutside(target, fn) {
    return on(document, 'click', (evt) => {
        if (target.contains(evt.target))
            return;
        fn();
        return;
    });
}
export function cloneDeep(obj) {
    const seen = new WeakMap();
    const clone = (val) => {
        if (typeof val !== 'object' || val === null)
            return val;
        if (seen.has(val))
            return seen.get(val);
        const copy = Array.isArray(val) ? [] : {};
        seen.set(val, copy);
        Object.keys(val).forEach(key => {
            // @ts-ignore
            copy[key] = clone(val[key]);
        });
        return copy;
    };
    return clone(obj);
}
//# sourceMappingURL=utils.js.map