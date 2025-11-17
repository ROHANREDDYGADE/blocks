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
import { CheckIcon } from '@blocksuite/affine-components/icons';
import { clamp, stopPropagation } from '@blocksuite/affine-shared/utils';
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
const MIN_SIZE = 1;
const MAX_SIZE = 200;
let EdgelessSizePanel = (() => {
    let _classSuper = LitElement;
    let _maxSize_decorators;
    let _maxSize_initializers = [];
    let _maxSize_extraInitializers = [];
    let _minSize_decorators;
    let _minSize_initializers = [];
    let _minSize_extraInitializers = [];
    let _onPopperCose_decorators;
    let _onPopperCose_initializers = [];
    let _onPopperCose_extraInitializers = [];
    let _onSelect_decorators;
    let _onSelect_initializers = [];
    let _onSelect_extraInitializers = [];
    let _size_decorators;
    let _size_initializers = [];
    let _size_extraInitializers = [];
    let _sizeList_decorators;
    let _sizeList_initializers = [];
    let _sizeList_extraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    return class EdgelessSizePanel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _maxSize_decorators = [property({ attribute: false })];
            _minSize_decorators = [property({ attribute: false })];
            _onPopperCose_decorators = [property({ attribute: false })];
            _onSelect_decorators = [property({ attribute: false })];
            _size_decorators = [property({ attribute: false })];
            _sizeList_decorators = [property({ attribute: false })];
            _type_decorators = [property({ attribute: 'data-type' })];
            __esDecorate(this, null, _maxSize_decorators, { kind: "accessor", name: "maxSize", static: false, private: false, access: { has: obj => "maxSize" in obj, get: obj => obj.maxSize, set: (obj, value) => { obj.maxSize = value; } }, metadata: _metadata }, _maxSize_initializers, _maxSize_extraInitializers);
            __esDecorate(this, null, _minSize_decorators, { kind: "accessor", name: "minSize", static: false, private: false, access: { has: obj => "minSize" in obj, get: obj => obj.minSize, set: (obj, value) => { obj.minSize = value; } }, metadata: _metadata }, _minSize_initializers, _minSize_extraInitializers);
            __esDecorate(this, null, _onPopperCose_decorators, { kind: "accessor", name: "onPopperCose", static: false, private: false, access: { has: obj => "onPopperCose" in obj, get: obj => obj.onPopperCose, set: (obj, value) => { obj.onPopperCose = value; } }, metadata: _metadata }, _onPopperCose_initializers, _onPopperCose_extraInitializers);
            __esDecorate(this, null, _onSelect_decorators, { kind: "accessor", name: "onSelect", static: false, private: false, access: { has: obj => "onSelect" in obj, get: obj => obj.onSelect, set: (obj, value) => { obj.onSelect = value; } }, metadata: _metadata }, _onSelect_initializers, _onSelect_extraInitializers);
            __esDecorate(this, null, _size_decorators, { kind: "accessor", name: "size", static: false, private: false, access: { has: obj => "size" in obj, get: obj => obj.size, set: (obj, value) => { obj.size = value; } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
            __esDecorate(this, null, _sizeList_decorators, { kind: "accessor", name: "sizeList", static: false, private: false, access: { has: obj => "sizeList" in obj, get: obj => obj.sizeList, set: (obj, value) => { obj.sizeList = value; } }, metadata: _metadata }, _sizeList_initializers, _sizeList_extraInitializers);
            __esDecorate(this, null, _type_decorators, { kind: "accessor", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
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

    .size-input {
      display: flex;
      align-self: stretch;
      width: 100%;
      border: 0.5px solid var(--affine-border-color);
      border-radius: 8px;
      padding: 4px 8px;
      box-sizing: border-box;
    }

    .size-input::placeholder {
      color: var(--affine-placeholder-color);
    }

    .size-input:focus {
      outline-color: var(--affine-primary-color);
      outline-width: 0.5px;
    }

    :host([data-type='check']) {
      gap: 0;
    }

    :host([data-type='check']) .size-input {
      margin-top: 4px;
    }
  `; }
        _onPopperClose() {
            this.onPopperCose?.();
        }
        _onSelect(size) {
            this.onSelect?.(size);
        }
        render() {
            return html `
      ${repeat(this.sizeList, sizeItem => sizeItem.name, this.renderItem())}

      <input
        class="size-input"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        min="0"
        placeholder=${Math.trunc(this.size)}
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
        renderItem() {
            return this.type === 'normal'
                ? this.renderItemWithNormal
                : this.renderItemWithCheck;
        }
        #maxSize_accessor_storage;
        get maxSize() { return this.#maxSize_accessor_storage; }
        set maxSize(value) { this.#maxSize_accessor_storage = value; }
        #minSize_accessor_storage;
        get minSize() { return this.#minSize_accessor_storage; }
        set minSize(value) { this.#minSize_accessor_storage = value; }
        #onPopperCose_accessor_storage;
        get onPopperCose() { return this.#onPopperCose_accessor_storage; }
        set onPopperCose(value) { this.#onPopperCose_accessor_storage = value; }
        #onSelect_accessor_storage;
        get onSelect() { return this.#onSelect_accessor_storage; }
        set onSelect(value) { this.#onSelect_accessor_storage = value; }
        #size_accessor_storage;
        get size() { return this.#size_accessor_storage; }
        set size(value) { this.#size_accessor_storage = value; }
        #sizeList_accessor_storage;
        get sizeList() { return this.#sizeList_accessor_storage; }
        set sizeList(value) { this.#sizeList_accessor_storage = value; }
        #type_accessor_storage;
        get type() { return this.#type_accessor_storage; }
        set type(value) { this.#type_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._onKeydown = (e) => {
                e.stopPropagation();
                if (e.key === 'Enter' && !e.isComposing) {
                    e.preventDefault();
                    const input = e.target;
                    const size = parseInt(input.value.trim());
                    // Handle edge case where user enters a non-number
                    if (isNaN(size)) {
                        input.value = '';
                        return;
                    }
                    // Handle edge case when user enters a number that is out of range
                    this._onSelect(clamp(size, this.minSize, this.maxSize));
                    input.value = '';
                    this._onPopperClose();
                }
            };
            this.renderItemWithCheck = ({ name, value }) => {
                const active = this.size === value;
                return html `
      <edgeless-tool-icon-button
        .iconContainerPadding=${[4, 8]}
        .justify=${'space-between'}
        .active=${active}
        @click=${() => this._onSelect(value)}
      >
        ${name ?? value} ${active ? CheckIcon : nothing}
      </edgeless-tool-icon-button>
    `;
            };
            this.renderItemWithNormal = ({ name, value }) => {
                return html `
      <edgeless-tool-icon-button
        .iconContainerPadding=${[4, 8]}
        .active=${this.size === value}
        .activeMode=${'background'}
        @click=${() => this._onSelect(value)}
      >
        ${name ?? value}
      </edgeless-tool-icon-button>
    `;
            };
            this.#maxSize_accessor_storage = __runInitializers(this, _maxSize_initializers, MAX_SIZE);
            this.#minSize_accessor_storage = (__runInitializers(this, _maxSize_extraInitializers), __runInitializers(this, _minSize_initializers, MIN_SIZE));
            this.#onPopperCose_accessor_storage = (__runInitializers(this, _minSize_extraInitializers), __runInitializers(this, _onPopperCose_initializers, undefined));
            this.#onSelect_accessor_storage = (__runInitializers(this, _onPopperCose_extraInitializers), __runInitializers(this, _onSelect_initializers, undefined));
            this.#size_accessor_storage = (__runInitializers(this, _onSelect_extraInitializers), __runInitializers(this, _size_initializers, void 0));
            this.#sizeList_accessor_storage = (__runInitializers(this, _size_extraInitializers), __runInitializers(this, _sizeList_initializers, void 0));
            this.#type_accessor_storage = (__runInitializers(this, _sizeList_extraInitializers), __runInitializers(this, _type_initializers, 'normal'));
            __runInitializers(this, _type_extraInitializers);
        }
    };
})();
export { EdgelessSizePanel };
//# sourceMappingURL=size-panel.js.map