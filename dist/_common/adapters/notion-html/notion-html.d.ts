import type { ExtensionType } from '@blocksuite/block-std';
import { type BlockNotionHtmlAdapterMatcher, type NotionHtml, NotionHtmlDeltaConverter } from '@blocksuite/affine-shared/adapters';
import { type AssetsManager, BaseAdapter, type BlockSnapshot, type DocSnapshot, type FromBlockSnapshotPayload, type FromBlockSnapshotResult, type FromDocSnapshotPayload, type FromDocSnapshotResult, type FromSliceSnapshotPayload, type FromSliceSnapshotResult, type Job, type SliceSnapshot } from '@blocksuite/store';
type NotionHtmlToSliceSnapshotPayload = {
    file: NotionHtml;
    assets?: AssetsManager;
    blockVersions: Record<string, number>;
    workspaceId: string;
    pageId: string;
};
type NotionHtmlToDocSnapshotPayload = {
    file: NotionHtml;
    assets?: AssetsManager;
    pageId?: string;
    pageMap?: Map<string, string>;
};
type NotionHtmlToBlockSnapshotPayload = NotionHtmlToDocSnapshotPayload;
export declare class NotionHtmlAdapter extends BaseAdapter<NotionHtml> {
    readonly blockMatchers: BlockNotionHtmlAdapterMatcher[];
    private _traverseNotionHtml;
    deltaConverter: NotionHtmlDeltaConverter;
    constructor(job: Job, blockMatchers?: BlockNotionHtmlAdapterMatcher[]);
    private _htmlToAst;
    fromBlockSnapshot(_payload: FromBlockSnapshotPayload): Promise<FromBlockSnapshotResult<NotionHtml>>;
    fromDocSnapshot(_payload: FromDocSnapshotPayload): Promise<FromDocSnapshotResult<NotionHtml>>;
    fromSliceSnapshot(_payload: FromSliceSnapshotPayload): Promise<FromSliceSnapshotResult<NotionHtml>>;
    toBlockSnapshot(payload: NotionHtmlToBlockSnapshotPayload): Promise<BlockSnapshot>;
    toDoc(payload: NotionHtmlToDocSnapshotPayload): Promise<import("@blocksuite/store").Doc | undefined>;
    toDocSnapshot(payload: NotionHtmlToDocSnapshotPayload): Promise<DocSnapshot>;
    toSliceSnapshot(payload: NotionHtmlToSliceSnapshotPayload): Promise<SliceSnapshot | null>;
}
export declare const NotionHtmlAdapterFactoryIdentifier: import("@blocksuite/global/di").ServiceIdentifier<import("../type.js").AdapterFactory>;
export declare const NotionHtmlAdapterFactoryExtension: ExtensionType;
export {};
//# sourceMappingURL=notion-html.d.ts.map