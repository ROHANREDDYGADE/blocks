import { NoteDisplayMode } from '@blocksuite/affine-model';
import { DocModeProvider, NotificationProvider, } from '@blocksuite/affine-shared/services';
import { getBlockProps, matchFlavours } from '@blocksuite/affine-shared/utils';
import { assertExists } from '@blocksuite/global/utils';
import { Slice, } from '@blocksuite/store';
import { GfxBlockModel } from '../../root-block/edgeless/block-model.js';
import { getElementProps, mapFrameIds, sortEdgelessElements, } from '../../root-block/edgeless/utils/clone-utils.js';
import { isFrameBlock, isNoteBlock, } from '../../root-block/edgeless/utils/query.js';
import { getSurfaceBlock } from '../../surface-ref-block/utils.js';
export function promptDocTitle(host, autofill) {
    const notification = host.std.getOptional(NotificationProvider);
    if (!notification)
        return Promise.resolve(undefined);
    return notification.prompt({
        title: 'Create linked doc',
        message: 'Enter a title for the new doc.',
        placeholder: 'Untitled',
        autofill,
        confirmText: 'Confirm',
        cancelText: 'Cancel',
    });
}
export function getTitleFromSelectedModels(selectedModels) {
    const firstBlock = selectedModels[0];
    if (matchFlavours(firstBlock, ['affine:paragraph']) &&
        firstBlock.type.startsWith('h')) {
        return firstBlock.text.toString();
    }
    return undefined;
}
export function notifyDocCreated(host, doc) {
    const notification = host.std.getOptional(NotificationProvider);
    if (!notification)
        return;
    const abortController = new AbortController();
    const clear = () => {
        doc.history.off('stack-item-added', addHandler);
        doc.history.off('stack-item-popped', popHandler);
        disposable.dispose();
    };
    const closeNotify = () => {
        abortController.abort();
        clear();
    };
    // edit or undo or switch doc, close notify toast
    const addHandler = doc.history.on('stack-item-added', closeNotify);
    const popHandler = doc.history.on('stack-item-popped', closeNotify);
    const disposable = host.slots.unmounted.on(closeNotify);
    notification.notify({
        title: 'Linked doc created',
        message: 'You can click undo to recovery block content',
        accent: 'info',
        duration: 10 * 1000,
        action: {
            label: 'Undo',
            onClick: () => {
                doc.undo();
                clear();
            },
        },
        abort: abortController.signal,
        onClose: clear,
    });
}
export function addBlocksToDoc(targetDoc, model, parentId) {
    // Add current block to linked doc
    const blockProps = getBlockProps(model);
    const newModelId = targetDoc.addBlock(model.flavour, blockProps, parentId);
    // Add children to linked doc, parent is the new model
    const children = model.children;
    if (children.length > 0) {
        children.forEach(child => {
            addBlocksToDoc(targetDoc, child, newModelId);
        });
    }
}
export async function convertSelectedBlocksToLinkedDoc(std, doc, selectedModels, docTitle) {
    const models = await selectedModels;
    const slice = std.clipboard.sliceToSnapshot(Slice.fromModels(doc, models));
    if (!slice) {
        return;
    }
    const firstBlock = models[0];
    assertExists(firstBlock);
    // if title undefined, use the first heading block content as doc title
    const title = docTitle || getTitleFromSelectedModels(models);
    const linkedDoc = createLinkedDocFromSlice(std, doc, slice.content, title);
    // insert linked doc card
    doc.addSiblingBlocks(doc.getBlock(firstBlock.id).model, [
        {
            flavour: 'affine:embed-linked-doc',
            pageId: linkedDoc.id,
        },
    ], 'before');
    // delete selected elements
    models.forEach(model => doc.deleteBlock(model));
    return linkedDoc;
}
export function createLinkedDocFromSlice(std, doc, snapshots, docTitle) {
    // const modelsWithChildren = (list:BlockModel[]):BlockModel[]=>list.flatMap(model=>[model,...modelsWithChildren(model.children)])
    const linkedDoc = doc.collection.createDoc({});
    linkedDoc.load(() => {
        const rootId = linkedDoc.addBlock('affine:page', {
            title: new doc.Text(docTitle),
        });
        linkedDoc.addBlock('affine:surface', {}, rootId);
        const noteId = linkedDoc.addBlock('affine:note', {}, rootId);
        snapshots.forEach(snapshot => {
            std.clipboard
                .pasteBlockSnapshot(snapshot, linkedDoc, noteId)
                .catch(console.error);
        });
    });
    return linkedDoc;
}
export function createLinkedDocFromNote(doc, note, docTitle) {
    const linkedDoc = doc.collection.createDoc({});
    linkedDoc.load(() => {
        const rootId = linkedDoc.addBlock('affine:page', {
            title: new doc.Text(docTitle),
        });
        linkedDoc.addBlock('affine:surface', {}, rootId);
        const blockProps = getBlockProps(note);
        // keep note props & show in both mode
        const noteId = linkedDoc.addBlock('affine:note', {
            ...blockProps,
            hidden: false,
            displayMode: NoteDisplayMode.DocAndEdgeless,
        }, rootId);
        // Add note to linked doc recursively
        note.children.forEach(model => {
            addBlocksToDoc(linkedDoc, model, noteId);
        });
    });
    return linkedDoc;
}
export function createLinkedDocFromEdgelessElements(host, elements, docTitle) {
    const linkedDoc = host.doc.collection.createDoc({});
    linkedDoc.load(() => {
        const rootId = linkedDoc.addBlock('affine:page', {
            title: new host.doc.Text(docTitle),
        });
        const surfaceId = linkedDoc.addBlock('affine:surface', {}, rootId);
        const surface = getSurfaceBlock(linkedDoc);
        if (!surface)
            return;
        const sortedElements = sortEdgelessElements(elements);
        const ids = new Map();
        sortedElements.forEach(model => {
            let newId = model.id;
            if (model instanceof GfxBlockModel) {
                const blockProps = getBlockProps(model);
                if (isNoteBlock(model)) {
                    newId = linkedDoc.addBlock('affine:note', blockProps, rootId);
                    // Add note children to linked doc recursively
                    model.children.forEach(model => {
                        addBlocksToDoc(linkedDoc, model, newId);
                    });
                }
                else {
                    if (isFrameBlock(model)) {
                        mapFrameIds(blockProps, ids);
                    }
                    newId = linkedDoc.addBlock(model.flavour, blockProps, surfaceId);
                }
            }
            else {
                const props = getElementProps(model, ids);
                newId = surface.addElement(props);
            }
            ids.set(model.id, newId);
        });
    });
    host.std.get(DocModeProvider).setPrimaryMode('edgeless', linkedDoc.id);
    return linkedDoc;
}
//# sourceMappingURL=render-linked-doc.js.map