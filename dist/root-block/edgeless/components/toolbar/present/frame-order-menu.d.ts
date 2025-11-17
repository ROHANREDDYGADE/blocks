import { LitElement } from 'lit';
import type { EdgelessRootBlockComponent } from '../../../edgeless-root-block.js';
declare const EdgelessFrameOrderMenu_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessFrameOrderMenu extends EdgelessFrameOrderMenu_base {
    static styles: import("lit").CSSResult;
    private get _frames();
    private _bindEvent;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _clone;
    private accessor _container;
    private accessor _curIndex;
    private accessor _indicatorLine;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor embed: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-frame-order-menu': EdgelessFrameOrderMenu;
    }
}
export {};
//# sourceMappingURL=frame-order-menu.d.ts.map