import type { Column } from '@blocksuite/affine-model';
import type { EditorHost } from '@blocksuite/block-std';
import type { Block, Doc } from '@blocksuite/store';
import { type InsertToPosition } from '@blocksuite/affine-shared/utils';
import { DataSourceBase, type PropertyMetaConfig } from '@blocksuite/data-view';
import { Slot } from '@blocksuite/global/utils';
import type { DataViewBlockModel } from './data-view-model.js';
import { blockMetaMap } from './block-meta/index.js';
export type BlockQueryDataSourceConfig = {
    type: keyof typeof blockMetaMap;
};
export declare class BlockQueryDataSource extends DataSourceBase {
    private host;
    private block;
    private columnMetaMap;
    private meta;
    blockMap: Map<string, Block>;
    docDisposeMap: Map<string, () => void>;
    slots: {
        update: Slot<void>;
    };
    private get blocks();
    get properties(): string[];
    get propertyMetas(): PropertyMetaConfig[];
    get rows(): string[];
    get workspace(): import("@blocksuite/store").DocCollection;
    constructor(host: EditorHost, block: DataViewBlockModel, config: BlockQueryDataSourceConfig);
    private getProperty;
    private newColumnName;
    cellValueChange(rowId: string, propertyId: string, value: unknown): void;
    cellValueGet(rowId: string, propertyId: string): unknown;
    getViewColumn(id: string): Column<Record<string, unknown>> | undefined;
    listenToDoc(doc: Doc): void;
    propertyAdd(insertToPosition: InsertToPosition, type: string | undefined): string;
    propertyDataGet(propertyId: string): Record<string, unknown>;
    propertyDataSet(propertyId: string, data: Record<string, unknown>): void;
    propertyDelete(_id: string): void;
    propertyDuplicate(_columnId: string): string;
    propertyMetaGet(type: string): PropertyMetaConfig;
    propertyNameGet(propertyId: string): string;
    propertyNameSet(propertyId: string, name: string): void;
    propertyReadonlyGet(propertyId: string): boolean;
    propertyTypeGet(propertyId: string): string;
    propertyTypeSet(propertyId: string, toType: string): void;
    rowAdd(_insertPosition: InsertToPosition | number): string;
    rowDelete(_ids: string[]): void;
    rowMove(_rowId: string, _position: InsertToPosition): void;
}
//# sourceMappingURL=data-source.d.ts.map