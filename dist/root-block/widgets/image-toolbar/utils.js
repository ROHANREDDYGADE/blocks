import { getBlockProps, isInsidePageEditor, } from '@blocksuite/affine-shared/utils';
import { assertExists } from '@blocksuite/global/utils';
export function duplicate(block, abortController) {
    const model = block.model;
    const blockProps = getBlockProps(model);
    const { width, height, xywh, rotate, zIndex, ...duplicateProps } = blockProps;
    const { doc } = model;
    const parent = doc.getParent(model);
    assertExists(parent, 'Parent not found');
    const index = parent?.children.indexOf(model);
    const duplicateId = doc.addBlock(model.flavour, duplicateProps, parent, index + 1);
    abortController?.abort();
    const editorHost = block.host;
    editorHost.updateComplete
        .then(() => {
        const { selection } = editorHost;
        selection.setGroup('note', [
            selection.create('block', {
                blockId: duplicateId,
            }),
        ]);
        if (isInsidePageEditor(editorHost)) {
            const duplicateElement = editorHost.view.getBlock(duplicateId);
            if (duplicateElement) {
                duplicateElement.scrollIntoView(true);
            }
        }
    })
        .catch(console.error);
}
//# sourceMappingURL=utils.js.map