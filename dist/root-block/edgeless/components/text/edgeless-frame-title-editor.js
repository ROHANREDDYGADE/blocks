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
import { FrameBlockModel } from '@blocksuite/affine-model';
import { RANGE_SYNC_EXCLUDE_ATTR, ShadowlessElement, } from '@blocksuite/block-std';
import { assertExists, Bound, WithDisposable } from '@blocksuite/global/utils';
import { cssVarV2 } from '@toeverything/theme/v2';
import { css, html, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { AFFINE_FRAME_TITLE_WIDGET, } from '../../../widgets/frame-title/index.js';
import { frameTitleStyleVars } from '../../../widgets/frame-title/styles.js';
let EdgelessFrameTitleEditor = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _frameModel_decorators;
    let _frameModel_initializers = [];
    let _frameModel_extraInitializers = [];
    let _richText_decorators;
    let _richText_initializers = [];
    let _richText_extraInitializers = [];
    return class EdgelessFrameTitleEditor extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _edgeless_decorators = [property({ attribute: false })];
            _frameModel_decorators = [property({ attribute: false })];
            _richText_decorators = [query('rich-text')];
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _frameModel_decorators, { kind: "accessor", name: "frameModel", static: false, private: false, access: { has: obj => "frameModel" in obj, get: obj => obj.frameModel, set: (obj, value) => { obj.frameModel = value; } }, metadata: _metadata }, _frameModel_initializers, _frameModel_extraInitializers);
            __esDecorate(this, null, _richText_decorators, { kind: "accessor", name: "richText", static: false, private: false, access: { has: obj => "richText" in obj, get: obj => obj.richText, set: (obj, value) => { obj.richText = value; } }, metadata: _metadata }, _richText_initializers, _richText_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .frame-title-editor {
      display: flex;
      align-items: center;
      transform-origin: top left;
      border-radius: 4px;
      width: fit-content;
      padding: 0 4px;
      outline: none;
      z-index: 1;
      border: 1px solid var(--affine-primary-color);
      box-shadow: 0px 0px 0px 2px rgba(30, 150, 235, 0.3);
      overflow: hidden;
      font-family: var(--affine-font-family);
    }
  `; }
        get editorHost() {
            return this.edgeless.host;
        }
        get inlineEditor() {
            return this.richText?.inlineEditor;
        }
        _unmount() {
            // dispose in advance to avoid execute `this.remove()` twice
            this.disposables.dispose();
            this.edgeless.service.selection.set({
                elements: [],
                editing: false,
            });
            this.remove();
        }
        connectedCallback() {
            super.connectedCallback();
            this.setAttribute(RANGE_SYNC_EXCLUDE_ATTR, 'true');
        }
        firstUpdated() {
            const dispatcher = this.edgeless.dispatcher;
            assertExists(dispatcher);
            this.updateComplete
                .then(() => {
                if (!this.inlineEditor)
                    return;
                this.inlineEditor.selectAll();
                this.inlineEditor.slots.renderComplete.on(() => {
                    this.requestUpdate();
                });
                this.disposables.add(dispatcher.add('keyDown', ctx => {
                    const state = ctx.get('keyboardState');
                    if (state.raw.key === 'Enter' && !state.raw.isComposing) {
                        this._unmount();
                        return true;
                    }
                    requestAnimationFrame(() => {
                        this.requestUpdate();
                    });
                    return false;
                }));
                this.disposables.add(this.edgeless.service.viewport.viewportUpdated.on(() => {
                    this.requestUpdate();
                }));
                this.disposables.add(dispatcher.add('click', () => true));
                this.disposables.add(dispatcher.add('doubleClick', () => true));
                this.disposables.addFromEvent(this.inlineEditor.rootElement, 'blur', () => {
                    this._unmount();
                });
            })
                .catch(console.error);
        }
        async getUpdateComplete() {
            const result = await super.getUpdateComplete();
            await this.richText?.updateComplete;
            return result;
        }
        render() {
            const rootBlockId = this.editorHost.doc.root?.id;
            if (!rootBlockId)
                return nothing;
            const viewport = this.edgeless.service.viewport;
            const bound = Bound.deserialize(this.frameModel.xywh);
            const [x, y] = viewport.toViewCoord(bound.x, bound.y);
            const isInner = this.edgeless.service.gfx.grid.has(this.frameModel.elementBound, true, true, model => model !== this.frameModel && model instanceof FrameBlockModel);
            const frameTitleWidget = this.edgeless.std.view.getWidget(AFFINE_FRAME_TITLE_WIDGET, rootBlockId);
            if (!frameTitleWidget)
                return nothing;
            const frameTitle = frameTitleWidget.getFrameTitle(this.frameModel);
            const colors = frameTitle?.colors ?? {
                background: cssVarV2('edgeless/frame/background/white'),
                text: 'var(--affine-text-primary-color)',
            };
            const inlineEditorStyle = styleMap({
                fontSize: frameTitleStyleVars.fontSize + 'px',
                position: 'absolute',
                left: (isInner ? x + 4 : x) + 'px',
                top: (isInner ? y + 4 : y - (frameTitleStyleVars.height + 8 / 2)) + 'px',
                minWidth: '8px',
                height: frameTitleStyleVars.height + 'px',
                background: colors.background,
                color: colors.text,
            });
            const richTextStyle = styleMap({
                height: 'fit-content',
            });
            return html `<div class="frame-title-editor" style=${inlineEditorStyle}>
      <rich-text
        .yText=${this.frameModel.title.yText}
        .enableFormat=${false}
        .enableAutoScrollHorizontally=${false}
        style=${richTextStyle}
      ></rich-text>
    </div>`;
        }
        #edgeless_accessor_storage = __runInitializers(this, _edgeless_initializers, void 0);
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #frameModel_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _frameModel_initializers, void 0));
        get frameModel() { return this.#frameModel_accessor_storage; }
        set frameModel(value) { this.#frameModel_accessor_storage = value; }
        #richText_accessor_storage = (__runInitializers(this, _frameModel_extraInitializers), __runInitializers(this, _richText_initializers, null));
        get richText() { return this.#richText_accessor_storage; }
        set richText(value) { this.#richText_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _richText_extraInitializers);
        }
    };
})();
export { EdgelessFrameTitleEditor };
//# sourceMappingURL=edgeless-frame-title-editor.js.map