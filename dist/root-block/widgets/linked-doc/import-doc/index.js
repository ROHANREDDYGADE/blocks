import { ImportDoc, } from './import-doc.js';
export function showImportModal({ collection, onSuccess, onFail, container = document.body, abortController = new AbortController(), }) {
    const importDoc = new ImportDoc(collection, onSuccess, onFail, abortController);
    container.append(importDoc);
    abortController.signal.addEventListener('abort', () => importDoc.remove());
    return importDoc;
}
//# sourceMappingURL=index.js.map