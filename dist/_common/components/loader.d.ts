import type { BlockModel } from '@blocksuite/store';
import { LitElement } from 'lit';
export declare class Loader extends LitElement {
    static styles: import("lit").CSSResult;
    constructor();
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor hostModel: BlockModel | null;
    accessor radius: string | number;
    accessor width: string | number;
}
declare global {
    interface HTMLElementTagNameMap {
        'loader-element': Loader;
    }
}
//# sourceMappingURL=loader.d.ts.map