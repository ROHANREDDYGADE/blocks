import type { RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import type { PageRootBlockComponent } from '../../index.js';
export declare const AFFINE_VIEWPORT_OVERLAY_WIDGET = "affine-viewport-overlay-widget";
export declare class AffineViewportOverlayWidget extends WidgetComponent<RootBlockModel, PageRootBlockComponent> {
    static styles: import("lit").CSSResult;
    connectedCallback(): void;
    lock(): void;
    render(): import("lit-html").TemplateResult<1>;
    toggleLock(): void;
    unlock(): void;
    private accessor _lockViewport;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_VIEWPORT_OVERLAY_WIDGET]: AffineViewportOverlayWidget;
    }
}
//# sourceMappingURL=viewport-overlay.d.ts.map