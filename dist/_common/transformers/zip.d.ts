import type { Doc, DocCollection } from '@blocksuite/store';
declare function exportDocs(collection: DocCollection, docs: Doc[]): Promise<void>;
declare function importDocs(collection: DocCollection, imported: Blob): Promise<(Doc | undefined)[]>;
export declare const ZipTransformer: {
    exportDocs: typeof exportDocs;
    importDocs: typeof importDocs;
};
export {};
//# sourceMappingURL=zip.d.ts.map