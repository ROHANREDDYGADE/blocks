import { ColorScheme } from '@blocksuite/affine-model';
import { LitElement } from 'lit';
declare const EdgelessNoteShadowPanel_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessNoteShadowPanel extends EdgelessNoteShadowPanel_base {
    static styles: import("lit").CSSResult;
    render(): unknown;
    accessor background: string;
    accessor onSelect: (value: string) => void;
    accessor theme: ColorScheme;
    accessor value: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-note-shadow-panel': EdgelessNoteShadowPanel;
    }
}
export {};
//# sourceMappingURL=note-shadow-panel.d.ts.map