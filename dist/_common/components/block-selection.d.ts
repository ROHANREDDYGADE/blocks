import type { BlockComponent } from '@blocksuite/block-std';
import { LitElement, type PropertyValues } from 'lit';
declare const BlockSelection_base: typeof LitElement;
/**
 * Renders a the block selection.
 *
 * @example
 * ```ts
 * class Block extends LitElement {
 *   state override styles = css`
 *     :host {
 *       position: relative;
 *     }
 *
 *   render() {
 *      return html`<affine-block-selection></affine-block-selection>
 *   };
 * }
 * ```
 */
export declare class BlockSelection extends BlockSelection_base {
    static styles: import("lit").CSSResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(_changedProperties: PropertyValues): void;
    accessor block: BlockComponent;
    accessor borderRadius: number;
    accessor borderWidth: number;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-block-selection': BlockSelection;
    }
}
export {};
//# sourceMappingURL=block-selection.d.ts.map