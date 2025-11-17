import { LitElement } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless/index.js';
declare const EdgelessLockButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessLockButton extends EdgelessLockButton_base {
    private get _selectedElements();
    private _lock;
    private _unlock;
    render(): import("lit-html").TemplateResult<1>;
    accessor edgeless: EdgelessRootBlockComponent;
}
export {};
//# sourceMappingURL=lock-button.d.ts.map