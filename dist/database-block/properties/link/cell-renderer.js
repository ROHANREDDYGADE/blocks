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
import { RefNodeSlotsProvider } from '@blocksuite/affine-components/rich-text';
import { ParseDocUrlProvider } from '@blocksuite/affine-shared/services';
import { unsafeCSSVarV2 } from '@blocksuite/affine-shared/theme';
import { isValidUrl, normalizeUrl, stopPropagation, } from '@blocksuite/affine-shared/utils';
import { BaseCellRenderer, createFromBaseCellRenderer, createIcon, } from '@blocksuite/data-view';
import { EditIcon } from '@blocksuite/icons/lit';
import { baseTheme } from '@toeverything/theme';
import { css, nothing, unsafeCSS } from 'lit';
import { query, state } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';
import { HostContextKey } from '../../context/host-context.js';
import { linkColumnModelConfig } from './define.js';
let LinkCell = (() => {
    let _classSuper = BaseCellRenderer;
    let _docId_decorators;
    let _docId_initializers = [];
    let _docId_extraInitializers = [];
    return class LinkCell extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _docId_decorators = [state()];
            __esDecorate(this, null, _docId_decorators, { kind: "accessor", name: "docId", static: false, private: false, access: { has: obj => "docId" in obj, get: obj => obj.docId, set: (obj, value) => { obj.docId = value; } }, metadata: _metadata }, _docId_initializers, _docId_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    affine-database-link-cell {
      width: 100%;
      user-select: none;
      position: relative;
    }

    affine-database-link-cell:hover .affine-database-link-icon {
      visibility: visible;
    }

    .affine-database-link {
      display: flex;
      position: relative;
      align-items: center;
      width: 100%;
      height: 100%;
      outline: none;
      overflow: hidden;
      font-size: var(--data-view-cell-text-size);
      line-height: var(--data-view-cell-text-line-height);
      word-break: break-all;
    }

    affine-database-link-node {
      flex: 1;
      word-break: break-all;
    }

    .affine-database-link-icon {
      position: absolute;
      right: 8px;
      top: 8px;
      display: flex;
      align-items: center;
      visibility: hidden;
      cursor: pointer;
      background: ${unsafeCSSVarV2('button/iconButtonSolid')};
      color: ${unsafeCSSVarV2('icon/primary')};
      box-shadow: var(--affine-button-shadow);
      border-radius: 4px;
      font-size: 14px;
      padding: 2px;
    }

    .affine-database-link-icon:hover {
      background: var(--affine-hover-color);
    }

    .data-view-link-column-linked-doc {
      text-decoration: underline;
      text-decoration-color: var(--affine-divider-color);
      transition: text-decoration-color 0.2s ease-out;
      cursor: pointer;
    }

    .data-view-link-column-linked-doc:hover {
      text-decoration-color: var(--affine-icon-color);
    }
  `; }
        get std() {
            const host = this.view.contextGet(HostContextKey);
            return host?.std;
        }
        render() {
            const linkText = this.value ?? '';
            const docName = this.docId && this.std?.collection.getDoc(this.docId)?.meta?.title;
            return html `
      <div class="affine-database-link" @click="${this._onClick}">
        ${docName
                ? html `<span
              class="data-view-link-column-linked-doc"
              @click="${this.openDoc}"
              >${docName}</span
            >`
                : html ` <affine-database-link-node
              .link="${linkText}"
            ></affine-database-link-node>`}
      </div>
      ${docName || linkText
                ? html ` <div class="affine-database-link-icon" @click="${this._onEdit}">
            ${EditIcon()}
          </div>`
                : nothing}
    `;
        }
        updated() {
            if (this.value !== this.preValue) {
                const std = this.std;
                this.preValue = this.value;
                if (!this.value || !isValidUrl(this.value)) {
                    this.docId = undefined;
                    return;
                }
                this.docId =
                    std?.getOptional(ParseDocUrlProvider)?.parseDocUrl(this.value)?.docId ??
                        undefined;
            }
        }
        #docId_accessor_storage;
        get docId() { return this.#docId_accessor_storage; }
        set docId(value) { this.#docId_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._onClick = (event) => {
                event.stopPropagation();
                const value = this.value ?? '';
                if (!value || !isValidUrl(value)) {
                    this.selectCurrentCell(true);
                    return;
                }
                if (isValidUrl(value)) {
                    const target = event.target;
                    const link = target.querySelector('.link-node');
                    if (link) {
                        event.preventDefault();
                        link.click();
                    }
                    return;
                }
            };
            this._onEdit = (e) => {
                e.stopPropagation();
                this.selectCurrentCell(true);
            };
            this.openDoc = (e) => {
                e.stopPropagation();
                if (!this.docId) {
                    return;
                }
                const std = this.std;
                if (!std) {
                    return;
                }
                std
                    .getOptional(RefNodeSlotsProvider)
                    ?.docLinkClicked.emit({ pageId: this.docId });
            };
            this.#docId_accessor_storage = __runInitializers(this, _docId_initializers, undefined);
            __runInitializers(this, _docId_extraInitializers);
        }
    };
})();
export { LinkCell };
let LinkCellEditing = (() => {
    let _classSuper = BaseCellRenderer;
    let __container_decorators;
    let __container_initializers = [];
    let __container_extraInitializers = [];
    return class LinkCellEditing extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __container_decorators = [query('.affine-database-link-editing')];
            __esDecorate(this, null, __container_decorators, { kind: "accessor", name: "_container", static: false, private: false, access: { has: obj => "_container" in obj, get: obj => obj._container, set: (obj, value) => { obj._container = value; } }, metadata: _metadata }, __container_initializers, __container_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    affine-database-link-cell-editing {
      width: 100%;
      cursor: text;
    }

    .affine-database-link-editing {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0;
      border: none;
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
      color: var(--affine-text-primary-color);
      font-weight: 400;
      background-color: transparent;
      font-size: var(--data-view-cell-text-size);
      line-height: var(--data-view-cell-text-line-height);
      word-break: break-all;
    }

    .affine-database-link-editing:focus {
      outline: none;
    }
  `; }
        firstUpdated() {
            this._focusEnd();
        }
        onExitEditMode() {
            this._setValue();
        }
        render() {
            const linkText = this.value ?? '';
            return html `<input
      class="affine-database-link-editing link"
      .value="${linkText}"
      @keydown="${this._onKeydown}"
      @pointerdown="${stopPropagation}"
    />`;
        }
        #_container_accessor_storage;
        get _container() { return this.#_container_accessor_storage; }
        set _container(value) { this.#_container_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._focusEnd = () => {
                const end = this._container.value.length;
                this._container.focus();
                this._container.setSelectionRange(end, end);
            };
            this._onKeydown = (e) => {
                if (e.key === 'Enter' && !e.isComposing) {
                    this._setValue();
                    setTimeout(() => {
                        this.selectCurrentCell(false);
                    });
                }
            };
            this._setValue = (value = this._container.value) => {
                let url = value;
                if (isValidUrl(value)) {
                    url = normalizeUrl(value);
                }
                this.onChange(url);
                this._container.value = url;
            };
            this.#_container_accessor_storage = __runInitializers(this, __container_initializers, void 0);
            __runInitializers(this, __container_extraInitializers);
        }
    };
})();
export { LinkCellEditing };
export const linkColumnConfig = linkColumnModelConfig.createPropertyMeta({
    icon: createIcon('LinkIcon'),
    cellRenderer: {
        view: createFromBaseCellRenderer(LinkCell),
        edit: createFromBaseCellRenderer(LinkCellEditing),
    },
});
//# sourceMappingURL=cell-renderer.js.map