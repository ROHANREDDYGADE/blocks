import type { SurfaceBlockComponent, SurfaceBlockModel } from '@blocksuite/affine-block-surface';
import type { RootBlockModel } from '@blocksuite/affine-model';
import type { GfxViewportElement } from '@blocksuite/block-std/gfx';
import { BlockComponent } from '@blocksuite/block-std';
import type { EdgelessRootBlockWidgetName } from '../types.js';
import type { EdgelessRootService } from './edgeless-root-service.js';
export declare class EdgelessRootPreviewBlockComponent extends BlockComponent<RootBlockModel, EdgelessRootService, EdgelessRootBlockWidgetName> {
    static styles: import("lit").CSSResult;
    accessor background: HTMLDivElement;
    private _refreshLayerViewport;
    private _resizeObserver;
    private _viewportElement;
    get dispatcher(): import("@blocksuite/block-std").UIEventDispatcher;
    get surfaceBlockModel(): SurfaceBlockModel;
    get viewportElement(): HTMLElement;
    private _initFontLoader;
    private _initLayerUpdateEffect;
    private _initPixelRatioChangeEffect;
    private _initResizeEffect;
    private _initSlotEffects;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    renderBlock(): import("lit-html").TemplateResult<1>;
    willUpdate(_changedProperties: Map<PropertyKey, unknown>): void;
    accessor editorViewportSelector: string;
    accessor gfxViewportElm: GfxViewportElement;
    accessor surface: SurfaceBlockComponent;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-edgeless-root-preview': EdgelessRootPreviewBlockComponent;
    }
}
//# sourceMappingURL=edgeless-root-preview-block.d.ts.map