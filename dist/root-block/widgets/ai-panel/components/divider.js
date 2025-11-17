import { WithDisposable } from '@blocksuite/global/utils';
import { css, html, LitElement } from 'lit';
export class AIPanelDivider extends WithDisposable(LitElement) {
    static { this.styles = css `
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      align-self: stretch;
      width: 100%;
    }
    .divider {
      height: 0.5px;
      background: var(--affine-border-color);
      width: 100%;
    }
  `; }
    render() {
        return html `<div class="divider"></div>`;
    }
}
//# sourceMappingURL=divider.js.map