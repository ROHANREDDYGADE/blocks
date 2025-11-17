import type { DocCollection } from '@blocksuite/store';
import { ImportDoc, type OnFailHandler, type OnSuccessHandler } from './import-doc.js';
export declare function showImportModal({ collection, onSuccess, onFail, container, abortController, }: {
    collection: DocCollection;
    onSuccess?: OnSuccessHandler;
    onFail?: OnFailHandler;
    multiple?: boolean;
    container?: HTMLElement;
    abortController?: AbortController;
}): ImportDoc;
//# sourceMappingURL=index.d.ts.map