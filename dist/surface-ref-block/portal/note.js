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
import { DEFAULT_NOTE_BACKGROUND_COLOR, NoteDisplayMode, NoteShadow, } from '@blocksuite/affine-model';
import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { SpecProvider } from '@blocksuite/affine-shared/utils';
import { BlockStdScope, RANGE_QUERY_EXCLUDE_ATTR, } from '@blocksuite/block-std';
import { ShadowlessElement } from '@blocksuite/block-std';
import { deserializeXYWH, WithDisposable } from '@blocksuite/global/utils';
import { BlockViewType } from '@blocksuite/store';
import { css, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { html } from 'lit/static-html.js';
import { EDGELESS_BLOCK_CHILD_BORDER_WIDTH, EDGELESS_BLOCK_CHILD_PADDING, } from '../../_common/consts.js';
let SurfaceRefNotePortal = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _index_decorators;
    let _index_initializers = [];
    let _index_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _renderer_decorators;
    let _renderer_initializers = [];
    let _renderer_extraInitializers = [];
    return class SurfaceRefNotePortal extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _host_decorators = [property({ attribute: false })];
            _index_decorators = [property({ attribute: false })];
            _model_decorators = [property({ attribute: false })];
            _renderer_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _index_decorators, { kind: "accessor", name: "index", static: false, private: false, access: { has: obj => "index" in obj, get: obj => obj.index, set: (obj, value) => { obj.index = value; } }, metadata: _metadata }, _index_initializers, _index_extraInitializers);
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(this, null, _renderer_decorators, { kind: "accessor", name: "renderer", static: false, private: false, access: { has: obj => "renderer" in obj, get: obj => obj.renderer, set: (obj, value) => { obj.renderer = value; } }, metadata: _metadata }, _renderer_initializers, _renderer_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    surface-ref-note-portal {
      position: relative;
    }
  `; }
        connectedCallback() {
            super.connectedCallback();
            const ancestors = new Set();
            let parent = this.model;
            while (parent) {
                this.ancestors.add(parent.id);
                parent = this.model.doc.getParent(parent.id);
            }
            const query = {
                mode: 'include',
                match: Array.from(ancestors).map(id => ({
                    id,
                    viewType: BlockViewType.Display,
                })),
            };
            this.query = query;
            const doc = this.model.doc;
            this._disposables.add(() => {
                doc.blockCollection.clearQuery(query, true);
            });
        }
        firstUpdated() {
            this.disposables.add(this.model.propsUpdated.on(() => this.requestUpdate()));
        }
        render() {
            const { model, index } = this;
            const { displayMode, edgeless } = model;
            if (!!displayMode && displayMode === NoteDisplayMode.DocOnly)
                return nothing;
            const backgroundColor = this.host.std
                .get(ThemeProvider)
                .generateColorProperty(model.background, DEFAULT_NOTE_BACKGROUND_COLOR);
            const [modelX, modelY, modelW, modelH] = deserializeXYWH(model.xywh);
            const style = {
                zIndex: `${index}`,
                width: modelW + 'px',
                height: edgeless.collapse && edgeless.collapsedHeight
                    ? edgeless.collapsedHeight + 'px'
                    : undefined,
                transform: `translate(${modelX}px, ${modelY}px)`,
                padding: `${EDGELESS_BLOCK_CHILD_PADDING}px`,
                border: `${EDGELESS_BLOCK_CHILD_BORDER_WIDTH}px none var(--affine-black-10)`,
                backgroundColor,
                boxShadow: `var(${NoteShadow.Sticker})`,
                position: 'absolute',
                borderRadius: '0px',
                boxSizing: 'border-box',
                pointerEvents: 'none',
                overflow: 'hidden',
                transformOrigin: '0 0',
                userSelect: 'none',
            };
            return html `
      <div
        class="surface-ref-note-portal"
        style=${styleMap(style)}
        data-model-height="${modelH}"
        data-portal-reference-block-id="${model.id}"
      >
        ${this.renderPreview()}
      </div>
    `;
        }
        renderPreview() {
            if (!this.query) {
                console.error('Query is not set before rendering note preview');
                return nothing;
            }
            const doc = this.model.doc.blockCollection.getDoc({
                query: this.query,
                readonly: true,
            });
            const previewSpec = SpecProvider.getInstance().getSpec('page:preview');
            return new BlockStdScope({
                doc,
                extensions: previewSpec.value.slice(),
            }).render();
        }
        updated() {
            setTimeout(() => {
                const editableElements = Array.from(this.querySelectorAll('[contenteditable]'));
                const blocks = Array.from(this.querySelectorAll(`[data-block-id]`));
                editableElements.forEach(element => {
                    if (element.contentEditable === 'true')
                        element.contentEditable = 'false';
                });
                blocks.forEach(element => {
                    element.setAttribute(RANGE_QUERY_EXCLUDE_ATTR, 'true');
                });
            }, 500);
        }
        #host_accessor_storage;
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #index_accessor_storage;
        get index() { return this.#index_accessor_storage; }
        set index(value) { this.#index_accessor_storage = value; }
        #model_accessor_storage;
        get model() { return this.#model_accessor_storage; }
        set model(value) { this.#model_accessor_storage = value; }
        #renderer_accessor_storage;
        get renderer() { return this.#renderer_accessor_storage; }
        set renderer(value) { this.#renderer_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this.ancestors = new Set();
            this.query = null;
            this.#host_accessor_storage = __runInitializers(this, _host_initializers, void 0);
            this.#index_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _index_initializers, void 0));
            this.#model_accessor_storage = (__runInitializers(this, _index_extraInitializers), __runInitializers(this, _model_initializers, void 0));
            this.#renderer_accessor_storage = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _renderer_initializers, void 0));
            __runInitializers(this, _renderer_extraInitializers);
        }
    };
})();
export { SurfaceRefNotePortal };
//# sourceMappingURL=note.js.map