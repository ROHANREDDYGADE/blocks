import { ColorScheme } from '@blocksuite/affine-model';
import { LitElement, type PropertyValues } from 'lit';
declare const GeneratingPlaceholder_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class GeneratingPlaceholder extends GeneratingPlaceholder_base {
    static styles: import("lit").CSSResult;
    protected render(): import("lit-html").TemplateResult<1>;
    willUpdate(changed: PropertyValues): void;
    accessor height: number;
    accessor loadingProgress: number;
    accessor showHeader: boolean;
    accessor stages: string[];
    accessor theme: ColorScheme;
}
declare global {
    interface HTMLElementTagNameMap {
        'generating-placeholder': GeneratingPlaceholder;
    }
}
export {};
//# sourceMappingURL=generating-placeholder.d.ts.map