import { DividerBlockSchema } from '@blocksuite/affine-model';
import { BlockMarkdownAdapterExtension, } from '@blocksuite/affine-shared/adapters';
import { nanoid } from '@blocksuite/store';
const isDividerNode = (node) => node.type === 'thematicBreak';
export const dividerBlockMarkdownAdapterMatcher = {
    flavour: DividerBlockSchema.model.flavour,
    toMatch: o => isDividerNode(o.node),
    fromMatch: o => o.node.flavour === DividerBlockSchema.model.flavour,
    toBlockSnapshot: {
        enter: (_, context) => {
            const { walkerContext } = context;
            walkerContext
                .openNode({
                type: 'block',
                id: nanoid(),
                flavour: 'affine:divider',
                props: {},
                children: [],
            }, 'children')
                .closeNode();
        },
    },
    fromBlockSnapshot: {
        enter: (_, context) => {
            const { walkerContext } = context;
            walkerContext
                .openNode({
                type: 'thematicBreak',
            }, 'children')
                .closeNode();
        },
    },
};
export const DividerBlockMarkdownAdapterExtension = BlockMarkdownAdapterExtension(dividerBlockMarkdownAdapterMatcher);
//# sourceMappingURL=markdown.js.map