import type { CodeBlockComponent } from '../../../code-block/code-block.js';
import { MenuContext } from '../../configs/toolbar.js';
export declare class CodeBlockToolbarContext extends MenuContext {
    blockComponent: CodeBlockComponent;
    abortController: AbortController;
    setActive: (active: boolean) => void;
    close: () => void;
    get doc(): import("@blocksuite/store").Doc;
    get host(): import("@blocksuite/block-std").EditorHost;
    get selectedBlockModels(): import("@blocksuite/affine-model").CodeBlockModel[];
    get std(): import("@blocksuite/block-std").BlockStdScope;
    constructor(blockComponent: CodeBlockComponent, abortController: AbortController, setActive: (active: boolean) => void);
    isEmpty(): boolean;
    isMultiple(): boolean;
    isSingle(): boolean;
}
//# sourceMappingURL=context.d.ts.map