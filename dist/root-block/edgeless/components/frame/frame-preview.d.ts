import type { FrameBlockModel } from '@blocksuite/affine-model';
import { type EditorHost, ShadowlessElement } from '@blocksuite/block-std';
import { type Doc } from '@blocksuite/store';
import { type PropertyValues } from 'lit';
declare const FramePreview_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class FramePreview extends FramePreview_base {
    static styles: import("lit").CSSResult;
    private _clearFrameDisposables;
    private _docFilter;
    private _frameDisposables;
    private _previewDoc;
    private _previewSpec;
    private _updateFrameViewportWH;
    get _originalDoc(): Doc;
    private _initPreviewDoc;
    private _initSpec;
    private _refreshViewport;
    private _renderSurfaceContent;
    private _setFrameDisposables;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    updated(_changedProperties: PropertyValues): void;
    accessor fillScreen: boolean;
    accessor frame: FrameBlockModel;
    accessor frameViewportWH: {
        width: number;
        height: number;
    };
    accessor previewEditor: EditorHost | null;
    accessor surfaceHeight: number;
    accessor surfaceWidth: number;
}
declare global {
    interface HTMLElementTagNameMap {
        'frame-preview': FramePreview;
    }
}
export {};
//# sourceMappingURL=frame-preview.d.ts.map