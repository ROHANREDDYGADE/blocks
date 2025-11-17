import type { CursorType, StandardCursor } from '@blocksuite/block-std/gfx';
import type { IVec } from '@blocksuite/global/utils';
import { Bound } from '@blocksuite/global/utils';
export declare function generateCursorUrl(angle?: number, fallback?: StandardCursor): CursorType;
export declare function getCommonRectStyle(rect: DOMRect, active?: boolean, selected?: boolean, rotate?: number): {
    '--affine-border-width': string;
    width: string;
    height: string;
    transform: string;
    backgroundColor: string;
};
export declare function getTooltipWithShortcut(tip: string, shortcut?: string, postfix?: string): import("lit-html").TemplateResult<1>;
export declare function readImageSize(file: File): Promise<{
    width: number;
    height: number;
}>;
export declare function rotateResizeCursor(angle: number): StandardCursor;
export declare function calcAngle(target: HTMLElement, point: IVec, offset?: number): number;
export declare function calcAngleWithRotation(target: HTMLElement, point: IVec, rect: DOMRect, rotate: number): number;
export declare function calcAngleEdgeWithRotation(target: HTMLElement, rotate: number): number;
export declare function getResizeLabel(target: HTMLElement): string;
export declare function launchIntoFullscreen(element: Element): void;
export declare function calcBoundByOrigin(point: IVec, inTopLeft?: boolean, width?: number, height?: number): Bound;
//# sourceMappingURL=utils.d.ts.map