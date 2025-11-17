import { LitElement, nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
declare const ZoomBarToggleButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class ZoomBarToggleButton extends ZoomBarToggleButton_base {
    static styles: import("lit").CSSResult;
    private _abortController;
    private _closeZoomMenu;
    private _toggleZoomMenu;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    private accessor _showPopper;
    private accessor _toggleButton;
    accessor edgeless: EdgelessRootBlockComponent;
}
declare global {
    interface HTMLElementTagNameMap {
        'zoom-bar-toggle-button': ZoomBarToggleButton;
    }
}
export {};
//# sourceMappingURL=zoom-bar-toggle-button.d.ts.map