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
import { AIStarIconWithAnimation, AIStopIcon, } from '@blocksuite/affine-components/icons';
import { WithDisposable } from '@blocksuite/global/utils';
import { baseTheme } from '@toeverything/theme';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
let AIPanelGenerating = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _loadingProgress_decorators;
    let _loadingProgress_initializers = [];
    let _loadingProgress_extraInitializers = [];
    let _stopGenerating_decorators;
    let _stopGenerating_initializers = [];
    let _stopGenerating_extraInitializers = [];
    let _theme_decorators;
    let _theme_initializers = [];
    let _theme_extraInitializers = [];
    let _withAnswer_decorators;
    let _withAnswer_initializers = [];
    let _withAnswer_extraInitializers = [];
    return class AIPanelGenerating extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _config_decorators = [property({ attribute: false })];
            _loadingProgress_decorators = [property({ attribute: false })];
            _stopGenerating_decorators = [property({ attribute: false })];
            _theme_decorators = [property({ attribute: false })];
            _withAnswer_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _config_decorators, { kind: "accessor", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(this, null, _loadingProgress_decorators, { kind: "accessor", name: "loadingProgress", static: false, private: false, access: { has: obj => "loadingProgress" in obj, get: obj => obj.loadingProgress, set: (obj, value) => { obj.loadingProgress = value; } }, metadata: _metadata }, _loadingProgress_initializers, _loadingProgress_extraInitializers);
            __esDecorate(this, null, _stopGenerating_decorators, { kind: "accessor", name: "stopGenerating", static: false, private: false, access: { has: obj => "stopGenerating" in obj, get: obj => obj.stopGenerating, set: (obj, value) => { obj.stopGenerating = value; } }, metadata: _metadata }, _stopGenerating_initializers, _stopGenerating_extraInitializers);
            __esDecorate(this, null, _theme_decorators, { kind: "accessor", name: "theme", static: false, private: false, access: { has: obj => "theme" in obj, get: obj => obj.theme, set: (obj, value) => { obj.theme = value; } }, metadata: _metadata }, _theme_initializers, _theme_extraInitializers);
            __esDecorate(this, null, _withAnswer_decorators, { kind: "accessor", name: "withAnswer", static: false, private: false, access: { has: obj => "withAnswer" in obj, get: obj => obj.withAnswer, set: (obj, value) => { obj.withAnswer = value; } }, metadata: _metadata }, _withAnswer_initializers, _withAnswer_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      width: 100%;
      padding: 0 12px;
      box-sizing: border-box;
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    }

    .generating-tip {
      display: flex;
      width: 100%;
      height: 22px;
      align-items: center;
      gap: 8px;

      color: var(--affine-brand-color);

      .text {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        flex: 1 0 0;

        /* light/smMedium */
        font-size: var(--affine-font-sm);
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 157.143% */
      }

      .left,
      .right {
        display: flex;
        height: 20px;
        justify-content: center;
        align-items: center;
      }
      .left {
        width: 20px;
      }
      .right {
        gap: 6px;
      }
      .right:hover {
        cursor: pointer;
      }
      .stop-icon {
        height: 20px;
        width: 20px;
      }
      .esc-label {
        font-size: var(--affine-font-xs);
        font-weight: 500;
        line-height: 20px;
      }
    }
  `; }
        render() {
            const { generatingIcon = AIStarIconWithAnimation, stages, height = 300, } = this.config;
            return html `
      ${stages && stages.length > 0
                ? html `<generating-placeholder
            .height=${height}
            .theme=${this.theme}
            .loadingProgress=${this.loadingProgress}
            .stages=${stages}
            .showHeader=${!this.withAnswer}
          ></generating-placeholder>`
                : nothing}
      <div class="generating-tip">
        <div class="left">${generatingIcon}</div>
        <div class="text">AI is generating...</div>
        <div @click=${this.stopGenerating} class="right">
          <span class="stop-icon">${AIStopIcon}</span>
          <span class="esc-label">ESC</span>
        </div>
      </div>
    `;
        }
        updateLoadingProgress(progress) {
            this.loadingProgress = progress;
        }
        #config_accessor_storage = __runInitializers(this, _config_initializers, void 0);
        get config() { return this.#config_accessor_storage; }
        set config(value) { this.#config_accessor_storage = value; }
        #loadingProgress_accessor_storage = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _loadingProgress_initializers, 1));
        get loadingProgress() { return this.#loadingProgress_accessor_storage; }
        set loadingProgress(value) { this.#loadingProgress_accessor_storage = value; }
        #stopGenerating_accessor_storage = (__runInitializers(this, _loadingProgress_extraInitializers), __runInitializers(this, _stopGenerating_initializers, void 0));
        get stopGenerating() { return this.#stopGenerating_accessor_storage; }
        set stopGenerating(value) { this.#stopGenerating_accessor_storage = value; }
        #theme_accessor_storage = (__runInitializers(this, _stopGenerating_extraInitializers), __runInitializers(this, _theme_initializers, void 0));
        get theme() { return this.#theme_accessor_storage; }
        set theme(value) { this.#theme_accessor_storage = value; }
        #withAnswer_accessor_storage = (__runInitializers(this, _theme_extraInitializers), __runInitializers(this, _withAnswer_initializers, void 0));
        get withAnswer() { return this.#withAnswer_accessor_storage; }
        set withAnswer(value) { this.#withAnswer_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _withAnswer_extraInitializers);
        }
    };
})();
export { AIPanelGenerating };
//# sourceMappingURL=generating.js.map