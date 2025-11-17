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
import { MindmapStyleFour, MindmapStyleOne, MindmapStyleThree, MindmapStyleTwo, } from '@blocksuite/affine-components/icons';
import { MindmapStyle, } from '@blocksuite/affine-model';
import { BlockStdScope } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/global/utils';
import { DocCollection, IdGeneratorType, Job, Schema, } from '@blocksuite/store';
import { css, html, LitElement, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { MarkdownAdapter } from '../../_common/adapters/markdown/index.js';
import { MiniMindmapSchema, MiniMindmapSpecs } from './spec.js';
const mindmapStyles = [
    [MindmapStyle.ONE, MindmapStyleOne],
    [MindmapStyle.TWO, MindmapStyleTwo],
    [MindmapStyle.THREE, MindmapStyleThree],
    [MindmapStyle.FOUR, MindmapStyleFour],
];
let MiniMindmapPreview = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _answer_decorators;
    let _answer_initializers = [];
    let _answer_extraInitializers = [];
    let _ctx_decorators;
    let _ctx_initializers = [];
    let _ctx_extraInitializers = [];
    let _height_decorators;
    let _height_initializers = [];
    let _height_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _mindmapStyle_decorators;
    let _mindmapStyle_initializers = [];
    let _mindmapStyle_extraInitializers = [];
    let _portalHost_decorators;
    let _portalHost_initializers = [];
    let _portalHost_extraInitializers = [];
    let _templateShow_decorators;
    let _templateShow_initializers = [];
    let _templateShow_extraInitializers = [];
    return class MiniMindmapPreview extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _answer_decorators = [property({ attribute: false })];
            _ctx_decorators = [property({ attribute: false })];
            _height_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _mindmapStyle_decorators = [property({ attribute: false })];
            _portalHost_decorators = [query('editor-host')];
            _templateShow_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _answer_decorators, { kind: "accessor", name: "answer", static: false, private: false, access: { has: obj => "answer" in obj, get: obj => obj.answer, set: (obj, value) => { obj.answer = value; } }, metadata: _metadata }, _answer_initializers, _answer_extraInitializers);
            __esDecorate(this, null, _ctx_decorators, { kind: "accessor", name: "ctx", static: false, private: false, access: { has: obj => "ctx" in obj, get: obj => obj.ctx, set: (obj, value) => { obj.ctx = value; } }, metadata: _metadata }, _ctx_initializers, _ctx_extraInitializers);
            __esDecorate(this, null, _height_decorators, { kind: "accessor", name: "height", static: false, private: false, access: { has: obj => "height" in obj, get: obj => obj.height, set: (obj, value) => { obj.height = value; } }, metadata: _metadata }, _height_initializers, _height_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _mindmapStyle_decorators, { kind: "accessor", name: "mindmapStyle", static: false, private: false, access: { has: obj => "mindmapStyle" in obj, get: obj => obj.mindmapStyle, set: (obj, value) => { obj.mindmapStyle = value; } }, metadata: _metadata }, _mindmapStyle_initializers, _mindmapStyle_extraInitializers);
            __esDecorate(this, null, _portalHost_decorators, { kind: "accessor", name: "portalHost", static: false, private: false, access: { has: obj => "portalHost" in obj, get: obj => obj.portalHost, set: (obj, value) => { obj.portalHost = value; } }, metadata: _metadata }, _portalHost_initializers, _portalHost_extraInitializers);
            __esDecorate(this, null, _templateShow_decorators, { kind: "accessor", name: "templateShow", static: false, private: false, access: { has: obj => "templateShow" in obj, get: obj => obj.templateShow, set: (obj, value) => { obj.templateShow = value; } }, metadata: _metadata }, _templateShow_initializers, _templateShow_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    mini-mindmap-root-block,
    mini-mindmap-surface-block,
    editor-host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .select-template-title {
      align-self: stretch;

      color: var(
        --light-textColor-textSecondaryColor,
        var(--textColor-textSecondaryColor, #8e8d91)
      );

      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;

      margin-bottom: 4px;
    }

    .template {
      display: flex;
      gap: 12px;
    }

    .template-item {
      box-sizing: border-box;
      border: 2px solid var(--affine-border-color);
      border-radius: 4px;
      padding: 4px 6px;
    }

    .template-item.active,
    .template-item:hover {
      border-color: var(--affine-brand-color);
    }

    .template-item > svg {
      display: block;
    }
  `; }
        get _mindmap() {
            return (this.surface?.getElementById(this.mindmapId || '') ?? null);
        }
        _createTemporaryDoc() {
            const schema = new Schema();
            schema.register(MiniMindmapSchema);
            const options = {
                id: 'MINI_MINDMAP_TEMPORARY',
                schema,
                idGenerator: IdGeneratorType.NanoID,
                awarenessSources: [],
            };
            const collection = new DocCollection(options);
            collection.meta.initialize();
            collection.start();
            const doc = collection.createDoc({ id: 'doc:home' }).load();
            const rootId = doc.addBlock('affine:page', {});
            const surfaceId = doc.addBlock('affine:surface', {}, rootId);
            const surface = doc.getBlockById(surfaceId);
            doc.resetHistory();
            return {
                doc,
                surface,
            };
        }
        _switchStyle(style) {
            if (!this._mindmap || !this.doc) {
                return;
            }
            this.doc.transact(() => {
                this._mindmap.style = style;
            });
            this.ctx.set({ style });
            this.requestUpdate();
        }
        _toMindmapNode(answer, doc) {
            return markdownToMindmap(answer, doc);
        }
        connectedCallback() {
            super.connectedCallback();
            const tempDoc = this._createTemporaryDoc();
            const mindmapNode = this._toMindmapNode(this.answer, tempDoc.doc);
            if (!mindmapNode) {
                return;
            }
            this.doc = tempDoc.doc;
            this.surface = tempDoc.surface;
            this.mindmapId = this.surface.addElement({
                type: 'mindmap',
                children: mindmapNode,
                style: this.mindmapStyle ?? MindmapStyle.FOUR,
            });
            this.surface.getElementById(this.mindmapId);
            const centerPosition = this._mindmap?.tree.element.xywh;
            this.ctx.set({
                node: mindmapNode,
                style: MindmapStyle.FOUR,
                centerPosition,
            });
        }
        render() {
            if (!this.doc || !this.surface || !this._mindmap)
                return nothing;
            const curStyle = this._mindmap.style;
            return html ` <div>
      <div
        style=${styleMap({
                height: this.height + 'px',
                border: '1px solid var(--affine-border-color)',
                borderRadius: '4px',
            })}
      >
        ${new BlockStdScope({
                doc: this.doc,
                extensions: MiniMindmapSpecs,
            }).render()}
      </div>

      ${this.templateShow
                ? html ` <div class="select-template-title">Select template</div>
            <div class="template">
              ${repeat(mindmapStyles, ([style]) => style, ([style, icon]) => {
                    return html `<div
                    class=${`template-item ${curStyle === style ? 'active' : ''}`}
                    @click=${() => this._switchStyle(style)}
                  >
                    ${icon}
                  </div>`;
                })}
            </div>`
                : nothing}
    </div>`;
        }
        #answer_accessor_storage = __runInitializers(this, _answer_initializers, void 0);
        get answer() { return this.#answer_accessor_storage; }
        set answer(value) { this.#answer_accessor_storage = value; }
        #ctx_accessor_storage = (__runInitializers(this, _answer_extraInitializers), __runInitializers(this, _ctx_initializers, void 0));
        get ctx() { return this.#ctx_accessor_storage; }
        set ctx(value) { this.#ctx_accessor_storage = value; }
        #height_accessor_storage = (__runInitializers(this, _ctx_extraInitializers), __runInitializers(this, _height_initializers, 400));
        get height() { return this.#height_accessor_storage; }
        set height(value) { this.#height_accessor_storage = value; }
        #host_accessor_storage = (__runInitializers(this, _height_extraInitializers), __runInitializers(this, _host_initializers, void 0));
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #mindmapStyle_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _mindmapStyle_initializers, undefined));
        get mindmapStyle() { return this.#mindmapStyle_accessor_storage; }
        set mindmapStyle(value) { this.#mindmapStyle_accessor_storage = value; }
        #portalHost_accessor_storage = (__runInitializers(this, _mindmapStyle_extraInitializers), __runInitializers(this, _portalHost_initializers, void 0));
        get portalHost() { return this.#portalHost_accessor_storage; }
        set portalHost(value) { this.#portalHost_accessor_storage = value; }
        #templateShow_accessor_storage = (__runInitializers(this, _portalHost_extraInitializers), __runInitializers(this, _templateShow_initializers, true));
        get templateShow() { return this.#templateShow_accessor_storage; }
        set templateShow(value) { this.#templateShow_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _templateShow_extraInitializers);
        }
    };
})();
export { MiniMindmapPreview };
export const markdownToMindmap = (answer, doc) => {
    let result = null;
    const job = new Job({ collection: doc.collection });
    const markdown = new MarkdownAdapter(job);
    const ast = markdown['_markdownToAst'](answer);
    const traverse = (markdownNode, firstLevel = false) => {
        switch (markdownNode.type) {
            case 'list':
                {
                    const listItems = markdownNode.children
                        .map(child => traverse(child))
                        .filter(val => val);
                    if (firstLevel) {
                        return listItems[0];
                    }
                }
                break;
            case 'listItem': {
                const paragraph = markdownNode.children[0];
                const list = markdownNode.children[1];
                const node = {
                    text: '',
                    children: [],
                };
                if (paragraph?.type === 'paragraph') {
                    if (paragraph.children[0]?.type === 'text') {
                        node.text = paragraph.children[0].value;
                    }
                }
                if (list?.type === 'list') {
                    node.children = list.children
                        .map(child => traverse(child))
                        .filter(val => val);
                }
                return node;
            }
        }
        return null;
    };
    if (ast?.children?.[0]?.type === 'list') {
        result = traverse(ast.children[0], true);
    }
    return result;
};
//# sourceMappingURL=mindmap-preview.js.map