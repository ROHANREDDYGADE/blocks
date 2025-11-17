import type { AdvancedMenuItem, MenuItemGroup } from '@blocksuite/affine-components/toolbar';
import type { ImageBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import type { ImageBlockComponent } from '../../../image-block/image-block.js';
import { ImageToolbarContext } from './context.js';
export declare const AFFINE_IMAGE_TOOLBAR_WIDGET = "affine-image-toolbar-widget";
export declare class AffineImageToolbarWidget extends WidgetComponent<ImageBlockModel, ImageBlockComponent> {
    private _hoverController;
    private _isActivated;
    private _setHoverController;
    addMoreItems: (items: AdvancedMenuItem<ImageToolbarContext>[], index?: number, type?: string) => this;
    addPrimaryItems: (items: AdvancedMenuItem<ImageToolbarContext>[], index?: number) => this;
    moreGroups: MenuItemGroup<ImageToolbarContext>[];
    primaryGroups: MenuItemGroup<ImageToolbarContext>[];
    firstUpdated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_IMAGE_TOOLBAR_WIDGET]: AffineImageToolbarWidget;
    }
}
//# sourceMappingURL=index.d.ts.map