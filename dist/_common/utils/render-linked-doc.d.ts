import type { NoteBlockModel } from '@blocksuite/affine-model';
import type { EditorHost } from '@blocksuite/block-std';
import { type BlockModel, type BlockSnapshot, type Doc, type DraftModel } from '@blocksuite/store';
export declare function promptDocTitle(host: EditorHost, autofill?: string): Promise<string | null> | Promise<undefined>;
export declare function getTitleFromSelectedModels(selectedModels: DraftModel[]): string | undefined;
export declare function notifyDocCreated(host: EditorHost, doc: Doc): void;
export declare function addBlocksToDoc(targetDoc: Doc, model: BlockModel, parentId: string): void;
export declare function convertSelectedBlocksToLinkedDoc(std: BlockSuite.Std, doc: Doc, selectedModels: DraftModel[] | Promise<DraftModel[]>, docTitle?: string): Promise<Doc | undefined>;
export declare function createLinkedDocFromSlice(std: BlockSuite.Std, doc: Doc, snapshots: BlockSnapshot[], docTitle?: string): Doc;
export declare function createLinkedDocFromNote(doc: Doc, note: NoteBlockModel, docTitle?: string): Doc;
export declare function createLinkedDocFromEdgelessElements(host: EditorHost, elements: BlockSuite.EdgelessModel[], docTitle?: string): Doc;
//# sourceMappingURL=render-linked-doc.d.ts.map