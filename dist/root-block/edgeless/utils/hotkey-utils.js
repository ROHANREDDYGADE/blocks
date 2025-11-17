import { ShapeType } from '@blocksuite/affine-model';
const shapeMap = {
    [ShapeType.Rect]: 0,
    [ShapeType.Ellipse]: 1,
    [ShapeType.Diamond]: 2,
    [ShapeType.Triangle]: 3,
    roundedRect: 4,
};
const shapes = Object.keys(shapeMap);
export function getNextShapeType(cur) {
    return shapes[(shapeMap[cur] + 1) % shapes.length];
}
//# sourceMappingURL=hotkey-utils.js.map