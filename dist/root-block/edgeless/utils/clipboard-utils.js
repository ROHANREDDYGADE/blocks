import { generateKeyBetweenV2, } from '@blocksuite/block-std/gfx';
import { getCommonBoundWithRotation, groupBy } from '@blocksuite/global/utils';
import { BlockSnapshotSchema } from '@blocksuite/store';
import { EdgelessFrameManager } from '../frame-manager.js';
import { getSortedCloneElements, prepareCloneData } from './clone-utils.js';
import { getElementsWithoutGroup } from './group.js';
import { isEdgelessTextBlock, isEmbedSyncedDocBlock, isFrameBlock, isImageBlock, isNoteBlock, } from './query.js';
const offset = 10;
export async function duplicate(edgeless, elements, select = true) {
    const { clipboardController } = edgeless;
    const copyElements = getSortedCloneElements(elements);
    const totalBound = getCommonBoundWithRotation(copyElements);
    totalBound.x += totalBound.w + offset;
    const snapshot = prepareCloneData(copyElements, edgeless.std);
    const { canvasElements, blockModels } = await clipboardController.createElementsFromClipboardData(snapshot, totalBound.center);
    const newElements = [...canvasElements, ...blockModels];
    edgeless.surface.fitToViewport(totalBound);
    if (select) {
        edgeless.service.selection.set({
            elements: newElements.map(e => e.id),
            editing: false,
        });
    }
}
export const splitElements = (elements) => {
    const { notes, frames, shapes, images, edgelessTexts, embedSyncedDocs } = groupBy(getElementsWithoutGroup(elements), element => {
        if (isNoteBlock(element)) {
            return 'notes';
        }
        else if (isFrameBlock(element)) {
            return 'frames';
        }
        else if (isImageBlock(element)) {
            return 'images';
        }
        else if (isEdgelessTextBlock(element)) {
            return 'edgelessTexts';
        }
        else if (isEmbedSyncedDocBlock(element)) {
            return 'embedSyncedDocs';
        }
        return 'shapes';
    });
    return {
        notes: notes ?? [],
        shapes: shapes ?? [],
        frames: frames ?? [],
        images: images ?? [],
        edgelessTexts: edgelessTexts ?? [],
        embedSyncedDocs: embedSyncedDocs ?? [],
    };
};
export function createNewPresentationIndexes(raw, edgeless) {
    const frames = raw
        .filter((block) => {
        const { data } = BlockSnapshotSchema.safeParse(block);
        return data?.flavour === 'affine:frame';
    })
        .sort((a, b) => EdgelessFrameManager.framePresentationComparator(a.props, b.props));
    const frameMgr = edgeless.service.frame;
    let before = frameMgr.generatePresentationIndex();
    const result = new Map();
    frames.forEach(frame => {
        result.set(frame.id, before);
        before = generateKeyBetweenV2(before, null);
    });
    return result;
}
//# sourceMappingURL=clipboard-utils.js.map