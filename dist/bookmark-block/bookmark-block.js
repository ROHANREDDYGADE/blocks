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
import { CaptionedBlockComponent, SelectedStyle, } from '@blocksuite/affine-components/caption';
import { DocModeProvider } from '@blocksuite/affine-shared/services';
import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { BOOKMARK_MIN_WIDTH } from '../root-block/edgeless/utils/consts.js';
import { refreshBookmarkUrlData } from './utils.js';
let BookmarkBlockComponent = (() => {
    let _classSuper = CaptionedBlockComponent;
    let _bookmarkCard_decorators;
    let _bookmarkCard_initializers = [];
    let _bookmarkCard_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    return class BookmarkBlockComponent extends _classSuper {
        constructor() {
            super(...arguments);
            this.blockDraggable = true;
            this.open = () => {
                let link = this.model.url;
                if (!link.match(/^[a-zA-Z]+:\/\//)) {
                    link = 'https://' + link;
                }
                window.open(link, '_blank');
            };
            this.refreshData = () => {
                refreshBookmarkUrlData(this, this._fetchAbortController?.signal).catch(console.error);
            };
            this.#blockContainerStyles_accessor_storage = {
                margin: '18px 0',
            };
            this.#bookmarkCard_accessor_storage = __runInitializers(this, _bookmarkCard_initializers, void 0);
            this.#error_accessor_storage = (__runInitializers(this, _bookmarkCard_extraInitializers), __runInitializers(this, _error_initializers, false));
            this.#loading_accessor_storage = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _loading_initializers, false));
            this.#selectedStyle_accessor_storage = (__runInitializers(this, _loading_extraInitializers), SelectedStyle.Border);
            this.#useCaptionEditor_accessor_storage = true;
            this.#useZeroWidth_accessor_storage = true;
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _bookmarkCard_decorators = [query('bookmark-card')];
            _error_decorators = [property({ attribute: false })];
            _loading_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _bookmarkCard_decorators, { kind: "accessor", name: "bookmarkCard", static: false, private: false, access: { has: obj => "bookmarkCard" in obj, get: obj => obj.bookmarkCard, set: (obj, value) => { obj.bookmarkCard = value; } }, metadata: _metadata }, _bookmarkCard_initializers, _bookmarkCard_extraInitializers);
            __esDecorate(this, null, _error_decorators, { kind: "accessor", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(this, null, _loading_decorators, { kind: "accessor", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        connectedCallback() {
            super.connectedCallback();
            const mode = this.std.get(DocModeProvider).getEditorMode();
            const miniWidth = `${BOOKMARK_MIN_WIDTH}px`;
            this.containerStyleMap = styleMap({
                position: 'relative',
                width: '100%',
                ...(mode === 'edgeless' ? { miniWidth } : {}),
            });
            this._fetchAbortController = new AbortController();
            this.contentEditable = 'false';
            if (!this.model.description && !this.model.title) {
                this.refreshData();
            }
            this.disposables.add(this.model.propsUpdated.on(({ key }) => {
                if (key === 'url') {
                    this.refreshData();
                }
            }));
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._fetchAbortController?.abort();
        }
        renderBlock() {
            const selected = !!this.selected?.is('block');
            return html `
      <div
        draggable="${this.blockDraggable ? 'true' : 'false'}"
        class=${classMap({
                'affine-bookmark-container': true,
                'selected-style': selected,
            })}
        style=${this.containerStyleMap}
      >
        <bookmark-card
          .bookmark=${this}
          .loading=${this.loading}
          .error=${this.error}
        ></bookmark-card>
      </div>
    `;
        }
        #blockContainerStyles_accessor_storage;
        get blockContainerStyles() { return this.#blockContainerStyles_accessor_storage; }
        set blockContainerStyles(value) { this.#blockContainerStyles_accessor_storage = value; }
        #bookmarkCard_accessor_storage;
        get bookmarkCard() { return this.#bookmarkCard_accessor_storage; }
        set bookmarkCard(value) { this.#bookmarkCard_accessor_storage = value; }
        #error_accessor_storage;
        get error() { return this.#error_accessor_storage; }
        set error(value) { this.#error_accessor_storage = value; }
        #loading_accessor_storage;
        get loading() { return this.#loading_accessor_storage; }
        set loading(value) { this.#loading_accessor_storage = value; }
        #selectedStyle_accessor_storage;
        get selectedStyle() { return this.#selectedStyle_accessor_storage; }
        set selectedStyle(value) { this.#selectedStyle_accessor_storage = value; }
        #useCaptionEditor_accessor_storage;
        get useCaptionEditor() { return this.#useCaptionEditor_accessor_storage; }
        set useCaptionEditor(value) { this.#useCaptionEditor_accessor_storage = value; }
        #useZeroWidth_accessor_storage;
        get useZeroWidth() { return this.#useZeroWidth_accessor_storage; }
        set useZeroWidth(value) { this.#useZeroWidth_accessor_storage = value; }
    };
})();
export { BookmarkBlockComponent };
//# sourceMappingURL=bookmark-block.js.map