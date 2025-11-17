import { DEFAULT_NOTE_BACKGROUND_COLOR, NoteDisplayMode, } from '@blocksuite/affine-model';
import { BlockHtmlAdapterMatcherIdentifier, HastUtils, HtmlDeltaConverter, } from '@blocksuite/affine-shared/adapters';
import { ASTWalker, BaseAdapter, BlockSnapshotSchema, nanoid, } from '@blocksuite/store';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { AdapterFactoryIdentifier } from '../type.js';
import { defaultBlockHtmlAdapterMatchers } from './block-matcher.js';
import { htmlInlineToDeltaMatchers } from './delta-converter/html-inline.js';
import { inlineDeltaToHtmlAdapterMatchers } from './delta-converter/inline-delta.js';
export class HtmlAdapter extends BaseAdapter {
    constructor(job, blockMatchers = defaultBlockHtmlAdapterMatchers) {
        super(job);
        this.blockMatchers = blockMatchers;
        this._astToHtml = (ast) => {
            return unified().use(rehypeStringify).stringify(ast);
        };
        this._traverseHtml = async (html, snapshot, assets) => {
            const walker = new ASTWalker();
            walker.setONodeTypeGuard((node) => 'type' in node && node.type !== undefined);
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
            return walker.walk(html, snapshot);
        };
        this._traverseSnapshot = async (snapshot, html, assets) => {
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
                ast: (await walker.walk(snapshot, html)),
                assetsIds,
            };
        };
        this.deltaConverter = new HtmlDeltaConverter(job.adapterConfigs, inlineDeltaToHtmlAdapterMatchers, htmlInlineToDeltaMatchers);
    }
    _htmlToAst(html) {
        return unified().use(rehypeParse).parse(html);
    }
    async fromBlockSnapshot(payload) {
        const root = {
            type: 'root',
            children: [
                {
                    type: 'doctype',
                },
            ],
        };
        const { ast, assetsIds } = await this._traverseSnapshot(payload.snapshot, root, payload.assets);
        return {
            file: this._astToHtml(ast),
            assetsIds,
        };
    }
    async fromDocSnapshot(payload) {
        const { file, assetsIds } = await this.fromBlockSnapshot({
            snapshot: payload.snapshot.blocks,
            assets: payload.assets,
        });
        return {
            file: file.replace('<!--BlockSuiteDocTitlePlaceholder-->', `<h1>${payload.snapshot.meta.title}</h1>`),
            assetsIds,
        };
    }
    async fromSliceSnapshot(payload) {
        let buffer = '';
        const sliceAssetsIds = [];
        for (const contentSlice of payload.snapshot.content) {
            const root = {
                type: 'root',
                children: [],
            };
            const { ast, assetsIds } = await this._traverseSnapshot(contentSlice, root, payload.assets);
            sliceAssetsIds.push(...assetsIds);
            buffer += this._astToHtml(ast);
        }
        const html = buffer;
        return {
            file: html,
            assetsIds: sliceAssetsIds,
        };
    }
    toBlockSnapshot(payload) {
        const htmlAst = this._htmlToAst(payload.file);
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
        return this._traverseHtml(htmlAst, blockSnapshotRoot, payload.assets);
    }
    async toDocSnapshot(payload) {
        const htmlAst = this._htmlToAst(payload.file);
        const titleAst = HastUtils.querySelector(htmlAst, 'title');
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
                title: HastUtils.getTextContent(titleAst, 'Untitled'),
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
                        delta: this.deltaConverter.astToDelta(titleAst ?? {
                            type: 'text',
                            value: 'Untitled',
                        }),
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
                    await this._traverseHtml(htmlAst, blockSnapshotRoot, payload.assets),
                ],
            },
        };
    }
    async toSliceSnapshot(payload) {
        const htmlAst = this._htmlToAst(payload.file);
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
        const contentSlice = (await this._traverseHtml(htmlAst, blockSnapshotRoot, payload.assets));
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
export const HtmlAdapterFactoryIdentifier = AdapterFactoryIdentifier('Html');
export const HtmlAdapterFactoryExtension = {
    setup: di => {
        di.addImpl(HtmlAdapterFactoryIdentifier, provider => ({
            get: (job) => new HtmlAdapter(job, Array.from(provider.getAll(BlockHtmlAdapterMatcherIdentifier).values())),
        }));
    },
};
//# sourceMappingURL=html.js.map