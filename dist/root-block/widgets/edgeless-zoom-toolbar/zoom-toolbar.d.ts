import { LitElement, nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
declare const EdgelessZoomToolbar_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessZoomToolbar extends EdgelessZoomToolbar_base {
    static styles: import("lit").CSSResult;
    get edgelessService(): import("../../index.js").EdgelessRootService;
    get edgelessTool(): import("@blocksuite/block-std/gfx").GfxToolsFullOptionValue;
    get locked(): boolean;
    get viewport(): import("@blocksuite/block-std/gfx").Viewport;
    get zoom(): number;
    constructor(edgeless: EdgelessRootBlockComponent);
    private _isVerticalBar;
    connectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor layout: 'horizontal' | 'vertical';
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-zoom-toolbar': EdgelessZoomToolbar;
    }
}
export {};
//# sourceMappingURL=zoom-toolbar.d.ts.map