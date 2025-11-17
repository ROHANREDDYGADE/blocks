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
import { BLOCK_ID_ATTR } from '@blocksuite/block-std';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
let Loader = (() => {
    let _classSuper = LitElement;
    let _hostModel_decorators;
    let _hostModel_initializers = [];
    let _hostModel_extraInitializers = [];
    let _radius_decorators;
    let _radius_initializers = [];
    let _radius_extraInitializers = [];
    let _width_decorators;
    let _width_initializers = [];
    let _width_extraInitializers = [];
    return class Loader extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _hostModel_decorators = [property({ attribute: false })];
            _radius_decorators = [property({ attribute: false })];
            _width_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _hostModel_decorators, { kind: "accessor", name: "hostModel", static: false, private: false, access: { has: obj => "hostModel" in obj, get: obj => obj.hostModel, set: (obj, value) => { obj.hostModel = value; } }, metadata: _metadata }, _hostModel_initializers, _hostModel_extraInitializers);
            __esDecorate(this, null, _radius_decorators, { kind: "accessor", name: "radius", static: false, private: false, access: { has: obj => "radius" in obj, get: obj => obj.radius, set: (obj, value) => { obj.radius = value; } }, metadata: _metadata }, _radius_initializers, _radius_extraInitializers);
            __esDecorate(this, null, _width_decorators, { kind: "accessor", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .load-container {
      margin: 10px auto;
      width: var(--loader-width);
      text-align: center;
    }

    .load-container .load {
      width: 8px;
      height: 8px;
      background-color: var(--affine-text-primary-color);

      border-radius: 100%;
      display: inline-block;
      -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
      animation: bouncedelay 1.4s infinite ease-in-out;
      /* Prevent first note from flickering when animation starts */
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    .load-container .load1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
    .load-container .load2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    @-webkit-keyframes bouncedelay {
      0%,
      80%,
      100% {
        -webkit-transform: scale(0.625);
      }
      40% {
        -webkit-transform: scale(1);
      }
    }

    @keyframes bouncedelay {
      0%,
      80%,
      100% {
        transform: scale(0);
        -webkit-transform: scale(0.625);
      }
      40% {
        transform: scale(1);
        -webkit-transform: scale(1);
      }
    }
  `; }
        constructor() {
            super();
            __runInitializers(this, _width_extraInitializers);
        }
        connectedCallback() {
            super.connectedCallback();
            if (this.hostModel) {
                this.setAttribute(BLOCK_ID_ATTR, this.hostModel.id);
                this.dataset.serviceLoading = 'true';
            }
            const width = this.width;
            this.style.setProperty('--loader-width', typeof width === 'string' ? width : `${width}px`);
        }
        render() {
            return html `
      <div class="load-container">
        <div class="load load1"></div>
        <div class="load load2"></div>
        <div class="load"></div>
      </div>
    `;
        }
        #hostModel_accessor_storage = __runInitializers(this, _hostModel_initializers, null);
        get hostModel() { return this.#hostModel_accessor_storage; }
        set hostModel(value) { this.#hostModel_accessor_storage = value; }
        #radius_accessor_storage = (__runInitializers(this, _hostModel_extraInitializers), __runInitializers(this, _radius_initializers, '8px'));
        get radius() { return this.#radius_accessor_storage; }
        set radius(value) { this.#radius_accessor_storage = value; }
        #width_accessor_storage = (__runInitializers(this, _radius_extraInitializers), __runInitializers(this, _width_initializers, '150px'));
        get width() { return this.#width_accessor_storage; }
        set width(value) { this.#width_accessor_storage = value; }
    };
})();
export { Loader };
//# sourceMappingURL=loader.js.map