import type { ExtensionType } from '@blocksuite/block-std';
import { type BlockMarkdownAdapterMatcher, type Markdown, MarkdownDeltaConverter } from '@blocksuite/affine-shared/adapters';
import { type AssetsManager, BaseAdapter, type BlockSnapshot, type DocSnapshot, type FromBlockSnapshotPayload, type FromBlockSnapshotResult, type FromDocSnapshotPayload, type FromDocSnapshotResult, type FromSliceSnapshotPayload, type FromSliceSnapshotResult, type Job, type SliceSnapshot, type ToBlockSnapshotPayload, type ToDocSnapshotPayload } from '@blocksuite/store';
type MarkdownToSliceSnapshotPayload = {
    file: Markdown;
    assets?: AssetsManager;
    workspaceId: string;
    pageId: string;
};
export declare class MarkdownAdapter extends BaseAdapter<Markdown> {
    readonly blockMatchers: BlockMarkdownAdapterMatcher[];
    private _traverseMarkdown;
    private _traverseSnapshot;
    deltaConverter: MarkdownDeltaConverter;
    constructor(job: Job, blockMatchers?: BlockMarkdownAdapterMatcher[]);
    private _astToMarkdown;
    private _markdownToAst;
    fromBlockSnapshot({ snapshot, assets, }: FromBlockSnapshotPayload): Promise<FromBlockSnapshotResult<Markdown>>;
    fromDocSnapshot({ snapshot, assets, }: FromDocSnapshotPayload): Promise<FromDocSnapshotResult<Markdown>>;
    fromSliceSnapshot({ snapshot, assets, }: FromSliceSnapshotPayload): Promise<FromSliceSnapshotResult<Markdown>>;
    toBlockSnapshot(payload: ToBlockSnapshotPayload<Markdown>): Promise<BlockSnapshot>;
    toDocSnapshot(payload: ToDocSnapshotPayload<Markdown>): Promise<DocSnapshot>;
    toSliceSnapshot(payload: MarkdownToSliceSnapshotPayload): Promise<SliceSnapshot | null>;
}
export declare const MarkdownAdapterFactoryIdentifier: import("@blocksuite/global/di").ServiceIdentifier<import("../type.js").AdapterFactory>;
export declare const MarkdownAdapterFactoryExtension: ExtensionType;
export {};
//# sourceMappingURL=markdown.d.ts.map