import type { TextFormatConfig } from '@blocksuite/affine-components/rich-text';
import type { BlockModel } from '@blocksuite/store';
import type { TextConversionConfig } from '../../../_common/configs/text-conversion.js';
import type { SlashMenuActionItem, SlashMenuContext, SlashMenuGroupDivider, SlashMenuItem, SlashMenuItemGenerator, SlashMenuStaticItem, SlashSubMenu } from './config.js';
export declare function isGroupDivider(item: SlashMenuStaticItem): item is SlashMenuGroupDivider;
export declare function notGroupDivider(item: SlashMenuStaticItem): item is Exclude<SlashMenuStaticItem, SlashMenuGroupDivider>;
export declare function isActionItem(item: SlashMenuStaticItem): item is SlashMenuActionItem;
export declare function isSubMenuItem(item: SlashMenuStaticItem): item is SlashSubMenu;
export declare function isMenuItemGenerator(item: SlashMenuItem): item is SlashMenuItemGenerator;
export declare function slashItemClassName(item: SlashMenuStaticItem): string;
export declare function filterEnabledSlashMenuItems(items: SlashMenuItem[], context: SlashMenuContext): SlashMenuStaticItem[];
export declare function getFirstNotDividerItem(items: SlashMenuStaticItem[]): SlashMenuActionItem | SlashSubMenu | null;
export declare function insideEdgelessText(model: BlockModel): boolean;
export declare function tryRemoveEmptyLine(model: BlockModel): void;
export declare function createConversionItem(config: TextConversionConfig): SlashMenuActionItem;
export declare function createTextFormatItem(config: TextFormatConfig): SlashMenuActionItem;
//# sourceMappingURL=utils.d.ts.map