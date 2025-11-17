import { ColorScheme, MindmapStyle } from '@blocksuite/affine-model';
import { getMindmapRender } from './basket-elements.js';
import { mindMapStyle1Dark, mindMapStyle1Light, mindMapStyle2Dark, mindMapStyle2Light, mindMapStyle3, mindMapStyle4, } from './icons.js';
export const getMindMaps = (theme) => [
    {
        type: 'mindmap',
        icon: theme === ColorScheme.Dark ? mindMapStyle1Dark : mindMapStyle1Light,
        style: MindmapStyle.ONE,
        render: getMindmapRender(MindmapStyle.ONE),
    },
    {
        type: 'mindmap',
        icon: mindMapStyle4,
        style: MindmapStyle.FOUR,
        render: getMindmapRender(MindmapStyle.FOUR),
    },
    {
        type: 'mindmap',
        icon: mindMapStyle3,
        style: MindmapStyle.THREE,
        render: getMindmapRender(MindmapStyle.THREE),
    },
    {
        type: 'mindmap',
        icon: theme === 'light' ? mindMapStyle2Light : mindMapStyle2Dark,
        style: MindmapStyle.TWO,
        render: getMindmapRender(MindmapStyle.TWO),
    },
];
//# sourceMappingURL=assets.js.map