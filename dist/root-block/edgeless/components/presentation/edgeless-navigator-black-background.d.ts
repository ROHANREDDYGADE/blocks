import type { RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import { nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
export declare const EDGELESS_NAVIGATOR_BLACK_BACKGROUND_WIDGET = "edgeless-navigator-black-background";
export declare class EdgelessNavigatorBlackBackgroundWidget extends WidgetComponent<RootBlockModel, EdgelessRootBlockComponent> {
    static styles: import("lit").CSSResult;
    private _blackBackground;
    get gfx(): import("@blocksuite/block-std/gfx").GfxController;
    private _tryLoadBlackBackground;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    private accessor frame;
    private accessor show;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-navigator-black-background': EdgelessNavigatorBlackBackgroundWidget;
    }
}
//# sourceMappingURL=edgeless-navigator-black-background.d.ts.map