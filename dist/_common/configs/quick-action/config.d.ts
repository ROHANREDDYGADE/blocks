import type { EditorHost } from '@blocksuite/block-std';
import type { TemplateResult } from 'lit';
export interface QuickActionConfig {
    id: string;
    name: string;
    disabledToolTip?: string;
    icon: TemplateResult<1>;
    hotkey?: string;
    showWhen: (host: EditorHost) => boolean;
    enabledWhen: (host: EditorHost) => boolean;
    action: (host: EditorHost) => void;
}
export declare const quickActionConfig: QuickActionConfig[];
//# sourceMappingURL=config.d.ts.map