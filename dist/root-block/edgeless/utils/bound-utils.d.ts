import type { SerializedElement } from '@blocksuite/block-std/gfx';
import { Bound } from '@blocksuite/global/utils';
import { type BlockSnapshot } from '@blocksuite/store';
export declare function getBoundFromSerializedElement(element: SerializedElement): Bound;
export declare function getBoundFromGfxBlockSnapshot(snapshot: BlockSnapshot): Bound | null;
export declare function edgelessElementsBoundFromRawData(elementsRawData: (SerializedElement | BlockSnapshot)[]): Bound;
//# sourceMappingURL=bound-utils.d.ts.map