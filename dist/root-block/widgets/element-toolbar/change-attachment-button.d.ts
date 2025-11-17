import type { AttachmentBlockModel } from '@blocksuite/affine-model';
import type { TemplateResult } from 'lit';
import { LitElement, nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
declare const EdgelessChangeAttachmentButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessChangeAttachmentButton extends EdgelessChangeAttachmentButton_base {
    private _download;
    private _setCardStyle;
    private _showCaption;
    private get _block();
    private get _doc();
    private get _getCardStyleOptions();
    get std(): import("@blocksuite/block-std").BlockStdScope;
    get viewToggleMenu(): TemplateResult<1> | typeof nothing;
    render(): Iterable<symbol | TemplateResult<1> | null>;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor model: AttachmentBlockModel;
}
export declare function renderAttachmentButton(edgeless: EdgelessRootBlockComponent, attachments?: AttachmentBlockModel[]): TemplateResult<1> | typeof nothing;
export {};
//# sourceMappingURL=change-attachment-button.d.ts.map