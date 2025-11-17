import type { DatabaseBlockModel } from '@blocksuite/affine-model';
import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { DragIndicator } from '@blocksuite/affine-components/drag-indicator';
import { type DataViewInstance, type DataViewProps, type DataViewSelection, type DataViewWidget, type SingleView } from '@blocksuite/data-view';
import type { DatabaseOptionsConfig } from './config.js';
import type { DatabaseBlockService } from './database-service.js';
import { DatabaseBlockDataSource } from './data-source.js';
export declare class DatabaseBlockComponent extends CaptionedBlockComponent<DatabaseBlockModel, DatabaseBlockService> {
    static styles: import("lit").CSSResult;
    private _clickDatabaseOps;
    private _dataSource?;
    private dataView;
    private renderTitle;
    _bindHotkey: DataViewProps['bindHotkey'];
    _handleEvent: DataViewProps['handleEvent'];
    createTemplate: (data: {
        view: SingleView;
        rowId: string;
    }, openDoc: (docId: string) => void) => import("lit-html").TemplateResult<2 | 3 | 1>;
    headerWidget: DataViewWidget;
    indicator: DragIndicator;
    onDrag: (evt: MouseEvent, id: string) => (() => void);
    setSelection: (selection: DataViewSelection | undefined) => void;
    toolsWidget: DataViewWidget;
    viewSelection$: import("@preact/signals-core").ReadonlySignal<DataViewSelection | undefined>;
    virtualPadding$: import("@preact/signals-core").Signal<number>;
    get dataSource(): DatabaseBlockDataSource;
    get optionsConfig(): DatabaseOptionsConfig;
    get topContenteditableElement(): import("@blocksuite/block-std").BlockComponent<import("@blocksuite/store").BlockModel<object, object & {}>, import("@blocksuite/block-std").BlockService, string> | null;
    get view(): DataViewInstance<SingleView> | undefined;
    private renderDatabaseOps;
    connectedCallback(): void;
    listenFullWidthChange(): void;
    renderBlock(): import("lit-html").TemplateResult<1>;
    accessor useZeroWidth: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-database': DatabaseBlockComponent;
    }
}
//# sourceMappingURL=database-block.d.ts.map