interface CornerPathParams {
    a: number;
    b: number;
    c: number;
    d: number;
    p: number;
    cornerRadius: number;
    arcSectionLength: number;
}
interface CornerParams {
    cornerRadius: number;
    cornerSmoothing: number;
    preserveSmoothing: boolean;
    roundingAndSmoothingBudget: number;
}
export declare function getPathParamsForCorner({ cornerRadius, cornerSmoothing, preserveSmoothing, roundingAndSmoothingBudget, }: CornerParams): CornerPathParams;
interface SVGPathInput {
    width: number;
    height: number;
    topRightPathParams: CornerPathParams;
    bottomRightPathParams: CornerPathParams;
    bottomLeftPathParams: CornerPathParams;
    topLeftPathParams: CornerPathParams;
}
export declare function getSVGPathFromPathParams({ width, height, topLeftPathParams, topRightPathParams, bottomLeftPathParams, bottomRightPathParams, }: SVGPathInput): string;
export {};
//# sourceMappingURL=draw.d.ts.map