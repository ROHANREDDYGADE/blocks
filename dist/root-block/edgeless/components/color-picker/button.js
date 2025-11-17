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
import { WithDisposable } from '@blocksuite/global/utils';
import { html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { styleMap } from 'lit/directives/style-map.js';
import { keepColor, preprocessColor } from './utils.js';
let EdgelessColorPickerButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _color_decorators;
    let _color_initializers = [];
    let _color_extraInitializers = [];
    let _colors_decorators;
    let _colors_initializers = [];
    let _colors_extraInitializers = [];
    let _colorType_decorators;
    let _colorType_initializers = [];
    let _colorType_extraInitializers = [];
    let _hollowCircle_decorators;
    let _hollowCircle_initializers = [];
    let _hollowCircle_extraInitializers = [];
    let _isText_decorators;
    let _isText_initializers = [];
    let _isText_extraInitializers = [];
    let _label_decorators;
    let _label_initializers = [];
    let _label_extraInitializers = [];
    let _menuButton_decorators;
    let _menuButton_initializers = [];
    let _menuButton_extraInitializers = [];
    let _palettes_decorators;
    let _palettes_initializers = [];
    let _palettes_extraInitializers = [];
    let _pick_decorators;
    let _pick_initializers = [];
    let _pick_extraInitializers = [];
    let _tabType_decorators;
    let _tabType_initializers = [];
    let _tabType_extraInitializers = [];
    let _tooltip_decorators;
    let _tooltip_initializers = [];
    let _tooltip_extraInitializers = [];
    return class EdgelessColorPickerButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _color_decorators = [property()];
            _colors_decorators = [property({ attribute: false })];
            _colorType_decorators = [property()];
            _hollowCircle_decorators = [property({ attribute: false })];
            _isText_decorators = [property({ attribute: false })];
            _label_decorators = [property()];
            _menuButton_decorators = [query('editor-menu-button')];
            _palettes_decorators = [property({ attribute: false })];
            _pick_decorators = [property({ attribute: false })];
            _tabType_decorators = [state()];
            _tooltip_decorators = [property()];
            __esDecorate(this, null, _color_decorators, { kind: "accessor", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(this, null, _colors_decorators, { kind: "accessor", name: "colors", static: false, private: false, access: { has: obj => "colors" in obj, get: obj => obj.colors, set: (obj, value) => { obj.colors = value; } }, metadata: _metadata }, _colors_initializers, _colors_extraInitializers);
            __esDecorate(this, null, _colorType_decorators, { kind: "accessor", name: "colorType", static: false, private: false, access: { has: obj => "colorType" in obj, get: obj => obj.colorType, set: (obj, value) => { obj.colorType = value; } }, metadata: _metadata }, _colorType_initializers, _colorType_extraInitializers);
            __esDecorate(this, null, _hollowCircle_decorators, { kind: "accessor", name: "hollowCircle", static: false, private: false, access: { has: obj => "hollowCircle" in obj, get: obj => obj.hollowCircle, set: (obj, value) => { obj.hollowCircle = value; } }, metadata: _metadata }, _hollowCircle_initializers, _hollowCircle_extraInitializers);
            __esDecorate(this, null, _isText_decorators, { kind: "accessor", name: "isText", static: false, private: false, access: { has: obj => "isText" in obj, get: obj => obj.isText, set: (obj, value) => { obj.isText = value; } }, metadata: _metadata }, _isText_initializers, _isText_extraInitializers);
            __esDecorate(this, null, _label_decorators, { kind: "accessor", name: "label", static: false, private: false, access: { has: obj => "label" in obj, get: obj => obj.label, set: (obj, value) => { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
            __esDecorate(this, null, _menuButton_decorators, { kind: "accessor", name: "menuButton", static: false, private: false, access: { has: obj => "menuButton" in obj, get: obj => obj.menuButton, set: (obj, value) => { obj.menuButton = value; } }, metadata: _metadata }, _menuButton_initializers, _menuButton_extraInitializers);
            __esDecorate(this, null, _palettes_decorators, { kind: "accessor", name: "palettes", static: false, private: false, access: { has: obj => "palettes" in obj, get: obj => obj.palettes, set: (obj, value) => { obj.palettes = value; } }, metadata: _metadata }, _palettes_initializers, _palettes_extraInitializers);
            __esDecorate(this, null, _pick_decorators, { kind: "accessor", name: "pick", static: false, private: false, access: { has: obj => "pick" in obj, get: obj => obj.pick, set: (obj, value) => { obj.pick = value; } }, metadata: _metadata }, _pick_initializers, _pick_extraInitializers);
            __esDecorate(this, null, _tabType_decorators, { kind: "accessor", name: "tabType", static: false, private: false, access: { has: obj => "tabType" in obj, get: obj => obj.tabType, set: (obj, value) => { obj.tabType = value; } }, metadata: _metadata }, _tabType_initializers, _tabType_extraInitializers);
            __esDecorate(this, null, _tooltip_decorators, { kind: "accessor", name: "tooltip", static: false, private: false, access: { has: obj => "tooltip" in obj, get: obj => obj.tooltip, set: (obj, value) => { obj.tooltip = value; } }, metadata: _metadata }, _tooltip_initializers, _tooltip_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #select;
        get colorWithoutAlpha() {
            return this.isCSSVariable ? this.color : keepColor(this.color);
        }
        get customButtonStyle() {
            let b = 'transparent';
            let c = 'transparent';
            if (!this.isCSSVariable) {
                b = 'var(--affine-background-overlay-panel-color)';
                c = keepColor(this.color);
            }
            return { '--b': b, '--c': c };
        }
        get isCSSVariable() {
            return this.color.startsWith('--');
        }
        get tabContentPadding() {
            return `${this.tabType === 'custom' ? 0 : 8}px`;
        }
        #pick(detail) {
            this.pick?.({ type: 'start' });
            this.pick?.({ type: 'pick', detail });
            this.pick?.({ type: 'end' });
        }
        firstUpdated() {
            this.disposables.addFromEvent(this.menuButton, 'toggle', (e) => {
                const opened = e.detail;
                if (!opened && this.tabType !== 'normal') {
                    this.tabType = 'normal';
                }
            });
        }
        render() {
            return html `
      <editor-menu-button
        .contentPadding=${this.tabContentPadding}
        .button=${html `
          <editor-icon-button
            aria-label=${this.label}
            .tooltip=${this.tooltip || this.label}
          >
            ${this.isText
                ? html `
                  <edgeless-text-color-icon
                    .color=${this.colorWithoutAlpha}
                  ></edgeless-text-color-icon>
                `
                : html `
                  <edgeless-color-button
                    .color=${this.colorWithoutAlpha}
                    .hollowCircle=${this.hollowCircle}
                  ></edgeless-color-button>
                `}
          </editor-icon-button>
        `}
      >
        ${choose(this.tabType, [
                [
                    'normal',
                    () => html `
              <div data-orientation="vertical">
                <slot name="other"></slot>
                <slot name="separator"></slot>
                <edgeless-color-panel
                  role="listbox"
                  .value=${this.color}
                  .options=${this.palettes}
                  .hollowCircle=${this.hollowCircle}
                  .openColorPicker=${this.switchToCustomTab}
                  .hasTransparent=${false}
                  @select=${this.#select}
                >
                  <edgeless-color-custom-button
                    slot="custom"
                    style=${styleMap(this.customButtonStyle)}
                    .active=${!this.isCSSVariable}
                    @click=${this.switchToCustomTab}
                  ></edgeless-color-custom-button>
                </edgeless-color-panel>
              </div>
            `,
                ],
                [
                    'custom',
                    () => html `
              <edgeless-color-picker
                class="custom"
                .pick=${this.pick}
                .colors=${{
                        type: this.colorType === 'palette' ? 'normal' : this.colorType,
                        modes: this.colors.map(preprocessColor(window.getComputedStyle(this))),
                    }}
              ></edgeless-color-picker>
            `,
                ],
            ])}
      </editor-menu-button>
    `;
        }
        #color_accessor_storage;
        get color() { return this.#color_accessor_storage; }
        set color(value) { this.#color_accessor_storage = value; }
        #colors_accessor_storage;
        get colors() { return this.#colors_accessor_storage; }
        set colors(value) { this.#colors_accessor_storage = value; }
        #colorType_accessor_storage;
        get colorType() { return this.#colorType_accessor_storage; }
        set colorType(value) { this.#colorType_accessor_storage = value; }
        #hollowCircle_accessor_storage;
        get hollowCircle() { return this.#hollowCircle_accessor_storage; }
        set hollowCircle(value) { this.#hollowCircle_accessor_storage = value; }
        #isText_accessor_storage;
        get isText() { return this.#isText_accessor_storage; }
        set isText(value) { this.#isText_accessor_storage = value; }
        #label_accessor_storage;
        get label() { return this.#label_accessor_storage; }
        set label(value) { this.#label_accessor_storage = value; }
        #menuButton_accessor_storage;
        get menuButton() { return this.#menuButton_accessor_storage; }
        set menuButton(value) { this.#menuButton_accessor_storage = value; }
        #palettes_accessor_storage;
        get palettes() { return this.#palettes_accessor_storage; }
        set palettes(value) { this.#palettes_accessor_storage = value; }
        #pick_accessor_storage;
        get pick() { return this.#pick_accessor_storage; }
        set pick(value) { this.#pick_accessor_storage = value; }
        #tabType_accessor_storage;
        get tabType() { return this.#tabType_accessor_storage; }
        set tabType(value) { this.#tabType_accessor_storage = value; }
        #tooltip_accessor_storage;
        get tooltip() { return this.#tooltip_accessor_storage; }
        set tooltip(value) { this.#tooltip_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this.#select = (e) => {
                this.#pick({ palette: e.detail });
            };
            this.switchToCustomTab = (e) => {
                e.stopPropagation();
                if (this.colorType === 'palette') {
                    this.colorType = 'normal';
                }
                this.tabType = 'custom';
                // refresh menu's position
                this.menuButton.show(true);
            };
            this.#color_accessor_storage = __runInitializers(this, _color_initializers, void 0);
            this.#colors_accessor_storage = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _colors_initializers, []));
            this.#colorType_accessor_storage = (__runInitializers(this, _colors_extraInitializers), __runInitializers(this, _colorType_initializers, 'palette'));
            this.#hollowCircle_accessor_storage = (__runInitializers(this, _colorType_extraInitializers), __runInitializers(this, _hollowCircle_initializers, false));
            this.#isText_accessor_storage = (__runInitializers(this, _hollowCircle_extraInitializers), __runInitializers(this, _isText_initializers, void 0));
            this.#label_accessor_storage = (__runInitializers(this, _isText_extraInitializers), __runInitializers(this, _label_initializers, void 0));
            this.#menuButton_accessor_storage = (__runInitializers(this, _label_extraInitializers), __runInitializers(this, _menuButton_initializers, void 0));
            this.#palettes_accessor_storage = (__runInitializers(this, _menuButton_extraInitializers), __runInitializers(this, _palettes_initializers, []));
            this.#pick_accessor_storage = (__runInitializers(this, _palettes_extraInitializers), __runInitializers(this, _pick_initializers, void 0));
            this.#tabType_accessor_storage = (__runInitializers(this, _pick_extraInitializers), __runInitializers(this, _tabType_initializers, 'normal'));
            this.#tooltip_accessor_storage = (__runInitializers(this, _tabType_extraInitializers), __runInitializers(this, _tooltip_initializers, undefined));
            __runInitializers(this, _tooltip_extraInitializers);
        }
    };
})();
export { EdgelessColorPickerButton };
//# sourceMappingURL=button.js.map