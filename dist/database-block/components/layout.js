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
import { createModal } from '@blocksuite/affine-components/context-menu';
import { ShadowlessElement } from '@blocksuite/block-std';
import { CloseIcon } from '@blocksuite/icons/lit';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
let CenterPeek = (() => {
    let _classSuper = ShadowlessElement;
    let _close_decorators;
    let _close_initializers = [];
    let _close_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    return class CenterPeek extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _close_decorators = [property({ attribute: false })];
            _content_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _close_decorators, { kind: "accessor", name: "close", static: false, private: false, access: { has: obj => "close" in obj, get: obj => obj.close, set: (obj, value) => { obj.close = value; } }, metadata: _metadata }, _close_initializers, _close_extraInitializers);
            __esDecorate(this, null, _content_decorators, { kind: "accessor", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    center-peek {
      flex-direction: column;
      position: absolute;
      top: 5%;
      left: 5%;
      width: 90%;
      height: 90%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
      border-radius: 12px;
    }

    .side-modal-content {
      flex: 1;
      overflow-y: auto;
    }

    .close-modal:hover {
      background-color: var(--affine-hover-color);
    }
    .close-modal {
      position: absolute;
      right: -32px;
      top: 0;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  `; }
        render() {
            return html `
      <div @click="${this.close}" class="close-modal">${CloseIcon()}</div>
      ${this.content}
    `;
        }
        #close_accessor_storage = __runInitializers(this, _close_initializers, undefined);
        get close() { return this.#close_accessor_storage; }
        set close(value) { this.#close_accessor_storage = value; }
        #content_accessor_storage = (__runInitializers(this, _close_extraInitializers), __runInitializers(this, _content_initializers, undefined));
        get content() { return this.#content_accessor_storage; }
        set content(value) { this.#content_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _content_extraInitializers);
        }
    };
})();
export { CenterPeek };
export const popSideDetail = (template) => {
    return new Promise(res => {
        const modal = createModal(document.body);
        const close = () => {
            modal.remove();
            res();
        };
        const sideContainer = new CenterPeek();
        sideContainer.content = template;
        sideContainer.close = close;
        modal.onclick = e => e.target === modal && close();
        modal.append(sideContainer);
    });
};
//# sourceMappingURL=layout.js.map