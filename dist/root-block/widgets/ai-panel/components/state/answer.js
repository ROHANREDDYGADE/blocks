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
import { baseTheme } from '@toeverything/theme';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { filterAIItemGroup } from '../../utils.js';
let AIPanelAnswer = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _copy_decorators;
    let _copy_initializers = [];
    let _copy_extraInitializers = [];
    let _finish_decorators;
    let _finish_initializers = [];
    let _finish_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    return class AIPanelAnswer extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _config_decorators = [property({ attribute: false })];
            _copy_decorators = [property({ attribute: false })];
            _finish_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _config_decorators, { kind: "accessor", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(this, null, _copy_decorators, { kind: "accessor", name: "copy", static: false, private: false, access: { has: obj => "copy" in obj, get: obj => obj.copy, set: (obj, value) => { obj.copy = value; } }, metadata: _metadata }, _copy_initializers, _copy_extraInitializers);
            __esDecorate(this, null, _finish_decorators, { kind: "accessor", name: "finish", static: false, private: false, access: { has: obj => "finish" in obj, get: obj => obj.finish, set: (obj, value) => { obj.finish = value; } }, metadata: _metadata }, _finish_initializers, _finish_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      width: 100%;
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      gap: 8px;
      padding: 0;
    }

    .answer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 4px;
      align-self: stretch;
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
      padding: 0 12px;
    }

    .answer-head {
      align-self: stretch;

      color: var(--affine-text-secondary-color);

      /* light/xsMedium */
      font-size: var(--affine-font-xs);
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 166.667% */
      height: 20px;
    }

    .answer-body {
      align-self: stretch;

      color: var(--affine-text-primary-color);
      font-feature-settings:
        'clig' off,
        'liga' off;

      /* light/sm */
      font-size: var(--affine-font-xs);
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 157.143% */
    }

    .response-list-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .response-list-container,
    .action-list-container {
      padding: 0 8px;
      user-select: none;
    }

    /* set item style outside ai-item */
    .response-list-container ai-item-list,
    .action-list-container ai-item-list {
      --item-padding: 4px;
    }

    .response-list-container ai-item-list {
      --item-icon-color: var(--affine-icon-secondary);
      --item-icon-hover-color: var(--affine-icon-color);
    }
  `; }
        render() {
            const responseGroup = filterAIItemGroup(this.host, this.config.responses);
            return html `
      <div class="answer">
        <div class="answer-head">Answer</div>
        <div class="answer-body">
          <slot></slot>
        </div>
      </div>
      ${this.finish
                ? html `
            <ai-finish-tip
              .copy=${this.copy}
              .host=${this.host}
            ></ai-finish-tip>
            ${responseGroup.length > 0
                    ? html `
                  <ai-panel-divider></ai-panel-divider>
                  ${responseGroup.map((group, index) => html `
                      ${index !== 0
                        ? html `<ai-panel-divider></ai-panel-divider>`
                        : nothing}
                      <div class="response-list-container">
                        <ai-item-list
                          .host=${this.host}
                          .groups=${[group]}
                        ></ai-item-list>
                      </div>
                    `)}
                `
                    : nothing}
            ${responseGroup.length > 0 && this.config.actions.length > 0
                    ? html `<ai-panel-divider></ai-panel-divider>`
                    : nothing}
            ${this.config.actions.length > 0
                    ? html `
                  <div class="action-list-container">
                    <ai-item-list
                      .host=${this.host}
                      .groups=${this.config.actions}
                    ></ai-item-list>
                  </div>
                `
                    : nothing}
          `
                : nothing}
    `;
        }
        #config_accessor_storage = __runInitializers(this, _config_initializers, void 0);
        get config() { return this.#config_accessor_storage; }
        set config(value) { this.#config_accessor_storage = value; }
        #copy_accessor_storage = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _copy_initializers, undefined));
        get copy() { return this.#copy_accessor_storage; }
        set copy(value) { this.#copy_accessor_storage = value; }
        #finish_accessor_storage = (__runInitializers(this, _copy_extraInitializers), __runInitializers(this, _finish_initializers, true));
        get finish() { return this.#finish_accessor_storage; }
        set finish(value) { this.#finish_accessor_storage = value; }
        #host_accessor_storage = (__runInitializers(this, _finish_extraInitializers), __runInitializers(this, _host_initializers, void 0));
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _host_extraInitializers);
        }
    };
})();
export { AIPanelAnswer };
//# sourceMappingURL=answer.js.map