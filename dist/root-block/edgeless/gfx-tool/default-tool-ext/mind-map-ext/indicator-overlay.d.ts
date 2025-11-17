import { Overlay, PathGenerator } from '@blocksuite/affine-block-surface';
import { ConnectorMode, LayoutType, type MindmapElementModel, type MindmapNode } from '@blocksuite/affine-model';
import { type Bound, type IVec } from '@blocksuite/global/utils';
export declare class MindMapIndicatorOverlay extends Overlay {
    static INDICATOR_SIZE: number[];
    static overlayName: string;
    currentDragPos: IVec | null;
    direction: LayoutType.LEFT | LayoutType.RIGHT;
    dragNodeImage: HTMLCanvasElement | null;
    dragNodePos: IVec;
    mode: ConnectorMode;
    parentBound: Bound | null;
    pathGen: PathGenerator;
    targetBound: Bound | null;
    get themeService(): import("@blocksuite/affine-shared/services").ThemeService;
    private _generatePath;
    private _getRelativePoint;
    /**
     * Use to calculate the position of the indicator given its sibling's bound
     * @param siblingBound
     * @param direction
     */
    private _moveRelativeToBound;
    clear(): void;
    render(ctx: CanvasRenderingContext2D): void;
    setIndicatorInfo(options: {
        targetMindMap: MindmapElementModel;
        target: MindmapNode;
        parent: MindmapNode;
        parentChildren: MindmapNode[];
        insertPosition: {
            type: 'sibling';
            layoutDir: Exclude<LayoutType, LayoutType.BALANCE>;
            position: 'prev' | 'next';
        } | {
            type: 'child';
            layoutDir: Exclude<LayoutType, LayoutType.BALANCE>;
        };
        path: number[];
    }): void;
}
//# sourceMappingURL=indicator-overlay.d.ts.map