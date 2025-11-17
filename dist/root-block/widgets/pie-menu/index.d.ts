import type { IVec } from '@blocksuite/global/utils';
import { WidgetComponent } from '@blocksuite/block-std';
import { nothing } from 'lit';
import type { PieMenuSchema } from './base.js';
import { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
import { PieMenu } from './menu.js';
export declare const AFFINE_PIE_MENU_WIDGET = "affine-pie-menu-widget";
export declare class AffinePieMenuWidget extends WidgetComponent {
    private _handleCursorPos;
    private _handleKeyUp;
    mouse: IVec;
    selectOnTrigRelease: {
        allow: boolean;
        timeout?: NodeJS.Timeout;
    };
    get isEnabled(): boolean;
    get isOpen(): boolean;
    get rootComponent(): EdgelessRootBlockComponent;
    private _attachMenu;
    private _initPie;
    private _onMenuClose;
    _createMenu(schema: PieMenuSchema, { x, y, widgetComponent, }: {
        x: number;
        y: number;
        widgetComponent: AffinePieMenuWidget;
    }): PieMenu;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): typeof nothing | PieMenu;
    accessor currentMenu: PieMenu | null;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_PIE_MENU_WIDGET]: AffinePieMenuWidget;
    }
}
//# sourceMappingURL=index.d.ts.map