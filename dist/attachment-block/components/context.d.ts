import type { AttachmentBlockComponent } from '../attachment-block.js';
import { MenuContext } from '../../root-block/configs/toolbar.js';
export declare class AttachmentToolbarMoreMenuContext extends MenuContext {
    blockComponent: AttachmentBlockComponent;
    abortController: AbortController;
    close: () => void;
    get doc(): import("@blocksuite/store").Doc;
    get host(): import("@blocksuite/block-std").EditorHost;
    get selectedBlockModels(): import("@blocksuite/affine-model").AttachmentBlockModel[];
    get std(): import("@blocksuite/block-std").BlockStdScope;
    constructor(blockComponent: AttachmentBlockComponent, abortController: AbortController);
    isEmpty(): boolean;
    isMultiple(): boolean;
    isSingle(): boolean;
}
//# sourceMappingURL=context.d.ts.map