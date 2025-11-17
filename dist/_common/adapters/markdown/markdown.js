import { DEFAULT_NOTE_BACKGROUND_COLOR, NoteDisplayMode, } from '@blocksuite/affine-model';
import { BlockMarkdownAdapterMatcherIdentifier, MarkdownDeltaConverter, } from '@blocksuite/affine-shared/adapters';
import { ASTWalker, BaseAdapter, BlockSnapshotSchema, nanoid, } from '@blocksuite/store';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { AdapterFactoryIdentifier } from '../type.js';
import { defaultBlockMarkdownAdapterMatchers } from './block-matcher.js';
import { inlineDeltaToMarkdownAdapterMatchers } from './delta-converter/inline-delta.js';
import { markdownInlineToDeltaMatchers } from './delta-converter/markdown-inline.js';
import { remarkGfm } from './gfm.js';
export class MarkdownAdapter extends BaseAdapter {
    constructor(job, blockMatchers = defaultBlockMarkdownAdapterMatchers) {
        super(job);
        this.blockMatchers = blockMatchers;
        this._traverseMarkdown = (markdown, snapshot, assets) => {
            const walker = new ASTWalker();
            walker.setONodeTypeGuard((node) => !Array.isArray(node) &&
                'type' in node &&
                node.type !== undefined);
            walker.setEnter(async (o, context) => {
                for (const matcher of this.blockMatchers) {
                    if (matcher.toMatch(o)) {
                        const adapterContext = {
                            walker,
                            walkerContext: context,
                            configs: this.configs,
                            job: this.job,
                            deltaConverter: this.deltaConverter,
                            textBuffer: { content: '' },
                            assets,
                        };
                        await matcher.toBlockSnapshot.enter?.(o, adapterContext);
                    }
                }
            });
            walker.setLeave(async (o, context) => {
                for (const matcher of this.blockMatchers) {
                    if (matcher.toMatch(o)) {
                        const adapterContext = {
                            walker,
                            walkerContext: context,
                            configs: this.configs,
                            job: this.job,
                            deltaConverter: this.deltaConverter,
                            textBuffer: { content: '' },
                            assets,
                        };
                        await matcher.toBlockSnapshot.leave?.(o, adapterContext);
                    }
                }
            });
            return walker.walk(markdown, snapshot);
        };
        this._traverseSnapshot = async (snapshot, markdown, assets) => {
            const assetsIds = [];
            const walker = new ASTWalker();
            walker.setONodeTypeGuard((node) => BlockSnapshotSchema.safeParse(node).success);
            walker.setEnter(async (o, context) => {
                for (const matcher of this.blockMatchers) {
                    if (matcher.fromMatch(o)) {
                        const adapterContext = {
                            walker,
                            walkerContext: context,
                            configs: this.configs,
                            job: this.job,
                            deltaConverter: this.deltaConverter,
                            textBuffer: { content: '' },
                            assets,
                            updateAssetIds: (assetsId) => {
                                assetsIds.push(assetsId);
                            },
                        };
                        await matcher.fromBlockSnapshot.enter?.(o, adapterContext);
                    }
                }
            });
            walker.setLeave(async (o, context) => {
                for (const matcher of this.blockMatchers) {
                    if (matcher.fromMatch(o)) {
                        const adapterContext = {
                            walker,
                            walkerContext: context,
                            configs: this.configs,
                            job: this.job,
                            deltaConverter: this.deltaConverter,
                            textBuffer: { content: '' },
                            assets,
                        };
                        await matcher.fromBlockSnapshot.leave?.(o, adapterContext);
                    }
                }
            });
            return {
                ast: (await walker.walk(snapshot, markdown)),
                assetsIds,
            };
        };
        this.deltaConverter = new MarkdownDeltaConverter(job.adapterConfigs, inlineDeltaToMarkdownAdapterMatchers, markdownInlineToDeltaMatchers);
    }
    _astToMarkdown(ast) {
        return unified()
            .use(remarkGfm)
            .use(remarkStringify, {
            resourceLink: true,
        })
            .use(remarkMath)
            .stringify(ast)
            .replace(/&#x20;\n/g, ' \n');
    }
    _markdownToAst(markdown) {
        return unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkMath)
            .parse(markdown);
    }
    async fromBlockSnapshot({ snapshot, assets, }) {
        const root = {
            type: 'root',
            children: [],
        };
        const { ast, assetsIds } = await this._traverseSnapshot(snapshot, root, assets);
        return {
            file: this._astToMarkdown(ast),
            assetsIds,
        };
    }
    async fromDocSnapshot({ snapshot, assets, }) {
        let buffer = '';
        const { file, assetsIds } = await this.fromBlockSnapshot({
            snapshot: snapshot.blocks,
            assets,
        });
        buffer += file;
        return {
            file: buffer,
            assetsIds,
        };
    }
    async fromSliceSnapshot({ snapshot, assets, }) {
        let buffer = '';
        const sliceAssetsIds = [];
        for (const contentSlice of snapshot.content) {
            const root = {
                type: 'root',
                children: [],
            };
            const { ast, assetsIds } = await this._traverseSnapshot(contentSlice, root, assets);
            sliceAssetsIds.push(...assetsIds);
            buffer += this._astToMarkdown(ast);
        }
        const markdown = buffer.match(/\n/g)?.length === 1 ? buffer.trimEnd() : buffer;
        return {
            file: markdown,
            assetsIds: sliceAssetsIds,
        };
    }
    async toBlockSnapshot(payload) {
        const markdownAst = this._markdownToAst(payload.file);
        const blockSnapshotRoot = {
            type: 'block',
            id: nanoid(),
            flavour: 'affine:note',
            props: {
                xywh: '[0,0,800,95]',
                background: DEFAULT_NOTE_BACKGROUND_COLOR,
                index: 'a0',
                hidden: false,
                displayMode: NoteDisplayMode.DocAndEdgeless,
            },
            children: [],
        };
        return this._traverseMarkdown(markdownAst, blockSnapshotRoot, payload.assets);
    }
    async toDocSnapshot(payload) {
        const markdownAst = this._markdownToAst(payload.file);
        const blockSnapshotRoot = {
            type: 'block',
            id: nanoid(),
            flavour: 'affine:note',
            props: {
                xywh: '[0,0,800,95]',
                background: DEFAULT_NOTE_BACKGROUND_COLOR,
                index: 'a0',
                hidden: false,
                displayMode: NoteDisplayMode.DocAndEdgeless,
            },
            children: [],
        };
        return {
            type: 'page',
            meta: {
                id: nanoid(),
                title: 'Untitled',
                createDate: Date.now(),
                tags: [],
            },
            blocks: {
                type: 'block',
                id: nanoid(),
                flavour: 'affine:page',
                props: {
                    title: {
                        '$blocksuite:internal:text$': true,
                        delta: [
                            {
                                insert: 'Untitled',
                            },
                        ],
                    },
                },
                children: [
                    {
                        type: 'block',
                        id: nanoid(),
                        flavour: 'affine:surface',
                        props: {
                            elements: {},
                        },
                        children: [],
                    },
                    await this._traverseMarkdown(markdownAst, blockSnapshotRoot, payload.assets),
                ],
            },
        };
    }
    async toSliceSnapshot(payload) {
        let codeFence = '';
        payload.file = payload.file
            .split('\n')
            .map(line => {
            if (line.trimStart().startsWith('-')) {
                return line;
            }
            let trimmedLine = line.trimStart();
            if (!codeFence && trimmedLine.startsWith('```')) {
                codeFence = trimmedLine.substring(0, trimmedLine.lastIndexOf('```') + 3);
                if (codeFence.split('').every(c => c === '`')) {
                    return line;
                }
                codeFence = '';
            }
            if (!codeFence && trimmedLine.startsWith('~~~')) {
                codeFence = trimmedLine.substring(0, trimmedLine.lastIndexOf('~~~') + 3);
                if (codeFence.split('').every(c => c === '~')) {
                    return line;
                }
                codeFence = '';
            }
            if (!!codeFence &&
                trimmedLine.startsWith(codeFence) &&
                trimmedLine.lastIndexOf(codeFence) === 0) {
                codeFence = '';
            }
            if (codeFence) {
                return line;
            }
            trimmedLine = trimmedLine.trimEnd();
            if (!trimmedLine.startsWith('<') && !trimmedLine.endsWith('>')) {
                // check if it is a url link and wrap it with the angle brackets
                // sometimes the url includes emphasis `_` that will break URL parsing
                //
                // eg. /MuawcBMT1Mzvoar09-_66?mode=page&blockIds=rL2_GXbtLU2SsJVfCSmh_
                // https://www.markdownguide.org/basic-syntax/#urls-and-email-addresses
                try {
                    const valid = URL.canParse?.(trimmedLine) ?? Boolean(new URL(trimmedLine));
                    if (valid) {
                        return `<${trimmedLine}>`;
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
            return line.replace(/^ /, '&#x20;');
        })
            .join('\n');
        const markdownAst = this._markdownToAst(payload.file);
        const blockSnapshotRoot = {
            type: 'block',
            id: nanoid(),
            flavour: 'affine:note',
            props: {
                xywh: '[0,0,800,95]',
                background: DEFAULT_NOTE_BACKGROUND_COLOR,
                index: 'a0',
                hidden: false,
                displayMode: NoteDisplayMode.DocAndEdgeless,
            },
            children: [],
        };
        const contentSlice = (await this._traverseMarkdown(markdownAst, blockSnapshotRoot, payload.assets));
        if (contentSlice.children.length === 0) {
            return null;
        }
        return {
            type: 'slice',
            content: [contentSlice],
            workspaceId: payload.workspaceId,
            pageId: payload.pageId,
        };
    }
}
export const MarkdownAdapterFactoryIdentifier = AdapterFactoryIdentifier('Markdown');
export const MarkdownAdapterFactoryExtension = {
    setup: di => {
        di.addImpl(MarkdownAdapterFactoryIdentifier, provider => ({
            get: (job) => new MarkdownAdapter(job, Array.from(provider.getAll(BlockMarkdownAdapterMatcherIdentifier).values())),
        }));
    },
};
//# sourceMappingURL=markdown.js.map