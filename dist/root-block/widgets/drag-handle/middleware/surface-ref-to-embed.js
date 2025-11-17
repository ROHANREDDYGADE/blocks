export const surfaceRefToEmbed = (std) => ({ slots, collection }) => {
    let pageId = null;
    slots.beforeImport.on(payload => {
        if (payload.type === 'slice') {
            pageId = payload.snapshot.pageId;
        }
    });
    slots.beforeImport.on(payload => {
        if (pageId &&
            payload.type === 'block' &&
            payload.snapshot.flavour === 'affine:surface-ref' &&
            !std.doc.hasBlock(payload.snapshot.id)) {
            const id = payload.snapshot.id;
            payload.snapshot.id = collection.idGenerator();
            payload.snapshot.flavour = 'affine:embed-linked-doc';
            payload.snapshot.props = {
                blockId: id,
                pageId,
            };
        }
    });
};
//# sourceMappingURL=surface-ref-to-embed.js.map