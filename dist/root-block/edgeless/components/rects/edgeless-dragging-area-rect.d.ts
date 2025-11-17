import type { RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import { nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
export declare const EDGELESS_DRAGGING_AREA_WIDGET = "edgeless-dragging-area-rect";
export declare class EdgelessDraggingAreaRectWidget extends WidgetComponent<RootBlockModel, EdgelessRootBlockComponent> {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-dragging-area-rect': EdgelessDraggingAreaRectWidget;
    }
}
//# sourceMappingURL=edgeless-dragging-area-rect.d.ts.map