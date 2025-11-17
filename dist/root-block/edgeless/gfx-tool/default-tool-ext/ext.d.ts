import type { PointerEventState } from '@blocksuite/block-std';
import type { GfxModel } from '@blocksuite/block-std/gfx';
import type { DefaultTool } from '../default-tool.js';
export declare enum DefaultModeDragType {
    /** press alt/option key to clone selected  */
    AltCloning = "alt-cloning",
    /** Moving connector label */
    ConnectorLabelMoving = "connector-label-moving",
    /** Moving selected contents */
    ContentMoving = "content-moving",
    /** Native range dragging inside active note block */
    NativeEditing = "native-editing",
    /** Default void state */
    None = "none",
    /** Dragging preview */
    PreviewDragging = "preview-dragging",
    /** Expanding the dragging area, select the content covered inside */
    Selecting = "selecting"
}
export type DragState = {
    movedElements: GfxModel[];
    dragType: DefaultModeDragType;
    event: PointerEventState;
};
export declare class DefaultToolExt {
    protected defaultTool: DefaultTool;
    readonly supportedDragTypes: DefaultModeDragType[];
    get gfx(): import("@blocksuite/block-std/gfx").GfxController;
    get std(): import("@blocksuite/block-std").BlockStdScope;
    constructor(defaultTool: DefaultTool);
    click(_evt: PointerEventState): void;
    dblClick(_evt: PointerEventState): void;
    initDrag(_: DragState): {
        dragStart?: (evt: PointerEventState) => void;
        dragMove?: (evt: PointerEventState) => void;
        dragEnd?: (evt: PointerEventState) => void;
    };
    mounted(): void;
    pointerDown(_evt: PointerEventState): void;
    pointerMove(_evt: PointerEventState): void;
    pointerUp(_evt: PointerEventState): void;
    unmounted(): void;
}
//# sourceMappingURL=ext.d.ts.map