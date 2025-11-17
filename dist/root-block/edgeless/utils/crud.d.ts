import type { BlockStdScope } from '@blocksuite/block-std';
import type { BlockModel } from '@blocksuite/store';
import { type GfxController } from '@blocksuite/block-std/gfx';
import type { EdgelessRootBlockComponent } from '../index.js';
/**
 * Use deleteElementsV2 instead.
 * @deprecated
 */
export declare function deleteElements(edgeless: EdgelessRootBlockComponent, elements: BlockSuite.EdgelessModel[]): void;
export declare function deleteElementsV2(gfx: GfxController, elements: BlockSuite.EdgelessModel[]): void;
export declare function addBlock(std: BlockStdScope, flavour: BlockSuite.EdgelessModelKeys, props: Record<string, unknown>, parentId?: string | BlockModel, parentIndex?: number): string;
//# sourceMappingURL=crud.d.ts.map