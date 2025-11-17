import { type BlockModel, type Doc } from '@blocksuite/store';
/**
 * This file should only contain functions that are used to
 * operate on block models in store, which means that this operations
 * just operate on data and will not involve in something about ui like selection reset.
 */
export declare function mergeToCodeModel(models: BlockModel[]): string | null;
export declare function transformModel(model: BlockModel, flavour: BlockSuite.Flavour, props?: Parameters<Doc['addBlock']>[1]): string;
//# sourceMappingURL=model.d.ts.map