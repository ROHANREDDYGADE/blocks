import type { Container } from '@blocksuite/global/di';
import { type BlockStdScope, LifeCycleWatcher } from '@blocksuite/block-std';
export declare class MobileSpecsPatches extends LifeCycleWatcher {
    static key: string;
    constructor(std: BlockStdScope);
    static setup(di: Container): void;
    mounted(): void;
}
//# sourceMappingURL=mobile-patch.d.ts.map