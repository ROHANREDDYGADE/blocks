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
import { NoteNoShadowIcon, NoteShadowSampleIcon, } from '@blocksuite/affine-components/icons';
import { ColorScheme, NoteShadow } from '@blocksuite/affine-model';
import { WithDisposable } from '@blocksuite/global/utils';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
const SHADOWS = [
    {
        type: NoteShadow.None,
        styles: {
            light: '',
            dark: '',
        },
        tooltip: 'No shadow',
    },
    {
        type: NoteShadow.Box,
        styles: {
            light: '0px 0.2px 4.8px 0px rgba(66, 65, 73, 0.2), 0px 0px 1.6px 0px rgba(66, 65, 73, 0.2)',
            dark: '0px 0.2px 6px 0px rgba(0, 0, 0, 0.44), 0px 0px 2px 0px rgba(0, 0, 0, 0.66)',
        },
        tooltip: 'Box shadow',
    },
    {
        type: NoteShadow.Sticker,
        styles: {
            light: '0px 9.6px 10.4px -4px rgba(66, 65, 73, 0.07), 0px 10.4px 7.2px -8px rgba(66, 65, 73, 0.22)',
            dark: '0px 9.6px 10.4px -4px rgba(0, 0, 0, 0.66), 0px 10.4px 7.2px -8px rgba(0, 0, 0, 0.44)',
        },
        tooltip: 'Sticker shadow',
    },
    {
        type: NoteShadow.Paper,
        styles: {
            light: '0px 0px 0px 4px rgba(255, 255, 255, 1), 0px 1.2px 2.4px 4.8px rgba(66, 65, 73, 0.16)',
            dark: '0px 1.2px 2.4px 4.8px rgba(0, 0, 0, 0.36), 0px 0px 0px 3.4px rgba(75, 75, 75, 1)',
        },
        tooltip: 'Paper shadow',
    },
    {
        type: NoteShadow.Float,
        styles: {
            light: '0px 5.2px 12px 0px rgba(66, 65, 73, 0.13), 0px 0px 0.4px 1px rgba(0, 0, 0, 0.06)',
            dark: '0px 5.2px 12px 0px rgba(0, 0, 0, 0.66), 0px 0px 0.4px 1px rgba(0, 0, 0, 0.44)',
        },
        tooltip: 'Floation shadow',
    },
    {
        type: NoteShadow.Film,
        styles: {
            light: '0px 0px 0px 1.4px rgba(0, 0, 0, 1), 2.4px 2.4px 0px 1px rgba(0, 0, 0, 1)',
            dark: '0px 0px 0px 1.4px rgba(178, 178, 178, 1), 2.4px 2.4px 0px 1px rgba(178, 178, 178, 1)',
        },
        tooltip: 'Film shadow',
    },
];
let EdgelessNoteShadowPanel = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _background_decorators;
    let _background_initializers = [];
    let _background_extraInitializers = [];
    let _onSelect_decorators;
    let _onSelect_initializers = [];
    let _onSelect_extraInitializers = [];
    let _theme_decorators;
    let _theme_initializers = [];
    let _theme_extraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    return class EdgelessNoteShadowPanel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _background_decorators = [property({ attribute: false })];
            _onSelect_decorators = [property({ attribute: false })];
            _theme_decorators = [property({ attribute: false })];
            _value_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _background_decorators, { kind: "accessor", name: "background", static: false, private: false, access: { has: obj => "background" in obj, get: obj => obj.background, set: (obj, value) => { obj.background = value; } }, metadata: _metadata }, _background_initializers, _background_extraInitializers);
            __esDecorate(this, null, _onSelect_decorators, { kind: "accessor", name: "onSelect", static: false, private: false, access: { has: obj => "onSelect" in obj, get: obj => obj.onSelect, set: (obj, value) => { obj.onSelect = value; } }, metadata: _metadata }, _onSelect_initializers, _onSelect_extraInitializers);
            __esDecorate(this, null, _theme_decorators, { kind: "accessor", name: "theme", static: false, private: false, access: { has: obj => "theme" in obj, get: obj => obj.theme, set: (obj, value) => { obj.theme = value; } }, metadata: _metadata }, _theme_initializers, _theme_extraInitializers);
            __esDecorate(this, null, _value_decorators, { kind: "accessor", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .item {
      padding: 8px;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .item-icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .item:hover {
      background-color: var(--affine-hover-color);
    }
  `; }
        render() {
            return repeat(SHADOWS, shadow => shadow, (shadow, index) => html `<style>
            .item-icon svg rect:first-of-type {
              fill: ${this.background.startsWith('--')
                ? `var(${this.background})`
                : this.background};
            }
          </style>
          <div
            class="item"
            @click=${() => this.onSelect(shadow.type)}
            style=${styleMap({
                border: this.value === shadow.type
                    ? '1px solid var(--affine-brand-color)'
                    : 'none',
            })}
          >
            <edgeless-tool-icon-button
              class="item-icon"
              .tooltip=${shadow.tooltip}
              .tipPosition=${'bottom'}
              .iconContainerPadding=${0}
              style=${styleMap({
                boxShadow: `${this.theme === ColorScheme.Dark ? shadow.styles.dark : shadow.styles.light}`,
            })}
            >
              ${index === 0 ? NoteNoShadowIcon : NoteShadowSampleIcon}
            </edgeless-tool-icon-button>
          </div>`);
        }
        #background_accessor_storage = __runInitializers(this, _background_initializers, void 0);
        get background() { return this.#background_accessor_storage; }
        set background(value) { this.#background_accessor_storage = value; }
        #onSelect_accessor_storage = (__runInitializers(this, _background_extraInitializers), __runInitializers(this, _onSelect_initializers, void 0));
        get onSelect() { return this.#onSelect_accessor_storage; }
        set onSelect(value) { this.#onSelect_accessor_storage = value; }
        #theme_accessor_storage = (__runInitializers(this, _onSelect_extraInitializers), __runInitializers(this, _theme_initializers, void 0));
        get theme() { return this.#theme_accessor_storage; }
        set theme(value) { this.#theme_accessor_storage = value; }
        #value_accessor_storage = (__runInitializers(this, _theme_extraInitializers), __runInitializers(this, _value_initializers, void 0));
        get value() { return this.#value_accessor_storage; }
        set value(value) { this.#value_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _value_extraInitializers);
        }
    };
})();
export { EdgelessNoteShadowPanel };
//# sourceMappingURL=note-shadow-panel.js.map