import type { ImageBlockModel } from '@blocksuite/affine-model';
import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import type { ImageBlockFallbackCard } from './components/image-block-fallback.js';
import type { ImageBlockService } from './image-service.js';
export declare class ImageBlockComponent extends CaptionedBlockComponent<ImageBlockModel, ImageBlockService> {
    convertToCardView: () => void;
    copy: () => void;
    download: () => void;
    refreshData: () => void;
    get resizableImg(): HTMLElement | undefined;
    private _handleClick;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    renderBlock(): import("lit-html").TemplateResult<1>;
    updated(): void;
    accessor blob: Blob | undefined;
    accessor blobUrl: string | undefined;
    accessor blockContainerStyles: {
        margin: string;
    };
    accessor downloading: boolean;
    accessor error: boolean;
    accessor fallbackCard: ImageBlockFallbackCard | null;
    accessor lastSourceId: string;
    accessor loading: boolean;
    private accessor pageImage;
    accessor retryCount: number;
    accessor useCaptionEditor: boolean;
    accessor useZeroWidth: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-image': ImageBlockComponent;
    }
}
//# sourceMappingURL=image-block.d.ts.map