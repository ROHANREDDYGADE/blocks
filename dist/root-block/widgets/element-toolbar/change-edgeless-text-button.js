import { html, nothing } from 'lit';
export function renderChangeEdgelessTextButton(edgeless, elements) {
    if (!elements?.length)
        return nothing;
    return html `
    <edgeless-change-text-menu
      .elementType=${'edgeless-text'}
      .elements=${elements}
      .edgeless=${edgeless}
    ></edgeless-change-text-menu>
  `;
}
//# sourceMappingURL=change-edgeless-text-button.js.map