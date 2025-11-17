import type { ExtensionType } from '@blocksuite/block-std';
import { type AssetsManager, BaseAdapter, type BlockSnapshot, type DocSnapshot, type FromBlockSnapshotPayload, type FromBlockSnapshotResult, type FromDocSnapshotPayload, type FromDocSnapshotResult, type FromSliceSnapshotPayload, type FromSliceSnapshotResult, type SliceSnapshot, type ToBlockSnapshotPayload, type ToDocSnapshotPayload } from '@blocksuite/store';
export type Attachment = File[];
type AttachmentToSliceSnapshotPayload = {
    file: Attachment;
    assets?: AssetsManager;
    blockVersions: Record<string, number>;
    workspaceId: string;
    pageId: string;
};
export declare class AttachmentAdapter extends BaseAdapter<Attachment> {
    fromBlockSnapshot(_payload: FromBlockSnapshotPayload): Promise<FromBlockSnapshotResult<Attachment>>;
    fromDocSnapshot(_payload: FromDocSnapshotPayload): Promise<FromDocSnapshotResult<Attachment>>;
    fromSliceSnapshot(payload: FromSliceSnapshotPayload): Promise<FromSliceSnapshotResult<Attachment>>;
    toBlockSnapshot(_payload: ToBlockSnapshotPayload<Attachment>): Promise<BlockSnapshot>;
    toDocSnapshot(_payload: ToDocSnapshotPayload<Attachment>): Promise<DocSnapshot>;
    toSliceSnapshot(payload: AttachmentToSliceSnapshotPayload): Promise<SliceSnapshot | null>;
}
export declare const AttachmentAdapterFactoryIdentifier: import("@blocksuite/global/di").ServiceIdentifier<import("./type.js").AdapterFactory>;
export declare const AttachmentAdapterFactoryExtension: ExtensionType;
export {};
//# sourceMappingURL=attachment.d.ts.map