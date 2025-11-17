import type { MenuConfig } from '@blocksuite/affine-components/context-menu';
import type { GfxToolsMap } from '@blocksuite/block-std/gfx';
import { type TemplateResult } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
export interface QuickTool {
    type?: keyof GfxToolsMap;
    content: TemplateResult;
    /**
     * if not configured, the tool will not be shown in dense mode
     */
    menu?: MenuConfig;
}
export interface SeniorTool {
    /**
     * Used to show in nav-button's tooltip
     */
    name: string;
    content: TemplateResult;
}
/**
 * Get quick-tool list
 */
export declare const getQuickTools: ({ edgeless, }: {
    edgeless: EdgelessRootBlockComponent;
}) => QuickTool[];
export declare const getSeniorTools: ({ edgeless, toolbarContainer, }: {
    edgeless: EdgelessRootBlockComponent;
    toolbarContainer: HTMLElement;
}) => SeniorTool[];
//# sourceMappingURL=tools.d.ts.map