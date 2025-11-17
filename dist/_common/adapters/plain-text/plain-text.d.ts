import type { ExtensionType } from '@blocksuite/block-std';
import { type BlockPlainTextAdapterMatcher, type PlainText, PlainTextDeltaConverter } from '@blocksuite/affine-shared/adapters';
import { type AssetsManager, BaseAdapter, type BlockSnapshot, type DocSnapshot, type FromBlockSnapshotPayload, type FromBlockSnapshotResult, type FromDocSnapshotPayload, type FromDocSnapshotResult, type FromSliceSnapshotPayload, type FromSliceSnapshotResult, type Job, type SliceSnapshot, type ToBlockSnapshotPayload, type ToDocSnapshotPayload } from '@blocksuite/store';
type PlainTextToSliceSnapshotPayload = {
    file: PlainText;
    assets?: AssetsManager;
    blockVersions: Record<string, number>;
    workspaceId: string;
    pageId: string;
};
export declare class PlainTextAdapter extends BaseAdapter<PlainText> {
    readonly blockMatchers: BlockPlainTextAdapterMatcher[];
    deltaConverter: PlainTextDeltaConverter;
    constructor(job: Job, blockMatchers?: BlockPlainTextAdapterMatcher[]);
    private _traverseSnapshot;
    fromBlockSnapshot({ snapshot, }: FromBlockSnapshotPayload): Promise<FromBlockSnapshotResult<PlainText>>;
    fromDocSnapshot({ snapshot, assets, }: FromDocSnapshotPayload): Promise<FromDocSnapshotResult<PlainText>>;
    fromSliceSnapshot({ snapshot, }: FromSliceSnapshotPayload): Promise<FromSliceSnapshotResult<PlainText>>;
    toBlockSnapshot(payload: ToBlockSnapshotPayload<PlainText>): BlockSnapshot;
    toDocSnapshot(payload: ToDocSnapshotPayload<PlainText>): DocSnapshot;
    toSliceSnapshot(payload: PlainTextToSliceSnapshotPayload): SliceSnapshot | null;
}
export declare const PlainTextAdapterFactoryIdentifier: import("@blocksuite/global/di").ServiceIdentifier<import("../type.js").AdapterFactory>;
export declare const PlainTextAdapterFactoryExtension: ExtensionType;
export {};
//# sourceMappingURL=plain-text.d.ts.map