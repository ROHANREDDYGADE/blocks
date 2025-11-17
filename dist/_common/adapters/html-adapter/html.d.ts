import type { ExtensionType } from '@blocksuite/block-std';
import { type BlockHtmlAdapterMatcher, HtmlDeltaConverter } from '@blocksuite/affine-shared/adapters';
import { type AssetsManager, BaseAdapter, type BlockSnapshot, type DocSnapshot, type FromBlockSnapshotPayload, type FromBlockSnapshotResult, type FromDocSnapshotPayload, type FromDocSnapshotResult, type FromSliceSnapshotPayload, type FromSliceSnapshotResult, type Job, type SliceSnapshot, type ToBlockSnapshotPayload, type ToDocSnapshotPayload } from '@blocksuite/store';
export type Html = string;
type HtmlToSliceSnapshotPayload = {
    file: Html;
    assets?: AssetsManager;
    blockVersions: Record<string, number>;
    workspaceId: string;
    pageId: string;
};
export declare class HtmlAdapter extends BaseAdapter<Html> {
    readonly blockMatchers: BlockHtmlAdapterMatcher[];
    private _astToHtml;
    private _traverseHtml;
    private _traverseSnapshot;
    deltaConverter: HtmlDeltaConverter;
    constructor(job: Job, blockMatchers?: BlockHtmlAdapterMatcher[]);
    private _htmlToAst;
    fromBlockSnapshot(payload: FromBlockSnapshotPayload): Promise<FromBlockSnapshotResult<string>>;
    fromDocSnapshot(payload: FromDocSnapshotPayload): Promise<FromDocSnapshotResult<string>>;
    fromSliceSnapshot(payload: FromSliceSnapshotPayload): Promise<FromSliceSnapshotResult<string>>;
    toBlockSnapshot(payload: ToBlockSnapshotPayload<string>): Promise<BlockSnapshot>;
    toDocSnapshot(payload: ToDocSnapshotPayload<string>): Promise<DocSnapshot>;
    toSliceSnapshot(payload: HtmlToSliceSnapshotPayload): Promise<SliceSnapshot | null>;
}
export declare const HtmlAdapterFactoryIdentifier: import("@blocksuite/global/di").ServiceIdentifier<import("../type.js").AdapterFactory>;
export declare const HtmlAdapterFactoryExtension: ExtensionType;
export {};
//# sourceMappingURL=html.d.ts.map