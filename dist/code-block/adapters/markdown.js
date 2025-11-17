import { CodeBlockSchema } from '@blocksuite/affine-model';
import { BlockMarkdownAdapterExtension, } from '@blocksuite/affine-shared/adapters';
import { nanoid } from '@blocksuite/store';
const isCodeNode = (node) => node.type === 'code';
export const codeBlockMarkdownAdapterMatcher = {
    flavour: CodeBlockSchema.model.flavour,
    toMatch: o => isCodeNode(o.node),
    fromMatch: o => o.node.flavour === 'affine:code',
    toBlockSnapshot: {
        enter: (o, context) => {
            if (!isCodeNode(o.node)) {
                return;
            }
            const { walkerContext } = context;
            walkerContext
                .openNode({
                type: 'block',
                id: nanoid(),
                flavour: 'affine:code',
                props: {
                    language: o.node.lang ?? 'Plain Text',
                    text: {
                        '$blocksuite:internal:text$': true,
                        delta: [
                            {
                                insert: o.node.value,
                            },
                        ],
                    },
                },
                children: [],
            }, 'children')
                .closeNode();
        },
    },
    fromBlockSnapshot: {
        enter: (o, context) => {
            const text = (o.node.props.text ?? { delta: [] });
            const { walkerContext } = context;
            walkerContext
                .openNode({
                type: 'code',
                lang: o.node.props.language ?? null,
                meta: null,
                value: text.delta.map(delta => delta.insert).join(''),
            }, 'children')
                .closeNode();
        },
    },
};
export const CodeBlockMarkdownAdapterExtension = BlockMarkdownAdapterExtension(codeBlockMarkdownAdapterMatcher);
//# sourceMappingURL=markdown.js.map