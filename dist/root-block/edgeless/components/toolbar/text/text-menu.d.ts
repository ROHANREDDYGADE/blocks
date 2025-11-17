import type { GfxToolsFullOptionValue } from '@blocksuite/block-std/gfx';
import { LitElement, nothing } from 'lit';
declare const EdgelessTextMenu_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/tool.mixin.js").EdgelessToolbarToolClass>;
export declare class EdgelessTextMenu extends EdgelessTextMenu_base {
    static styles: import("lit").CSSResult;
    type: GfxToolsFullOptionValue['type'];
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    accessor color: string;
    accessor onChange: (props: Record<string, unknown>) => void;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-text-menu': EdgelessTextMenu;
    }
}
export {};
//# sourceMappingURL=text-menu.d.ts.map