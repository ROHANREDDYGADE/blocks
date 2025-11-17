import type { AffineTextAttributes } from '@blocksuite/affine-shared/types';
import type { BlockComponent } from '@blocksuite/block-std';
import { type MenuItemGroup } from '@blocksuite/affine-components/toolbar';
import { WidgetComponent } from '@blocksuite/block-std';
import { nothing } from 'lit';
import type { FormatBarContext } from './context.js';
import { type FormatBarConfigItem, type InlineActionConfigItem, type ParagraphActionConfigItem } from './config.js';
export declare const AFFINE_FORMAT_BAR_WIDGET = "affine-format-bar-widget";
export declare class AffineFormatBarWidget extends WidgetComponent {
    static styles: import("lit").CSSResult;
    private _abortController;
    private _floatDisposables;
    private _lastCursor;
    private _placement;
    moreGroups: MenuItemGroup<FormatBarContext>[];
    private get _selectionManager();
    get displayType(): "text" | "none" | "block" | "native";
    get nativeRange(): Range | null;
    get selectedBlocks(): BlockComponent<import("@blocksuite/store").BlockModel<object, object & {}>, import("@blocksuite/block-std").BlockService, string>[];
    private _calculatePlacement;
    private _listenFloatingElement;
    private _selectionEqual;
    private _shouldDisplay;
    addBlockTypeSwitch(config: {
        flavour: BlockSuite.Flavour;
        icon: ParagraphActionConfigItem['icon'];
        type?: string;
        name?: string;
    }): this;
    addDivider(): this;
    addHighlighterDropdown(): this;
    addInlineAction(config: Omit<InlineActionConfigItem, 'type'>): this;
    addParagraphAction(config: Omit<ParagraphActionConfigItem, 'type'>): this;
    addParagraphDropdown(): this;
    addRawConfigItems(configItems: FormatBarConfigItem[], index?: number): this;
    addTextStyleToggle(config: {
        icon: InlineActionConfigItem['icon'];
        key: Exclude<keyof AffineTextAttributes, 'color' | 'background' | 'reference'>;
        action: InlineActionConfigItem['action'];
    }): this;
    clearConfig(): this;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    reset(): void;
    updated(): void;
    private accessor _displayType;
    private accessor _dragging;
    private accessor _selectedBlocks;
    accessor configItems: FormatBarConfigItem[];
    accessor formatBarElement: HTMLElement | null;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_FORMAT_BAR_WIDGET]: AffineFormatBarWidget;
    }
}
//# sourceMappingURL=format-bar.d.ts.map