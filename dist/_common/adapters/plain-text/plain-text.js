import { DEFAULT_NOTE_BACKGROUND_COLOR, NoteDisplayMode, } from '@blocksuite/affine-model';
import { BlockPlainTextAdapterMatcherIdentifier, PlainTextDeltaConverter, } from '@blocksuite/affine-shared/adapters';
import { ASTWalker, BaseAdapter, BlockSnapshotSchema, nanoid, } from '@blocksuite/store';
import { AdapterFactoryIdentifier } from '../type.js';
import { defaultBlockPlainTextAdapterMatchers } from './block-matcher.js';
import { inlineDeltaToPlainTextAdapterMatchers } from './delta-converter/inline-delta.js';
export class PlainTextAdapter extends BaseAdapter {
    constructor(job, blockMatchers = defaultBlockPlainTextAdapterMatchers) {
        super(job);
        this.blockMatchers = blockMatchers;
        this.deltaConverter = new PlainTextDeltaConverter(job.adapterConfigs, inlineDeltaToPlainTextAdapterMatchers, []);
    }
    async _traverseSnapshot(snapshot) {
        const textBuffer = {
            content: '',
        };
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
                        textBuffer,
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
                        textBuffer,
                    };
                    await matcher.fromBlockSnapshot.leave?.(o, adapterContext);
                }
            }
        });
        await walker.walkONode(snapshot);
        return {
            plaintext: textBuffer.content,
        };
    }
    async fromBlockSnapshot({ snapshot, }) {
        const { plaintext } = await this._traverseSnapshot(snapshot);
        return {
            file: plaintext,
            assetsIds: [],
        };
    }
    async fromDocSnapshot({ snapshot, assets, }) {
        let buffer = '';
        if (snapshot.meta.title) {
            buffer += `${snapshot.meta.title}\n\n`;
        }
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
    async fromSliceSnapshot({ snapshot, }) {
        let buffer = '';
        const sliceAssetsIds = [];
        for (const contentSlice of snapshot.content) {
            const { plaintext } = await this._traverseSnapshot(contentSlice);
            buffer += plaintext;
        }
        const plaintext = buffer.match(/\n/g)?.length === 1 ? buffer.trimEnd() : buffer;
        return {
            file: plaintext,
            assetsIds: sliceAssetsIds,
        };
    }
    toBlockSnapshot(payload) {
        payload.file = payload.file.replaceAll('\r', '');
        return {
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
            children: payload.file.split('\n').map((line) => {
                return {
                    type: 'block',
                    id: nanoid(),
                    flavour: 'affine:paragraph',
                    props: {
                        type: 'text',
                        text: {
                            '$blocksuite:internal:text$': true,
                            delta: [
                                {
                                    insert: line,
                                },
                            ],
                        },
                    },
                    children: [],
                };
            }),
        };
    }
    toDocSnapshot(payload) {
        payload.file = payload.file.replaceAll('\r', '');
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
                    {
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
                        children: payload.file.split('\n').map((line) => {
                            return {
                                type: 'block',
                                id: nanoid(),
                                flavour: 'affine:paragraph',
                                props: {
                                    type: 'text',
                                    text: {
                                        '$blocksuite:internal:text$': true,
                                        delta: [
                                            {
                                                insert: line,
                                            },
                                        ],
                                    },
                                },
                                children: [],
                            };
                        }),
                    },
                ],
            },
        };
    }
    toSliceSnapshot(payload) {
        if (payload.file.trim().length === 0) {
            return null;
        }
        payload.file = payload.file.replaceAll('\r', '');
        const contentSlice = {
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
            children: payload.file.split('\n').map((line) => {
                return {
                    type: 'block',
                    id: nanoid(),
                    flavour: 'affine:paragraph',
                    props: {
                        type: 'text',
                        text: {
                            '$blocksuite:internal:text$': true,
                            delta: [
                                {
                                    insert: line,
                                },
                            ],
                        },
                    },
                    children: [],
                };
            }),
        };
        return {
            type: 'slice',
            content: [contentSlice],
            workspaceId: payload.workspaceId,
            pageId: payload.pageId,
        };
    }
}
export const PlainTextAdapterFactoryIdentifier = AdapterFactoryIdentifier('PlainText');
export const PlainTextAdapterFactoryExtension = {
    setup: di => {
        di.addImpl(PlainTextAdapterFactoryIdentifier, provider => ({
            get: (job) => new PlainTextAdapter(job, Array.from(provider.getAll(BlockPlainTextAdapterMatcherIdentifier).values())),
        }));
    },
};
//# sourceMappingURL=plain-text.js.map