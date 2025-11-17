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
import { CommonUtils, TextUtils } from '@blocksuite/affine-block-surface';
import { MindmapElementModel, TextResizing } from '@blocksuite/affine-model';
import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { RANGE_SYNC_EXCLUDE_ATTR, ShadowlessElement, } from '@blocksuite/block-std';
import { assertExists, Bound, Vec, WithDisposable, } from '@blocksuite/global/utils';
import { DocCollection } from '@blocksuite/store';
import { html, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { getSelectedRect } from '../../utils/query.js';
const { toRadian } = CommonUtils;
let EdgelessShapeTextEditor = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _element_decorators;
    let _element_initializers = [];
    let _element_extraInitializers = [];
    let _mountEditor_decorators;
    let _mountEditor_initializers = [];
    let _mountEditor_extraInitializers = [];
    let _richText_decorators;
    let _richText_initializers = [];
    let _richText_extraInitializers = [];
    return class EdgelessShapeTextEditor extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _edgeless_decorators = [property({ attribute: false })];
            _element_decorators = [property({ attribute: false })];
            _mountEditor_decorators = [property({ attribute: false })];
            _richText_decorators = [query('rich-text')];
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _element_decorators, { kind: "accessor", name: "element", static: false, private: false, access: { has: obj => "element" in obj, get: obj => obj.element, set: (obj, value) => { obj.element = value; } }, metadata: _metadata }, _element_initializers, _element_extraInitializers);
            __esDecorate(this, null, _mountEditor_decorators, { kind: "accessor", name: "mountEditor", static: false, private: false, access: { has: obj => "mountEditor" in obj, get: obj => obj.mountEditor, set: (obj, value) => { obj.mountEditor = value; } }, metadata: _metadata }, _mountEditor_initializers, _mountEditor_extraInitializers);
            __esDecorate(this, null, _richText_decorators, { kind: "accessor", name: "richText", static: false, private: false, access: { has: obj => "richText" in obj, get: obj => obj.richText, set: (obj, value) => { obj.richText = value; } }, metadata: _metadata }, _richText_initializers, _richText_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get inlineEditor() {
            assertExists(this.richText.inlineEditor);
            return this.richText.inlineEditor;
        }
        get inlineEditorContainer() {
            return this.inlineEditor.rootElement;
        }
        get isMindMapNode() {
            return this.element.group instanceof MindmapElementModel;
        }
        _initMindmapKeyBindings() {
            if (!this.isMindMapNode) {
                return;
            }
            const service = this.edgeless.service;
            this._disposables.addFromEvent(this, 'keydown', evt => {
                switch (evt.key) {
                    case 'Enter': {
                        evt.stopPropagation();
                        if (evt.shiftKey || evt.isComposing)
                            return;
                        this.ownerDocument.activeElement.blur();
                        service.selection.set({
                            elements: [this.element.id],
                            editing: false,
                        });
                        break;
                    }
                    case 'Esc':
                    case 'Tab': {
                        evt.stopPropagation();
                        this.ownerDocument.activeElement.blur();
                        service.selection.set({
                            elements: [this.element.id],
                            editing: false,
                        });
                        break;
                    }
                }
            });
        }
        _stashMindMapTree() {
            if (!this.isMindMapNode) {
                return;
            }
            const mindmap = this.element.group;
            const pop = mindmap.stashTree(mindmap.tree);
            this._disposables.add(() => {
                mindmap.layout();
                pop?.();
            });
        }
        _unmount() {
            this._resizeObserver?.disconnect();
            this._resizeObserver = null;
            if (this.element.text) {
                const text = this.element.text.toString();
                const trimed = text.trim();
                const len = trimed.length;
                if (len === 0) {
                    this.element.text = undefined;
                }
                else if (len < text.length) {
                    this.element.text = new DocCollection.Y.Text(trimed);
                }
            }
            this.element.textDisplay = true;
            this.remove();
            this.edgeless.service.selection.set({
                elements: [],
                editing: false,
            });
        }
        _updateElementWH() {
            const bcr = this.richText.getBoundingClientRect();
            const containerHeight = this.richText.offsetHeight;
            const containerWidth = this.richText.offsetWidth;
            const textResizing = this.element.textResizing;
            if ((containerHeight !== this.element.h &&
                textResizing === TextResizing.AUTO_HEIGHT) ||
                (textResizing === TextResizing.AUTO_WIDTH_AND_HEIGHT &&
                    (containerWidth !== this.element.w ||
                        containerHeight !== this.element.h))) {
                const [leftTopX, leftTopY] = Vec.rotWith([this.richText.offsetLeft, this.richText.offsetTop], [bcr.left + bcr.width / 2, bcr.top + bcr.height / 2], toRadian(-this.element.rotate));
                const [modelLeftTopX, modelLeftTopY] = this.edgeless.service.viewport.toModelCoord(leftTopX, leftTopY);
                this.edgeless.service.updateElement(this.element.id, {
                    xywh: new Bound(modelLeftTopX, modelLeftTopY, textResizing === TextResizing.AUTO_WIDTH_AND_HEIGHT
                        ? containerWidth
                        : this.element.w, containerHeight).serialize(),
                });
                if (this._lastXYWH !== this.element.xywh) {
                    this.requestUpdate();
                }
                if (this.isMindMapNode) {
                    const mindmap = this.element.group;
                    mindmap.layout();
                }
                this.richText.style.minHeight = `${containerHeight}px`;
            }
            this.edgeless.service.selection.set({
                elements: [this.element.id],
                editing: true,
            });
        }
        connectedCallback() {
            super.connectedCallback();
            this.setAttribute(RANGE_SYNC_EXCLUDE_ATTR, 'true');
        }
        firstUpdated() {
            const dispatcher = this.edgeless.dispatcher;
            assertExists(dispatcher);
            this.element.textDisplay = false;
            this.disposables.add(this.edgeless.service.viewport.viewportUpdated.on(() => {
                this.requestUpdate();
                this.updateComplete
                    .then(() => {
                    this._updateElementWH();
                })
                    .catch(console.error);
            }));
            this.disposables.add(dispatcher.add('click', () => {
                return true;
            }));
            this.disposables.add(dispatcher.add('doubleClick', () => {
                return true;
            }));
            this.updateComplete
                .then(() => {
                if (this.element.group instanceof MindmapElementModel) {
                    this.inlineEditor.selectAll();
                }
                else {
                    this.inlineEditor.focusEnd();
                }
                this.disposables.add(this.inlineEditor.slots.renderComplete.on(() => {
                    this._updateElementWH();
                }));
                this.disposables.addFromEvent(this.inlineEditorContainer, 'blur', () => {
                    if (this._keeping)
                        return;
                    this._unmount();
                });
            })
                .catch(console.error);
            this.disposables.addFromEvent(this, 'keydown', evt => {
                if (evt.key === 'Escape') {
                    requestAnimationFrame(() => {
                        this.edgeless.service.selection.set({
                            elements: [this.element.id],
                            editing: false,
                        });
                    });
                    this.ownerDocument.activeElement.blur();
                }
            });
            this._initMindmapKeyBindings();
            this._stashMindMapTree();
        }
        async getUpdateComplete() {
            const result = await super.getUpdateComplete();
            await this.richText?.updateComplete;
            return result;
        }
        render() {
            if (!this.element.text) {
                console.error('Failed to mount shape editor because of no text.');
                return nothing;
            }
            const [verticalPadding, horiPadding] = this.element.padding;
            const textResizing = this.element.textResizing;
            const viewport = this.edgeless.service.viewport;
            const zoom = viewport.zoom;
            const rect = getSelectedRect([this.element]);
            const rotate = this.element.rotate;
            const [leftTopX, leftTopY] = Vec.rotWith([rect.left, rect.top], [rect.left + rect.width / 2, rect.top + rect.height / 2], toRadian(rotate));
            const [x, y] = this.edgeless.service.viewport.toViewCoord(leftTopX, leftTopY);
            const autoWidth = textResizing === TextResizing.AUTO_WIDTH_AND_HEIGHT;
            const color = this.edgeless.std
                .get(ThemeProvider)
                .generateColorProperty(this.element.color, '#000000');
            const inlineEditorStyle = styleMap({
                position: 'absolute',
                left: x + 'px',
                top: y + 'px',
                width: textResizing === TextResizing.AUTO_HEIGHT
                    ? rect.width + 'px'
                    : 'fit-content',
                // override rich-text style (height: 100%)
                height: 'initial',
                minHeight: textResizing === TextResizing.AUTO_WIDTH_AND_HEIGHT
                    ? '1em'
                    : `${rect.height}px`,
                maxWidth: textResizing === TextResizing.AUTO_WIDTH_AND_HEIGHT
                    ? this.element.maxWidth
                        ? `${this.element.maxWidth}px`
                        : undefined
                    : undefined,
                boxSizing: 'border-box',
                fontSize: this.element.fontSize + 'px',
                fontFamily: TextUtils.wrapFontFamily(this.element.fontFamily),
                fontWeight: this.element.fontWeight,
                lineHeight: 'normal',
                outline: 'none',
                transform: `scale(${zoom}, ${zoom}) rotate(${rotate}deg)`,
                transformOrigin: 'top left',
                color,
                padding: `${verticalPadding}px ${horiPadding}px`,
                textAlign: this.element.textAlign,
                display: 'grid',
                gridTemplateColumns: '100%',
                alignItems: this.element.textVerticalAlign === 'center'
                    ? 'center'
                    : this.element.textVerticalAlign === 'bottom'
                        ? 'end'
                        : 'start',
                alignContent: 'center',
                gap: '0',
                zIndex: '1',
            });
            this._lastXYWH = this.element.xywh;
            return html ` <style>
        edgeless-shape-text-editor v-text [data-v-text] {
          overflow-wrap: ${autoWidth ? 'normal' : 'anywhere'};
          word-break: ${autoWidth ? 'normal' : 'break-word'} !important;
          white-space: ${autoWidth ? 'pre' : 'pre-wrap'} !important;
        }

        edgeless-shape-text-editor .inline-editor {
          min-width: 1px;
        }
      </style>
      <rich-text
        .yText=${this.element.text}
        .enableFormat=${false}
        .enableAutoScrollHorizontally=${false}
        style=${inlineEditorStyle}
      ></rich-text>`;
        }
        setKeeping(keeping) {
            this._keeping = keeping;
        }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #element_accessor_storage;
        get element() { return this.#element_accessor_storage; }
        set element(value) { this.#element_accessor_storage = value; }
        #mountEditor_accessor_storage;
        get mountEditor() { return this.#mountEditor_accessor_storage; }
        set mountEditor(value) { this.#mountEditor_accessor_storage = value; }
        #richText_accessor_storage;
        get richText() { return this.#richText_accessor_storage; }
        set richText(value) { this.#richText_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._keeping = false;
            this._lastXYWH = '';
            this._resizeObserver = null;
            this.#edgeless_accessor_storage = __runInitializers(this, _edgeless_initializers, void 0);
            this.#element_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _element_initializers, void 0));
            this.#mountEditor_accessor_storage = (__runInitializers(this, _element_extraInitializers), __runInitializers(this, _mountEditor_initializers, undefined));
            this.#richText_accessor_storage = (__runInitializers(this, _mountEditor_extraInitializers), __runInitializers(this, _richText_initializers, void 0));
            __runInitializers(this, _richText_extraInitializers);
        }
    };
})();
export { EdgelessShapeTextEditor };
//# sourceMappingURL=edgeless-shape-text-editor.js.map