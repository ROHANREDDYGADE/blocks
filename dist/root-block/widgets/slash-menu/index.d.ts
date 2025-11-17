import { WidgetComponent } from '@blocksuite/block-std';
import { type SlashMenuActionItem, type SlashMenuContext, type SlashMenuGroupDivider, type SlashMenuItem, type SlashMenuItemGenerator, type SlashSubMenu } from './config.js';
export type AffineSlashMenuContext = SlashMenuContext;
export type AffineSlashMenuItem = SlashMenuItem;
export type AffineSlashMenuActionItem = SlashMenuActionItem;
export type AffineSlashMenuItemGenerator = SlashMenuItemGenerator;
export type AffineSlashSubMenu = SlashSubMenu;
export type AffineSlashMenuGroupDivider = SlashMenuGroupDivider;
export declare const AFFINE_SLASH_MENU_WIDGET = "affine-slash-menu-widget";
export declare class AffineSlashMenuWidget extends WidgetComponent {
    static DEFAULT_CONFIG: import("./config.js").SlashMenuConfig;
    private _getInlineEditor;
    private _handleInput;
    private _onCompositionEnd;
    private _onKeyDown;
    config: import("./config.js").SlashMenuConfig;
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_SLASH_MENU_WIDGET]: AffineSlashMenuWidget;
    }
}
//# sourceMappingURL=index.d.ts.map