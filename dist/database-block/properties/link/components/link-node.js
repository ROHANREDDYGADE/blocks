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
import { isValidUrl } from '@blocksuite/affine-shared/utils';
import { ShadowlessElement } from '@blocksuite/block-std';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
let LinkNode = (() => {
    let _classSuper = ShadowlessElement;
    let _link_decorators;
    let _link_initializers = [];
    let _link_extraInitializers = [];
    return class LinkNode extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _link_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _link_decorators, { kind: "accessor", name: "link", static: false, private: false, access: { has: obj => "link" in obj, get: obj => obj.link, set: (obj, value) => { obj.link = value; } }, metadata: _metadata }, _link_initializers, _link_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .link-node {
      word-break: break-all;
      color: var(--affine-link-color);
      fill: var(--affine-link-color);
      cursor: pointer;
      font-weight: normal;
      font-style: normal;
      text-decoration: none;
    }
  `; }
        render() {
            if (!isValidUrl(this.link)) {
                return html `<span class="normal-text">${this.link}</span>`;
            }
            return html `<a
      class="link-node"
      href=${this.link}
      rel="noopener noreferrer"
      target="_blank"
      ><span class="link-node-text">${this.link}</span></a
    >`;
        }
        #link_accessor_storage = __runInitializers(this, _link_initializers, void 0);
        get link() { return this.#link_accessor_storage; }
        set link(value) { this.#link_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _link_extraInitializers);
        }
    };
})();
export { LinkNode };
//# sourceMappingURL=link-node.js.map