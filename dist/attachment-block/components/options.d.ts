import { type AttachmentBlockModel } from '@blocksuite/affine-model';
import type { AttachmentBlockComponent } from '../attachment-block.js';
export declare function attachmentViewToggleMenu({ block, callback, }: {
    block: AttachmentBlockComponent;
    callback?: () => void;
}): import("lit-html").TemplateResult<1>;
export declare function AttachmentOptionsTemplate({ block, model, abortController, }: {
    block: AttachmentBlockComponent;
    model: AttachmentBlockModel;
    abortController: AbortController;
}): import("lit-html").TemplateResult<1>;
//# sourceMappingURL=options.d.ts.map