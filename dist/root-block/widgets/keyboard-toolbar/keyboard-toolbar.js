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
import { PropTypes, requiredProperties, ShadowlessElement, } from '@blocksuite/block-std';
import { SignalWatcher, WithDisposable } from '@blocksuite/global/utils';
import { ArrowLeftBigIcon, KeyboardIcon } from '@blocksuite/icons/lit';
import { effect, signal } from '@preact/signals-core';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import { PageRootBlockComponent } from '../../page/page-root-block.js';
import { keyboardToolbarStyles, TOOLBAR_HEIGHT } from './styles.js';
import { isKeyboardSubToolBarConfig, isKeyboardToolBarActionItem, isKeyboardToolPanelConfig, } from './utils.js';
export const AFFINE_KEYBOARD_TOOLBAR = 'affine-keyboard-toolbar';
let AffineKeyboardToolbar = (() => {
    let _classDecorators = [requiredProperties({
            config: PropTypes.object,
            rootComponent: PropTypes.instanceOf(PageRootBlockComponent),
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _close_decorators;
    let _close_initializers = [];
    let _close_extraInitializers = [];
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _rootComponent_decorators;
    let _rootComponent_initializers = [];
    let _rootComponent_extraInitializers = [];
    var AffineKeyboardToolbar = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _close_decorators = [property({ attribute: false })];
            _config_decorators = [property({ attribute: false })];
            _rootComponent_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _close_decorators, { kind: "accessor", name: "close", static: false, private: false, access: { has: obj => "close" in obj, get: obj => obj.close, set: (obj, value) => { obj.close = value; } }, metadata: _metadata }, _close_initializers, _close_extraInitializers);
            __esDecorate(this, null, _config_decorators, { kind: "accessor", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(this, null, _rootComponent_decorators, { kind: "accessor", name: "rootComponent", static: false, private: false, access: { has: obj => "rootComponent" in obj, get: obj => obj.rootComponent, set: (obj, value) => { obj.rootComponent = value; } }, metadata: _metadata }, _rootComponent_initializers, _rootComponent_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AffineKeyboardToolbar = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = keyboardToolbarStyles; }
        get _context() {
            return {
                std: this.rootComponent.std,
                rootComponent: this.rootComponent,
                closeToolbar: (blur = false) => {
                    this.close(blur);
                },
                closeToolPanel: () => {
                    this._closeToolPanel();
                },
            };
        }
        get _currentPanelConfig() {
            if (!this._isPanelOpened)
                return null;
            const result = this._currentToolbarItems[this._currentPanelIndex$.value];
            return isKeyboardToolPanelConfig(result) ? result : null;
        }
        get _currentToolbarItems() {
            let items = this.config.items;
            for (let i = 0; i < this._path$.value.length; i++) {
                const index = this._path$.value[i];
                if (isKeyboardSubToolBarConfig(items[index])) {
                    items = items[index].items;
                }
                else {
                    break;
                }
            }
            return items.filter(item => isKeyboardToolBarActionItem(item)
                ? (item.showWhen?.(this._context) ?? true)
                : true);
        }
        get _isPanelOpened() {
            return this._currentPanelIndex$.value !== -1;
        }
        get _isSubToolbarOpened() {
            return this._path$.value.length > 0;
        }
        get virtualKeyboardControllerConfig() {
            return {
                useScreenHeight: this.config.useScreenHeight ?? false,
                inputElement: this.rootComponent,
            };
        }
        _renderIcon(icon) {
            return typeof icon === 'function' ? icon(this._context) : icon;
        }
        _renderItem(item, index) {
            let icon = item.icon;
            let style = styleMap({});
            const disabled = ('disableWhen' in item && item.disableWhen?.(this._context)) ?? false;
            if (isKeyboardToolBarActionItem(item)) {
                const background = typeof item.background === 'function'
                    ? item.background(this._context)
                    : item.background;
                if (background)
                    style = styleMap({
                        background: background,
                    });
            }
            else if (isKeyboardToolPanelConfig(item)) {
                const { activeIcon, activeBackground } = item;
                const active = this._currentPanelIndex$.value === index;
                if (active && activeIcon)
                    icon = activeIcon;
                if (active && activeBackground)
                    style = styleMap({ background: activeBackground });
            }
            return html `<icon-button
      size="36px"
      style=${style}
      ?disabled=${disabled}
      @click=${() => {
                this._handleItemClick(item, index);
            }}
    >
      ${this._renderIcon(icon)}
    </icon-button>`;
        }
        _renderItems() {
            if (document.activeElement !== this.rootComponent)
                return html `<div class="item-container"></div>`;
            const goPrevToolbarAction = when(this._isSubToolbarOpened, () => html `<icon-button size="36px" @click=${this._goPrevToolbar}>
          ${ArrowLeftBigIcon()}
        </icon-button>`);
            return html `<div class="item-container">
      ${goPrevToolbarAction}
      ${repeat(this._currentToolbarItems, (item, index) => this._renderItem(item, index))}
    </div>`;
        }
        _renderKeyboardButton() {
            return html `<div class="keyboard-container">
      <icon-button
        size="36px"
        @click=${() => {
                this.close(true);
            }}
      >
        ${KeyboardIcon()}
      </icon-button>
    </div>`;
        }
        connectedCallback() {
            super.connectedCallback();
            // prevent editor blur when click item in toolbar
            this.disposables.addFromEvent(this, 'pointerdown', e => {
                e.preventDefault();
            });
            this.disposables.add(effect(() => {
                if (this._keyboardController.opened) {
                    this._panelHeight$.value = this._keyboardController.keyboardHeight;
                }
                else if (this._isPanelOpened && this._panelHeight$.peek() === 0) {
                    this._panelHeight$.value = 260;
                }
            }));
            this.disposables.add(effect(() => {
                if (this._keyboardController.opened && !this.config.useScreenHeight) {
                    document.body.style.paddingBottom = `${this._keyboardController.keyboardHeight + TOOLBAR_HEIGHT}px`;
                }
                else if (this._isPanelOpened) {
                    document.body.style.paddingBottom = `${this._panelHeight$.value + TOOLBAR_HEIGHT}px`;
                }
                else {
                    document.body.style.paddingBottom = '';
                }
            }));
            this.disposables.add(effect(() => {
                const std = this.rootComponent.std;
                std.selection.value;
                // wait cursor updated
                requestAnimationFrame(() => {
                    this.scrollCurrentBlockIntoView();
                });
            }));
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            document.body.style.paddingBottom = '';
        }
        firstUpdated() {
            // workaround for the virtual keyboard showing transition animation
            setTimeout(() => {
                this.scrollCurrentBlockIntoView();
            }, 700);
        }
        render() {
            this.style.bottom =
                this.config.useScreenHeight && this._keyboardController.opened
                    ? `${-this._panelHeight$.value}px`
                    : '0px';
            return html `
      <div class="keyboard-toolbar">
        ${this._renderItems()}
        <div class="divider"></div>
        ${this._renderKeyboardButton()}
      </div>
      <affine-keyboard-tool-panel
        .config=${this._currentPanelConfig}
        .context=${this._context}
        height=${this._panelHeight$.value}
      ></affine-keyboard-tool-panel>
    `;
        }
        #close_accessor_storage;
        get close() { return this.#close_accessor_storage; }
        set close(value) { this.#close_accessor_storage = value; }
        #config_accessor_storage;
        get config() { return this.#config_accessor_storage; }
        set config(value) { this.#config_accessor_storage = value; }
        #rootComponent_accessor_storage;
        get rootComponent() { return this.#rootComponent_accessor_storage; }
        set rootComponent(value) { this.#rootComponent_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._closeToolPanel = () => {
                if (!this._isPanelOpened)
                    return;
                this._currentPanelIndex$.value = -1;
                this._keyboardController.show();
            };
            this._currentPanelIndex$ = signal(-1);
            this._goPrevToolbar = () => {
                if (!this._isSubToolbarOpened)
                    return;
                if (this._isPanelOpened)
                    this._closeToolPanel();
                this._path$.value = this._path$.value.slice(0, -1);
            };
            this._handleItemClick = (item, index) => {
                if (isKeyboardToolBarActionItem(item)) {
                    item.action &&
                        Promise.resolve(item.action(this._context)).catch(console.error);
                }
                else if (isKeyboardSubToolBarConfig(item)) {
                    this._closeToolPanel();
                    this._path$.value = [...this._path$.value, index];
                }
                else if (isKeyboardToolPanelConfig(item)) {
                    if (this._currentPanelIndex$.value === index) {
                        this._closeToolPanel();
                    }
                    else {
                        this._currentPanelIndex$.value = index;
                        this._keyboardController.hide();
                        this.scrollCurrentBlockIntoView();
                    }
                }
                this._lastActiveItem$.value = item;
            };
            this._keyboardController = new VirtualKeyboardController(this);
            this._lastActiveItem$ = signal(null);
            /** This field records the panel static height, which dose not aim to control the panel opening */
            this._panelHeight$ = signal(0);
            this._path$ = signal([]);
            this.scrollCurrentBlockIntoView = () => {
                const { std } = this.rootComponent;
                std.command
                    .chain()
                    .getSelectedModels()
                    .inline(({ selectedModels }) => {
                    if (!selectedModels?.length)
                        return;
                    const block = std.view.getBlock(selectedModels[0].id);
                    if (!block)
                        return;
                    const { y: y1 } = this.getBoundingClientRect();
                    const { bottom: y2 } = block.getBoundingClientRect();
                    const gap = 8;
                    if (y2 < y1 + gap)
                        return;
                    scrollTo({
                        top: window.scrollY + y2 - y1 + gap,
                        behavior: 'instant',
                    });
                })
                    .run();
            };
            this.#close_accessor_storage = __runInitializers(this, _close_initializers, () => { });
            this.#config_accessor_storage = (__runInitializers(this, _close_extraInitializers), __runInitializers(this, _config_initializers, void 0));
            this.#rootComponent_accessor_storage = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _rootComponent_initializers, void 0));
            __runInitializers(this, _rootComponent_extraInitializers);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AffineKeyboardToolbar = _classThis;
})();
export { AffineKeyboardToolbar };
//# sourceMappingURL=keyboard-toolbar.js.map