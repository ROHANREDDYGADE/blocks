import { LitElement } from 'lit';
/**
 * A scrollbar that is only visible when the user is interacting with it.
 * Append this element to the a container that has a scrollable element. Which means
 * the scrollable element should lay on the same level as the overlay-scrollbar.
 *
 * And the scrollable element should have a `data-scrollable` attribute.
 *
 * Example:
 * ```
 * <div class="container">
 *    <div class="scrollable-element-with-fixed-height" data-scrollable>
 *       <!--.... very long content ....-->
 *    </div>
 *    <overlay-scrollbar></overlay-scrollbar>
 * </div>
 * ```
 *
 * Note:
 * - It only works with vertical scrollbars.
 */
export declare class OverlayScrollbar extends LitElement {
    static styles: import("lit").CSSResult;
    private _disposable;
    private _handleVisible;
    private _scrollable;
    private _dragHandle;
    private _initWheelHandler;
    private _scroll;
    private _toggleScrollbarVisible;
    private _updateScrollbarRect;
    connectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _handle;
}
declare global {
    interface HTMLElementTagNameMap {
        'overlay-scrollbar': OverlayScrollbar;
    }
}
//# sourceMappingURL=overlay-scrollbar.d.ts.map