import { LatexBlockSchema } from '@blocksuite/affine-model';
import { BlockMarkdownAdapterExtension, } from '@blocksuite/affine-shared/adapters';
import { nanoid } from '@blocksuite/store';
const isLatexNode = (node) => node.type === 'math';
export const latexBlockMarkdownAdapterMatcher = {
    flavour: LatexBlockSchema.model.flavour,
    toMatch: o => isLatexNode(o.node),
    fromMatch: o => o.node.flavour === LatexBlockSchema.model.flavour,
    toBlockSnapshot: {
        enter: (o, context) => {
            const latex = 'value' in o.node ? o.node.value : '';
            const { walkerContext } = context;
            walkerContext
                .openNode({
                type: 'block',
                id: nanoid(),
                flavour: 'affine:latex',
                props: {
                    latex,
                },
                children: [],
            }, 'children')
                .closeNode();
        },
    },
    fromBlockSnapshot: {
        enter: (o, context) => {
            const latex = 'latex' in o.node.props ? o.node.props.latex : '';
            const { walkerContext } = context;
            walkerContext
                .openNode({
                type: 'math',
                value: latex,
            }, 'children')
                .closeNode();
        },
    },
};
export const LatexBlockMarkdownAdapterExtension = BlockMarkdownAdapterExtension(latexBlockMarkdownAdapterMatcher);
//# sourceMappingURL=markdown.js.map