import { CodeBlockSchema } from '@blocksuite/affine-model';
import { BlockPlainTextAdapterExtension, } from '@blocksuite/affine-shared/adapters';
export const codeBlockPlainTextAdapterMatcher = {
    flavour: CodeBlockSchema.model.flavour,
    toMatch: () => false,
    fromMatch: o => o.node.flavour === CodeBlockSchema.model.flavour,
    toBlockSnapshot: {},
    fromBlockSnapshot: {
        enter: (o, context) => {
            const text = (o.node.props.text ?? { delta: [] });
            const buffer = text.delta.map(delta => delta.insert).join('');
            context.textBuffer.content += buffer;
            context.textBuffer.content += '\n';
        },
    },
};
export const CodeBlockPlainTextAdapterExtension = BlockPlainTextAdapterExtension(codeBlockPlainTextAdapterMatcher);
//# sourceMappingURL=plain-text.js.map