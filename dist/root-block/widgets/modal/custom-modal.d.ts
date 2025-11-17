import { LitElement } from 'lit';
type ModalButton = {
    text: string;
    type?: 'primary';
    onClick: () => Promise<void> | void;
};
type ModalOptions = {
    footer: null | ModalButton[];
};
export declare class AffineCustomModal extends LitElement {
    static styles: import("lit").CSSResult;
    onOpen: (div: HTMLDivElement) => void;
    options: ModalOptions;
    close(): void;
    modalRef(modal: Element | undefined): void;
    render(): import("lit-html").TemplateResult<1>;
}
type CreateModalOption = ModalOptions & {
    entry: (div: HTMLDivElement) => void;
};
export declare function createCustomModal(options: CreateModalOption, container?: HTMLElement): AffineCustomModal;
export {};
//# sourceMappingURL=custom-modal.d.ts.map