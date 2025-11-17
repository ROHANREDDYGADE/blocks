import type { FrameBlockModel } from '@blocksuite/affine-model';
import { LitElement } from 'lit';
import type { EdgelessRootBlockComponent } from '../../../edgeless-root-block.js';
declare const EdgelessFrameOrderButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessFrameOrderButton extends EdgelessFrameOrderButton_base {
    static styles: import("lit").CSSResult;
    private _edgelessFrameOrderPopper;
    disconnectedCallback(): void;
    firstUpdated(): void;
    protected render(): import("lit-html").TemplateResult<1>;
    private accessor _edgelessFrameOrderButton;
    private accessor _edgelessFrameOrderMenu;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor frames: FrameBlockModel[];
    accessor popperShow: boolean;
    accessor setPopperShow: (show: boolean) => void;
}
export {};
//# sourceMappingURL=frame-order-button.d.ts.map