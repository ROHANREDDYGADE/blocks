import { viewPresets } from '@blocksuite/data-view/view-presets';
export const blockQueryViews = [
    viewPresets.tableViewMeta,
    viewPresets.kanbanViewMeta,
];
export const blockQueryViewMap = Object.fromEntries(blockQueryViews.map(view => [view.type, view]));
//# sourceMappingURL=index.js.map