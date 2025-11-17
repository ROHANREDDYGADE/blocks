import type { TemplateResult } from 'lit';
import type { ShapeToolOption } from '../../../gfx-tool/shape-tool.js';
type Config = {
    name: ShapeToolOption['shapeName'];
    generalIcon: TemplateResult<1>;
    scribbledIcon: TemplateResult<1>;
    tooltip: string;
    disabled: boolean;
};
export declare const ShapeComponentConfig: Config[];
export declare const ShapeComponentConfigMap: Record<import("@blocksuite/affine-model").ShapeName, Config>;
export declare const SHAPE_COLOR_PREFIX = "--affine-palette-shape-";
export declare const LINE_COLOR_PREFIX = "--affine-palette-line-";
export {};
//# sourceMappingURL=shape-menu-config.d.ts.map