import type { GfxToolsFullOptionValue } from '@blocksuite/block-std/gfx';
import { LitElement } from 'lit';
declare const EdgelessConnectorMenu_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/tool.mixin.js").EdgelessToolbarToolClass>;
export declare class EdgelessConnectorMenu extends EdgelessConnectorMenu_base {
    static styles: import("lit").CSSResult;
    private _props$;
    type: GfxToolsFullOptionValue['type'];
    render(): import("lit-html").TemplateResult<1>;
    accessor onChange: (props: Record<string, unknown>) => void;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-connector-menu': EdgelessConnectorMenu;
    }
}
export {};
//# sourceMappingURL=connector-menu.d.ts.map