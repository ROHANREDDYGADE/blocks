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
import { EmbedLinkedDocBlockComponent, EmbedSyncedDocBlockComponent, } from '@blocksuite/affine-block-embed';
import { notifyLinkedDocClearedAliases, notifyLinkedDocSwitchedToCard, } from '@blocksuite/affine-components/notification';
import { toast } from '@blocksuite/affine-components/toast';
import { EmbedLinkedDocModel, EmbedSyncedDocModel, } from '@blocksuite/affine-model';
import { TelemetryProvider, } from '@blocksuite/affine-shared/services';
import { FONT_SM, FONT_XS } from '@blocksuite/affine-shared/styles';
import { unsafeCSSVarV2 } from '@blocksuite/affine-shared/theme';
import { listenClickAway, stopPropagation, } from '@blocksuite/affine-shared/utils';
import { SignalWatcher, WithDisposable } from '@blocksuite/global/utils';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { computed, signal } from '@preact/signals-core';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { isInternalEmbedModel } from '../type.js';
let EmbedCardEditModal = (() => {
    let _classSuper = SignalWatcher(WithDisposable(LitElement));
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _originalDocInfo_decorators;
    let _originalDocInfo_initializers = [];
    let _originalDocInfo_extraInitializers = [];
    let _titleInput_decorators;
    let _titleInput_initializers = [];
    let _titleInput_extraInitializers = [];
    let _viewType_decorators;
    let _viewType_initializers = [];
    let _viewType_extraInitializers = [];
    return class EmbedCardEditModal extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _host_decorators = [property({ attribute: false })];
            _model_decorators = [property({ attribute: false })];
            _originalDocInfo_decorators = [property({ attribute: false })];
            _titleInput_decorators = [query('.input.title')];
            _viewType_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(this, null, _originalDocInfo_decorators, { kind: "accessor", name: "originalDocInfo", static: false, private: false, access: { has: obj => "originalDocInfo" in obj, get: obj => obj.originalDocInfo, set: (obj, value) => { obj.originalDocInfo = value; } }, metadata: _metadata }, _originalDocInfo_initializers, _originalDocInfo_extraInitializers);
            __esDecorate(this, null, _titleInput_decorators, { kind: "accessor", name: "titleInput", static: false, private: false, access: { has: obj => "titleInput" in obj, get: obj => obj.titleInput, set: (obj, value) => { obj.titleInput = value; } }, metadata: _metadata }, _titleInput_initializers, _titleInput_extraInitializers);
            __esDecorate(this, null, _viewType_decorators, { kind: "accessor", name: "viewType", static: false, private: false, access: { has: obj => "viewType" in obj, get: obj => obj.viewType, set: (obj, value) => { obj.viewType = value; } }, metadata: _metadata }, _viewType_initializers, _viewType_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      position: absolute;
      top: 0;
      left: 0;
      z-index: var(--affine-z-index-popover);
      animation: affine-popover-fade-in 0.2s ease;
    }

    @keyframes affine-popover-fade-in {
      from {
        opacity: 0;
        transform: translateY(-3px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .embed-card-modal-wrapper {
      display: flex;
      padding: 12px;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      gap: 12px;
      width: 421px;

      color: var(--affine-icon-color);
      box-shadow: var(--affine-overlay-shadow);
      background: ${unsafeCSSVarV2('layer/background/overlayPanel')};
      border-radius: 4px;
      border: 0.5px solid ${unsafeCSSVarV2('layer/insideBorder/border')};
    }

    .row {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .row .input {
      display: flex;
      padding: 4px 10px;
      width: 100%;
      min-width: 100%;
      box-sizing: border-box;
      border-radius: 4px;
      user-select: none;
      background: transparent;
      border: 1px solid ${unsafeCSSVarV2('input/border/default')};
      color: var(--affine-text-primary-color);
      ${FONT_SM};
    }
    .input::placeholder {
      color: var(--affine-placeholder-color);
    }
    .input:focus {
      border-color: ${unsafeCSSVarV2('input/border/active')};
      outline: none;
    }

    textarea.input {
      min-height: 80px;
      resize: none;
    }

    .row.actions {
      justify-content: flex-end;
    }

    .row.actions .button {
      display: flex;
      padding: 4px 12px;
      align-items: center;
      gap: 4px;
      border-radius: 4px;
      border: 1px solid ${unsafeCSSVarV2('button/innerBlackBorder')};
      background: ${unsafeCSSVarV2('button/secondary')};
      ${FONT_XS};
      color: ${unsafeCSSVarV2('text/primary')};
    }
    .row.actions .button[disabled],
    .row.actions .button:disabled {
      pointer-events: none;
      color: ${unsafeCSSVarV2('text/disable')};
    }
    .row.actions .button.save {
      color: ${unsafeCSSVarV2('button/pureWhiteText')};
      background: ${unsafeCSSVarV2('button/primary')};
    }
    .row.actions .button[disabled].save,
    .row.actions .button:disabled.save {
      opacity: 0.5;
    }
  `; }
        get isEmbedLinkedDocModel() {
            return this.model instanceof EmbedLinkedDocModel;
        }
        get isEmbedSyncedDocModel() {
            return this.model instanceof EmbedSyncedDocModel;
        }
        get isInternalEmbedModel() {
            return isInternalEmbedModel(this.model);
        }
        get modelType() {
            if (this.isEmbedLinkedDocModel)
                return 'linked';
            if (this.isEmbedSyncedDocModel)
                return 'synced';
            return null;
        }
        get placeholders() {
            if (this.isInternalEmbedModel) {
                return {
                    title: 'Add title alias',
                    description: 'Add description alias (empty to inherit document content)',
                };
            }
            return {
                title: 'Write a title',
                description: 'Write a description...',
            };
        }
        _updateInfo() {
            const title = this.model.title || this.originalDocInfo?.title || '';
            const description = this.model.description || this.originalDocInfo?.description || '';
            this.title$.value = title;
            this.description$.value = description;
        }
        connectedCallback() {
            super.connectedCallback();
            this._updateInfo();
        }
        firstUpdated() {
            const blockComponent = this.host.std.view.getBlock(this.model.id);
            if (!blockComponent)
                return;
            this._blockComponent = blockComponent;
            this.disposables.add(autoUpdate(blockComponent, this, () => {
                computePosition(blockComponent, this, {
                    placement: 'top-start',
                    middleware: [flip(), offset(8)],
                })
                    .then(({ x, y }) => {
                    this.style.left = `${x}px`;
                    this.style.top = `${y}px`;
                })
                    .catch(console.error);
            }));
            this.disposables.add(listenClickAway(this, this._hide));
            this.disposables.addFromEvent(this, 'keydown', this._onKeydown);
            this.disposables.addFromEvent(this, 'pointerdown', stopPropagation);
            this.titleInput.focus();
            this.titleInput.select();
        }
        render() {
            return html `
      <div class="embed-card-modal-wrapper">
        <div class="row">
          <input
            class="input title"
            type="text"
            placeholder=${this.placeholders.title}
            .value=${live(this.title$.value)}
            @input=${this._updateTitle}
          />
        </div>
        <div class="row">
          <textarea
            class="input description"
            maxlength="500"
            placeholder=${this.placeholders.description}
            .value=${live(this.description$.value)}
            @input=${this._updateDescription}
          ></textarea>
        </div>
        <div class="row actions">
          ${choose(this.modelType, [
                [
                    'linked',
                    () => html `
                <button
                  class=${classMap({
                        button: true,
                        reset: true,
                    })}
                  .disabled=${this.resetButtonDisabled$.value}
                  @click=${this._onReset}
                >
                  Reset
                </button>
              `,
                ],
                [
                    'synced',
                    () => html `
                <button
                  class=${classMap({
                        button: true,
                        cancel: true,
                    })}
                  @click=${this._hide}
                >
                  Cancel
                </button>
              `,
                ],
            ])}
          <button
            class=${classMap({
                button: true,
                save: true,
            })}
            .disabled=${this.saveButtonDisabled$.value}
            @click=${this._onSave}
          >
            Save
          </button>
        </div>
      </div>
    `;
        }
        #description$_accessor_storage;
        get description$() { return this.#description$_accessor_storage; }
        set description$(value) { this.#description$_accessor_storage = value; }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #model_accessor_storage;
        get model() { return this.#model_accessor_storage; }
        set model(value) { this.#model_accessor_storage = value; }
        #originalDocInfo_accessor_storage;
        get originalDocInfo() { return this.#originalDocInfo_accessor_storage; }
        set originalDocInfo(value) { this.#originalDocInfo_accessor_storage = value; }
        #resetButtonDisabled$_accessor_storage;
        get resetButtonDisabled$() { return this.#resetButtonDisabled$_accessor_storage; }
        set resetButtonDisabled$(value) { this.#resetButtonDisabled$_accessor_storage = value; }
        #saveButtonDisabled$_accessor_storage;
        get saveButtonDisabled$() { return this.#saveButtonDisabled$_accessor_storage; }
        set saveButtonDisabled$(value) { this.#saveButtonDisabled$_accessor_storage = value; }
        #title$_accessor_storage;
        get title$() { return this.#title$_accessor_storage; }
        set title$(value) { this.#title$_accessor_storage = value; }
        #titleInput_accessor_storage;
        get titleInput() { return this.#titleInput_accessor_storage; }
        set titleInput(value) { this.#titleInput_accessor_storage = value; }
        #viewType_accessor_storage;
        get viewType() { return this.#viewType_accessor_storage; }
        set viewType(value) { this.#viewType_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._blockComponent = null;
            this._hide = () => {
                this.remove();
            };
            this._onKeydown = (e) => {
                e.stopPropagation();
                if (e.key === 'Enter' && !(e.isComposing || e.shiftKey)) {
                    this._onSave();
                }
                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.remove();
                }
            };
            this._onReset = () => {
                const blockComponent = this._blockComponent;
                if (!blockComponent) {
                    this.remove();
                    return;
                }
                const std = blockComponent.std;
                this.model.doc.updateBlock(this.model, { title: null, description: null });
                if (this.isEmbedLinkedDocModel &&
                    blockComponent instanceof EmbedLinkedDocBlockComponent) {
                    blockComponent.refreshData();
                    notifyLinkedDocClearedAliases(std);
                }
                blockComponent.requestUpdate();
                track(std, this.model, this.viewType, 'ResetedAlias', { control: 'reset' });
                this.remove();
            };
            this._onSave = () => {
                const blockComponent = this._blockComponent;
                if (!blockComponent) {
                    this.remove();
                    return;
                }
                const title = this.title$.value.trim();
                if (title.length === 0) {
                    toast(this.host, 'Title can not be empty');
                    return;
                }
                const std = blockComponent.std;
                const description = this.description$.value.trim();
                const props = { title };
                if (description)
                    props.description = description;
                if (this.isEmbedSyncedDocModel &&
                    blockComponent instanceof EmbedSyncedDocBlockComponent) {
                    blockComponent.convertToCard(props);
                    notifyLinkedDocSwitchedToCard(std);
                }
                else {
                    this.model.doc.updateBlock(this.model, props);
                    blockComponent.requestUpdate();
                }
                track(std, this.model, this.viewType, 'SavedAlias', { control: 'save' });
                this.remove();
            };
            this._updateDescription = (e) => {
                const target = e.target;
                this.description$.value = target.value;
            };
            this._updateTitle = (e) => {
                const target = e.target;
                this.title$.value = target.value;
            };
            this.#description$_accessor_storage = signal('');
            this.#host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
            this.#model_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _model_initializers, void 0));
            this.#originalDocInfo_accessor_storage = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _originalDocInfo_initializers, undefined));
            this.#resetButtonDisabled$_accessor_storage = (__runInitializers(this, _originalDocInfo_extraInitializers), computed(() => !(Boolean(this.model.title$.value?.length) ||
                Boolean(this.model.description$.value?.length))));
            this.#saveButtonDisabled$_accessor_storage = computed(() => this.title$.value.trim().length === 0);
            this.#title$_accessor_storage = signal('');
            this.#titleInput_accessor_storage = __runInitializers(this, _titleInput_initializers, void 0);
            this.#viewType_accessor_storage = (__runInitializers(this, _titleInput_extraInitializers), __runInitializers(this, _viewType_initializers, void 0));
            __runInitializers(this, _viewType_extraInitializers);
        }
    };
})();
export { EmbedCardEditModal };
export function toggleEmbedCardEditModal(host, embedCardModel, viewType, originalDocInfo) {
    document.body.querySelector('embed-card-edit-modal')?.remove();
    const embedCardEditModal = new EmbedCardEditModal();
    embedCardEditModal.model = embedCardModel;
    embedCardEditModal.host = host;
    embedCardEditModal.viewType = viewType;
    embedCardEditModal.originalDocInfo = originalDocInfo;
    document.body.append(embedCardEditModal);
}
function track(std, model, viewType, event, props) {
    std.getOptional(TelemetryProvider)?.track(event, {
        segment: 'toolbar',
        page: 'doc editor',
        module: 'embed card edit popup',
        type: `${viewType} view`,
        category: isInternalEmbedModel(model) ? 'linked doc' : 'link',
        ...props,
    });
}
//# sourceMappingURL=embed-card-edit-modal.js.map