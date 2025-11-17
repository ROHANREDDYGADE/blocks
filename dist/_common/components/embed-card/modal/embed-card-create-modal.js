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
import { toast } from '@blocksuite/affine-components/toast';
import { EmbedOptionProvider } from '@blocksuite/affine-shared/services';
import { ShadowlessElement } from '@blocksuite/block-std';
import { assertExists, Bound, Vec, WithDisposable, } from '@blocksuite/global/utils';
import { html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { EMBED_CARD_HEIGHT, EMBED_CARD_WIDTH } from '../../../consts.js';
import { getRootByEditorHost, isValidUrl } from '../../../utils/index.js';
import { embedCardModalStyles } from './styles.js';
let EmbedCardCreateModal = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let __linkInputValue_decorators;
    let __linkInputValue_initializers = [];
    let __linkInputValue_extraInitializers = [];
    let _createOptions_decorators;
    let _createOptions_initializers = [];
    let _createOptions_extraInitializers = [];
    let _descriptionText_decorators;
    let _descriptionText_initializers = [];
    let _descriptionText_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _input_decorators;
    let _input_initializers = [];
    let _input_extraInitializers = [];
    let _onConfirm_decorators;
    let _onConfirm_initializers = [];
    let _onConfirm_extraInitializers = [];
    let _titleText_decorators;
    let _titleText_initializers = [];
    let _titleText_extraInitializers = [];
    return class EmbedCardCreateModal extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __linkInputValue_decorators = [state()];
            _createOptions_decorators = [property({ attribute: false })];
            _descriptionText_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _input_decorators = [query('input')];
            _onConfirm_decorators = [property({ attribute: false })];
            _titleText_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __linkInputValue_decorators, { kind: "accessor", name: "_linkInputValue", static: false, private: false, access: { has: obj => "_linkInputValue" in obj, get: obj => obj._linkInputValue, set: (obj, value) => { obj._linkInputValue = value; } }, metadata: _metadata }, __linkInputValue_initializers, __linkInputValue_extraInitializers);
            __esDecorate(this, null, _createOptions_decorators, { kind: "accessor", name: "createOptions", static: false, private: false, access: { has: obj => "createOptions" in obj, get: obj => obj.createOptions, set: (obj, value) => { obj.createOptions = value; } }, metadata: _metadata }, _createOptions_initializers, _createOptions_extraInitializers);
            __esDecorate(this, null, _descriptionText_decorators, { kind: "accessor", name: "descriptionText", static: false, private: false, access: { has: obj => "descriptionText" in obj, get: obj => obj.descriptionText, set: (obj, value) => { obj.descriptionText = value; } }, metadata: _metadata }, _descriptionText_initializers, _descriptionText_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _input_decorators, { kind: "accessor", name: "input", static: false, private: false, access: { has: obj => "input" in obj, get: obj => obj.input, set: (obj, value) => { obj.input = value; } }, metadata: _metadata }, _input_initializers, _input_extraInitializers);
            __esDecorate(this, null, _onConfirm_decorators, { kind: "accessor", name: "onConfirm", static: false, private: false, access: { has: obj => "onConfirm" in obj, get: obj => obj.onConfirm, set: (obj, value) => { obj.onConfirm = value; } }, metadata: _metadata }, _onConfirm_initializers, _onConfirm_extraInitializers);
            __esDecorate(this, null, _titleText_decorators, { kind: "accessor", name: "titleText", static: false, private: false, access: { has: obj => "titleText" in obj, get: obj => obj.titleText, set: (obj, value) => { obj.titleText = value; } }, metadata: _metadata }, _titleText_initializers, _titleText_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = embedCardModalStyles; }
        _handleInput(e) {
            const target = e.target;
            this._linkInputValue = target.value;
        }
        connectedCallback() {
            super.connectedCallback();
            this.updateComplete
                .then(() => {
                requestAnimationFrame(() => {
                    this.input.focus();
                });
            })
                .catch(console.error);
            this.disposables.addFromEvent(this, 'keydown', this._onDocumentKeydown);
        }
        render() {
            return html `<div class="embed-card-modal">
      <div class="embed-card-modal-mask" @click=${this._onCancel}></div>
      <div class="embed-card-modal-wrapper">
        <div class="embed-card-modal-row">
          <div class="embed-card-modal-title">${this.titleText}</div>
        </div>

        <div class="embed-card-modal-row">
          <div class="embed-card-modal-description">
            ${this.descriptionText}
          </div>
        </div>

        <div class="embed-card-modal-row">
          <input
            class="embed-card-modal-input link"
            id="card-description"
            type="text"
            placeholder="Input in https://..."
            value=${this._linkInputValue}
            @input=${this._handleInput}
          />
        </div>

        <div class="embed-card-modal-row">
          <button
            class=${classMap({
                'embed-card-modal-button': true,
                save: true,
            })}
            ?disabled=${!isValidUrl(this._linkInputValue)}
            @click=${this._onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>`;
        }
        #_linkInputValue_accessor_storage;
        get _linkInputValue() { return this.#_linkInputValue_accessor_storage; }
        set _linkInputValue(value) { this.#_linkInputValue_accessor_storage = value; }
        #createOptions_accessor_storage;
        get createOptions() { return this.#createOptions_accessor_storage; }
        set createOptions(value) { this.#createOptions_accessor_storage = value; }
        #descriptionText_accessor_storage;
        get descriptionText() { return this.#descriptionText_accessor_storage; }
        set descriptionText(value) { this.#descriptionText_accessor_storage = value; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #input_accessor_storage;
        get input() { return this.#input_accessor_storage; }
        set input(value) { this.#input_accessor_storage = value; }
        #onConfirm_accessor_storage;
        get onConfirm() { return this.#onConfirm_accessor_storage; }
        set onConfirm(value) { this.#onConfirm_accessor_storage = value; }
        #titleText_accessor_storage;
        get titleText() { return this.#titleText_accessor_storage; }
        set titleText(value) { this.#titleText_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._onCancel = () => {
                this.remove();
            };
            this._onConfirm = () => {
                const url = this.input.value;
                if (!isValidUrl(url)) {
                    toast(this.host, 'Invalid link');
                    return;
                }
                const embedOptions = this.host.std
                    .get(EmbedOptionProvider)
                    .getEmbedBlockOptions(url);
                const { mode } = this.createOptions;
                if (mode === 'page') {
                    const { parentModel, index } = this.createOptions;
                    let flavour = 'affine:bookmark';
                    if (embedOptions) {
                        flavour = embedOptions.flavour;
                    }
                    this.host.doc.addBlock(flavour, {
                        url,
                    }, parentModel, index);
                }
                else if (mode === 'edgeless') {
                    let flavour = 'affine:bookmark', targetStyle = 'vertical';
                    if (embedOptions) {
                        flavour = embedOptions.flavour;
                        targetStyle = embedOptions.styles[0];
                    }
                    const edgelessRoot = getRootByEditorHost(this.host);
                    assertExists(edgelessRoot);
                    const surface = edgelessRoot.surface;
                    const center = Vec.toVec(surface.renderer.viewport.center);
                    edgelessRoot.service.addBlock(flavour, {
                        url,
                        xywh: Bound.fromCenter(center, EMBED_CARD_WIDTH[targetStyle], EMBED_CARD_HEIGHT[targetStyle]).serialize(),
                        style: targetStyle,
                    }, surface.model);
                    edgelessRoot.gfx.tool.setTool('default');
                }
                this.onConfirm();
                this.remove();
            };
            this._onDocumentKeydown = (e) => {
                e.stopPropagation();
                if (e.key === 'Enter' && !e.isComposing) {
                    this._onConfirm();
                }
                if (e.key === 'Escape') {
                    this.remove();
                }
            };
            this.#_linkInputValue_accessor_storage = __runInitializers(this, __linkInputValue_initializers, '');
            this.#createOptions_accessor_storage = (__runInitializers(this, __linkInputValue_extraInitializers), __runInitializers(this, _createOptions_initializers, void 0));
            this.#descriptionText_accessor_storage = (__runInitializers(this, _createOptions_extraInitializers), __runInitializers(this, _descriptionText_initializers, void 0));
            this.#host_accessor_storage = (__runInitializers(this, _descriptionText_extraInitializers), __runInitializers(this, _host_initializers, void 0));
            this.#input_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _input_initializers, void 0));
            this.#onConfirm_accessor_storage = (__runInitializers(this, _input_extraInitializers), __runInitializers(this, _onConfirm_initializers, void 0));
            this.#titleText_accessor_storage = (__runInitializers(this, _onConfirm_extraInitializers), __runInitializers(this, _titleText_initializers, void 0));
            __runInitializers(this, _titleText_extraInitializers);
        }
    };
})();
export { EmbedCardCreateModal };
export async function toggleEmbedCardCreateModal(host, titleText, descriptionText, createOptions) {
    host.selection.clear();
    const embedCardCreateModal = new EmbedCardCreateModal();
    embedCardCreateModal.host = host;
    embedCardCreateModal.titleText = titleText;
    embedCardCreateModal.descriptionText = descriptionText;
    embedCardCreateModal.createOptions = createOptions;
    document.body.append(embedCardCreateModal);
    return new Promise(resolve => {
        embedCardCreateModal.onConfirm = () => resolve();
    });
}
//# sourceMappingURL=embed-card-create-modal.js.map