import { viewConverts, viewPresets } from '@blocksuite/data-view/view-presets';
export const databaseBlockViews = [
    viewPresets.tableViewMeta,
    viewPresets.kanbanViewMeta,
];
export const databaseBlockViewMap = Object.fromEntries(databaseBlockViews.map(view => [view.type, view]));
export const databaseBlockViewConverts = [...viewConverts];
//# sourceMappingURL=index.js.map