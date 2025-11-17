import type { SurfaceRefBlockModel } from '@blocksuite/affine-model';
import { BlockComponent } from '@blocksuite/block-std';
export declare class EdgelessSurfaceRefBlockComponent extends BlockComponent<SurfaceRefBlockModel> {
    render(): symbol;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-edgeless-surface-ref': EdgelessSurfaceRefBlockComponent;
    }
}
//# sourceMappingURL=surface-ref-block-edgeless.d.ts.map