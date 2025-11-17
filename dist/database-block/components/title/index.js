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
import { stopPropagation } from '@blocksuite/affine-shared/utils';
import { ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/global/utils';
import { css, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
let DatabaseTitle = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _input_decorators;
    let _input_initializers = [];
    let _input_extraInitializers = [];
    let _isComposing_decorators;
    let _isComposing_initializers = [];
    let _isComposing_extraInitializers = [];
    let _isFocus_decorators;
    let _isFocus_initializers = [];
    let _isFocus_extraInitializers = [];
    let _onPressEnterKey_decorators;
    let _onPressEnterKey_initializers = [];
    let _onPressEnterKey_extraInitializers = [];
    let _readonly_decorators;
    let _readonly_initializers = [];
    let _readonly_extraInitializers = [];
    let _text_decorators;
    let _text_initializers = [];
    let _text_extraInitializers = [];
    let _titleText_decorators;
    let _titleText_initializers = [];
    let _titleText_extraInitializers = [];
    return class DatabaseTitle extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _input_decorators = [query('textarea')];
            _isComposing_decorators = [state()];
            _isFocus_decorators = [state()];
            _onPressEnterKey_decorators = [property({ attribute: false })];
            _readonly_decorators = [property({ attribute: false })];
            _text_decorators = [state()];
            _titleText_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _input_decorators, { kind: "accessor", name: "input", static: false, private: false, access: { has: obj => "input" in obj, get: obj => obj.input, set: (obj, value) => { obj.input = value; } }, metadata: _metadata }, _input_initializers, _input_extraInitializers);
            __esDecorate(this, null, _isComposing_decorators, { kind: "accessor", name: "isComposing", static: false, private: false, access: { has: obj => "isComposing" in obj, get: obj => obj.isComposing, set: (obj, value) => { obj.isComposing = value; } }, metadata: _metadata }, _isComposing_initializers, _isComposing_extraInitializers);
            __esDecorate(this, null, _isFocus_decorators, { kind: "accessor", name: "isFocus", static: false, private: false, access: { has: obj => "isFocus" in obj, get: obj => obj.isFocus, set: (obj, value) => { obj.isFocus = value; } }, metadata: _metadata }, _isFocus_initializers, _isFocus_extraInitializers);
            __esDecorate(this, null, _onPressEnterKey_decorators, { kind: "accessor", name: "onPressEnterKey", static: false, private: false, access: { has: obj => "onPressEnterKey" in obj, get: obj => obj.onPressEnterKey, set: (obj, value) => { obj.onPressEnterKey = value; } }, metadata: _metadata }, _onPressEnterKey_initializers, _onPressEnterKey_extraInitializers);
            __esDecorate(this, null, _readonly_decorators, { kind: "accessor", name: "readonly", static: false, private: false, access: { has: obj => "readonly" in obj, get: obj => obj.readonly, set: (obj, value) => { obj.readonly = value; } }, metadata: _metadata }, _readonly_initializers, _readonly_extraInitializers);
            __esDecorate(this, null, _text_decorators, { kind: "accessor", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(this, null, _titleText_decorators, { kind: "accessor", name: "titleText", static: false, private: false, access: { has: obj => "titleText" in obj, get: obj => obj.titleText, set: (obj, value) => { obj.titleText = value; } }, metadata: _metadata }, _titleText_initializers, _titleText_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .affine-database-title {
      position: relative;
      flex: 1;
      font-family: inherit;
      font-size: 20px;
      line-height: 28px;
      font-weight: 600;
      color: var(--affine-text-primary-color);
      overflow: hidden;
    }

    .affine-database-title textarea {
      font-size: inherit;
      line-height: inherit;
      font-weight: inherit;
      letter-spacing: inherit;
      font-family: inherit;
      border: none;
      background-color: transparent;
      padding: 0;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      outline: none;
      resize: none;
      scrollbar-width: none;
    }

    .affine-database-title .text {
      user-select: none;
      opacity: 0;
      white-space: pre-wrap;
    }

    .affine-database-title[data-title-focus='false'] textarea {
      opacity: 0;
    }

    .affine-database-title[data-title-focus='false'] .text {
      text-overflow: ellipsis;
      overflow: hidden;
      opacity: 1;
      white-space: pre;
    }

    .affine-database-title [data-title-empty='true']::before {
      content: 'Untitled';
      position: absolute;
      pointer-events: none;
      color: var(--affine-text-primary-color);
    }

    .affine-database-title [data-title-focus='true']::before {
      color: var(--affine-placeholder-color);
    }
  `; }
        get database() {
            return this.closest('affine-database');
        }
        connectedCallback() {
            super.connectedCallback();
            requestAnimationFrame(() => {
                this.updateText();
            });
            this.titleText.yText.observe(this.updateText);
            this.disposables.add(() => {
                this.titleText.yText.unobserve(this.updateText);
            });
        }
        render() {
            const isEmpty = !this.text;
            const classList = classMap({
                'affine-database-title': true,
                ellipsis: !this.isFocus,
            });
            const untitledStyle = styleMap({
                height: isEmpty ? 'auto' : 0,
                opacity: isEmpty && !this.isFocus ? 1 : 0,
            });
            return html ` <div
      class="${classList}"
      data-title-empty="${isEmpty}"
      data-title-focus="${this.isFocus}"
    >
      <div class="text" style="${untitledStyle}">Untitled</div>
      <div class="text">${this.text}</div>
      <textarea
        .disabled="${this.readonly}"
        @input="${this.onInput}"
        @keydown="${this.onKeyDown}"
        @copy="${stopPropagation}"
        @paste="${stopPropagation}"
        @focus="${this.onFocus}"
        @blur="${this.onBlur}"
        @compositionend="${this.compositionEnd}"
        data-block-is-database-title="true"
        title="${this.titleText.toString()}"
      ></textarea>
    </div>`;
        }
        #input_accessor_storage;
        get input() { return this.#input_accessor_storage; }
        set input(value) { this.#input_accessor_storage = value; }
        #isComposing_accessor_storage;
        get isComposing() { return this.#isComposing_accessor_storage; }
        set isComposing(value) { this.#isComposing_accessor_storage = value; }
        #isFocus_accessor_storage;
        get isFocus() { return this.#isFocus_accessor_storage; }
        set isFocus(value) { this.#isFocus_accessor_storage = value; }
        #onPressEnterKey_accessor_storage;
        get onPressEnterKey() { return this.#onPressEnterKey_accessor_storage; }
        set onPressEnterKey(value) { this.#onPressEnterKey_accessor_storage = value; }
        #readonly_accessor_storage;
        get readonly() { return this.#readonly_accessor_storage; }
        set readonly(value) { this.#readonly_accessor_storage = value; }
        #text_accessor_storage;
        get text() { return this.#text_accessor_storage; }
        set text(value) { this.#text_accessor_storage = value; }
        #titleText_accessor_storage;
        get titleText() { return this.#titleText_accessor_storage; }
        set titleText(value) { this.#titleText_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this.compositionEnd = () => {
                this.titleText.replace(0, this.titleText.length, this.input.value);
            };
            this.onBlur = () => {
                this.isFocus = false;
            };
            this.onFocus = () => {
                this.isFocus = true;
                if (this.database?.viewSelection$?.value) {
                    this.database?.setSelection(undefined);
                }
            };
            this.onInput = (e) => {
                this.text = this.input.value;
                if (!e.isComposing) {
                    this.titleText.replace(0, this.titleText.length, this.input.value);
                }
            };
            this.onKeyDown = (event) => {
                event.stopPropagation();
                if (event.key === 'Enter' && !event.isComposing) {
                    event.preventDefault();
                    this.onPressEnterKey?.();
                    return;
                }
            };
            this.updateText = () => {
                if (!this.isFocus) {
                    this.input.value = this.titleText.toString();
                    this.text = this.input.value;
                }
            };
            this.#input_accessor_storage = __runInitializers(this, _input_initializers, void 0);
            this.#isComposing_accessor_storage = (__runInitializers(this, _input_extraInitializers), __runInitializers(this, _isComposing_initializers, false));
            this.#isFocus_accessor_storage = (__runInitializers(this, _isComposing_extraInitializers), __runInitializers(this, _isFocus_initializers, false));
            this.#onPressEnterKey_accessor_storage = (__runInitializers(this, _isFocus_extraInitializers), __runInitializers(this, _onPressEnterKey_initializers, undefined));
            this.#readonly_accessor_storage = (__runInitializers(this, _onPressEnterKey_extraInitializers), __runInitializers(this, _readonly_initializers, void 0));
            this.#text_accessor_storage = (__runInitializers(this, _readonly_extraInitializers), __runInitializers(this, _text_initializers, ''));
            this.#titleText_accessor_storage = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _titleText_initializers, void 0));
            __runInitializers(this, _titleText_extraInitializers);
        }
    };
})();
export { DatabaseTitle };
//# sourceMappingURL=index.js.map