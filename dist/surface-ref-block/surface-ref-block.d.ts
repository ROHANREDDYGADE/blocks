import type { BlockCaptionEditor } from '@blocksuite/affine-components/caption';
import { type SurfaceRefBlockModel } from '@blocksuite/affine-model';
import { type EditorHost } from '@blocksuite/block-std';
import { BlockComponent } from '@blocksuite/block-std';
import { nothing, type TemplateResult } from 'lit';
import type { SurfaceRefBlockService } from './surface-ref-service.js';
export declare class SurfaceRefBlockComponent extends BlockComponent<SurfaceRefBlockModel, SurfaceRefBlockService> {
    static styles: import("lit").CSSResult;
    private _previewDoc;
    private _previewSpec;
    private _referencedModel;
    private _referenceXYWH;
    private _viewportEditor;
    private get _shouldRender();
    get referenceModel(): import("@blocksuite/block-std/gfx").GfxModel | null;
    private _deleteThis;
    private _focusBlock;
    private _initHotkey;
    private _initReferencedModel;
    private _initSelection;
    private _initSpec;
    private _refreshViewport;
    private _renderMask;
    private _renderRefContent;
    private _renderRefPlaceholder;
    connectedCallback(): void;
    render(): TemplateResult<1> | typeof nothing;
    viewInEdgeless(): void;
    willUpdate(_changedProperties: Map<PropertyKey, unknown>): void;
    private accessor _focused;
    private accessor _surfaceModel;
    accessor captionElement: BlockCaptionEditor;
    accessor previewEditor: EditorHost | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-surface-ref': SurfaceRefBlockComponent;
    }
}
//# sourceMappingURL=surface-ref-block.d.ts.map