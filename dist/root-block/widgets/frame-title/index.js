import { FrameBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
export const AFFINE_FRAME_TITLE_WIDGET = 'affine-frame-title-widget';
export class AffineFrameTitleWidget extends WidgetComponent {
    get _frames() {
        return Object.values(this.doc.blocks.value)
            .map(({ model }) => model)
            .filter(model => model instanceof FrameBlockModel);
    }
    getFrameTitle(frame) {
        const id = typeof frame === 'string' ? frame : frame.id;
        const frameTitle = this.shadowRoot?.querySelector(`affine-frame-title[data-id="${id}"]`);
        return frameTitle;
    }
    render() {
        return repeat(this._frames, ({ id }) => id, frame => html `<affine-frame-title
          .model=${frame}
          data-id=${frame.id}
        ></affine-frame-title>`);
    }
}
//# sourceMappingURL=index.js.map