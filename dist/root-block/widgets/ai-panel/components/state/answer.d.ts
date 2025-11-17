import type { EditorHost } from '@blocksuite/block-std';
import { LitElement } from 'lit';
import type { AIPanelAnswerConfig, CopyConfig } from '../../type.js';
declare const AIPanelAnswer_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class AIPanelAnswer extends AIPanelAnswer_base {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    accessor config: AIPanelAnswerConfig;
    accessor copy: CopyConfig | undefined;
    accessor finish: boolean;
    accessor host: EditorHost;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-panel-answer': AIPanelAnswer;
    }
}
export {};
//# sourceMappingURL=answer.d.ts.map