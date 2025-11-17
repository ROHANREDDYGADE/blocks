import type { MenuItemGroup } from '@blocksuite/affine-components/toolbar';
import type { Chain, InitCommandCtx } from '@blocksuite/block-std';
import { type TemplateResult } from 'lit';
import type { AffineFormatBarWidget } from './format-bar.js';
import { FormatBarContext } from './context.js';
export type DividerConfigItem = {
    type: 'divider';
};
export type HighlighterDropdownConfigItem = {
    type: 'highlighter-dropdown';
};
export type ParagraphDropdownConfigItem = {
    type: 'paragraph-dropdown';
};
export type InlineActionConfigItem = {
    id: string;
    name: string;
    type: 'inline-action';
    action: (chain: Chain<InitCommandCtx>, formatBar: AffineFormatBarWidget) => void;
    icon: TemplateResult | (() => HTMLElement);
    isActive: (chain: Chain<InitCommandCtx>, formatBar: AffineFormatBarWidget) => boolean;
    showWhen: (chain: Chain<InitCommandCtx>, formatBar: AffineFormatBarWidget) => boolean;
};
export type ParagraphActionConfigItem = {
    id: string;
    type: 'paragraph-action';
    name: string;
    action: (chain: Chain<InitCommandCtx>, formatBar: AffineFormatBarWidget) => void;
    icon: TemplateResult | (() => HTMLElement);
    flavour: string;
};
export type CustomConfigItem = {
    type: 'custom';
    render: (formatBar: AffineFormatBarWidget) => TemplateResult | null;
};
export type FormatBarConfigItem = DividerConfigItem | HighlighterDropdownConfigItem | ParagraphDropdownConfigItem | ParagraphActionConfigItem | InlineActionConfigItem | CustomConfigItem;
export declare function toolbarDefaultConfig(toolbar: AffineFormatBarWidget): void;
export declare const BUILT_IN_GROUPS: MenuItemGroup<FormatBarContext>[];
export declare function toolbarMoreButton(toolbar: AffineFormatBarWidget): TemplateResult<1>;
//# sourceMappingURL=config.d.ts.map