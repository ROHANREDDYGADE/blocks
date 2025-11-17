export class MenuContext {
    get firstElement() {
        return null;
    }
    // Sometimes we need to close the menu.
    close() { }
    isElement() {
        return false;
    }
}
export function getMoreMenuConfig(std) {
    return {
        configure: (groups) => groups,
        ...std.getConfig('affine:page')?.toolbarMoreMenu,
    };
}
//# sourceMappingURL=toolbar.js.map