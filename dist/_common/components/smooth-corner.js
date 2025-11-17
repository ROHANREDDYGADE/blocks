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
import { getFigmaSquircleSvgPath } from '@blocksuite/global/utils';
import { css, html, LitElement, svg } from 'lit';
import { property, state } from 'lit/decorators.js';
/**
 * ### A component to use figma 'smoothing radius'
 *
 * ```html
 * <smooth-corner
 *  .borderRadius=${10}
 *  .smooth=${0.5}
 *  .borderWidth=${2}
 *  .bgColor=${'white'}
 *   style="filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));"
 * >
 *    <h1>Smooth Corner</h1>
 * </smooth-corner>
 * ```
 *
 * **Just wrap your content with it.**
 * - There is a ResizeObserver inside to observe the size of the content.
 * - In order to use both border and shadow, we use svg to draw.
 *    - So we need to use `stroke` and `drop-shadow` to replace `border` and `box-shadow`.
 *
 * #### required properties
 * - `borderRadius`: Equal to the border-radius
 * - `smooth`: From 0 to 1, refer to the figma smoothing radius
 *
 * #### customizable style properties
 * Provides some commonly used styles, dealing with their mapping with SVG attributes, such as:
 * - `borderWidth` (stroke-width)
 * - `borderColor` (stroke)
 * - `bgColor` (fill)
 * - `bgOpacity` (fill-opacity)
 *
 * #### More customization
 * Use css to customize this component, such as drop-shadow:
 * ```css
 * smooth-corner {
 *  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));
 * }
 * ```
 */
