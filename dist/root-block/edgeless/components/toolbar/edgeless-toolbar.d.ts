import { type RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import { nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
import type { MenuPopper } from './common/create-popper.js';
import { type EdgelessToolbarSlots } from './context.js';
export declare const EDGELESS_TOOLBAR_WIDGET = "edgeless-toolbar-widget";
export declare class EdgelessToolbarWidget extends WidgetComponent<RootBlockModel, EdgelessRootBlockComponent> {
    static styles: import("lit").CSSResult;
    private _moreQuickToolsMenu;
    private _moreQuickToolsMenuRef;
    accessor containerWidth: number;
    private _onContainerResize;
    private _resizeObserver;
    private _slotsProvider;
    private _themeProvider;
    private _toolbarProvider;
    activePopper: MenuPopper<HTMLElement> | null;
    private get _availableWidth();
    private get _cachedPresentHideToolbar();
    private get _denseQuickTools();
    private get _denseSeniorTools();
    /**
     * When enabled, the toolbar will auto-hide when the mouse is not over it.
     */
    private get _enableAutoHide();
    private get _hiddenQuickTools();
    private get _quickTools();
    private get _quickToolsWidthTotal();
    private get _seniorNextTooltip();
    private get _seniorPrevTooltip();
    private get _seniorScrollNextDisabled();
    private get _seniorScrollPrevDisabled();
    private get _seniorToolNavWidth();
    private get _seniorTools();
    private get _seniorToolsWidthTotal();
    private get _spaceWidthTotal();
    private get _visibleQuickToolSize();
    get edgelessTool(): import("@blocksuite/block-std/gfx").GfxToolsFullOptionValue;
    get gfx(): import("@blocksuite/block-std/gfx").GfxController;
    get isPresentMode(): boolean;
    get scrollSeniorToolSize(): number;
    get slots(): EdgelessToolbarSlots;
    constructor();
    private _onSeniorNavNext;
    private _onSeniorNavPrev;
    private _openMoreQuickToolsMenu;
    private _renderContent;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    accessor presentFrameMenuShow: boolean;
    accessor presentSettingMenuShow: boolean;
    accessor scrollSeniorToolIndex: number;
    accessor toolbarContainer: HTMLElement;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-toolbar-widget': EdgelessToolbarWidget;
    }
}
//# sourceMappingURL=edgeless-toolbar.d.ts.map