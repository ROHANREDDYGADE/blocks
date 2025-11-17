import { type BlockComponent, type DndEventState } from '@blocksuite/block-std';
import { Point } from '@blocksuite/global/utils';
import type { AffineDragHandleWidget } from '../drag-handle.js';
import { DragPreview } from '../components/drag-preview.js';
export declare class PreviewHelper {
    readonly widget: AffineDragHandleWidget;
    private _calculatePreviewOffset;
    private _calculateQuery;
    createDragPreview: (blocks: BlockComponent[], state: DndEventState, dragPreviewEl?: HTMLElement, dragPreviewOffset?: Point) => DragPreview;
    removeDragPreview: () => void;
    constructor(widget: AffineDragHandleWidget);
}
//# sourceMappingURL=preview-helper.d.ts.map