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
import { createLitPortal } from '@blocksuite/affine-components/portal';
import { EditorHost, PropTypes, requiredProperties, } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/global/utils';
import { flip, offset } from '@floating-ui/dom';
import { baseTheme } from '@toeverything/theme';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { SUBMENU_OFFSET_CROSS_AXIS, SUBMENU_OFFSET_MAIN_AXIS, } from './const.js';
let AIItemList = (() => {
    let _classDecorators = [requiredProperties({ host: PropTypes.instanceOf(EditorHost) })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = WithDisposable(LitElement);
    let _groups_decorators;
    let _groups_initializers = [];
    let _groups_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _onClick_decorators;
    let _onClick_initializers = [];
    let _onClick_extraInitializers = [];
    var AIItemList = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _groups_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _onClick_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _groups_decorators, { kind: "accessor", name: "groups", static: false, private: false, access: { has: obj => "groups" in obj, get: obj => obj.groups, set: (obj, value) => { obj.groups = value; } }, metadata: _metadata }, _groups_initializers, _groups_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _onClick_decorators, { kind: "accessor", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick, set: (obj, value) => { obj.onClick = value; } }, metadata: _metadata }, _onClick_initializers, _onClick_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AIItemList = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      flex-direction: column;
      gap: 2px;
      width: 100%;
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
      user-select: none;
    }
    .group-name {
      display: flex;
      padding: 4px calc(var(--item-padding, 8px) + 4px);
      align-items: center;
      color: var(--affine-text-secondary-color);
      text-align: justify;
      font-size: var(--affine-font-xs);
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      width: 100%;
      box-sizing: border-box;
    }
  `; }
        render() {
            return html `${repeat(this.groups, group => {
                return html `
        ${group.name
                    ? html `<div class="group-name">
              ${group.name.toLocaleUpperCase()}
            </div>`
                    : nothing}
        ${repeat(group.items, item => html `<ai-item
              .onClick=${this.onClick}
              .item=${item}
              .host=${this.host}
              class=${this._itemClassName(item)}
              @mouseover=${() => {
                    this._openSubMenu(item);
                }}
            ></ai-item>`)}
      `;
            })}`;
        }
        #groups_accessor_storage;
        get groups() { return this.#groups_accessor_storage; }
        set groups(value) { this.#groups_accessor_storage = value; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #onClick_accessor_storage;
        get onClick() { return this.#onClick_accessor_storage; }
        set onClick(value) { this.#onClick_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._abortController = null;
            this._activeSubMenuItem = null;
            this._closeSubMenu = () => {
                if (this._abortController) {
                    this._abortController.abort();
                    this._abortController = null;
                }
                this._activeSubMenuItem = null;
            };
            this._itemClassName = (item) => {
                return 'ai-item-' + item.name.split(' ').join('-').toLocaleLowerCase();
            };
            this._openSubMenu = (item) => {
                if (!item.subItem || item.subItem.length === 0) {
                    this._closeSubMenu();
                    return;
                }
                if (item === this._activeSubMenuItem) {
                    return;
                }
                const aiItem = this.shadowRoot?.querySelector(`.${this._itemClassName(item)}`);
                if (!aiItem || !aiItem.menuItem)
                    return;
                this._closeSubMenu();
                this._activeSubMenuItem = item;
                this._abortController = new AbortController();
                this._abortController.signal.addEventListener('abort', () => {
                    this._closeSubMenu();
                });
                const aiItemContainer = aiItem.menuItem;
                const subMenuOffset = {
                    mainAxis: item.subItemOffset?.[0] ?? SUBMENU_OFFSET_MAIN_AXIS,
                    crossAxis: item.subItemOffset?.[1] ?? SUBMENU_OFFSET_CROSS_AXIS,
                };
                createLitPortal({
                    template: html `<ai-sub-item-list
        .item=${item}
        .host=${this.host}
        .onClick=${this.onClick}
        .abortController=${this._abortController}
      ></ai-sub-item-list>`,
                    container: aiItemContainer,
                    positionStrategy: 'fixed',
                    computePosition: {
                        referenceElement: aiItemContainer,
                        placement: 'right-start',
                        middleware: [flip(), offset(subMenuOffset)],
                        autoUpdate: true,
                    },
                    abortController: this._abortController,
                    closeOnClickAway: true,
                });
            };
            this.#groups_accessor_storage = __runInitializers(this, _groups_initializers, []);
            this.#host_accessor_storage = (__runInitializers(this, _groups_extraInitializers), __runInitializers(this, _host_initializers, void 0));
            this.#onClick_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _onClick_initializers, undefined));
            __runInitializers(this, _onClick_extraInitializers);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AIItemList = _classThis;
})();
export { AIItemList };
//# sourceMappingURL=ai-item-list.js.map