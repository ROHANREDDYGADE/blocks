import type { IVec } from '@blocksuite/global/utils';
import { nothing } from 'lit';
export declare enum HandleDirection {
    Bottom = "bottom",
    BottomLeft = "bottom-left",
    BottomRight = "bottom-right",
    Left = "left",
    Right = "right",
    Top = "top",
    TopLeft = "top-left",
    TopRight = "top-right"
}
/**
 * Indicate how selected elements can be resized.
 *
 * - edge: The selected elements can only be resized dragging edge, usually when note element is selected
 * - all: The selected elements can be resize both dragging edge or corner, usually when all elements are `shape`
 * - none: The selected elements can't be resized, usually when all elements are `connector`
 * - corner: The selected elements can only be resize dragging corner, this is by default mode
 * - edgeAndCorner: The selected elements can be resize both dragging left right edge or corner, usually when all elements are 'text'
 */
export type ResizeMode = 'edge' | 'all' | 'none' | 'corner' | 'edgeAndCorner';
export declare function ResizeHandles(resizeMode: ResizeMode, onPointerDown: (e: PointerEvent, direction: HandleDirection) => void, updateCursor?: (dragging: boolean, options?: {
    type: 'resize' | 'rotate';
    target?: HTMLElement;
    point?: IVec;
}) => void): import("lit-html").TemplateResult<1> | typeof nothing;
//# sourceMappingURL=resize-handles.d.ts.map