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
//# sourceMappingURL=event-resolver.js.map