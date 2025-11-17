import type { FrameBlockModel, RootBlockModel } from '@blocksuite/affine-model';
import { type MenuItemGroup } from '@blocksuite/affine-components/toolbar';
import { WidgetComponent } from '@blocksuite/block-std';
import { nothing, type TemplateResult } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
import type { ElementToolbarMoreMenuContext } from './more-menu/context.js';
type CustomEntry = {
    render: (edgeless: EdgelessRootBlockComponent) => TemplateResult | null;
    when: (model: BlockSuite.EdgelessModel[]) => boolean;
};
export declare const EDGELESS_ELEMENT_TOOLBAR_WIDGET = "edgeless-element-toolbar-widget";
export declare class EdgelessElementToolbarWidget extends WidgetComponent<RootBlockModel, EdgelessRootBlockComponent> {
    static styles: import("lit").CSSResult;
    private _quickConnect;
    private _updateOnSelectedChange;
    moreGroups: MenuItemGroup<ElementToolbarMoreMenuContext>[];
    get edgeless(): EdgelessRootBlockComponent;
    get selection(): import("@blocksuite/block-std/gfx").GfxSelectionManager;
    get slots(): {
        pressShiftKeyUpdated: import("@blocksuite/global/utils").Slot<boolean>;
        copyAsPng: import("@blocksuite/global/utils").Slot<{
            blocks: BlockSuite.EdgelessBlockModelType[];
            shapes: BlockSuite.SurfaceModel[];
        }>;
        readonlyUpdated: import("@blocksuite/global/utils").Slot<boolean>;
        draggingAreaUpdated: import("@blocksuite/global/utils").Slot<void>;
        navigatorSettingUpdated: import("@blocksuite/global/utils").Slot<{
            hideToolbar?: boolean;
            blackBackground?: boolean;
            fillScreen?: boolean;
        }>;
        navigatorFrameChanged: import("@blocksuite/global/utils").Slot<FrameBlockModel>;
        fullScreenToggled: import("@blocksuite/global/utils").Slot<void>;
        elementResizeStart: import("@blocksuite/global/utils").Slot<void>;
        elementResizeEnd: import("@blocksuite/global/utils").Slot<void>;
        toggleNoteSlicer: import("@blocksuite/global/utils").Slot<void>;
        toolbarLocked: import("@blocksuite/global/utils").Slot<boolean>;
    };
    get surface(): import("@blocksuite/affine-block-surface").SurfaceBlockComponent;
    private _groupSelected;
    private _recalculatePosition;
    private _renderButtons;
    private _renderQuickConnectButton;
    protected firstUpdated(): void;
    registerEntry(entry: CustomEntry): void;
    render(): TemplateResult<1> | typeof nothing;
    private accessor _dragging;
    private accessor _registeredEntries;
    accessor enableNoteSlicer: boolean;
    accessor selectedIds: string[];
    accessor toolbarVisible: boolean;
}
export {};
//# sourceMappingURL=index.d.ts.map