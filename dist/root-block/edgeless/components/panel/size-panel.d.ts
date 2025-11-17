import { LitElement } from 'lit';
type SizeItem = {
    name?: string;
    value: number;
};
export declare class EdgelessSizePanel extends LitElement {
    static styles: import("lit").CSSResult;
    private _onKeydown;
    renderItemWithCheck: ({ name, value }: SizeItem) => import("lit-html").TemplateResult<1>;
    renderItemWithNormal: ({ name, value }: SizeItem) => import("lit-html").TemplateResult<1>;
    private _onPopperClose;
    private _onSelect;
    render(): import("lit-html").TemplateResult<1>;
    renderItem(): ({ name, value }: SizeItem) => import("lit-html").TemplateResult<1>;
    accessor maxSize: number;
    accessor minSize: number;
    accessor onPopperCose: (() => void) | undefined;
    accessor onSelect: ((size: number) => void) | undefined;
    accessor size: number;
    accessor sizeList: SizeItem[];
    accessor type: 'normal' | 'check';
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-size-panel': EdgelessSizePanel;
    }
}
export {};
//# sourceMappingURL=size-panel.d.ts.map