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
import { Point } from '@blocksuite/global/utils';
import { baseTheme } from '@toeverything/theme';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
let DragPreview = (() => {
    let _classSuper = ShadowlessElement;
    let _onRemove_decorators;
    let _onRemove_initializers = [];
    let _onRemove_extraInitializers = [];
    let _template_decorators;
    let _template_initializers = [];
    let _template_extraInitializers = [];
    return class DragPreview extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _onRemove_decorators = [property({ attribute: false })];
            _template_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _onRemove_decorators, { kind: "accessor", name: "onRemove", static: false, private: false, access: { has: obj => "onRemove" in obj, get: obj => obj.onRemove, set: (obj, value) => { obj.onRemove = value; } }, metadata: _metadata }, _onRemove_initializers, _onRemove_extraInitializers);
            __esDecorate(this, null, _template_decorators, { kind: "accessor", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        constructor(offset) {
            super();
            __runInitializers(this, _template_extraInitializers);
            this.offset = offset ?? new Point(0, 0);
        }
        disconnectedCallback() {
            if (this.onRemove) {
                this.onRemove();
            }
            super.disconnectedCallback();
        }
        render() {
            return html `<style>
        affine-drag-preview {
          box-sizing: border-box;
          position: absolute;
          display: block;
          height: auto;
          font-family: ${baseTheme.fontSansFamily};
          font-size: var(--affine-font-base);
          line-height: var(--affine-line-height);
          color: var(--affine-text-primary-color);
          font-weight: 400;
          top: 0;
          left: 0;
          transform-origin: 0 0;
          opacity: 0.5;
          user-select: none;
          pointer-events: none;
          caret-color: transparent;
          z-index: 3;
        }

        .affine-drag-preview-grabbing * {
          cursor: grabbing !important;
        }</style
      >${this.template}`;
        }
        #onRemove_accessor_storage = __runInitializers(this, _onRemove_initializers, null);
        get onRemove() { return this.#onRemove_accessor_storage; }
        set onRemove(value) { this.#onRemove_accessor_storage = value; }
        #template_accessor_storage = (__runInitializers(this, _onRemove_extraInitializers), __runInitializers(this, _template_initializers, null));
        get template() { return this.#template_accessor_storage; }
        set template(value) { this.#template_accessor_storage = value; }
    };
})();
export { DragPreview };
//# sourceMappingURL=drag-preview.js.map