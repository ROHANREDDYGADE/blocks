var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { createLitPortal, } from '@blocksuite/affine-components/portal';
import { WithDisposable } from '@blocksuite/global/utils';
import { DoneIcon, SearchIcon } from '@blocksuite/icons/lit';
import { autoPlacement, offset, size } from '@floating-ui/dom';
import { html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { PAGE_HEADER_HEIGHT } from '../../consts.js';
import { filterableListStyles } from './styles.js';
export * from './types.js';
let FilterableListComponent = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __curFocusIndex_decorators;
    let __curFocusIndex_initializers = [];
    let __curFocusIndex_extraInitializers = [];
    let __filterInput_decorators;
    let __filterInput_initializers = [];
    let __filterInput_extraInitializers = [];
    let __filterText_decorators;
    let __filterText_initializers = [];
    let __filterText_extraInitializers = [];
    let __focussedItem_decorators;
    let __focussedItem_initializers = [];
    let __focussedItem_extraInitializers = [];
    let _abortController_decorators;
    let _abortController_initializers = [];
    let _abortController_extraInitializers = [];
    let _listFilter_decorators;
    let _listFilter_initializers = [];
    let _listFilter_extraInitializers = [];
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    let _placement_decorators;
    let _placement_initializers = [];
    let _placement_extraInitializers = [];
    return class FilterableListComponent extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __curFocusIndex_decorators = [state()];
            __filterInput_decorators = [query('#filter-input')];
            __filterText_decorators = [state()];
            __focussedItem_decorators = [query('.filterable-item.focussed')];
            _abortController_decorators = [property({ attribute: false })];
            _listFilter_decorators = [property({ attribute: false })];
            _options_decorators = [property({ attribute: false })];
            _placement_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __curFocusIndex_decorators, { kind: "accessor", name: "_curFocusIndex", static: false, private: false, access: { has: obj => "_curFocusIndex" in obj, get: obj => obj._curFocusIndex, set: (obj, value) => { obj._curFocusIndex = value; } }, metadata: _metadata }, __curFocusIndex_initializers, __curFocusIndex_extraInitializers);
            __esDecorate(this, null, __filterInput_decorators, { kind: "accessor", name: "_filterInput", static: false, private: false, access: { has: obj => "_filterInput" in obj, get: obj => obj._filterInput, set: (obj, value) => { obj._filterInput = value; } }, metadata: _metadata }, __filterInput_initializers, __filterInput_extraInitializers);
            __esDecorate(this, null, __filterText_decorators, { kind: "accessor", name: "_filterText", static: false, private: false, access: { has: obj => "_filterText" in obj, get: obj => obj._filterText, set: (obj, value) => { obj._filterText = value; } }, metadata: _metadata }, __filterText_initializers, __filterText_extraInitializers);
            __esDecorate(this, null, __focussedItem_decorators, { kind: "accessor", name: "_focussedItem", static: false, private: false, access: { has: obj => "_focussedItem" in obj, get: obj => obj._focussedItem, set: (obj, value) => { obj._focussedItem = value; } }, metadata: _metadata }, __focussedItem_initializers, __focussedItem_extraInitializers);
            __esDecorate(this, null, _abortController_decorators, { kind: "accessor", name: "abortController", static: false, private: false, access: { has: obj => "abortController" in obj, get: obj => obj.abortController, set: (obj, value) => { obj.abortController = value; } }, metadata: _metadata }, _abortController_initializers, _abortController_extraInitializers);
            __esDecorate(this, null, _listFilter_decorators, { kind: "accessor", name: "listFilter", static: false, private: false, access: { has: obj => "listFilter" in obj, get: obj => obj.listFilter, set: (obj, value) => { obj.listFilter = value; } }, metadata: _metadata }, _listFilter_initializers, _listFilter_extraInitializers);
            __esDecorate(this, null, _options_decorators, { kind: "accessor", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            __esDecorate(this, null, _placement_decorators, { kind: "accessor", name: "placement", static: false, private: false, access: { has: obj => "placement" in obj, get: obj => obj.placement, set: (obj, value) => { obj.placement = value; } }, metadata: _metadata }, _placement_initializers, _placement_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = filterableListStyles; }
        _buildContent(items) {
            return items.map((item, idx) => {
                const focussed = this._curFocusIndex === idx;
                return html `
        <icon-button
          class=${classMap({
                    'filterable-item': true,
                    focussed,
                })}
          @mouseover=${() => (this._curFocusIndex = idx)}
          @click=${() => this._select(item)}
          hover=${focussed}
          width="100%"
          height="32px"
        >
          ${item.icon ?? nothing} ${item.label ?? item.name}
          <div slot="suffix">
            ${this.options.active?.(item) ? DoneIcon() : nothing}
          </div>
        </icon-button>
      `;
            });
        }
        _filterItems() {
            const searchFilter = !this._filterText
                ? this.options.items
                : this.options.items.filter(item => item.name.startsWith(this._filterText.toLowerCase()) ||
                    item.aliases?.some(alias => alias.startsWith(this._filterText.toLowerCase())));
            return searchFilter.sort((a, b) => {
                const isActiveA = this.options.active?.(a);
                const isActiveB = this.options.active?.(b);
                if (isActiveA && !isActiveB)
                    return -1;
                if (!isActiveA && isActiveB)
                    return 1;
                return this.listFilter?.(a, b) ?? 0;
            });
        }
        _scrollFocusedItemIntoView() {
            this.updateComplete
                .then(() => {
                this._focussedItem?.scrollIntoView({
                    block: 'nearest',
                    inline: 'start',
                });
            })
                .catch(console.error);
        }
        _select(item) {
            this.abortController?.abort();
            this.options.onSelect(item);
        }
        connectedCallback() {
            super.connectedCallback();
            requestAnimationFrame(() => {
                this._filterInput.focus();
            });
        }
        render() {
            const filteredItems = this._filterItems();
            const content = this._buildContent(filteredItems);
            const isFlip = !!this.placement?.startsWith('top');
            const _handleInputKeydown = (ev) => {
                switch (ev.key) {
                    case 'ArrowUp': {
                        ev.preventDefault();
                        this._curFocusIndex =
                            (this._curFocusIndex + content.length - 1) % content.length;
                        this._scrollFocusedItemIntoView();
                        break;
                    }
                    case 'ArrowDown': {
                        ev.preventDefault();
                        this._curFocusIndex = (this._curFocusIndex + 1) % content.length;
                        this._scrollFocusedItemIntoView();
                        break;
                    }
                    case 'Enter': {
                        if (ev.isComposing)
                            break;
                        ev.preventDefault();
                        const item = filteredItems[this._curFocusIndex];
                        this._select(item);
                        break;
                    }
                    case 'Escape': {
                        ev.preventDefault();
                        this.abortController?.abort();
                        break;
                    }
                }
            };
            return html `
      <div
        class=${classMap({ 'affine-filterable-list': true, flipped: isFlip })}
      >
        <div class="input-wrapper">
          ${SearchIcon()}
          <input
            id="filter-input"
            type="text"
            placeholder=${this.options?.placeholder ?? 'Search'}
            @input="${() => {
                this._filterText = this._filterInput?.value;
                this._curFocusIndex = 0;
            }}"
            @keydown="${_handleInputKeydown}"
          />
        </div>

        <editor-toolbar-separator
          data-orientation="horizontal"
        ></editor-toolbar-separator>
        <div class="items-container">${content}</div>
      </div>
    `;
        }
        #_curFocusIndex_accessor_storage = __runInitializers(this, __curFocusIndex_initializers, 0);
        get _curFocusIndex() { return this.#_curFocusIndex_accessor_storage; }
        set _curFocusIndex(value) { this.#_curFocusIndex_accessor_storage = value; }
        #_filterInput_accessor_storage = (__runInitializers(this, __curFocusIndex_extraInitializers), __runInitializers(this, __filterInput_initializers, void 0));
        get _filterInput() { return this.#_filterInput_accessor_storage; }
        set _filterInput(value) { this.#_filterInput_accessor_storage = value; }
        #_filterText_accessor_storage = (__runInitializers(this, __filterInput_extraInitializers), __runInitializers(this, __filterText_initializers, ''));
        get _filterText() { return this.#_filterText_accessor_storage; }
        set _filterText(value) { this.#_filterText_accessor_storage = value; }
        #_focussedItem_accessor_storage = (__runInitializers(this, __filterText_extraInitializers), __runInitializers(this, __focussedItem_initializers, void 0));
        get _focussedItem() { return this.#_focussedItem_accessor_storage; }
        set _focussedItem(value) { this.#_focussedItem_accessor_storage = value; }
        #abortController_accessor_storage = (__runInitializers(this, __focussedItem_extraInitializers), __runInitializers(this, _abortController_initializers, null));
        get abortController() { return this.#abortController_accessor_storage; }
        set abortController(value) { this.#abortController_accessor_storage = value; }
        #listFilter_accessor_storage = (__runInitializers(this, _abortController_extraInitializers), __runInitializers(this, _listFilter_initializers, undefined));
        get listFilter() { return this.#listFilter_accessor_storage; }
        set listFilter(value) { this.#listFilter_accessor_storage = value; }
        #options_accessor_storage = (__runInitializers(this, _listFilter_extraInitializers), __runInitializers(this, _options_initializers, void 0));
        get options() { return this.#options_accessor_storage; }
        set options(value) { this.#options_accessor_storage = value; }
        #placement_accessor_storage = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _placement_initializers, undefined));
        get placement() { return this.#placement_accessor_storage; }
        set placement(value) { this.#placement_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _placement_extraInitializers);
        }
    };
})();
export { FilterableListComponent };
export function showPopFilterableList({ options, filter, abortController = new AbortController(), referenceElement, container, maxHeight = 440, portalStyles, }) {
    const portalPadding = {
        top: PAGE_HEADER_HEIGHT + 12,
        bottom: 12,
    };
    const list = new FilterableListComponent();
    list.options = options;
    list.listFilter = filter;
    list.abortController = abortController;
    createLitPortal({
        closeOnClickAway: true,
        template: ({ positionSlot }) => {
            positionSlot.on(({ placement }) => {
                list.placement = placement;
            });
            return list;
        },
        container,
        portalStyles,
        computePosition: {
            referenceElement,
            placement: 'bottom-start',
            middleware: [
                offset(4),
                autoPlacement({
                    allowedPlacements: ['top-start', 'bottom-start'],
                    padding: portalPadding,
                }),
                size({
                    padding: portalPadding,
                    apply({ availableHeight, elements, placement }) {
                        Object.assign(elements.floating.style, {
                            height: '100%',
                            maxHeight: `${Math.min(maxHeight, availableHeight)}px`,
                            pointerEvents: 'none',
                            ...(placement.startsWith('top')
                                ? {
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                }
                                : {
                                    display: null,
                                    alignItems: null,
                                }),
                        });
                    },
                }),
            ],
            autoUpdate: {
                // fix the lang list position incorrectly when scrolling
                animationFrame: true,
            },
        },
        abortController,
    });
}
//# sourceMappingURL=index.js.map