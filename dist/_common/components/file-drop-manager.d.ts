import type { BlockService, EditorHost } from '@blocksuite/block-std';
import type { IVec } from '@blocksuite/global/utils';
import type { BlockModel } from '@blocksuite/store';
export type onDropProps = {
    files: File[];
    targetModel: BlockModel | null;
    place: 'before' | 'after';
    point: IVec;
};
export type FileDropOptions = {
    flavour: string;
    onDrop?: ({ files, targetModel, place, point, }: onDropProps) => Promise<boolean> | void;
};
export declare class FileDropManager {
    private static _dropResult;
    private _blockService;
    private _fileDropOptions;
    private _indicator;
    private _onDrop;
    onDragLeave: () => void;
    onDragOver: (event: DragEvent) => void;
    get doc(): import("@blocksuite/store").Doc;
    get editorHost(): EditorHost;
    get targetModel(): BlockModel | null;
    get type(): 'before' | 'after';
    constructor(blockService: BlockService, fileDropOptions: FileDropOptions);
}
//# sourceMappingURL=file-drop-manager.d.ts.map