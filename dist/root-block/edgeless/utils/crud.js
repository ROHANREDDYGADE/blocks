import { EditPropsStore } from '@blocksuite/affine-shared/services';
import { GfxControllerIdentifier, } from '@blocksuite/block-std/gfx';
import { getLastPropsKey } from './get-last-props-key.js';
import { isConnectable, isNoteBlock } from './query.js';
/**
 * Use deleteElementsV2 instead.
 * @deprecated
 */
export function deleteElements(edgeless, elements) {
    const set = new Set(elements);
    const { service } = edgeless;
    elements.forEach(element => {
        if (isConnectable(element)) {
            const connectors = service.getConnectors(element);
            connectors.forEach(connector => set.add(connector));
        }
    });
    set.forEach(element => {
        if (isNoteBlock(element)) {
            const children = edgeless.doc.root?.children ?? [];
            // FIXME: should always keep at least 1 note
            if (children.length > 1) {
                edgeless.doc.deleteBlock(element);
            }
        }
        else {
            service.removeElement(element.id);
        }
    });
}
export function deleteElementsV2(gfx, elements) {
    const set = new Set(elements);
    elements.forEach(element => {
        if (isConnectable(element)) {
            const connectors = gfx.surface.getConnectors(element.id);
            connectors.forEach(connector => set.add(connector));
        }
    });
    set.forEach(element => {
        if (isNoteBlock(element)) {
            const children = gfx.doc.root?.children ?? [];
            if (children.length > 1) {
                gfx.doc.deleteBlock(element);
            }
        }
        else {
            gfx.deleteElement(element.id);
        }
    });
}
export function addBlock(std, flavour, props, parentId, parentIndex) {
    const gfx = std.get(GfxControllerIdentifier);
    const key = getLastPropsKey(flavour, props);
    if (key) {
        props = std.get(EditPropsStore).applyLastProps(key, props);
    }
    const nProps = {
        ...props,
        index: gfx.layer.generateIndex(),
    };
    return std.doc.addBlock(flavour, nProps, parentId, parentIndex);
}
//# sourceMappingURL=crud.js.map