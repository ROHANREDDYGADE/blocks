import type { FrameBlockModel } from '@blocksuite/affine-model';
import { GfxBlockComponent } from '@blocksuite/block-std';
import type { EdgelessRootService } from '../root-block/index.js';
export declare class FrameBlockComponent extends GfxBlockComponent<FrameBlockModel> {
    get rootService(): EdgelessRootService;
    connectedCallback(): void;
    /**
     * Due to potentially very large frame sizes, CSS scaling can cause iOS Safari to crash.
     * To mitigate this issue, we combine size calculations within the rendering rect.
     */
    getCSSTransform(): string;
    getRenderingRect(): {
        x: number;
        y: number;
        w: number;
        h: number;
        rotate: number;
        zIndex: string;
    };
    renderGfxBlock(): import("lit-html").TemplateResult<1>;
    accessor showBorder: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-frame': FrameBlockComponent;
    }
}
//# sourceMappingURL=frame-block.d.ts.map