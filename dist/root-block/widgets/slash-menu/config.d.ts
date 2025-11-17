import type { BlockModel } from '@blocksuite/store';
import type { TemplateResult } from 'lit';
import type { RootBlockComponent } from '../../types.js';
import { type SlashMenuTooltip } from './tooltips/index.js';
export type SlashMenuConfig = {
    triggerKeys: string[];
    ignoreBlockTypes: BlockSuite.Flavour[];
    items: SlashMenuItem[];
    maxHeight: number;
    tooltipTimeout: number;
};
export type SlashMenuStaticConfig = Omit<SlashMenuConfig, 'items'> & {
    items: SlashMenuStaticItem[];
};
export type SlashMenuItem = SlashMenuStaticItem | SlashMenuItemGenerator;
export type SlashMenuStaticItem = SlashMenuGroupDivider | SlashMenuActionItem | SlashSubMenu;
export type SlashMenuGroupDivider = {
    groupName: string;
    showWhen?: (ctx: SlashMenuContext) => boolean;
};
export type SlashMenuActionItem = {
    name: string;
    description?: string;
    icon?: TemplateResult;
    tooltip?: SlashMenuTooltip;
    alias?: string[];
    showWhen?: (ctx: SlashMenuContext) => boolean;
    action: (ctx: SlashMenuContext) => void | Promise<void>;
    customTemplate?: TemplateResult<1>;
};
export type SlashSubMenu = {
    name: string;
    description?: string;
    icon?: TemplateResult;
    alias?: string[];
    showWhen?: (ctx: SlashMenuContext) => boolean;
    subMenu: SlashMenuStaticItem[];
};
export type SlashMenuItemGenerator = (ctx: SlashMenuContext) => (SlashMenuGroupDivider | SlashMenuActionItem | SlashSubMenu)[];
export type SlashMenuContext = {
    rootComponent: RootBlockComponent;
    model: BlockModel;
};
export declare const defaultSlashMenuConfig: SlashMenuConfig;
//# sourceMappingURL=config.d.ts.map