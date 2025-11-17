import { FontFamily, FontStyle, FontWeight } from '@blocksuite/affine-model';
import { LitElement } from 'lit';
export declare class EdgelessFontWeightAndStylePanel extends LitElement {
    static styles: import("lit").CSSResult;
    private _isActive;
    private _isDisabled;
    private _onSelect;
    render(): Iterable<unknown>;
    accessor fontFamily: FontFamily;
    accessor fontStyle: FontStyle;
    accessor fontWeight: FontWeight;
    accessor onSelect: ((fontWeight: FontWeight, fontStyle: FontStyle) => void) | undefined;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-font-weight-and-style-panel': EdgelessFontWeightAndStylePanel;
    }
}
//# sourceMappingURL=font-weight-and-style-panel.d.ts.map