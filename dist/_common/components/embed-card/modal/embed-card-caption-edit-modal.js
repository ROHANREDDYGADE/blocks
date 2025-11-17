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
import { ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/global/utils';
import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { embedCardModalStyles } from './styles.js';
let EmbedCardEditCaptionEditModal = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _block_decorators;
    let _block_initializers = [];
    let _block_extraInitializers = [];
    let _captionInput_decorators;
    let _captionInput_initializers = [];
    let _captionInput_extraInitializers = [];
    return class EmbedCardEditCaptionEditModal extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _block_decorators = [property({ attribute: false })];
            _captionInput_decorators = [query('.embed-card-modal-input.caption')];
            __esDecorate(this, null, _block_decorators, { kind: "accessor", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
            __esDecorate(this, null, _captionInput_decorators, { kind: "accessor", name: "captionInput", static: false, private: false, access: { has: obj => "captionInput" in obj, get: obj => obj.captionInput, set: (obj, value) => { obj.captionInput = value; } }, metadata: _metadata }, _captionInput_initializers, _captionInput_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = embedCardModalStyles; }
        get _doc() {
            return this.block.doc;
        }
        get _model() {
            return this.block.model;
        }
        _onKeydown(e) {
            e.stopPropagation();
            if (e.key === 'Enter' && !e.isComposing) {
                this._onSave();
            }
            if (e.key === 'Escape') {
                this.remove();
            }
        }
        _onSave() {
            const caption = this.captionInput.value;
            this._doc.updateBlock(this._model, {
                caption,
            });
            this.remove();
        }
        connectedCallback() {
            super.connectedCallback();
            this.updateComplete
                .then(() => {
                this.captionInput.focus();
            })
                .catch(console.error);
            this.disposables.addFromEvent(this, 'keydown', this._onKeydown);
        }
        render() {
            return html `
      <div class="embed-card-modal">
        <div class="embed-card-modal-mask" @click=${() => this.remove()}></div>
        <div class="embed-card-modal-wrapper">
          <div class="embed-card-modal-row">
            <label for="card-title">Caption</label>
            <textarea
              class="embed-card-modal-input caption"
              placeholder="Write a caption..."
              .value=${this._model.caption ?? ''}
            ></textarea>
          </div>
          <div class="embed-card-modal-row">
            <button
              class=${classMap({
                'embed-card-modal-button': true,
                save: true,
            })}
              @click=${() => this._onSave()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    `;
        }
        #block_accessor_storage = __runInitializers(this, _block_initializers, void 0);
        get block() { return this.#block_accessor_storage; }
        set block(value) { this.#block_accessor_storage = value; }
        #captionInput_accessor_storage = (__runInitializers(this, _block_extraInitializers), __runInitializers(this, _captionInput_initializers, void 0));
        get captionInput() { return this.#captionInput_accessor_storage; }
        set captionInput(value) { this.#captionInput_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _captionInput_extraInitializers);
        }
    };
})();
export { EmbedCardEditCaptionEditModal };
export function toggleEmbedCardCaptionEditModal(block) {
    const host = block.host;
    host.selection.clear();
    const embedCardEditCaptionEditModal = new EmbedCardEditCaptionEditModal();
    embedCardEditCaptionEditModal.block = block;
    document.body.append(embedCardEditCaptionEditModal);
}
//# sourceMappingURL=embed-card-caption-edit-modal.js.map