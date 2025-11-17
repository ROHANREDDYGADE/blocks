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
import { AddTextIcon, ChangeShapeIcon, GeneralStyleIcon, ScribbledStyleIcon, SmallArrowDownIcon, } from '@blocksuite/affine-components/icons';
import { renderToolbarSeparator } from '@blocksuite/affine-components/toolbar';
import { DEFAULT_SHAPE_FILL_COLOR, DEFAULT_SHAPE_STROKE_COLOR, FontFamily, getShapeName, getShapeRadius, getShapeType, LineWidth, MindmapElementModel, SHAPE_FILL_COLORS, SHAPE_STROKE_COLORS, ShapeStyle, StrokeStyle, } from '@blocksuite/affine-model';
import { countBy, maxBy, WithDisposable } from '@blocksuite/global/utils';
import { css, html, LitElement, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { cache } from 'lit/directives/cache.js';
import { choose } from 'lit/directives/choose.js';
import { join } from 'lit/directives/join.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import { packColor, packColorsWithColorScheme, } from '../../edgeless/components/color-picker/utils.js';
import { GET_DEFAULT_LINE_COLOR, isTransparent, } from '../../edgeless/components/panel/color-panel.js';
import { LineStylesPanel, } from '../../edgeless/components/panel/line-styles-panel.js';
import { SHAPE_FILL_COLOR_BLACK, SHAPE_TEXT_COLOR_PURE_BLACK, SHAPE_TEXT_COLOR_PURE_WHITE, } from '../../edgeless/utils/consts.js';
import { mountShapeTextEditor } from '../../edgeless/utils/text.js';
const changeShapeButtonStyles = [
    css `
    .edgeless-component-line-size-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 16px;
    }

    .edgeless-component-line-size-button div {
      border-radius: 50%;
      background-color: var(--affine-icon-color);
    }

    .edgeless-component-line-size-button.size-s div {
      width: 4px;
      height: 4px;
    }
    .edgeless-component-line-size-button.size-l div {
      width: 10px;
      height: 10px;
    }
  `,
];
function getMostCommonFillColor(elements, colorScheme) {
    const colors = countBy(elements, (ele) => {
        if (ele.filled) {
            return typeof ele.fillColor === 'object'
                ? (ele.fillColor[colorScheme] ?? ele.fillColor.normal ?? null)
                : ele.fillColor;
        }
        return '--affine-palette-transparent';
    });
    const max = maxBy(Object.entries(colors), ([_k, count]) => count);
    return max ? max[0] : null;
}
function getMostCommonStrokeColor(elements, colorScheme) {
    const colors = countBy(elements, (ele) => {
        return typeof ele.strokeColor === 'object'
            ? (ele.strokeColor[colorScheme] ?? ele.strokeColor.normal ?? null)
            : ele.strokeColor;
    });
    const max = maxBy(Object.entries(colors), ([_k, count]) => count);
    return max ? max[0] : null;
}
function getMostCommonShape(elements) {
    const shapeTypes = countBy(elements, (ele) => {
        return getShapeName(ele.shapeType, ele.radius);
    });
    const max = maxBy(Object.entries(shapeTypes), ([_k, count]) => count);
    return max ? max[0] : null;
}
function getMostCommonLineSize(elements) {
    const sizes = countBy(elements, (ele) => {
        return ele.strokeWidth;
    });
    const max = maxBy(Object.entries(sizes), ([_k, count]) => count);
    return max ? Number(max[0]) : LineWidth.Four;
}
function getMostCommonLineStyle(elements) {
    const sizes = countBy(elements, (ele) => ele.strokeStyle);
    const max = maxBy(Object.entries(sizes), ([_k, count]) => count);
    return max ? max[0] : null;
}
function getMostCommonShapeStyle(elements) {
    const roughnesses = countBy(elements, (ele) => {
        return ele.shapeStyle;
    });
    const max = maxBy(Object.entries(roughnesses), ([_k, count]) => count);
    return max ? max[0] : ShapeStyle.Scribbled;
}
let EdgelessChangeShapeButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __shapePanel_decorators;
    let __shapePanel_initializers = [];
    let __shapePanel_extraInitializers = [];
    let _borderStyleButton_decorators;
    let _borderStyleButton_initializers = [];
    let _borderStyleButton_extraInitializers = [];
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _elements_decorators;
    let _elements_initializers = [];
    let _elements_extraInitializers = [];
    let _fillColorButton_decorators;
    let _fillColorButton_initializers = [];
    let _fillColorButton_extraInitializers = [];
    return class EdgelessChangeShapeButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __shapePanel_decorators = [query('edgeless-shape-panel')];
            _borderStyleButton_decorators = [query('edgeless-color-picker-button.border-style')];
            _edgeless_decorators = [property({ attribute: false })];
            _elements_decorators = [property({ attribute: false })];
            _fillColorButton_decorators = [query('edgeless-color-picker-button.fill-color')];
            __esDecorate(this, null, __shapePanel_decorators, { kind: "accessor", name: "_shapePanel", static: false, private: false, access: { has: obj => "_shapePanel" in obj, get: obj => obj._shapePanel, set: (obj, value) => { obj._shapePanel = value; } }, metadata: _metadata }, __shapePanel_initializers, __shapePanel_extraInitializers);
            __esDecorate(this, null, _borderStyleButton_decorators, { kind: "accessor", name: "borderStyleButton", static: false, private: false, access: { has: obj => "borderStyleButton" in obj, get: obj => obj.borderStyleButton, set: (obj, value) => { obj.borderStyleButton = value; } }, metadata: _metadata }, _borderStyleButton_initializers, _borderStyleButton_extraInitializers);
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _elements_decorators, { kind: "accessor", name: "elements", static: false, private: false, access: { has: obj => "elements" in obj, get: obj => obj.elements, set: (obj, value) => { obj.elements = value; } }, metadata: _metadata }, _elements_initializers, _elements_extraInitializers);
            __esDecorate(this, null, _fillColorButton_decorators, { kind: "accessor", name: "fillColorButton", static: false, private: false, access: { has: obj => "fillColorButton" in obj, get: obj => obj.fillColorButton, set: (obj, value) => { obj.fillColorButton = value; } }, metadata: _metadata }, _fillColorButton_initializers, _fillColorButton_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = [changeShapeButtonStyles]; }
        get service() {
            return this.edgeless.service;
        }
        #pickColor(key) {
            return (event) => {
                if (event.type === 'pick') {
                    this.elements.forEach(ele => {
                        const props = packColor(key, { ...event.detail });
                        // If `filled` can be set separately, this logic can be removed
                        if (key === 'fillColor' && !ele.filled) {
                            Object.assign(props, { filled: true });
                        }
                        this.service.updateElement(ele.id, props);
                    });
                    return;
                }
                this.elements.forEach(ele => ele[event.type === 'start' ? 'stash' : 'pop'](key));
            };
        }
        _addText() {
            mountShapeTextEditor(this.elements[0], this.edgeless);
        }
        _getTextColor(fillColor) {
            const colorScheme = this.edgeless.surface.renderer.getColorScheme();
            // When the shape is filled with black color, the text color should be white.
            // When the shape is transparent, the text color should be set according to the theme.
            // Otherwise, the text color should be black.
            const textColor = isTransparent(fillColor)
                ? GET_DEFAULT_LINE_COLOR(colorScheme)
                : fillColor === SHAPE_FILL_COLOR_BLACK
                    ? SHAPE_TEXT_COLOR_PURE_WHITE
                    : SHAPE_TEXT_COLOR_PURE_BLACK;
            return textColor;
        }
        _setShapeFillColor(fillColor) {
            const filled = !isTransparent(fillColor);
            const color = this._getTextColor(fillColor);
            this.elements.forEach(ele => this.service.updateElement(ele.id, { filled, fillColor, color }));
        }
        _setShapeStrokeColor(strokeColor) {
            this.elements.forEach(ele => this.service.updateElement(ele.id, { strokeColor }));
        }
        _setShapeStrokeStyle(strokeStyle) {
            this.elements.forEach(ele => this.service.updateElement(ele.id, { strokeStyle }));
        }
        _setShapeStrokeWidth(strokeWidth) {
            this.elements.forEach(ele => this.service.updateElement(ele.id, { strokeWidth }));
        }
        _setShapeStyle(shapeStyle) {
            const fontFamily = shapeStyle === ShapeStyle.General ? FontFamily.Inter : FontFamily.Kalam;
            this.elements.forEach(ele => {
                this.service.updateElement(ele.id, { shapeStyle, fontFamily });
            });
        }
        _setShapeStyles({ type, value }) {
            if (type === 'size') {
                this._setShapeStrokeWidth(value);
                return;
            }
            if (type === 'lineStyle') {
                this._setShapeStrokeStyle(value);
            }
        }
        _showAddButtonOrTextMenu() {
            if (this.elements.length === 1 && !this.elements[0].text) {
                return 'button';
            }
            if (!this.elements.some(e => !e.text)) {
                return 'menu';
            }
            return 'nothing';
        }
        firstUpdated() {
            const _disposables = this._disposables;
            _disposables.add(this._shapePanel.slots.select.on(shapeName => {
                this.edgeless.doc.captureSync();
                this.elements.forEach(element => {
                    this.service.updateElement(element.id, {
                        shapeType: getShapeType(shapeName),
                        radius: getShapeRadius(shapeName),
                    });
                });
            }));
        }
        render() {
            const colorScheme = this.edgeless.surface.renderer.getColorScheme();
            const elements = this.elements;
            const selectedShape = getMostCommonShape(elements);
            const selectedFillColor = getMostCommonFillColor(elements, colorScheme) ?? DEFAULT_SHAPE_FILL_COLOR;
            const selectedStrokeColor = getMostCommonStrokeColor(elements, colorScheme) ??
                DEFAULT_SHAPE_STROKE_COLOR;
            const selectedLineSize = getMostCommonLineSize(elements) ?? LineWidth.Four;
            const selectedLineStyle = getMostCommonLineStyle(elements) ?? StrokeStyle.Solid;
            const selectedShapeStyle = getMostCommonShapeStyle(elements) ?? ShapeStyle.Scribbled;
            return join([
                html `
          <editor-menu-button
            .button=${html `
              <editor-icon-button
                aria-label="Switch type"
                .tooltip=${'Switch type'}
              >
                ${ChangeShapeIcon}${SmallArrowDownIcon}
              </editor-icon-button>
            `}
          >
            <edgeless-shape-panel
              .selectedShape=${selectedShape}
              .shapeStyle=${selectedShapeStyle}
            >
            </edgeless-shape-panel>
          </editor-menu-button>
        `,
                html `
          <editor-menu-button
            .button=${html `
              <editor-icon-button aria-label="Style" .tooltip=${'Style'}>
                ${cache(selectedShapeStyle === ShapeStyle.General
                    ? GeneralStyleIcon
                    : ScribbledStyleIcon)}
                ${SmallArrowDownIcon}
              </editor-icon-button>
            `}
          >
            <edgeless-shape-style-panel
              .value=${selectedShapeStyle}
              .onSelect=${(value) => this._setShapeStyle(value)}
            >
            </edgeless-shape-style-panel>
          </editor-menu-button>
        `,
                when(this.edgeless.doc.awarenessStore.getFlag('enable_color_picker'), () => {
                    const { type, colors } = packColorsWithColorScheme(colorScheme, selectedFillColor, elements[0].fillColor);
                    return html `
              <edgeless-color-picker-button
                class="fill-color"
                .label=${'Fill color'}
                .pick=${this.#pickColor('fillColor')}
                .color=${selectedFillColor}
                .colors=${colors}
                .colorType=${type}
                .palettes=${SHAPE_FILL_COLORS}
              >
              </edgeless-color-picker-button>
            `;
                }, () => html `
            <editor-menu-button
              .contentPadding=${'8px'}
              .button=${html `
                <editor-icon-button
                  aria-label="Fill color"
                  .tooltip=${'Fill color'}
                >
                  <edgeless-color-button
                    .color=${selectedFillColor}
                  ></edgeless-color-button>
                </editor-icon-button>
              `}
            >
              <edgeless-color-panel
                role="listbox"
                aria-label="Fill colors"
                .value=${selectedFillColor}
                .options=${SHAPE_FILL_COLORS}
                @select=${(e) => this._setShapeFillColor(e.detail)}
              >
              </edgeless-color-panel>
            </editor-menu-button>
          `),
                when(this.edgeless.doc.awarenessStore.getFlag('enable_color_picker'), () => {
                    const { type, colors } = packColorsWithColorScheme(colorScheme, selectedStrokeColor, elements[0].strokeColor);
                    return html `
              <edgeless-color-picker-button
                class="border-style"
                .label=${'Border style'}
                .pick=${this.#pickColor('strokeColor')}
                .color=${selectedStrokeColor}
                .colors=${colors}
                .colorType=${type}
                .palettes=${SHAPE_STROKE_COLORS}
                .hollowCircle=${true}
              >
                <div
                  slot="other"
                  class="line-styles"
                  style=${styleMap({
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px',
                        alignItems: 'center',
                    })}
                >
                  ${LineStylesPanel({
                        selectedLineSize: selectedLineSize,
                        selectedLineStyle: selectedLineStyle,
                        onClick: (e) => this._setShapeStyles(e),
                        lineStyles: [StrokeStyle.Solid, StrokeStyle.Dash],
                    })}
                </div>
                <editor-toolbar-separator
                  slot="separator"
                  data-orientation="horizontal"
                ></editor-toolbar-separator>
              </edgeless-color-picker-button>
            `;
                }, () => html `
            <editor-menu-button
              .contentPadding=${'8px'}
              .button=${html `
                <editor-icon-button
                  aria-label="Border style"
                  .tooltip=${'Border style'}
                >
                  <edgeless-color-button
                    .color=${selectedStrokeColor}
                    .hollowCircle=${true}
                  ></edgeless-color-button>
                </editor-icon-button>
              `}
            >
              <stroke-style-panel
                .hollowCircle=${true}
                .strokeWidth=${selectedLineSize}
                .strokeStyle=${selectedLineStyle}
                .strokeColor=${selectedStrokeColor}
                .setStrokeStyle=${(e) => this._setShapeStyles(e)}
                .setStrokeColor=${(e) => this._setShapeStrokeColor(e.detail)}
              >
              </stroke-style-panel>
            </editor-menu-button>
          `),
                choose(this._showAddButtonOrTextMenu(), [
                    [
                        'button',
                        () => html `
                <editor-icon-button
                  aria-label="Add text"
                  .tooltip=${'Add text'}
                  @click=${this._addText}
                >
                  ${AddTextIcon}
                </editor-icon-button>
              `,
                    ],
                    [
                        'menu',
                        () => html `
                <edgeless-change-text-menu
                  .elementType=${'shape'}
                  .elements=${elements}
                  .edgeless=${this.edgeless}
                ></edgeless-change-text-menu>
              `,
                    ],
                    ['nothing', () => nothing],
                ]),
            ].filter(button => button !== nothing), renderToolbarSeparator);
        }
        #_shapePanel_accessor_storage = __runInitializers(this, __shapePanel_initializers, void 0);
        get _shapePanel() { return this.#_shapePanel_accessor_storage; }
        set _shapePanel(value) { this.#_shapePanel_accessor_storage = value; }
        #borderStyleButton_accessor_storage = (__runInitializers(this, __shapePanel_extraInitializers), __runInitializers(this, _borderStyleButton_initializers, void 0));
        get borderStyleButton() { return this.#borderStyleButton_accessor_storage; }
        set borderStyleButton(value) { this.#borderStyleButton_accessor_storage = value; }
        #edgeless_accessor_storage = (__runInitializers(this, _borderStyleButton_extraInitializers), __runInitializers(this, _edgeless_initializers, void 0));
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #elements_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _elements_initializers, []));
        get elements() { return this.#elements_accessor_storage; }
        set elements(value) { this.#elements_accessor_storage = value; }
        #fillColorButton_accessor_storage = (__runInitializers(this, _elements_extraInitializers), __runInitializers(this, _fillColorButton_initializers, void 0));
        get fillColorButton() { return this.#fillColorButton_accessor_storage; }
        set fillColorButton(value) { this.#fillColorButton_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _fillColorButton_extraInitializers);
        }
    };
})();
export { EdgelessChangeShapeButton };
export function renderChangeShapeButton(edgeless, elements) {
    if (!elements?.length)
        return nothing;
    if (elements.some(e => e.group instanceof MindmapElementModel))
        return nothing;
    return html `
    <edgeless-change-shape-button .elements=${elements} .edgeless=${edgeless}>
    </edgeless-change-shape-button>
  `;
}
//# sourceMappingURL=change-shape-button.js.map