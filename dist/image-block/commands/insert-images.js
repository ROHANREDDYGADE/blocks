import { getImageFilesFromLocal } from '@blocksuite/affine-shared/utils';
import { addSiblingImageBlock } from '../utils.js';
export const insertImagesCommand = (ctx, next) => {
    const { selectedModels, place, removeEmptyLine, std } = ctx;
    if (!selectedModels)
        return;
    return next({
        insertedImageIds: getImageFilesFromLocal().then(imageFiles => {
            if (imageFiles.length === 0)
                return [];
            if (selectedModels.length === 0)
                return [];
            const targetModel = place === 'before'
                ? selectedModels[0]
                : selectedModels[selectedModels.length - 1];
            const imageService = std.getService('affine:image');
            if (!imageService)
                return [];
            const maxFileSize = imageService.maxFileSize;
            const result = addSiblingImageBlock(std.host, imageFiles, maxFileSize, targetModel, place);
            if (removeEmptyLine && targetModel.text?.length === 0) {
                std.doc.deleteBlock(targetModel);
            }
            return result ?? [];
        }),
    });
};
//# sourceMappingURL=insert-images.js.map