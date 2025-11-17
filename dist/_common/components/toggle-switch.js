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
const styles = css `
  :host {
    display: flex;
  }

  .switch {
    height: 0;
    width: 0;
    visibility: hidden;
    margin: 0;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 38px;
    height: 20px;
    background: var(--affine-icon-color);
    border: 1px solid var(--affine-black-10);
    display: block;
    border-radius: 20px;
    position: relative;
  }

  label:after {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 16px;
    height: 16px;
    background: var(--affine-white);
    border: 1px solid var(--affine-black-10);
    border-radius: 16px;
    transition: 0.1s;
  }

  label.on {
    background: var(--affine-primary-color);
  }

  label.on:after {
    left: calc(100% - 1px);
    transform: translateX(-100%);
  }

  label:active:after {
    width: 24px;
  }
`;
let ToggleSwitch = (() => {
    let _classSuper = LitElement;
    let _on_decorators;
    let _on_initializers = [];
    let _on_extraInitializers = [];
    let _onChange_decorators;
    let _onChange_initializers = [];
    let _onChange_extraInitializers = [];
    return class ToggleSwitch extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _on_decorators = [property({ attribute: false })];
            _onChange_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _on_decorators, { kind: "accessor", name: "on", static: false, private: false, access: { has: obj => "on" in obj, get: obj => obj.on, set: (obj, value) => { obj.on = value; } }, metadata: _metadata }, _on_initializers, _on_extraInitializers);
            __esDecorate(this, null, _onChange_decorators, { kind: "accessor", name: "onChange", static: false, private: false, access: { has: obj => "onChange" in obj, get: obj => obj.onChange, set: (obj, value) => { obj.onChange = value; } }, metadata: _metadata }, _onChange_initializers, _onChange_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = styles; }
        _toggleSwitch() {
            this.on = !this.on;
            if (this.onChange) {
                this.onChange(this.on);
            }
        }
        render() {
            return html `
      <label class=${this.on ? 'on' : ''}>
        <input
          type="checkbox"
          class="switch"
          ?checked=${this.on}
          @change=${this._toggleSwitch}
        />
      </label>
    `;
        }
        #on_accessor_storage = __runInitializers(this, _on_initializers, false);
        get on() { return this.#on_accessor_storage; }
        set on(value) { this.#on_accessor_storage = value; }
        #onChange_accessor_storage = (__runInitializers(this, _on_extraInitializers), __runInitializers(this, _onChange_initializers, undefined));
        get onChange() { return this.#onChange_accessor_storage; }
        set onChange(value) { this.#onChange_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _onChange_extraInitializers);
        }
    };
})();
export { ToggleSwitch };
//# sourceMappingURL=toggle-switch.js.map