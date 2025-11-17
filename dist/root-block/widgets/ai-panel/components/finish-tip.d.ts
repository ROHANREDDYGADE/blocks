import type { EditorHost } from '@blocksuite/block-std';
import { LitElement } from 'lit';
import type { CopyConfig } from '../type.js';
declare const AIFinishTip_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class AIFinishTip extends AIFinishTip_base {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    accessor copied: boolean;
    accessor copy: CopyConfig | undefined;
    accessor host: EditorHost;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-finish-tip': AIFinishTip;
    }
}
export {};
//# sourceMappingURL=finish-tip.d.ts.map