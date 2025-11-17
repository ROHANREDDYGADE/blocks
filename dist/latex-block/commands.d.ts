import type { BlockCommands, Command } from '@blocksuite/block-std';
export declare const insertLatexBlockCommand: Command<'selectedModels', 'insertedLatexBlockId', {
    latex?: string;
    place?: 'after' | 'before';
    removeEmptyLine?: boolean;
}>;
export declare const commands: BlockCommands;
//# sourceMappingURL=commands.d.ts.map