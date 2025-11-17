// import { PageRootBlockComponent } from '../page/page-root-block.js';
import { BlockComponent } from '@blocksuite/block-std';
import { css, html } from 'lit';
export class PreviewRootBlockComponent extends BlockComponent {
    static { this.styles = css `
    affine-preview-root {
      display: block;
    }
  `; }
    renderBlock() {
        return html `<div class="affine-preview-root">
      ${this.host.renderChildren(this.model)}
    </div>`;
    }
}
//# sourceMappingURL=preview-root-block.js.map