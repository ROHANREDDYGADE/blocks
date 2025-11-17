import { RootBlockSchema } from '@blocksuite/affine-model';
import { BlockService } from '@blocksuite/block-std';
import { Slot } from '@blocksuite/store';
export class MindmapService extends BlockService {
    constructor() {
        super(...arguments);
        this.requestCenter = new Slot();
    }
    static { this.flavour = RootBlockSchema.model.flavour; }
    center() {
        this.requestCenter.emit();
    }
    mounted() { }
}
//# sourceMappingURL=minmap-service.js.map