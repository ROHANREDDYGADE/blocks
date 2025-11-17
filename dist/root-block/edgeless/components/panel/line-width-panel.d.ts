import { LineWidth } from '@blocksuite/affine-model';
import { LitElement, type PropertyValues } from 'lit';
export declare class LineWidthEvent extends Event {
    detail: LineWidth;
    constructor(type: string, { detail, composed, bubbles, }: {
        detail: LineWidth;
        composed: boolean;
        bubbles: boolean;
    });
}
declare const EdgelessLineWidthPanel_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessLineWidthPanel extends EdgelessLineWidthPanel_base {
    static styles: import("lit").CSSResult;
    private _dragConfig;
    private _getDragHandlePosition;
    private _onPointerDown;
    private _onPointerMove;
    private _onPointerOut;
    private _onPointerUp;
    private _updateIconsColor;
    private _onSelect;
    private _updateLineWidthPanel;
    private _updateLineWidthPanelByDragHandlePosition;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    willUpdate(changedProperties: PropertyValues<this>): void;
    private accessor _bottomLine;
    private accessor _dragHandle;
    private accessor _lineWidthIcons;
    private accessor _lineWidthOverlay;
    private accessor _lineWidthPanel;
    accessor disable: boolean;
    accessor hasTooltip: boolean;
    accessor selectedSize: LineWidth;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-line-width-panel': EdgelessLineWidthPanel;
    }
}
export {};
//# sourceMappingURL=line-width-panel.d.ts.map