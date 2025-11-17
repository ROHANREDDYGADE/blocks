import { WidgetComponent } from '@blocksuite/block-std';
import { nothing } from 'lit';
export interface SelectionRect {
    width: number;
    height: number;
    top: number;
    left: number;
    transparent?: boolean;
}
export declare const AFFINE_DOC_REMOTE_SELECTION_WIDGET = "affine-doc-remote-selection-widget";
export declare class AffineDocRemoteSelectionWidget extends WidgetComponent {
    static styles: import("lit").CSSResult;
    private _abortController;
    private _remoteColorManager;
    private _remoteSelections;
    private _resizeObserver;
    private get _config();
    private get _container();
    private get _containerRect();
    private get _selectionManager();
    private _getCursorRect;
    private _getSelectionRect;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_DOC_REMOTE_SELECTION_WIDGET]: AffineDocRemoteSelectionWidget;
    }
}
//# sourceMappingURL=doc-remote-selection.d.ts.map