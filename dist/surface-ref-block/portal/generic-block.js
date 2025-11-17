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
import { ShadowlessElement } from '@blocksuite/block-std';
import { Bound, WithDisposable } from '@blocksuite/global/utils';
import { css } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { html } from 'lit/static-html.js';
let SurfaceRefGenericBlockPortal = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _index_decorators;
    let _index_initializers = [];
    let _index_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _renderModel_decorators;
    let _renderModel_initializers = [];
    let _renderModel_extraInitializers = [];
    return class SurfaceRefGenericBlockPortal extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _index_decorators = [property({ attribute: false })];
            _model_decorators = [property({ attribute: false })];
            _renderModel_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _index_decorators, { kind: "accessor", name: "index", static: false, private: false, access: { has: obj => "index" in obj, get: obj => obj.index, set: (obj, value) => { obj.index = value; } }, metadata: _metadata }, _index_initializers, _index_extraInitializers);
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(this, null, _renderModel_decorators, { kind: "accessor", name: "renderModel", static: false, private: false, access: { has: obj => "renderModel" in obj, get: obj => obj.renderModel, set: (obj, value) => { obj.renderModel = value; } }, metadata: _metadata }, _renderModel_initializers, _renderModel_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    surface-ref-generic-block-portal {
      position: relative;
    }
  `; }
        firstUpdated() {
            this.disposables.add(this.model.propsUpdated.on(() => this.requestUpdate()));
        }
        render() {
            const { model, index } = this;
            const bound = Bound.deserialize(model.xywh);
            const style = {
                position: 'absolute',
                zIndex: `${index}`,
                width: `${bound.w}px`,
                height: `${bound.h}px`,
                transform: `translate(${bound.x}px, ${bound.y}px)`,
            };
            return html `
      <div
        style=${styleMap(style)}
        data-portal-reference-block-id="${model.id}"
      >
        ${this.renderModel(model)}
      </div>
    `;
        }
        #index_accessor_storage = __runInitializers(this, _index_initializers, void 0);
        get index() { return this.#index_accessor_storage; }
        set index(value) { this.#index_accessor_storage = value; }
        #model_accessor_storage = (__runInitializers(this, _index_extraInitializers), __runInitializers(this, _model_initializers, void 0));
        get model() { return this.#model_accessor_storage; }
        set model(value) { this.#model_accessor_storage = value; }
        #renderModel_accessor_storage = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _renderModel_initializers, void 0));
        get renderModel() { return this.#renderModel_accessor_storage; }
        set renderModel(value) { this.#renderModel_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _renderModel_extraInitializers);
        }
    };
})();
export { SurfaceRefGenericBlockPortal };
//# sourceMappingURL=generic-block.js.map