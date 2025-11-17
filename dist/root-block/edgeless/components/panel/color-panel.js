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
import { TransparentIcon } from '@blocksuite/affine-components/icons';
import { ColorScheme, LINE_COLORS, LineColor, NoteBackgroundColor, ShapeFillColor, } from '@blocksuite/affine-model';
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
export class ColorEvent extends Event {
    constructor(type, { detail, composed, bubbles, }) {
        super(type, { bubbles, composed });
        this.detail = detail;
    }
}
export const GET_DEFAULT_LINE_COLOR = (theme) => {
    return theme === ColorScheme.Dark ? LineColor.White : LineColor.Black;
};
export function isTransparent(color) {
    return color.toLowerCase().endsWith('transparent');
}
function isSameColorWithBackground(color) {
    const colors = [
        LineColor.Black,
        LineColor.White,
        NoteBackgroundColor.Black,
        NoteBackgroundColor.White,
        ShapeFillColor.Black,
        ShapeFillColor.White,
    ];
    return colors.includes(color.toLowerCase());
}
function TransparentColor(hollowCircle = false) {
    const containerStyle = {
        position: 'relative',
        width: '16px',
        height: '16px',
        stroke: 'none',
    };
    const maskStyle = {
        position: 'absolute',
        width: '10px',
        height: '10px',
        left: '3px',
        top: '3.5px',
        borderRadius: '50%',
        background: 'var(--affine-background-overlay-panel-color)',
    };
    const mask = hollowCircle
        ? html `<div style=${styleMap(maskStyle)}></div>`
        : nothing;
    return html `
    <div style=${styleMap(containerStyle)}>${TransparentIcon} ${mask}</div>
  `;
}
function BorderedHollowCircle(color) {
    const valid = color.startsWith('--');
    const strokeWidth = valid && isSameColorWithBackground(color) ? 1 : 0;
    const style = {
        fill: valid ? `var(${color})` : color,
        stroke: 'var(--affine-border-color)',
    };
    return html `
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3125 8C12.3125 10.3817 10.3817 12.3125 8 12.3125C5.61827 12.3125 3.6875 10.3817 3.6875 8C3.6875 5.61827 5.61827 3.6875 8 3.6875C10.3817 3.6875 12.3125 5.61827 12.3125 8ZM8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5Z"
        stroke-width="${strokeWidth}"
        style=${styleMap(style)}
      />
    </svg>
  `;
}
function AdditionIcon(color, hollowCircle) {
    if (isTransparent(color)) {
        return TransparentColor(hollowCircle);
    }
    if (hollowCircle) {
        return BorderedHollowCircle(color);
    }
    return nothing;
}
export function ColorUnit(color, { hollowCircle, letter, } = {}) {
    const additionIcon = AdditionIcon(color, !!hollowCircle);
    const colorStyle = !hollowCircle && !isTransparent(color)
        ? { background: `var(${color})` }
        : {};
    const borderStyle = isSameColorWithBackground(color) && !hollowCircle
        ? {
            border: '0.5px solid var(--affine-border-color)',
        }
        : {};
    const style = {
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        ...borderStyle,
        ...colorStyle,
    };
    return html `
    <div
      class="color-unit"
      style=${styleMap(style)}
      aria-label=${color.toLowerCase()}
      data-letter=${letter ? 'A' : ''}
    >
      ${additionIcon}
    </div>
  `;
}
let EdgelessColorButton = (() => {
    let _classSuper = LitElement;
    let _color_decorators;
    let _color_initializers = [];
    let _color_extraInitializers = [];
    let _hollowCircle_decorators;
    let _hollowCircle_initializers = [];
    let _hollowCircle_extraInitializers = [];
    let _letter_decorators;
    let _letter_initializers = [];
    let _letter_extraInitializers = [];
    return class EdgelessColorButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _color_decorators = [property({ attribute: false })];
            _hollowCircle_decorators = [property({ attribute: false })];
            _letter_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _color_decorators, { kind: "accessor", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(this, null, _hollowCircle_decorators, { kind: "accessor", name: "hollowCircle", static: false, private: false, access: { has: obj => "hollowCircle" in obj, get: obj => obj.hollowCircle, set: (obj, value) => { obj.hollowCircle = value; } }, metadata: _metadata }, _hollowCircle_initializers, _hollowCircle_extraInitializers);
            __esDecorate(this, null, _letter_decorators, { kind: "accessor", name: "letter", static: false, private: false, access: { has: obj => "letter" in obj, get: obj => obj.letter, set: (obj, value) => { obj.letter = value; } }, metadata: _metadata }, _letter_initializers, _letter_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
    }

    .color-unit {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      box-sizing: border-box;
      overflow: hidden;
    }
  `; }
        get preprocessColor() {
            const color = this.color;
            return color.startsWith('--') ? `var(${color})` : color;
        }
        render() {
            const { color, hollowCircle, letter } = this;
            const additionIcon = AdditionIcon(color, !!hollowCircle);
            const style = {};
            if (!hollowCircle) {
                style.background = this.preprocessColor;
                if (isSameColorWithBackground(color)) {
                    style.border = '0.5px solid var(--affine-border-color)';
                }
            }
            return html `<div
      class="color-unit"
      aria-label=${color.toLowerCase()}
      data-letter=${letter ? 'A' : nothing}
      style=${styleMap(style)}
    >
      ${additionIcon}
    </div>`;
        }
        #color_accessor_storage = __runInitializers(this, _color_initializers, void 0);
        get color() { return this.#color_accessor_storage; }
        set color(value) { this.#color_accessor_storage = value; }
        #hollowCircle_accessor_storage = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _hollowCircle_initializers, undefined));
        get hollowCircle() { return this.#hollowCircle_accessor_storage; }
        set hollowCircle(value) { this.#hollowCircle_accessor_storage = value; }
        #letter_accessor_storage = (__runInitializers(this, _hollowCircle_extraInitializers), __runInitializers(this, _letter_initializers, undefined));
        get letter() { return this.#letter_accessor_storage; }
        set letter(value) { this.#letter_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _letter_extraInitializers);
        }
    };
})();
export { EdgelessColorButton };
export const colorContainerStyles = css `
  .color-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    padding: 2px;
  }

  .color-unit::before {
    content: attr(data-letter);
    display: block;
    font-size: 12px;
  }

  .color-container[active]:after {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 0.5px solid var(--affine-primary-color);
    border-radius: 50%;
    box-sizing: border-box;
    content: attr(data-letter);
  }
`;
let EdgelessColorPanel = (() => {
    let _classSuper = LitElement;
    let _hasTransparent_decorators;
    let _hasTransparent_initializers = [];
    let _hasTransparent_extraInitializers = [];
    let _hollowCircle_decorators;
    let _hollowCircle_initializers = [];
    let _hollowCircle_extraInitializers = [];
    let _openColorPicker_decorators;
    let _openColorPicker_initializers = [];
    let _openColorPicker_extraInitializers = [];
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    let _showLetterMark_decorators;
    let _showLetterMark_initializers = [];
    let _showLetterMark_extraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    return class EdgelessColorPanel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _hasTransparent_decorators = [property({ attribute: false })];
            _hollowCircle_decorators = [property({ attribute: false })];
            _openColorPicker_decorators = [property()];
            _options_decorators = [property({ type: Array })];
            _showLetterMark_decorators = [property({ attribute: false })];
            _value_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _hasTransparent_decorators, { kind: "accessor", name: "hasTransparent", static: false, private: false, access: { has: obj => "hasTransparent" in obj, get: obj => obj.hasTransparent, set: (obj, value) => { obj.hasTransparent = value; } }, metadata: _metadata }, _hasTransparent_initializers, _hasTransparent_extraInitializers);
            __esDecorate(this, null, _hollowCircle_decorators, { kind: "accessor", name: "hollowCircle", static: false, private: false, access: { has: obj => "hollowCircle" in obj, get: obj => obj.hollowCircle, set: (obj, value) => { obj.hollowCircle = value; } }, metadata: _metadata }, _hollowCircle_initializers, _hollowCircle_extraInitializers);
            __esDecorate(this, null, _openColorPicker_decorators, { kind: "accessor", name: "openColorPicker", static: false, private: false, access: { has: obj => "openColorPicker" in obj, get: obj => obj.openColorPicker, set: (obj, value) => { obj.openColorPicker = value; } }, metadata: _metadata }, _openColorPicker_initializers, _openColorPicker_extraInitializers);
            __esDecorate(this, null, _options_decorators, { kind: "accessor", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            __esDecorate(this, null, _showLetterMark_decorators, { kind: "accessor", name: "showLetterMark", static: false, private: false, access: { has: obj => "showLetterMark" in obj, get: obj => obj.showLetterMark, set: (obj, value) => { obj.showLetterMark = value; } }, metadata: _metadata }, _showLetterMark_initializers, _showLetterMark_extraInitializers);
            __esDecorate(this, null, _value_decorators, { kind: "accessor", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 184px;
      gap: 8px;
    }

    ${colorContainerStyles}
  `; }
        get palettes() {
            return this.hasTransparent
                ? ['--affine-palette-transparent', ...this.options]
                : this.options;
        }
        onSelect(value) {
            this.dispatchEvent(new ColorEvent('select', {
                detail: value,
                composed: true,
                bubbles: true,
            }));
            this.value = value;
        }
        render() {
            return html `
      ${repeat(this.palettes, color => color, color => {
                const unit = ColorUnit(color, {
                    hollowCircle: this.hollowCircle,
                    letter: this.showLetterMark,
                });
                return html `
            <div
              class="color-container"
              ?active=${color === this.value}
              @click=${() => this.onSelect(color)}
            >
              ${unit}
            </div>
          `;
            })}
      </div>
      <slot name="custom"></slot>
    `;
        }
        #hasTransparent_accessor_storage = __runInitializers(this, _hasTransparent_initializers, true);
        get hasTransparent() { return this.#hasTransparent_accessor_storage; }
        set hasTransparent(value) { this.#hasTransparent_accessor_storage = value; }
        #hollowCircle_accessor_storage = (__runInitializers(this, _hasTransparent_extraInitializers), __runInitializers(this, _hollowCircle_initializers, false));
        get hollowCircle() { return this.#hollowCircle_accessor_storage; }
        set hollowCircle(value) { this.#hollowCircle_accessor_storage = value; }
        #openColorPicker_accessor_storage = (__runInitializers(this, _hollowCircle_extraInitializers), __runInitializers(this, _openColorPicker_initializers, void 0));
        get openColorPicker() { return this.#openColorPicker_accessor_storage; }
        set openColorPicker(value) { this.#openColorPicker_accessor_storage = value; }
        #options_accessor_storage = (__runInitializers(this, _openColorPicker_extraInitializers), __runInitializers(this, _options_initializers, LINE_COLORS));
        get options() { return this.#options_accessor_storage; }
        set options(value) { this.#options_accessor_storage = value; }
        #showLetterMark_accessor_storage = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _showLetterMark_initializers, false));
        get showLetterMark() { return this.#showLetterMark_accessor_storage; }
        set showLetterMark(value) { this.#showLetterMark_accessor_storage = value; }
        #value_accessor_storage = (__runInitializers(this, _showLetterMark_extraInitializers), __runInitializers(this, _value_initializers, null));
        get value() { return this.#value_accessor_storage; }
        set value(value) { this.#value_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _value_extraInitializers);
        }
    };
})();
export { EdgelessColorPanel };
let EdgelessTextColorIcon = (() => {
    let _classSuper = LitElement;
    let _color_decorators;
    let _color_initializers = [];
    let _color_extraInitializers = [];
    return class EdgelessTextColorIcon extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _color_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _color_decorators, { kind: "accessor", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
    }
  `; }
        get preprocessColor() {
            const color = this.color;
            return color.startsWith('--') ? `var(${color})` : color;
        }
        render() {
            return html `
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          fill="currentColor"
          d="M8.71093 3.85123C8.91241 3.31395 9.42603 2.95801 9.99984 2.95801C10.5737 2.95801 11.0873 3.31395 11.2888 3.85123L14.7517 13.0858C14.8729 13.409 14.7092 13.7692 14.386 13.8904C14.0628 14.0116 13.7025 13.8479 13.5813 13.5247L12.5648 10.8141H7.43487L6.41838 13.5247C6.29718 13.8479 5.93693 14.0116 5.61373 13.8904C5.29052 13.7692 5.12677 13.409 5.24797 13.0858L8.71093 3.85123ZM7.90362 9.56405H12.0961L10.1183 4.29013C10.0998 4.24073 10.0526 4.20801 9.99984 4.20801C9.94709 4.20801 9.89986 4.24073 9.88134 4.29013L7.90362 9.56405Z"
        />
        <rect
          x="3.3335"
          y="15"
          width="13.3333"
          height="2.08333"
          rx="1"
          fill=${this.preprocessColor}
        />
      </svg>
    `;
        }
        #color_accessor_storage = __runInitializers(this, _color_initializers, void 0);
        get color() { return this.#color_accessor_storage; }
        set color(value) { this.#color_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _color_extraInitializers);
        }
    };
})();
export { EdgelessTextColorIcon };
//# sourceMappingURL=color-panel.js.map