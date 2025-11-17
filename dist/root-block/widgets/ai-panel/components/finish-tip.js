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
import { AIDoneIcon, CopyIcon, WarningIcon, } from '@blocksuite/affine-components/icons';
import { NotificationProvider } from '@blocksuite/affine-shared/services';
import { WithDisposable } from '@blocksuite/global/utils';
import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
let AIFinishTip = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _copied_decorators;
    let _copied_initializers = [];
    let _copied_extraInitializers = [];
    let _copy_decorators;
    let _copy_initializers = [];
    let _copy_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    return class AIFinishTip extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _copied_decorators = [state()];
            _copy_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _copied_decorators, { kind: "accessor", name: "copied", static: false, private: false, access: { has: obj => "copied" in obj, get: obj => obj.copied, set: (obj, value) => { obj.copied = value; } }, metadata: _metadata }, _copied_initializers, _copied_extraInitializers);
            __esDecorate(this, null, _copy_decorators, { kind: "accessor", name: "copy", static: false, private: false, access: { has: obj => "copy" in obj, get: obj => obj.copy, set: (obj, value) => { obj.copy = value; } }, metadata: _metadata }, _copy_initializers, _copy_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .finish-tip {
      display: flex;
      box-sizing: border-box;
      width: 100%;
      height: 22px;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      gap: 4px;

      color: var(--affine-text-secondary-color);

      .text {
        display: flex;
        align-items: flex-start;
        flex: 1 0 0;

        /* light/xs */
        font-size: var(--affine-font-xs);
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
      }

      .right {
        display: flex;
        align-items: center;

        .copy,
        .copied {
          display: flex;
          width: 20px;
          height: 20px;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          user-select: none;
        }
        .copy:hover {
          color: var(--affine-icon-color);
          background: var(--affine-hover-color);
          cursor: pointer;
        }
        .copied {
          color: var(--affine-brand-color);
        }
      }
    }
  `; }
        render() {
            return html `<div class="finish-tip">
      ${WarningIcon}
      <div class="text">AI outputs can be misleading or wrong</div>
      ${this.copy?.allowed
                ? html `<div class="right">
            ${this.copied
                    ? html `<div class="copied">${AIDoneIcon}</div>`
                    : html `<div
                  class="copy"
                  @click=${async () => {
                        this.copied = !!(await this.copy?.onCopy());
                        if (this.copied) {
                            this.host.std
                                .getOptional(NotificationProvider)
                                ?.toast('Copied to clipboard');
                        }
                    }}
                >
                  ${CopyIcon}
                  <affine-tooltip>Copy</affine-tooltip>
                </div>`}
          </div>`
                : nothing}
    </div>`;
        }
        #copied_accessor_storage = __runInitializers(this, _copied_initializers, false);
        get copied() { return this.#copied_accessor_storage; }
        set copied(value) { this.#copied_accessor_storage = value; }
        #copy_accessor_storage = (__runInitializers(this, _copied_extraInitializers), __runInitializers(this, _copy_initializers, undefined));
        get copy() { return this.#copy_accessor_storage; }
        set copy(value) { this.#copy_accessor_storage = value; }
        #host_accessor_storage = (__runInitializers(this, _copy_extraInitializers), __runInitializers(this, _host_initializers, void 0));
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _host_extraInitializers);
        }
    };
})();
export { AIFinishTip };
//# sourceMappingURL=finish-tip.js.map