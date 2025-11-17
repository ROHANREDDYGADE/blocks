import { BookmarkBlockComponent } from './bookmark-block.js';
declare const BookmarkEdgelessBlockComponent_base: typeof BookmarkBlockComponent & (new (...args: any[]) => import("@blocksuite/block-std").GfxBlockComponent);
export declare class BookmarkEdgelessBlockComponent extends BookmarkEdgelessBlockComponent_base {
    blockDraggable: boolean;
    getRenderingRect(): {
        x: number;
        y: number;
        w: number;
        h: number;
        zIndex: string;
    };
    renderGfxBlock(): unknown;
    protected accessor blockContainerStyles: {};
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-edgeless-bookmark': BookmarkEdgelessBlockComponent;
    }
}
export {};
//# sourceMappingURL=bookmark-edgeless-block.d.ts.map