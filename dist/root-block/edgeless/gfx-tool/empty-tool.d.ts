import { BaseTool } from '@blocksuite/block-std/gfx';
/**
 * Empty tool that does nothing.
 */
export declare class EmptyTool extends BaseTool {
    static toolName: string;
}
declare module '@blocksuite/block-std/gfx' {
    interface GfxToolsMap {
        empty: EmptyTool;
    }
}
//# sourceMappingURL=empty-tool.d.ts.map