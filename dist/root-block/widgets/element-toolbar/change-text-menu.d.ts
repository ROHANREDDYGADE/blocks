import { LitElement, type TemplateResult } from 'lit';
import type { EdgelessColorPickerButton, PickColorEvent } from '../../edgeless/components/color-picker/index.js';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
declare const EdgelessChangeTextMenu_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessChangeTextMenu extends EdgelessChangeTextMenu_base {
    static styles: import("lit").CSSResult;
    private _setFontFamily;
    private _setFontSize;
    private _setFontWeightAndStyle;
    private _setTextAlign;
    private _setTextColor;
    private _updateElementBound;
    pickColor: (event: PickColorEvent) => void;
    get service(): import("../../index.js").EdgelessRootService;
    render(): Iterable<symbol | TemplateResult<1>>;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor elements: BlockSuite.EdgelessTextModelType[];
    accessor elementType: BlockSuite.EdgelessTextModelKeyType;
    accessor textColorButton: EdgelessColorPickerButton;
}
export {};
//# sourceMappingURL=change-text-menu.d.ts.map