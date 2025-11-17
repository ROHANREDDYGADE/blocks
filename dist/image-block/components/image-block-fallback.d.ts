import type { ImageBlockModel } from '@blocksuite/affine-model';
import { ShadowlessElement } from '@blocksuite/block-std';
export declare const SURFACE_IMAGE_CARD_WIDTH = 220;
export declare const SURFACE_IMAGE_CARD_HEIGHT = 122;
export declare const NOTE_IMAGE_CARD_WIDTH = 752;
export declare const NOTE_IMAGE_CARD_HEIGHT = 78;
declare const ImageBlockFallbackCard_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class ImageBlockFallbackCard extends ImageBlockFallbackCard_base {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    accessor error: boolean;
    accessor loading: boolean;
    accessor mode: 'page' | 'edgeless';
    accessor model: ImageBlockModel;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-image-fallback-card': ImageBlockFallbackCard;
    }
}
export {};
//# sourceMappingURL=image-block-fallback.d.ts.map