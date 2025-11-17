import type { RichText } from '@blocksuite/affine-components/rich-text';
import { FrameBlockModel } from '@blocksuite/affine-model';
import { ShadowlessElement } from '@blocksuite/block-std';
import { nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
declare const EdgelessFrameTitleEditor_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessFrameTitleEditor extends EdgelessFrameTitleEditor_base {
    static styles: import("lit").CSSResult;
    get editorHost(): import("@blocksuite/block-std").EditorHost;
    get inlineEditor(): import("@blocksuite/affine-components/rich-text").AffineInlineEditor | null | undefined;
    private _unmount;
    connectedCallback(): void;
    firstUpdated(): void;
    getUpdateComplete(): Promise<boolean>;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor frameModel: FrameBlockModel;
    accessor richText: RichText | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-frame-title-editor': EdgelessFrameTitleEditor;
    }
}
export {};
//# sourceMappingURL=edgeless-frame-title-editor.d.ts.map