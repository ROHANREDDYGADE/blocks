import type { FileSnapshot } from './adapter.js';
export declare const encode: (arraybuffer: ArrayBuffer) => string;
export declare const decode: (base64: string) => ArrayBuffer;
export declare function encodeClipboardBlobs(map: Map<string, Blob>): Promise<Record<string, FileSnapshot>>;
export declare function decodeClipboardBlobs(blobs: Record<string, FileSnapshot>, map: Map<string, Blob> | undefined): void;
//# sourceMappingURL=utils.d.ts.map