import type { GfxToolsFullOptionValue } from '@blocksuite/block-std/gfx';
import { LitElement } from 'lit';
import type { NoteToolOption } from '../../../gfx-tool/note-tool.js';
import { type NoteChildrenFlavour } from '../../../../../_common/utils/index.js';
declare const EdgelessNoteMenu_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/tool.mixin.js").EdgelessToolbarToolClass>;
export declare class EdgelessNoteMenu extends EdgelessNoteMenu_base {
    static styles: import("lit").CSSResult;
    type: GfxToolsFullOptionValue['type'];
    private _addImages;
    private _onHandleLinkButtonClick;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _imageLoading;
    accessor childFlavour: NoteChildrenFlavour;
    accessor childType: string | null;
    accessor onChange: (props: Partial<{
        childFlavour: NoteToolOption['childFlavour'];
        childType: string | null;
        tip: string;
    }>) => void;
    accessor tip: string;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-note-menu': EdgelessNoteMenu;
    }
}
export {};
//# sourceMappingURL=note-menu.d.ts.map