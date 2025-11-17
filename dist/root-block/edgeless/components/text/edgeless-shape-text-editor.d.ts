import type { RichText } from '@blocksuite/affine-components/rich-text';
import type { ShapeElementModel } from '@blocksuite/affine-model';
import { ShadowlessElement } from '@blocksuite/block-std';
import { nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
declare const EdgelessShapeTextEditor_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessShapeTextEditor extends EdgelessShapeTextEditor_base {
    private _keeping;
    private _lastXYWH;
    private _resizeObserver;
    get inlineEditor(): import("@blocksuite/affine-components/rich-text").AffineInlineEditor;
    get inlineEditorContainer(): import("@blocksuite/inline").InlineRootElement<import("@blocksuite/affine-shared/types").AffineTextAttributes>;
    get isMindMapNode(): boolean;
    private _initMindmapKeyBindings;
    private _stashMindMapTree;
    private _unmount;
    private _updateElementWH;
    connectedCallback(): void;
    firstUpdated(): void;
    getUpdateComplete(): Promise<boolean>;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    setKeeping(keeping: boolean): void;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor element: ShapeElementModel;
    accessor mountEditor: ((element: ShapeElementModel, edgeless: EdgelessRootBlockComponent) => void) | undefined;
    accessor richText: RichText;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-shape-text-editor': EdgelessShapeTextEditor;
    }
}
export {};
//# sourceMappingURL=edgeless-shape-text-editor.d.ts.map