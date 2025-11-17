import type { BlockStdScope } from '@blocksuite/block-std';
interface MoveBlockConfig {
    name: string;
    hotkey: string[];
    action: (std: BlockStdScope) => void;
}
export declare const moveBlockConfigs: MoveBlockConfig[];
export {};
//# sourceMappingURL=move-block.d.ts.map