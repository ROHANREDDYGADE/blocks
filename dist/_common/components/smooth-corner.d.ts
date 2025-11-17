import { LitElement, type TemplateResult } from 'lit';
/**
 * ### A component to use figma 'smoothing radius'
 *
 * ```html
 * <smooth-corner
 *  .borderRadius=${10}
 *  .smooth=${0.5}
 *  .borderWidth=${2}
 *  .bgColor=${'white'}
 *   style="filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));"
 * >
 *    <h1>Smooth Corner</h1>
 * </smooth-corner>
 * ```
 *
 * **Just wrap your content with it.**
 * - There is a ResizeObserver inside to observe the size of the content.
 * - In order to use both border and shadow, we use svg to draw.
 *    - So we need to use `stroke` and `drop-shadow` to replace `border` and `box-shadow`.
 *
 * #### required properties
 * - `borderRadius`: Equal to the border-radius
 * - `smooth`: From 0 to 1, refer to the figma smoothing radius
 *
 * #### customizable style properties
 * Provides some commonly used styles, dealing with their mapping with SVG attributes, such as:
 * - `borderWidth` (stroke-width)
 * - `borderColor` (stroke)
 * - `bgColor` (fill)
 * - `bgOpacity` (fill-opacity)
 *
 * #### More customization
 * Use css to customize this component, such as drop-shadow:
 * ```css
 * smooth-corner {
 *  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));
 * }
 * ```
 */
export declare class SmoothCorner extends LitElement {
    static styles: import("lit").CSSResult;
    private _resizeObserver;
    get _path(): string;
    constructor();
    private _getSvg;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): TemplateResult<1>;
    /**
     * Background color of the element
     */
    accessor bgColor: string;
    /**
     * Background opacity of the element
     */
    accessor bgOpacity: number;
    /**
     * Border color of the element
     */
    accessor borderColor: string;
    /**
     * Equal to the border-radius
     */
    accessor borderRadius: number;
    /**
     * Border width of the element in px
     */
    accessor borderWidth: number;
    accessor height: number;
    /**
     * From 0 to 1
     */
    accessor smooth: number;
    accessor width: number;
}
declare global {
    interface HTMLElementTagNameMap {
        'smooth-corner': SmoothCorner;
    }
}
//# sourceMappingURL=smooth-corner.d.ts.map