let SmoothCorner = (() => {
    let _classSuper = LitElement;
    let _bgColor_decorators;
    let _bgColor_initializers = [];
    let _bgColor_extraInitializers = [];
    let _bgOpacity_decorators;
    let _bgOpacity_initializers = [];
    let _bgOpacity_extraInitializers = [];
    let _borderColor_decorators;
    let _borderColor_initializers = [];
    let _borderColor_extraInitializers = [];
    let _borderRadius_decorators;
    let _borderRadius_initializers = [];
    let _borderRadius_extraInitializers = [];
    let _borderWidth_decorators;
    let _borderWidth_initializers = [];
    let _borderWidth_extraInitializers = [];
    let _height_decorators;
    let _height_initializers = [];
    let _height_extraInitializers = [];
    let _smooth_decorators;
    let _smooth_initializers = [];
    let _smooth_extraInitializers = [];
    let _width_decorators;
    let _width_initializers = [];
    let _width_extraInitializers = [];
    return class SmoothCorner extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _bgColor_decorators = [property({ type: String })];
            _bgOpacity_decorators = [property({ type: Number })];
            _borderColor_decorators = [property({ type: String })];
            _borderRadius_decorators = [property({ type: Number })];
            _borderWidth_decorators = [property({ type: Number })];
            _height_decorators = [state()];
            _smooth_decorators = [property({ type: Number })];
            _width_decorators = [state()];
            __esDecorate(this, null, _bgColor_decorators, { kind: "accessor", name: "bgColor", static: false, private: false, access: { has: obj => "bgColor" in obj, get: obj => obj.bgColor, set: (obj, value) => { obj.bgColor = value; } }, metadata: _metadata }, _bgColor_initializers, _bgColor_extraInitializers);
            __esDecorate(this, null, _bgOpacity_decorators, { kind: "accessor", name: "bgOpacity", static: false, private: false, access: { has: obj => "bgOpacity" in obj, get: obj => obj.bgOpacity, set: (obj, value) => { obj.bgOpacity = value; } }, metadata: _metadata }, _bgOpacity_initializers, _bgOpacity_extraInitializers);
            __esDecorate(this, null, _borderColor_decorators, { kind: "accessor", name: "borderColor", static: false, private: false, access: { has: obj => "borderColor" in obj, get: obj => obj.borderColor, set: (obj, value) => { obj.borderColor = value; } }, metadata: _metadata }, _borderColor_initializers, _borderColor_extraInitializers);
            __esDecorate(this, null, _borderRadius_decorators, { kind: "accessor", name: "borderRadius", static: false, private: false, access: { has: obj => "borderRadius" in obj, get: obj => obj.borderRadius, set: (obj, value) => { obj.borderRadius = value; } }, metadata: _metadata }, _borderRadius_initializers, _borderRadius_extraInitializers);
            __esDecorate(this, null, _borderWidth_decorators, { kind: "accessor", name: "borderWidth", static: false, private: false, access: { has: obj => "borderWidth" in obj, get: obj => obj.borderWidth, set: (obj, value) => { obj.borderWidth = value; } }, metadata: _metadata }, _borderWidth_initializers, _borderWidth_extraInitializers);
            __esDecorate(this, null, _height_decorators, { kind: "accessor", name: "height", static: false, private: false, access: { has: obj => "height" in obj, get: obj => obj.height, set: (obj, value) => { obj.height = value; } }, metadata: _metadata }, _height_initializers, _height_extraInitializers);
            __esDecorate(this, null, _smooth_decorators, { kind: "accessor", name: "smooth", static: false, private: false, access: { has: obj => "smooth" in obj, get: obj => obj.smooth, set: (obj, value) => { obj.smooth = value; } }, metadata: _metadata }, _smooth_initializers, _smooth_extraInitializers);
            __esDecorate(this, null, _width_decorators, { kind: "accessor", name: "width", static: false, private: false, access: { has: obj => "width" in obj, get: obj => obj.width, set: (obj, value) => { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      position: relative;
    }
    .smooth-corner-bg,
    .smooth-corner-border {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    }
    .smooth-corner-border {
      z-index: 2;
    }
    .smooth-corner-content {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
    }
  `; }
        get _path() {
            return getFigmaSquircleSvgPath({
                width: this.width,
                height: this.height,
                cornerRadius: this.borderRadius, // defaults to 0
                cornerSmoothing: this.smooth, // cornerSmoothing goes from 0 to 1
            });
        }
        constructor() {
            super();
            this._resizeObserver = null;
            this.#bgColor_accessor_storage = __runInitializers(this, _bgColor_initializers, 'white');
            this.#bgOpacity_accessor_storage = (__runInitializers(this, _bgColor_extraInitializers), __runInitializers(this, _bgOpacity_initializers, 1));
            this.#borderColor_accessor_storage = (__runInitializers(this, _bgOpacity_extraInitializers), __runInitializers(this, _borderColor_initializers, 'black'));
            this.#borderRadius_accessor_storage = (__runInitializers(this, _borderColor_extraInitializers), __runInitializers(this, _borderRadius_initializers, 0));
            this.#borderWidth_accessor_storage = (__runInitializers(this, _borderRadius_extraInitializers), __runInitializers(this, _borderWidth_initializers, 2));
            this.#height_accessor_storage = (__runInitializers(this, _borderWidth_extraInitializers), __runInitializers(this, _height_initializers, 0));
            this.#smooth_accessor_storage = (__runInitializers(this, _height_extraInitializers), __runInitializers(this, _smooth_initializers, 0));
            this.#width_accessor_storage = (__runInitializers(this, _smooth_extraInitializers), __runInitializers(this, _width_initializers, 0));
            __runInitializers(this, _width_extraInitializers);
            this._resizeObserver = new ResizeObserver(entries => {
                for (const entry of entries) {
                    this.width = entry.contentRect.width;
                    this.height = entry.contentRect.height;
                }
            });
        }
        _getSvg(className, path) {
            return svg `<svg
      class="${className}"
      width=${this.width + this.borderWidth}
      height=${this.height + this.borderWidth}
      viewBox="0 0 ${this.width + this.borderWidth} ${this.height + this.borderWidth}"
      xmlns="http://www.w3.org/2000/svg"
    >
      ${path}
    </svg>`;
        }
        connectedCallback() {
            super.connectedCallback();
            this._resizeObserver?.observe(this);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._resizeObserver?.unobserve(this);
        }
        render() {
            return html `${this._getSvg('smooth-corner-bg', svg `<path 
          d="${this._path}" 
          fill="${this.bgColor}" 
          fill-opacity="${this.bgOpacity}"
          transform="translate(${this.borderWidth / 2} ${this.borderWidth / 2})"
        >`)}
      ${this._getSvg('smooth-corner-border', svg `<path 
          fill="none"
          d="${this._path}" 
          stroke="${this.borderColor}" 
          stroke-width="${this.borderWidth}"
          transform="translate(${this.borderWidth / 2} ${this.borderWidth / 2})"
        >`)}
      <div class="smooth-corner-content">
        <slot></slot>
      </div>`;
        }
        #bgColor_accessor_storage;
        /**
         * Background color of the element
         */
        get bgColor() { return this.#bgColor_accessor_storage; }
        set bgColor(value) { this.#bgColor_accessor_storage = value; }
        #bgOpacity_accessor_storage;
        /**
         * Background opacity of the element
         */
        get bgOpacity() { return this.#bgOpacity_accessor_storage; }
        set bgOpacity(value) { this.#bgOpacity_accessor_storage = value; }
        #borderColor_accessor_storage;
        /**
         * Border color of the element
         */
        get borderColor() { return this.#borderColor_accessor_storage; }
        set borderColor(value) { this.#borderColor_accessor_storage = value; }
        #borderRadius_accessor_storage;
        /**
         * Equal to the border-radius
         */
        get borderRadius() { return this.#borderRadius_accessor_storage; }
        set borderRadius(value) { this.#borderRadius_accessor_storage = value; }
        #borderWidth_accessor_storage;
        /**
         * Border width of the element in px
         */
        get borderWidth() { return this.#borderWidth_accessor_storage; }
        set borderWidth(value) { this.#borderWidth_accessor_storage = value; }
        #height_accessor_storage;
        get height() { return this.#height_accessor_storage; }
        set height(value) { this.#height_accessor_storage = value; }
        #smooth_accessor_storage;
        /**
         * From 0 to 1
         */
        get smooth() { return this.#smooth_accessor_storage; }
        set smooth(value) { this.#smooth_accessor_storage = value; }
        #width_accessor_storage;
        get width() { return this.#width_accessor_storage; }
        set width(value) { this.#width_accessor_storage = value; }
    };
})();
export { SmoothCorner };
//# sourceMappingURL=smooth-corner.js.map