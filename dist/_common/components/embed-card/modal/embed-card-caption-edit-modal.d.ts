import { type BlockComponent, ShadowlessElement } from '@blocksuite/block-std';
declare const EmbedCardEditCaptionEditModal_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EmbedCardEditCaptionEditModal extends EmbedCardEditCaptionEditModal_base {
    static styles: import("lit").CSSResult;
    private get _doc();
    private get _model();
    private _onKeydown;
    private _onSave;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor block: BlockComponent;
    accessor captionInput: HTMLTextAreaElement;
}
export declare function toggleEmbedCardCaptionEditModal(block: BlockComponent): void;
declare global {
    interface HTMLElementTagNameMap {
        'embed-card-caption-edit-modal': EmbedCardEditCaptionEditModal;
    }
}
export {};
//# sourceMappingURL=embed-card-caption-edit-modal.d.ts.map