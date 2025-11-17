import type { GfxToolsFullOptionValue } from '@blocksuite/block-std/gfx';
import { LitElement } from 'lit';
declare const EdgelessFrameMenu_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/tool.mixin.js").EdgelessToolbarToolClass>;
export declare class EdgelessFrameMenu extends EdgelessFrameMenu_base {
    static styles: import("lit").CSSResult;
    type: GfxToolsFullOptionValue['type'];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-frame-menu': EdgelessFrameMenu;
    }
}
export {};
//# sourceMappingURL=frame-menu.d.ts.map