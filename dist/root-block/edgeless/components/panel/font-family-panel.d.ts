import { FontFamily } from '@blocksuite/affine-model';
import { LitElement } from 'lit';
export declare class EdgelessFontFamilyPanel extends LitElement {
    static styles: import("lit").CSSResult;
    private _onSelect;
    render(): unknown;
    accessor onSelect: ((value: FontFamily) => void) | undefined;
    accessor value: FontFamily;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-font-family-panel': EdgelessFontFamilyPanel;
    }
}
//# sourceMappingURL=font-family-panel.d.ts.map