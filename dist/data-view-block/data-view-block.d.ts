import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { type DataSource, type DataViewProps, type DataViewSelection, type DataViewWidget } from '@blocksuite/data-view';
import type { DataViewBlockModel } from './data-view-model.js';
import { type RootService } from '../root-block/index.js';
export declare class DataViewBlockComponent extends CaptionedBlockComponent<DataViewBlockModel> {
    static styles: import("lit").CSSResult;
    private _clickDatabaseOps;
    private _dataSource?;
    private dataView;
    _bindHotkey: DataViewProps['bindHotkey'];
    _handleEvent: DataViewProps['handleEvent'];
    getRootService: () => RootService | null;
    headerWidget: DataViewWidget;
    selection$: import("@preact/signals-core").ReadonlySignal<DataViewSelection | undefined>;
    setSelection: (selection: DataViewSelection | undefined) => void;
    toolsWidget: DataViewWidget;
    get dataSource(): DataSource;
    get topContenteditableElement(): import("@blocksuite/block-std").BlockComponent<import("@blocksuite/store").BlockModel<object, object & {}>, import("@blocksuite/block-std").BlockService, string> | null;
    get view(): import("@blocksuite/data-view").DataViewInstance<import("@blocksuite/data-view").SingleView> | undefined;
    private renderDatabaseOps;
    connectedCallback(): void;
    renderBlock(): import("lit-html").TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-data-view': DataViewBlockComponent;
    }
}
//# sourceMappingURL=data-view-block.d.ts.map