import { LitElement, nothing, type TemplateResult } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
declare const EdgelessAlignButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessAlignButton extends EdgelessAlignButton_base {
    static styles: import("lit").CSSResult;
    private get elements();
    private _align;
    private _alignBottom;
    private _alignDistributeHorizontally;
    private _alignDistributeVertically;
    private _alignHorizontally;
    private _alignLeft;
    private _alignRight;
    private _alignTop;
    private _alignVertically;
    private _updateXYWH;
    private renderIcons;
    firstUpdated(): void;
    render(): TemplateResult<1>;
    accessor edgeless: EdgelessRootBlockComponent;
}
export declare function renderAlignButton(edgeless: EdgelessRootBlockComponent, elements: BlockSuite.EdgelessModel[]): TemplateResult<1> | typeof nothing;
export {};
//# sourceMappingURL=align-button.d.ts.map