import { toast } from '@blocksuite/affine-components/toast';
import { downloadBlob, humanFileSize, withTempBlobData, } from '@blocksuite/affine-shared/utils';
import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';
import { readImageSize } from '../root-block/edgeless/components/utils.js';
import { transformModel } from '../root-block/utils/operations/model.js';
const MAX_RETRY_COUNT = 3;
const DEFAULT_ATTACHMENT_NAME = 'affine-attachment';
const imageUploads = new Set();
export function setImageUploading(blockId) {
    imageUploads.add(blockId);
}
export function setImageUploaded(blockId) {
    imageUploads.delete(blockId);
}
export function isImageUploading(blockId) {
    return imageUploads.has(blockId);
}
export async function uploadBlobForImage(editorHost, blockId, blob) {
    if (isImageUploading(blockId)) {
        console.error('The image is already uploading!');
        return;
    }
    setImageUploading(blockId);
    const doc = editorHost.doc;
    let sourceId;
    try {
        sourceId = await doc.blobSync.set(blob);
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            toast(editorHost, `Failed to upload image! ${error.message || error.toString()}`);
        }
    }
    finally {
        setImageUploaded(blockId);
        const imageModel = doc.getBlockById(blockId);
        doc.withoutTransact(() => {
            if (!imageModel) {
                return;
            }
            doc.updateBlock(imageModel, {
                sourceId,
            });
        });
    }
}
async function getImageBlob(model) {
    const sourceId = model.sourceId;
    if (!sourceId) {
        return null;
    }
    const doc = model.doc;
    const blob = await doc.blobSync.get(sourceId);
    if (!blob) {
        return null;
    }
    if (!blob.type) {
        const buffer = await blob.arrayBuffer();
        const FileType = await import('file-type');
        const fileType = await FileType.fileTypeFromBuffer(buffer);
        if (!fileType?.mime.startsWith('image/')) {
            return null;
        }
        return new Blob([buffer], { type: fileType.mime });
    }
    if (!blob.type.startsWith('image/')) {
        return null;
    }
    return blob;
}
export async function fetchImageBlob(block) {
    try {
        if (block.model.sourceId !== block.lastSourceId || !block.blobUrl) {
            block.loading = true;
            block.error = false;
            block.blob = undefined;
            if (block.blobUrl) {
                URL.revokeObjectURL(block.blobUrl);
                block.blobUrl = undefined;
            }
        }
        else if (block.blobUrl) {
            return;
        }
        const { model } = block;
        const { id, sourceId, doc } = model;
        if (isImageUploading(id)) {
            return;
        }
        if (!sourceId) {
            return;
        }
        const blob = await doc.blobSync.get(sourceId);
        if (!blob) {
            return;
        }
        block.loading = false;
        block.blob = blob;
        block.blobUrl = URL.createObjectURL(blob);
        block.lastSourceId = sourceId;
    }
    catch (error) {
        block.retryCount++;
        console.warn(`${error}, retrying`, block.retryCount);
        if (block.retryCount < MAX_RETRY_COUNT) {
            setTimeout(() => {
                fetchImageBlob(block).catch(console.error);
                // 1s, 2s, 3s
            }, 1000 * block.retryCount);
        }
        else {
            block.loading = false;
            block.error = true;
        }
    }
}
export async function downloadImageBlob(block) {
    const { host, downloading } = block;
    if (downloading) {
        toast(host, 'Download in progress...');
        return;
    }
    block.downloading = true;
    const blob = await getImageBlob(block.model);
    if (!blob) {
        toast(host, `Unable to download image!`);
        return;
    }
    toast(host, `Downloading image...`);
    downloadBlob(blob, 'image');
    block.downloading = false;
}
export async function resetImageSize(block) {
    const { blob, model } = block;
    if (!blob) {
        return;
    }
    const file = new File([blob], 'image.png', { type: blob.type });
    const size = await readImageSize(file);
    block.doc.updateBlock(model, {
        width: size.width,
        height: size.height,
    });
}
function convertToString(blob) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('load', _ => resolve(reader.result));
        reader.addEventListener('error', () => resolve(null));
        reader.readAsDataURL(blob);
    });
}
function convertToPng(blob) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('load', _ => {
            const img = new Image();
            img.onload = () => {
                const c = document.createElement('canvas');
                c.width = img.width;
                c.height = img.height;
                const ctx = c.getContext('2d');
                if (!ctx)
                    return;
                ctx.drawImage(img, 0, 0);
                c.toBlob(resolve, 'image/png');
            };
            img.onerror = () => resolve(null);
            img.src = reader.result;
        });
        reader.addEventListener('error', () => resolve(null));
        reader.readAsDataURL(blob);
    });
}
export async function copyImageBlob(block) {
    const { host, model } = block;
    let blob = await getImageBlob(model);
    if (!blob) {
        console.error('Failed to get image blob');
        return;
    }
    try {
        // @ts-ignore
        if (window.apis?.clipboard?.copyAsImageFromString) {
            const dataURL = await convertToString(blob);
            if (!dataURL)
                throw new BlockSuiteError(ErrorCode.DefaultRuntimeError, 'Cant convert a blob to data URL.');
            // @ts-ignore
            await window.apis.clipboard?.copyAsImageFromString(dataURL);
        }
        else {
            // DOMException: Type image/jpeg not supported on write.
            if (blob.type !== 'image/png') {
                const pngBlob = await convertToPng(blob);
                if (!pngBlob) {
                    console.error('Failed to convert blob to PNG');
                    return;
                }
                blob = pngBlob;
            }
            if (!globalThis.isSecureContext) {
                console.error('Clipboard API is not available in insecure context', blob.type, blob);
                return;
            }
            await navigator.clipboard.write([
                new ClipboardItem({ [blob.type]: blob }),
            ]);
        }
        toast(host, 'Copied image to clipboard');
    }
    catch (error) {
        console.error(error);
    }
}
export function shouldResizeImage(node, target) {
    return !!(target &&
        target instanceof HTMLElement &&
        node.contains(target) &&
        target.classList.contains('resize'));
}
export function addSiblingImageBlock(editorHost, files, maxFileSize, targetModel, place = 'after') {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (!imageFiles.length) {
        return;
    }
    const isSizeExceeded = imageFiles.some(file => file.size > maxFileSize);
    if (isSizeExceeded) {
        toast(editorHost, `You can only upload files less than ${humanFileSize(maxFileSize, true, 0)}`);
        return;
    }
    const imageBlockProps = imageFiles.map(file => ({
        flavour: 'affine:image',
        size: file.size,
    }));
    const doc = editorHost.doc;
    const blockIds = doc.addSiblingBlocks(targetModel, imageBlockProps, place);
    blockIds.map((blockId, index) => void uploadBlobForImage(editorHost, blockId, imageFiles[index]));
    return blockIds;
}
export function addImageBlocks(editorHost, files, maxFileSize, parent, parentIndex) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (!imageFiles.length) {
        return;
    }
    const isSizeExceeded = imageFiles.some(file => file.size > maxFileSize);
    if (isSizeExceeded) {
        toast(editorHost, `You can only upload files less than ${humanFileSize(maxFileSize, true, 0)}`);
        return;
    }
    const doc = editorHost.doc;
    const blockIds = imageFiles.map(file => doc.addBlock('affine:image', { size: file.size }, parent, parentIndex));
    blockIds.map((blockId, index) => void uploadBlobForImage(editorHost, blockId, imageFiles[index]));
    return blockIds;
}
/**
 * Turn the image block into a attachment block.
 */
export async function turnImageIntoCardView(block) {
    const doc = block.doc;
    if (!doc.schema.flavourSchemaMap.has('affine:attachment')) {
        console.error('The attachment flavour is not supported!');
        return;
    }
    const model = block.model;
    const sourceId = model.sourceId;
    const blob = await getImageBlob(model);
    if (!sourceId || !blob) {
        console.error('Image data not available');
        return;
    }
    const { saveImageData, getAttachmentData } = withTempBlobData();
    saveImageData(sourceId, { width: model.width, height: model.height });
    const attachmentConvertData = getAttachmentData(sourceId);
    const attachmentProp = {
        sourceId,
        name: DEFAULT_ATTACHMENT_NAME,
        size: blob.size,
        type: blob.type,
        caption: model.caption,
        ...attachmentConvertData,
    };
    transformModel(model, 'affine:attachment', attachmentProp);
}
//# sourceMappingURL=utils.js.map