import { GroupElementModel } from '@blocksuite/affine-model';
export function getElementsWithoutGroup(elements) {
    const set = new Set();
    elements.forEach(element => {
        if (element instanceof GroupElementModel) {
            element.descendantElements
                .filter(descendant => !(descendant instanceof GroupElementModel))
                .forEach(descendant => set.add(descendant));
        }
        else {
            set.add(element);
        }
    });
    return Array.from(set);
}
//# sourceMappingURL=group.js.map