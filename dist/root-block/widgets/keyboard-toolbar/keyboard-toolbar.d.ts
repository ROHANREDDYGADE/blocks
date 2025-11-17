import { type VirtualKeyboardControllerConfig } from '@blocksuite/affine-components/virtual-keyboard';
import { ShadowlessElement } from '@blocksuite/block-std';
import type { KeyboardToolbarConfig } from './config.js';
import { PageRootBlockComponent } from '../../page/page-root-block.js';
export declare const AFFINE_KEYBOARD_TOOLBAR = "affine-keyboard-toolbar";
declare const AffineKeyboardToolbar_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class AffineKeyboardToolbar extends AffineKeyboardToolbar_base {
    static styles: import("lit").CSSResult;
    private readonly _closeToolPanel;
    private readonly _currentPanelIndex$;
    private readonly _goPrevToolbar;
    private readonly _handleItemClick;
    private readonly _keyboardController;
    private readonly _lastActiveItem$;
    /** This field records the panel static height, which dose not aim to control the panel opening */
    private readonly _panelHeight$;
    private readonly _path$;
    private scrollCurrentBlockIntoView;
    private get _context();
    private get _currentPanelConfig();
    private get _currentToolbarItems();
    private get _isPanelOpened();
    private get _isSubToolbarOpened();
    get virtualKeyboardControllerConfig(): VirtualKeyboardControllerConfig;
    private _renderIcon;
    private _renderItem;
    private _renderItems;
    private _renderKeyboardButton;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor close: (blur: boolean) => void;
    accessor config: KeyboardToolbarConfig;
    accessor rootComponent: PageRootBlockComponent;
}
export {};
//# sourceMappingURL=keyboard-toolbar.d.ts.map