import { EdgelessToolbarToolMixin, } from './tool.mixin.js';
export const ToolbarButtonWithMenuMixin = (SuperClass) => {
    class DerivedClass extends EdgelessToolbarToolMixin(SuperClass) {
    }
    return DerivedClass;
};
//# sourceMappingURL=toolbar-button-with-menu.mixin.js.map