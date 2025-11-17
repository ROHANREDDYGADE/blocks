import { BlockService } from '@blocksuite/block-std';
export declare class BookmarkBlockService extends BlockService {
    static readonly flavour: "affine:bookmark";
    private static readonly linkPreviewer;
    static setLinkPreviewEndpoint: (endpoint: string) => void;
    queryUrlData: (url: string, signal?: AbortSignal) => Promise<Partial<import("@blocksuite/affine-model").LinkPreviewData>>;
}
export declare const BookmarkDragHandleOption: import("@blocksuite/block-std").ExtensionType;
//# sourceMappingURL=bookmark-service.d.ts.map