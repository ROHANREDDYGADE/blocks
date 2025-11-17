import { BaseTool } from '@blocksuite/block-std/gfx';
import type { NavigatorMode } from '../../../_common/edgeless/frame/consts.js';
type PresentToolOption = {
    mode?: NavigatorMode;
};
export declare class PresentTool extends BaseTool<PresentToolOption> {
    static toolName: string;
}
declare module '@blocksuite/block-std/gfx' {
    interface GfxToolsMap {
        frameNavigator: PresentTool;
    }
    interface GfxToolsOption {
        frameNavigator: PresentToolOption;
    }
}
export {};
//# sourceMappingURL=frame-navigator-tool.d.ts.map