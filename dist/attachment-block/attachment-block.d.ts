import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { HoverController } from '@blocksuite/affine-components/hover';
import { type AttachmentBlockModel } from '@blocksuite/affine-model';
import type { AttachmentBlockService } from './attachment-service.js';
export declare class AttachmentBlockComponent extends CaptionedBlockComponent<AttachmentBlockModel, AttachmentBlockService> {
    static styles: import("lit").CSSResult;
    protected _isDragging: boolean;
    protected _isResizing: boolean;
    protected _isSelected: boolean;
    protected _whenHover: HoverController | null;
    blockDraggable: boolean;
    protected containerStyleMap: import("lit-html/directive.js").DirectiveResult<typeof import("lit-html/directives/style-map.js").StyleMapDirective>;
    convertTo: () => void;
    copy: () => void;
    download: () => void;
    embedded: () => boolean;
    open: () => void;
    refreshData: () => void;
    protected get embedView(): import("lit-html").TemplateResult | undefined;
    private _selectBlock;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    protected onClick(event: MouseEvent): void;
    renderBlock(): import("lit-html").TemplateResult<1>;
    protected accessor _showOverlay: boolean;
    accessor allowEmbed: boolean;
    accessor blobUrl: string | undefined;
    accessor downloading: boolean;
    accessor error: boolean;
    accessor loading: boolean;
    accessor useCaptionEditor: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-attachment': AttachmentBlockComponent;
    }
}
//# sourceMappingURL=attachment-block.d.ts.map