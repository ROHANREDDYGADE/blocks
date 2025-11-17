import type { NoteChildrenFlavour } from '@blocksuite/affine-shared/types';
import type { BlockStdScope } from '@blocksuite/block-std';
import { type IPoint, type IVec, Point } from '@blocksuite/global/utils';
export declare function addAttachments(std: BlockStdScope, files: File[], point?: IVec): Promise<string[]>;
export declare function addImages(std: BlockStdScope, files: File[], point?: IVec): Promise<string[]>;
export declare function addNoteAtPoint(std: BlockStdScope, 
/**
 * The point is in browser coordinate
 */
point: IPoint, options?: {
    width?: number;
    height?: number;
    parentId?: string;
    noteIndex?: number;
    offsetX?: number;
    offsetY?: number;
    scale?: number;
}): string;
type NoteOptions = {
    childFlavour: NoteChildrenFlavour;
    childType: string | null;
    collapse: boolean;
};
export declare function addNote(std: BlockStdScope, point: Point, options: NoteOptions, width?: number, height?: number): void;
export {};
//# sourceMappingURL=common.d.ts.map