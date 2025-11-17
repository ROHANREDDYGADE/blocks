import type { BlockComponent } from '@blocksuite/block-std';
import { BlockService } from '@blocksuite/block-std';
import { FileDropManager } from '../_common/components/file-drop-manager.js';
export declare abstract class RootService extends BlockService {
    static readonly flavour: "affine:page";
    private _fileDropOptions;
    readonly fileDropManager: FileDropManager;
    transformers: {
        markdown: {
            exportDoc: (doc: import("@blocksuite/store").Doc) => Promise<void>;
            importMarkdownToBlock: ({ doc, markdown, blockId, }: {
                doc: import("@blocksuite/store").Doc;
                markdown: string;
                blockId: string;
            }) => Promise<void>;
            importMarkdownToDoc: ({ collection, markdown, fileName, }: {
                collection: import("@blocksuite/store").DocCollection;
                markdown: string;
                fileName?: string;
            }) => Promise<string | undefined>;
            importMarkdownZip: ({ collection, imported, }: {
                collection: import("@blocksuite/store").DocCollection;
                imported: Blob;
            }) => Promise<string[]>;
        };
        html: {
            exportDoc: (doc: import("@blocksuite/store").Doc) => Promise<void>;
            importHTMLToDoc: ({ collection, html, fileName, }: {
                collection: import("@blocksuite/store").DocCollection;
                html: string;
                fileName?: string;
            }) => Promise<string | undefined>;
            importHTMLZip: ({ collection, imported }: {
                collection: import("@blocksuite/store").DocCollection;
                imported: Blob;
            }) => Promise<string[]>;
        };
        zip: {
            exportDocs: (collection: import("@blocksuite/store").DocCollection, docs: import("@blocksuite/store").Doc[]) => Promise<void>;
            importDocs: (collection: import("@blocksuite/store").DocCollection, imported: Blob) => Promise<(import("@blocksuite/store").Doc | undefined)[]>;
        };
    };
    get selectedBlocks(): BlockComponent<import("@blocksuite/store").BlockModel<object, object & {}>, BlockService, string>[];
    get selectedModels(): import("@blocksuite/store").BlockModel<object, object & {}>[];
    get viewportElement(): HTMLElement | null;
    mounted(): void;
}
//# sourceMappingURL=root-service.d.ts.map