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
import { styleMap } from 'lit/directives/style-map.js';
// FIXME: horizontal
let MenuDivider = (() => {
    let _classSuper = LitElement;
    let _dividerMargin_decorators;
    let _dividerMargin_initializers = [];
    let _dividerMargin_extraInitializers = [];
    let _vertical_decorators;
    let _vertical_initializers = [];
    let _vertical_extraInitializers = [];
    return class MenuDivider extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _dividerMargin_decorators = [property({ attribute: false })];
            _vertical_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _dividerMargin_decorators, { kind: "accessor", name: "dividerMargin", static: false, private: false, access: { has: obj => "dividerMargin" in obj, get: obj => obj.dividerMargin, set: (obj, value) => { obj.dividerMargin = value; } }, metadata: _metadata }, _dividerMargin_initializers, _dividerMargin_extraInitializers);
            __esDecorate(this, null, _vertical_decorators, { kind: "accessor", name: "vertical", static: false, private: false, access: { has: obj => "vertical" in obj, get: obj => obj.vertical, set: (obj, value) => { obj.vertical = value; } }, metadata: _metadata }, _vertical_initializers, _vertical_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: inline-block;
    }

    .divider {
      background-color: var(--affine-border-color);
    }

    .divider.vertical {
      width: 1px;
      height: 100%;
      margin: 0 var(--divider-margin);
    }

    .divider.horizontal {
      width: 100%;
      height: 1px;
      margin: var(--divider-margin) 0;
    }
  `; }
        render() {
            const dividerStyles = styleMap({
                '--divider-margin': `${this.dividerMargin}px`,
            });
            return html `<div
      class="divider ${this.vertical ? 'vertical' : 'horizontal'}"
      style=${dividerStyles}
    ></div>`;
        }
        #dividerMargin_accessor_storage = __runInitializers(this, _dividerMargin_initializers, 7);
        get dividerMargin() { return this.#dividerMargin_accessor_storage; }
        set dividerMargin(value) { this.#dividerMargin_accessor_storage = value; }
        #vertical_accessor_storage = (__runInitializers(this, _dividerMargin_extraInitializers), __runInitializers(this, _vertical_initializers, false));
        get vertical() { return this.#vertical_accessor_storage; }
        set vertical(value) { this.#vertical_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _vertical_extraInitializers);
        }
    };
})();
export { MenuDivider };
//# sourceMappingURL=menu-divider.js.map