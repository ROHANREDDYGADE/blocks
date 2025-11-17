import type { Doc, DocCollection } from '@blocksuite/store';
type ImportHTMLToDocOptions = {
    collection: DocCollection;
    html: string;
    fileName?: string;
};
type ImportHTMLZipOptions = {
    collection: DocCollection;
    imported: Blob;
};
/**
 * Exports a doc to HTML format.
 *
 * @param doc - The doc to be exported.
 * @returns A Promise that resolves when the export is complete.
 */
declare function exportDoc(doc: Doc): Promise<void>;
/**
 * Imports HTML content into a new doc within a collection.
 *
 * @param options - The import options.
 * @param options.collection - The target doc collection.
 * @param options.html - The HTML content to import.
 * @param options.fileName - Optional filename for the imported doc.
 * @returns A Promise that resolves to the ID of the newly created doc, or undefined if import fails.
 */
declare function importHTMLToDoc({ collection, html, fileName, }: ImportHTMLToDocOptions): Promise<string | undefined>;
/**
 * Imports a zip file containing HTML files and assets into a collection.
 *
 * @param options - The import options.
 * @param options.collection - The target doc collection.
 * @param options.imported - The zip file as a Blob.
 * @returns A Promise that resolves to an array of IDs of the newly created docs.
 */
declare function importHTMLZip({ collection, imported }: ImportHTMLZipOptions): Promise<string[]>;
export declare const HtmlTransformer: {
    exportDoc: typeof exportDoc;
    importHTMLToDoc: typeof importHTMLToDoc;
    importHTMLZip: typeof importHTMLZip;
};
export {};
//# sourceMappingURL=html.d.ts.map