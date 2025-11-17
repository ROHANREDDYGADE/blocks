import type { BlockStdScope } from '@blocksuite/block-std';
import type { TemplateResult } from 'lit';
import type { PageRootBlockComponent } from '../../page/page-root-block.js';
export type KeyboardToolbarConfig = {
    items: KeyboardToolbarItem[];
    /**
     * @description Whether to use the screen height as the keyboard height when the virtual keyboard API is not supported.
     * It is useful when the app is running in a webview and the keyboard is not overlaid on the content.
     * @default false
     */
    useScreenHeight?: boolean;
};
export type KeyboardToolbarItem = KeyboardToolbarActionItem | KeyboardSubToolbarConfig | KeyboardToolPanelConfig;
export type KeyboardIconType = TemplateResult | ((ctx: KeyboardToolbarContext) => TemplateResult);
export type KeyboardToolbarActionItem = {
    name: string;
    icon: KeyboardIconType;
    background?: string | ((ctx: KeyboardToolbarContext) => string | undefined);
    /**
     * @default true
     * @description Whether to show the item in the toolbar.
     */
    showWhen?: (ctx: KeyboardToolbarContext) => boolean;
    /**
     * @default false
     * @description Whether to set the item as disabled status.
     */
    disableWhen?: (ctx: KeyboardToolbarContext) => boolean;
    /**
     * @description The action to be executed when the item is clicked.
     */
    action?: (ctx: KeyboardToolbarContext) => void | Promise<void>;
};
export type KeyboardSubToolbarConfig = {
    icon: KeyboardIconType;
    items: KeyboardToolbarItem[];
};
export type KeyboardToolbarContext = {
    std: BlockStdScope;
    rootComponent: PageRootBlockComponent;
    /**
     * Close tool bar, and blur the focus if blur is true, default is false
     */
    closeToolbar: (blur?: boolean) => void;
    /**
     * Close current tool panel and show virtual keyboard
     */
    closeToolPanel: () => void;
};
export type KeyboardToolPanelConfig = {
    icon: KeyboardIconType;
    activeIcon?: KeyboardIconType;
    activeBackground?: string;
    groups: (KeyboardToolPanelGroup | DynamicKeyboardToolPanelGroup)[];
};
export type KeyboardToolPanelGroup = {
    name: string;
    items: KeyboardToolbarActionItem[];
};
export type DynamicKeyboardToolPanelGroup = (ctx: KeyboardToolbarContext) => KeyboardToolPanelGroup | null;
export declare const defaultKeyboardToolbarConfig: KeyboardToolbarConfig;
//# sourceMappingURL=config.d.ts.map