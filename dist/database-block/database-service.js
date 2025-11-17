import { DatabaseBlockSchema, } from '@blocksuite/affine-model';
import { BlockService } from '@blocksuite/block-std';
import { viewPresets } from '@blocksuite/data-view/view-presets';
import { databaseViewAddView, databaseViewInitEmpty, databaseViewInitTemplate, } from './data-source.js';
import { addProperty, applyPropertyUpdate, updateCell, updateView, } from './utils/block-utils.js';
export class DatabaseBlockService extends BlockService {
    constructor() {
        super(...arguments);
        this.addColumn = addProperty;
        this.applyColumnUpdate = applyPropertyUpdate;
        this.databaseViewAddView = databaseViewAddView;
        this.databaseViewInitEmpty = databaseViewInitEmpty;
        this.updateCell = updateCell;
        this.updateView = updateView;
        this.viewPresets = viewPresets;
    }
    static { this.flavour = DatabaseBlockSchema.model.flavour; }
    initDatabaseBlock(doc, model, databaseId, viewType, isAppendNewRow = true) {
        const blockModel = doc.getBlock(databaseId)?.model;
        if (!blockModel) {
            return;
        }
        databaseViewInitTemplate(blockModel, viewType);
        if (isAppendNewRow) {
            const parent = doc.getParent(model);
            if (!parent)
                return;
            doc.addBlock('affine:paragraph', {}, parent.id);
        }
        applyPropertyUpdate(blockModel);
    }
}
//# sourceMappingURL=database-service.js.map