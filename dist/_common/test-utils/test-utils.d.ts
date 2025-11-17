import type { BlockSnapshot, SliceSnapshot } from '@blocksuite/store';
import { mergeToCodeModel, transformModel } from '../../root-block/utils/operations/model.js';
declare class DocTestUtils {
    mergeToCodeModel: typeof mergeToCodeModel;
    transformModel: typeof transformModel;
}
export declare class TestUtils {
    docTestUtils: DocTestUtils;
}
export declare function nanoidReplacement(snapshot: BlockSnapshot | SliceSnapshot): any;
export {};
//# sourceMappingURL=test-utils.d.ts.map