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
import { TextUtils } from '@blocksuite/affine-block-surface';
import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { almostEqual } from '@blocksuite/affine-shared/utils';
import { RANGE_SYNC_EXCLUDE_ATTR, ShadowlessElement, } from '@blocksuite/block-std';
import { assertExists, Bound, Vec, WithDisposable, } from '@blocksuite/global/utils';
import { DocCollection } from '@blocksuite/store';
import { css, html, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
const HORIZONTAL_PADDING = 2;
const VERTICAL_PADDING = 2;
const BORDER_WIDTH = 1;
let EdgelessConnectorLabelEditor = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _connector_decorators;
    let _connector_initializers = [];
    let _connector_extraInitializers = [];
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _richText_decorators;
    let _richText_initializers = [];
    let _richText_extraInitializers = [];
    return class EdgelessConnectorLabelEditor extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _connector_decorators = [property({ attribute: false })];
            _edgeless_decorators = [property({ attribute: false })];
            _richText_decorators = [query('rich-text')];
            __esDecorate(this, null, _connector_decorators, { kind: "accessor", name: "connector", static: false, private: false, access: { has: obj => "connector" in obj, get: obj => obj.connector, set: (obj, value) => { obj.connector = value; } }, metadata: _metadata }, _connector_initializers, _connector_extraInitializers);
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _richText_decorators, { kind: "accessor", name: "richText", static: false, private: false, access: { has: obj => "richText" in obj, get: obj => obj.richText, set: (obj, value) => { obj.richText = value; } }, metadata: _metadata }, _richText_initializers, _richText_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .edgeless-connector-label-editor {
      position: absolute;
      left: 0;
      top: 0;
      transform-origin: center;
      z-index: 10;
      padding: ${VERTICAL_PADDING}px ${HORIZONTAL_PADDING}px;
      border: ${BORDER_WIDTH}px solid var(--affine-primary-color, #1e96eb);
      background: var(--affine-background-primary-color, #fff);
      border-radius: 2px;
      box-shadow: 0px 0px 0px 2px rgba(30, 150, 235, 0.3);
      box-sizing: border-box;
      overflow: visible;

      .inline-editor {
        white-space: pre-wrap !important;
        outline: none;
      }

      .inline-editor span {
        word-break: normal !important;
        overflow-wrap: anywhere !important;
      }

      .edgeless-connector-label-editor-placeholder {
        pointer-events: none;
        color: var(--affine-text-disable-color);
        white-space: nowrap;
      }
    }
  `; }
        get inlineEditor() {
            assertExists(this.richText.inlineEditor);
            return this.richText.inlineEditor;
        }
        get inlineEditorContainer() {
            return this.inlineEditor.rootElement;
        }
        connectedCallback() {
            super.connectedCallback();
            this.setAttribute(RANGE_SYNC_EXCLUDE_ATTR, 'true');
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._resizeObserver?.disconnect();
            this._resizeObserver = null;
        }
        firstUpdated() {
            const { edgeless, connector } = this;
            const { dispatcher } = edgeless;
            assertExists(dispatcher);
            this._resizeObserver = new ResizeObserver(() => {
                this._updateLabelRect();
                this.requestUpdate();
            });
            this._resizeObserver.observe(this.richText);
            this.updateComplete
                .then(() => {
                this.inlineEditor.selectAll();
                this.inlineEditor.slots.renderComplete.on(() => {
                    this.requestUpdate();
                });
                this.disposables.add(dispatcher.add('keyDown', ctx => {
                    const state = ctx.get('keyboardState');
                    const { key, ctrlKey, metaKey, altKey, shiftKey, isComposing } = state.raw;
                    const onlyCmd = (ctrlKey || metaKey) && !altKey && !shiftKey;
                    const isModEnter = onlyCmd && key === 'Enter';
                    const isEscape = key === 'Escape';
                    if (!isComposing && (isModEnter || isEscape)) {
                        this.inlineEditorContainer.blur();
                        edgeless.service.selection.set({
                            elements: [connector.id],
                            editing: false,
                        });
                        return true;
                    }
                    return false;
                }));
                this.disposables.add(edgeless.service.surface.elementUpdated.on(({ id }) => {
                    if (id === connector.id)
                        this.requestUpdate();
                }));
                this.disposables.add(edgeless.service.viewport.viewportUpdated.on(() => {
                    this.requestUpdate();
                }));
                this.disposables.add(dispatcher.add('click', () => true));
                this.disposables.add(dispatcher.add('doubleClick', () => true));
                this.disposables.add(() => {
                    if (connector.text) {
                        const text = connector.text.toString();
                        const trimed = text.trim();
                        const len = trimed.length;
                        if (len === 0) {
                            // reset
                            edgeless.service.updateElement(connector.id, {
                                text: undefined,
                                labelXYWH: undefined,
                                labelOffset: undefined,
                            });
                        }
                        else if (len < text.length) {
                            edgeless.service.updateElement(connector.id, {
                                // @TODO: trim in Y.Text?
                                text: new DocCollection.Y.Text(trimed),
                            });
                        }
                    }
                    connector.lableEditing = false;
                    edgeless.service.selection.set({
                        elements: [],
                        editing: false,
                    });
                });
                this.disposables.addFromEvent(this.inlineEditorContainer, 'blur', () => {
                    if (this._keeping)
                        return;
                    this.remove();
                });
                this.disposables.addFromEvent(this.inlineEditorContainer, 'compositionstart', () => {
                    this._isComposition = true;
                    this.requestUpdate();
                });
                this.disposables.addFromEvent(this.inlineEditorContainer, 'compositionend', () => {
                    this._isComposition = false;
                    this.requestUpdate();
                });
                connector.lableEditing = true;
            })
                .catch(console.error);
        }
        async getUpdateComplete() {
            const result = await super.getUpdateComplete();
            await this.richText?.updateComplete;
            return result;
        }
        render() {
            const { connector } = this;
            const { labelOffset: { distance }, labelStyle: { fontFamily, fontSize, fontStyle, fontWeight, textAlign, color: labelColor, }, labelConstraints: { hasMaxWidth, maxWidth }, } = connector;
            const lineHeight = TextUtils.getLineHeight(fontFamily, fontSize, fontWeight);
            const { translateX, translateY, zoom } = this.edgeless.service.viewport;
            const [x, y] = Vec.mul(connector.getPointByOffsetDistance(distance), zoom);
            const transformOperation = [
                'translate(-50%, -50%)',
                `translate(${translateX}px, ${translateY}px)`,
                `translate(${x}px, ${y}px)`,
                `scale(${zoom})`,
            ];
            const isEmpty = !connector.text?.length && !this._isComposition;
            const color = this.edgeless.std
                .get(ThemeProvider)
                .generateColorProperty(labelColor, '#000000');
            return html `
      <div
        class="edgeless-connector-label-editor"
        style=${styleMap({
                fontFamily: `"${fontFamily}"`,
                fontSize: `${fontSize}px`,
                fontStyle,
                fontWeight,
                textAlign,
                lineHeight: `${lineHeight}px`,
                maxWidth: hasMaxWidth
                    ? `${maxWidth + BORDER_WIDTH * 2 + HORIZONTAL_PADDING * 2}px`
                    : 'initial',
                color,
                transform: transformOperation.join(' '),
            })}
      >
        <rich-text
          .yText=${connector.text}
          .enableFormat=${false}
          style=${isEmpty
                ? styleMap({
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    padding: `${VERTICAL_PADDING}px ${HORIZONTAL_PADDING}px`,
                })
                : nothing}
        ></rich-text>
        ${isEmpty
                ? html `
              <span class="edgeless-connector-label-editor-placeholder">
                Add text
              </span>
            `
                : nothing}
      </div>
    `;
        }
        setKeeping(keeping) {
            this._keeping = keeping;
        }
        #connector_accessor_storage;
        get connector() { return this.#connector_accessor_storage; }
        set connector(value) { this.#connector_accessor_storage = value; }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #richText_accessor_storage;
        get richText() { return this.#richText_accessor_storage; }
        set richText(value) { this.#richText_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._isComposition = false;
            this._keeping = false;
            this._resizeObserver = null;
            this._updateLabelRect = () => {
                const { connector, edgeless } = this;
                if (!connector || !edgeless)
                    return;
                const newWidth = this.inlineEditorContainer.scrollWidth;
                const newHeight = this.inlineEditorContainer.scrollHeight;
                const center = connector.getPointByOffsetDistance(connector.labelOffset.distance);
                const bounds = Bound.fromCenter(center, newWidth, newHeight);
                const labelXYWH = bounds.toXYWH();
                if (!connector.labelXYWH ||
                    labelXYWH.some((p, i) => !almostEqual(p, connector.labelXYWH[i]))) {
                    edgeless.service.updateElement(connector.id, {
                        labelXYWH,
                    });
                }
            };
            this.#connector_accessor_storage = __runInitializers(this, _connector_initializers, void 0);
            this.#edgeless_accessor_storage = (__runInitializers(this, _connector_extraInitializers), __runInitializers(this, _edgeless_initializers, void 0));
            this.#richText_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _richText_initializers, void 0));
            __runInitializers(this, _richText_extraInitializers);
        }
    };
})();
export { EdgelessConnectorLabelEditor };
//# sourceMappingURL=edgeless-connector-label-editor.js.map