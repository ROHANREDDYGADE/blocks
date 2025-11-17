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
import { ArrowDownIcon } from '@blocksuite/affine-components/icons';
import { createLitPortal } from '@blocksuite/affine-components/portal';
import { getInlineEditorByModel } from '@blocksuite/affine-components/rich-text';
import { isControlledKeyboardEvent, isFuzzyMatch, substringMatchScore, } from '@blocksuite/affine-shared/utils';
import { assertExists, WithDisposable } from '@blocksuite/global/utils';
import { autoPlacement, offset } from '@floating-ui/dom';
import { html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { cleanSpecifiedTail, createKeydownObserver, getQuery, } from '../../../_common/components/utils.js';
import { slashItemToolTipStyle, styles } from './styles.js';
import { getFirstNotDividerItem, isActionItem, isGroupDivider, isSubMenuItem, notGroupDivider, slashItemClassName, } from './utils.js';
let SlashMenu = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __filteredItems_decorators;
    let __filteredItems_initializers = [];
    let __filteredItems_extraInitializers = [];
    let __position_decorators;
    let __position_initializers = [];
    let __position_extraInitializers = [];
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _context_decorators;
    let _context_initializers = [];
    let _context_extraInitializers = [];
    let _slashMenuElement_decorators;
    let _slashMenuElement_initializers = [];
    let _slashMenuElement_extraInitializers = [];
    let _triggerKey_decorators;
    let _triggerKey_initializers = [];
    let _triggerKey_extraInitializers = [];
    return class SlashMenu extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __filteredItems_decorators = [state()];
            __position_decorators = [state()];
            _config_decorators = [property({ attribute: false })];
            _context_decorators = [property({ attribute: false })];
            _slashMenuElement_decorators = [query('inner-slash-menu')];
            _triggerKey_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __filteredItems_decorators, { kind: "accessor", name: "_filteredItems", static: false, private: false, access: { has: obj => "_filteredItems" in obj, get: obj => obj._filteredItems, set: (obj, value) => { obj._filteredItems = value; } }, metadata: _metadata }, __filteredItems_initializers, __filteredItems_extraInitializers);
            __esDecorate(this, null, __position_decorators, { kind: "accessor", name: "_position", static: false, private: false, access: { has: obj => "_position" in obj, get: obj => obj._position, set: (obj, value) => { obj._position = value; } }, metadata: _metadata }, __position_initializers, __position_extraInitializers);
            __esDecorate(this, null, _config_decorators, { kind: "accessor", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(this, null, _context_decorators, { kind: "accessor", name: "context", static: false, private: false, access: { has: obj => "context" in obj, get: obj => obj.context, set: (obj, value) => { obj.context = value; } }, metadata: _metadata }, _context_initializers, _context_extraInitializers);
            __esDecorate(this, null, _slashMenuElement_decorators, { kind: "accessor", name: "slashMenuElement", static: false, private: false, access: { has: obj => "slashMenuElement" in obj, get: obj => obj.slashMenuElement, set: (obj, value) => { obj.slashMenuElement = value; } }, metadata: _metadata }, _slashMenuElement_initializers, _slashMenuElement_extraInitializers);
            __esDecorate(this, null, _triggerKey_decorators, { kind: "accessor", name: "triggerKey", static: false, private: false, access: { has: obj => "triggerKey" in obj, get: obj => obj.triggerKey, set: (obj, value) => { obj.triggerKey = value; } }, metadata: _metadata }, _triggerKey_initializers, _triggerKey_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = styles; }
        get _query() {
            return getQuery(this.inlineEditor, this._startRange);
        }
        get host() {
            return this.context.rootComponent.host;
        }
        constructor(inlineEditor, abortController = new AbortController()) {
            super();
            this.inlineEditor = inlineEditor;
            this.abortController = abortController;
            this._handleClickItem = (item) => {
                // Need to remove the search string
                // We must to do clean the slash string before we do the action
                // Otherwise, the action may change the model and cause the slash string to be changed
                cleanSpecifiedTail(this.host, this.context.model, this.triggerKey + (this._query || ''));
                this.inlineEditor
                    .waitForUpdate()
                    .then(() => {
                    item.action(this.context)?.catch(console.error);
                    this.abortController.abort();
                })
                    .catch(console.error);
            };
            this._initItemPathMap = () => {
                const traverse = (item, path) => {
                    this._itemPathMap.set(item, [...path]);
                    if (isSubMenuItem(item)) {
                        item.subMenu.forEach((subItem, index) => traverse(subItem, [...path, index]));
                    }
                };
                this.config.items.forEach((item, index) => traverse(item, [index]));
            };
            this._itemPathMap = new Map();
            this._queryState = 'off';
            this._startRange = this.inlineEditor.getInlineRange();
            this._updateFilteredItems = () => {
                const query = this._query;
                if (query === null) {
                    this.abortController.abort();
                    return;
                }
                this._filteredItems = [];
                const searchStr = query.toLowerCase();
                if (searchStr === '' || searchStr.endsWith(' ')) {
                    this._queryState = searchStr === '' ? 'off' : 'no_result';
                    return;
                }
                // Layer order traversal
                let depth = 0;
                let queue = this.config.items.filter(notGroupDivider);
                while (queue.length !== 0) {
                    // remove the sub menu item from the previous layer result
                    this._filteredItems = this._filteredItems.filter(item => !isSubMenuItem(item));
                    this._filteredItems = this._filteredItems.concat(queue.filter(({ name, alias = [] }) => [name, ...alias].some(str => isFuzzyMatch(str, searchStr))));
                    // We search first and second layer
                    if (this._filteredItems.length !== 0 && depth >= 1)
                        break;
                    queue = queue
                        .map(item => {
                        if (isSubMenuItem(item)) {
                            return item.subMenu.filter(notGroupDivider);
                        }
                        else {
                            return [];
                        }
                    })
                        .flat();
                    depth++;
                }
                this._filteredItems = this._filteredItems.sort((a, b) => {
                    return -(substringMatchScore(a.name, searchStr) -
                        substringMatchScore(b.name, searchStr));
                });
                this._queryState = this._filteredItems.length === 0 ? 'no_result' : 'on';
            };
            this.updatePosition = (position) => {
                this._position = position;
            };
            this.#_filteredItems_accessor_storage = __runInitializers(this, __filteredItems_initializers, []);
            this.#_position_accessor_storage = (__runInitializers(this, __filteredItems_extraInitializers), __runInitializers(this, __position_initializers, null));
            this.#config_accessor_storage = (__runInitializers(this, __position_extraInitializers), __runInitializers(this, _config_initializers, void 0));
            this.#context_accessor_storage = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _context_initializers, void 0));
            this.#slashMenuElement_accessor_storage = (__runInitializers(this, _context_extraInitializers), __runInitializers(this, _slashMenuElement_initializers, void 0));
            this.#triggerKey_accessor_storage = (__runInitializers(this, _slashMenuElement_extraInitializers), __runInitializers(this, _triggerKey_initializers, void 0));
            __runInitializers(this, _triggerKey_extraInitializers);
            this.inlineEditor = inlineEditor;
            this.abortController = abortController;
        }
        connectedCallback() {
            super.connectedCallback();
            this._innerSlashMenuContext = {
                ...this.context,
                onClickItem: this._handleClickItem,
                tooltipTimeout: this.config.tooltipTimeout,
            };
            this._initItemPathMap();
            this._disposables.addFromEvent(this, 'mousedown', e => {
                // Prevent input from losing focus
                e.preventDefault();
            });
            const inlineEditor = this.inlineEditor;
            if (!inlineEditor || !inlineEditor.eventSource) {
                console.error('inlineEditor or eventSource is not found');
                return;
            }
            /**
             * Handle arrow key
             *
             * The slash menu will be closed in the following keyboard cases:
             * - Press the space key
             * - Press the backspace key and the search string is empty
             * - Press the escape key
             * - When the search item is empty, the slash menu will be hidden temporarily,
             *   and if the following key is not the backspace key, the slash menu will be closed
             */
            createKeydownObserver({
                target: inlineEditor.eventSource,
                signal: this.abortController.signal,
                interceptor: (event, next) => {
                    const { key, isComposing, code } = event;
                    if (key === this.triggerKey) {
                        // Can not stopPropagation here,
                        // otherwise the rich text will not be able to trigger a new the slash menu
                        return;
                    }
                    if (key === 'Process' && !isComposing && code === 'Slash') {
                        // The IME case of above
                        return;
                    }
                    if (key !== 'Backspace' && this._queryState === 'no_result') {
                        // if the following key is not the backspace key,
                        // the slash menu will be closed
                        this.abortController.abort();
                        return;
                    }
                    if (key === 'ArrowRight' || key === 'ArrowLeft' || key === 'Escape') {
                        return;
                    }
                    next();
                },
                onInput: isComposition => {
                    if (isComposition) {
                        this._updateFilteredItems();
                    }
                    else {
                        this.inlineEditor.slots.renderComplete.once(this._updateFilteredItems);
                    }
                },
                onPaste: () => {
                    setTimeout(() => {
                        this._updateFilteredItems();
                    }, 50);
                },
                onDelete: () => {
                    const curRange = this.inlineEditor.getInlineRange();
                    if (!this._startRange || !curRange) {
                        return;
                    }
                    if (curRange.index < this._startRange.index) {
                        this.abortController.abort();
                    }
                    this.inlineEditor.slots.renderComplete.once(this._updateFilteredItems);
                },
                onAbort: () => this.abortController.abort(),
            });
        }
        render() {
            const slashMenuStyles = this._position
                ? {
                    transform: `translate(${this._position.x}, ${this._position.y})`,
                    maxHeight: `${Math.min(this._position.height, this.config.maxHeight)}px`,
                }
                : {
                    visibility: 'hidden',
                };
            return html `${this._queryState !== 'no_result'
                ? html ` <div
            class="overlay-mask"
            @click="${() => this.abortController.abort()}"
          ></div>`
                : nothing}
      <inner-slash-menu
        .context=${this._innerSlashMenuContext}
        .menu=${this._queryState === 'off'
                ? this.config.items
                : this._filteredItems}
        .onClickItem=${this._handleClickItem}
        .mainMenuStyle=${slashMenuStyles}
        .abortController=${this.abortController}
      >
      </inner-slash-menu>`;
        }
        #_filteredItems_accessor_storage;
        get _filteredItems() { return this.#_filteredItems_accessor_storage; }
        set _filteredItems(value) { this.#_filteredItems_accessor_storage = value; }
        #_position_accessor_storage;
        get _position() { return this.#_position_accessor_storage; }
        set _position(value) { this.#_position_accessor_storage = value; }
        #config_accessor_storage;
        get config() { return this.#config_accessor_storage; }
        set config(value) { this.#config_accessor_storage = value; }
        #context_accessor_storage;
        get context() { return this.#context_accessor_storage; }
        set context(value) { this.#context_accessor_storage = value; }
        #slashMenuElement_accessor_storage;
        get slashMenuElement() { return this.#slashMenuElement_accessor_storage; }
        set slashMenuElement(value) { this.#slashMenuElement_accessor_storage = value; }
        #triggerKey_accessor_storage;
        get triggerKey() { return this.#triggerKey_accessor_storage; }
        set triggerKey(value) { this.#triggerKey_accessor_storage = value; }
    };
})();
export { SlashMenu };
let InnerSlashMenu = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __activeItem_decorators;
    let __activeItem_initializers = [];
    let __activeItem_extraInitializers = [];
    let _abortController_decorators;
    let _abortController_initializers = [];
    let _abortController_extraInitializers = [];
    let _context_decorators;
    let _context_initializers = [];
    let _context_extraInitializers = [];
    let _depth_decorators;
    let _depth_initializers = [];
    let _depth_extraInitializers = [];
    let _mainMenuStyle_decorators;
    let _mainMenuStyle_initializers = [];
    let _mainMenuStyle_extraInitializers = [];
    let _menu_decorators;
    let _menu_initializers = [];
    let _menu_extraInitializers = [];
    return class InnerSlashMenu extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __activeItem_decorators = [state()];
            _abortController_decorators = [property({ attribute: false })];
            _context_decorators = [property({ attribute: false })];
            _depth_decorators = [property({ attribute: false })];
            _mainMenuStyle_decorators = [property({ attribute: false })];
            _menu_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __activeItem_decorators, { kind: "accessor", name: "_activeItem", static: false, private: false, access: { has: obj => "_activeItem" in obj, get: obj => obj._activeItem, set: (obj, value) => { obj._activeItem = value; } }, metadata: _metadata }, __activeItem_initializers, __activeItem_extraInitializers);
            __esDecorate(this, null, _abortController_decorators, { kind: "accessor", name: "abortController", static: false, private: false, access: { has: obj => "abortController" in obj, get: obj => obj.abortController, set: (obj, value) => { obj.abortController = value; } }, metadata: _metadata }, _abortController_initializers, _abortController_extraInitializers);
            __esDecorate(this, null, _context_decorators, { kind: "accessor", name: "context", static: false, private: false, access: { has: obj => "context" in obj, get: obj => obj.context, set: (obj, value) => { obj.context = value; } }, metadata: _metadata }, _context_initializers, _context_extraInitializers);
            __esDecorate(this, null, _depth_decorators, { kind: "accessor", name: "depth", static: false, private: false, access: { has: obj => "depth" in obj, get: obj => obj.depth, set: (obj, value) => { obj.depth = value; } }, metadata: _metadata }, _depth_initializers, _depth_extraInitializers);
            __esDecorate(this, null, _mainMenuStyle_decorators, { kind: "accessor", name: "mainMenuStyle", static: false, private: false, access: { has: obj => "mainMenuStyle" in obj, get: obj => obj.mainMenuStyle, set: (obj, value) => { obj.mainMenuStyle = value; } }, metadata: _metadata }, _mainMenuStyle_initializers, _mainMenuStyle_extraInitializers);
            __esDecorate(this, null, _menu_decorators, { kind: "accessor", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = styles; }
        _scrollToItem(item) {
            const shadowRoot = this.shadowRoot;
            if (!shadowRoot) {
                return;
            }
            const text = isGroupDivider(item) ? item.groupName : item.name;
            const ele = shadowRoot.querySelector(`icon-button[text="${text}"]`);
            if (!ele) {
                return;
            }
            ele.scrollIntoView({
                block: 'nearest',
            });
        }
        connectedCallback() {
            super.connectedCallback();
            // close all sub menus
            this.abortController?.signal?.addEventListener('abort', () => {
                this._subMenuAbortController?.abort();
            });
            this.addEventListener('wheel', event => {
                if (this._currentSubMenu) {
                    event.preventDefault();
                }
            });
            const inlineEditor = getInlineEditorByModel(this.context.rootComponent.host, this.context.model);
            if (!inlineEditor || !inlineEditor.eventSource) {
                console.error('inlineEditor or eventSource is not found');
                return;
            }
            inlineEditor.eventSource.addEventListener('keydown', event => {
                if (this._currentSubMenu)
                    return;
                if (event.isComposing)
                    return;
                const { key, ctrlKey, metaKey, altKey, shiftKey } = event;
                const onlyCmd = (ctrlKey || metaKey) && !altKey && !shiftKey;
                const onlyShift = shiftKey && !isControlledKeyboardEvent(event);
                const notControlShift = !(ctrlKey || metaKey || altKey || shiftKey);
                let moveStep = 0;
                if ((key === 'ArrowUp' && notControlShift) ||
                    (key === 'Tab' && onlyShift) ||
                    (key === 'P' && onlyCmd) ||
                    (key === 'p' && onlyCmd)) {
                    moveStep = -1;
                }
                if ((key === 'ArrowDown' && notControlShift) ||
                    (key === 'Tab' && notControlShift) ||
                    (key === 'n' && onlyCmd) ||
                    (key === 'N' && onlyCmd)) {
                    moveStep = 1;
                }
                if (moveStep !== 0) {
                    let itemIndex = this.menu.indexOf(this._activeItem);
                    do {
                        itemIndex =
                            (itemIndex + moveStep + this.menu.length) % this.menu.length;
                    } while (isGroupDivider(this.menu[itemIndex]));
                    this._activeItem = this.menu[itemIndex];
                    this._scrollToItem(this._activeItem);
                    event.preventDefault();
                    event.stopPropagation();
                }
                if (key === 'ArrowRight' && notControlShift) {
                    if (isSubMenuItem(this._activeItem)) {
                        this._openSubMenu(this._activeItem);
                    }
                    event.preventDefault();
                    event.stopPropagation();
                }
                if ((key === 'ArrowLeft' || key === 'Escape') && notControlShift) {
                    this.abortController.abort();
                    event.preventDefault();
                    event.stopPropagation();
                }
                if (key === 'Enter' && notControlShift) {
                    if (isSubMenuItem(this._activeItem)) {
                        this._openSubMenu(this._activeItem);
                    }
                    else if (isActionItem(this._activeItem)) {
                        this.context.onClickItem(this._activeItem);
                    }
                    event.preventDefault();
                    event.stopPropagation();
                }
            }, {
                capture: true,
                signal: this.abortController.signal,
            });
        }
        disconnectedCallback() {
            this.abortController.abort();
        }
        render() {
            if (this.menu.length === 0)
                return nothing;
            const style = styleMap(this.mainMenuStyle ?? { position: 'relative' });
            return html `<div
      class="slash-menu"
      style=${style}
      data-testid=${`sub-menu-${this.depth}`}
    >
      ${this.menu.map(this._renderItem)}
    </div>`;
        }
        willUpdate(changedProperties) {
            if (changedProperties.has('menu') && this.menu.length !== 0) {
                const firstItem = getFirstNotDividerItem(this.menu);
                assertExists(firstItem);
                this._activeItem = firstItem;
                // this case happen on query updated
                this._subMenuAbortController?.abort();
            }
        }
        #_activeItem_accessor_storage;
        get _activeItem() { return this.#_activeItem_accessor_storage; }
        set _activeItem(value) { this.#_activeItem_accessor_storage = value; }
        #abortController_accessor_storage;
        get abortController() { return this.#abortController_accessor_storage; }
        set abortController(value) { this.#abortController_accessor_storage = value; }
        #context_accessor_storage;
        get context() { return this.#context_accessor_storage; }
        set context(value) { this.#context_accessor_storage = value; }
        #depth_accessor_storage;
        get depth() { return this.#depth_accessor_storage; }
        set depth(value) { this.#depth_accessor_storage = value; }
        #mainMenuStyle_accessor_storage;
        get mainMenuStyle() { return this.#mainMenuStyle_accessor_storage; }
        set mainMenuStyle(value) { this.#mainMenuStyle_accessor_storage = value; }
        #menu_accessor_storage;
        get menu() { return this.#menu_accessor_storage; }
        set menu(value) { this.#menu_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._closeSubMenu = () => {
                this._subMenuAbortController?.abort();
                this._subMenuAbortController = null;
                this._currentSubMenu = null;
            };
            this._currentSubMenu = null;
            this._openSubMenu = (item) => {
                if (item === this._currentSubMenu)
                    return;
                const itemElement = this.shadowRoot?.querySelector(`.${slashItemClassName(item)}`);
                if (!itemElement)
                    return;
                this._closeSubMenu();
                this._currentSubMenu = item;
                this._subMenuAbortController = new AbortController();
                this._subMenuAbortController.signal.addEventListener('abort', () => {
                    this._closeSubMenu();
                });
                const subMenuElement = createLitPortal({
                    shadowDom: false,
                    template: html `<inner-slash-menu
        .context=${this.context}
        .menu=${item.subMenu}
        .depth=${this.depth + 1}
        .abortController=${this._subMenuAbortController}
      >
        ${item.subMenu.map(this._renderItem)}
      </inner-slash-menu>`,
                    computePosition: {
                        referenceElement: itemElement,
                        autoUpdate: true,
                        middleware: [
                            offset(12),
                            autoPlacement({
                                allowedPlacements: ['right-start', 'right-end'],
                            }),
                        ],
                    },
                    abortController: this._subMenuAbortController,
                });
                subMenuElement.style.zIndex = `calc(var(--affine-z-index-popover) + ${this.depth})`;
                subMenuElement.focus();
            };
            this._renderActionItem = (item) => {
                const { name, icon, description, tooltip, customTemplate } = item;
                const hover = item === this._activeItem;
                return html `<icon-button
      class="slash-menu-item ${slashItemClassName(item)}"
      width="100%"
      height="44px"
      text=${customTemplate ?? name}
      subText=${ifDefined(description)}
      data-testid="${name}"
      hover=${hover}
      @mousemove=${() => {
                    this._activeItem = item;
                    this._closeSubMenu();
                }}
      @click=${() => this.context.onClickItem(item)}
    >
      ${icon && html `<div class="slash-menu-item-icon">${icon}</div>`}
      ${tooltip &&
                    html `<affine-tooltip
        tip-position="right"
        .offset=${22}
        .tooltipStyle=${slashItemToolTipStyle}
        .hoverOptions=${{
                        enterDelay: this.context.tooltipTimeout,
                        allowMultiple: false,
                    }}
      >
        <div class="tooltip-figure">${tooltip.figure}</div>
        <div class="tooltip-caption">${tooltip.caption}</div>
      </affine-tooltip>`}
    </icon-button>`;
            };
            this._renderGroupItem = (item) => {
                return html `<div class="slash-menu-group-name">${item.groupName}</div>`;
            };
            this._renderItem = (item) => {
                if (isGroupDivider(item))
                    return this._renderGroupItem(item);
                else if (isActionItem(item))
                    return this._renderActionItem(item);
                else if (isSubMenuItem(item))
                    return this._renderSubMenuItem(item);
                else {
                    console.error('Unknown item type for slash menu');
                    console.error(item);
                    return nothing;
                }
            };
            this._renderSubMenuItem = (item) => {
                const { name, icon, description } = item;
                const hover = item === this._activeItem;
                return html `<icon-button
      class="slash-menu-item ${slashItemClassName(item)}"
      width="100%"
      height="44px"
      text=${name}
      subText=${ifDefined(description)}
      data-testid="${name}"
      hover=${hover}
      @mousemove=${() => {
                    this._activeItem = item;
                    this._openSubMenu(item);
                }}
      @touchstart=${() => {
                    isSubMenuItem(item) &&
                        (this._currentSubMenu === item
                            ? this._closeSubMenu()
                            : this._openSubMenu(item));
                }}
    >
      ${icon && html `<div class="slash-menu-item-icon">${icon}</div>`}
      <div slot="suffix" style="transform: rotate(-90deg);">
        ${ArrowDownIcon}
      </div>
    </icon-button>`;
            };
            this._subMenuAbortController = null;
            this.#_activeItem_accessor_storage = __runInitializers(this, __activeItem_initializers, void 0);
            this.#abortController_accessor_storage = (__runInitializers(this, __activeItem_extraInitializers), __runInitializers(this, _abortController_initializers, void 0));
            this.#context_accessor_storage = (__runInitializers(this, _abortController_extraInitializers), __runInitializers(this, _context_initializers, void 0));
            this.#depth_accessor_storage = (__runInitializers(this, _context_extraInitializers), __runInitializers(this, _depth_initializers, 0));
            this.#mainMenuStyle_accessor_storage = (__runInitializers(this, _depth_extraInitializers), __runInitializers(this, _mainMenuStyle_initializers, null));
            this.#menu_accessor_storage = (__runInitializers(this, _mainMenuStyle_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
            __runInitializers(this, _menu_extraInitializers);
        }
    };
})();
export { InnerSlashMenu };
//# sourceMappingURL=slash-menu-popover.js.map