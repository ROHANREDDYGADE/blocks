import { LitElement } from 'lit';
import type { NoteToolOption } from '../../../gfx-tool/note-tool.js';
declare const EdgelessNoteSeniorButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/tool.mixin.js").EdgelessToolbarToolClass>;
export declare class EdgelessNoteSeniorButton extends EdgelessNoteSeniorButton_base {
    static styles: import("lit").CSSResult;
    private _noteBg$;
    private _states;
    enableActiveBackground: boolean;
    type: "affine:note";
    private _toggleNoteMenu;
    render(): import("lit-html").TemplateResult<1>;
    accessor childFlavour: NoteToolOption['childFlavour'];
    accessor childType: string;
    accessor tip: string;
}
export {};
//# sourceMappingURL=note-senior-button.d.ts.map