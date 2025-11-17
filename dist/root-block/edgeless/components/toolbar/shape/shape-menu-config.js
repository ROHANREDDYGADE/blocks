import { DiamondIcon, EllipseIcon, RoundedRectangleIcon, ScribbledDiamondIcon, ScribbledEllipseIcon, ScribbledRoundedRectangleIcon, ScribbledSquareIcon, ScribbledTriangleIcon, SquareIcon, TriangleIcon, } from '@blocksuite/affine-components/icons';
import { ShapeType } from '@blocksuite/affine-model';
export const ShapeComponentConfig = [
    {
        name: ShapeType.Rect,
        generalIcon: SquareIcon,
        scribbledIcon: ScribbledSquareIcon,
        tooltip: 'Square',
        disabled: false,
    },
    {
        name: ShapeType.Ellipse,
        generalIcon: EllipseIcon,
        scribbledIcon: ScribbledEllipseIcon,
        tooltip: 'Ellipse',
        disabled: false,
    },
    {
        name: ShapeType.Diamond,
        generalIcon: DiamondIcon,
        scribbledIcon: ScribbledDiamondIcon,
        tooltip: 'Diamond',
        disabled: false,
    },
    {
        name: ShapeType.Triangle,
        generalIcon: TriangleIcon,
        scribbledIcon: ScribbledTriangleIcon,
        tooltip: 'Triangle',
        disabled: false,
    },
    {
        name: 'roundedRect',
        generalIcon: RoundedRectangleIcon,
        scribbledIcon: ScribbledRoundedRectangleIcon,
        tooltip: 'Rounded rectangle',
        disabled: false,
    },
];
export const ShapeComponentConfigMap = ShapeComponentConfig.reduce((acc, config) => {
    acc[config.name] = config;
    return acc;
}, {});
export const SHAPE_COLOR_PREFIX = '--affine-palette-shape-';
export const LINE_COLOR_PREFIX = '--affine-palette-line-';
//# sourceMappingURL=shape-menu-config.js.map