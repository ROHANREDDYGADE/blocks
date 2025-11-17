import { LitElement } from 'lit';
import type { EdgelessRootBlockComponent } from '../../../edgeless-root-block.js';
declare const EdgelessNavigatorSettingButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessNavigatorSettingButton extends EdgelessNavigatorSettingButton_base {
    static styles: import("lit").CSSResult;
    private _navigatorSettingPopper?;
    private _onBlackBackgroundChange;
    private _tryRestoreSettings;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _navigatorSettingButton;
    private accessor _navigatorSettingMenu;
    accessor blackBackground: boolean;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor hideToolbar: boolean;
    accessor includeFrameOrder: boolean;
    accessor onHideToolbarChange: undefined | ((hideToolbar: boolean) => void);
    accessor popperShow: boolean;
    accessor setPopperShow: (show: boolean) => void;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-navigator-setting-button': EdgelessNavigatorSettingButton;
    }
}
export {};
//# sourceMappingURL=navigator-setting-button.d.ts.map