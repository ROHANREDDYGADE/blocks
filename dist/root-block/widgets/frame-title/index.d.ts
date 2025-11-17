import { FrameBlockModel, type RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import type { EdgelessRootBlockComponent } from '../../index.js';
import type { AffineFrameTitle } from './frame-title.js';
export declare const AFFINE_FRAME_TITLE_WIDGET = "affine-frame-title-widget";
export declare class AffineFrameTitleWidget extends WidgetComponent<RootBlockModel, EdgelessRootBlockComponent> {
    private get _frames();
    getFrameTitle(frame: FrameBlockModel | string): AffineFrameTitle | null;
    render(): unknown;
}
//# sourceMappingURL=index.d.ts.map