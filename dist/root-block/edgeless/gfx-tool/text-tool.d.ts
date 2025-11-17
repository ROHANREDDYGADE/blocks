import type { PointerEventState } from '@blocksuite/block-std';
import { BaseTool, type GfxController } from '@blocksuite/block-std/gfx';
export declare function addText(gfx: GfxController, event: PointerEventState): void;
export declare class TextTool extends BaseTool {
    static toolName: string;
    click(e: PointerEventState): void;
}
declare module '@blocksuite/block-std/gfx' {
    interface GfxToolsMap {
        text: TextTool;
    }
}
//# sourceMappingURL=text-tool.d.ts.map