import { WidgetComponent } from '@blocksuite/block-std';
import { createCustomModal } from './custom-modal.js';
export declare const AFFINE_MODAL_WIDGET = "affine-modal-widget";
export declare class AffineModalWidget extends WidgetComponent {
    open(options: Parameters<typeof createCustomModal>[0]): import("./custom-modal.js").AffineCustomModal;
    render(): symbol;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_MODAL_WIDGET]: AffineModalWidget;
    }
}
//# sourceMappingURL=modal.d.ts.map