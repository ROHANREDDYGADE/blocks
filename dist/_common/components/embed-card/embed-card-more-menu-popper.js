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
import { CenterPeekIcon, CopyIcon, DeleteIcon, DuplicateIcon, OpenIcon, RefreshIcon, } from '@blocksuite/affine-components/icons';
import { isPeekable, peek } from '@blocksuite/affine-components/peek';
import { toast } from '@blocksuite/affine-components/toast';
import { WithDisposable } from '@blocksuite/global/utils';
import { Slice } from '@blocksuite/store';
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { isEmbedLinkedDocBlock, isEmbedSyncedDocBlock, } from '../../../root-block/edgeless/utils/query.js';
import { getBlockProps } from '../../utils/index.js';
let EmbedCardMoreMenu = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _abortController_decorators;
    let _abortController_initializers = [];
    let _abortController_extraInitializers = [];
    let _block_decorators;
    let _block_initializers = [];
    let _block_extraInitializers = [];
    return class EmbedCardMoreMenu extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _abortController_decorators = [property({ attribute: false })];
            _block_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _abortController_decorators, { kind: "accessor", name: "abortController", static: false, private: false, access: { has: obj => "abortController" in obj, get: obj => obj.abortController, set: (obj, value) => { obj.abortController = value; } }, metadata: _metadata }, _abortController_initializers, _abortController_extraInitializers);
            __esDecorate(this, null, _block_decorators, { kind: "accessor", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .embed-card-more-menu {
      box-sizing: border-box;
      padding-bottom: 4px;
    }

    .embed-card-more-menu-container {
      border-radius: 8px;
      padding: 8px;
      background: var(--affine-background-overlay-panel-color);
      box-shadow: var(--affine-shadow-2);
    }

    .embed-card-more-menu-container > .menu-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
    }

    .embed-card-more-menu-container > .menu-item:hover {
      background: var(--affine-hover-color);
    }

    .embed-card-more-menu-container > .menu-item:hover.delete {
      background: var(--affine-background-error-color);
      color: var(--affine-error-color);
    }
    .embed-card-more-menu-container > .menu-item:hover.delete > svg {
      color: var(--affine-error-color);
    }

    .embed-card-more-menu-container > .menu-item svg {
      margin: 0 8px;
    }

    .embed-card-more-menu-container > .divider {
      width: 148px;
      height: 1px;
      margin: 8px;
      background-color: var(--affine-border-color);
    }
  `; }
        get _doc() {
            return this.block.doc;
        }
        get _model() {
            return this.block.model;
        }
        get _openButtonDisabled() {
            return (isEmbedLinkedDocBlock(this._model) && this._model.pageId === this._doc.id);
        }
        get _std() {
            return this.block.std;
        }
        async _copyBlock() {
            const slice = Slice.fromModels(this._doc, [this._model]);
            await this._std.clipboard.copySlice(slice);
            toast(this.block.host, 'Copied link to clipboard');
            this.abortController.abort();
        }
        _duplicateBlock() {
            const model = this._model;
            const blockProps = getBlockProps(model);
            const { width, height, xywh, rotate, zIndex, ...duplicateProps } = blockProps;
            const { doc } = model;
            const parent = doc.getParent(model);
            const index = parent?.children.indexOf(model);
            doc.addBlock(model.flavour, duplicateProps, parent, index);
            this.abortController.abort();
        }
        _open() {
            this.block.open();
            this.abortController.abort();
        }
        _peek() {
            peek(this.block);
        }
        _peekable() {
            return isPeekable(this.block);
        }
        _refreshData() {
            this.block.refreshData();
            this.abortController.abort();
        }
        render() {
            return html `
      <div class="embed-card-more-menu">
        <div
          class="embed-card-more-menu-container"
          @pointerdown=${(e) => e.stopPropagation()}
        >
          <icon-button
            width="126px"
            height="32px"
            class="menu-item open"
            text="Open"
            @click=${() => this._open()}
            ?disabled=${this._openButtonDisabled}
          >
            ${OpenIcon}
          </icon-button>

          ${this._peekable()
                ? html `<icon-button
                width="126px"
                height="32px"
                text="Open in center peek"
                class="menu-item center-peek"
                @click=${() => this._peek()}
              >
                ${CenterPeekIcon}
              </icon-button>`
                : nothing}

          <icon-button
            width="126px"
            height="32px"
            class="menu-item copy"
            text="Copy"
            @click=${() => this._copyBlock()}
          >
            ${CopyIcon}
          </icon-button>

          <icon-button
            width="126px"
            height="32px"
            class="menu-item duplicate"
            text="Duplicate"
            ?disabled=${this._doc.readonly}
            @click=${() => this._duplicateBlock()}
          >
            ${DuplicateIcon}
          </icon-button>

          ${isEmbedLinkedDocBlock(this._model) ||
                isEmbedSyncedDocBlock(this._model)
                ? nothing
                : html `<icon-button
                width="126px"
                height="32px"
                class="menu-item reload"
                text="Reload"
                ?disabled=${this._doc.readonly}
                @click=${() => this._refreshData()}
              >
                ${RefreshIcon}
              </icon-button>`}

          <div class="divider"></div>

          <icon-button
            width="126px"
            height="32px"
            class="menu-item delete"
            text="Delete"
            ?disabled=${this._doc.readonly}
            @click=${() => this._doc.deleteBlock(this._model)}
          >
            ${DeleteIcon}
          </icon-button>
        </div>
      </div>
    `;
        }
        #abortController_accessor_storage = __runInitializers(this, _abortController_initializers, void 0);
        get abortController() { return this.#abortController_accessor_storage; }
        set abortController(value) { this.#abortController_accessor_storage = value; }
        #block_accessor_storage = (__runInitializers(this, _abortController_extraInitializers), __runInitializers(this, _block_initializers, void 0));
        get block() { return this.#block_accessor_storage; }
        set block(value) { this.#block_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _block_extraInitializers);
        }
    };
})();
export { EmbedCardMoreMenu };
//# sourceMappingURL=embed-card-more-menu-popper.js.map