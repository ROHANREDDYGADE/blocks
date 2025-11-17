import { ArrowUpIcon, ConnectorCWithArrowIcon, ConnectorLWithArrowIcon, ConnectorXWithArrowIcon, } from '@blocksuite/affine-components/icons';
import { ConnectorMode, getConnectorModeName } from '@blocksuite/affine-model';
import { EditPropsStore } from '@blocksuite/affine-shared/services';
import { SignalWatcher } from '@blocksuite/global/utils';
import { computed } from '@preact/signals-core';
import { css, html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { getTooltipWithShortcut } from '../../utils.js';
import { QuickToolMixin } from '../mixins/quick-tool.mixin.js';
const IcomMap = {
    [ConnectorMode.Straight]: ConnectorLWithArrowIcon,
    [ConnectorMode.Orthogonal]: ConnectorXWithArrowIcon,
    [ConnectorMode.Curve]: ConnectorCWithArrowIcon,
};
export class EdgelessConnectorToolButton extends QuickToolMixin(SignalWatcher(LitElement)) {
    constructor() {
        super(...arguments);
        this._mode$ = computed(() => {
            return this.edgeless.std.get(EditPropsStore).lastProps$.value.connector
                .mode;
        });
        this.type = 'connector';
    }
    static { this.styles = css `
    :host {
      display: flex;
    }
    .edgeless-connector-button {
      display: flex;
      position: relative;
    }
    .arrow-up-icon {
      position: absolute;
      top: 4px;
      right: 2px;
      font-size: 0;
    }
  `; }
    _toggleMenu() {
        if (this.tryDisposePopper())
            return;
        const menu = this.createPopper('edgeless-connector-menu', this);
        menu.element.edgeless = this.edgeless;
        menu.element.onChange = (props) => {
            this.edgeless.std.get(EditPropsStore).recordLastProps('connector', props);
            this.setEdgelessTool(this.type, {
                mode: this._mode$.value,
            });
        };
    }
    render() {
        const { active } = this;
        const mode = this._mode$.value;
        const arrowColor = active ? 'currentColor' : 'var(--affine-icon-secondary)';
        return html `
      <edgeless-tool-icon-button
        .tooltip=${this.popper
            ? ''
            : getTooltipWithShortcut(getConnectorModeName(mode), 'C')}
        .tooltipOffset=${17}
        .active=${active}
        .iconContainerPadding=${6}
        class="edgeless-connector-button"
        @click=${() => {
            // don't update tool before toggling menu
            this._toggleMenu();
            this.edgeless.gfx.tool.setTool('connector', {
                mode,
            });
        }}
      >
        ${IcomMap[mode]}
        <span class="arrow-up-icon" style=${styleMap({ color: arrowColor })}>
          ${ArrowUpIcon}
        </span>
      </edgeless-tool-icon-button>
    `;
    }
}
//# sourceMappingURL=connector-tool-button.js.map