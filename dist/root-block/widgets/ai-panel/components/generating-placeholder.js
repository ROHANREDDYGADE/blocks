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
import { DarkLoadingIcon, LightLoadingIcon, } from '@blocksuite/affine-components/icons';
import { ColorScheme } from '@blocksuite/affine-model';
import { unsafeCSSVar } from '@blocksuite/affine-shared/theme';
import { WithDisposable } from '@blocksuite/global/utils';
import { baseTheme } from '@toeverything/theme';
import { css, html, LitElement, nothing, unsafeCSS, } from 'lit';
import { property } from 'lit/decorators.js';
let GeneratingPlaceholder = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _height_decorators;
    let _height_initializers = [];
    let _height_extraInitializers = [];
    let _loadingProgress_decorators;
    let _loadingProgress_initializers = [];
    let _loadingProgress_extraInitializers = [];
    let _showHeader_decorators;
    let _showHeader_initializers = [];
    let _showHeader_extraInitializers = [];
    let _stages_decorators;
    let _stages_initializers = [];
    let _stages_extraInitializers = [];
    let _theme_decorators;
    let _theme_initializers = [];
    let _theme_extraInitializers = [];
    return class GeneratingPlaceholder extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _height_decorators = [property({ attribute: false })];
            _loadingProgress_decorators = [property({ attribute: false })];
            _showHeader_decorators = [property({ attribute: false })];
            _stages_decorators = [property({ attribute: false })];
            _theme_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _height_decorators, { kind: "accessor", name: "height", static: false, private: false, access: { has: obj => "height" in obj, get: obj => obj.height, set: (obj, value) => { obj.height = value; } }, metadata: _metadata }, _height_initializers, _height_extraInitializers);
            __esDecorate(this, null, _loadingProgress_decorators, { kind: "accessor", name: "loadingProgress", static: false, private: false, access: { has: obj => "loadingProgress" in obj, get: obj => obj.loadingProgress, set: (obj, value) => { obj.loadingProgress = value; } }, metadata: _metadata }, _loadingProgress_initializers, _loadingProgress_extraInitializers);
            __esDecorate(this, null, _showHeader_decorators, { kind: "accessor", name: "showHeader", static: false, private: false, access: { has: obj => "showHeader" in obj, get: obj => obj.showHeader, set: (obj, value) => { obj.showHeader = value; } }, metadata: _metadata }, _showHeader_initializers, _showHeader_extraInitializers);
            __esDecorate(this, null, _stages_decorators, { kind: "accessor", name: "stages", static: false, private: false, access: { has: obj => "stages" in obj, get: obj => obj.stages, set: (obj, value) => { obj.stages = value; } }, metadata: _metadata }, _stages_initializers, _stages_extraInitializers);
            __esDecorate(this, null, _theme_decorators, { kind: "accessor", name: "theme", static: false, private: false, access: { has: obj => "theme" in obj, get: obj => obj.theme, set: (obj, value) => { obj.theme = value; } }, metadata: _metadata }, _theme_initializers, _theme_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      margin-bottom: 8px;
    }

    .generating-header {
      width: 100%;
      font-size: ${unsafeCSSVar('fontXs')};
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      height: 20px;
    }

    .generating-header,
    .loading-progress {
      color: ${unsafeCSSVar('textSecondaryColor')};
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
    }

    .generating-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      border-radius: 4px;
      border: 2px solid ${unsafeCSSVar('primaryColor')};
      background: ${unsafeCSSVar('blue50')};
      color: ${unsafeCSSVar('brandColor')};
      gap: 4px;
    }

    .generating-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
    }

    .generating-icon svg {
      scale: 1.5;
    }

    .loading-progress {
      display: flex;
      flex-direction: column;
      font-style: normal;
      font-weight: 400;
      text-align: center;
      gap: 4px;
    }

    .loading-text {
      font-size: ${unsafeCSSVar('fontBase')};
      height: 24px;
      line-height: 24px;
    }

    .loading-stage {
      font-size: ${unsafeCSSVar('fontXs')};
      height: 20px;
      line-height: 20px;
    }
  `; }
        render() {
            const loadingText = this.stages[this.loadingProgress - 1] || '';
            return html `<style>
        .generating-body {
          height: ${this.height}px;
        }
      </style>
      ${this.showHeader
                ? html `<div class="generating-header">Answer</div>`
                : nothing}
      <div class="generating-body">
        <div class="generating-icon">
          ${this.theme === ColorScheme.Light
                ? DarkLoadingIcon
                : LightLoadingIcon}
        </div>
        <div class="loading-progress">
          <div class="loading-text">${loadingText}</div>
          <div class="loading-stage">
            ${this.loadingProgress} / ${this.stages.length}
          </div>
        </div>
      </div>`;
        }
        willUpdate(changed) {
            if (changed.has('loadingProgress')) {
                this.loadingProgress = Math.max(1, Math.min(this.loadingProgress, this.stages.length));
            }
        }
        #height_accessor_storage = __runInitializers(this, _height_initializers, 300);
        get height() { return this.#height_accessor_storage; }
        set height(value) { this.#height_accessor_storage = value; }
        #loadingProgress_accessor_storage = (__runInitializers(this, _height_extraInitializers), __runInitializers(this, _loadingProgress_initializers, void 0));
        get loadingProgress() { return this.#loadingProgress_accessor_storage; }
        set loadingProgress(value) { this.#loadingProgress_accessor_storage = value; }
        #showHeader_accessor_storage = (__runInitializers(this, _loadingProgress_extraInitializers), __runInitializers(this, _showHeader_initializers, void 0));
        get showHeader() { return this.#showHeader_accessor_storage; }
        set showHeader(value) { this.#showHeader_accessor_storage = value; }
        #stages_accessor_storage = (__runInitializers(this, _showHeader_extraInitializers), __runInitializers(this, _stages_initializers, void 0));
        get stages() { return this.#stages_accessor_storage; }
        set stages(value) { this.#stages_accessor_storage = value; }
        #theme_accessor_storage = (__runInitializers(this, _stages_extraInitializers), __runInitializers(this, _theme_initializers, void 0));
        get theme() { return this.#theme_accessor_storage; }
        set theme(value) { this.#theme_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _theme_extraInitializers);
        }
    };
})();
export { GeneratingPlaceholder };
//# sourceMappingURL=generating-placeholder.js.map