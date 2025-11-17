import type { BlockModel, Doc } from '@blocksuite/store';
import { type DatabaseBlockModel } from '@blocksuite/affine-model';
import { BlockService } from '@blocksuite/block-std';
import { addProperty, applyPropertyUpdate, updateCell } from './utils/block-utils.js';
export declare class DatabaseBlockService extends BlockService {
    static readonly flavour: "affine:database";
    addColumn: typeof addProperty;
    applyColumnUpdate: typeof applyPropertyUpdate;
    databaseViewAddView: (model: DatabaseBlockModel, viewType: string) => void;
    databaseViewInitEmpty: (model: DatabaseBlockModel, viewType: string) => void;
    updateCell: typeof updateCell;
    updateView: <ViewData extends import("@blocksuite/affine-model").ViewBasicDataType>(model: DatabaseBlockModel, id: string, update: (data: ViewData) => Partial<ViewData>) => void;
    viewPresets: {
        tableViewMeta: import("@blocksuite/data-view").ViewMeta<"table", import("@blocksuite/data-view/view-presets").TableViewData>;
        kanbanViewMeta: import("@blocksuite/data-view").ViewMeta<"kanban", import("@blocksuite/data-view/view-presets").KanbanViewData>;
    };
    initDatabaseBlock(doc: Doc, model: BlockModel, databaseId: string, viewType: string, isAppendNewRow?: boolean): void;
}
//# sourceMappingURL=database-service.d.ts.map