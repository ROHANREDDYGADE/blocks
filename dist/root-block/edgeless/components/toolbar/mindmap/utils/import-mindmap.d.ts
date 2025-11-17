import type { Bound } from '@blocksuite/global/utils';
type MindMapNode = {
    children: MindMapNode[];
    text: string;
    xywh?: string;
    title?: string;
    layoutType?: 'left' | 'right';
};
export declare function importMindmap(bound: Bound): Promise<MindMapNode>;
export {};
//# sourceMappingURL=import-mindmap.d.ts.map