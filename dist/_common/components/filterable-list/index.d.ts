import { type AdvancedPortalOptions } from '@blocksuite/affine-components/portal';
import { type Placement } from '@floating-ui/dom';
import { LitElement } from 'lit';
import type { FilterableListItem, FilterableListOptions } from './types.js';
export * from './types.js';
declare const FilterableListComponent_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class FilterableListComponent<Props = unknown> extends FilterableListComponent_base {
    static styles: import("lit").CSSResult;
    private _buildContent;
    private _filterItems;
    private _scrollFocusedItemIntoView;
    private _select;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _curFocusIndex;
    private accessor _filterInput;
    private accessor _filterText;
    private accessor _focussedItem;
    accessor abortController: AbortController | null;
    accessor listFilter: ((a: FilterableListItem<Props>, b: FilterableListItem<Props>) => number) | undefined;
    accessor options: FilterableListOptions<Props>;
    accessor placement: Placement | undefined;
}
export declare function showPopFilterableList({ options, filter, abortController, referenceElement, container, maxHeight, portalStyles, }: {
    options: FilterableListComponent['options'];
    referenceElement: Element;
    container?: Element;
    abortController?: AbortController;
    filter?: FilterableListComponent['listFilter'];
    maxHeight?: number;
    portalStyles?: AdvancedPortalOptions['portalStyles'];
}): void;
declare global {
    interface HTMLElementTagNameMap {
        'affine-filterable-list': FilterableListComponent;
    }
}
//# sourceMappingURL=index.d.ts.map