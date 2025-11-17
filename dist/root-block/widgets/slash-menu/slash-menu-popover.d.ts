import type { AffineInlineEditor } from '@blocksuite/affine-components/rich-text';
import { LitElement, nothing, type PropertyValues } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { SlashMenuActionItem, SlashMenuContext, SlashMenuStaticConfig, SlashMenuStaticItem } from './config.js';
type InnerSlashMenuContext = SlashMenuContext & {
    tooltipTimeout: number;
    onClickItem: (item: SlashMenuActionItem) => void;
};
declare const SlashMenu_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class SlashMenu extends SlashMenu_base {
    private inlineEditor;
    private abortController;
    static styles: import("lit").CSSResult;
    private _handleClickItem;
    private _initItemPathMap;
    private _innerSlashMenuContext;
    private _itemPathMap;
    private _queryState;
    private _startRange;
    private _updateFilteredItems;
    updatePosition: (position: {
        x: string;
        y: string;
        height: number;
    }) => void;
    private get _query();
    get host(): import("@blocksuite/block-std").EditorHost;
    constructor(inlineEditor: AffineInlineEditor, abortController?: AbortController);
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _filteredItems;
    private accessor _position;
    accessor config: SlashMenuStaticConfig;
    accessor context: SlashMenuContext;
    accessor slashMenuElement: HTMLElement;
    accessor triggerKey: string;
}
declare const InnerSlashMenu_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class InnerSlashMenu extends InnerSlashMenu_base {
    static styles: import("lit").CSSResult;
    private _closeSubMenu;
    private _currentSubMenu;
    private _openSubMenu;
    private _renderActionItem;
    private _renderGroupItem;
    private _renderItem;
    private _renderSubMenuItem;
    private _subMenuAbortController;
    private _scrollToItem;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    willUpdate(changedProperties: PropertyValues<this>): void;
    private accessor _activeItem;
    accessor abortController: AbortController;
    accessor context: InnerSlashMenuContext;
    accessor depth: number;
    accessor mainMenuStyle: Parameters<typeof styleMap>[0] | null;
    accessor menu: SlashMenuStaticItem[];
}
export {};
//# sourceMappingURL=slash-menu-popover.d.ts.map