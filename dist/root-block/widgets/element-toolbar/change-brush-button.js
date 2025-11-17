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
import { LINE_COLORS, LineWidth } from '@blocksuite/affine-model';
import { countBy, maxBy, WithDisposable } from '@blocksuite/global/utils';
import { html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { packColor, packColorsWithColorScheme, } from '../../edgeless/components/color-picker/utils.js';
import { GET_DEFAULT_LINE_COLOR } from '../../edgeless/components/panel/color-panel.js';
function getMostCommonColor(elements, colorScheme) {
    const colors = countBy(elements, (ele) => {
        return typeof ele.color === 'object'
            ? (ele.color[colorScheme] ?? ele.color.normal ?? null)
            : ele.color;
    });
    const max = maxBy(Object.entries(colors), ([_k, count]) => count);
    return max ? max[0] : GET_DEFAULT_LINE_COLOR(colorScheme);
}
function getMostCommonSize(elements) {
    const sizes = countBy(elements, ele => ele.lineWidth);
    const max = maxBy(Object.entries(sizes), ([_k, count]) => count);
    return max ? Number(max[0]) : LineWidth.Four;
}
function notEqual(key, value) {
    return (element) => element[key] !== value;
}
let EdgelessChangeBrushButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __selectedColor_decorators;
    let __selectedColor_initializers = [];
    let __selectedColor_extraInitializers = [];
    let __selectedSize_decorators;
    let __selectedSize_initializers = [];
    let __selectedSize_extraInitializers = [];
    let _colorButton_decorators;
    let _colorButton_initializers = [];
    let _colorButton_extraInitializers = [];
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _elements_decorators;
    let _elements_initializers = [];
    let _elements_extraInitializers = [];
    return class EdgelessChangeBrushButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __selectedColor_decorators = [state()];
            __selectedSize_decorators = [state()];
            _colorButton_decorators = [query('edgeless-color-picker-button.color')];
            _edgeless_decorators = [property({ attribute: false })];
            _elements_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __selectedColor_decorators, { kind: "accessor", name: "_selectedColor", static: false, private: false, access: { has: obj => "_selectedColor" in obj, get: obj => obj._selectedColor, set: (obj, value) => { obj._selectedColor = value; } }, metadata: _metadata }, __selectedColor_initializers, __selectedColor_extraInitializers);
            __esDecorate(this, null, __selectedSize_decorators, { kind: "accessor", name: "_selectedSize", static: false, private: false, access: { has: obj => "_selectedSize" in obj, get: obj => obj._selectedSize, set: (obj, value) => { obj._selectedSize = value; } }, metadata: _metadata }, __selectedSize_initializers, __selectedSize_extraInitializers);
            __esDecorate(this, null, _colorButton_decorators, { kind: "accessor", name: "colorButton", static: false, private: false, access: { has: obj => "colorButton" in obj, get: obj => obj.colorButton, set: (obj, value) => { obj.colorButton = value; } }, metadata: _metadata }, _colorButton_initializers, _colorButton_extraInitializers);
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _elements_decorators, { kind: "accessor", name: "elements", static: false, private: false, access: { has: obj => "elements" in obj, get: obj => obj.elements, set: (obj, value) => { obj.elements = value; } }, metadata: _metadata }, _elements_initializers, _elements_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get doc() {
            return this.edgeless.doc;
        }
        get selectedColor() {
            const colorScheme = this.edgeless.surface.renderer.getColorScheme();
            return (this._selectedColor ?? getMostCommonColor(this.elements, colorScheme));
        }
        get selectedSize() {
            return this._selectedSize ?? getMostCommonSize(this.elements);
        }
        get service() {
            return this.edgeless.service;
        }
        get surface() {
            return this.edgeless.surface;
        }
        _setBrushProp(key, value) {
            this.doc.captureSync();
            this.elements
                .filter(notEqual(key, value))
                .forEach(element => this.service.updateElement(element.id, { [key]: value }));
        }
        render() {
            const colorScheme = this.edgeless.surface.renderer.getColorScheme();
            const elements = this.elements;
            const { selectedSize, selectedColor } = this;
            return html `
      <edgeless-line-width-panel
        .selectedSize=${selectedSize}
        @select=${this._setLineWidth}
      >
      </edgeless-line-width-panel>

      <editor-toolbar-separator></editor-toolbar-separator>

      ${when(this.edgeless.doc.awarenessStore.getFlag('enable_color_picker'), () => {
                const { type, colors } = packColorsWithColorScheme(colorScheme, selectedColor, elements[0].color);
                return html `
            <edgeless-color-picker-button
              class="color"
              .label=${'Color'}
              .pick=${this.pickColor}
              .color=${selectedColor}
              .colors=${colors}
              .colorType=${type}
              .palettes=${LINE_COLORS}
            >
            </edgeless-color-picker-button>
          `;
            }, () => html `
          <editor-menu-button
            .contentPadding=${'8px'}
            .button=${html `
              <editor-icon-button aria-label="Color" .tooltip=${'Color'}>
                <edgeless-color-button
                  .color=${selectedColor}
                ></edgeless-color-button>
              </editor-icon-button>
            `}
          >
            <edgeless-color-panel
              .value=${selectedColor}
              @select=${this._setBrushColor}
            >
            </edgeless-color-panel>
          </editor-menu-button>
        `)}
    `;
        }
        #_selectedColor_accessor_storage;
        get _selectedColor() { return this.#_selectedColor_accessor_storage; }
        set _selectedColor(value) { this.#_selectedColor_accessor_storage = value; }
        #_selectedSize_accessor_storage;
        get _selectedSize() { return this.#_selectedSize_accessor_storage; }
        set _selectedSize(value) { this.#_selectedSize_accessor_storage = value; }
        #colorButton_accessor_storage;
        get colorButton() { return this.#colorButton_accessor_storage; }
        set colorButton(value) { this.#colorButton_accessor_storage = value; }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #elements_accessor_storage;
        get elements() { return this.#elements_accessor_storage; }
        set elements(value) { this.#elements_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._setBrushColor = ({ detail: color }) => {
                this._setBrushProp('color', color);
                this._selectedColor = color;
            };
            this._setLineWidth = ({ detail: lineWidth }) => {
                this._setBrushProp('lineWidth', lineWidth);
                this._selectedSize = lineWidth;
            };
            this.pickColor = (event) => {
                if (event.type === 'pick') {
                    this.elements.forEach(ele => this.service.updateElement(ele.id, packColor('color', { ...event.detail })));
                    return;
                }
                this.elements.forEach(ele => ele[event.type === 'start' ? 'stash' : 'pop']('color'));
            };
            this.#_selectedColor_accessor_storage = __runInitializers(this, __selectedColor_initializers, null);
            this.#_selectedSize_accessor_storage = (__runInitializers(this, __selectedColor_extraInitializers), __runInitializers(this, __selectedSize_initializers, null));
            this.#colorButton_accessor_storage = (__runInitializers(this, __selectedSize_extraInitializers), __runInitializers(this, _colorButton_initializers, void 0));
            this.#edgeless_accessor_storage = (__runInitializers(this, _colorButton_extraInitializers), __runInitializers(this, _edgeless_initializers, void 0));
            this.#elements_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _elements_initializers, []));
            __runInitializers(this, _elements_extraInitializers);
        }
    };
})();
export { EdgelessChangeBrushButton };
export function renderChangeBrushButton(edgeless, elements) {
    if (!elements?.length)
        return nothing;
    return html `
    <edgeless-change-brush-button .elements=${elements} .edgeless=${edgeless}>
    </edgeless-change-brush-button>
  `;
}
//# sourceMappingURL=change-brush-button.js.map