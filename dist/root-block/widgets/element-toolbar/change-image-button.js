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
import { CaptionIcon, DownloadIcon } from '@blocksuite/affine-components/icons';
import { WithDisposable } from '@blocksuite/global/utils';
import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { downloadImageBlob } from '../../../image-block/utils.js';
let EdgelessChangeImageButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    return class EdgelessChangeImageButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _edgeless_decorators = [property({ attribute: false })];
            _model_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get _blockComponent() {
            const blockSelection = this.edgeless.service.selection.surfaceSelections.filter(sel => sel.elements.includes(this.model.id));
            if (blockSelection.length !== 1) {
                return;
            }
            const block = this.edgeless.std.view.getBlock(blockSelection[0].blockId);
            return block;
        }
        get _doc() {
            return this.model.doc;
        }
        render() {
            return html `
      <editor-icon-button
        aria-label="Download"
        .tooltip=${'Download'}
        ?disabled=${this._doc.readonly}
        @click=${this._download}
      >
        ${DownloadIcon}
      </editor-icon-button>

      <editor-toolbar-separator></editor-toolbar-separator>

      <editor-icon-button
        aria-label="Add caption"
        .tooltip=${'Add caption'}
        class="change-image-button caption"
        ?disabled=${this._doc.readonly}
        @click=${this._showCaption}
      >
        ${CaptionIcon}
      </editor-icon-button>
    `;
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
                if (!this._blockComponent)
                    return;
                downloadImageBlob(this._blockComponent).catch(console.error);
            };
            this._showCaption = () => {
                this._blockComponent?.captionEditor?.show();
            };
            this.#edgeless_accessor_storage = __runInitializers(this, _edgeless_initializers, void 0);
            this.#model_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _model_initializers, void 0));
            __runInitializers(this, _model_extraInitializers);
        }
    };
})();
export { EdgelessChangeImageButton };
export function renderChangeImageButton(edgeless, images) {
    if (images?.length !== 1)
        return nothing;
    return html `
    <edgeless-change-image-button
      .model=${images[0]}
      .edgeless=${edgeless}
    ></edgeless-change-image-button>
  `;
}
//# sourceMappingURL=change-image-button.js.map