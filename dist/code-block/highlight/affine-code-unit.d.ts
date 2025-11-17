import type { AffineTextAttributes } from '@blocksuite/affine-shared/types';
import { ShadowlessElement } from '@blocksuite/block-std';
import { type DeltaInsert } from '@blocksuite/inline';
export declare class AffineCodeUnit extends ShadowlessElement {
    get codeBlock(): import("../code-block.js").CodeBlockComponent | null;
    get vElement(): import("@blocksuite/inline").VElement<{
        bold?: true | null | undefined;
        italic?: true | null | undefined;
        underline?: true | null | undefined;
        strike?: true | null | undefined;
        code?: true | null | undefined;
        link?: string | null | undefined;
    }> | null;
    render(): import("lit-html").TemplateResult<1>;
    accessor delta: DeltaInsert<AffineTextAttributes>;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-code-unit': AffineCodeUnit;
    }
}
//# sourceMappingURL=affine-code-unit.d.ts.map