import { getShapeName } from '@blocksuite/affine-model';
import { NodePropsSchema } from '@blocksuite/affine-shared/utils';
const LastPropsSchema = NodePropsSchema;
export function getLastPropsKey(modelType, modelProps) {
    if (modelType === 'shape') {
        const { shapeType, radius } = modelProps;
        const shapeName = getShapeName(shapeType, radius);
        return `${modelType}:${shapeName}`;
    }
    if (isLastPropsKey(modelType)) {
        return modelType;
    }
    return null;
}
function isLastPropsKey(key) {
    return Object.keys(LastPropsSchema.shape).includes(key);
}
//# sourceMappingURL=get-last-props-key.js.map