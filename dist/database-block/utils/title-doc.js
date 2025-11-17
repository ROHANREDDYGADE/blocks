export const getSingleDocIdFromText = (text) => {
    const deltas = text?.deltas$.value;
    if (!deltas)
        return;
    let linkedDocId = undefined;
    for (const delta of deltas) {
        if (isLinkedDoc(delta)) {
            if (linkedDocId) {
                return;
            }
            linkedDocId = delta.attributes?.reference?.pageId;
        }
        else if (delta.insert) {
            return;
        }
    }
    return linkedDocId;
};
export const isLinkedDoc = (delta) => {
    const attributes = delta.attributes;
    return attributes?.reference?.type === 'LinkedPage';
};
export const isPureText = (text) => {
    const deltas = text?.deltas$.value;
    if (!deltas)
        return true;
    return deltas.every(v => !isLinkedDoc(v));
};
//# sourceMappingURL=title-doc.js.map