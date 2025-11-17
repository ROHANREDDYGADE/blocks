import { DividerBlockSchema } from '@blocksuite/affine-model';
import { BlockPlainTextAdapterExtension, } from '@blocksuite/affine-shared/adapters';
export const dividerBlockPlainTextAdapterMatcher = {
    flavour: DividerBlockSchema.model.flavour,
    toMatch: () => false,
    fromMatch: o => o.node.flavour === DividerBlockSchema.model.flavour,
    toBlockSnapshot: {},
    fromBlockSnapshot: {
        enter: (_, context) => {
            context.textBuffer.content += '---\n';
        },
    },
};
export const DividerBlockPlainTextAdapterExtension = BlockPlainTextAdapterExtension(dividerBlockPlainTextAdapterMatcher);
//# sourceMappingURL=plain-text.js.map