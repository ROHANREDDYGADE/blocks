import { matchFlavours } from '../../../_common/utils/index.js';
const handlePoint = (point, snapshot, model) => {
    const { index, length } = point;
    if (matchFlavours(model, ['affine:page'])) {
        if (length === 0)
            return;
        snapshot.props.title.delta =
            model.title.sliceToDelta(index, length + index);
        return;
    }
    if (!snapshot.props.text || length === 0) {
        return;
    }
    snapshot.props.text.delta =
        model.text?.sliceToDelta(index, length + index);
};
const sliceText = (slots, std) => {
    slots.afterExport.on(payload => {
        if (payload.type === 'block') {
            const snapshot = payload.snapshot;
            const model = payload.model;
            const text = std.selection.find('text');
            if (text && text.from.blockId === model.id) {
                handlePoint(text.from, snapshot, model);
                return;
            }
            if (text && text.to && text.to.blockId === model.id) {
                handlePoint(text.to, snapshot, model);
                return;
            }
        }
    });
};
export const copyMiddleware = (std) => {
    return ({ slots }) => {
        sliceText(slots, std);
    };
};
//# sourceMappingURL=copy.js.map