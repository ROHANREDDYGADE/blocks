import type { PointerEventState } from '@blocksuite/block-std';
import { DefaultModeDragType, DefaultToolExt, type DragState } from '../ext.js';
export declare class MindMapExt extends DefaultToolExt {
    private _responseAreaUpdated;
    supportedDragTypes: DefaultModeDragType[];
    private get _indicatorOverlay();
    private _calcDragResponseArea;
    /**
     * Create handlers that can drag and drop mind map nodes
     * @param dragMindMapCtx
     * @param dragState
     * @returns
     */
    private _createManipulationHandlers;
    /**
     * Create handlers that can translate entire mind map
     */
    private _createTranslationHandlers;
    private _drawIndicator;
    private _getHoveredMindMap;
    private _setupDragNodeImage;
    private _updateNodeOpacity;
    initDrag(dragState: DragState): {
        dragStart?: (evt: PointerEventState) => void;
        dragMove?: (evt: PointerEventState) => void;
        dragEnd?: (evt: PointerEventState) => void;
    };
}
//# sourceMappingURL=mind-map-ext.d.ts.map