import type { SurfaceBlockComponent } from '@blocksuite/affine-block-surface';
import type { BlockModel } from '@blocksuite/store';
import { type GfxSelectionManager } from '@blocksuite/block-std/gfx';
import type { EdgelessRootBlockComponent } from '../../../edgeless/edgeless-root-block.js';
import type { EdgelessRootService } from '../../../edgeless/edgeless-root-service.js';
import { MenuContext } from '../../../configs/toolbar.js';
export declare class ElementToolbarMoreMenuContext extends MenuContext {
    #private;
    edgeless: EdgelessRootBlockComponent;
    get doc(): import("@blocksuite/store").Doc;
    get firstBlockComponent(): import("@blocksuite/block-std").BlockComponent<BlockModel<object, object & {}>, import("@blocksuite/block-std").BlockService, string> | null;
    get firstElement(): import("@blocksuite/block-std/gfx").GfxModel;
    get host(): import("@blocksuite/block-std").EditorHost;
    get selectedBlockModels(): BlockModel<object, object & {}>[];
    get selectedElements(): import("@blocksuite/block-std/gfx").GfxModel[];
    get selection(): GfxSelectionManager;
    get service(): EdgelessRootService;
    get std(): import("@blocksuite/block-std").BlockStdScope;
    get surface(): SurfaceBlockComponent;
    get view(): import("@blocksuite/block-std").ViewStore;
    constructor(edgeless: EdgelessRootBlockComponent);
    getBlockComponent(id: string): import("@blocksuite/block-std").BlockComponent<BlockModel<object, object & {}>, import("@blocksuite/block-std").BlockService, string> | null;
    getLinkedDocBlock(): import("@blocksuite/affine-model").EmbedLinkedDocModel | import("@blocksuite/affine-model").EmbedSyncedDocModel | null;
    getNoteBlock(): import("@blocksuite/affine-model").NoteBlockModel | null;
    hasFrame(): boolean;
    isElement(): boolean;
    isEmpty(): boolean;
    isMultiple(): boolean;
    isSingle(): boolean;
    refreshable(model: BlockModel): boolean;
}
//# sourceMappingURL=context.d.ts.map