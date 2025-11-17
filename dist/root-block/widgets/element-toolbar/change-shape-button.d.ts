import type { ShapeElementModel } from '@blocksuite/affine-model';
import { LitElement, nothing, type TemplateResult } from 'lit';
import type { EdgelessColorPickerButton } from '../../edgeless/components/color-picker/button.js';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
declare const EdgelessChangeShapeButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessChangeShapeButton extends EdgelessChangeShapeButton_base {
    #private;
    static styles: import("lit").CSSResult[][];
    get service(): import("../../index.js").EdgelessRootService;
    private _addText;
    private _getTextColor;
    private _setShapeFillColor;
    private _setShapeStrokeColor;
    private _setShapeStrokeStyle;
    private _setShapeStrokeWidth;
    private _setShapeStyle;
    private _setShapeStyles;
    private _showAddButtonOrTextMenu;
    firstUpdated(): void;
    render(): Iterable<symbol | TemplateResult<1> | undefined>;
    private accessor _shapePanel;
    accessor borderStyleButton: EdgelessColorPickerButton;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor elements: ShapeElementModel[];
    accessor fillColorButton: EdgelessColorPickerButton;
}
export declare function renderChangeShapeButton(edgeless: EdgelessRootBlockComponent, elements?: ShapeElementModel[]): TemplateResult<1> | typeof nothing;
export {};
//# sourceMappingURL=change-shape-button.d.ts.map