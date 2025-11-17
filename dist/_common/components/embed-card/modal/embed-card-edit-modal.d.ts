import type { AliasInfo } from '@blocksuite/affine-model';
import type { EditorHost } from '@blocksuite/block-std';
import { LitElement } from 'lit';
import type { LinkableEmbedModel } from '../type.js';
declare const EmbedCardEditModal_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EmbedCardEditModal extends EmbedCardEditModal_base {
    static styles: import("lit").CSSResult;
    private _blockComponent;
    private _hide;
    private _onKeydown;
    private _onReset;
    private _onSave;
    private _updateDescription;
    private _updateTitle;
    get isEmbedLinkedDocModel(): boolean;
    get isEmbedSyncedDocModel(): boolean;
    get isInternalEmbedModel(): boolean;
    get modelType(): 'linked' | 'synced' | null;
    get placeholders(): {
        title: string;
        description: string;
    };
    private _updateInfo;
    connectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor description$: import("@preact/signals-core").Signal<string>;
    accessor host: EditorHost;
    accessor model: LinkableEmbedModel;
    accessor originalDocInfo: AliasInfo | undefined;
    accessor resetButtonDisabled$: import("@preact/signals-core").ReadonlySignal<boolean>;
    accessor saveButtonDisabled$: import("@preact/signals-core").ReadonlySignal<boolean>;
    accessor title$: import("@preact/signals-core").Signal<string>;
    accessor titleInput: HTMLInputElement;
    accessor viewType: string;
}
export declare function toggleEmbedCardEditModal(host: EditorHost, embedCardModel: LinkableEmbedModel, viewType: string, originalDocInfo?: AliasInfo): void;
declare global {
    interface HTMLElementTagNameMap {
        'embed-card-edit-modal': EmbedCardEditModal;
    }
}
export {};
//# sourceMappingURL=embed-card-edit-modal.d.ts.map