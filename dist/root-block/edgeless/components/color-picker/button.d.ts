import type { EditorMenuButton } from '@blocksuite/affine-components/toolbar';
import { LitElement } from 'lit';
import type { ModeType, PickColorEvent, PickColorType } from './types.js';
type Type = 'normal' | 'custom';
declare const EdgelessColorPickerButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessColorPickerButton extends EdgelessColorPickerButton_base {
    #private;
    switchToCustomTab: (e: MouseEvent) => void;
    get colorWithoutAlpha(): string;
    get customButtonStyle(): {
        '--b': string;
        '--c': string;
    };
    get isCSSVariable(): boolean;
    get tabContentPadding(): string;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor color: string;
    accessor colors: {
        type: ModeType;
        value: string;
    }[];
    accessor colorType: PickColorType;
    accessor hollowCircle: boolean;
    accessor isText: boolean;
    accessor label: string;
    accessor menuButton: EditorMenuButton;
    accessor palettes: string[];
    accessor pick: (event: PickColorEvent) => void;
    accessor tabType: Type;
    accessor tooltip: string | undefined;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-color-picker-button': EdgelessColorPickerButton;
    }
}
export {};
//# sourceMappingURL=button.d.ts.map