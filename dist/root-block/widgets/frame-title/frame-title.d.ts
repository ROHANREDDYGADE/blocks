import { FrameBlockModel } from '@blocksuite/affine-model';
import { type BlockStdScope } from '@blocksuite/block-std';
import { LitElement } from 'lit';
import type { EdgelessRootService } from '../../edgeless/index.js';
export declare const AFFINE_FRAME_TITLE = "affine-frame-title";
declare const AffineFrameTitle_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class AffineFrameTitle extends AffineFrameTitle_base {
    static styles: import("lit").CSSResult;
    private _cachedHeight;
    private _cachedWidth;
    get colors(): {
        background: string;
        text: string;
    };
    get doc(): import("@blocksuite/store").Doc;
    get gfx(): import("@blocksuite/block-std/gfx").GfxController;
    get rootService(): EdgelessRootService;
    private _isInsideFrame;
    private _updateFrameTitleSize;
    private _updateStyle;
    connectedCallback(): void;
    firstUpdated(): void;
    render(): string;
    updated(_changedProperties: Map<string, unknown>): void;
    private accessor _editing;
    private accessor _frameTitle;
    private accessor _nestedFrame;
    private accessor _xywh;
    private accessor _zoom;
    accessor model: FrameBlockModel;
    accessor std: BlockStdScope;
}
export {};
//# sourceMappingURL=frame-title.d.ts.map