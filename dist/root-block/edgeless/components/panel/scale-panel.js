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
import { clamp, stopPropagation } from '@blocksuite/affine-shared/utils';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
const MIN_SCALE = 0;
const MAX_SCALE = 400;
const SCALE_LIST = [50, 100, 200];
function format(scale) {
    return `${scale}%`;
}
let EdgelessScalePanel = (() => {
    let _classSuper = LitElement;
    let _maxScale_decorators;
    let _maxScale_initializers = [];
    let _maxScale_extraInitializers = [];
    let _minScale_decorators;
    let _minScale_initializers = [];
    let _minScale_extraInitializers = [];
    let _onPopperCose_decorators;
    let _onPopperCose_initializers = [];
    let _onPopperCose_extraInitializers = [];
    let _onSelect_decorators;
    let _onSelect_initializers = [];
    let _onSelect_extraInitializers = [];
    let _scale_decorators;
    let _scale_initializers = [];
    let _scale_extraInitializers = [];
    let _scaleList_decorators;
    let _scaleList_initializers = [];
    let _scaleList_extraInitializers = [];
    return class EdgelessScalePanel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _maxScale_decorators = [property({ attribute: false })];
            _minScale_decorators = [property({ attribute: false })];
            _onPopperCose_decorators = [property({ attribute: false })];
            _onSelect_decorators = [property({ attribute: false })];
            _scale_decorators = [property({ attribute: false })];
            _scaleList_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _maxScale_decorators, { kind: "accessor", name: "maxScale", static: false, private: false, access: { has: obj => "maxScale" in obj, get: obj => obj.maxScale, set: (obj, value) => { obj.maxScale = value; } }, metadata: _metadata }, _maxScale_initializers, _maxScale_extraInitializers);
            __esDecorate(this, null, _minScale_decorators, { kind: "accessor", name: "minScale", static: false, private: false, access: { has: obj => "minScale" in obj, get: obj => obj.minScale, set: (obj, value) => { obj.minScale = value; } }, metadata: _metadata }, _minScale_initializers, _minScale_extraInitializers);
            __esDecorate(this, null, _onPopperCose_decorators, { kind: "accessor", name: "onPopperCose", static: false, private: false, access: { has: obj => "onPopperCose" in obj, get: obj => obj.onPopperCose, set: (obj, value) => { obj.onPopperCose = value; } }, metadata: _metadata }, _onPopperCose_initializers, _onPopperCose_extraInitializers);
            __esDecorate(this, null, _onSelect_decorators, { kind: "accessor", name: "onSelect", static: false, private: false, access: { has: obj => "onSelect" in obj, get: obj => obj.onSelect, set: (obj, value) => { obj.onSelect = value; } }, metadata: _metadata }, _onSelect_initializers, _onSelect_extraInitializers);
            __esDecorate(this, null, _scale_decorators, { kind: "accessor", name: "scale", static: false, private: false, access: { has: obj => "scale" in obj, get: obj => obj.scale, set: (obj, value) => { obj.scale = value; } }, metadata: _metadata }, _scale_initializers, _scale_extraInitializers);
            __esDecorate(this, null, _scaleList_decorators, { kind: "accessor", name: "scaleList", static: false, private: false, access: { has: obj => "scaleList" in obj, get: obj => obj.scaleList, set: (obj, value) => { obj.scaleList = value; } }, metadata: _metadata }, _scaleList_initializers, _scaleList_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      width: 68px;
    }

    edgeless-tool-icon-button {
      align-self: stretch;
    }

    .scale-input {
      display: flx;
      align-self: stretch;
      border: 0.5px solid var(--affine-border-color);
      border-radius: 8px;
      padding: 4px 8px;
      box-sizing: border-box;
    }

    .scale-input::placeholder {
      color: var(--affine-placeholder-color);
    }

    .scale-input:focus {
      outline-color: var(--affine-primary-color);
      outline-width: 0.5px;
    }
  `; }
        _onPopperClose() {
            this.onPopperCose?.();
        }
        _onSelect(scale) {
            this.onSelect?.(scale / 100);
        }
        render() {
            return html `
      ${repeat(this.scaleList, scale => scale, scale => {
                const classes = `scale-${scale}`;
                return html `<edgeless-tool-icon-button
            class=${classes}
            .iconContainerPadding=${[4, 8]}
            .activeMode=${'background'}
            .active=${this.scale === scale}
            @click=${() => this._onSelect(scale)}
          >
            ${format(scale)}
          </edgeless-tool-icon-button>`;
            })}

      <input
        class="scale-input"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        min="0"
        placeholder=${format(Math.trunc(this.scale))}
        @keydown=${this._onKeydown}
        @input=${stopPropagation}
        @click=${stopPropagation}
        @pointerdown=${stopPropagation}
        @cut=${stopPropagation}
        @copy=${stopPropagation}
        @paste=${stopPropagation}
      />
    `;
        }
        #maxScale_accessor_storage;
        get maxScale() { return this.#maxScale_accessor_storage; }
        set maxScale(value) { this.#maxScale_accessor_storage = value; }
        #minScale_accessor_storage;
        get minScale() { return this.#minScale_accessor_storage; }
        set minScale(value) { this.#minScale_accessor_storage = value; }
        #onPopperCose_accessor_storage;
        get onPopperCose() { return this.#onPopperCose_accessor_storage; }
        set onPopperCose(value) { this.#onPopperCose_accessor_storage = value; }
        #onSelect_accessor_storage;
        get onSelect() { return this.#onSelect_accessor_storage; }
        set onSelect(value) { this.#onSelect_accessor_storage = value; }
        #scale_accessor_storage;
        get scale() { return this.#scale_accessor_storage; }
        set scale(value) { this.#scale_accessor_storage = value; }
        #scaleList_accessor_storage;
        get scaleList() { return this.#scaleList_accessor_storage; }
        set scaleList(value) { this.#scaleList_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._onKeydown = (e) => {
                e.stopPropagation();
                if (e.key === 'Enter' && !e.isComposing) {
                    e.preventDefault();
                    const input = e.target;
                    const scale = parseInt(input.value.trim());
                    // Handle edge case where user enters a non-number
                    if (isNaN(scale)) {
                        input.value = '';
                        return;
                    }
                    // Handle edge case when user enters a number that is out of range
                    this._onSelect(clamp(scale, this.minScale, this.maxScale));
                    input.value = '';
                    this._onPopperClose();
                }
            };
            this.#maxScale_accessor_storage = __runInitializers(this, _maxScale_initializers, MAX_SCALE);
            this.#minScale_accessor_storage = (__runInitializers(this, _maxScale_extraInitializers), __runInitializers(this, _minScale_initializers, MIN_SCALE));
            this.#onPopperCose_accessor_storage = (__runInitializers(this, _minScale_extraInitializers), __runInitializers(this, _onPopperCose_initializers, undefined));
            this.#onSelect_accessor_storage = (__runInitializers(this, _onPopperCose_extraInitializers), __runInitializers(this, _onSelect_initializers, undefined));
            this.#scale_accessor_storage = (__runInitializers(this, _onSelect_extraInitializers), __runInitializers(this, _scale_initializers, void 0));
            this.#scaleList_accessor_storage = (__runInitializers(this, _scale_extraInitializers), __runInitializers(this, _scaleList_initializers, SCALE_LIST));
            __runInitializers(this, _scaleList_extraInitializers);
        }
    };
})();
export { EdgelessScalePanel };
//# sourceMappingURL=scale-panel.js.map