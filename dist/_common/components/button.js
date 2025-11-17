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
import { baseTheme } from '@toeverything/theme';
import { cssVarV2 } from '@toeverything/theme/v2';
import { css, html, LitElement, nothing, unsafeCSS, } from 'lit';
import { property, query } from 'lit/decorators.js';
/**
 * Default size is 32px, you can override it by setting `size` property.
 * For example, `<icon-button size="32px"></icon-button>`.
 *
 * You can also set `width` or `height` property to override the size.
 *
 * Set `text` property to show a text label.
 *
 * @example
 * ```ts
 * html`<icon-button @click=${this.onUnlink}>
 *   ${UnlinkIcon}
 * </icon-button>`
 *
 * html`<icon-button size="32px" text="HTML" @click=${this._importHtml}>
 *   ${ExportToHTMLIcon}
 * </icon-button>`
 * ```
 */
let IconButton = (() => {
    let _classSuper = LitElement;
    let _active_decorators;
    let _active_initializers = [];
    let _active_extraInitializers = [];
    let _disabled_decorators;
    let _disabled_initializers = [];
    let _disabled_extraInitializers = [];
    let _height_decorators;
    let _height_initializers = [];
    let _height_extraInitializers = [];
    let _hover_decorators;
    let _hover_initializers = [];
    let _hover_extraInitializers = [];
    let _size_decorators;
    let _size_initializers = [];
    let _size_extraInitializers = [];
    let _subText_decorators;
    let _subText_initializers = [];
    let _subText_extraInitializers = [];
    let _text_decorators;
    let _text_initializers = [];
    let _text_extraInitializers = [];
    let _textElement_decorators;
    let _textElement_initializers = [];
    let _textElement_extraInitializers = [];
    let _width_decorators;
    let _width_initializers = [];
    let _width_extraInitializers = [];
    return class IconButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _active_decorators = [property({ attribute: true, type: Boolean })];
            _disabled_decorators = [property({ attribute: true, type: Boolean })];
            _height_decorators = [property()];
            _hover_decorators = [property({ attribute: true, type: String })];
            _size_decorators = [property()];
            _subText_decorators = [property()];
            _text_decorators = [property()];
            _textElement_decorators = [query('.text-container .text')];
            _width_decorators = [property()];
            __esDecorate(this, null, _active_decorators, { kind: "accessor", name: "active", static: false, private: false, access: { has: obj => "active" in obj, get: obj => obj.active, set: (obj, value) => { obj.active = value; } }, metadata: _metadata }, _active_initializers, _active_extraInitializers);
            __esDecorate(this, null, _disabled_decorators, { kind: "accessor", name: "disabled", static: false, private: false, access: { has: obj => "disabled" in obj, get: obj => obj.disabled, set: (obj, value) => { obj.disabled = value; } }, metadata: _metadata }, _disabled_initializers, _disabled_extraInitializers);
            __esDecorate(this, null, _height_decorators, { kind: "accessor", name: "height", static: false, private: false, access: { has: obj => "height" in obj, get: obj => obj.height, set: (obj, value) => { obj.height = value; } }, metadata: _metadata }, _height_initializers, _height_extraInitializers);
            __esDecorate(this, null, _hover_decorators, { kind: "accessor", name: "hover", static: false, private: false, access: { has: obj => "hover" in obj, get: obj => obj.hover, set: (obj, value) => { obj.hover = value; } }, metadata: _metadata }, _hover_initializers, _hover_extraInitializers);
            __esDecorate(this, null, _size_decorators, { kind: "accessor", name: "size", static: false, private: false, access: { has: obj => "size" in obj, get: obj => obj.size, set: (obj, value) => { obj.size = value; } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
            __esDecorate(this, null, _subText_decorators, { kind: "accessor", name: "subText", static: false, private: false, access: { has: obj => "subText" in obj, get: obj => obj.subText, set: (obj, value) => { obj.subText = value; } }, metadata: _metadata }, _subText_initializers, _subText_extraInitializers);
            __esDecorate(this, null, _text_decorators, { kind: "accessor", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(this, null, _textElement_decorators, { kind: "accessor", name: "textElement", static: false, private: false, access: { has: obj => "textElement" in obj, get: obj => obj.textElement, set: (obj, value) => { obj.textElement = value; } }, metadata: _metadata }, _textElement_initializers, _textElement_extraInitializers);
            __esDecorate(this, null, _width_decorators, { kind: "accessor", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      width: var(--button-width);
      height: var(--button-height);
      border-radius: 4px;
      background: transparent;
      cursor: pointer;
      user-select: none;
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
      color: var(--affine-text-primary-color);
      pointer-events: auto;
      padding: 4px;
    }

    // This media query can detect if the device has a hover capability
    @media (hover: hover) {
      :host(:hover) {
        background: var(--affine-hover-color);
      }
    }

    :host(:active) {
      background: transparent;
    }

    :host([disabled]),
    :host(:disabled) {
      background: transparent;
      color: var(--affine-text-disable-color);
      cursor: not-allowed;
    }

    /* You can add a 'hover' attribute to the button to show the hover style */
    :host([hover='true']) {
      background: var(--affine-hover-color);
    }
    :host([hover='false']) {
      background: transparent;
    }

    :host(:active[active]) {
      background: transparent;
    }

    /* not supported "until-found" yet */
    :host([hidden]) {
      display: none;
    }

    :host > .text-container {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    :host .text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: var(--affine-font-sm);
      line-height: var(--affine-line-height);
    }

    :host .sub-text {
      font-size: var(--affine-font-xs);
      color: var(
        --light-textColor-textSecondaryColor,
        var(--textColor-textSecondaryColor, #8e8d91)
      );
      line-height: var(--affine-line-height);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-top: -2px;
    }

    ::slotted(svg) {
      flex-shrink: 0;
      color: var(--svg-icon-color);
    }

    ::slotted([slot='suffix']) {
      margin-left: auto;
    }
  `; }
        constructor() {
            super();
            __runInitializers(this, _width_extraInitializers);
            // Allow activate button by pressing Enter key
            this.addEventListener('keypress', event => {
                if (this.disabled) {
                    return;
                }
                if (event.key === 'Enter' && !event.isComposing) {
                    this.click();
                }
            });
            // Prevent click event when disabled
            this.addEventListener('click', event => {
                if (this.disabled === true) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }, { capture: true });
        }
        connectedCallback() {
            super.connectedCallback();
            this.tabIndex = 0;
            this.role = 'button';
            const DEFAULT_SIZE = '28px';
            if (this.size && (this.width || this.height)) {
                return;
            }
            let width = this.width ?? DEFAULT_SIZE;
            let height = this.height ?? DEFAULT_SIZE;
            if (this.size) {
                width = this.size;
                height = this.size;
            }
            this.style.setProperty('--button-width', typeof width === 'string' ? width : `${width}px`);
            this.style.setProperty('--button-height', typeof height === 'string' ? height : `${height}px`);
        }
        render() {
            if (this.hidden)
                return nothing;
            if (this.disabled) {
                const disabledColor = cssVarV2('icon/disable');
                this.style.setProperty('--svg-icon-color', disabledColor);
                this.dataset.testDisabled = 'true';
            }
            else {
                this.dataset.testDisabled = 'false';
                const iconColor = this.active
                    ? cssVarV2('icon/activated')
                    : cssVarV2('icon/primary');
                this.style.setProperty('--svg-icon-color', iconColor);
            }
            const text = this.text
                ? // wrap a span around the text so we can ellipsis it automatically
                    html `<div class="text">${this.text}</div>`
                : nothing;
            const subText = this.subText
                ? html `<div class="sub-text">${this.subText}</div>`
                : nothing;
            const textContainer = this.text || this.subText
                ? html `<div class="text-container">${text}${subText}</div>`
                : nothing;
            return html `<slot></slot>
      ${textContainer}
      <slot name="suffix"></slot>`;
        }
        #active_accessor_storage = __runInitializers(this, _active_initializers, false);
        get active() { return this.#active_accessor_storage; }
        set active(value) { this.#active_accessor_storage = value; }
        #disabled_accessor_storage = (__runInitializers(this, _active_extraInitializers), __runInitializers(this, _disabled_initializers, undefined));
        // Do not add `{ attribute: false }` option here, otherwise the `disabled` styles will not work
        get disabled() { return this.#disabled_accessor_storage; }
        set disabled(value) { this.#disabled_accessor_storage = value; }
        #height_accessor_storage = (__runInitializers(this, _disabled_extraInitializers), __runInitializers(this, _height_initializers, null));
        get height() { return this.#height_accessor_storage; }
        set height(value) { this.#height_accessor_storage = value; }
        #hover_accessor_storage = (__runInitializers(this, _height_extraInitializers), __runInitializers(this, _hover_initializers, undefined));
        get hover() { return this.#hover_accessor_storage; }
        set hover(value) { this.#hover_accessor_storage = value; }
        #size_accessor_storage = (__runInitializers(this, _hover_extraInitializers), __runInitializers(this, _size_initializers, null));
        get size() { return this.#size_accessor_storage; }
        set size(value) { this.#size_accessor_storage = value; }
        #subText_accessor_storage = (__runInitializers(this, _size_extraInitializers), __runInitializers(this, _subText_initializers, null));
        get subText() { return this.#subText_accessor_storage; }
        set subText(value) { this.#subText_accessor_storage = value; }
        #text_accessor_storage = (__runInitializers(this, _subText_extraInitializers), __runInitializers(this, _text_initializers, null));
        get text() { return this.#text_accessor_storage; }
        set text(value) { this.#text_accessor_storage = value; }
        #textElement_accessor_storage = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _textElement_initializers, null));
        get textElement() { return this.#textElement_accessor_storage; }
        set textElement(value) { this.#textElement_accessor_storage = value; }
        #width_accessor_storage = (__runInitializers(this, _textElement_extraInitializers), __runInitializers(this, _width_initializers, null));
        get width() { return this.#width_accessor_storage; }
        set width(value) { this.#width_accessor_storage = value; }
    };
})();
export { IconButton };
//# sourceMappingURL=button.js.map