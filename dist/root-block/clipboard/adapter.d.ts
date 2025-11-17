import type { BlockSnapshot, DocSnapshot, FromBlockSnapshotPayload, FromBlockSnapshotResult, FromDocSnapshotPayload, FromDocSnapshotResult, FromSliceSnapshotPayload, FromSliceSnapshotResult, SliceSnapshot, ToBlockSnapshotPayload, ToDocSnapshotPayload, ToSliceSnapshotPayload } from '@blocksuite/store';
import { BaseAdapter } from '@blocksuite/store';
export type FileSnapshot = {
    name: string;
    type: string;
    content: string;
};
export declare class ClipboardAdapter extends BaseAdapter<string> {
    static MIME: string;
    fromBlockSnapshot(_payload: FromBlockSnapshotPayload): Promise<FromBlockSnapshotResult<string>>;
    fromDocSnapshot(_payload: FromDocSnapshotPayload): Promise<FromDocSnapshotResult<string>>;
    fromSliceSnapshot(payload: FromSliceSnapshotPayload): Promise<FromSliceSnapshotResult<string>>;
    toBlockSnapshot(_payload: ToBlockSnapshotPayload<string>): Promise<BlockSnapshot>;
    toDocSnapshot(_payload: ToDocSnapshotPayload<string>): Promise<DocSnapshot>;
    toSliceSnapshot(payload: ToSliceSnapshotPayload<string>): Promise<SliceSnapshot>;
}
//# sourceMappingURL=adapter.d.ts.map