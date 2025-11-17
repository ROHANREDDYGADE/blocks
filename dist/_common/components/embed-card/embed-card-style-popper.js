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
import { WithDisposable } from '@blocksuite/global/utils';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { getEmbedCardIcons } from '../../utils/url.js';
let EmbedCardStyleMenu = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _abortController_decorators;
    let _abortController_initializers = [];
    let _abortController_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _theme_decorators;
    let _theme_initializers = [];
    let _theme_extraInitializers = [];
    return class EmbedCardStyleMenu extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _abortController_decorators = [property({ attribute: false })];
            _model_decorators = [property({ attribute: false })];
            _theme_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _abortController_decorators, { kind: "accessor", name: "abortController", static: false, private: false, access: { has: obj => "abortController" in obj, get: obj => obj.abortController, set: (obj, value) => { obj.abortController = value; } }, metadata: _metadata }, _abortController_initializers, _abortController_extraInitializers);
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(this, null, _theme_decorators, { kind: "accessor", name: "theme", static: false, private: false, access: { has: obj => "theme" in obj, get: obj => obj.theme, set: (obj, value) => { obj.theme = value; } }, metadata: _metadata }, _theme_initializers, _theme_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .embed-card-style-menu {
      box-sizing: border-box;
      padding-bottom: 8px;
    }

    .embed-card-style-menu-container {
      border-radius: 8px;
      padding: 8px;
      gap: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--affine-background-overlay-panel-color);
      box-shadow: var(--affine-shadow-2);
    }

    .embed-card-style-menu-container > icon-button {
      padding: var(--1, 0px);
    }

    .embed-card-style-menu-container > icon-button.selected {
      border: 1px solid var(--affine-brand-color);
    }
  `; }
        _setEmbedCardStyle(style) {
            this.model.doc.updateBlock(this.model, { style });
            this.requestUpdate();
            this.abortController.abort();
        }
        render() {
            const { EmbedCardHorizontalIcon, EmbedCardListIcon } = getEmbedCardIcons(this.theme);
            return html `
      <div class="embed-card-style-menu">
        <div
          class="embed-card-style-menu-container"
          @pointerdown=${(e) => e.stopPropagation()}
        >
          <icon-button
            width="76px"
            height="76px"
            class=${classMap({
                selected: this.model.style === 'horizontal',
                'card-style-button-horizontal': true,
            })}
            @click=${() => this._setEmbedCardStyle('horizontal')}
          >
            ${EmbedCardHorizontalIcon}
            <affine-tooltip .offset=${4}
              >${'Large horizontal style'}</affine-tooltip
            >
          </icon-button>

          <icon-button
            width="76px"
            height="76px"
            class=${classMap({
                selected: this.model.style === 'list',
                'card-style-button-list': true,
            })}
            @click=${() => this._setEmbedCardStyle('list')}
          >
            ${EmbedCardListIcon}
            <affine-tooltip .offset=${4}
              >${'Small horizontal style'}</affine-tooltip
            >
          </icon-button>
        </div>
      </div>
    `;
        }
        #abortController_accessor_storage = __runInitializers(this, _abortController_initializers, void 0);
        get abortController() { return this.#abortController_accessor_storage; }
        set abortController(value) { this.#abortController_accessor_storage = value; }
        #model_accessor_storage = (__runInitializers(this, _abortController_extraInitializers), __runInitializers(this, _model_initializers, void 0));
        get model() { return this.#model_accessor_storage; }
        set model(value) { this.#model_accessor_storage = value; }
        #theme_accessor_storage = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _theme_initializers, void 0));
        get theme() { return this.#theme_accessor_storage; }
        set theme(value) { this.#theme_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _theme_extraInitializers);
        }
    };
})();
export { EmbedCardStyleMenu };
//# sourceMappingURL=embed-card-style-popper.js.map