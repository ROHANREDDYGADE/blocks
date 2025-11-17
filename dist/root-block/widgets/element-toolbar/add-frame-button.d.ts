import { LitElement, nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
declare const EdgelessAddFrameButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessAddFrameButton extends EdgelessAddFrameButton_base {
    static styles: import("lit").CSSResult;
    private _createFrame;
    protected render(): import("lit-html").TemplateResult<1>;
    accessor edgeless: EdgelessRootBlockComponent;
}
export declare function renderAddFrameButton(edgeless: EdgelessRootBlockComponent, elements: BlockSuite.EdgelessModel[]): import("lit-html").TemplateResult<1> | typeof nothing;
export {};
//# sourceMappingURL=add-frame-button.d.ts.map