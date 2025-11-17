import { BlockViewExtension, CommandExtension, } from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';
import { commands } from './commands/index.js';
export const EdgelessTextBlockSpec = [
    CommandExtension(commands),
    BlockViewExtension('affine:edgeless-text', literal `affine-edgeless-text`),
];
//# sourceMappingURL=edgeless-text-spec.js.map