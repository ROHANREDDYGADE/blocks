export const selectBlock = (ctx, next) => {
    const { focusBlock, std } = ctx;
    if (!focusBlock) {
        return;
    }
    const { selection } = std;
    selection.setGroup('note', [
        selection.create('block', { blockId: focusBlock.blockId }),
    ]);
    return next();
};
//# sourceMappingURL=select-block.js.map