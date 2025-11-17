import type { RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import { nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
export declare const AFFINE_EDGELESS_ZOOM_TOOLBAR_WIDGET = "affine-edgeless-zoom-toolbar-widget";
export declare class AffineEdgelessZoomToolbarWidget extends WidgetComponent<RootBlockModel, EdgelessRootBlockComponent> {
    static styles: import("lit").CSSResult;
    get edgeless(): EdgelessRootBlockComponent;
    connectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    private accessor _hide;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_EDGELESS_ZOOM_TOOLBAR_WIDGET]: AffineEdgelessZoomToolbarWidget;
    }
}
//# sourceMappingURL=index.d.ts.map