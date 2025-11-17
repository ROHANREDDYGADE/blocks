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
import { REFERENCE_NODE } from '@blocksuite/affine-components/rich-text';
import { createDefaultDoc, matchFlavours, } from '@blocksuite/affine-shared/utils';
import { ShadowlessElement } from '@blocksuite/block-std';
import { SignalWatcher, WithDisposable } from '@blocksuite/global/utils';
import { computed } from '@preact/signals-core';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { isPureText } from '../utils/title-doc.js';
let NoteRenderer = (() => {
    let _classSuper = SignalWatcher(WithDisposable(ShadowlessElement));
    let _rowId_decorators;
    let _rowId_initializers = [];
    let _rowId_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _openDoc_decorators;
    let _openDoc_initializers = [];
    let _openDoc_extraInitializers = [];
    let _view_decorators;
    let _view_initializers = [];
    let _view_extraInitializers = [];
    return class NoteRenderer extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _rowId_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _model_decorators = [property({ attribute: false })];
            _openDoc_decorators = [property({ attribute: false })];
            _view_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _rowId_decorators, { kind: "accessor", name: "rowId", static: false, private: false, access: { has: obj => "rowId" in obj, get: obj => obj.rowId, set: (obj, value) => { obj.rowId = value; } }, metadata: _metadata }, _rowId_initializers, _rowId_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(this, null, _openDoc_decorators, { kind: "accessor", name: "openDoc", static: false, private: false, access: { has: obj => "openDoc" in obj, get: obj => obj.openDoc, set: (obj, value) => { obj.openDoc = value; } }, metadata: _metadata }, _openDoc_initializers, _openDoc_extraInitializers);
            __esDecorate(this, null, _view_decorators, { kind: "accessor", name: "view", static: false, private: false, access: { has: obj => "view" in obj, get: obj => obj.view, set: (obj, value) => { obj.view = value; } }, metadata: _metadata }, _view_initializers, _view_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    database-datasource-note-renderer {
      width: 100%;
      --affine-editor-side-padding: 0;
      flex: 1;
    }
  `; }
        #rowId_accessor_storage;
        get rowId() { return this.#rowId_accessor_storage; }
        set rowId(value) { this.#rowId_accessor_storage = value; }
        get databaseBlock() {
            return this.model;
        }
        addNote() {
            const collection = this.host?.std.collection;
            if (!collection) {
                return;
            }
            const note = createDefaultDoc(collection);
            if (note) {
                this.openDoc(note.id);
                const rowContent = this.rowText$.value?.toString();
                this.rowText$.value?.replace(0, this.rowText$.value.length, REFERENCE_NODE, {
                    reference: {
                        type: 'LinkedPage',
                        pageId: note.id,
                    },
                });
                collection.setDocMeta(note.id, { title: rowContent });
                if (note.root) {
                    note.root.title.insert(rowContent ?? '', 0);
                    note.root.children
                        .find(child => child.flavour === 'affine:note')
                        ?.children.find(block => matchFlavours(block, [
                        'affine:paragraph',
                        'affine:list',
                        'affine:code',
                    ]));
                }
            }
        }
        render() {
            return html `
      <div
        style="height: 1px;max-width: var(--affine-editor-width);background-color: var(--affine-border-color);margin: auto;margin-bottom: 16px"
      ></div>
      ${this.renderNote()}
    `;
        }
        renderNote() {
            if (this.allowCreateDoc$.value) {
                return html ` <div>
        <div
          @click="${this.addNote}"
          style="max-width: var(--affine-editor-width);margin: auto;cursor: pointer;color: var(--affine-text-disable-color)"
        >
          Click to create a linked doc in center peek.
        </div>
      </div>`;
            }
            return;
        }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #model_accessor_storage;
        get model() { return this.#model_accessor_storage; }
        set model(value) { this.#model_accessor_storage = value; }
        #openDoc_accessor_storage;
        get openDoc() { return this.#openDoc_accessor_storage; }
        set openDoc(value) { this.#openDoc_accessor_storage = value; }
        #view_accessor_storage;
        get view() { return this.#view_accessor_storage; }
        set view(value) { this.#view_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this.#rowId_accessor_storage = __runInitializers(this, _rowId_initializers, void 0);
            this.rowText$ = (__runInitializers(this, _rowId_extraInitializers), computed(() => {
                return this.databaseBlock.doc.getBlock(this.rowId)?.model?.text;
            }));
            this.allowCreateDoc$ = computed(() => {
                return isPureText(this.rowText$.value);
            });
            this.#host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
            this.#model_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _model_initializers, void 0));
            this.#openDoc_accessor_storage = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _openDoc_initializers, void 0));
            this.#view_accessor_storage = (__runInitializers(this, _openDoc_extraInitializers), __runInitializers(this, _view_initializers, void 0));
            __runInitializers(this, _view_extraInitializers);
        }
    };
})();
export { NoteRenderer };
//# sourceMappingURL=note-renderer.js.map