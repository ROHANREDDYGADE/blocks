import type { PointerEventState } from '@blocksuite/block-std';
import { DefaultModeDragType, DefaultToolExt } from './ext.js';
export declare class CanvasElementEventExt extends DefaultToolExt {
    private _currentStackedElm;
    supportedDragTypes: DefaultModeDragType[];
    private _callInReverseOrder;
    click(_evt: PointerEventState): void;
    dblClick(_evt: PointerEventState): void;
    pointerDown(_evt: PointerEventState): void;
    pointerMove(_evt: PointerEventState): void;
    pointerUp(_evt: PointerEventState): void;
}
//# sourceMappingURL=event-ext.d.ts.map