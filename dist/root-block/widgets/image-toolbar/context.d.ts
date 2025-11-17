import type { ImageBlockComponent } from '../../../image-block/image-block.js';
import { MenuContext } from '../../configs/toolbar.js';
export declare class ImageToolbarContext extends MenuContext {
    blockComponent: ImageBlockComponent;
    abortController: AbortController;
    close: () => void;
    get doc(): import("@blocksuite/store").Doc;
    get host(): import("@blocksuite/block-std").EditorHost;
    get selectedBlockModels(): import("@blocksuite/affine-model").ImageBlockModel[];
    get std(): import("@blocksuite/block-std").BlockStdScope;
    constructor(blockComponent: ImageBlockComponent, abortController: AbortController);
    isEmpty(): boolean;
    isMultiple(): boolean;
    isSingle(): boolean;
}
//# sourceMappingURL=context.d.ts.map