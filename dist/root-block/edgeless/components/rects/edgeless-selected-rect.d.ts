import { FrameBlockModel, type RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import { Slot } from '@blocksuite/global/utils';
import { nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
import type { FrameOverlay } from '../../frame-manager.js';
import { HandleDirection } from '../resize/resize-handles.js';
import { type ResizeMode } from '../resize/resize-handles.js';
export type SelectedRect = {
    left: number;
    top: number;
    width: number;
    height: number;
    borderWidth: number;
    borderStyle: string;
    rotate: number;
};
export declare const EDGELESS_SELECTED_RECT_WIDGET = "edgeless-selected-rect";
export declare class EdgelessSelectedRectWidget extends WidgetComponent<RootBlockModel, EdgelessRootBlockComponent> {
    #private;
    static enabledWarnings: never[];
    static styles: import("lit").CSSResult;
    private _cursorRotate;
    private _dragEndCallback;
    private _initSelectedSlot;
    private _onDragEnd;
    private _onDragMove;
    private _onDragRotate;
    private _onDragStart;
    private _propDisposables;
    private _resizeManager;
    private _updateCursor;
    private _updateMode;
    private _updateOnElementChange;
    private _updateOnSelectionChange;
    private _updateOnViewportChange;
    /**
     * @param refresh indicate whether to completely refresh the state of resize manager, otherwise only update the position
     */
    private _updateResizeManagerState;
    private accessor _selectedRect;
    private _updateSelectedRect;
    readonly slots: {
        dragStart: Slot<void>;
        dragMove: Slot<void>;
        dragRotate: Slot<void>;
        dragEnd: Slot<void>;
    };
    get dragDirection(): HandleDirection;
    get edgelessSlots(): {
        pressShiftKeyUpdated: Slot<boolean>;
        copyAsPng: Slot<{
            blocks: BlockSuite.EdgelessBlockModelType[];
            shapes: BlockSuite.SurfaceModel[];
        }>;
        readonlyUpdated: Slot<boolean>;
        draggingAreaUpdated: Slot<void>;
        navigatorSettingUpdated: Slot<{
            hideToolbar?: boolean;
            blackBackground?: boolean;
            fillScreen?: boolean;
        }>;
        navigatorFrameChanged: Slot<FrameBlockModel>;
        fullScreenToggled: Slot<void>;
        elementResizeStart: Slot<void>;
        elementResizeEnd: Slot<void>;
        toggleNoteSlicer: Slot<void>;
        toolbarLocked: Slot<boolean>;
    };
    get frameOverlay(): FrameOverlay;
    get gfx(): import("@blocksuite/block-std/gfx").GfxController;
    get resizeMode(): ResizeMode;
    get selection(): import("@blocksuite/block-std/gfx").GfxSelectionManager;
    get surface(): import("@blocksuite/block-std/gfx").SurfaceBlockModel | null;
    get zoom(): number;
    constructor();
    private _canAutoComplete;
    private _canRotate;
    private _isProportionalElement;
    private _shouldRenderSelection;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    private accessor _isHeightLimit;
    private accessor _isResizing;
    private accessor _isWidthLimit;
    private accessor _mode;
    private accessor _scaleDirection;
    private accessor _scalePercent;
    private accessor _shiftKey;
    accessor autoCompleteOff: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-selected-rect': EdgelessSelectedRectWidget;
    }
}
//# sourceMappingURL=edgeless-selected-rect.d.ts.map