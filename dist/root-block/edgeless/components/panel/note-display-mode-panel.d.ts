import { NoteDisplayMode } from '@blocksuite/affine-model';
import { LitElement } from 'lit';
declare const NoteDisplayModePanel_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class NoteDisplayModePanel extends NoteDisplayModePanel_base {
    static styles: import("lit").CSSResult;
    private _DisplayModeIcon;
    private _DisplayModeLabel;
    render(): unknown;
    accessor displayMode: NoteDisplayMode;
    accessor onSelect: (displayMode: NoteDisplayMode) => void;
    accessor panelWidth: number;
}
declare global {
    interface HTMLElementTagNameMap {
        'note-display-mode-panel': NoteDisplayModePanel;
    }
}
export {};
//# sourceMappingURL=note-display-mode-panel.d.ts.map