export const focusBlockEnd = (ctx, next) => {
    const { focusBlock, std } = ctx;
    if (!focusBlock || !focusBlock.model.text)
        return;
    const { selection } = std;
    selection.setGroup('note', [
        selection.create('text', {
            from: {
                blockId: focusBlock.blockId,
                index: focusBlock.model.text.length,
                length: 0,
            },
            to: null,
        }),
    ]);
    return next();
};
//# sourceMappingURL=focus-block-end.js.map