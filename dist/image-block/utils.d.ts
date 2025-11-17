import type { EditorHost } from '@blocksuite/block-std';
import type { BlockModel } from '@blocksuite/store';
import type { ImageBlockComponent } from './image-block.js';
import type { ImageEdgelessBlockComponent } from './image-edgeless-block.js';
export declare function setImageUploading(blockId: string): void;
export declare function setImageUploaded(blockId: string): void;
export declare function isImageUploading(blockId: string): boolean;
export declare function uploadBlobForImage(editorHost: EditorHost, blockId: string, blob: Blob): Promise<void>;
export declare function fetchImageBlob(block: ImageBlockComponent | ImageEdgelessBlockComponent): Promise<void>;
export declare function downloadImageBlob(block: ImageBlockComponent | ImageEdgelessBlockComponent): Promise<void>;
export declare function resetImageSize(block: ImageBlockComponent | ImageEdgelessBlockComponent): Promise<void>;
export declare function copyImageBlob(block: ImageBlockComponent | ImageEdgelessBlockComponent): Promise<void>;
export declare function shouldResizeImage(node: Node, target: EventTarget | null): boolean;
export declare function addSiblingImageBlock(editorHost: EditorHost, files: File[], maxFileSize: number, targetModel: BlockModel, place?: 'after' | 'before'): string[] | undefined;
export declare function addImageBlocks(editorHost: EditorHost, files: File[], maxFileSize: number, parent?: BlockModel | string | null, parentIndex?: number): string[] | undefined;
/**
 * Turn the image block into a attachment block.
 */
export declare function turnImageIntoCardView(block: ImageBlockComponent | ImageEdgelessBlockComponent): Promise<void>;
//# sourceMappingURL=utils.d.ts.map