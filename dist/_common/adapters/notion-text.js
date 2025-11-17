import { DEFAULT_NOTE_BACKGROUND_COLOR } from '@blocksuite/affine-model';
import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';
import { BaseAdapter, nanoid, } from '@blocksuite/store';
import { AdapterFactoryIdentifier } from './type.js';
export class NotionTextAdapter extends BaseAdapter {
    fromBlockSnapshot() {
        throw new BlockSuiteError(ErrorCode.TransformerNotImplementedError, 'NotionTextAdapter.fromBlockSnapshot is not implemented.');
    }
    fromDocSnapshot() {
        throw new BlockSuiteError(ErrorCode.TransformerNotImplementedError, 'NotionTextAdapter.fromDocSnapshot is not implemented.');
    }
    fromSliceSnapshot() {
        return {
            file: JSON.stringify({
                blockType: 'text',
                editing: [
                    ['Notion Text is not supported to be exported from BlockSuite', []],
                ],
            }),
            assetsIds: [],
        };
    }
    toBlockSnapshot() {
        throw new BlockSuiteError(ErrorCode.TransformerNotImplementedError, 'NotionTextAdapter.toBlockSnapshot is not implemented.');
    }
    toDocSnapshot() {
        throw new BlockSuiteError(ErrorCode.TransformerNotImplementedError, 'NotionTextAdapter.toDocSnapshot is not implemented.');
    }
    toSliceSnapshot(payload) {
        const notionText = JSON.parse(payload.file);
        const content = [];
        const deltas = [];
        for (const editing of notionText.editing) {
            const delta = {
                insert: editing[0],
                attributes: Object.create(null),
            };
            for (const styleElement of editing[1]) {
                switch (styleElement[0]) {
                    case 'b':
                        delta.attributes.bold = true;
                        break;
                    case 'i':
                        delta.attributes.italic = true;
                        break;
                    case '_':
                        delta.attributes.underline = true;
                        break;
                    case 'c':
                        delta.attributes.code = true;
                        break;
                    case 's':
                        delta.attributes.strike = true;
                        break;
                }
            }
            deltas.push(delta);
        }
        content.push({
            type: 'block',
            id: nanoid(),
            flavour: 'affine:note',
            props: {
                xywh: '[0,0,800,95]',
                background: DEFAULT_NOTE_BACKGROUND_COLOR,
                index: 'a0',
                hidden: false,
                displayMode: 'both',
            },
            children: [
                {
                    type: 'block',
                    id: nanoid(),
                    flavour: 'affine:paragraph',
                    props: {
                        type: 'text',
                        text: {
                            '$blocksuite:internal:text$': true,
                            delta: deltas,
                        },
                    },
                    children: [],
                },
            ],
        });
        return {
            type: 'slice',
            content,
            workspaceId: payload.workspaceId,
            pageId: payload.pageId,
        };
    }
}
export const NotionTextAdapterFactoryIdentifier = AdapterFactoryIdentifier('NotionText');
export const NotionTextAdapterFactoryExtension = {
    setup: di => {
        di.addImpl(NotionTextAdapterFactoryIdentifier, () => ({
            get: (job) => new NotionTextAdapter(job),
        }));
    },
};
//# sourceMappingURL=notion-text.js.map