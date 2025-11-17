import type { RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import type { EdgelessRootBlockComponent } from '../../../root-block/edgeless/edgeless-root-block.js';
export declare const AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET = "affine-edgeless-remote-selection-widget";
export declare class EdgelessRemoteSelectionWidget extends WidgetComponent<RootBlockModel, EdgelessRootBlockComponent> {
    static styles: import("lit").CSSResult;
    private _remoteColorManager;
    private _updateOnElementChange;
    private _updateRemoteCursor;
    private _updateRemoteRects;
    private _updateTransform;
    get edgeless(): EdgelessRootBlockComponent;
    get selection(): import("@blocksuite/block-std/gfx").GfxSelectionManager;
    get surface(): import("@blocksuite/affine-block-surface").SurfaceBlockComponent;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _remoteCursors;
    private accessor _remoteRects;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET]: EdgelessRemoteSelectionWidget;
    }
}
//# sourceMappingURL=index.d.ts.map