import { collapseWhiteSpace } from 'collapse-white-space';
const isElement = (ast) => {
    return ast.type === 'element';
};
const textLikeElementTags = ['span', 'bdi', 'bdo', 'ins'];
const listElementTags = ['ol', 'ul'];
const strongElementTags = ['strong', 'b'];
const italicElementTags = ['i', 'em'];
export const htmlTextToDeltaMatcher = {
    name: 'text',
    match: ast => ast.type === 'text',
    toDelta: (ast, context) => {
        if (!('value' in ast)) {
            return [];
        }
        const { options } = context;
        options.trim ??= true;
        if (options.pre) {
            return [{ insert: ast.value }];
        }
        const value = options.trim
            ? collapseWhiteSpace(ast.value, { trim: options.trim })
            : collapseWhiteSpace(ast.value);
        return value ? [{ insert: value }] : [];
    },
};
export const htmlTextLikeElementToDeltaMatcher = {
    name: 'text-like-element',
    match: ast => isElement(ast) && textLikeElementTags.includes(ast.tagName),
    toDelta: (ast, context) => {
        if (!isElement(ast)) {
            return [];
        }
        return ast.children.flatMap(child => context.toDelta(child, { trim: false }));
    },
};
export const htmlListToDeltaMatcher = {
    name: 'list-element',
    match: ast => isElement(ast) && listElementTags.includes(ast.tagName),
    toDelta: () => {
        return [];
    },
};
export const htmlStrongElementToDeltaMatcher = {
    name: 'strong-element',
    match: ast => isElement(ast) && strongElementTags.includes(ast.tagName),
    toDelta: (ast, context) => {
        if (!isElement(ast)) {
            return [];
        }
        return ast.children.flatMap(child => context.toDelta(child, { trim: false }).map(delta => {
            delta.attributes = { ...delta.attributes, bold: true };
            return delta;
        }));
    },
};
export const htmlItalicElementToDeltaMatcher = {
    name: 'italic-element',
    match: ast => isElement(ast) && italicElementTags.includes(ast.tagName),
    toDelta: (ast, context) => {
        if (!isElement(ast)) {
            return [];
        }
        return ast.children.flatMap(child => context.toDelta(child, { trim: false }).map(delta => {
            delta.attributes = { ...delta.attributes, italic: true };
            return delta;
        }));
    },
};
export const htmlCodeElementToDeltaMatcher = {
    name: 'code-element',
    match: ast => isElement(ast) && ast.tagName === 'code',
    toDelta: (ast, context) => {
        if (!isElement(ast)) {
            return [];
        }
        return ast.children.flatMap(child => context.toDelta(child, { trim: false }).map(delta => {
            delta.attributes = { ...delta.attributes, code: true };
            return delta;
        }));
    },
};
export const htmlDelElementToDeltaMatcher = {
    name: 'del-element',
    match: ast => isElement(ast) && ast.tagName === 'del',
    toDelta: (ast, context) => {
        if (!isElement(ast)) {
            return [];
        }
        return ast.children.flatMap(child => context.toDelta(child, { trim: false }).map(delta => {
            delta.attributes = { ...delta.attributes, strike: true };
            return delta;
        }));
    },
};
export const htmlUnderlineElementToDeltaMatcher = {
    name: 'underline-element',
    match: ast => isElement(ast) && ast.tagName === 'u',
    toDelta: (ast, context) => {
        if (!isElement(ast)) {
            return [];
        }
        return ast.children.flatMap(child => context.toDelta(child, { trim: false }).map(delta => {
            delta.attributes = { ...delta.attributes, underline: true };
            return delta;
        }));
    },
};
export const htmlLinkElementToDeltaMatcher = {
    name: 'link-element',
    match: ast => isElement(ast) && ast.tagName === 'a',
    toDelta: (ast, context) => {
        if (!isElement(ast)) {
            return [];
        }
        const href = ast.properties?.href;
        if (typeof href !== 'string') {
            return [];
        }
        const { configs } = context;
        const baseUrl = configs.get('docLinkBaseUrl') ?? '';
        if (baseUrl && href.startsWith(baseUrl)) {
            const path = href.substring(baseUrl.length);
            //    ^ - /{pageId}?mode={mode}&blockIds={blockIds}&elementIds={elementIds}
            const match = path.match(/^\/([^?]+)(\?.*)?$/);
            if (match) {
                const pageId = match?.[1];
                const search = match?.[2];
                const searchParams = search ? new URLSearchParams(search) : undefined;
                const mode = searchParams?.get('mode');
                const blockIds = searchParams?.get('blockIds')?.split(',');
                const elementIds = searchParams?.get('elementIds')?.split(',');
                return [
                    {
                        insert: ' ',
                        attributes: {
                            reference: {
                                type: 'LinkedPage',
                                pageId,
                                params: {
                                    mode: mode && ['edgeless', 'page'].includes(mode)
                                        ? mode
                                        : undefined,
                                    blockIds,
                                    elementIds,
                                },
                            },
                        },
                    },
                ];
            }
        }
        return ast.children.flatMap(child => context.toDelta(child, { trim: false }).map(delta => {
            if (href.startsWith('http')) {
                delta.attributes = {
                    ...delta.attributes,
                    link: href,
                };
                return delta;
            }
            return delta;
        }));
    },
};
export const htmlMarkElementToDeltaMatcher = {
    name: 'mark-element',
    match: ast => isElement(ast) && ast.tagName === 'mark',
    toDelta: (ast, context) => {
        if (!isElement(ast)) {
            return [];
        }
        return ast.children.flatMap(child => context.toDelta(child, { trim: false }).map(delta => {
            delta.attributes = { ...delta.attributes };
            return delta;
        }));
    },
};
export const htmlBrElementToDeltaMatcher = {
    name: 'br-element',
    match: ast => isElement(ast) && ast.tagName === 'br',
    toDelta: () => {
        return [{ insert: '\n' }];
    },
};
export const htmlInlineToDeltaMatchers = [
    htmlTextToDeltaMatcher,
    htmlTextLikeElementToDeltaMatcher,
    htmlStrongElementToDeltaMatcher,
    htmlItalicElementToDeltaMatcher,
    htmlCodeElementToDeltaMatcher,
    htmlDelElementToDeltaMatcher,
    htmlUnderlineElementToDeltaMatcher,
    htmlLinkElementToDeltaMatcher,
    htmlMarkElementToDeltaMatcher,
    htmlBrElementToDeltaMatcher,
];
//# sourceMappingURL=html-inline.js.map