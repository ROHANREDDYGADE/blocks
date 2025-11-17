import { WidgetComponent } from '@blocksuite/block-std';
import { autoUpdate, computePosition, size, } from '@floating-ui/dom';
import { nothing } from 'lit';
export const AFFINE_INNER_MODAL_WIDGET = 'affine-inner-modal-widget';
export class AffineInnerModalWidget extends WidgetComponent {
    get target() {
        if (this._getTarget) {
            return this._getTarget();
        }
        return document.body;
    }
    open(modal, ops) {
        const cancel = autoUpdate(this.target, modal, () => {
            computePosition(this.target, modal, {
                middleware: [
                    size({
                        apply: ({ rects }) => {
                            Object.assign(modal.style, {
                                left: `${rects.reference.x}px`,
                                top: `${rects.reference.y}px`,
                                width: `${rects.reference.width}px`,
                                height: `${rects.reference.height}px`,
                            });
                        },
                    }),
                ],
            }).catch(console.error);
        });
        const close = () => {
            modal.remove();
            ops.onClose?.();
            cancel();
        };
        return { close };
    }
    render() {
        return nothing;
    }
    setTarget(fn) {
        this._getTarget = fn;
    }
}
//# sourceMappingURL=inner-modal.js.map