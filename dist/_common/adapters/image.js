import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';
import { sha } from '@blocksuite/global/utils';
import { BaseAdapter, nanoid, } from '@blocksuite/store';
import { AdapterFactoryIdentifier } from './type.js';
export class ImageAdapter extends BaseAdapter {
    fromBlockSnapshot(_payload) {
        throw new BlockSuiteError(ErrorCode.TransformerNotImplementedError, 'ImageAdapter.fromBlockSnapshot is not implemented.');
    }
    fromDocSnapshot(_payload) {
        throw new BlockSuiteError(ErrorCode.TransformerNotImplementedError, 'ImageAdapter.fromDocSnapshot is not implemented.');
    }
    fromSliceSnapshot(payload) {
        const images = [];
        for (const contentSlice of payload.snapshot.content) {
            if (contentSlice.type === 'block') {
                const { flavour, props } = contentSlice;
                if (flavour === 'affine:image') {
                    const { sourceId } = props;
                    const file = payload.assets?.getAssets().get(sourceId);
                    if (file) {
                        images.push(file);
                    }
                }
            }
        }
        return Promise.resolve({ file: images, assetsIds: [] });
    }
    toBlockSnapshot(_payload) {
        throw new BlockSuiteError(ErrorCode.TransformerNotImplementedError, 'ImageAdapter.toBlockSnapshot is not implemented.');
    }
    toDocSnapshot(_payload) {
        throw new BlockSuiteError(ErrorCode.TransformerNotImplementedError, 'ImageAdapter.toDocSnapshot is not implemented');
    }
    async toSliceSnapshot(payload) {
        const content = [];
        for (const item of payload.file) {
            const blobId = await sha(await item.arrayBuffer());
            payload.assets?.getAssets().set(blobId, item);
            await payload.assets?.writeToBlob(blobId);
            content.push({
                type: 'block',
                flavour: 'affine:image',
                id: nanoid(),
                props: {
                    sourceId: blobId,
                },
                children: [],
            });
        }
        if (content.length === 0) {
            return null;
        }
        return {
            type: 'slice',
            content,
            workspaceId: payload.workspaceId,
            pageId: payload.pageId,
        };
    }
}
export const ImageAdapterFactoryIdentifier = AdapterFactoryIdentifier('Image');
export const ImageAdapterFactoryExtension = {
    setup: di => {
        di.addImpl(ImageAdapterFactoryIdentifier, () => ({
            get: (job) => new ImageAdapter(job),
        }));
    },
};
//# sourceMappingURL=image.js.map