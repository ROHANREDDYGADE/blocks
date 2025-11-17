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
import { ConnectorUtils, normalizeShapeBound, TextUtils, } from '@blocksuite/affine-block-surface';
import { SmallArrowDownIcon, TextAlignCenterIcon, TextAlignLeftIcon, TextAlignRightIcon, } from '@blocksuite/affine-components/icons';
import { renderToolbarSeparator } from '@blocksuite/affine-components/toolbar';
import { FontFamily, FontStyle, FontWeight, TextAlign, } from '@blocksuite/affine-model';
import { ConnectorElementModel, EdgelessTextBlockModel, LINE_COLORS, ShapeElementModel, TextElementModel, } from '@blocksuite/affine-model';
import { Bound, countBy, maxBy, WithDisposable, } from '@blocksuite/global/utils';
import { css, html, LitElement, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { join } from 'lit/directives/join.js';
import { when } from 'lit/directives/when.js';
import { packColor, packColorsWithColorScheme, } from '../../edgeless/components/color-picker/utils.js';
import { GET_DEFAULT_LINE_COLOR, } from '../../edgeless/components/panel/color-panel.js';
const FONT_SIZE_LIST = [
    { value: 16 },
    { value: 24 },
    { value: 32 },
    { value: 40 },
    { value: 64 },
    { value: 128 },
];
const FONT_WEIGHT_CHOOSE = [
    [FontWeight.Light, () => 'Light'],
    [FontWeight.Regular, () => 'Regular'],
    [FontWeight.SemiBold, () => 'Semibold'],
];
const FONT_STYLE_CHOOSE = [
    [FontStyle.Normal, () => nothing],
    [FontStyle.Italic, () => 'Italic'],
];
const TEXT_ALIGN_CHOOSE = [
    [TextAlign.Left, () => TextAlignLeftIcon],
    [TextAlign.Center, () => TextAlignCenterIcon],
    [TextAlign.Right, () => TextAlignRightIcon],
];
function countByField(elements, field) {
    return countBy(elements, element => extractField(element, field));
}
function extractField(element, field) {
    //TODO: It's not a very good handling method.
    //      The edgeless-change-text-menu should be refactored into a widget to allow external registration of its own logic.
    if (element instanceof EdgelessTextBlockModel) {
        return field === 'fontSize'
            ? null
            : element[field];
    }
    return (element instanceof ConnectorElementModel
        ? element.labelStyle[field]
        : element[field]);
}
function getMostCommonValue(elements, field) {
    const values = countByField(elements, field);
    return maxBy(Object.entries(values), ([_k, count]) => count);
}
function getMostCommonAlign(elements) {
    const max = getMostCommonValue(elements, 'textAlign');
    return max ? max[0] : TextAlign.Left;
}
function getMostCommonColor(elements, colorScheme) {
    const colors = countBy(elements, (ele) => {
        const color = ele instanceof ConnectorElementModel ? ele.labelStyle.color : ele.color;
        return typeof color === 'object'
            ? (color[colorScheme] ?? color.normal ?? null)
            : color;
    });
    const max = maxBy(Object.entries(colors), ([_k, count]) => count);
    return max ? max[0] : GET_DEFAULT_LINE_COLOR(colorScheme);
}
function getMostCommonFontFamily(elements) {
    const max = getMostCommonValue(elements, 'fontFamily');
    return max ? max[0] : FontFamily.Inter;
}
function getMostCommonFontSize(elements) {
    const max = getMostCommonValue(elements, 'fontSize');
    return max ? Number(max[0]) : FONT_SIZE_LIST[0].value;
}
function getMostCommonFontStyle(elements) {
    const max = getMostCommonValue(elements, 'fontStyle');
    return max ? max[0] : FontStyle.Normal;
}
function getMostCommonFontWeight(elements) {
    const max = getMostCommonValue(elements, 'fontWeight');
    return max ? max[0] : FontWeight.Regular;
}
function buildProps(element, props) {
    if (element instanceof ConnectorElementModel) {
        return {
            labelStyle: {
                ...element.labelStyle,
                ...props,
            },
        };
    }
    return { ...props };
}
let EdgelessChangeTextMenu = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _elements_decorators;
    let _elements_initializers = [];
    let _elements_extraInitializers = [];
    let _elementType_decorators;
    let _elementType_initializers = [];
    let _elementType_extraInitializers = [];
    let _textColorButton_decorators;
    let _textColorButton_initializers = [];
    let _textColorButton_extraInitializers = [];
    return class EdgelessChangeTextMenu extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _edgeless_decorators = [property({ attribute: false })];
            _elements_decorators = [property({ attribute: false })];
            _elementType_decorators = [property({ attribute: false })];
            _textColorButton_decorators = [query('edgeless-color-picker-button.text-color')];
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _elements_decorators, { kind: "accessor", name: "elements", static: false, private: false, access: { has: obj => "elements" in obj, get: obj => obj.elements, set: (obj, value) => { obj.elements = value; } }, metadata: _metadata }, _elements_initializers, _elements_extraInitializers);
            __esDecorate(this, null, _elementType_decorators, { kind: "accessor", name: "elementType", static: false, private: false, access: { has: obj => "elementType" in obj, get: obj => obj.elementType, set: (obj, value) => { obj.elementType = value; } }, metadata: _metadata }, _elementType_initializers, _elementType_extraInitializers);
            __esDecorate(this, null, _textColorButton_decorators, { kind: "accessor", name: "textColorButton", static: false, private: false, access: { has: obj => "textColorButton" in obj, get: obj => obj.textColorButton, set: (obj, value) => { obj.textColorButton = value; } }, metadata: _metadata }, _textColorButton_initializers, _textColorButton_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: inherit;
      align-items: inherit;
      justify-content: inherit;
      gap: inherit;
      height: 100%;
    }
  `; }
        get service() {
            return this.edgeless.service;
        }
        render() {
            const colorScheme = this.edgeless.surface.renderer.getColorScheme();
            const elements = this.elements;
            const selectedAlign = getMostCommonAlign(elements);
            const selectedColor = getMostCommonColor(elements, colorScheme);
            const selectedFontFamily = getMostCommonFontFamily(elements);
            const selectedFontSize = Math.trunc(getMostCommonFontSize(elements));
            const selectedFontStyle = getMostCommonFontStyle(elements);
            const selectedFontWeight = getMostCommonFontWeight(elements);
            const matchFontFaces = TextUtils.getFontFacesByFontFamily(selectedFontFamily);
            const fontStyleBtnDisabled = matchFontFaces.length === 1 &&
                matchFontFaces[0].style === selectedFontStyle &&
                matchFontFaces[0].weight === selectedFontWeight;
            return join([
                html `
          <editor-menu-button
            .contentPadding=${'8px'}
            .button=${html `
              <editor-icon-button
                aria-label="Font"
                .tooltip=${'Font'}
                .justify=${'space-between'}
                .labelHeight=${'20px'}
                .iconContainerWidth=${'40px'}
              >
                <span
                  class="label padding0"
                  style=${`font-family: ${TextUtils.wrapFontFamily(selectedFontFamily)}`}
                  >Aa</span
                >${SmallArrowDownIcon}
              </editor-icon-button>
            `}
          >
            <edgeless-font-family-panel
              .value=${selectedFontFamily}
              .onSelect=${this._setFontFamily}
            ></edgeless-font-family-panel>
          </editor-menu-button>
        `,
                when(this.edgeless.doc.awarenessStore.getFlag('enable_color_picker'), () => {
                    const { type, colors } = packColorsWithColorScheme(colorScheme, selectedColor, elements[0] instanceof ConnectorElementModel
                        ? elements[0].labelStyle.color
                        : elements[0].color);
                    return html `
              <edgeless-color-picker-button
                class="text-color"
                .label=${'Text color'}
                .pick=${this.pickColor}
                .isText=${true}
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
                <editor-icon-button
                  aria-label="Text color"
                  .tooltip=${'Text color'}
                >
                  <edgeless-text-color-icon
                    .color=${selectedColor}
                  ></edgeless-text-color-icon>
                </editor-icon-button>
              `}
            >
              <edgeless-color-panel
                .value=${selectedColor}
                @select=${this._setTextColor}
              ></edgeless-color-panel>
            </editor-menu-button>
          `),
                html `
          <editor-menu-button
            .contentPadding=${'8px'}
            .button=${html `
              <editor-icon-button
                aria-label="Font style"
                .tooltip=${'Font style'}
                .justify=${'space-between'}
                .labelHeight=${'20px'}
                .iconContainerWidth=${'90px'}
                .disabled=${fontStyleBtnDisabled}
              >
                <span class="label ellipsis">
                  ${choose(selectedFontWeight, FONT_WEIGHT_CHOOSE)}
                  ${choose(selectedFontStyle, FONT_STYLE_CHOOSE)}
                </span>
                ${SmallArrowDownIcon}
              </editor-icon-button>
            `}
          >
            <edgeless-font-weight-and-style-panel
              .fontFamily=${selectedFontFamily}
              .fontWeight=${selectedFontWeight}
              .fontStyle=${selectedFontStyle}
              .onSelect=${this._setFontWeightAndStyle}
            ></edgeless-font-weight-and-style-panel>
          </editor-menu-button>
        `,
                this.elementType === 'edgeless-text'
                    ? nothing
                    : html `
              <editor-menu-button
                .contentPadding=${'8px'}
                .button=${html `
                  <editor-icon-button
                    aria-label="Font size"
                    .tooltip=${'Font size'}
                    .justify=${'space-between'}
                    .labelHeight=${'20px'}
                    .iconContainerWidth=${'60px'}
                  >
                    <span class="label">${selectedFontSize}</span>
                    ${SmallArrowDownIcon}
                  </editor-icon-button>
                `}
              >
                <edgeless-size-panel
                  data-type="check"
                  .size=${selectedFontSize}
                  .sizeList=${FONT_SIZE_LIST}
                  .onSelect=${this._setFontSize}
                ></edgeless-size-panel>
              </editor-menu-button>
            `,
                html `
          <editor-menu-button
            .button=${html `
              <editor-icon-button
                aria-label="Alignment"
                .tooltip=${'Alignment'}
              >
                ${choose(selectedAlign, TEXT_ALIGN_CHOOSE)}${SmallArrowDownIcon}
              </editor-icon-button>
            `}
          >
            <edgeless-align-panel
              .value=${selectedAlign}
              .onSelect=${this._setTextAlign}
            ></edgeless-align-panel>
          </editor-menu-button>
        `,
            ].filter(b => b !== nothing), renderToolbarSeparator);
        }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #elements_accessor_storage;
        get elements() { return this.#elements_accessor_storage; }
        set elements(value) { this.#elements_accessor_storage = value; }
        #elementType_accessor_storage;
        get elementType() { return this.#elementType_accessor_storage; }
        set elementType(value) { this.#elementType_accessor_storage = value; }
        #textColorButton_accessor_storage;
        get textColorButton() { return this.#textColorButton_accessor_storage; }
        set textColorButton(value) { this.#textColorButton_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._setFontFamily = (fontFamily) => {
                const currentFontWeight = getMostCommonFontWeight(this.elements);
                const fontWeight = TextUtils.isFontWeightSupported(fontFamily, currentFontWeight)
                    ? currentFontWeight
                    : FontWeight.Regular;
                const currentFontStyle = getMostCommonFontStyle(this.elements);
                const fontStyle = TextUtils.isFontStyleSupported(fontFamily, currentFontStyle)
                    ? currentFontStyle
                    : FontStyle.Normal;
                const props = { fontFamily, fontWeight, fontStyle };
                this.elements.forEach(element => {
                    this.service.updateElement(element.id, buildProps(element, props));
                    this._updateElementBound(element);
                });
            };
            this._setFontSize = (fontSize) => {
                const props = { fontSize };
                this.elements.forEach(element => {
                    this.service.updateElement(element.id, buildProps(element, props));
                    this._updateElementBound(element);
                });
            };
            this._setFontWeightAndStyle = (fontWeight, fontStyle) => {
                const props = { fontWeight, fontStyle };
                this.elements.forEach(element => {
                    this.service.updateElement(element.id, buildProps(element, props));
                    this._updateElementBound(element);
                });
            };
            this._setTextAlign = (textAlign) => {
                const props = { textAlign };
                this.elements.forEach(element => {
                    this.service.updateElement(element.id, buildProps(element, props));
                });
            };
            this._setTextColor = ({ detail: color }) => {
                const props = { color };
                this.elements.forEach(element => {
                    this.service.updateElement(element.id, buildProps(element, props));
                });
            };
            this._updateElementBound = (element) => {
                const elementType = this.elementType;
                if (elementType === 'text' && element instanceof TextElementModel) {
                    // the change of font family will change the bound of the text
                    const { text: yText, fontFamily, fontStyle, fontSize, fontWeight, hasMaxWidth, } = element;
                    const newBound = TextUtils.normalizeTextBound({
                        yText,
                        fontFamily,
                        fontStyle,
                        fontSize,
                        fontWeight,
                        hasMaxWidth,
                    }, Bound.fromXYWH(element.deserializedXYWH));
                    this.service.updateElement(element.id, {
                        xywh: newBound.serialize(),
                    });
                }
                else if (elementType === 'connector' &&
                    ConnectorUtils.isConnectorWithLabel(element)) {
                    const { text, labelXYWH, labelStyle: { fontFamily, fontStyle, fontSize, fontWeight }, labelConstraints: { hasMaxWidth, maxWidth }, } = element;
                    const prevBounds = Bound.fromXYWH(labelXYWH || [0, 0, 16, 16]);
                    const center = prevBounds.center;
                    const bounds = TextUtils.normalizeTextBound({
                        yText: text,
                        fontFamily,
                        fontStyle,
                        fontSize,
                        fontWeight,
                        hasMaxWidth,
                        maxWidth,
                    }, prevBounds);
                    bounds.center = center;
                    this.service.updateElement(element.id, {
                        labelXYWH: bounds.toXYWH(),
                    });
                }
                else if (elementType === 'shape' &&
                    element instanceof ShapeElementModel) {
                    const newBound = normalizeShapeBound(element, Bound.fromXYWH(element.deserializedXYWH));
                    this.service.updateElement(element.id, {
                        xywh: newBound.serialize(),
                    });
                }
                // no need to update the bound of edgeless text block, which updates itself using ResizeObserver
            };
            this.pickColor = (event) => {
                if (event.type === 'pick') {
                    this.elements.forEach(element => {
                        const props = packColor('color', { ...event.detail });
                        this.service.updateElement(element.id, buildProps(element, props));
                        this._updateElementBound(element);
                    });
                    return;
                }
                const key = this.elementType === 'connector' ? 'labelStyle' : 'color';
                this.elements.forEach(ele => {
                    // @ts-expect-error: FIXME
                    ele[event.type === 'start' ? 'stash' : 'pop'](key);
                });
            };
            this.#edgeless_accessor_storage = __runInitializers(this, _edgeless_initializers, void 0);
            this.#elements_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _elements_initializers, void 0));
            this.#elementType_accessor_storage = (__runInitializers(this, _elements_extraInitializers), __runInitializers(this, _elementType_initializers, void 0));
            this.#textColorButton_accessor_storage = (__runInitializers(this, _elementType_extraInitializers), __runInitializers(this, _textColorButton_initializers, void 0));
            __runInitializers(this, _textColorButton_extraInitializers);
        }
    };
})();
export { EdgelessChangeTextMenu };
//# sourceMappingURL=change-text-menu.js.map