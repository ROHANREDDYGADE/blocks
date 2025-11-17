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
import { AddTextIcon, ConnectorCWithArrowIcon, ConnectorEndpointNoneIcon, ConnectorLWithArrowIcon, ConnectorXWithArrowIcon, FlipDirectionIcon, FrontEndpointArrowIcon, FrontEndpointCircleIcon, FrontEndpointDiamondIcon, FrontEndpointTriangleIcon, GeneralStyleIcon, RearEndpointArrowIcon, RearEndpointCircleIcon, RearEndpointDiamondIcon, RearEndpointTriangleIcon, ScribbledStyleIcon, SmallArrowDownIcon, } from '@blocksuite/affine-components/icons';
import { renderToolbarSeparator } from '@blocksuite/affine-components/toolbar';
import { ConnectorEndpoint, ConnectorMode, DEFAULT_FRONT_END_POINT_STYLE, DEFAULT_REAR_END_POINT_STYLE, PointStyle, } from '@blocksuite/affine-model';
import { LINE_COLORS, LineWidth, StrokeStyle } from '@blocksuite/affine-model';
import { countBy, maxBy, WithDisposable } from '@blocksuite/global/utils';
import { html, LitElement, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { join } from 'lit/directives/join.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import { packColor, packColorsWithColorScheme, } from '../../edgeless/components/color-picker/utils.js';
import { GET_DEFAULT_LINE_COLOR, } from '../../edgeless/components/panel/color-panel.js';
import { LineStylesPanel, } from '../../edgeless/components/panel/line-styles-panel.js';
import { mountConnectorLabelEditor } from '../../edgeless/utils/text.js';
function getMostCommonColor(elements, colorScheme) {
    const colors = countBy(elements, (ele) => {
        return typeof ele.stroke === 'object'
            ? (ele.stroke[colorScheme] ?? ele.stroke.normal ?? null)
            : ele.stroke;
    });
    const max = maxBy(Object.entries(colors), ([_k, count]) => count);
    return max ? max[0] : null;
}
function getMostCommonMode(elements) {
    const modes = countBy(elements, ele => ele.mode);
    const max = maxBy(Object.entries(modes), ([_k, count]) => count);
    return max ? Number(max[0]) : null;
}
function getMostCommonLineWidth(elements) {
    const sizes = countBy(elements, ele => ele.strokeWidth);
    const max = maxBy(Object.entries(sizes), ([_k, count]) => count);
    return max ? Number(max[0]) : LineWidth.Four;
}
export function getMostCommonLineStyle(elements) {
    const sizes = countBy(elements, ele => ele.strokeStyle);
    const max = maxBy(Object.entries(sizes), ([_k, count]) => count);
    return max ? max[0] : null;
}
function getMostCommonRough(elements) {
    const { trueCount, falseCount } = elements.reduce((counts, ele) => {
        if (ele.rough) {
            counts.trueCount++;
        }
        else {
            counts.falseCount++;
        }
        return counts;
    }, { trueCount: 0, falseCount: 0 });
    return trueCount > falseCount;
}
function getMostCommonEndpointStyle(elements, endpoint) {
    const field = endpoint === ConnectorEndpoint.Front
        ? 'frontEndpointStyle'
        : 'rearEndpointStyle';
    const modes = countBy(elements, ele => ele[field]);
    const max = maxBy(Object.entries(modes), ([_k, count]) => count);
    return max ? max[0] : null;
}
function notEqual(key, value) {
    return (element) => element[key] !== value;
}
const STYLE_LIST = [
    {
        name: 'General',
        value: false,
        icon: GeneralStyleIcon,
    },
    {
        name: 'Scribbled',
        value: true,
        icon: ScribbledStyleIcon,
    },
];
const STYLE_CHOOSE = [
    [false, () => GeneralStyleIcon],
    [true, () => ScribbledStyleIcon],
];
const FRONT_ENDPOINT_STYLE_LIST = [
    {
        value: PointStyle.None,
        icon: ConnectorEndpointNoneIcon,
    },
    {
        value: PointStyle.Arrow,
        icon: FrontEndpointArrowIcon,
    },
    {
        value: PointStyle.Triangle,
        icon: FrontEndpointTriangleIcon,
    },
    {
        value: PointStyle.Circle,
        icon: FrontEndpointCircleIcon,
    },
    {
        value: PointStyle.Diamond,
        icon: FrontEndpointDiamondIcon,
    },
];
const REAR_ENDPOINT_STYLE_LIST = [
    {
        value: PointStyle.Diamond,
        icon: RearEndpointDiamondIcon,
    },
    {
        value: PointStyle.Circle,
        icon: RearEndpointCircleIcon,
    },
    {
        value: PointStyle.Triangle,
        icon: RearEndpointTriangleIcon,
    },
    {
        value: PointStyle.Arrow,
        icon: RearEndpointArrowIcon,
    },
    {
        value: PointStyle.None,
        icon: ConnectorEndpointNoneIcon,
    },
];
const MODE_LIST = [
    {
        name: 'Curve',
        icon: ConnectorCWithArrowIcon,
        value: ConnectorMode.Curve,
    },
    {
        name: 'Elbowed',
        icon: ConnectorXWithArrowIcon,
        value: ConnectorMode.Orthogonal,
    },
    {
        name: 'Straight',
        icon: ConnectorLWithArrowIcon,
        value: ConnectorMode.Straight,
    },
];
const MODE_CHOOSE = [
    [ConnectorMode.Curve, () => ConnectorCWithArrowIcon],
    [ConnectorMode.Orthogonal, () => ConnectorXWithArrowIcon],
    [ConnectorMode.Straight, () => ConnectorLWithArrowIcon],
];
let EdgelessChangeConnectorButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _elements_decorators;
    let _elements_initializers = [];
    let _elements_extraInitializers = [];
    let _strokeColorButton_decorators;
    let _strokeColorButton_initializers = [];
    let _strokeColorButton_extraInitializers = [];
    return class EdgelessChangeConnectorButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _edgeless_decorators = [property({ attribute: false })];
            _elements_decorators = [property({ attribute: false })];
            _strokeColorButton_decorators = [query('edgeless-color-picker-button.stroke-color')];
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _elements_decorators, { kind: "accessor", name: "elements", static: false, private: false, access: { has: obj => "elements" in obj, get: obj => obj.elements, set: (obj, value) => { obj.elements = value; } }, metadata: _metadata }, _elements_initializers, _elements_extraInitializers);
            __esDecorate(this, null, _strokeColorButton_decorators, { kind: "accessor", name: "strokeColorButton", static: false, private: false, access: { has: obj => "strokeColorButton" in obj, get: obj => obj.strokeColorButton, set: (obj, value) => { obj.strokeColorButton = value; } }, metadata: _metadata }, _strokeColorButton_initializers, _strokeColorButton_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get doc() {
            return this.edgeless.doc;
        }
        get service() {
            return this.edgeless.service;
        }
        _addLabel() {
            mountConnectorLabelEditor(this.elements[0], this.edgeless);
        }
        _flipEndpointStyle(frontEndpointStyle, rearEndpointStyle) {
            if (frontEndpointStyle === rearEndpointStyle)
                return;
            this.elements.forEach(element => this.service.updateElement(element.id, {
                frontEndpointStyle: rearEndpointStyle,
                rearEndpointStyle: frontEndpointStyle,
            }));
        }
        _getEndpointIcon(list, style) {
            return (list.find(({ value }) => value === style)?.icon ||
                ConnectorEndpointNoneIcon);
        }
        _setConnectorColor(stroke) {
            this._setConnectorProp('stroke', stroke);
        }
        _setConnectorMode(mode) {
            this._setConnectorProp('mode', mode);
        }
        _setConnectorPointStyle(end, style) {
            const props = {
                [end === ConnectorEndpoint.Front
                    ? 'frontEndpointStyle'
                    : 'rearEndpointStyle']: style,
            };
            this.elements.forEach(element => this.service.updateElement(element.id, { ...props }));
        }
        _setConnectorProp(key, value) {
            this.doc.captureSync();
            this.elements
                .filter(notEqual(key, value))
                .forEach(element => this.service.updateElement(element.id, { [key]: value }));
        }
        _setConnectorRough(rough) {
            this._setConnectorProp('rough', rough);
        }
        _setConnectorStroke({ type, value }) {
            if (type === 'size') {
                this._setConnectorStrokeWidth(value);
                return;
            }
            this._setConnectorStrokeStyle(value);
        }
        _setConnectorStrokeStyle(strokeStyle) {
            this._setConnectorProp('strokeStyle', strokeStyle);
        }
        _setConnectorStrokeWidth(strokeWidth) {
            this._setConnectorProp('strokeWidth', strokeWidth);
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
        render() {
            const colorScheme = this.edgeless.surface.renderer.getColorScheme();
            const elements = this.elements;
            const selectedColor = getMostCommonColor(elements, colorScheme) ??
                GET_DEFAULT_LINE_COLOR(colorScheme);
            const selectedMode = getMostCommonMode(elements);
            const selectedLineSize = getMostCommonLineWidth(elements) ?? LineWidth.Four;
            const selectedRough = getMostCommonRough(elements);
            const selectedLineStyle = getMostCommonLineStyle(elements) ?? StrokeStyle.Solid;
            const selectedStartPointStyle = getMostCommonEndpointStyle(elements, ConnectorEndpoint.Front) ??
                DEFAULT_FRONT_END_POINT_STYLE;
            const selectedEndPointStyle = getMostCommonEndpointStyle(elements, ConnectorEndpoint.Rear) ??
                DEFAULT_REAR_END_POINT_STYLE;
            return join([
                when(this.edgeless.doc.awarenessStore.getFlag('enable_color_picker'), () => {
                    const { type, colors } = packColorsWithColorScheme(colorScheme, selectedColor, elements[0].stroke);
                    return html `
              <edgeless-color-picker-button
                class="stroke-color"
                .label=${'Stroke style'}
                .pick=${this.pickColor}
                .color=${selectedColor}
                .colors=${colors}
                .colorType=${type}
                .palettes=${LINE_COLORS}
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
                        onClick: (e) => this._setConnectorStroke(e),
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
                  aria-label="Stroke style"
                  .tooltip=${'Stroke style'}
                >
                  <edgeless-color-button
                    .color=${selectedColor}
                  ></edgeless-color-button>
                </editor-icon-button>
              `}
            >
              <stroke-style-panel
                .strokeWidth=${selectedLineSize}
                .strokeStyle=${selectedLineStyle}
                .strokeColor=${selectedColor}
                .setStrokeStyle=${(e) => this._setConnectorStroke(e)}
                .setStrokeColor=${(e) => this._setConnectorColor(e.detail)}
              >
              </stroke-style-panel>
            </editor-menu-button>
          `),
                html `
          <editor-menu-button
            .button=${html `
              <editor-icon-button aria-label="Style" .tooltip=${'Style'}>
                ${choose(selectedRough, STYLE_CHOOSE)}${SmallArrowDownIcon}
              </editor-icon-button>
            `}
          >
            <div>
              ${repeat(STYLE_LIST, item => item.name, ({ name, value, icon }) => html `
                  <editor-icon-button
                    aria-label=${name}
                    .tooltip=${name}
                    .active=${selectedRough === value}
                    .activeMode=${'background'}
                    @click=${() => this._setConnectorRough(value)}
                  >
                    ${icon}
                  </editor-icon-button>
                `)}
            </div>
          </editor-menu-button>
        `,
                html `
          <editor-menu-button
            .button=${html `
              <editor-icon-button
                aria-label="Start point style"
                .tooltip=${'Start point style'}
              >
                ${this._getEndpointIcon(FRONT_ENDPOINT_STYLE_LIST, selectedStartPointStyle)}${SmallArrowDownIcon}
              </editor-icon-button>
            `}
          >
            <div>
              ${repeat(FRONT_ENDPOINT_STYLE_LIST, item => item.value, ({ value, icon }) => html `
                  <editor-icon-button
                    aria-label=${value}
                    .tooltip=${value}
                    .active=${selectedStartPointStyle === value}
                    .activeMode=${'background'}
                    @click=${() => this._setConnectorPointStyle(ConnectorEndpoint.Front, value)}
                  >
                    ${icon}
                  </editor-icon-button>
                `)}
            </div>
          </editor-menu-button>

          <editor-icon-button
            aria-label="Flip direction"
            .tooltip=${'Flip direction'}
            .disabled=${false}
            @click=${() => this._flipEndpointStyle(selectedStartPointStyle, selectedEndPointStyle)}
          >
            ${FlipDirectionIcon}
          </editor-icon-button>

          <editor-menu-button
            .button=${html `
              <editor-icon-button
                aria-label="End point style"
                .tooltip=${'End point style'}
              >
                ${this._getEndpointIcon(REAR_ENDPOINT_STYLE_LIST, selectedEndPointStyle)}${SmallArrowDownIcon}
              </editor-icon-button>
            `}
          >
            <div>
              ${repeat(REAR_ENDPOINT_STYLE_LIST, item => item.value, ({ value, icon }) => html `
                  <editor-icon-button
                    aria-label=${value}
                    .tooltip=${value}
                    .active=${selectedEndPointStyle === value}
                    .activeMode=${'background'}
                    @click=${() => this._setConnectorPointStyle(ConnectorEndpoint.Rear, value)}
                  >
                    ${icon}
                  </editor-icon-button>
                `)}
            </div>
          </editor-menu-button>

          <editor-menu-button
            .button=${html `
              <editor-icon-button
                aria-label="Shape"
                .tooltip=${'Connector shape'}
              >
                ${choose(selectedMode, MODE_CHOOSE)}${SmallArrowDownIcon}
              </editor-icon-button>
            `}
          >
            <div>
              ${repeat(MODE_LIST, item => item.name, ({ name, value, icon }) => html `
                  <editor-icon-button
                    aria-label=${name}
                    .tooltip=${name}
                    .active=${selectedMode === value}
                    .activeMode=${'background'}
                    @click=${() => this._setConnectorMode(value)}
                  >
                    ${icon}
                  </editor-icon-button>
                `)}
            </div>
          </editor-menu-button>
        `,
                choose(this._showAddButtonOrTextMenu(), [
                    [
                        'button',
                        () => html `
                <editor-icon-button
                  aria-label="Add text"
                  .tooltip=${'Add text'}
                  @click=${this._addLabel}
                >
                  ${AddTextIcon}
                </editor-icon-button>
              `,
                    ],
                    [
                        'menu',
                        () => html `
                <edgeless-change-text-menu
                  .elementType=${'connector'}
                  .elements=${this.elements}
                  .edgeless=${this.edgeless}
                ></edgeless-change-text-menu>
              `,
                    ],
                    ['nothing', () => nothing],
                ]),
            ].filter(button => button !== nothing), renderToolbarSeparator);
        }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #elements_accessor_storage;
        get elements() { return this.#elements_accessor_storage; }
        set elements(value) { this.#elements_accessor_storage = value; }
        #strokeColorButton_accessor_storage;
        get strokeColorButton() { return this.#strokeColorButton_accessor_storage; }
        set strokeColorButton(value) { this.#strokeColorButton_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this.pickColor = (event) => {
                if (event.type === 'pick') {
                    this.elements.forEach(ele => this.service.updateElement(ele.id, packColor('stroke', { ...event.detail })));
                    return;
                }
                this.elements.forEach(ele => ele[event.type === 'start' ? 'stash' : 'pop']('stroke'));
            };
            this.#edgeless_accessor_storage = __runInitializers(this, _edgeless_initializers, void 0);
            this.#elements_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _elements_initializers, []));
            this.#strokeColorButton_accessor_storage = (__runInitializers(this, _elements_extraInitializers), __runInitializers(this, _strokeColorButton_initializers, void 0));
            __runInitializers(this, _strokeColorButton_extraInitializers);
        }
    };
})();
export { EdgelessChangeConnectorButton };
export function renderConnectorButton(edgeless, elements) {
    if (!elements?.length)
        return nothing;
    return html `
    <edgeless-change-connector-button
      .elements=${elements}
      .edgeless=${edgeless}
    >
    </edgeless-change-connector-button>
  `;
}
//# sourceMappingURL=change-connector-button.js.map