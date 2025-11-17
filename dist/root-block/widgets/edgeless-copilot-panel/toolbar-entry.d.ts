import type { EditorHost } from '@blocksuite/block-std';
import { LitElement } from 'lit';
import type { AIItemGroupConfig } from '../../../_common/components/ai-item/types.js';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
declare const EdgelessCopilotToolbarEntry_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessCopilotToolbarEntry extends EdgelessCopilotToolbarEntry_base {
    static styles: import("lit").CSSResult;
    private _onClick;
    private _showCopilotPanel;
    render(): import("lit-html").TemplateResult<1>;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor groups: AIItemGroupConfig[];
    accessor host: EditorHost;
    accessor onClick: (() => void) | undefined;
}
export {};
//# sourceMappingURL=toolbar-entry.d.ts.map