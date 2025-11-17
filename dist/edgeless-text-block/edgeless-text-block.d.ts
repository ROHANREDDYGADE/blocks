import type { EdgelessTextBlockModel } from '@blocksuite/affine-model';
import { GfxBlockComponent } from '@blocksuite/block-std';
import type { EdgelessRootService } from '../root-block/index.js';
export declare const EDGELESS_TEXT_BLOCK_MIN_WIDTH = 50;
export declare const EDGELESS_TEXT_BLOCK_MIN_HEIGHT = 50;
export declare class EdgelessTextBlockComponent extends GfxBlockComponent<EdgelessTextBlockModel> {
    static styles: import("lit").CSSResult;
    private _resizeObserver;
    get rootService(): EdgelessRootService;
    private _updateH;
    private _updateW;
    checkWidthOverflow(width: number): boolean;
    connectedCallback(): void;
    firstUpdated(props: Map<string, unknown>): void;
    getCSSTransform(): string;
    getRenderingRect(): {
        x: number;
        y: number;
        w: number | undefined;
        h: number;
        rotate: number;
        zIndex: string;
    };
    renderGfxBlock(): import("lit-html").TemplateResult<1>;
    renderPageContent(): import("lit-html").TemplateResult<1>;
    tryFocusEnd(): void;
    private accessor _editing;
    private accessor _textContainer;
    accessor childrenContainer: HTMLDivElement;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-edgeless-text': EdgelessTextBlockComponent;
    }
}
//# sourceMappingURL=edgeless-text-block.d.ts.map