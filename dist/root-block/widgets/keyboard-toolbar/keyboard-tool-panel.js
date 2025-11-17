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
import { PropTypes, requiredProperties, ShadowlessElement, } from '@blocksuite/block-std';
import { SignalWatcher, WithDisposable } from '@blocksuite/global/utils';
import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { keyboardToolPanelStyles } from './styles.js';
export const AFFINE_KEYBOARD_TOOL_PANEL = 'affine-keyboard-tool-panel';
let AffineKeyboardToolPanel = (() => {
    let _classDecorators = [requiredProperties({
            context: PropTypes.object,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _context_decorators;
    let _context_initializers = [];
    let _context_extraInitializers = [];
    let _height_decorators;
    let _height_initializers = [];
    let _height_extraInitializers = [];
    var AffineKeyboardToolPanel = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _config_decorators = [property({ attribute: false })];
            _context_decorators = [property({ attribute: false })];
            _height_decorators = [property({ type: Number })];
            __esDecorate(this, null, _config_decorators, { kind: "accessor", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(this, null, _context_decorators, { kind: "accessor", name: "context", static: false, private: false, access: { has: obj => "context" in obj, get: obj => obj.context, set: (obj, value) => { obj.context = value; } }, metadata: _metadata }, _context_initializers, _context_extraInitializers);
            __esDecorate(this, null, _height_decorators, { kind: "accessor", name: "height", static: false, private: false, access: { has: obj => "height" in obj, get: obj => obj.height, set: (obj, value) => { obj.height = value; } }, metadata: _metadata }, _height_initializers, _height_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AffineKeyboardToolPanel = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = keyboardToolPanelStyles; }
        _renderGroup(group) {
            const items = group.items.filter(item => item.showWhen?.(this.context) ?? true);
            return html `<div class="keyboard-tool-panel-group">
      <div class="keyboard-tool-panel-group-header">${group.name}</div>
      <div class="keyboard-tool-panel-group-item-container">
        ${repeat(items, item => item.name, item => this._renderItem(item))}
      </div>
    </div>`;
        }
        _renderIcon(icon) {
            return typeof icon === 'function' ? icon(this.context) : icon;
        }
        _renderItem(item) {
            return html `<div class="keyboard-tool-panel-item">
      <button @click=${() => this._handleItemClick(item)}>
        ${this._renderIcon(item.icon)}
      </button>
      <span>${item.name}</span>
    </div>`;
        }
        render() {
            if (!this.config)
                return nothing;
            const groups = this.config.groups
                .map(group => (typeof group === 'function' ? group(this.context) : group))
                .filter((group) => group !== null);
            return repeat(groups, group => group.name, group => this._renderGroup(group));
        }
        willUpdate(changedProperties) {
            if (changedProperties.has('height')) {
                this.style.height = `${this.height}px`;
                if (this.height === 0) {
                    this.style.padding = '0';
                }
                else {
                    this.style.padding = '';
                }
            }
        }
        #config_accessor_storage;
        get config() { return this.#config_accessor_storage; }
        set config(value) { this.#config_accessor_storage = value; }
        #context_accessor_storage;
        get context() { return this.#context_accessor_storage; }
        set context(value) { this.#context_accessor_storage = value; }
        #height_accessor_storage;
        get height() { return this.#height_accessor_storage; }
        set height(value) { this.#height_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._handleItemClick = (item) => {
                if (item.disableWhen && item.disableWhen(this.context))
                    return;
                if (item.action) {
                    Promise.resolve(item.action(this.context)).catch(console.error);
                }
            };
            this.#config_accessor_storage = __runInitializers(this, _config_initializers, null);
            this.#context_accessor_storage = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _context_initializers, void 0));
            this.#height_accessor_storage = (__runInitializers(this, _context_extraInitializers), __runInitializers(this, _height_initializers, 0));
            __runInitializers(this, _height_extraInitializers);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AffineKeyboardToolPanel = _classThis;
})();
export { AffineKeyboardToolPanel };
//# sourceMappingURL=keyboard-tool-panel.js.map