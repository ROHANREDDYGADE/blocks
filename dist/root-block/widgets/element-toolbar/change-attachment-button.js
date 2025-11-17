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
import { CaptionIcon, DownloadIcon, PaletteIcon, } from '@blocksuite/affine-components/icons';
import { renderToolbarSeparator } from '@blocksuite/affine-components/toolbar';
import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { Bound, WithDisposable } from '@blocksuite/global/utils';
import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { join } from 'lit/directives/join.js';
import { EMBED_CARD_HEIGHT, EMBED_CARD_WIDTH, } from '../../../_common/consts.js';
import { getEmbedCardIcons } from '../../../_common/utils/url.js';
import { attachmentViewToggleMenu } from '../../../attachment-block/index.js';
let EdgelessChangeAttachmentButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    return class EdgelessChangeAttachmentButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _edgeless_decorators = [property({ attribute: false })];
            _model_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get _block() {
            const block = this.std.view.getBlock(this.model.id);
            if (!block)
                return null;
            return block;
        }
        get _doc() {
            return this.model.doc;
        }
        get _getCardStyleOptions() {
            const theme = this.std.get(ThemeProvider).theme;
            const { EmbedCardListIcon, EmbedCardCubeIcon } = getEmbedCardIcons(theme);
            return [
                {
                    style: 'horizontalThin',
                    Icon: EmbedCardListIcon,
                    tooltip: 'Horizontal style',
                },
                {
                    style: 'cubeThick',
                    Icon: EmbedCardCubeIcon,
                    tooltip: 'Vertical style',
                },
            ];
        }
        get std() {
            return this.edgeless.std;
        }
        get viewToggleMenu() {
            const block = this._block;
            const model = this.model;
            if (!block || !model)
                return nothing;
            return attachmentViewToggleMenu({
                block,
                callback: () => this.requestUpdate(),
            });
        }
        render() {
            return join([
                this.model.style === 'pdf'
                    ? null
                    : html `
              <editor-menu-button
                .contentPadding=${'8px'}
                .button=${html `
                  <editor-icon-button
                    aria-label="Card style"
                    .tooltip=${'Card style'}
                  >
                    ${PaletteIcon}
                  </editor-icon-button>
                `}
              >
                <card-style-panel
                  .value=${this.model.style}
                  .options=${this._getCardStyleOptions}
                  .onSelect=${this._setCardStyle}
                >
                </card-style-panel>
              </editor-menu-button>
            `,
                this.viewToggleMenu,
                html `
          <editor-icon-button
            aria-label="Download"
            .tooltip=${'Download'}
            ?disabled=${this._doc.readonly}
            @click=${this._download}
          >
            ${DownloadIcon}
          </editor-icon-button>
        `,
                html `
          <editor-icon-button
            aria-label="Add caption"
            .tooltip=${'Add caption'}
            class="change-attachment-button caption"
            ?disabled=${this._doc.readonly}
            @click=${this._showCaption}
          >
            ${CaptionIcon}
          </editor-icon-button>
        `,
            ].filter(button => button !== nothing && button), renderToolbarSeparator);
        }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #model_accessor_storage;
        get model() { return this.#model_accessor_storage; }
        set model(value) { this.#model_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._download = () => {
                this._block?.download();
            };
            this._setCardStyle = (style) => {
                const bounds = Bound.deserialize(this.model.xywh);
                bounds.w = EMBED_CARD_WIDTH[style];
                bounds.h = EMBED_CARD_HEIGHT[style];
                const xywh = bounds.serialize();
                this.model.doc.updateBlock(this.model, { style, xywh });
            };
            this._showCaption = () => {
                this._block?.captionEditor?.show();
            };
            this.#edgeless_accessor_storage = __runInitializers(this, _edgeless_initializers, void 0);
            this.#model_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _model_initializers, void 0));
            __runInitializers(this, _model_extraInitializers);
        }
    };
})();
export { EdgelessChangeAttachmentButton };
export function renderAttachmentButton(edgeless, attachments) {
    if (attachments?.length !== 1)
        return nothing;
    return html `
    <edgeless-change-attachment-button
      .model=${attachments[0]}
      .edgeless=${edgeless}
    ></edgeless-change-attachment-button>
  `;
}
//# sourceMappingURL=change-attachment-button.js.map