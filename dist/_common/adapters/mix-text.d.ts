import type { ExtensionType } from '@blocksuite/block-std';
import { type AssetsManager, BaseAdapter, type BlockSnapshot, type DocSnapshot, type FromBlockSnapshotPayload, type FromBlockSnapshotResult, type FromDocSnapshotPayload, type FromDocSnapshotResult, type FromSliceSnapshotPayload, type FromSliceSnapshotResult, type Job, type SliceSnapshot, type ToBlockSnapshotPayload, type ToDocSnapshotPayload } from '@blocksuite/store';
export type MixText = string;
type MixTextToSliceSnapshotPayload = {
    file: MixText;
    assets?: AssetsManager;
    blockVersions: Record<string, number>;
    workspaceId: string;
    pageId: string;
};
export declare class MixTextAdapter extends BaseAdapter<MixText> {
    private _markdownAdapter;
    constructor(job: Job);
    private _splitDeltas;
    private _traverseSnapshot;
    fromBlockSnapshot({ snapshot, }: FromBlockSnapshotPayload): Promise<FromBlockSnapshotResult<MixText>>;
    fromDocSnapshot({ snapshot, assets, }: FromDocSnapshotPayload): Promise<FromDocSnapshotResult<MixText>>;
    fromSliceSnapshot({ snapshot, }: FromSliceSnapshotPayload): Promise<FromSliceSnapshotResult<MixText>>;
    toBlockSnapshot(payload: ToBlockSnapshotPayload<MixText>): BlockSnapshot;
    toDocSnapshot(payload: ToDocSnapshotPayload<MixText>): DocSnapshot;
    toSliceSnapshot(payload: MixTextToSliceSnapshotPayload): Promise<SliceSnapshot | null>;
}
export declare const MixTextAdapterFactoryIdentifier: import("@blocksuite/global/di").ServiceIdentifier<import("./type.js").AdapterFactory>;
export declare const MixTextAdapterFactoryExtension: ExtensionType;
export {};
//# sourceMappingURL=mix-text.d.ts.map