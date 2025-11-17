import { LitElement, type TemplateResult } from 'lit';
import type { EmbedCardStyle } from '../../../../_common/types.js';
declare const CardStylePanel_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class CardStylePanel extends CardStylePanel_base {
    static styles: import("lit").CSSResult;
    render(): unknown;
    accessor onSelect: (value: EmbedCardStyle) => void;
    accessor options: {
        style: EmbedCardStyle;
        Icon: TemplateResult<1>;
        tooltip: string;
    }[];
    accessor value: EmbedCardStyle | undefined;
}
declare global {
    interface HTMLElementTagNameMap {
        'card-style-panel': CardStylePanel;
    }
}
export {};
//# sourceMappingURL=card-style-panel.d.ts.map