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
import { ArrowRightIcon, EnterIcon } from '@blocksuite/affine-components/icons';
import { EditorHost, PropTypes, requiredProperties, } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/global/utils';
import { css, html, LitElement, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { menuItemStyles } from './styles.js';
let AIItem = (() => {
    let _classDecorators = [requiredProperties({
            host: PropTypes.instanceOf(EditorHost),
            item: PropTypes.object,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = WithDisposable(LitElement);
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _item_decorators;
    let _item_initializers = [];
    let _item_extraInitializers = [];
    let _menuItem_decorators;
    let _menuItem_initializers = [];
    let _menuItem_extraInitializers = [];
    let _onClick_decorators;
    let _onClick_initializers = [];
    let _onClick_extraInitializers = [];
    var AIItem = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _host_decorators = [property({ attribute: false })];
            _item_decorators = [property({ attribute: false })];
            _menuItem_decorators = [query('.menu-item')];
            _onClick_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _item_decorators, { kind: "accessor", name: "item", static: false, private: false, access: { has: obj => "item" in obj, get: obj => obj.item, set: (obj, value) => { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
            __esDecorate(this, null, _menuItem_decorators, { kind: "accessor", name: "menuItem", static: false, private: false, access: { has: obj => "menuItem" in obj, get: obj => obj.menuItem, set: (obj, value) => { obj.menuItem = value; } }, metadata: _metadata }, _menuItem_initializers, _menuItem_extraInitializers);
            __esDecorate(this, null, _onClick_decorators, { kind: "accessor", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick, set: (obj, value) => { obj.onClick = value; } }, metadata: _metadata }, _onClick_initializers, _onClick_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AIItem = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    ${menuItemStyles}
  `; }
        render() {
            const { item } = this;
            const className = item.name.split(' ').join('-').toLocaleLowerCase();
            return html `<div
      class="menu-item ${className}"
      @pointerdown=${(e) => e.stopPropagation()}
      @click=${() => {
                this.onClick?.();
                if (typeof item.handler === 'function') {
                    item.handler(this.host);
                }
            }}
    >
      <span class="item-icon">${item.icon}</span>
      <div class="item-name">
        ${item.name}${item.beta
                ? html `<div class="item-beta">(Beta)</div>`
                : nothing}
      </div>
      ${item.subItem
                ? html `<span class="arrow-right-icon">${ArrowRightIcon}</span>`
                : html `<span class="enter-icon">${EnterIcon}</span>`}
    </div>`;
        }
        #host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #item_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _item_initializers, void 0));
        get item() { return this.#item_accessor_storage; }
        set item(value) { this.#item_accessor_storage = value; }
        #menuItem_accessor_storage = (__runInitializers(this, _item_extraInitializers), __runInitializers(this, _menuItem_initializers, null));
        get menuItem() { return this.#menuItem_accessor_storage; }
        set menuItem(value) { this.#menuItem_accessor_storage = value; }
        #onClick_accessor_storage = (__runInitializers(this, _menuItem_extraInitializers), __runInitializers(this, _onClick_initializers, void 0));
        get onClick() { return this.#onClick_accessor_storage; }
        set onClick(value) { this.#onClick_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _onClick_extraInitializers);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AIItem = _classThis;
})();
export { AIItem };
//# sourceMappingURL=ai-item.js.map