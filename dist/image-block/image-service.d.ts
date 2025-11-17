import { BlockService } from '@blocksuite/block-std';
import { FileDropManager } from '../_common/components/file-drop-manager.js';
export declare class ImageBlockService extends BlockService {
    static readonly flavour: "affine:image";
    static setImageProxyURL: (url: string) => void;
    private _fileDropOptions;
    fileDropManager: FileDropManager;
    maxFileSize: number;
    mounted(): void;
}
export declare const ImageDragHandleOption: import("@blocksuite/block-std").ExtensionType;
//# sourceMappingURL=image-service.d.ts.map