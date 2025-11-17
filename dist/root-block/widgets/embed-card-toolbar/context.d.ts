import type { EmbedBlockComponent } from '../../../_common/components/embed-card/type.js';
import { MenuContext } from '../../configs/toolbar.js';
export declare class EmbedCardToolbarContext extends MenuContext {
    blockComponent: EmbedBlockComponent;
    abortController: AbortController;
    close: () => void;
    get doc(): import("@blocksuite/store").Doc;
    get host(): import("@blocksuite/block-std").EditorHost;
    get selectedBlockModels(): (import("@blocksuite/affine-model").BookmarkBlockModel | import("@blocksuite/affine-model").EmbedFigmaModel | import("@blocksuite/affine-model").EmbedGithubModel | import("@blocksuite/affine-model").EmbedHtmlModel | import("@blocksuite/affine-model").EmbedLinkedDocModel | import("@blocksuite/affine-model").EmbedLoomModel | import("@blocksuite/affine-model").EmbedSyncedDocModel | import("@blocksuite/affine-model").EmbedYoutubeModel)[];
    get std(): import("@blocksuite/block-std").BlockStdScope;
    constructor(blockComponent: EmbedBlockComponent, abortController: AbortController);
    isEmpty(): boolean;
    isMultiple(): boolean;
    isSingle(): boolean;
}
//# sourceMappingURL=context.d.ts.map