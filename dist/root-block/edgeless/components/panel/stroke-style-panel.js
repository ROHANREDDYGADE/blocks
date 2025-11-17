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
import { SHAPE_STROKE_COLORS, StrokeStyle } from '@blocksuite/affine-model';
import { WithDisposable } from '@blocksuite/global/utils';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { LineStylesPanel } from './line-styles-panel.js';
let StrokeStylePanel = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _hollowCircle_decorators;
    let _hollowCircle_initializers = [];
    let _hollowCircle_extraInitializers = [];
    let _setStrokeColor_decorators;
    let _setStrokeColor_initializers = [];
    let _setStrokeColor_extraInitializers = [];
    let _setStrokeStyle_decorators;
    let _setStrokeStyle_initializers = [];
    let _setStrokeStyle_extraInitializers = [];
    let _strokeColor_decorators;
    let _strokeColor_initializers = [];
    let _strokeColor_extraInitializers = [];
    let _strokeStyle_decorators;
    let _strokeStyle_initializers = [];
    let _strokeStyle_extraInitializers = [];
    let _strokeWidth_decorators;
    let _strokeWidth_initializers = [];
    let _strokeWidth_extraInitializers = [];
    return class StrokeStylePanel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _hollowCircle_decorators = [property({ attribute: false })];
            _setStrokeColor_decorators = [property({ attribute: false })];
            _setStrokeStyle_decorators = [property({ attribute: false })];
            _strokeColor_decorators = [property({ attribute: false })];
            _strokeStyle_decorators = [property({ attribute: false })];
            _strokeWidth_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _hollowCircle_decorators, { kind: "accessor", name: "hollowCircle", static: false, private: false, access: { has: obj => "hollowCircle" in obj, get: obj => obj.hollowCircle, set: (obj, value) => { obj.hollowCircle = value; } }, metadata: _metadata }, _hollowCircle_initializers, _hollowCircle_extraInitializers);
            __esDecorate(this, null, _setStrokeColor_decorators, { kind: "accessor", name: "setStrokeColor", static: false, private: false, access: { has: obj => "setStrokeColor" in obj, get: obj => obj.setStrokeColor, set: (obj, value) => { obj.setStrokeColor = value; } }, metadata: _metadata }, _setStrokeColor_initializers, _setStrokeColor_extraInitializers);
            __esDecorate(this, null, _setStrokeStyle_decorators, { kind: "accessor", name: "setStrokeStyle", static: false, private: false, access: { has: obj => "setStrokeStyle" in obj, get: obj => obj.setStrokeStyle, set: (obj, value) => { obj.setStrokeStyle = value; } }, metadata: _metadata }, _setStrokeStyle_initializers, _setStrokeStyle_extraInitializers);
            __esDecorate(this, null, _strokeColor_decorators, { kind: "accessor", name: "strokeColor", static: false, private: false, access: { has: obj => "strokeColor" in obj, get: obj => obj.strokeColor, set: (obj, value) => { obj.strokeColor = value; } }, metadata: _metadata }, _strokeColor_initializers, _strokeColor_extraInitializers);
            __esDecorate(this, null, _strokeStyle_decorators, { kind: "accessor", name: "strokeStyle", static: false, private: false, access: { has: obj => "strokeStyle" in obj, get: obj => obj.strokeStyle, set: (obj, value) => { obj.strokeStyle = value; } }, metadata: _metadata }, _strokeStyle_initializers, _strokeStyle_extraInitializers);
            __esDecorate(this, null, _strokeWidth_decorators, { kind: "accessor", name: "strokeWidth", static: false, private: false, access: { has: obj => "strokeWidth" in obj, get: obj => obj.strokeWidth, set: (obj, value) => { obj.strokeWidth = value; } }, metadata: _metadata }, _strokeWidth_initializers, _strokeWidth_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .line-styles {
      display: flex;
      flex-direction: row;
      gap: 8px;
      align-items: center;
    }
  `; }
        render() {
            return html `
      <div class="line-styles">
        ${LineStylesPanel({
                selectedLineSize: this.strokeWidth,
                selectedLineStyle: this.strokeStyle,
                onClick: e => this.setStrokeStyle(e),
                lineStyles: [StrokeStyle.Solid, StrokeStyle.Dash],
            })}
      </div>
      <editor-toolbar-separator
        data-orientation="horizontal"
      ></editor-toolbar-separator>
      <edgeless-color-panel
        role="listbox"
        aria-label="Border colors"
        .options=${SHAPE_STROKE_COLORS}
        .value=${this.strokeColor}
        .hollowCircle=${this.hollowCircle}
        @select=${(e) => this.setStrokeColor(e)}
      >
      </edgeless-color-panel>
    `;
        }
        #hollowCircle_accessor_storage = __runInitializers(this, _hollowCircle_initializers, undefined);
        get hollowCircle() { return this.#hollowCircle_accessor_storage; }
        set hollowCircle(value) { this.#hollowCircle_accessor_storage = value; }
        #setStrokeColor_accessor_storage = (__runInitializers(this, _hollowCircle_extraInitializers), __runInitializers(this, _setStrokeColor_initializers, void 0));
        get setStrokeColor() { return this.#setStrokeColor_accessor_storage; }
        set setStrokeColor(value) { this.#setStrokeColor_accessor_storage = value; }
        #setStrokeStyle_accessor_storage = (__runInitializers(this, _setStrokeColor_extraInitializers), __runInitializers(this, _setStrokeStyle_initializers, void 0));
        get setStrokeStyle() { return this.#setStrokeStyle_accessor_storage; }
        set setStrokeStyle(value) { this.#setStrokeStyle_accessor_storage = value; }
        #strokeColor_accessor_storage = (__runInitializers(this, _setStrokeStyle_extraInitializers), __runInitializers(this, _strokeColor_initializers, void 0));
        get strokeColor() { return this.#strokeColor_accessor_storage; }
        set strokeColor(value) { this.#strokeColor_accessor_storage = value; }
        #strokeStyle_accessor_storage = (__runInitializers(this, _strokeColor_extraInitializers), __runInitializers(this, _strokeStyle_initializers, void 0));
        get strokeStyle() { return this.#strokeStyle_accessor_storage; }
        set strokeStyle(value) { this.#strokeStyle_accessor_storage = value; }
        #strokeWidth_accessor_storage = (__runInitializers(this, _strokeStyle_extraInitializers), __runInitializers(this, _strokeWidth_initializers, void 0));
        get strokeWidth() { return this.#strokeWidth_accessor_storage; }
        set strokeWidth(value) { this.#strokeWidth_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _strokeWidth_extraInitializers);
        }
    };
})();
export { StrokeStylePanel };
//# sourceMappingURL=stroke-style-panel.js.map