export declare const blockMetaMap: {
    todo: {
        addProperty: <Value>(property: {
            name: string;
            key: string;
            metaConfig: import("@blocksuite/data-view").PropertyMetaConfig<string, {}, Value>;
            getColumnData?: ((block: import("@blocksuite/affine-model").ListBlockModel) => {}) | undefined;
            setColumnData?: ((block: import("@blocksuite/affine-model").ListBlockModel, data: {}) => void) | undefined;
            get: (block: import("@blocksuite/affine-model").ListBlockModel) => Value;
            set?: ((block: import("@blocksuite/affine-model").ListBlockModel, value: Value) => void) | undefined;
            updated: (block: import("@blocksuite/affine-model").ListBlockModel, callback: () => void) => import("@blocksuite/global/utils").Disposable;
        }) => void;
        selector: (block: import("@blocksuite/store").Block) => boolean;
        properties: {
            name: string;
            key: string;
            metaConfig: import("@blocksuite/data-view").PropertyMetaConfig<string, {}, unknown>;
            getColumnData?: ((block: import("@blocksuite/store").BlockModel<object, object & {}>) => {}) | undefined;
            setColumnData?: ((block: import("@blocksuite/store").BlockModel<object, object & {}>, data: {}) => void) | undefined;
            get: (block: import("@blocksuite/store").BlockModel<object, object & {}>) => unknown;
            set?: ((block: import("@blocksuite/store").BlockModel<object, object & {}>, value: unknown) => void) | undefined;
            updated: (block: import("@blocksuite/store").BlockModel<object, object & {}>, callback: () => void) => import("@blocksuite/global/utils").Disposable;
        }[];
    };
};
//# sourceMappingURL=index.d.ts.map