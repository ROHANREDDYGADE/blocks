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
import { Peekable } from '@blocksuite/affine-components/peek';
import { GfxBlockComponent } from '@blocksuite/block-std';
import { css, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import { copyImageBlob, downloadImageBlob, fetchImageBlob, resetImageSize, turnImageIntoCardView, } from './utils.js';
let ImageEdgelessBlockComponent = (() => {
    let _classDecorators = [Peekable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = GfxBlockComponent;
    let _blob_decorators;
    let _blob_initializers = [];
    let _blob_extraInitializers = [];
    let _blobUrl_decorators;
    let _blobUrl_initializers = [];
    let _blobUrl_extraInitializers = [];
    let _captionEditor_decorators;
    let _captionEditor_initializers = [];
    let _captionEditor_extraInitializers = [];
    let _downloading_decorators;
    let _downloading_initializers = [];
    let _downloading_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _fallbackCard_decorators;
    let _fallbackCard_initializers = [];
    let _fallbackCard_extraInitializers = [];
    let _lastSourceId_decorators;
    let _lastSourceId_initializers = [];
    let _lastSourceId_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _resizableImg_decorators;
    let _resizableImg_initializers = [];
    let _resizableImg_extraInitializers = [];
    let _retryCount_decorators;
    let _retryCount_initializers = [];
    let _retryCount_extraInitializers = [];
    var ImageEdgelessBlockComponent = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _blob_decorators = [property({ attribute: false })];
            _blobUrl_decorators = [property({ attribute: false })];
            _captionEditor_decorators = [query('block-caption-editor')];
            _downloading_decorators = [property({ attribute: false })];
            _error_decorators = [property({ attribute: false })];
            _fallbackCard_decorators = [query('affine-image-fallback-card')];
            _lastSourceId_decorators = [state()];
            _loading_decorators = [property({ attribute: false })];
            _resizableImg_decorators = [query('.resizable-img')];
            _retryCount_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _blob_decorators, { kind: "accessor", name: "blob", static: false, private: false, access: { has: obj => "blob" in obj, get: obj => obj.blob, set: (obj, value) => { obj.blob = value; } }, metadata: _metadata }, _blob_initializers, _blob_extraInitializers);
            __esDecorate(this, null, _blobUrl_decorators, { kind: "accessor", name: "blobUrl", static: false, private: false, access: { has: obj => "blobUrl" in obj, get: obj => obj.blobUrl, set: (obj, value) => { obj.blobUrl = value; } }, metadata: _metadata }, _blobUrl_initializers, _blobUrl_extraInitializers);
            __esDecorate(this, null, _captionEditor_decorators, { kind: "accessor", name: "captionEditor", static: false, private: false, access: { has: obj => "captionEditor" in obj, get: obj => obj.captionEditor, set: (obj, value) => { obj.captionEditor = value; } }, metadata: _metadata }, _captionEditor_initializers, _captionEditor_extraInitializers);
            __esDecorate(this, null, _downloading_decorators, { kind: "accessor", name: "downloading", static: false, private: false, access: { has: obj => "downloading" in obj, get: obj => obj.downloading, set: (obj, value) => { obj.downloading = value; } }, metadata: _metadata }, _downloading_initializers, _downloading_extraInitializers);
            __esDecorate(this, null, _error_decorators, { kind: "accessor", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(this, null, _fallbackCard_decorators, { kind: "accessor", name: "fallbackCard", static: false, private: false, access: { has: obj => "fallbackCard" in obj, get: obj => obj.fallbackCard, set: (obj, value) => { obj.fallbackCard = value; } }, metadata: _metadata }, _fallbackCard_initializers, _fallbackCard_extraInitializers);
            __esDecorate(this, null, _lastSourceId_decorators, { kind: "accessor", name: "lastSourceId", static: false, private: false, access: { has: obj => "lastSourceId" in obj, get: obj => obj.lastSourceId, set: (obj, value) => { obj.lastSourceId = value; } }, metadata: _metadata }, _lastSourceId_initializers, _lastSourceId_extraInitializers);
            __esDecorate(this, null, _loading_decorators, { kind: "accessor", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            __esDecorate(this, null, _resizableImg_decorators, { kind: "accessor", name: "resizableImg", static: false, private: false, access: { has: obj => "resizableImg" in obj, get: obj => obj.resizableImg, set: (obj, value) => { obj.resizableImg = value; } }, metadata: _metadata }, _resizableImg_initializers, _resizableImg_extraInitializers);
            __esDecorate(this, null, _retryCount_decorators, { kind: "accessor", name: "retryCount", static: false, private: false, access: { has: obj => "retryCount" in obj, get: obj => obj.retryCount, set: (obj, value) => { obj.retryCount = value; } }, metadata: _metadata }, _retryCount_initializers, _retryCount_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ImageEdgelessBlockComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    affine-edgeless-image .resizable-img,
    affine-edgeless-image .resizable-img img {
      width: 100%;
      height: 100%;
    }
  `; }
        _handleError(error) {
            this.dispatchEvent(new CustomEvent('error', { detail: error }));
        }
        connectedCallback() {
            super.connectedCallback();
            this.refreshData();
            this.contentEditable = 'false';
            this.disposables.add(this.model.propsUpdated.on(({ key }) => {
                if (key === 'sourceId') {
                    this.refreshData();
                }
            }));
        }
        disconnectedCallback() {
            if (this.blobUrl) {
                URL.revokeObjectURL(this.blobUrl);
            }
            super.disconnectedCallback();
        }
        renderGfxBlock() {
            const rotate = this.model.rotate ?? 0;
            const containerStyleMap = styleMap({
                position: 'relative',
                width: '100%',
                transform: `rotate(${rotate}deg)`,
                transformOrigin: 'center',
            });
            return html `
      <div class="affine-image-container" style=${containerStyleMap}>
        ${when(this.loading || this.error || !this.blobUrl, () => html `<affine-image-fallback-card
              .error=${this.error}
              .loading=${this.loading}
              .mode=${'page'}
            ></affine-image-fallback-card>`, () => html `<div class="resizable-img">
              <img
                class="drag-target"
                src=${this.blobUrl ?? ''}
                draggable="false"
                @error=${this._handleError}
                loading="lazy"
              />
            </div>`)}
        <affine-block-selection .block=${this}></affine-block-selection>
      </div>
      <block-caption-editor></block-caption-editor>

      ${Object.values(this.widgets)}
    `;
        }
        updated() {
            this.fallbackCard?.requestUpdate();
        }
        #blob_accessor_storage;
        get blob() { return this.#blob_accessor_storage; }
        set blob(value) { this.#blob_accessor_storage = value; }
        #blobUrl_accessor_storage;
        get blobUrl() { return this.#blobUrl_accessor_storage; }
        set blobUrl(value) { this.#blobUrl_accessor_storage = value; }
        #captionEditor_accessor_storage;
        get captionEditor() { return this.#captionEditor_accessor_storage; }
        set captionEditor(value) { this.#captionEditor_accessor_storage = value; }
        #downloading_accessor_storage;
        get downloading() { return this.#downloading_accessor_storage; }
        set downloading(value) { this.#downloading_accessor_storage = value; }
        #error_accessor_storage;
        get error() { return this.#error_accessor_storage; }
        set error(value) { this.#error_accessor_storage = value; }
        #fallbackCard_accessor_storage;
        get fallbackCard() { return this.#fallbackCard_accessor_storage; }
        set fallbackCard(value) { this.#fallbackCard_accessor_storage = value; }
        #lastSourceId_accessor_storage;
        get lastSourceId() { return this.#lastSourceId_accessor_storage; }
        set lastSourceId(value) { this.#lastSourceId_accessor_storage = value; }
        #loading_accessor_storage;
        get loading() { return this.#loading_accessor_storage; }
        set loading(value) { this.#loading_accessor_storage = value; }
        #resizableImg_accessor_storage;
        get resizableImg() { return this.#resizableImg_accessor_storage; }
        set resizableImg(value) { this.#resizableImg_accessor_storage = value; }
        #retryCount_accessor_storage;
        get retryCount() { return this.#retryCount_accessor_storage; }
        set retryCount(value) { this.#retryCount_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this.convertToCardView = () => {
                turnImageIntoCardView(this).catch(console.error);
            };
            this.copy = () => {
                copyImageBlob(this).catch(console.error);
            };
            this.download = () => {
                downloadImageBlob(this).catch(console.error);
            };
            this.refreshData = () => {
                this.retryCount = 0;
                fetchImageBlob(this)
                    .then(() => {
                    const { width, height } = this.model;
                    if (!width || !height) {
                        return resetImageSize(this);
                    }
                    return;
                })
                    .catch(console.error);
            };
            this.#blob_accessor_storage = __runInitializers(this, _blob_initializers, undefined);
            this.#blobUrl_accessor_storage = (__runInitializers(this, _blob_extraInitializers), __runInitializers(this, _blobUrl_initializers, undefined));
            this.#captionEditor_accessor_storage = (__runInitializers(this, _blobUrl_extraInitializers), __runInitializers(this, _captionEditor_initializers, void 0));
            this.#downloading_accessor_storage = (__runInitializers(this, _captionEditor_extraInitializers), __runInitializers(this, _downloading_initializers, false));
            this.#error_accessor_storage = (__runInitializers(this, _downloading_extraInitializers), __runInitializers(this, _error_initializers, false));
            this.#fallbackCard_accessor_storage = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _fallbackCard_initializers, null));
            this.#lastSourceId_accessor_storage = (__runInitializers(this, _fallbackCard_extraInitializers), __runInitializers(this, _lastSourceId_initializers, void 0));
            this.#loading_accessor_storage = (__runInitializers(this, _lastSourceId_extraInitializers), __runInitializers(this, _loading_initializers, false));
            this.#resizableImg_accessor_storage = (__runInitializers(this, _loading_extraInitializers), __runInitializers(this, _resizableImg_initializers, void 0));
            this.#retryCount_accessor_storage = (__runInitializers(this, _resizableImg_extraInitializers), __runInitializers(this, _retryCount_initializers, 0));
            __runInitializers(this, _retryCount_extraInitializers);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return ImageEdgelessBlockComponent = _classThis;
})();
export { ImageEdgelessBlockComponent };
//# sourceMappingURL=image-edgeless-block.js.map