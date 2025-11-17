import type { BrushElementModel } from '@blocksuite/affine-model';
import { LineWidth } from '@blocksuite/affine-model';
import { LitElement, nothing } from 'lit';
import type { EdgelessColorPickerButton } from '../../edgeless/components/color-picker/button.js';
import type { PickColorEvent } from '../../edgeless/components/color-picker/types.js';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
declare const EdgelessChangeBrushButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessChangeBrushButton extends EdgelessChangeBrushButton_base {
    private _setBrushColor;
    private _setLineWidth;
    pickColor: (event: PickColorEvent) => void;
    get doc(): import("@blocksuite/store").Doc;
    get selectedColor(): string;
    get selectedSize(): LineWidth;
    get service(): import("../../index.js").EdgelessRootService;
    get surface(): import("@blocksuite/affine-block-surface").SurfaceBlockComponent;
    private _setBrushProp;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _selectedColor;
    private accessor _selectedSize;
    accessor colorButton: EdgelessColorPickerButton;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor elements: BrushElementModel[];
}
export declare function renderChangeBrushButton(edgeless: EdgelessRootBlockComponent, elements?: BrushElementModel[]): import("lit-html").TemplateResult<1> | typeof nothing;
export {};
//# sourceMappingURL=change-brush-button.d.ts.map