import type { IBound } from '@blocksuite/global/utils';
import type { Doc } from '@blocksuite/store';
import { type CanvasRenderer } from '@blocksuite/affine-block-surface';
import { type BlockStdScope, type EditorHost, type ExtensionType } from '@blocksuite/block-std';
import type { GfxBlockModel } from '../../root-block/edgeless/block-model.js';
import type { EdgelessRootBlockComponent } from '../../root-block/edgeless/edgeless-root-block.js';
export type ExportOptions = {
    imageProxyEndpoint: string;
};
export declare class ExportManager {
    readonly std: BlockStdScope;
    private _exportOptions;
    private _replaceRichTextWithSvgElement;
    replaceImgSrcWithSvg: (element: HTMLElement) => Promise<void>;
    get doc(): Doc;
    get editorHost(): EditorHost;
    constructor(std: BlockStdScope);
    private _checkCanContinueToCanvas;
    private _checkReady;
    private _createCanvas;
    private _disableMediaPrint;
    private _docToCanvas;
    private _drawEdgelessBackground;
    private _elementToSvgElement;
    private _enableMediaPrint;
    private _html2canvas;
    private _toCanvas;
    edgelessToCanvas(surfaceRenderer: CanvasRenderer, bound: IBound, edgeless?: EdgelessRootBlockComponent, nodes?: GfxBlockModel[], surfaces?: BlockSuite.SurfaceElementModel[], edgelessBackground?: {
        zoom: number;
    }): Promise<HTMLCanvasElement | undefined>;
    exportPdf(): Promise<void>;
    exportPng(): Promise<void>;
}
export declare const ExportManagerExtension: ExtensionType;
//# sourceMappingURL=export-manager.d.ts.map