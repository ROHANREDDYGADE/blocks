import type { getImageSelectionsCommand } from '@blocksuite/affine-shared/commands';
import type { insertImagesCommand } from './commands/insert-images.js';
export declare function effects(): void;
declare global {
    namespace BlockSuite {
        interface CommandContext {
            insertedImageIds?: Promise<string[]>;
        }
        interface Commands {
            getImageSelections: typeof getImageSelectionsCommand;
            /**
             * open file dialog to insert images before or after the current block selection
             * @param removeEmptyLine remove the current block if it is empty
             * @param place where to insert the images
             * @returns a promise that resolves to the inserted image ids
             */
            insertImages: typeof insertImagesCommand;
        }
    }
}
//# sourceMappingURL=effects.d.ts.map