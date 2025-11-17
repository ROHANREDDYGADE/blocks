import { ColorScheme, LineColor } from '@blocksuite/affine-model';
import { LitElement } from 'lit';
export declare class ColorEvent extends Event {
    detail: string;
    constructor(type: string, { detail, composed, bubbles, }: {
        detail: string;
        composed: boolean;
        bubbles: boolean;
    });
}
export declare const GET_DEFAULT_LINE_COLOR: (theme: ColorScheme) => LineColor.Black | LineColor.White;
export declare function isTransparent(color: string): boolean;
export declare function ColorUnit(color: string, { hollowCircle, letter, }?: {
    hollowCircle?: boolean;
    letter?: boolean;
}): import("lit-html").TemplateResult<1>;
export declare class EdgelessColorButton extends LitElement {
    static styles: import("lit").CSSResult;
    get preprocessColor(): string;
    render(): import("lit-html").TemplateResult<1>;
    accessor color: string;
    accessor hollowCircle: boolean | undefined;
    accessor letter: boolean | undefined;
}
export declare const colorContainerStyles: import("lit").CSSResult;
export declare class EdgelessColorPanel extends LitElement {
    static styles: import("lit").CSSResult;
    get palettes(): readonly string[];
    onSelect(value: string): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor hasTransparent: boolean;
    accessor hollowCircle: boolean;
    accessor openColorPicker: (e: MouseEvent) => void;
    accessor options: readonly string[];
    accessor showLetterMark: boolean;
    accessor value: string | null;
}
export declare class EdgelessTextColorIcon extends LitElement {
    static styles: import("lit").CSSResult;
    get preprocessColor(): string;
    render(): import("lit-html").TemplateResult<1>;
    accessor color: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-color-panel': EdgelessColorPanel;
        'edgeless-color-button': EdgelessColorButton;
        'edgeless-text-color-icon': EdgelessTextColorIcon;
    }
}
//# sourceMappingURL=color-panel.d.ts.map