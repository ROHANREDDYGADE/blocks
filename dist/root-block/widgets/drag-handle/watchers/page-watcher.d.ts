import type { PageRootBlockComponent } from '../../../page/page-root-block.js';
import type { AffineDragHandleWidget } from '../drag-handle.js';
export declare class PageWatcher {
    readonly widget: AffineDragHandleWidget;
    get pageRoot(): PageRootBlockComponent;
    constructor(widget: AffineDragHandleWidget);
    watch(): void;
}
//# sourceMappingURL=page-watcher.d.ts.map