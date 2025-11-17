import { type NoteBlockModel } from '@blocksuite/affine-model';
import { LitElement, nothing, type TemplateResult } from 'lit';
import type { EdgelessColorPickerButton, PickColorEvent } from '../../edgeless/components/color-picker/index.js';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
declare const EdgelessChangeNoteButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessChangeNoteButton extends EdgelessChangeNoteButton_base {
    private _setBorderRadius;
    private _setNoteScale;
    pickColor: (event: PickColorEvent) => void;
    private get _advancedVisibilityEnabled();
    private get doc();
    private _getScaleLabel;
    private _handleNoteSlicerButtonClick;
    private _setBackground;
    private _setCollapse;
    private _setDisplayMode;
    private _setShadowType;
    private _setStrokeStyle;
    private _setStrokeWidth;
    private _setStyles;
    render(): Iterable<symbol | TemplateResult<1>>;
    private accessor _cornersPanelRef;
    private accessor _scalePanelRef;
    accessor backgroundButton: EdgelessColorPickerButton;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor enableNoteSlicer: boolean;
    accessor notes: NoteBlockModel[];
    accessor quickConnectButton: TemplateResult<1> | typeof nothing;
}
export declare function renderNoteButton(edgeless: EdgelessRootBlockComponent, notes?: NoteBlockModel[], quickConnectButton?: TemplateResult<1>[]): TemplateResult<1> | typeof nothing;
export {};
//# sourceMappingURL=change-note-button.d.ts.map