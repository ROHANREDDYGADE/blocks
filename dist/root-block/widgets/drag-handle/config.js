export const DRAG_HANDLE_CONTAINER_HEIGHT = 24;
export const DRAG_HANDLE_CONTAINER_WIDTH = 16;
export const DRAG_HANDLE_CONTAINER_WIDTH_TOP_LEVEL = 8;
export const DRAG_HANDLE_CONTAINER_OFFSET_LEFT = 2;
export const DRAG_HANDLE_CONTAINER_OFFSET_LEFT_LIST = 18;
export const DRAG_HANDLE_CONTAINER_OFFSET_LEFT_TOP_LEVEL = 5;
export const DRAG_HANDLE_CONTAINER_PADDING = 8;
export const DRAG_HANDLE_GRABBER_HEIGHT = 12;
export const DRAG_HANDLE_GRABBER_WIDTH = 4;
export const DRAG_HANDLE_GRABBER_WIDTH_HOVERED = 2;
export const DRAG_HANDLE_GRABBER_BORDER_RADIUS = 4;
export const DRAG_HANDLE_GRABBER_MARGIN = 4;
export const HOVER_AREA_RECT_PADDING_TOP_LEVEL = 6;
export const NOTE_CONTAINER_PADDING = 24;
export const EDGELESS_NOTE_EXTRA_PADDING = 20;
export const DRAG_HOVER_RECT_PADDING = 4;
export class DragHandleOptionsRunner {
    constructor() {
        this.optionMap = new Map();
    }
    get options() {
        return Array.from(this.optionMap.keys());
    }
    _decreaseOptionCount(option) {
        const count = this.optionMap.get(option) || 0;
        if (count > 1) {
            this.optionMap.set(option, count - 1);
        }
        else {
            this.optionMap.delete(option);
        }
    }
    _getExistingOptionWithSameFlavour(option) {
        return Array.from(this.optionMap.keys()).find(op => op.flavour === option.flavour);
    }
    getOption(flavour) {
        return this.options.find(option => {
            if (typeof option.flavour === 'string') {
                return option.flavour === flavour;
            }
            else {
                return option.flavour.test(flavour);
            }
        });
    }
    register(option) {
        const currentOption = this._getExistingOptionWithSameFlavour(option) || option;
        const count = this.optionMap.get(currentOption) || 0;
        this.optionMap.set(currentOption, count + 1);
        return {
            dispose: () => {
                this._decreaseOptionCount(currentOption);
            },
        };
    }
}
//# sourceMappingURL=config.js.map