import type { ColorScheme } from '@blocksuite/affine-model';
import { LitElement } from 'lit';
import type { AIPanelGeneratingConfig } from '../../type.js';
declare const AIPanelGenerating_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class AIPanelGenerating extends AIPanelGenerating_base {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    updateLoadingProgress(progress: number): void;
    accessor config: AIPanelGeneratingConfig;
    accessor loadingProgress: number;
    accessor stopGenerating: () => void;
    accessor theme: ColorScheme;
    accessor withAnswer: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-panel-generating': AIPanelGenerating;
    }
}
export {};
//# sourceMappingURL=generating.d.ts.map