import { BlockService } from '@blocksuite/block-std';
import { FileDropManager } from '../_common/components/file-drop-manager.js';
export declare class AttachmentBlockService extends BlockService {
    static readonly flavour: "affine:attachment";
    private _fileDropOptions;
    fileDropManager: FileDropManager;
    maxFileSize: number;
    mounted(): void;
}
export declare const AttachmentDragHandleOption: import("@blocksuite/block-std").ExtensionType;
//# sourceMappingURL=attachment-service.d.ts.map