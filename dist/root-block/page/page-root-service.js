import { RootBlockSchema } from '@blocksuite/affine-model';
import { Slot } from '@blocksuite/store';
import { RootService } from '../root-service.js';
export class PageRootService extends RootService {
    constructor() {
        super(...arguments);
        this.slots = {
            viewportUpdated: new Slot(),
        };
    }
    static { this.flavour = RootBlockSchema.model.flavour; }
}
//# sourceMappingURL=page-root-service.js.map