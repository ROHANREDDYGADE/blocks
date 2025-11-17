import { type ConnectorElementModel } from '@blocksuite/affine-model';
import { StrokeStyle } from '@blocksuite/affine-model';
import { LitElement, nothing, type TemplateResult } from 'lit';
import type { EdgelessColorPickerButton } from '../../edgeless/components/color-picker/button.js';
import type { PickColorEvent } from '../../edgeless/components/color-picker/types.js';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
export declare function getMostCommonLineStyle(elements: ConnectorElementModel[]): StrokeStyle | null;
declare const EdgelessChangeConnectorButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessChangeConnectorButton extends EdgelessChangeConnectorButton_base {
    pickColor: (event: PickColorEvent) => void;
    get doc(): import("@blocksuite/store").Doc;
    get service(): import("../../index.js").EdgelessRootService;
    private _addLabel;
    private _flipEndpointStyle;
    private _getEndpointIcon;
    private _setConnectorColor;
    private _setConnectorMode;
    private _setConnectorPointStyle;
    private _setConnectorProp;
    private _setConnectorRough;
    private _setConnectorStroke;
    private _setConnectorStrokeStyle;
    private _setConnectorStrokeWidth;
    private _showAddButtonOrTextMenu;
    render(): Iterable<symbol | TemplateResult<1> | undefined>;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor elements: ConnectorElementModel[];
    accessor strokeColorButton: EdgelessColorPickerButton;
}
export declare function renderConnectorButton(edgeless: EdgelessRootBlockComponent, elements?: ConnectorElementModel[]): TemplateResult<1> | typeof nothing;
export {};
//# sourceMappingURL=change-connector-button.d.ts.map