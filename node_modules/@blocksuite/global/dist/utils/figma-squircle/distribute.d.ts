interface RoundedRectangle {
    topLeftCornerRadius: number;
    topRightCornerRadius: number;
    bottomRightCornerRadius: number;
    bottomLeftCornerRadius: number;
    width: number;
    height: number;
}
interface NormalizedCorner {
    radius: number;
    roundingAndSmoothingBudget: number;
}
interface NormalizedCorners {
    topLeft: NormalizedCorner;
    topRight: NormalizedCorner;
    bottomLeft: NormalizedCorner;
    bottomRight: NormalizedCorner;
}
export declare function distributeAndNormalize({ topLeftCornerRadius, topRightCornerRadius, bottomRightCornerRadius, bottomLeftCornerRadius, width, height, }: RoundedRectangle): NormalizedCorners;
export {};
//# sourceMappingURL=distribute.d.ts.map