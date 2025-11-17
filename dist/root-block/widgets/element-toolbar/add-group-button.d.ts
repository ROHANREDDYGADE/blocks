import { LitElement, nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
declare const EdgelessAddGroupButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessAddGroupButton extends EdgelessAddGroupButton_base {
    static styles: import("lit").CSSResult;
    private _createGroup;
    protected render(): import("lit-html").TemplateResult<1>;
    accessor edgeless: EdgelessRootBlockComponent;
}
export declare function renderAddGroupButton(edgeless: EdgelessRootBlockComponent, elements: BlockSuite.EdgelessModel[]): import("lit-html").TemplateResult<1> | typeof nothing;
export {};
//# sourceMappingURL=add-group-button.d.ts.map