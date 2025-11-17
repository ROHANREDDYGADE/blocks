import type { Cell, Column, ColumnUpdater, DatabaseBlockModel, ViewBasicDataType } from '@blocksuite/affine-model';
import type { BlockModel } from '@blocksuite/store';
import { type InsertToPosition } from '@blocksuite/affine-shared/utils';
export declare function addProperty(model: DatabaseBlockModel, position: InsertToPosition, column: Omit<Column, 'id'> & {
    id?: string;
}): string;
export declare function applyCellsUpdate(model: DatabaseBlockModel): void;
export declare function applyPropertyUpdate(model: DatabaseBlockModel): void;
export declare function applyViewsUpdate(model: DatabaseBlockModel): void;
export declare function copyCellsByProperty(model: DatabaseBlockModel, fromId: Column['id'], toId: Column['id']): void;
export declare function deleteColumn(model: DatabaseBlockModel, columnId: Column['id']): void;
export declare function deleteRows(model: DatabaseBlockModel, rowIds: string[]): void;
export declare function deleteView(model: DatabaseBlockModel, id: string): void;
export declare function duplicateView(model: DatabaseBlockModel, id: string): string;
export declare function findPropertyIndex(model: DatabaseBlockModel, id: Column['id']): number;
export declare function getCell(model: DatabaseBlockModel, rowId: BlockModel['id'], columnId: Column['id']): Cell | null;
export declare function getProperty(model: DatabaseBlockModel, id: Column['id']): Column | undefined;
export declare function moveViewTo(model: DatabaseBlockModel, id: string, position: InsertToPosition): void;
export declare function updateCell(model: DatabaseBlockModel, rowId: string, cell: Cell): void;
export declare function updateCells(model: DatabaseBlockModel, columnId: string, cells: Record<string, unknown>): void;
export declare function updateProperty(model: DatabaseBlockModel, id: string, updater: ColumnUpdater): string | undefined;
export declare const updateView: <ViewData extends ViewBasicDataType>(model: DatabaseBlockModel, id: string, update: (data: ViewData) => Partial<ViewData>) => void;
export declare const DATABASE_CONVERT_WHITE_LIST: string[];
//# sourceMappingURL=block-utils.d.ts.map