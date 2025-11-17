import { BlockViewExtension, CommandExtension, } from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';
import { commands } from './commands.js';
export const LatexBlockSpec = [
    BlockViewExtension('affine:latex', literal `affine-latex`),
    CommandExtension(commands),
];
//# sourceMappingURL=latex-spec.js.map