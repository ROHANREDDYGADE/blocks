import type { AttachmentBlockModel, AttachmentBlockProps } from '@blocksuite/affine-model';
import type { EditorHost } from '@blocksuite/block-std';
import type { BlockModel } from '@blocksuite/store';
import type { AttachmentBlockComponent } from './attachment-block.js';
export declare function cloneAttachmentProperties(model: AttachmentBlockModel): AttachmentBlockProps;
export declare function setAttachmentUploading(blockId: string): void;
export declare function setAttachmentUploaded(blockId: string): void;
/**
 * This function will not verify the size of the file.
 */
export declare function uploadAttachmentBlob(editorHost: EditorHost, blockId: string, blob: Blob, filetype: string, isEdgeless?: boolean): Promise<void>;
export declare function checkAttachmentBlob(block: AttachmentBlockComponent): Promise<void>;
/**
 * Since the size of the attachment may be very large,
 * the download process may take a long time!
 */
export declare function downloadAttachmentBlob(block: AttachmentBlockComponent): void;
export declare function getFileType(file: File): Promise<string>;
/**
 * Add a new attachment block before / after the specified block.
 */
export declare function addSiblingAttachmentBlocks(editorHost: EditorHost, files: File[], maxFileSize: number, targetModel: BlockModel, place?: 'before' | 'after'): Promise<string[] | undefined>;
//# sourceMappingURL=utils.d.ts.map