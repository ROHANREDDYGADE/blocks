import type { BlockCaptionEditor } from '@blocksuite/affine-components/caption';
import type { ImageBlockModel } from '@blocksuite/affine-model';
import { GfxBlockComponent } from '@blocksuite/block-std';
import type { ImageBlockFallbackCard } from './components/image-block-fallback.js';
import type { ImageBlockService } from './image-service.js';
export declare class ImageEdgelessBlockComponent extends GfxBlockComponent<ImageBlockModel, ImageBlockService> {
    static styles: import("lit").CSSResult;
    convertToCardView: () => void;
    copy: () => void;
    download: () => void;
    refreshData: () => void;
    private _handleError;
    connectedCallback(): void;
    disconnectedCallback(): void;
    renderGfxBlock(): import("lit-html").TemplateResult<1>;
    updated(): void;
    accessor blob: Blob | undefined;
    accessor blobUrl: string | undefined;
    accessor captionEditor: BlockCaptionEditor | null;
    accessor downloading: boolean;
    accessor error: boolean;
    accessor fallbackCard: ImageBlockFallbackCard | null;
    accessor lastSourceId: string;
    accessor loading: boolean;
    accessor resizableImg: HTMLDivElement;
    accessor retryCount: number;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-edgeless-image': ImageEdgelessBlockComponent;
    }
}
//# sourceMappingURL=image-edgeless-block.d.ts.map