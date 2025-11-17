import { BlockViewExtension, CommandExtension, FlavourExtension, } from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';
import { DocNoteBlockAdapterExtensions, EdgelessNoteBlockAdapterExtensions, } from './adapters/index.js';
import { commands } from './commands/index.js';
import { NoteBlockService, NoteDragHandleOption } from './note-service.js';
export const NoteBlockSpec = [
    FlavourExtension('affine:note'),
    NoteBlockService,
    CommandExtension(commands),
    BlockViewExtension('affine:note', literal `affine-note`),
    DocNoteBlockAdapterExtensions,
].flat();
export const EdgelessNoteBlockSpec = [
    FlavourExtension('affine:note'),
    NoteBlockService,
    CommandExtension(commands),
    BlockViewExtension('affine:note', literal `affine-edgeless-note`),
    NoteDragHandleOption,
    EdgelessNoteBlockAdapterExtensions,
].flat();
//# sourceMappingURL=note-spec.js.map