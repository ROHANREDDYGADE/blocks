import type { BlockCommands, Command } from '@blocksuite/block-std';
export declare const insertDatabaseBlockCommand: Command<'selectedModels', 'insertedDatabaseBlockId', {
    viewType: string;
    place?: 'after' | 'before';
    removeEmptyLine?: boolean;
}>;
export declare const commands: BlockCommands;
//# sourceMappingURL=commands.d.ts.map