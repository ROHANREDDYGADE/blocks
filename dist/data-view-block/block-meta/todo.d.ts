import { type ListBlockModel } from '@blocksuite/affine-model';
export declare const todoMeta: {
    addProperty: <Value>(property: {
        name: string;
        key: string;
        metaConfig: import("@blocksuite/data-view").PropertyMetaConfig<string, {}, Value>;
        getColumnData?: ((block: ListBlockModel) => {}) | undefined;
        setColumnData?: ((block: ListBlockModel, data: {}) => void) | undefined;
        get: (block: ListBlockModel) => Value;
        set?: ((block: ListBlockModel, value: Value) => void) | undefined;
        updated: (block: ListBlockModel, callback: () => void) => import("@blocksuite/global/utils").Disposable;
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
//# sourceMappingURL=todo.d.ts.map