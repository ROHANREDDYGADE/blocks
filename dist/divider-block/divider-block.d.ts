import type { DividerBlockModel } from '@blocksuite/affine-model';
import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
export declare class DividerBlockComponent extends CaptionedBlockComponent<DividerBlockModel> {
    static styles: import("lit").CSSResult;
    connectedCallback(): void;
    renderBlock(): import("lit-html").TemplateResult<1>;
    accessor useZeroWidth: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-divider': DividerBlockComponent;
    }
}
//# sourceMappingURL=divider-block.d.ts.map