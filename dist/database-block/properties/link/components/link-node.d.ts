import { ShadowlessElement } from '@blocksuite/block-std';
export declare class LinkNode extends ShadowlessElement {
    static styles: import("lit").CSSResult;
    protected render(): import("lit-html").TemplateResult<1>;
    accessor link: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-database-link-node': LinkNode;
    }
}
//# sourceMappingURL=link-node.d.ts.map