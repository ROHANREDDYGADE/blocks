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
import { GeneralStyleIcon, ScribbledStyleIcon, } from '@blocksuite/affine-components/icons';
import { DEFAULT_SHAPE_FILL_COLOR, LineColor, SHAPE_FILL_COLORS, ShapeStyle, ShapeType, } from '@blocksuite/affine-model';
import { EditPropsStore, ThemeProvider, } from '@blocksuite/affine-shared/services';
import { SignalWatcher, WithDisposable } from '@blocksuite/global/utils';
import { computed, effect, signal } from '@preact/signals-core';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { isTransparent } from '../../panel/color-panel.js';
import { LINE_COLOR_PREFIX, SHAPE_COLOR_PREFIX, ShapeComponentConfig, } from './shape-menu-config.js';
let EdgelessShapeMenu = (() => {
    let _classSuper = SignalWatcher(WithDisposable(LitElement));
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _onChange_decorators;
    let _onChange_initializers = [];
    let _onChange_extraInitializers = [];
    return class EdgelessShapeMenu extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _edgeless_decorators = [property({ attribute: false })];
            _onChange_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _onChange_decorators, { kind: "accessor", name: "onChange", static: false, private: false, access: { has: obj => "onChange" in obj, get: obj => obj.onChange, set: (obj, value) => { obj.onChange = value; } }, metadata: _metadata }, _onChange_initializers, _onChange_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      z-index: -1;
    }
    .menu-content {
      display: flex;
      align-items: center;
    }
    .shape-type-container,
    .shape-style-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
    }
    .shape-type-container svg,
    .shape-style-container svg {
      fill: var(--affine-icon-color);
      stroke: none;
    }
    menu-divider {
      height: 24px;
      margin: 0 9px;
    }
  `; }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        connectedCallback() {
            super.connectedCallback();
            this._disposables.add(effect(() => {
                const value = this.edgeless.gfx.tool.currentToolOption$.value;
                if (value && value.type === 'shape') {
                    this._shapeName$.value = value.shapeName;
                }
            }));
        }
        render() {
            const { fillColor, shapeStyle, shapeName } = this._props$.value;
            const color = this.edgeless.std
                .get(ThemeProvider)
                .getColorValue(fillColor, DEFAULT_SHAPE_FILL_COLOR);
            return html `
      <edgeless-slide-menu>
        <div class="menu-content">
          <div class="shape-style-container">
            <edgeless-tool-icon-button
              .tooltip=${'General'}
              .active=${shapeStyle === ShapeStyle.General}
              .activeMode=${'background'}
              @click=${() => {
                this._setShapeStyle(ShapeStyle.General);
            }}
            >
              ${GeneralStyleIcon}
            </edgeless-tool-icon-button>
            <edgeless-tool-icon-button
              .tooltip=${'Scribbled'}
              .active=${shapeStyle === ShapeStyle.Scribbled}
              .activeMode=${'background'}
              @click=${() => {
                this._setShapeStyle(ShapeStyle.Scribbled);
            }}
            >
              ${ScribbledStyleIcon}
            </edgeless-tool-icon-button>
          </div>
          <menu-divider .vertical=${true}></menu-divider>
          <div class="shape-type-container">
            ${ShapeComponentConfig.map(({ name, generalIcon, scribbledIcon, tooltip }) => {
                return html `
                  <edgeless-tool-icon-button
                    .tooltip=${tooltip}
                    .active=${shapeName === name}
                    .activeMode=${'background'}
                    @click=${() => this.onChange(name)}
                  >
                    ${shapeStyle === ShapeStyle.General
                    ? generalIcon
                    : scribbledIcon}
                  </edgeless-tool-icon-button>
                `;
            })}
          </div>
          <menu-divider .vertical=${true}></menu-divider>
          <edgeless-one-row-color-panel
            .value=${color}
            .options=${SHAPE_FILL_COLORS}
            .hasTransparent=${!this.edgeless.doc.awarenessStore.getFlag('enable_color_picker')}
            @select=${(e) => this._setFillColor(e.detail)}
          ></edgeless-one-row-color-panel>
        </div>
      </edgeless-slide-menu>
    `;
        }
        #onChange_accessor_storage;
        get onChange() { return this.#onChange_accessor_storage; }
        set onChange(value) { this.#onChange_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._shapeName$ = signal(ShapeType.Rect);
            this.#edgeless_accessor_storage = __runInitializers(this, _edgeless_initializers, void 0);
            this._props$ = (__runInitializers(this, _edgeless_extraInitializers), computed(() => {
                const shapeName = this._shapeName$.value;
                const { shapeStyle, fillColor, strokeColor, radius } = this.edgeless.std.get(EditPropsStore).lastProps$.value[`shape:${shapeName}`];
                return {
                    shapeStyle,
                    shapeName,
                    fillColor,
                    strokeColor,
                    radius,
                };
            }));
            this._setFillColor = (fillColor) => {
                const filled = !isTransparent(fillColor);
                let strokeColor = fillColor.replace(SHAPE_COLOR_PREFIX, LINE_COLOR_PREFIX);
                if (strokeColor.endsWith('transparent')) {
                    strokeColor = LineColor.Grey;
                }
                const { shapeName } = this._props$.value;
                this.edgeless.std
                    .get(EditPropsStore)
                    .recordLastProps(`shape:${shapeName}`, {
                    filled,
                    fillColor,
                    strokeColor,
                });
                this.onChange(shapeName);
            };
            this._setShapeStyle = (shapeStyle) => {
                const { shapeName } = this._props$.value;
                this.edgeless.std
                    .get(EditPropsStore)
                    .recordLastProps(`shape:${shapeName}`, {
                    shapeStyle,
                });
                this.onChange(shapeName);
            };
            this.#onChange_accessor_storage = __runInitializers(this, _onChange_initializers, void 0);
            __runInitializers(this, _onChange_extraInitializers);
        }
    };
})();
export { EdgelessShapeMenu };
//# sourceMappingURL=shape-menu.js.map