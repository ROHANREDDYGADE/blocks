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
import { VirtualKeyboardController, } from '@blocksuite/affine-components/virtual-keyboard';
import { getViewportElement } from '@blocksuite/affine-shared/utils';
import { PropTypes, requiredProperties } from '@blocksuite/block-std';
import { SignalWatcher, WithDisposable } from '@blocksuite/global/utils';
import { MoreHorizontalIcon } from '@blocksuite/icons/lit';
import { signal } from '@preact/signals-core';
import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { cleanSpecifiedTail, createKeydownObserver, getQuery, } from '../../../_common/components/utils.js';
import { PageRootBlockComponent } from '../../index.js';
import { mobileLinkedDocMenuStyles } from './styles.js';
export const AFFINE_MOBILE_LINKED_DOC_MENU = 'affine-mobile-linked-doc-menu';
let AffineMobileLinkedDocMenu = (() => {
    let _classDecorators = [requiredProperties({
            context: PropTypes.object,
            rootComponent: PropTypes.instanceOf(PageRootBlockComponent),
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = SignalWatcher(WithDisposable(LitElement));
    let _context_decorators;
    let _context_initializers = [];
    let _context_extraInitializers = [];
    let _rootComponent_decorators;
    let _rootComponent_initializers = [];
    let _rootComponent_extraInitializers = [];
    var AffineMobileLinkedDocMenu = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _context_decorators = [property({ attribute: false })];
            _rootComponent_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _context_decorators, { kind: "accessor", name: "context", static: false, private: false, access: { has: obj => "context" in obj, get: obj => obj.context, set: (obj, value) => { obj.context = value; } }, metadata: _metadata }, _context_initializers, _context_extraInitializers);
            __esDecorate(this, null, _rootComponent_decorators, { kind: "accessor", name: "rootComponent", static: false, private: false, access: { has: obj => "rootComponent" in obj, get: obj => obj.rootComponent, set: (obj, value) => { obj.rootComponent = value; } }, metadata: _metadata }, _rootComponent_initializers, _rootComponent_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AffineMobileLinkedDocMenu = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = mobileLinkedDocMenuStyles; }
        get _query() {
            return getQuery(this.context.inlineEditor, this.context.startRange);
        }
        get virtualKeyboardControllerConfig() {
            return {
                useScreenHeight: this.context.config.mobile.useScreenHeight ?? false,
                inputElement: this.rootComponent,
            };
        }
        connectedCallback() {
            super.connectedCallback();
            const { inlineEditor, close } = this.context;
            this._updateLinkedDocGroup().catch(console.error);
            // prevent editor blur when click menu
            this._disposables.addFromEvent(this, 'pointerdown', e => {
                e.preventDefault();
            });
            // close menu when click outside
            this.disposables.addFromEvent(window, 'pointerdown', e => {
                if (e.target === this)
                    return;
                close();
            }, true);
            // bind some key events
            {
                const { eventSource } = inlineEditor;
                if (!eventSource)
                    return;
                const keydownObserverAbortController = new AbortController();
                this._disposables.add(() => keydownObserverAbortController.abort());
                createKeydownObserver({
                    target: eventSource,
                    signal: keydownObserverAbortController.signal,
                    onInput: isComposition => {
                        if (isComposition) {
                            this._updateLinkedDocGroup().catch(console.error);
                        }
                        else {
                            inlineEditor.slots.renderComplete.once(this._updateLinkedDocGroup);
                        }
                    },
                    onDelete: () => {
                        inlineEditor.slots.renderComplete.once(() => {
                            const curRange = inlineEditor.getInlineRange();
                            if (!this.context.startRange || !curRange)
                                return;
                            if (curRange.index < this.context.startRange.index) {
                                this.context.close();
                            }
                            this._updateLinkedDocGroup().catch(console.error);
                        });
                    },
                    onConfirm: () => {
                        this._firstActionItem?.action()?.catch(console.error);
                    },
                    onAbort: () => {
                        this.context.close();
                    },
                });
            }
        }
        firstUpdated() {
            if (!this._keyboardController.opened) {
                this._keyboardController.show();
                const id = setInterval(() => {
                    if (!this._keyboardController.opened)
                        return;
                    this._scrollInputToTop();
                    clearInterval(id);
                }, 50);
                this.disposables.add(() => {
                    clearInterval(id);
                });
            }
            else {
                this._scrollInputToTop();
            }
        }
        render() {
            // todo: get rid of hard coded config
            if (this._linkedDocGroup$.value.length === 0) {
                return nothing;
            }
            let group = this._linkedDocGroup$.value[0];
            let items = Array.isArray(group.items) ? group.items : group.items.value;
            if (items.length === 0) {
                group = this._linkedDocGroup$.value[1];
                items = (Array.isArray(group.items) ? group.items : group.items.value).filter(item => item.name !== 'Import');
            }
            const isOverflow = !!group.maxDisplay && items.length > group.maxDisplay;
            let moreItem = null;
            if (!this._expand$.value && isOverflow) {
                items = items.slice(0, group.maxDisplay);
                moreItem = html `<div
        class="mobile-linked-doc-menu-item"
        @click=${() => {
                    this._expand$.value = true;
                }}
      >
        ${MoreHorizontalIcon()}
        <div class="text">${group.overflowText || 'more'}</div>
      </div>`;
            }
            this._firstActionItem = items[0];
            this.style.bottom =
                this.context.config.mobile.useScreenHeight &&
                    this._keyboardController.opened
                    ? '0px'
                    : `max(0px, ${this._keyboardController.keyboardHeight}px)`;
            return html `
      ${repeat(items, item => item.key, this._renderItem)} ${moreItem}
    `;
        }
        #context_accessor_storage;
        get context() { return this.#context_accessor_storage; }
        set context(value) { this.#context_accessor_storage = value; }
        #rootComponent_accessor_storage;
        get rootComponent() { return this.#rootComponent_accessor_storage; }
        set rootComponent(value) { this.#rootComponent_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._expand$ = signal(false);
            this._firstActionItem = null;
            this._keyboardController = new VirtualKeyboardController(this);
            this._linkedDocGroup$ = signal([]);
            this._renderItem = ({ key, name, icon, action, }) => {
                return html `<button
      class="mobile-linked-doc-menu-item"
      data-id=${key}
      @pointerup=${() => {
                    action()?.catch(console.error);
                }}
    >
      ${icon}
      <div class="text">${name}</div>
    </button>`;
            };
            this._scrollInputToTop = () => {
                const { inlineEditor } = this.context;
                const { scrollContainer, scrollTopOffset } = this.context.config.mobile;
                let container = null;
                let containerScrollTop = 0;
                if (typeof scrollContainer === 'string') {
                    container = document.querySelector(scrollContainer);
                    containerScrollTop = container?.scrollTop ?? 0;
                }
                else if (scrollContainer instanceof HTMLElement) {
                    container = scrollContainer;
                    containerScrollTop = scrollContainer.scrollTop;
                }
                else if (scrollContainer === window) {
                    container = window;
                    containerScrollTop = scrollContainer.scrollY;
                }
                else {
                    container = getViewportElement(this.context.std.host);
                    containerScrollTop = container?.scrollTop ?? 0;
                }
                let offset = 0;
                if (typeof scrollTopOffset === 'function') {
                    offset = scrollTopOffset();
                }
                else {
                    offset = scrollTopOffset ?? 0;
                }
                container?.scrollTo({
                    top: inlineEditor.rootElement.getBoundingClientRect().top +
                        containerScrollTop -
                        offset,
                    behavior: 'smooth',
                });
            };
            this._updateLinkedDocGroup = async () => {
                if (this._updateLinkedDocGroupAbortController) {
                    this._updateLinkedDocGroupAbortController.abort();
                }
                this._updateLinkedDocGroupAbortController = new AbortController();
                this._linkedDocGroup$.value = await this.context.config.getMenus(this._query ?? '', () => {
                    this.context.close();
                    cleanSpecifiedTail(this.context.std.host, this.context.inlineEditor, this.context.triggerKey + (this._query ?? ''));
                }, this.context.std.host, this.context.inlineEditor, this._updateLinkedDocGroupAbortController.signal);
            };
            this._updateLinkedDocGroupAbortController = null;
            this.#context_accessor_storage = __runInitializers(this, _context_initializers, void 0);
            this.#rootComponent_accessor_storage = (__runInitializers(this, _context_extraInitializers), __runInitializers(this, _rootComponent_initializers, void 0));
            __runInitializers(this, _rootComponent_extraInitializers);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AffineMobileLinkedDocMenu = _classThis;
})();
export { AffineMobileLinkedDocMenu };
//# sourceMappingURL=mobile-linked-doc-menu.js.map