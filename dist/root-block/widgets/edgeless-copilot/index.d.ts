import type { RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import { Bound } from '@blocksuite/global/utils';
import { nothing } from 'lit';
import type { AIItemGroupConfig } from '../../../_common/components/ai-item/types.js';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
export declare const AFFINE_EDGELESS_COPILOT_WIDGET = "affine-edgeless-copilot-widget";
export declare class EdgelessCopilotWidget extends WidgetComponent<RootBlockModel, EdgelessRootBlockComponent> {
    static styles: import("lit").CSSResult;
    private _clickOutsideOff;
    private _copilotPanel;
    private _listenClickOutsideId;
    private _selectionModelRect;
    groups: AIItemGroupConfig[];
    get edgeless(): EdgelessRootBlockComponent;
    get selectionModelRect(): DOMRect;
    get selectionRect(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    get visible(): boolean;
    set visible(visible: boolean);
    private _showCopilotPanel;
    private _updateSelection;
    private _watchClickOutside;
    connectedCallback(): void;
    determineInsertionBounds(width?: number, height?: number): Bound;
    hideCopilotPanel(): void;
    lockToolbar(disabled: boolean): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    private accessor _selectionRect;
    private accessor _visible;
    accessor selectionElem: HTMLDivElement;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_EDGELESS_COPILOT_WIDGET]: EdgelessCopilotWidget;
    }
}
//# sourceMappingURL=index.d.ts.map