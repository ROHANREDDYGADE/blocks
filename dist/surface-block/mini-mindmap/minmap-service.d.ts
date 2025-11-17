import { BlockService } from '@blocksuite/block-std';
import { Slot } from '@blocksuite/store';
export declare class MindmapService extends BlockService {
    static readonly flavour: "affine:page";
    requestCenter: Slot<void>;
    center(): void;
    mounted(): void;
}
//# sourceMappingURL=minmap-service.d.ts.map