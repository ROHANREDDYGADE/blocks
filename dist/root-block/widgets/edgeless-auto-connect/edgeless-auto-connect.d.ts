import { type RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import { nothing, type TemplateResult } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
import type { EdgelessRootService } from '../../edgeless/edgeless-root-service.js';
export declare const AFFINE_EDGELESS_AUTO_CONNECT_WIDGET = "affine-edgeless-auto-connect-widget";
export declare class EdgelessAutoConnectWidget extends WidgetComponent<RootBlockModel, EdgelessRootBlockComponent, EdgelessRootService> {
    static styles: import("lit").CSSResult;
    private _updateLabels;
    private _EdgelessOnlyLabels;
    private _getElementsAndCounts;
    private _initLabels;
    private _navigateToNext;
    private _navigateToPrev;
    private _NavigatorComponent;
    private _PageVisibleIndexLabels;
    private _setHostStyle;
    connectedCallback(): void;
    firstUpdated(): void;
    render(): TemplateResult<1> | typeof nothing;
    private accessor _dragging;
    private accessor _edgelessOnlyNotesSet;
    private accessor _index;
    private accessor _pageVisibleElementsMap;
    private accessor _show;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-edgeless-auto-connect-widget': EdgelessAutoConnectWidget;
    }
}
//# sourceMappingURL=edgeless-auto-connect.d.ts.map