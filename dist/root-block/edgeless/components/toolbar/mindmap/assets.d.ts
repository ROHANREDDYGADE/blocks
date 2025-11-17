import type { TemplateResult } from 'lit';
import { ColorScheme, MindmapStyle } from '@blocksuite/affine-model';
import { type DraggableTool } from './basket-elements.js';
export type ToolbarMindmapItem = {
    type: 'mindmap';
    icon: TemplateResult;
    style: MindmapStyle;
    render: DraggableTool['render'];
};
export declare const getMindMaps: (theme: ColorScheme) => ToolbarMindmapItem[];
//# sourceMappingURL=assets.d.ts.map