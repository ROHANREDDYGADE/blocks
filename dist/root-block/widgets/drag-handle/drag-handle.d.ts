import type { RootBlockModel } from '@blocksuite/affine-model';
import type { GfxBlockElementModel } from '@blocksuite/block-std/gfx';
import type { IVec } from '@blocksuite/global/utils';
import { type DropType } from '@blocksuite/affine-shared/services';
import { type BlockComponent, type DndEventState, WidgetComponent } from '@blocksuite/block-std';
import { Rect } from '@blocksuite/global/utils';
import { type ReadonlySignal } from '@preact/signals-core';
import type { DragPreview } from './components/drag-preview.js';
import type { DropIndicator } from './components/drop-indicator.js';
import type { AFFINE_DRAG_HANDLE_WIDGET } from './consts.js';
import { DragHandleOptionsRunner } from './config.js';
import { PreviewHelper } from './helpers/preview-helper.js';
import { RectHelper } from './helpers/rect-helper.js';
import { SelectionHelper } from './helpers/selection-helper.js';
import { EdgelessWatcher } from './watchers/edgeless-watcher.js';
import { PointerEventWatcher } from './watchers/pointer-event-watcher.js';
export declare class AffineDragHandleWidget extends WidgetComponent<RootBlockModel> {
    static styles: import("lit").CSSResult;
    private _anchorModelDisposables;
    private _dragEventWatcher;
    private _getBlockView;
    /**
     * When dragging, should update indicator position and target drop block id
     */
    private _getDropResult;
    private _handleEventWatcher;
    private _keyboardEventWatcher;
    private _legacyDragEventWatcher;
    private _pageWatcher;
    private _removeDropIndicator;
    private _reset;
    private _resetCursor;
    private _resetDropResult;
    private _updateDropResult;
    anchorBlockId: import("@preact/signals-core").Signal<string | null>;
    anchorBlockComponent: ReadonlySignal<BlockComponent<import("@blocksuite/store").BlockModel<object, object & {}>, import("@blocksuite/block-std").BlockService, string> | null>;
    anchorEdgelessElement: ReadonlySignal<GfxBlockElementModel | null>;
    center: IVec;
    dragging: boolean;
    rectHelper: RectHelper;
    draggingAreaRect: ReadonlySignal<Rect | null>;
    draggingElements: BlockComponent[];
    dragPreview: DragPreview | null;
    dropBlockId: string;
    dropIndicator: DropIndicator | null;
    dropType: DropType | null;
    edgelessWatcher: EdgelessWatcher;
    handleAnchorModelDisposables: () => void;
    hide: (force?: boolean) => void;
    isDragHandleHovered: boolean;
    isHoverDragHandleVisible: boolean;
    isTopLevelDragHandleVisible: boolean;
    lastDragPointerState: DndEventState | null;
    noteScale: import("@preact/signals-core").Signal<number>;
    readonly optionRunner: DragHandleOptionsRunner;
    pointerEventWatcher: PointerEventWatcher;
    previewHelper: PreviewHelper;
    rafID: number;
    scale: import("@preact/signals-core").Signal<number>;
    scaleInNote: ReadonlySignal<number>;
    selectionHelper: SelectionHelper;
    updateDropIndicator: (state: DndEventState, shouldAutoScroll?: boolean) => void;
    updateDropIndicatorOnScroll: () => void;
    private get _enableNewDnd();
    get dragHandleContainerOffsetParent(): HTMLElement;
    get mode(): import("@blocksuite/affine-model").DocMode | null;
    get rootComponent(): BlockComponent<import("@blocksuite/store").BlockModel<object, object & {}>, import("@blocksuite/block-std").BlockService, string>;
    clearRaf(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor dragHandleContainer: HTMLDivElement;
    accessor dragHandleGrabber: HTMLDivElement;
    accessor dragHoverRect: {
        width: number;
        height: number;
        left: number;
        top: number;
    } | null;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_DRAG_HANDLE_WIDGET]: AffineDragHandleWidget;
    }
}
//# sourceMappingURL=drag-handle.d.ts.map