import type { DndEventState } from '@blocksuite/block-std';
import { Rect } from '@blocksuite/global/utils';
import type { EdgelessRootBlockComponent } from '../../../edgeless/index.js';
import type { AffineDragHandleWidget } from '../drag-handle.js';
export declare class EdgelessWatcher {
    readonly widget: AffineDragHandleWidget;
    private _handleEdgelessToolUpdated;
    private _handleEdgelessViewPortUpdated;
    private _showDragHandleOnTopLevelBlocks;
    private _updateDragHoverRectTopLevelBlock;
    private _updateDragPreviewOnViewportUpdate;
    checkTopLevelBlockSelection: () => void;
    updateDragPreviewPosition: (state: DndEventState) => void;
    get edgelessRoot(): EdgelessRootBlockComponent;
    get hoverAreaRectTopLevelBlock(): Rect | null;
    get hoverAreaTopLevelBlock(): {
        left: number;
        top: number;
        right: number;
        bottom: number;
        width: number;
        height: number;
        padding: number;
        containerWidth: number;
    } | null;
    constructor(widget: AffineDragHandleWidget);
    watch(): void;
}
//# sourceMappingURL=edgeless-watcher.d.ts.map