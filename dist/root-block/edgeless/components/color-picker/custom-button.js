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
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { colorContainerStyles } from '../panel/color-panel.js';
let EdgelessColorCustomButton = (() => {
    let _classSuper = LitElement;
    let _active_decorators;
    let _active_initializers = [];
    let _active_extraInitializers = [];
    return class EdgelessColorCustomButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _active_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _active_decorators, { kind: "accessor", name: "active", static: false, private: false, access: { has: obj => "active" in obj, get: obj => obj.active, set: (obj, value) => { obj.active = value; } }, metadata: _metadata }, _active_initializers, _active_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    ${colorContainerStyles}

    .color-custom {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      box-sizing: border-box;
      overflow: hidden;
      padding: 2px;
      border: 2px solid transparent;
      background:
        linear-gradient(var(--c, transparent), var(--c, transparent))
          content-box,
        linear-gradient(var(--b, transparent), var(--b, transparent))
          padding-box,
        conic-gradient(
            from 180deg at 50% 50%,
            #d21c7e 0deg,
            #c240f0 30.697514712810516deg,
            #434af5 62.052921652793884deg,
            #3cb5f9 93.59999656677246deg,
            #3ceefa 131.40000343322754deg,
            #37f7bd 167.40000128746033deg,
            #2df541 203.39999914169312deg,
            #e7f738 239.40000772476196deg,
            #fbaf3e 273.07027101516724deg,
            #fd904e 300.73712825775146deg,
            #f64545 329.47510957717896deg,
            #f040a9 359.0167021751404deg
          )
          border-box;
    }
  `; }
        render() {
            return html `
      <div class="color-container" ?active=${this.active}>
        <div class="color-unit color-custom"></div>
      </div>
    `;
        }
        #active_accessor_storage = __runInitializers(this, _active_initializers, void 0);
        get active() { return this.#active_accessor_storage; }
        set active(value) { this.#active_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _active_extraInitializers);
        }
    };
})();
export { EdgelessColorCustomButton };
//# sourceMappingURL=custom-button.js.map