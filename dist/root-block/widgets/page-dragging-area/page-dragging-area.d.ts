import type { RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import { nothing } from 'lit';
import type { PageRootBlockComponent } from '../../index.js';
type Rect = {
    left: number;
    top: number;
    width: number;
    height: number;
};
export declare const AFFINE_PAGE_DRAGGING_AREA_WIDGET = "affine-page-dragging-area-widget";
export declare class AffinePageDraggingAreaWidget extends WidgetComponent<RootBlockModel, PageRootBlockComponent> {
    static excludeFlavours: string[];
    private _dragging;
    private _initialContainerOffset;
    private _initialScrollOffset;
    private _lastPointerState;
    private _rafID;
    private _updateDraggingArea;
    private get _allBlocksWithRect();
    private get _viewport();
    private get scrollContainer();
    private _clearRaf;
    private _selectBlocksByRect;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    accessor rect: Rect | null;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_PAGE_DRAGGING_AREA_WIDGET]: AffinePageDraggingAreaWidget;
    }
}
export {};
//# sourceMappingURL=page-dragging-area.d.ts.map