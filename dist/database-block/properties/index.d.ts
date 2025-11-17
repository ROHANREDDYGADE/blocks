import type { PropertyMetaConfig } from '@blocksuite/data-view';
export * from './converts.js';
export declare const databaseBlockColumns: {
    checkboxColumnConfig: PropertyMetaConfig<"checkbox", Record<string, never>, boolean>;
    dateColumnConfig: PropertyMetaConfig<"date", Record<string, never>, number>;
    multiSelectColumnConfig: PropertyMetaConfig<"multi-select", import("@blocksuite/data-view/property-presets").SelectPropertyData, string[]>;
    numberColumnConfig: PropertyMetaConfig<"number", import("@blocksuite/data-view/property-presets").NumberPropertyDataType, number>;
    progressColumnConfig: PropertyMetaConfig<"progress", Record<string, never>, number>;
    selectColumnConfig: PropertyMetaConfig<"select", import("@blocksuite/data-view/property-presets").SelectPropertyData, string>;
    linkColumnConfig: PropertyMetaConfig<"link", Record<string, never>, string>;
    richTextColumnConfig: PropertyMetaConfig<"rich-text", Record<string, never>, import("./utils.js").RichTextCellType>;
};
export declare const databaseBlockPropertyList: (PropertyMetaConfig<"link", Record<string, never>, string> | PropertyMetaConfig<"rich-text", Record<string, never>, import("./utils.js").RichTextCellType> | PropertyMetaConfig<"checkbox", Record<string, never>, boolean> | PropertyMetaConfig<"date", Record<string, never>, number> | PropertyMetaConfig<"multi-select", import("@blocksuite/data-view/property-presets").SelectPropertyData, string[]> | PropertyMetaConfig<"number", import("@blocksuite/data-view/property-presets").NumberPropertyDataType, number> | PropertyMetaConfig<"progress", Record<string, never>, number> | PropertyMetaConfig<"select", import("@blocksuite/data-view/property-presets").SelectPropertyData, string>)[];
export declare const databaseBlockHiddenColumns: (PropertyMetaConfig<"title", Record<string, never>, import("@blocksuite/store").Text> | PropertyMetaConfig<"image", Record<string, never>, string>)[];
export declare const databaseBlockAllPropertyMap: {
    [k: string]: PropertyMetaConfig;
};
//# sourceMappingURL=index.d.ts.map