import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { html } from 'lit';
import { BLOCK_CHILDREN_CONTAINER_PADDING_LEFT } from '../_common/consts.js';
import { dividerBlockStyles } from './styles.js';
export class DividerBlockComponent extends CaptionedBlockComponent {
    static { this.styles = dividerBlockStyles; }
    connectedCallback() {
        super.connectedCallback();
        this.contentEditable = 'false';
        this.handleEvent('click', () => {
            this.host.selection.setGroup('note', [
                this.host.selection.create('block', {
                    blockId: this.blockId,
                }),
            ]);
        });
    }
    renderBlock() {
        const children = html `<div
      class="affine-block-children-container"
      style="padding-left: ${BLOCK_CHILDREN_CONTAINER_PADDING_LEFT}px"
    >
      ${this.renderChildren(this.model)}
    </div>`;
        return html `
      <div class="affine-divider-block-container">
        <hr />

        ${children}
      </div>
    `;
    }
    #useZeroWidth_accessor_storage = true;
    get useZeroWidth() { return this.#useZeroWidth_accessor_storage; }
    set useZeroWidth(value) { this.#useZeroWidth_accessor_storage = value; }
}
//# sourceMappingURL=divider-block.js.map