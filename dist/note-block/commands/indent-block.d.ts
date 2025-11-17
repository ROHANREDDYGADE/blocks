import type { Command } from '@blocksuite/block-std';
/**
 * @example
 * before indent:
 * - aaa
 *   - bbb
 * - ccc|
 *   - ddd
 *   - eee
 *
 * after indent:
 * - aaa
 *   - bbb
 *   - ccc|
 *     - ddd
 *     - eee
 */
export declare const indentBlock: Command<never, never, {
    blockId?: string;
    stopCapture?: boolean;
}>;
//# sourceMappingURL=indent-block.d.ts.map