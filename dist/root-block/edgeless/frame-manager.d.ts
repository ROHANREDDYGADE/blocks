import type { Doc } from '@blocksuite/store';
import { Overlay } from '@blocksuite/affine-block-surface';
import { type GfxController, GfxExtension, type GfxModel } from '@blocksuite/block-std/gfx';
import { Bound, type IVec } from '@blocksuite/global/utils';
import type { FrameBlockModel, NoteBlockModel } from '../../index.js';
export declare class FrameOverlay extends Overlay {
    static overlayName: string;
    private _disposable;
    private _frame;
    private _innerElements;
    private _prevXYWH;
    private get _frameManager();
    constructor(gfx: GfxController);
    private _reset;
    clear(): void;
    highlight(frame: FrameBlockModel, highlightElementsInBound?: boolean, highlightOutline?: boolean): void;
    render(ctx: CanvasRenderingContext2D): void;
}
export declare class EdgelessFrameManager extends GfxExtension {
    static key: string;
    private _disposable;
    /**
     * Get all sorted frames by presentation orderer,
     * the legacy frame that uses `index` as presentation order
     * will be put at the beginning of the array.
     */
    get frames(): FrameBlockModel[];
    constructor(gfx: GfxController);
    static framePresentationComparator<T extends FrameBlockModel | {
        index: string;
        presentationIndex?: string;
    }>(a: T, b: T): 0 | 1 | -1;
    private _addChildrenToLegacyFrame;
    private _addFrameBlock;
    private _watchElementAdded;
    /**
     * Reset parent of elements to the frame
     */
    addElementsToFrame(frame: FrameBlockModel, elements: GfxModel[]): void;
    createFrameOnBound(bound: Bound): FrameBlockModel;
    createFrameOnElements(elements: GfxModel[]): FrameBlockModel | undefined;
    createFrameOnSelected(): FrameBlockModel | undefined;
    createFrameOnViewportCenter(wh: [number, number]): void;
    generatePresentationIndex(): string;
    /**
     * Get all elements in the frame, there are three cases:
     * 1. The frame doesn't have `childElements`, return all elements in the frame bound but not owned by another frame.
     * 2. Return all child elements of the frame if `childElements` exists.
     */
    getChildElementsInFrame(frame: FrameBlockModel): GfxModel[];
    /**
     * Get all elements in the frame bound,
     * whatever the element already has another parent frame or not.
     */
    getElementsInFrameBound(frame: FrameBlockModel, fullyContained?: boolean): GfxModel[];
    /**
     * Get most top frame from the point.
     */
    getFrameFromPoint([x, y]: IVec, ignoreFrames?: FrameBlockModel[]): FrameBlockModel | null;
    getParentFrame(element: GfxModel): FrameBlockModel | null;
    /**
     * This method will populate `presentationIndex` for all legacy frames,
     * and keep the orderer of the legacy frames.
     */
    refreshLegacyFrameOrder(): void;
    removeAllChildrenFromFrame(frame: FrameBlockModel): void;
    removeFromParentFrame(element: GfxModel): void;
    unmounted(): void;
}
export declare function getNotesInFrameBound(doc: Doc, frame: FrameBlockModel, fullyContained?: boolean): NoteBlockModel[];
export declare function getBlocksInFrameBound(doc: Doc, model: FrameBlockModel, fullyContained?: boolean): BlockSuite.EdgelessBlockModelType[];
//# sourceMappingURL=frame-manager.d.ts.map