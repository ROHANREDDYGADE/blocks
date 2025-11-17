import { TextAlign } from '@blocksuite/affine-model';
import { LitElement } from 'lit';
export declare class EdgelessAlignPanel extends LitElement {
    static styles: import("lit").CSSResult;
    private _onSelect;
    render(): unknown;
    accessor onSelect: undefined | ((value: TextAlign) => void);
    accessor value: TextAlign;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-align-panel': EdgelessAlignPanel;
    }
}
//# sourceMappingURL=align-panel.d.ts.map