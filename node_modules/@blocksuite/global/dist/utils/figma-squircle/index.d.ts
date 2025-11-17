/**
 * Copyright (c)
 * https://github.com/phamfoo/figma-squircle
 */
export interface FigmaSquircleParams {
    cornerRadius?: number;
    topLeftCornerRadius?: number;
    topRightCornerRadius?: number;
    bottomRightCornerRadius?: number;
    bottomLeftCornerRadius?: number;
    cornerSmoothing: number;
    width: number;
    height: number;
    preserveSmoothing?: boolean;
}
export declare function getSvgPath({ cornerRadius, topLeftCornerRadius, topRightCornerRadius, bottomRightCornerRadius, bottomLeftCornerRadius, cornerSmoothing, width, height, preserveSmoothing, }: FigmaSquircleParams): string;
//# sourceMappingURL=index.d.ts.map