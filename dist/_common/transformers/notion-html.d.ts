import { type DocCollection } from '@blocksuite/store';
type ImportNotionZipOptions = {
    collection: DocCollection;
    imported: Blob;
};
/**
 * Imports a Notion zip file into the BlockSuite collection.
 *
 * @param {ImportNotionZipOptions} options - The options for importing.
 * @param {DocCollection} options.collection - The BlockSuite document collection.
 * @param {Blob} options.imported - The imported zip file as a Blob.
 *
 * @returns {Promise<{entryId: string | undefined, pageIds: string[], isWorkspaceFile: boolean, hasMarkdown: boolean}>}
 *          A promise that resolves to an object containing:
 *          - entryId: The ID of the entry page (if any).
 *          - pageIds: An array of imported page IDs.
 *          - isWorkspaceFile: Whether the imported file is a workspace file.
 *          - hasMarkdown: Whether the zip contains markdown files.
 */
declare function importNotionZip({ collection, imported, }: ImportNotionZipOptions): Promise<{
    entryId: string;
    pageIds: string[];
    isWorkspaceFile: boolean;
    hasMarkdown: boolean;
}>;
export declare const NotionHtmlTransformer: {
    importNotionZip: typeof importNotionZip;
};
export {};
//# sourceMappingURL=notion-html.d.ts.map