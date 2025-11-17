import type { PropertyMetaConfig } from '@blocksuite/data-view';
export declare const queryBlockColumns: (PropertyMetaConfig<"checkbox", Record<string, never>, boolean> | PropertyMetaConfig<"date", Record<string, never>, number> | PropertyMetaConfig<"multi-select", import("@blocksuite/data-view/property-presets").SelectPropertyData, string[]> | PropertyMetaConfig<"number", import("@blocksuite/data-view/property-presets").NumberPropertyDataType, number> | PropertyMetaConfig<"progress", Record<string, never>, number> | PropertyMetaConfig<"select", import("@blocksuite/data-view/property-presets").SelectPropertyData, string>)[];
export declare const queryBlockHiddenColumns: PropertyMetaConfig<"rich-text", Record<string, never>, import("../../database-block/properties/utils.js").RichTextCellType>[];
export declare const queryBlockAllColumnMap: {
    [k: string]: PropertyMetaConfig;
};
//# sourceMappingURL=index.d.ts.map