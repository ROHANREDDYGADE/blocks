import { WidgetComponent } from '@blocksuite/block-std';
import { type FloatingElement, type ReferenceElement } from '@floating-ui/dom';
export declare const AFFINE_INNER_MODAL_WIDGET = "affine-inner-modal-widget";
export declare class AffineInnerModalWidget extends WidgetComponent {
    private _getTarget?;
    get target(): ReferenceElement;
    open(modal: FloatingElement, ops: {
        onClose?: () => void;
    }): {
        close(): void;
    };
    render(): symbol;
    setTarget(fn: () => ReferenceElement): void;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_INNER_MODAL_WIDGET]: AffineInnerModalWidget;
    }
}
//# sourceMappingURL=inner-modal.d.ts.map