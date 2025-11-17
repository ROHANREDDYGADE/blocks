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
import { ArrowDownIcon } from '@blocksuite/affine-components/icons';
import { unsafeCSSVarV2 } from '@blocksuite/affine-shared/theme';
import { noop, SignalWatcher, WithDisposable } from '@blocksuite/global/utils';
import { css, LitElement, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { html } from 'lit/static-html.js';
import { showPopFilterableList, } from '../../../../_common/components/filterable-list/index.js';
let LanguageListButton = (() => {
    let _classSuper = WithDisposable(SignalWatcher(LitElement));
    let __langButton_decorators;
    let __langButton_initializers = [];
    let __langButton_extraInitializers = [];
    let _blockComponent_decorators;
    let _blockComponent_initializers = [];
    let _blockComponent_extraInitializers = [];
    let _onActiveStatusChange_decorators;
    let _onActiveStatusChange_initializers = [];
    let _onActiveStatusChange_extraInitializers = [];
    return class LanguageListButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __langButton_decorators = [query('.lang-button')];
            _blockComponent_decorators = [property({ attribute: false })];
            _onActiveStatusChange_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __langButton_decorators, { kind: "accessor", name: "_langButton", static: false, private: false, access: { has: obj => "_langButton" in obj, get: obj => obj._langButton, set: (obj, value) => { obj._langButton = value; } }, metadata: _metadata }, __langButton_initializers, __langButton_extraInitializers);
            __esDecorate(this, null, _blockComponent_decorators, { kind: "accessor", name: "blockComponent", static: false, private: false, access: { has: obj => "blockComponent" in obj, get: obj => obj.blockComponent, set: (obj, value) => { obj.blockComponent = value; } }, metadata: _metadata }, _blockComponent_initializers, _blockComponent_extraInitializers);
            __esDecorate(this, null, _onActiveStatusChange_decorators, { kind: "accessor", name: "onActiveStatusChange", static: false, private: false, access: { has: obj => "onActiveStatusChange" in obj, get: obj => obj.onActiveStatusChange, set: (obj, value) => { obj.onActiveStatusChange = value; } }, metadata: _metadata }, _onActiveStatusChange_initializers, _onActiveStatusChange_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .lang-button {
      background-color: var(--affine-background-primary-color);
      box-shadow: var(--affine-shadow-1);
      display: flex;
      gap: 4px;
      padding: 2px 4px;
    }

    .lang-button:hover {
      background: var(--affine-hover-color-filled);
    }

    .lang-button[hover] {
      background: var(--affine-hover-color-filled);
    }

    .lang-button-icon {
      display: flex;
      align-items: center;
      color: ${unsafeCSSVarV2('icon/primary')};

      svg {
        height: 16px;
        width: 16px;
      }
    }
  `; }
        connectedCallback() {
            super.connectedCallback();
            const langList = localStorage.getItem('blocksuite:code-block:lang-list');
            if (langList) {
                this._sortedBundledLanguages = JSON.parse(langList);
            }
            else {
                this._sortedBundledLanguages = this.blockComponent.service.langs.map(lang => ({
                    label: lang.name,
                    name: lang.id,
                    aliases: lang.aliases,
                }));
            }
            this.disposables.add(() => {
                localStorage.setItem('blocksuite:code-block:lang-list', JSON.stringify(this._sortedBundledLanguages));
            });
        }
        render() {
            const textStyles = styleMap({
                fontFamily: 'Inter',
                fontSize: 'var(--affine-font-xs)',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '20px',
                padding: '0 4px',
            });
            return html `<icon-button
      class="lang-button"
      data-testid="lang-button"
      width="auto"
      .text=${html `<div style=${textStyles}>
        ${this.blockComponent.languageName$.value}
      </div>`}
      height="24px"
      @click=${this._clickLangBtn}
      ?disabled=${this.blockComponent.doc.readonly}
    >
      <span class="lang-button-icon" slot="suffix">
        ${!this.blockComponent.doc.readonly ? ArrowDownIcon : nothing}
      </span>
    </icon-button> `;
        }
        #_langButton_accessor_storage;
        get _langButton() { return this.#_langButton_accessor_storage; }
        set _langButton(value) { this.#_langButton_accessor_storage = value; }
        #blockComponent_accessor_storage;
        get blockComponent() { return this.#blockComponent_accessor_storage; }
        set blockComponent(value) { this.#blockComponent_accessor_storage = value; }
        #onActiveStatusChange_accessor_storage;
        get onActiveStatusChange() { return this.#onActiveStatusChange_accessor_storage; }
        set onActiveStatusChange(value) { this.#onActiveStatusChange_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._clickLangBtn = () => {
                if (this.blockComponent.doc.readonly)
                    return;
                if (this._abortController) {
                    // Close the language list if it's already opened.
                    this._abortController.abort();
                    return;
                }
                this._abortController = new AbortController();
                this._abortController.signal.addEventListener('abort', () => {
                    this.onActiveStatusChange(false);
                    this._abortController = undefined;
                });
                this.onActiveStatusChange(true);
                const options = {
                    placeholder: 'Search for a language',
                    onSelect: item => {
                        const sortedBundledLanguages = this._sortedBundledLanguages;
                        const index = sortedBundledLanguages.indexOf(item);
                        if (index !== -1) {
                            sortedBundledLanguages.splice(index, 1);
                            sortedBundledLanguages.unshift(item);
                        }
                        this.blockComponent.doc.transact(() => {
                            this.blockComponent.model.language$.value = item.name;
                        });
                    },
                    active: item => item.name === this.blockComponent.model.language,
                    items: this._sortedBundledLanguages,
                };
                showPopFilterableList({
                    options,
                    referenceElement: this._langButton,
                    container: this.blockComponent.host,
                    abortController: this._abortController,
                    // stacking-context(editor-host)
                    portalStyles: {
                        zIndex: 'var(--affine-z-index-popover)',
                    },
                });
            };
            this._sortedBundledLanguages = [];
            this.#_langButton_accessor_storage = __runInitializers(this, __langButton_initializers, void 0);
            this.#blockComponent_accessor_storage = (__runInitializers(this, __langButton_extraInitializers), __runInitializers(this, _blockComponent_initializers, void 0));
            this.#onActiveStatusChange_accessor_storage = (__runInitializers(this, _blockComponent_extraInitializers), __runInitializers(this, _onActiveStatusChange_initializers, noop));
            __runInitializers(this, _onActiveStatusChange_extraInitializers);
        }
    };
})();
export { LanguageListButton };
//# sourceMappingURL=lang-button.js.map