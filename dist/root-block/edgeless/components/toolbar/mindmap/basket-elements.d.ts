import type { TemplateResult } from 'lit';
import { type MindmapStyle } from '@blocksuite/affine-model';
import { Bound } from '@blocksuite/global/utils';
import type { EdgelessRootBlockComponent } from '../../../edgeless-root-block.js';
import type { EdgelessRootService } from '../../../edgeless-root-service.js';
export type ConfigProperty = 'x' | 'y' | 'r' | 's' | 'z' | 'o';
export type ConfigState = 'default' | 'active' | 'hover' | 'next';
export type ConfigStyle = Partial<Record<ConfigProperty, number | string>>;
export type ToolConfig = Record<ConfigState, ConfigStyle>;
export type DraggableTool = {
    name: 'text' | 'mindmap';
    icon: TemplateResult;
    config: ToolConfig;
    standardWidth?: number;
    render: (bound: Bound, edgelessService: EdgelessRootService, edgeless: EdgelessRootBlockComponent) => string;
};
export declare const textConfig: ToolConfig;
export declare const mindmapConfig: ToolConfig;
export declare const getMindmapRender: (mindmapStyle: MindmapStyle) => DraggableTool["render"];
export declare const textRender: DraggableTool['render'];
export declare const toolConfig2StyleObj: (config: ToolConfig) => Record<string, string>;
//# sourceMappingURL=basket-elements.d.ts.map