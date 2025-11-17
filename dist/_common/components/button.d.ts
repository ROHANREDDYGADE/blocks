import { LitElement, nothing, type TemplateResult } from 'lit';
/**
 * Default size is 32px, you can override it by setting `size` property.
 * For example, `<icon-button size="32px"></icon-button>`.
 *
 * You can also set `width` or `height` property to override the size.
 *
 * Set `text` property to show a text label.
 *
 * @example
 * ```ts
 * html`<icon-button @click=${this.onUnlink}>
 *   ${UnlinkIcon}
 * </icon-button>`
 *
 * html`<icon-button size="32px" text="HTML" @click=${this._importHtml}>
 *   ${ExportToHTMLIcon}
 * </icon-button>`
 * ```
 */
export declare class IconButton extends LitElement {
    static styles: import("lit").CSSResult;
    constructor();
    connectedCallback(): void;
    render(): TemplateResult<1> | typeof nothing;
    accessor active: boolean;
    accessor disabled: boolean | undefined;
    accessor height: string | number | null;
    accessor hover: 'true' | 'false' | undefined;
    accessor size: string | number | null;
    accessor subText: string | TemplateResult<1> | null;
    accessor text: string | TemplateResult<1> | null;
    accessor textElement: HTMLDivElement | null;
    accessor width: string | number | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'icon-button': IconButton;
    }
}
//# sourceMappingURL=button.d.ts.map