import { BlockService } from '@blocksuite/block-std';
import { DatabaseSelection } from '@blocksuite/data-view';
import { DataViewBlockSchema } from './data-view-model.js';
export class DataViewBlockService extends BlockService {
    static { this.flavour = DataViewBlockSchema.model.flavour; }
    mounted() {
        super.mounted();
        this.selectionManager.register(DatabaseSelection);
    }
}
//# sourceMappingURL=database-service.js.map