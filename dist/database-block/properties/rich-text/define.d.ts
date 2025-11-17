import { type RichTextCellType } from '../utils.js';
export declare const richTextColumnType: {
    type: "rich-text";
    modelConfig: <CellData, PropertyData extends Record<string, unknown> = Record<string, never>>(ops: import("@blocksuite/data-view").PropertyConfig<PropertyData, CellData>) => import("@blocksuite/data-view").PropertyModel<"rich-text", PropertyData, CellData>;
};
export declare const richTextColumnModelConfig: import("@blocksuite/data-view").PropertyModel<"rich-text", Record<string, never>, RichTextCellType>;
//# sourceMappingURL=define.d.ts.map