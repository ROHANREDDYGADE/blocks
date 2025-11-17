import { ShapeStyle } from '@blocksuite/affine-model';
import { LitElement } from 'lit';
export declare class EdgelessShapeStylePanel extends LitElement {
    static styles: import("lit").CSSResult;
    private _onSelect;
    render(): unknown;
    accessor onSelect: undefined | ((value: ShapeStyle) => void);
    accessor value: ShapeStyle;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-shape-style-panel': EdgelessShapeStylePanel;
    }
}
//# sourceMappingURL=shape-style-panel.d.ts.map