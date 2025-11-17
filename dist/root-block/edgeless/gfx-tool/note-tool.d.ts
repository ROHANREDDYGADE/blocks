import type { PointerEventState } from '@blocksuite/block-std';
import { BaseTool } from '@blocksuite/block-std/gfx';
import { type NoteChildrenFlavour } from '../../../_common/utils/index.js';
export type NoteToolOption = {
    childFlavour: NoteChildrenFlavour;
    childType: string | null;
    tip: string;
};
export declare class NoteTool extends BaseTool<NoteToolOption> {
    static toolName: string;
    private _draggingNoteOverlay;
    private _noteOverlay;
    private _clearOverlay;
    private _disposeOverlay;
    private _hideOverlay;
    private _resize;
    private _updateOverlayPosition;
    activate(): void;
    click(e: PointerEventState): void;
    deactivate(): void;
    dragEnd(): void;
    dragMove(e: PointerEventState): void;
    dragStart(): void;
    mounted(): void;
    pointerMove(e: PointerEventState): void;
    pointerOut(e: PointerEventState): void;
}
declare module '@blocksuite/block-std/gfx' {
    interface GfxToolsMap {
        'affine:note': NoteTool;
    }
    interface GfxToolsOption {
        'affine:note': NoteToolOption;
    }
}
//# sourceMappingURL=note-tool.d.ts.map