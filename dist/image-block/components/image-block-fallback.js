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
import { humanFileSize } from '@blocksuite/affine-shared/utils';
import { modelContext, ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/global/utils';
import { consume } from '@lit/context';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { FailedImageIcon, ImageIcon, LoadingIcon } from '../styles.js';
export const SURFACE_IMAGE_CARD_WIDTH = 220;
export const SURFACE_IMAGE_CARD_HEIGHT = 122;
export const NOTE_IMAGE_CARD_WIDTH = 752;
export const NOTE_IMAGE_CARD_HEIGHT = 78;
let ImageBlockFallbackCard = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _mode_decorators;
    let _mode_initializers = [];
    let _mode_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    return class ImageBlockFallbackCard extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _error_decorators = [property({ attribute: false })];
            _loading_decorators = [property({ attribute: false })];
            _mode_decorators = [property({ attribute: false })];
            _model_decorators = [consume({ context: modelContext })];
            __esDecorate(this, null, _error_decorators, { kind: "accessor", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(this, null, _loading_decorators, { kind: "accessor", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            __esDecorate(this, null, _mode_decorators, { kind: "accessor", name: "mode", static: false, private: false, access: { has: obj => "mode" in obj, get: obj => obj.mode, set: (obj, value) => { obj.mode = value; } }, metadata: _metadata }, _mode_initializers, _mode_extraInitializers);
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .affine-image-fallback-card-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .affine-image-fallback-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: var(--affine-background-secondary-color, #f4f4f5);
      border-radius: 8px;
      border: 1px solid var(--affine-background-tertiary-color, #eee);
      padding: 12px;
    }

    .affine-image-fallback-card-content {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--affine-placeholder-color);
      text-align: justify;
      font-family: var(--affine-font-family);
      font-size: var(--affine-font-sm);
      font-style: normal;
      font-weight: 600;
      line-height: var(--affine-line-height);
      user-select: none;
    }

    .affine-image-card-size {
      overflow: hidden;
      padding-top: 12px;
      color: var(--affine-text-secondary-color);
      text-overflow: ellipsis;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      user-select: none;
    }
  `; }
        render() {
            const { mode, loading, error, model } = this;
            const isEdgeless = mode === 'edgeless';
            const width = isEdgeless
                ? `${SURFACE_IMAGE_CARD_WIDTH}px`
                : `${NOTE_IMAGE_CARD_WIDTH}px`;
            const height = isEdgeless
                ? `${SURFACE_IMAGE_CARD_HEIGHT}px`
                : `${NOTE_IMAGE_CARD_HEIGHT}px`;
            const rotate = isEdgeless ? model.rotate : 0;
            const cardStyleMap = styleMap({
                transform: `rotate(${rotate}deg)`,
                transformOrigin: 'center',
                width,
                height,
            });
            const titleIcon = loading
                ? LoadingIcon
                : error
                    ? FailedImageIcon
                    : ImageIcon;
            const titleText = loading
                ? 'Loading image...'
                : error
                    ? 'Image loading failed.'
                    : 'Image';
            const size = !!model.size && model.size > 0
                ? humanFileSize(model.size, true, 0)
                : null;
            return html `
      <div class="affine-image-fallback-card-container">
        <div
          class="affine-image-fallback-card drag-target"
          style=${cardStyleMap}
        >
          <div class="affine-image-fallback-card-content">
            ${titleIcon}
            <span class="affine-image-fallback-card-title-text"
              >${titleText}</span
            >
          </div>
          <div class="affine-image-card-size">${size}</div>
        </div>
      </div>
    `;
        }
        #error_accessor_storage = __runInitializers(this, _error_initializers, void 0);
        get error() { return this.#error_accessor_storage; }
        set error(value) { this.#error_accessor_storage = value; }
        #loading_accessor_storage = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _loading_initializers, void 0));
        get loading() { return this.#loading_accessor_storage; }
        set loading(value) { this.#loading_accessor_storage = value; }
        #mode_accessor_storage = (__runInitializers(this, _loading_extraInitializers), __runInitializers(this, _mode_initializers, void 0));
        get mode() { return this.#mode_accessor_storage; }
        set mode(value) { this.#mode_accessor_storage = value; }
        #model_accessor_storage = (__runInitializers(this, _mode_extraInitializers), __runInitializers(this, _model_initializers, void 0));
        get model() { return this.#model_accessor_storage; }
        set model(value) { this.#model_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _model_extraInitializers);
        }
    };
})();
export { ImageBlockFallbackCard };
//# sourceMappingURL=image-block-fallback.js.map