import { matchFlavours } from '@blocksuite/affine-shared/utils';
export const dedentBlockToRoot = (ctx, next) => {
    let { blockId } = ctx;
    const { std, stopCapture = true } = ctx;
    const { doc } = std;
    if (!blockId) {
        const sel = std.selection.getGroup('note').at(0);
        blockId = sel?.blockId;
    }
    if (!blockId)
        return;
    const model = std.doc.getBlock(blockId)?.model;
    if (!model)
        return;
    let parent = doc.getParent(model);
    let changed = false;
    while (parent && !matchFlavours(parent, ['affine:note'])) {
        if (!changed) {
            if (stopCapture)
                doc.captureSync();
            changed = true;
        }
        std.command.exec('dedentBlock', { blockId: model.id, stopCapture: true });
        parent = doc.getParent(model);
    }
    if (!changed) {
        return;
    }
    return next();
};
//# sourceMappingURL=dedent-block-to-root.js.map