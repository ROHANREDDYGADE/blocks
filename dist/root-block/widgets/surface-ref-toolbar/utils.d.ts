import type { CanvasRenderer } from '@blocksuite/affine-block-surface';
import type { EditorHost } from '@blocksuite/block-std';
import type { SurfaceRefBlockComponent } from '../../../surface-ref-block/surface-ref-block.js';
export declare const edgelessToBlob: (host: EditorHost, options: {
    surfaceRefBlock: SurfaceRefBlockComponent;
    surfaceRenderer: CanvasRenderer;
    edgelessElement: BlockSuite.EdgelessModel;
}) => Promise<Blob>;
export declare const writeImageBlobToClipboard: (blob: Blob) => Promise<void>;
//# sourceMappingURL=utils.d.ts.map