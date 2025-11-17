import { Bound, getBoundWithRotation } from '@blocksuite/global/utils';
import { BlockSnapshotSchema } from '@blocksuite/store';
export function getBoundFromSerializedElement(element) {
    return Bound.from(getBoundWithRotation({
        ...Bound.deserialize(element.xywh),
        rotate: typeof element.rotate === 'number' ? element.rotate : 0,
    }));
}
export function getBoundFromGfxBlockSnapshot(snapshot) {
    if (typeof snapshot.props.xywh !== 'string')
        return null;
    return Bound.deserialize(snapshot.props.xywh);
}
export function edgelessElementsBoundFromRawData(elementsRawData) {
    if (elementsRawData.length === 0)
        return new Bound();
    let prev = null;
    for (const data of elementsRawData) {
        const { data: blockSnapshot } = BlockSnapshotSchema.safeParse(data);
        const bound = blockSnapshot
            ? getBoundFromGfxBlockSnapshot(blockSnapshot)
            : getBoundFromSerializedElement(data);
        if (!bound)
            continue;
        if (!prev)
            prev = bound;
        else
            prev = prev.unite(bound);
    }
    return prev ?? new Bound();
}
//# sourceMappingURL=bound-utils.js.map