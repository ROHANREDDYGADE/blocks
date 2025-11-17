import type { BlockStdScope } from '@blocksuite/block-std';
import type { GfxController, GfxModel, LayerManager, PointTestOptions, ReorderingDirection } from '@blocksuite/block-std/gfx';
import { type ElementRenderer, type SurfaceBlockModel, type SurfaceContext } from '@blocksuite/affine-block-surface';
import { type ConnectorElementModel, type FrameBlockModel, type GroupElementModel } from '@blocksuite/affine-model';
import { Bound } from '@blocksuite/global/utils';
import { type BlockModel, Slot } from '@blocksuite/store';
import type { EdgelessFrameManager } from './frame-manager.js';
import { RootService } from '../root-service.js';
import { GfxBlockModel } from './block-model.js';
import { TemplateJob } from './services/template.js';
import { type ZoomAction } from './utils/zoom.js';
export declare class EdgelessRootService extends RootService implements SurfaceContext {
    static readonly flavour: "affine:page";
    private _surface;
    elementRenderers: Record<string, ElementRenderer>;
    slots: {
        pressShiftKeyUpdated: Slot<boolean>;
        copyAsPng: Slot<{
            blocks: BlockSuite.EdgelessBlockModelType[];
            shapes: BlockSuite.SurfaceModel[];
        }>;
        readonlyUpdated: Slot<boolean>;
        draggingAreaUpdated: Slot<void>;
        navigatorSettingUpdated: Slot<{
            hideToolbar?: boolean;
            blackBackground?: boolean;
            fillScreen?: boolean;
        }>;
        navigatorFrameChanged: Slot<FrameBlockModel>;
        fullScreenToggled: Slot<void>;
        elementResizeStart: Slot<void>;
        elementResizeEnd: Slot<void>;
        toggleNoteSlicer: Slot<void>;
        toolbarLocked: Slot<boolean>;
    };
    TemplateJob: typeof TemplateJob;
    updateElement: (id: string, props: Record<string, unknown>) => void;
    get blocks(): GfxBlockModel[];
    /**
     * sorted edgeless elements
     */
    get edgelessElements(): GfxModel[];
    /**
     * sorted canvas elements
     */
    get elements(): import("@blocksuite/affine-block-surface").SurfaceElementModel<import("@blocksuite/block-std/gfx").BaseElementProps>[];
    get frame(): EdgelessFrameManager;
    /**
     * Get all sorted frames by presentation orderer,
     * the legacy frame that uses `index` as presentation order
     * will be put at the beginning of the array.
     */
    get frames(): FrameBlockModel[];
    get gfx(): GfxController;
    get host(): import("@blocksuite/block-std").EditorHost;
    get layer(): LayerManager;
    get locked(): boolean;
    set locked(locked: boolean);
    get selection(): import("@blocksuite/block-std/gfx").GfxSelectionManager;
    get surface(): SurfaceBlockModel;
    get viewport(): import("@blocksuite/block-std/gfx").Viewport;
    get zoom(): number;
    constructor(std: BlockStdScope, flavourProvider: {
        flavour: string;
    });
    private _initReadonlyListener;
    private _initSlotEffects;
    addBlock(flavour: string, props: Record<string, unknown>, parent?: string | BlockModel, parentIndex?: number): string;
    addElement<T extends Record<string, unknown>>(type: string, props: T): string;
    createGroup(elements: BlockSuite.EdgelessModel[] | string[]): string;
    /**
     * Create a group from selected elements, if the selected elements are in the same group
     * @returns the id of the created group
     */
    createGroupFromSelected(): string | undefined;
    createTemplateJob(type: 'template' | 'sticker', center?: {
        x: number;
        y: number;
    }): TemplateJob;
    generateIndex(): string;
    getConnectors(element: BlockSuite.EdgelessModel | string): ConnectorElementModel[];
    getElementById(id: string): BlockSuite.EdgelessModel | null;
    getElementsByType<K extends keyof BlockSuite.SurfaceElementModelMap>(type: K): BlockSuite.SurfaceElementModelMap[K][];
    getFitToScreenData(padding?: [number, number, number, number], inputBounds?: Bound[]): {
        zoom: number;
        centerX: number;
        centerY: number;
    };
    mounted(): void;
    /**
     * This method is used to pick element in group, if the picked element is in a
     * group, we will pick the group instead. If that picked group is currently selected, then
     * we will pick the element itself.
     */
    pickElementInGroup(x: number, y: number, options?: PointTestOptions): BlockSuite.EdgelessModel | null;
    removeElement(id: string | BlockSuite.EdgelessModel): void;
    reorderElement(element: BlockSuite.EdgelessModel, direction: ReorderingDirection): void;
    setZoomByAction(action: ZoomAction): void;
    setZoomByStep(step: number): void;
    ungroup(group: GroupElementModel): void;
    unmounted(): void;
    zoomToFit(): void;
}
//# sourceMappingURL=edgeless-root-service.d.ts.map