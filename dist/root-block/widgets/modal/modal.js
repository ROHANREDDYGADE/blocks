import { WidgetComponent } from '@blocksuite/block-std';
import { nothing } from 'lit';
import { createCustomModal } from './custom-modal.js';
export const AFFINE_MODAL_WIDGET = 'affine-modal-widget';
export class AffineModalWidget extends WidgetComponent {
    open(options) {
        return createCustomModal(options, this.ownerDocument.body);
    }
    render() {
        return nothing;
    }
}
//# sourceMappingURL=modal.js.map