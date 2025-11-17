import type { TemplateResult } from 'lit';
import type { NoteChildrenFlavour } from '../../../../../_common/utils/index.js';
export declare const BUTTON_GROUP_LENGTH = 10;
export type NoteMenuItem = {
    icon: TemplateResult<1>;
    tooltip: string;
    childFlavour: NoteChildrenFlavour;
    childType: string | null;
};
export declare const NOTE_MENU_ITEMS: NoteMenuItem[];
//# sourceMappingURL=note-menu-config.d.ts.map