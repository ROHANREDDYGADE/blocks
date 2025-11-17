import type { Command } from '@blocksuite/block-std';
type UpdateBlockConfig = {
    flavour: BlockSuite.Flavour;
    props?: Record<string, unknown>;
};
export declare const updateBlockType: Command<'selectedBlocks', 'updatedBlocks', UpdateBlockConfig>;
export {};
//# sourceMappingURL=block-type.d.ts.map