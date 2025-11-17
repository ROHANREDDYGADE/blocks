import type { DragHandleOption, DropType } from '@blocksuite/affine-shared/services';
import type { Disposable, Rect } from '@blocksuite/global/utils';
export declare const DRAG_HANDLE_CONTAINER_HEIGHT = 24;
export declare const DRAG_HANDLE_CONTAINER_WIDTH = 16;
export declare const DRAG_HANDLE_CONTAINER_WIDTH_TOP_LEVEL = 8;
export declare const DRAG_HANDLE_CONTAINER_OFFSET_LEFT = 2;
export declare const DRAG_HANDLE_CONTAINER_OFFSET_LEFT_LIST = 18;
export declare const DRAG_HANDLE_CONTAINER_OFFSET_LEFT_TOP_LEVEL = 5;
export declare const DRAG_HANDLE_CONTAINER_PADDING = 8;
export declare const DRAG_HANDLE_GRABBER_HEIGHT = 12;
export declare const DRAG_HANDLE_GRABBER_WIDTH = 4;
export declare const DRAG_HANDLE_GRABBER_WIDTH_HOVERED = 2;
export declare const DRAG_HANDLE_GRABBER_BORDER_RADIUS = 4;
export declare const DRAG_HANDLE_GRABBER_MARGIN = 4;
export declare const HOVER_AREA_RECT_PADDING_TOP_LEVEL = 6;
export declare const NOTE_CONTAINER_PADDING = 24;
export declare const EDGELESS_NOTE_EXTRA_PADDING = 20;
export declare const DRAG_HOVER_RECT_PADDING = 4;
export type DropResult = {
    rect: Rect | null;
    dropBlockId: string;
    dropType: DropType;
};
export declare class DragHandleOptionsRunner {
    private optionMap;
    get options(): DragHandleOption[];
    private _decreaseOptionCount;
    private _getExistingOptionWithSameFlavour;
    getOption(flavour: string): DragHandleOption | undefined;
    register(option: DragHandleOption): Disposable;
}
//# sourceMappingURL=config.d.ts.map