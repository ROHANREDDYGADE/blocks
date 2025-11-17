import type { BlockComponent } from '@blocksuite/block-std';
import type { AffineDragHandleWidget } from '../drag-handle.js';
export declare class SelectionHelper {
    readonly widget: AffineDragHandleWidget;
    /** Check if given block component is selected */
    isBlockSelected: (block?: BlockComponent) => boolean;
    setSelectedBlocks: (blocks: BlockComponent[], noteId?: string) => void;
    get selectedBlockComponents(): BlockComponent<import("@blocksuite/store").BlockModel<object, object & {}>, import("@blocksuite/block-std").BlockService, string>[];
    get selectedBlockIds(): string[];
    get selectedBlocks(): import("@blocksuite/block-std").BlockSelection[];
    get selection(): import("@blocksuite/block-std").SelectionManager;
    constructor(widget: AffineDragHandleWidget);
}
//# sourceMappingURL=selection-helper.d.ts.map