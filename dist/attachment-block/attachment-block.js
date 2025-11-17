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
import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { HoverController } from '@blocksuite/affine-components/hover';
import { AttachmentIcon16, getAttachmentFileIcons, } from '@blocksuite/affine-components/icons';
import { Peekable } from '@blocksuite/affine-components/peek';
import { toast } from '@blocksuite/affine-components/toast';
import { AttachmentBlockStyles, } from '@blocksuite/affine-model';
import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { humanFileSize } from '@blocksuite/affine-shared/utils';
import { Slice } from '@blocksuite/store';
import { flip, offset } from '@floating-ui/dom';
import { html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
import { getEmbedCardIcons } from '../_common/utils/url.js';
import { AttachmentOptionsTemplate } from './components/options.js';
import { AttachmentEmbedProvider } from './embed.js';
import { styles } from './styles.js';
import { checkAttachmentBlob, downloadAttachmentBlob } from './utils.js';
let AttachmentBlockComponent = (() => {
    let _classDecorators = [Peekable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = CaptionedBlockComponent;
    let __showOverlay_decorators;
    let __showOverlay_initializers = [];
    let __showOverlay_extraInitializers = [];
    let _allowEmbed_decorators;
    let _allowEmbed_initializers = [];
    let _allowEmbed_extraInitializers = [];
    let _blobUrl_decorators;
    let _blobUrl_initializers = [];
    let _blobUrl_extraInitializers = [];
    let _downloading_decorators;
    let _downloading_initializers = [];
    let _downloading_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    var AttachmentBlockComponent = class extends _classSuper {
        static { _classThis = this; }
        constructor() {
            super(...arguments);
            this._isDragging = false;
            this._isResizing = false;
            this._isSelected = false;
            this._whenHover = new HoverController(this, ({ abortController }) => {
                const selection = this.host.selection;
                const textSelection = selection.find('text');
                if (!!textSelection &&
                    (!!textSelection.to || !!textSelection.from.length)) {
                    return null;
                }
                const blockSelections = selection.filter('block');
                if (blockSelections.length > 1 ||
                    (blockSelections.length === 1 &&
                        blockSelections[0].blockId !== this.blockId)) {
                    return null;
                }
                return {
                    template: AttachmentOptionsTemplate({
                        block: this,
                        model: this.model,
                        abortController,
                    }),
                    computePosition: {
                        referenceElement: this,
                        placement: 'top-start',
                        middleware: [flip(), offset(4)],
                        autoUpdate: true,
                    },
                };
            });
            this.blockDraggable = true;
            this.containerStyleMap = styleMap({
                position: 'relative',
                width: '100%',
                margin: '18px 0px',
            });
            this.convertTo = () => {
                return this.std
                    .get(AttachmentEmbedProvider)
                    .convertTo(this.model, this.service.maxFileSize);
            };
            this.copy = () => {
                const slice = Slice.fromModels(this.doc, [this.model]);
                this.std.clipboard.copySlice(slice).catch(console.error);
                toast(this.host, 'Copied to clipboard');
            };
            this.download = () => {
                downloadAttachmentBlob(this);
            };
            this.embedded = () => {
                return this.std
                    .get(AttachmentEmbedProvider)
                    .embedded(this.model, this.service.maxFileSize);
            };
            this.open = () => {
                if (!this.blobUrl) {
                    return;
                }
                window.open(this.blobUrl, '_blank');
            };
            this.refreshData = () => {
                checkAttachmentBlob(this).catch(console.error);
            };
            this.#_showOverlay_accessor_storage = __runInitializers(this, __showOverlay_initializers, true);
            this.#allowEmbed_accessor_storage = (__runInitializers(this, __showOverlay_extraInitializers), __runInitializers(this, _allowEmbed_initializers, false));
            this.#blobUrl_accessor_storage = (__runInitializers(this, _allowEmbed_extraInitializers), __runInitializers(this, _blobUrl_initializers, undefined));
            this.#downloading_accessor_storage = (__runInitializers(this, _blobUrl_extraInitializers), __runInitializers(this, _downloading_initializers, false));
            this.#error_accessor_storage = (__runInitializers(this, _downloading_extraInitializers), __runInitializers(this, _error_initializers, false));
            this.#loading_accessor_storage = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _loading_initializers, false));
            this.#useCaptionEditor_accessor_storage = (__runInitializers(this, _loading_extraInitializers), true);
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __showOverlay_decorators = [state()];
            _allowEmbed_decorators = [property({ attribute: false })];
            _blobUrl_decorators = [property({ attribute: false })];
            _downloading_decorators = [property({ attribute: false })];
            _error_decorators = [property({ attribute: false })];
            _loading_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __showOverlay_decorators, { kind: "accessor", name: "_showOverlay", static: false, private: false, access: { has: obj => "_showOverlay" in obj, get: obj => obj._showOverlay, set: (obj, value) => { obj._showOverlay = value; } }, metadata: _metadata }, __showOverlay_initializers, __showOverlay_extraInitializers);
            __esDecorate(this, null, _allowEmbed_decorators, { kind: "accessor", name: "allowEmbed", static: false, private: false, access: { has: obj => "allowEmbed" in obj, get: obj => obj.allowEmbed, set: (obj, value) => { obj.allowEmbed = value; } }, metadata: _metadata }, _allowEmbed_initializers, _allowEmbed_extraInitializers);
            __esDecorate(this, null, _blobUrl_decorators, { kind: "accessor", name: "blobUrl", static: false, private: false, access: { has: obj => "blobUrl" in obj, get: obj => obj.blobUrl, set: (obj, value) => { obj.blobUrl = value; } }, metadata: _metadata }, _blobUrl_initializers, _blobUrl_extraInitializers);
            __esDecorate(this, null, _downloading_decorators, { kind: "accessor", name: "downloading", static: false, private: false, access: { has: obj => "downloading" in obj, get: obj => obj.downloading, set: (obj, value) => { obj.downloading = value; } }, metadata: _metadata }, _downloading_initializers, _downloading_extraInitializers);
            __esDecorate(this, null, _error_decorators, { kind: "accessor", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(this, null, _loading_decorators, { kind: "accessor", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AttachmentBlockComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = styles; }
        get embedView() {
            return this.std
                .get(AttachmentEmbedProvider)
                .render(this.model, this.blobUrl, this.service.maxFileSize);
        }
        _selectBlock() {
            const selectionManager = this.host.selection;
            const blockSelection = selectionManager.create('block', {
                blockId: this.blockId,
            });
            selectionManager.setGroup('note', [blockSelection]);
        }
        connectedCallback() {
            super.connectedCallback();
            this.refreshData();
            this.contentEditable = 'false';
            if (!this.model.style) {
                this.doc.withoutTransact(() => {
                    this.doc.updateBlock(this.model, {
                        style: AttachmentBlockStyles[1],
                    });
                });
            }
            this.model.propsUpdated.on(({ key }) => {
                if (key === 'sourceId') {
                    // Reset the blob url when the sourceId is changed
                    if (this.blobUrl) {
                        URL.revokeObjectURL(this.blobUrl);
                        this.blobUrl = undefined;
                    }
                    this.refreshData();
                }
            });
            // Workaround for https://github.com/toeverything/blocksuite/issues/4724
            this.disposables.add(this.std.get(ThemeProvider).theme$.subscribe(() => this.requestUpdate()));
            // this is required to prevent iframe from capturing pointer events
            this.disposables.add(this.std.selection.slots.changed.on(() => {
                this._isSelected =
                    !!this.selected?.is('block') || !!this.selected?.is('surface');
                this._showOverlay =
                    this._isResizing || this._isDragging || !this._isSelected;
            }));
            // this is required to prevent iframe from capturing pointer events
            this.handleEvent('dragStart', () => {
                this._isDragging = true;
                this._showOverlay =
                    this._isResizing || this._isDragging || !this._isSelected;
            });
            this.handleEvent('dragEnd', () => {
                this._isDragging = false;
                this._showOverlay =
                    this._isResizing || this._isDragging || !this._isSelected;
            });
        }
        disconnectedCallback() {
            if (this.blobUrl) {
                URL.revokeObjectURL(this.blobUrl);
            }
            super.disconnectedCallback();
        }
        firstUpdated() {
            // lazy bindings
            this.disposables.addFromEvent(this, 'click', this.onClick);
        }
        onClick(event) {
            // the peek view need handle shift + click
            if (event.defaultPrevented)
                return;
            event.stopPropagation();
            this._selectBlock();
        }
        renderBlock() {
            const { name, size, style } = this.model;
            const cardStyle = style ?? AttachmentBlockStyles[1];
            const theme = this.std.get(ThemeProvider).theme;
            const { LoadingIcon } = getEmbedCardIcons(theme);
            const titleIcon = this.loading ? LoadingIcon : AttachmentIcon16;
            const titleText = this.loading ? 'Loading...' : name;
            const infoText = this.error ? 'File loading failed.' : humanFileSize(size);
            const fileType = name.split('.').pop() ?? '';
            const FileTypeIcon = getAttachmentFileIcons(fileType);
            const embedView = this.embedView;
            return html `
      <div
        ${this._whenHover ? ref(this._whenHover.setReference) : nothing}
        class="affine-attachment-container"
        draggable="${this.blockDraggable ? 'true' : 'false'}"
        style=${this.containerStyleMap}
      >
        ${embedView
                ? html `<div class="affine-attachment-embed-container">
              ${embedView}

              <div
                class=${classMap({
                    'affine-attachment-iframe-overlay': true,
                    hide: !this._showOverlay,
                })}
              ></div>
            </div>`
                : html `<div
              class=${classMap({
                    'affine-attachment-card': true,
                    [cardStyle]: true,
                    loading: this.loading,
                    error: this.error,
                    unsynced: false,
                })}
            >
              <div class="affine-attachment-content">
                <div class="affine-attachment-content-title">
                  <div class="affine-attachment-content-title-icon">
                    ${titleIcon}
                  </div>

                  <div class="affine-attachment-content-title-text">
                    ${titleText}
                  </div>
                </div>

                <div class="affine-attachment-content-info">${infoText}</div>
              </div>

              <div class="affine-attachment-banner">${FileTypeIcon}</div>
            </div>`}
      </div>
    `;
        }
        #_showOverlay_accessor_storage;
        get _showOverlay() { return this.#_showOverlay_accessor_storage; }
        set _showOverlay(value) { this.#_showOverlay_accessor_storage = value; }
        #allowEmbed_accessor_storage;
        get allowEmbed() { return this.#allowEmbed_accessor_storage; }
        set allowEmbed(value) { this.#allowEmbed_accessor_storage = value; }
        #blobUrl_accessor_storage;
        get blobUrl() { return this.#blobUrl_accessor_storage; }
        set blobUrl(value) { this.#blobUrl_accessor_storage = value; }
        #downloading_accessor_storage;
        get downloading() { return this.#downloading_accessor_storage; }
        set downloading(value) { this.#downloading_accessor_storage = value; }
        #error_accessor_storage;
        get error() { return this.#error_accessor_storage; }
        set error(value) { this.#error_accessor_storage = value; }
        #loading_accessor_storage;
        get loading() { return this.#loading_accessor_storage; }
        set loading(value) { this.#loading_accessor_storage = value; }
        #useCaptionEditor_accessor_storage;
        get useCaptionEditor() { return this.#useCaptionEditor_accessor_storage; }
        set useCaptionEditor(value) { this.#useCaptionEditor_accessor_storage = value; }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AttachmentBlockComponent = _classThis;
})();
export { AttachmentBlockComponent };
//# sourceMappingURL=attachment-block.js.map