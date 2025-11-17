import { SurfaceElementModel, } from '@blocksuite/affine-block-surface';
import { GroupElementModel, } from '@blocksuite/affine-model';
import { FetchUtils } from '@blocksuite/affine-shared/adapters';
import { CANVAS_EXPORT_IGNORE_TAGS, DEFAULT_IMAGE_PROXY_ENDPOINT, } from '@blocksuite/affine-shared/consts';
import { isInsidePageEditor, matchFlavours, } from '@blocksuite/affine-shared/utils';
import { StdIdentifier, } from '@blocksuite/block-std';
import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';
import { Bound } from '@blocksuite/global/utils';
import { getBlockComponentByModel, getRootByEditorHost, } from '../../_common/utils/index.js';
import { getBlocksInFrameBound } from '../../root-block/edgeless/frame-manager.js';
import { xywhArrayToObject } from '../../root-block/edgeless/utils/convert.js';
import { getBackgroundGrid } from '../../root-block/edgeless/utils/query.js';
import { FileExporter } from './file-exporter.js';
export class ExportManager {
    get doc() {
        return this.std.doc;
    }
    get editorHost() {
        return this.std.host;
    }
    constructor(std) {
        this.std = std;
        this._exportOptions = {
            imageProxyEndpoint: DEFAULT_IMAGE_PROXY_ENDPOINT,
        };
        this._replaceRichTextWithSvgElement = (element) => {
            const richList = Array.from(element.querySelectorAll('.inline-editor'));
            richList.map(rich => {
                const svgEle = this._elementToSvgElement(rich.cloneNode(true), rich.clientWidth, rich.clientHeight + 1);
                rich.parentElement?.append(svgEle);
                rich.remove();
            });
        };
        this.replaceImgSrcWithSvg = async (element) => {
            const imgList = Array.from(element.querySelectorAll('img'));
            // Create an array of promises
            const promises = imgList.map(img => {
                return FetchUtils.fetchImage(img.src, undefined, this._exportOptions.imageProxyEndpoint)
                    .then(response => response && response.blob())
                    .then(async (blob) => {
                    if (!blob)
                        return;
                    // If the file type is SVG, set svg width and height
                    if (blob.type === 'image/svg+xml') {
                        // Parse the SVG
                        const parser = new DOMParser();
                        const svgDoc = parser.parseFromString(await blob.text(), 'image/svg+xml');
                        const svgElement = svgDoc.documentElement;
                        // Check if the SVG has width and height attributes
                        if (!svgElement.hasAttribute('width') &&
                            !svgElement.hasAttribute('height')) {
                            // Get the viewBox
                            const viewBox = svgElement.viewBox.baseVal;
                            // Set the SVG width and height
                            svgElement.setAttribute('width', `${viewBox.width}px`);
                            svgElement.setAttribute('height', `${viewBox.height}px`);
                        }
                        // Replace the img src with the modified SVG
                        const serializer = new XMLSerializer();
                        const newSvgStr = serializer.serializeToString(svgElement);
                        img.src =
                            'data:image/svg+xml;charset=utf-8,' +
                                encodeURIComponent(newSvgStr);
                    }
                });
            });
            // Wait for all promises to resolve
            await Promise.all(promises);
        };
    }
    _checkCanContinueToCanvas(pathName, editorMode) {
        if (location.pathname !== pathName ||
            isInsidePageEditor(this.editorHost) !== editorMode) {
            throw new BlockSuiteError(ErrorCode.EdgelessExportError, 'Unable to export content to canvas');
        }
    }
    async _checkReady() {
        const pathname = location.pathname;
        const editorMode = isInsidePageEditor(this.editorHost);
        const promise = new Promise((resolve, reject) => {
            let count = 0;
            const checkReactRender = setInterval(() => {
                try {
                    this._checkCanContinueToCanvas(pathname, editorMode);
                }
                catch (e) {
                    clearInterval(checkReactRender);
                    reject(e);
                }
                const rootModel = this.doc.root;
                const rootComponent = this.doc.root
                    ? getBlockComponentByModel(this.editorHost, rootModel)
                    : null;
                const imageCard = rootComponent?.querySelector('affine-image-fallback-card');
                const isReady = !imageCard || imageCard.getAttribute('imageState') === '0';
                if (rootComponent && isReady) {
                    clearInterval(checkReactRender);
                    resolve(true);
                }
                count++;
                if (count > 10 * 60) {
                    clearInterval(checkReactRender);
                    resolve(false);
                }
            }, 100);
        });
        return promise;
    }
    _createCanvas(bound, fillStyle) {
        const canvas = document.createElement('canvas');
        const dpr = window.devicePixelRatio || 1;
        const ctx = canvas.getContext('2d');
        canvas.width = (bound.w + 100) * dpr;
        canvas.height = (bound.h + 100) * dpr;
        ctx.scale(dpr, dpr);
        ctx.fillStyle = fillStyle;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return { canvas, ctx };
    }
    _disableMediaPrint() {
        document.querySelectorAll('.media-print').forEach(mediaPrint => {
            mediaPrint.classList.add('hide');
        });
    }
    async _docToCanvas() {
        const html2canvas = (await import('html2canvas')).default;
        if (!(html2canvas instanceof Function))
            return;
        const pathname = location.pathname;
        const editorMode = isInsidePageEditor(this.editorHost);
        const rootComponent = getRootByEditorHost(this.editorHost);
        if (!rootComponent)
            return;
        const viewportElement = rootComponent.viewportElement;
        if (!viewportElement)
            return;
        const pageContainer = viewportElement.querySelector('.affine-page-root-block-container');
        const rect = pageContainer?.getBoundingClientRect();
        const { viewport } = rootComponent;
        if (!viewport)
            return;
        const pageWidth = rect?.width;
        const pageLeft = rect?.left ?? 0;
        const viewportHeight = viewportElement?.scrollHeight;
        const html2canvasOption = {
            ignoreElements: function (element) {
                if (CANVAS_EXPORT_IGNORE_TAGS.includes(element.tagName) ||
                    element.classList.contains('dg')) {
                    return true;
                }
                else if ((element.classList.contains('close') &&
                    element.parentElement?.classList.contains('meta-data-expanded-title')) ||
                    (element.classList.contains('expand') &&
                        element.parentElement?.classList.contains('meta-data'))) {
                    // the close and expand buttons in affine-doc-meta-data is not needed to be showed
                    return true;
                }
                else {
                    return false;
                }
            },
            onclone: async (_documentClone, element) => {
                element.style.height = `${viewportHeight}px`;
                this._replaceRichTextWithSvgElement(element);
                await this.replaceImgSrcWithSvg(element);
            },
            backgroundColor: window.getComputedStyle(viewportElement).backgroundColor,
            x: pageLeft - viewport.left,
            width: pageWidth,
            height: viewportHeight,
            useCORS: this._exportOptions.imageProxyEndpoint ? false : true,
            proxy: this._exportOptions.imageProxyEndpoint,
        };
        let data;
        try {
            this._enableMediaPrint();
            data = await html2canvas(viewportElement, html2canvasOption);
        }
        finally {
            this._disableMediaPrint();
        }
        this._checkCanContinueToCanvas(pathname, editorMode);
        return data;
    }
    _drawEdgelessBackground(ctx, { size, backgroundColor, gridColor, }) {
        const svgImg = `<svg width='${ctx.canvas.width}px' height='${ctx.canvas.height}px' xmlns='http://www.w3.org/2000/svg' style='background-size:${size}px ${size}px;background-color:${backgroundColor}; background-image: radial-gradient(${gridColor} 1px, ${backgroundColor} 1px)'></svg>`;
        const img = new Image();
        const cleanup = () => {
            img.onload = null;
            img.onerror = null;
        };
        return new Promise((resolve, reject) => {
            img.onload = () => {
                cleanup();
                ctx.drawImage(img, 0, 0);
                resolve();
            };
            img.onerror = e => {
                cleanup();
                reject(e);
            };
            img.src = `data:image/svg+xml,${encodeURIComponent(svgImg)}`;
        });
    }
    _elementToSvgElement(node, width, height) {
        const xmlns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(xmlns, 'svg');
        const foreignObject = document.createElementNS(xmlns, 'foreignObject');
        svg.setAttribute('width', `${width}`);
        svg.setAttribute('height', `${height}`);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        foreignObject.setAttribute('width', '100%');
        foreignObject.setAttribute('height', '100%');
        foreignObject.setAttribute('x', '0');
        foreignObject.setAttribute('y', '0');
        foreignObject.setAttribute('externalResourcesRequired', 'true');
        svg.append(foreignObject);
        foreignObject.append(node);
        return svg;
    }
    _enableMediaPrint() {
        document.querySelectorAll('.media-print').forEach(mediaPrint => {
            mediaPrint.classList.remove('hide');
        });
    }
    async _html2canvas(htmlElement, options = {}) {
        const html2canvas = (await import('html2canvas'))
            .default;
        const html2canvasOption = {
            ignoreElements: function (element) {
                if (CANVAS_EXPORT_IGNORE_TAGS.includes(element.tagName) ||
                    element.classList.contains('dg')) {
                    return true;
                }
                else {
                    return false;
                }
            },
            onclone: async (documentClone, element) => {
                // html2canvas can't support transform feature
                element.style.setProperty('transform', 'none');
                const layer = element.classList.contains('.affine-edgeless-layer')
                    ? element
                    : null;
                if (layer instanceof HTMLElement) {
                    layer.style.setProperty('transform', 'none');
                }
                const boxShadowEles = documentClone.querySelectorAll("[style*='box-shadow']");
                boxShadowEles.forEach(function (element) {
                    if (element instanceof HTMLElement) {
                        element.style.setProperty('box-shadow', 'none');
                    }
                });
                this._replaceRichTextWithSvgElement(element);
                await this.replaceImgSrcWithSvg(element);
            },
            useCORS: this._exportOptions.imageProxyEndpoint ? false : true,
            proxy: this._exportOptions.imageProxyEndpoint,
        };
        let data;
        try {
            this._enableMediaPrint();
            data = await html2canvas(htmlElement, Object.assign(html2canvasOption, options));
        }
        finally {
            this._disableMediaPrint();
        }
        return data;
    }
    async _toCanvas() {
        try {
            await this._checkReady();
        }
        catch (e) {
            console.error('Failed to export to canvas');
            console.error(e);
            return;
        }
        if (isInsidePageEditor(this.editorHost)) {
            return this._docToCanvas();
        }
        else {
            const rootModel = this.doc.root;
            if (!rootModel)
                return;
            const edgeless = getBlockComponentByModel(this.editorHost, rootModel);
            const bound = edgeless.gfx.elementsBound;
            return this.edgelessToCanvas(edgeless.surface.renderer, bound, edgeless);
        }
    }
    // TODO: refactor of this part
    async edgelessToCanvas(surfaceRenderer, bound, edgeless, nodes, surfaces, edgelessBackground) {
        const rootModel = this.doc.root;
        if (!rootModel)
            return;
        const pathname = location.pathname;
        const editorMode = isInsidePageEditor(this.editorHost);
        const rootComponent = getRootByEditorHost(this.editorHost);
        if (!rootComponent)
            return;
        const viewportElement = rootComponent.viewportElement;
        if (!viewportElement)
            return;
        const containerComputedStyle = window.getComputedStyle(viewportElement);
        const html2canvas = (element) => this._html2canvas(element, {
            backgroundColor: containerComputedStyle.backgroundColor,
        });
        const container = rootComponent.querySelector('.affine-block-children-container');
        if (!container)
            return;
        const { ctx, canvas } = this._createCanvas(bound, window.getComputedStyle(container).backgroundColor);
        if (edgelessBackground) {
            await this._drawEdgelessBackground(ctx, {
                backgroundColor: containerComputedStyle.getPropertyValue('--affine-background-primary-color'),
                size: getBackgroundGrid(edgelessBackground.zoom, true).gap,
                gridColor: containerComputedStyle.getPropertyValue('--affine-edgeless-grid-color'),
            });
        }
        const blocks = nodes ??
            edgeless?.service.gfx.getElementsByBound(bound, { type: 'block' }) ??
            [];
        for (const block of blocks) {
            if (matchFlavours(block, ['affine:image'])) {
                if (!block.sourceId)
                    return;
                const blob = await block.doc.blobSync.get(block.sourceId);
                if (!blob)
                    return;
                const blobToImage = (blob) => new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                    img.src = URL.createObjectURL(blob);
                });
                const blockBound = xywhArrayToObject(block);
                ctx.drawImage(await blobToImage(blob), blockBound.x - bound.x, blockBound.y - bound.y, blockBound.w, blockBound.h);
            }
            const blockComponent = this.editorHost.view.getBlock(block.id);
            if (blockComponent) {
                const blockBound = xywhArrayToObject(block);
                const canvasData = await this._html2canvas(blockComponent);
                ctx.drawImage(canvasData, blockBound.x - bound.x + 50, blockBound.y - bound.y + 50, blockBound.w, blockBound.h);
            }
            if (matchFlavours(block, ['affine:frame'])) {
                // TODO(@L-Sun): use children of frame instead of bound
                const blocksInsideFrame = getBlocksInFrameBound(this.doc, block, false);
                const frameBound = Bound.deserialize(block.xywh);
                for (let i = 0; i < blocksInsideFrame.length; i++) {
                    const element = blocksInsideFrame[i];
                    const htmlElement = this.editorHost.view.getBlock(block.id);
                    const blockBound = xywhArrayToObject(element);
                    const canvasData = await html2canvas(htmlElement);
                    ctx.drawImage(canvasData, blockBound.x - bound.x + 50, blockBound.y - bound.y + 50, blockBound.w, (blockBound.w / canvasData.width) * canvasData.height);
                }
                const surfaceCanvas = surfaceRenderer.getCanvasByBound(frameBound);
                ctx.drawImage(surfaceCanvas, 50, 50, frameBound.w, frameBound.h);
            }
            this._checkCanContinueToCanvas(pathname, editorMode);
        }
        if (surfaces?.length) {
            const surfaceElements = surfaces.flatMap(element => element instanceof GroupElementModel
                ? element.childElements.filter(el => el instanceof SurfaceElementModel)
                : element);
            const surfaceCanvas = surfaceRenderer.getCanvasByBound(bound, surfaceElements);
            ctx.drawImage(surfaceCanvas, 50, 50, bound.w, bound.h);
        }
        return canvas;
    }
    async exportPdf() {
        const rootModel = this.doc.root;
        if (!rootModel)
            return;
        const canvasImage = await this._toCanvas();
        if (!canvasImage) {
            return;
        }
        const PDFLib = await import('pdf-lib');
        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([canvasImage.width, canvasImage.height]);
        const imageEmbed = await pdfDoc.embedPng(canvasImage.toDataURL('PNG'));
        const { width, height } = imageEmbed.scale(1);
        page.drawImage(imageEmbed, {
            x: 0,
            y: 0,
            width,
            height,
        });
        const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true });
        FileExporter.exportFile(rootModel.title.toString() + '.pdf', pdfBase64);
    }
    async exportPng() {
        const rootModel = this.doc.root;
        if (!rootModel)
            return;
        const canvasImage = await this._toCanvas();
        if (!canvasImage) {
            return;
        }
        FileExporter.exportPng(this.doc.root.title.toString(), canvasImage.toDataURL('image/png'));
    }
}
export const ExportManagerExtension = {
    setup: di => {
        di.add(ExportManager, [StdIdentifier]);
    },
};
//# sourceMappingURL=export-manager.js.map