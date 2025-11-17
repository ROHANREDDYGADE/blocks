import { LatexBlockSchema } from '@blocksuite/affine-model';
import { BlockPlainTextAdapterExtension, } from '@blocksuite/affine-shared/adapters';
const latexPrefix = 'LaTex, with value: ';
export const latexBlockPlainTextAdapterMatcher = {
    flavour: LatexBlockSchema.model.flavour,
    toMatch: () => false,
    fromMatch: o => o.node.flavour === LatexBlockSchema.model.flavour,
    toBlockSnapshot: {},
    fromBlockSnapshot: {
        enter: (o, context) => {
            const latex = 'latex' in o.node.props ? o.node.props.latex : '';
            const { textBuffer } = context;
            if (latex) {
                textBuffer.content += `${latexPrefix}${latex}`;
                textBuffer.content += '\n';
            }
        },
    },
};
export const LatexBlockPlainTextAdapterExtension = BlockPlainTextAdapterExtension(latexBlockPlainTextAdapterMatcher);
//# sourceMappingURL=plain-text.js.map