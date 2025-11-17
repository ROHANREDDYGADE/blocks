import type { EditorHost } from '@blocksuite/block-std';
import type { BlockModel } from '@blocksuite/store';
import { ShadowlessElement } from '@blocksuite/block-std';
declare const EmbedCardCreateModal_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EmbedCardCreateModal extends EmbedCardCreateModal_base {
    static styles: import("lit").CSSResult;
    private _onCancel;
    private _onConfirm;
    private _onDocumentKeydown;
    private _handleInput;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _linkInputValue;
    accessor createOptions: {
        mode: 'page';
        parentModel: BlockModel | string;
        index?: number;
    } | {
        mode: 'edgeless';
    };
    accessor descriptionText: string;
    accessor host: EditorHost;
    accessor input: HTMLInputElement;
    accessor onConfirm: () => void;
    accessor titleText: string;
}
export declare function toggleEmbedCardCreateModal(host: EditorHost, titleText: string, descriptionText: string, createOptions: {
    mode: 'page';
    parentModel: BlockModel | string;
    index?: number;
} | {
    mode: 'edgeless';
}): Promise<void>;
declare global {
    interface HTMLElementTagNameMap {
        'embed-card-create-modal': EmbedCardCreateModal;
    }
}
export {};
//# sourceMappingURL=embed-card-create-modal.d.ts.map