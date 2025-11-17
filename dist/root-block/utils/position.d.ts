type CollisionBox = {
    /**
     * The point that the objRect is positioned to.
     */
    positioningPoint: {
        x: number;
        y: number;
    };
    /**
     * The boundary rect of the obj that is being positioned.
     */
    objRect?: {
        height: number;
        width: number;
    };
    /**
     * The boundary rect of the container that the obj is in.
     */
    boundaryRect?: DOMRect;
    offsetX?: number;
    offsetY?: number;
    edgeGap?: number;
};
export declare function calcSafeCoordinate({ positioningPoint, objRect, boundaryRect, offsetX, offsetY, edgeGap, }: CollisionBox): {
    x: number;
    y: number;
};
/**
 * Used to compare the space available
 * at the top and bottom of an element within a container.
 *
 * Please give preference to {@link getPopperPosition}
 */
export declare function compareTopAndBottomSpace(obj: {
    getBoundingClientRect: () => DOMRect;
}, container?: HTMLElement, gap?: number): {
    placement: "bottom" | "top";
    height: number;
};
/**
 * Get the position of the popper element with flip.
 */
export declare function getPopperPosition(popper: {
    getBoundingClientRect: () => DOMRect;
}, reference: {
    getBoundingClientRect: () => DOMRect;
}, { gap, offsetY }?: {
    gap?: number;
    offsetY?: number;
}): {
    placement: "bottom" | "top";
    /**
     * The height is the available space height.
     *
     * Note: it's a max height, not the real height,
     * because sometimes the popper's height is smaller than the available space.
     */
    height: number;
    x: string;
    y: string;
};
export {};
//# sourceMappingURL=position.d.ts.map