import { WidgetComponent } from '@blocksuite/block-std';
import { nothing, type PropertyValues } from 'lit';
import type { EdgelessRootBlockComponent, NoteBlockComponent, RootBlockModel } from '../../../../index.js';
export declare const NOTE_SLICER_WIDGET = "note-slicer";
export declare class NoteSlicer extends WidgetComponent<RootBlockModel, EdgelessRootBlockComponent> {
    static styles: import("lit").CSSResult;
    private _divingLinePositions;
    private _hidden;
    private _noteBlockIds;
    private _noteDisposables;
    get _editorHost(): import("@blocksuite/block-std").EditorHost;
    get _noteBlock(): NoteBlockComponent | null;
    get _selection(): import("@blocksuite/block-std/gfx").GfxSelectionManager;
    get _viewportOffset(): {
        left: number;
        top: number;
    };
    get _zoom(): number;
    get gfx(): import("@blocksuite/block-std/gfx").GfxController;
    get selectedRectEle(): import("../rects/edgeless-selected-rect.js").EdgelessSelectedRectWidget;
    private _sliceNote;
    private _updateActiveSlicerIndex;
    private _updateDivingLineAndBlockIds;
    private _updateSlicedNote;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    protected updated(_changedProperties: PropertyValues): void;
    private accessor _activeSlicerIndex;
    private accessor _anchorNote;
    private accessor _enableNoteSlicer;
    private accessor _isResizing;
}
declare global {
    interface HTMLElementTagNameMap {
        'note-slicer': NoteSlicer;
    }
}
//# sourceMappingURL=index.d.ts.map