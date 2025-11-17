import type { RichText } from '@blocksuite/affine-components/rich-text';
import type { GroupElementModel } from '@blocksuite/affine-model';
import { ShadowlessElement } from '@blocksuite/block-std';
import { nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
declare const EdgelessGroupTitleEditor_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessGroupTitleEditor extends EdgelessGroupTitleEditor_base {
    get inlineEditor(): import("@blocksuite/affine-components/rich-text").AffineInlineEditor;
    get inlineEditorContainer(): import("@blocksuite/inline").InlineRootElement<import("@blocksuite/affine-shared/types").AffineTextAttributes>;
    private _unmount;
    connectedCallback(): void;
    firstUpdated(): void;
    getUpdateComplete(): Promise<boolean>;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor group: GroupElementModel;
    accessor richText: RichText;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-group-title-editor': EdgelessGroupTitleEditor;
    }
}
export {};
//# sourceMappingURL=edgeless-group-title-editor.d.ts.map