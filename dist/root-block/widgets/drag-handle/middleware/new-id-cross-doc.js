export const newIdCrossDoc = (std) => ({ slots, collection }) => {
    let samePage = false;
    slots.beforeImport.on(payload => {
        if (payload.type === 'slice') {
            samePage = payload.snapshot.pageId === std.doc.id;
        }
        if (payload.type === 'block' && !samePage) {
            payload.snapshot.id = collection.idGenerator();
        }
    });
};
//# sourceMappingURL=new-id-cross-doc.js.map