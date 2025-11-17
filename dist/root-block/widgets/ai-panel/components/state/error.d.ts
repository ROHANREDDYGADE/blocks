import type { EditorHost } from '@blocksuite/block-std';
import { LitElement } from 'lit';
import type { AIPanelErrorConfig, CopyConfig } from '../../type.js';
declare const AIPanelError_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class AIPanelError extends AIPanelError_base {
    static styles: import("lit").CSSResult;
    private _getResponseGroup;
    render(): import("lit-html").TemplateResult<1>;
    accessor config: AIPanelErrorConfig;
    accessor copy: CopyConfig | undefined;
    accessor host: EditorHost;
    accessor withAnswer: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-panel-error': AIPanelError;
    }
}
export {};
//# sourceMappingURL=error.d.ts.map