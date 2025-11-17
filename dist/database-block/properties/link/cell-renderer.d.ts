import { BaseCellRenderer } from '@blocksuite/data-view';
export declare class LinkCell extends BaseCellRenderer<string> {
    static styles: import("lit").CSSResult;
    private _onClick;
    private _onEdit;
    private preValue?;
    openDoc: (e: MouseEvent) => void;
    get std(): import("@blocksuite/block-std").BlockStdScope | undefined;
    render(): import("lit-html").TemplateResult;
    updated(): void;
    accessor docId: string | undefined;
}
export declare class LinkCellEditing extends BaseCellRenderer<string> {
    static styles: import("lit").CSSResult;
    private _focusEnd;
    private _onKeydown;
    private _setValue;
    firstUpdated(): void;
    onExitEditMode(): void;
    render(): import("lit-html").TemplateResult;
    private accessor _container;
}
export declare const linkColumnConfig: import("@blocksuite/data-view").PropertyMetaConfig<"link", Record<string, never>, string>;
//# sourceMappingURL=cell-renderer.d.ts.map