import { Slot } from '@blocksuite/store';
import type { Viewport } from '../../_common/utils/index.js';
import { RootService } from '../root-service.js';
export declare class PageRootService extends RootService {
    static readonly flavour: "affine:page";
    slots: {
        viewportUpdated: Slot<Viewport>;
    };
}
//# sourceMappingURL=page-root-service.d.ts.map