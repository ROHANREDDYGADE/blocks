import { BaseTool } from '@blocksuite/block-std/gfx';
export declare class TemplateTool extends BaseTool {
    static toolName: string;
}
declare module '@blocksuite/block-std/gfx' {
    interface GfxToolsMap {
        template: TemplateTool;
    }
}
//# sourceMappingURL=template-tool.d.ts.map