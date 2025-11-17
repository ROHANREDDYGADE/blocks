import { BlockComponent } from '@blocksuite/block-std';
import { css, html } from 'lit';
export class NoteBlockComponent extends BlockComponent {
    static { this.styles = css `
    .affine-note-block-container {
      display: flow-root;
    }
    .affine-note-block-container.selected {
      background-color: var(--affine-hover-color);
    }
  `; }
    connectedCallback() {
        super.connectedCallback();
    }
    renderBlock() {
        return html `
      <div class="affine-note-block-container">
        <div class="affine-block-children-container">
          ${this.renderChildren(this.model)}
        </div>
      </div>
    `;
    }
}
//# sourceMappingURL=note-block.js.map