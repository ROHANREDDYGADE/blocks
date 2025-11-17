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
import { DefaultInlineManagerExtension } from '@blocksuite/affine-components/rich-text';
import { ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/global/utils';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
let BlockRenderer = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _openDoc_decorators;
    let _openDoc_initializers = [];
    let _openDoc_extraInitializers = [];
    let _rowId_decorators;
    let _rowId_initializers = [];
    let _rowId_extraInitializers = [];
    let _view_decorators;
    let _view_initializers = [];
    let _view_extraInitializers = [];
    return class BlockRenderer extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _host_decorators = [property({ attribute: false })];
            _openDoc_decorators = [property({ attribute: false })];
            _rowId_decorators = [property({ attribute: false })];
            _view_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _openDoc_decorators, { kind: "accessor", name: "openDoc", static: false, private: false, access: { has: obj => "openDoc" in obj, get: obj => obj.openDoc, set: (obj, value) => { obj.openDoc = value; } }, metadata: _metadata }, _openDoc_initializers, _openDoc_extraInitializers);
            __esDecorate(this, null, _rowId_decorators, { kind: "accessor", name: "rowId", static: false, private: false, access: { has: obj => "rowId" in obj, get: obj => obj.rowId, set: (obj, value) => { obj.rowId = value; } }, metadata: _metadata }, _rowId_initializers, _rowId_extraInitializers);
            __esDecorate(this, null, _view_decorators, { kind: "accessor", name: "view", static: false, private: false, access: { has: obj => "view" in obj, get: obj => obj.view, set: (obj, value) => { obj.view = value; } }, metadata: _metadata }, _view_initializers, _view_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    database-datasource-block-renderer {
      padding-top: 36px;
      padding-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 12px;
      border-bottom: 1px solid var(--affine-border-color);
      font-size: var(--affine-font-base);
      line-height: var(--affine-line-height);
    }

    database-datasource-block-renderer .tips-placeholder {
      display: none;
    }

    database-datasource-block-renderer rich-text {
      font-size: 15px;
      line-height: 24px;
    }

    database-datasource-block-renderer.empty rich-text::before {
      content: 'Untitled';
      position: absolute;
      color: var(--affine-text-disable-color);
      font-size: 15px;
      line-height: 24px;
      user-select: none;
      pointer-events: none;
    }

    .database-block-detail-header-icon {
      width: 20px;
      height: 20px;
      padding: 2px;
      border-radius: 4px;
      background-color: var(--affine-background-secondary-color);
    }

    .database-block-detail-header-icon svg {
      width: 16px;
      height: 16px;
    }
  `; }
        get attributeRenderer() {
            return this.inlineManager.getRenderer();
        }
        get attributesSchema() {
            return this.inlineManager.getSchema();
        }
        get inlineManager() {
            return this.host.std.get(DefaultInlineManagerExtension.identifier);
        }
        get model() {
            return this.host?.doc.getBlock(this.rowId)?.model;
        }
        get service() {
            return this.host.std.getService('affine:database');
        }
        connectedCallback() {
            super.connectedCallback();
            if (this.model && this.model.text) {
                const cb = () => {
                    if (this.model?.text?.length == 0) {
                        this.classList.add('empty');
                    }
                    else {
                        this.classList.remove('empty');
                    }
                };
                this.model.text.yText.observe(cb);
                this.disposables.add(() => {
                    this.model?.text?.yText.unobserve(cb);
                });
            }
            this._disposables.addFromEvent(this, 'keydown', e => {
                if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }
                if (e.key === 'Backspace' &&
                    !e.shiftKey &&
                    !e.metaKey &&
                    this.model?.text?.length === 0) {
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }
            }, true);
        }
        render() {
            const model = this.model;
            if (!model) {
                return;
            }
            return html `
      ${this.renderIcon()}
      <rich-text
        .yText=${model.text}
        .attributesSchema=${this.attributesSchema}
        .attributeRenderer=${this.attributeRenderer}
        .embedChecker=${this.inlineManager.embedChecker}
        .markdownShortcutHandler=${this.inlineManager.markdownShortcutHandler}
        class="inline-editor"
      ></rich-text>
    `;
        }
        renderIcon() {
            const iconColumn = this.view.mainProperties$.value.iconColumn;
            if (!iconColumn) {
                return;
            }
            return html ` <div class="database-block-detail-header-icon">
      ${this.view.cellValueGet(this.rowId, iconColumn)}
    </div>`;
        }
        #host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #openDoc_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _openDoc_initializers, void 0));
        get openDoc() { return this.#openDoc_accessor_storage; }
        set openDoc(value) { this.#openDoc_accessor_storage = value; }
        #rowId_accessor_storage = (__runInitializers(this, _openDoc_extraInitializers), __runInitializers(this, _rowId_initializers, void 0));
        get rowId() { return this.#rowId_accessor_storage; }
        set rowId(value) { this.#rowId_accessor_storage = value; }
        #view_accessor_storage = (__runInitializers(this, _rowId_extraInitializers), __runInitializers(this, _view_initializers, void 0));
        get view() { return this.#view_accessor_storage; }
        set view(value) { this.#view_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _view_extraInitializers);
        }
    };
})();
export { BlockRenderer };
//# sourceMappingURL=block-renderer.js.map