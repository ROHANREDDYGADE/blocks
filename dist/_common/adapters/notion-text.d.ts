import type { ExtensionType } from '@blocksuite/block-std';
import { type AssetsManager, BaseAdapter, type BlockSnapshot, type DocSnapshot, type FromBlockSnapshotResult, type FromDocSnapshotResult, type FromSliceSnapshotResult, type SliceSnapshot } from '@blocksuite/store';
type NotionEditingStyle = {
    0: string;
};
type NotionEditing = {
    0: string;
    1: Array<NotionEditingStyle>;
};
export type NotionTextSerialized = {
    blockType: string;
    editing: Array<NotionEditing>;
};
export type NotionText = string;
type NotionHtmlToSliceSnapshotPayload = {
    file: NotionText;
    assets?: AssetsManager;
    workspaceId: string;
    pageId: string;
};
export declare class NotionTextAdapter extends BaseAdapter<NotionText> {
    fromBlockSnapshot(): FromBlockSnapshotResult<NotionText> | Promise<FromBlockSnapshotResult<NotionText>>;
    fromDocSnapshot(): FromDocSnapshotResult<NotionText> | Promise<FromDocSnapshotResult<NotionText>>;
    fromSliceSnapshot(): FromSliceSnapshotResult<NotionText> | Promise<FromSliceSnapshotResult<NotionText>>;
    toBlockSnapshot(): Promise<BlockSnapshot> | BlockSnapshot;
    toDocSnapshot(): Promise<DocSnapshot> | DocSnapshot;
    toSliceSnapshot(payload: NotionHtmlToSliceSnapshotPayload): SliceSnapshot | null;
}
export declare const NotionTextAdapterFactoryIdentifier: import("@blocksuite/global/di").ServiceIdentifier<import("./type.js").AdapterFactory>;
export declare const NotionTextAdapterFactoryExtension: ExtensionType;
export {};
//# sourceMappingURL=notion-text.d.ts.map