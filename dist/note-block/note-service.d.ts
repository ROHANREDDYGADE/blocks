import { BlockService } from '@blocksuite/block-std';
export declare class NoteBlockService extends BlockService {
    static readonly flavour: "affine:note";
    private _anchorSel;
    private _bindMoveBlockHotKey;
    private _bindQuickActionHotKey;
    private _bindTextConversionHotKey;
    private _focusBlock;
    private _getClosestNoteByBlockId;
    private _onArrowDown;
    private _onArrowUp;
    private _onBlockShiftDown;
    private _onBlockShiftUp;
    private _onEnter;
    private _onEsc;
    private _onSelectAll;
    private _onShiftArrowDown;
    private _onShiftArrowUp;
    private _reset;
    private get _std();
    mounted(): void;
}
export declare const NoteDragHandleOption: import("@blocksuite/block-std").ExtensionType;
//# sourceMappingURL=note-service.d.ts.map