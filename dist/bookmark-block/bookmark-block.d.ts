import type { BookmarkBlockModel } from '@blocksuite/affine-model';
import { CaptionedBlockComponent, SelectedStyle } from '@blocksuite/affine-components/caption';
import { type StyleInfo, styleMap } from 'lit/directives/style-map.js';
import type { BookmarkBlockService } from './bookmark-service.js';
export declare class BookmarkBlockComponent extends CaptionedBlockComponent<BookmarkBlockModel, BookmarkBlockService> {
    private _fetchAbortController?;
    blockDraggable: boolean;
    protected containerStyleMap: ReturnType<typeof styleMap>;
    open: () => void;
    refreshData: () => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    renderBlock(): import("lit-html").TemplateResult<1>;
    protected accessor blockContainerStyles: StyleInfo;
    accessor bookmarkCard: HTMLElement;
    accessor error: boolean;
    accessor loading: boolean;
    accessor selectedStyle: SelectedStyle;
    accessor useCaptionEditor: boolean;
    accessor useZeroWidth: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-bookmark': BookmarkBlockComponent;
    }
}
//# sourceMappingURL=bookmark-block.d.ts.map