import type { Column } from '@blocksuite/affine-model';
import type { DataViewDataType } from '@blocksuite/data-view';
import { type InsertToPosition } from '@blocksuite/affine-shared/utils';
import { BlockModel } from '@blocksuite/store';
type Props = {
    title: string;
    views: DataViewDataType[];
    columns: Column[];
    cells: Record<string, Record<string, unknown>>;
};
export declare class DataViewBlockModel extends BlockModel<Props> {
    constructor();
    applyViewsUpdate(): void;
    deleteView(id: string): void;
    duplicateView(id: string): string;
    moveViewTo(id: string, position: InsertToPosition): void;
    updateView(id: string, update: (data: DataViewDataType) => Partial<DataViewDataType>): void;
}
export declare const DataViewBlockSchema: {
    version: number;
    model: {
        props: import("@blocksuite/store").PropsGetter<Props>;
        flavour: "affine:data-view";
    } & {
        role: "hub";
        version: number;
        parent: string[];
        children: string[];
    };
    transformer?: (() => import("@blocksuite/store").BaseBlockTransformer<Props>) | undefined;
};
export {};
//# sourceMappingURL=data-view-model.d.ts.map