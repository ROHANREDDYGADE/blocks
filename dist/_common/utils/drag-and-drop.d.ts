import type { BlockComponent } from '@blocksuite/block-std';
import type { BlockModel } from '@blocksuite/store';
import { type Point, Rect } from '@blocksuite/global/utils';
import type { EditingState } from '../types.js';
/**
 * A dropping type.
 */
export type DroppingType = 'none' | 'before' | 'after' | 'database';
export type DropResult = {
    type: DroppingType;
    rect: Rect;
    modelState: EditingState;
};
/**
 * Calculates the drop target.
 */
export declare function calcDropTarget(point: Point, model: BlockModel, element: Element, draggingElements?: BlockComponent[], scale?: number, flavour?: string | null): DropResult | null;
//# sourceMappingURL=drag-and-drop.d.ts.map