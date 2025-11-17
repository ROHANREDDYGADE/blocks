import type { MenuItemGroup } from '@blocksuite/affine-components/toolbar';
import { LitElement } from 'lit';
import type { ImageToolbarContext } from '../context.js';
export declare class AffineImageToolbar extends LitElement {
    static styles: import("lit").CSSResult;
    private _currentOpenMenu;
    private _popMenuAbortController;
    closeCurrentMenu: () => void;
    private _clearPopMenu;
    private _toggleMoreMenu;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _moreButton;
    private accessor _moreMenuOpen;
    accessor context: ImageToolbarContext;
    accessor moreGroups: MenuItemGroup<ImageToolbarContext>[];
    accessor onActiveStatusChange: (active: boolean) => void;
    accessor primaryGroups: MenuItemGroup<ImageToolbarContext>[];
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-image-toolbar': AffineImageToolbar;
    }
}
//# sourceMappingURL=image-toolbar.d.ts.map