import type { GfxToolsFullOptionValue } from '@blocksuite/block-std/gfx';
import { LitElement } from 'lit';
import type { NoteToolOption } from '../../../gfx-tool/note-tool.js';
declare const EdgelessNoteToolButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/quick-tool.mixin.js").QuickToolMixinClass>;
export declare class EdgelessNoteToolButton extends EdgelessNoteToolButton_base {
    static styles: import("lit").CSSResult;
    private _noteMenu;
    private _states;
    type: GfxToolsFullOptionValue['type'];
    private _disposeMenu;
    private _toggleNoteMenu;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor childFlavour: NoteToolOption['childFlavour'];
    accessor childType: string;
    accessor tip: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-note-tool-button': EdgelessNoteToolButton;
    }
}
export {};
//# sourceMappingURL=note-tool-button.d.ts.map