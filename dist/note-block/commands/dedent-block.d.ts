import type { Command } from '@blocksuite/block-std';
/**
 * @example
 * before unindent:
 * - aaa
 *   - bbb
 *   - ccc|
 *     - ddd
 *   - eee
 *
 * after unindent:
 * - aaa
 *   - bbb
 * - ccc|
 *   - ddd
 *   - eee
 */
export declare const dedentBlock: Command<never, never, {
    blockId?: string;
    stopCapture?: boolean;
}>;
//# sourceMappingURL=dedent-block.d.ts.map