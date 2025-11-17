import { ShadowlessElement } from '@blocksuite/block-std';
import { type TemplateResult } from 'lit';
export declare class CenterPeek extends ShadowlessElement {
    static styles: import("lit").CSSResult;
    render(): TemplateResult<1>;
    accessor close: (() => void) | undefined;
    accessor content: TemplateResult | undefined;
}
export declare const popSideDetail: (template: TemplateResult) => Promise<void>;
//# sourceMappingURL=layout.d.ts.map