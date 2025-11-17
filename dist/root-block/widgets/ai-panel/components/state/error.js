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
import { choose } from 'lit/directives/choose.js';
import { AIErrorType, } from '../../../../../_common/components/index.js';
import { filterAIItemGroup } from '../../utils.js';
let AIPanelError = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _copy_decorators;
    let _copy_initializers = [];
    let _copy_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _withAnswer_decorators;
    let _withAnswer_initializers = [];
    let _withAnswer_extraInitializers = [];
    return class AIPanelError extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _config_decorators = [property({ attribute: false })];
            _copy_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _withAnswer_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _config_decorators, { kind: "accessor", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(this, null, _copy_decorators, { kind: "accessor", name: "copy", static: false, private: false, access: { has: obj => "copy" in obj, get: obj => obj.copy, set: (obj, value) => { obj.copy = value; } }, metadata: _metadata }, _copy_initializers, _copy_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _withAnswer_decorators, { kind: "accessor", name: "withAnswer", static: false, private: false, access: { has: obj => "withAnswer" in obj, get: obj => obj.withAnswer, set: (obj, value) => { obj.withAnswer = value; } }, metadata: _metadata }, _withAnswer_initializers, _withAnswer_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0;
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    }

    .error {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      align-self: stretch;
      padding: 0px 12px;
      gap: 4px;
      .answer-tip {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 4px;
        align-self: stretch;
        .answer-label {
          align-self: stretch;
          color: var(--affine-text-secondary-color);
          /* light/xsMedium */
          font-size: var(--affine-font-xs);
          font-style: normal;
          font-weight: 500;
          line-height: 20px; /* 166.667% */
        }
      }
      .error-info {
        align-self: stretch;
        color: var(--affine-error-color, #eb4335);
        font-feature-settings:
          'clig' off,
          'liga' off;
        /* light/sm */
        font-size: var(--affine-font-sm);
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 157.143% */

        a {
          color: inherit;
        }
      }
      .action-button-group {
        display: flex;
        width: 100%;
        gap: 16px;
        align-items: center;
        justify-content: end;
        margin-top: 4px;
      }
      .action-button {
        display: flex;
        box-sizing: border-box;
        padding: 4px 12px;
        justify-content: center;
        align-items: center;
        gap: 4px;
        border-radius: 8px;
        border: 1px solid var(--affine-border-color);
        background: var(--affine-white);
        color: var(--affine-text-primary-color);
        /* light/xsMedium */
        font-size: var(--affine-font-xs);
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 166.667% */
      }
      .action-button:hover {
        cursor: pointer;
      }
      .action-button.primary {
        border: 1px solid var(--affine-black-10);
        background: var(--affine-primary-color);
        color: var(--affine-pure-white);
      }
      .action-button > span {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 4px;
      }
      .action-button:not(.primary):hover {
        background: var(--affine-hover-color);
      }
    }

    ai-panel-divider {
      margin-top: 4px;
    }

    .response-list-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 0 8px;
      user-select: none;
    }

    .response-list-container ai-item-list {
      --item-padding: 4px;
      --item-icon-color: var(--affine-icon-secondary);
      --item-icon-hover-color: var(--affine-icon-color);
    }
  `; }
        render() {
            const responseGroup = this._getResponseGroup();
            const errorTemplate = choose(this.config.error?.type, [
                [
                    AIErrorType.Unauthorized,
                    () => html ` <div class="error-info">
                You need to login to AFFiNE Cloud to continue using AFFiNE AI.
              </div>
              <div class="action-button-group">
                <div @click=${this.config.cancel} class="action-button">
                  <span>Cancel</span>
                </div>
                <div @click=${this.config.login} class="action-button primary">
                  <span>login</span>
                </div>
              </div>`,
                ],
                [
                    AIErrorType.PaymentRequired,
                    () => html ` <div class="error-info">
                You've reached the current usage cap for AFFiNE AI. You can
                subscribe to AFFiNE AI to continue the AI experience!
              </div>
              <div class="action-button-group">
                <div @click=${this.config.cancel} class="action-button">
                  <span>Cancel</span>
                </div>
                <div
                  @click=${this.config.upgrade}
                  class="action-button primary"
                >
                  <span>Upgrade</span>
                </div>
              </div>`,
                ],
            ], 
            // default error handler
            () => {
                const tip = this.config.error?.message;
                const error = tip
                    ? html `<span class="error-tip"
              >An error occurred<affine-tooltip
                tip-position="bottom-start"
                .arrow=${false}
                >${tip}</affine-tooltip
              ></span
            >`
                    : 'An error occurred';
                return html `
          <style>
            .error-tip {
              text-decoration: underline;
            }
          </style>
          <div class="error-info">
            ${error}. Please try again later. If this issue persists, please let
            us know at
            <a href="mailto:support@toeverything.info">
              support@toeverything.info
            </a>
          </div>
        `;
            });
            return html `
      <div class="error">
        <div class="answer-tip">
          <div class="answer-label">Answer</div>
          <slot></slot>
        </div>
        ${errorTemplate}
      </div>
      ${this.withAnswer
                ? html `<ai-finish-tip
            .copy=${this.copy}
            .host=${this.host}
          ></ai-finish-tip>`
                : nothing}
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
    `;
        }
        #config_accessor_storage;
        get config() { return this.#config_accessor_storage; }
        set config(value) { this.#config_accessor_storage = value; }
        #copy_accessor_storage;
        get copy() { return this.#copy_accessor_storage; }
        set copy(value) { this.#copy_accessor_storage = value; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #withAnswer_accessor_storage;
        get withAnswer() { return this.#withAnswer_accessor_storage; }
        set withAnswer(value) { this.#withAnswer_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._getResponseGroup = () => {
                let responseGroup = [];
                const errorType = this.config.error?.type;
                if (errorType && errorType !== AIErrorType.GeneralNetworkError) {
                    return responseGroup;
                }
                responseGroup = filterAIItemGroup(this.host, this.config.responses);
                return responseGroup;
            };
            this.#config_accessor_storage = __runInitializers(this, _config_initializers, void 0);
            this.#copy_accessor_storage = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _copy_initializers, undefined));
            this.#host_accessor_storage = (__runInitializers(this, _copy_extraInitializers), __runInitializers(this, _host_initializers, void 0));
            this.#withAnswer_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _withAnswer_initializers, false));
            __runInitializers(this, _withAnswer_extraInitializers);
        }
    };
})();
export { AIPanelError };
//# sourceMappingURL=error.js.map