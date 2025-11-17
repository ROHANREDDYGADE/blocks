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
import { MoreVerticalIcon } from '@blocksuite/affine-components/icons';
import { createLitPortal } from '@blocksuite/affine-components/portal';
import { renderGroups } from '@blocksuite/affine-components/toolbar';
import { assertExists, noop, WithDisposable } from '@blocksuite/global/utils';
import { flip, offset } from '@floating-ui/dom';
import { css, html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
let AffineCodeToolbar = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __moreButton_decorators;
    let __moreButton_initializers = [];
    let __moreButton_extraInitializers = [];
    let __moreMenuOpen_decorators;
    let __moreMenuOpen_initializers = [];
    let __moreMenuOpen_extraInitializers = [];
    let _context_decorators;
    let _context_initializers = [];
    let _context_extraInitializers = [];
    let _moreGroups_decorators;
    let _moreGroups_initializers = [];
    let _moreGroups_extraInitializers = [];
    let _onActiveStatusChange_decorators;
    let _onActiveStatusChange_initializers = [];
    let _onActiveStatusChange_extraInitializers = [];
    let _primaryGroups_decorators;
    let _primaryGroups_initializers = [];
    let _primaryGroups_extraInitializers = [];
    return class AffineCodeToolbar extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __moreButton_decorators = [query('.code-toolbar-button.more')];
            __moreMenuOpen_decorators = [state()];
            _context_decorators = [property({ attribute: false })];
            _moreGroups_decorators = [property({ attribute: false })];
            _onActiveStatusChange_decorators = [property({ attribute: false })];
            _primaryGroups_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __moreButton_decorators, { kind: "accessor", name: "_moreButton", static: false, private: false, access: { has: obj => "_moreButton" in obj, get: obj => obj._moreButton, set: (obj, value) => { obj._moreButton = value; } }, metadata: _metadata }, __moreButton_initializers, __moreButton_extraInitializers);
            __esDecorate(this, null, __moreMenuOpen_decorators, { kind: "accessor", name: "_moreMenuOpen", static: false, private: false, access: { has: obj => "_moreMenuOpen" in obj, get: obj => obj._moreMenuOpen, set: (obj, value) => { obj._moreMenuOpen = value; } }, metadata: _metadata }, __moreMenuOpen_initializers, __moreMenuOpen_extraInitializers);
            __esDecorate(this, null, _context_decorators, { kind: "accessor", name: "context", static: false, private: false, access: { has: obj => "context" in obj, get: obj => obj.context, set: (obj, value) => { obj.context = value; } }, metadata: _metadata }, _context_initializers, _context_extraInitializers);
            __esDecorate(this, null, _moreGroups_decorators, { kind: "accessor", name: "moreGroups", static: false, private: false, access: { has: obj => "moreGroups" in obj, get: obj => obj.moreGroups, set: (obj, value) => { obj.moreGroups = value; } }, metadata: _metadata }, _moreGroups_initializers, _moreGroups_extraInitializers);
            __esDecorate(this, null, _onActiveStatusChange_decorators, { kind: "accessor", name: "onActiveStatusChange", static: false, private: false, access: { has: obj => "onActiveStatusChange" in obj, get: obj => obj.onActiveStatusChange, set: (obj, value) => { obj.onActiveStatusChange = value; } }, metadata: _metadata }, _onActiveStatusChange_initializers, _onActiveStatusChange_extraInitializers);
            __esDecorate(this, null, _primaryGroups_decorators, { kind: "accessor", name: "primaryGroups", static: false, private: false, access: { has: obj => "primaryGroups" in obj, get: obj => obj.primaryGroups, set: (obj, value) => { obj.primaryGroups = value; } }, metadata: _metadata }, _primaryGroups_initializers, _primaryGroups_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      position: absolute;
      top: 0;
      right: 0;
    }

    .code-toolbar-container {
      height: 24px;
      gap: 4px;
      padding: 4px;
      margin: 0;
    }

    .code-toolbar-button {
      color: var(--affine-icon-color);
      background-color: var(--affine-background-primary-color);
      box-shadow: var(--affine-shadow-1);
      border-radius: 4px;
    }
  `; }
        _toggleMoreMenu() {
            if (this._currentOpenMenu &&
                !this._currentOpenMenu.signal.aborted &&
                this._currentOpenMenu === this._popMenuAbortController) {
                this.closeCurrentMenu();
                this._moreMenuOpen = false;
                return;
            }
            this.closeCurrentMenu();
            this._popMenuAbortController = new AbortController();
            this._popMenuAbortController.signal.addEventListener('abort', () => {
                this._moreMenuOpen = false;
                this.onActiveStatusChange(false);
            });
            this.onActiveStatusChange(true);
            this._currentOpenMenu = this._popMenuAbortController;
            assertExists(this._moreButton);
            createLitPortal({
                template: html `
        <editor-menu-content
          data-show
          class="more-popup-menu"
          style=${styleMap({
                    '--content-padding': '8px',
                    '--packed-height': '4px',
                })}
        >
          <div data-size="large" data-orientation="vertical">
            ${renderGroups(this.moreGroups, this.context)}
          </div>
        </editor-menu-content>
      `,
                // should be greater than block-selection z-index as selection and popover wil share the same stacking context(editor-host)
                portalStyles: {
                    zIndex: 'var(--affine-z-index-popover)',
                },
                container: this.context.host,
                computePosition: {
                    referenceElement: this._moreButton,
                    placement: 'bottom-start',
                    middleware: [flip(), offset(4)],
                    autoUpdate: { animationFrame: true },
                },
                abortController: this._popMenuAbortController,
                closeOnClickAway: true,
            });
            this._moreMenuOpen = true;
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.closeCurrentMenu();
        }
        render() {
            return html `
      <editor-toolbar class="code-toolbar-container" data-without-bg>
        ${renderGroups(this.primaryGroups, this.context)}
        <editor-icon-button
          class="code-toolbar-button more"
          data-testid="more"
          aria-label="More"
          .tooltip=${'More'}
          .tooltipOffset=${4}
          .iconSize=${'16px'}
          .iconContainerPadding=${4}
          .showTooltip=${!this._moreMenuOpen}
          ?disabled=${this.context.doc.readonly}
          @click=${() => this._toggleMoreMenu()}
        >
          ${MoreVerticalIcon}
        </editor-icon-button>
      </editor-toolbar>
    `;
        }
        #_moreButton_accessor_storage;
        get _moreButton() { return this.#_moreButton_accessor_storage; }
        set _moreButton(value) { this.#_moreButton_accessor_storage = value; }
        #_moreMenuOpen_accessor_storage;
        get _moreMenuOpen() { return this.#_moreMenuOpen_accessor_storage; }
        set _moreMenuOpen(value) { this.#_moreMenuOpen_accessor_storage = value; }
        #context_accessor_storage;
        get context() { return this.#context_accessor_storage; }
        set context(value) { this.#context_accessor_storage = value; }
        #moreGroups_accessor_storage;
        get moreGroups() { return this.#moreGroups_accessor_storage; }
        set moreGroups(value) { this.#moreGroups_accessor_storage = value; }
        #onActiveStatusChange_accessor_storage;
        get onActiveStatusChange() { return this.#onActiveStatusChange_accessor_storage; }
        set onActiveStatusChange(value) { this.#onActiveStatusChange_accessor_storage = value; }
        #primaryGroups_accessor_storage;
        get primaryGroups() { return this.#primaryGroups_accessor_storage; }
        set primaryGroups(value) { this.#primaryGroups_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._currentOpenMenu = null;
            this._popMenuAbortController = null;
            this.closeCurrentMenu = () => {
                if (this._currentOpenMenu && !this._currentOpenMenu.signal.aborted) {
                    this._currentOpenMenu.abort();
                    this._currentOpenMenu = null;
                }
            };
            this.#_moreButton_accessor_storage = __runInitializers(this, __moreButton_initializers, void 0);
            this.#_moreMenuOpen_accessor_storage = (__runInitializers(this, __moreButton_extraInitializers), __runInitializers(this, __moreMenuOpen_initializers, false));
            this.#context_accessor_storage = (__runInitializers(this, __moreMenuOpen_extraInitializers), __runInitializers(this, _context_initializers, void 0));
            this.#moreGroups_accessor_storage = (__runInitializers(this, _context_extraInitializers), __runInitializers(this, _moreGroups_initializers, void 0));
            this.#onActiveStatusChange_accessor_storage = (__runInitializers(this, _moreGroups_extraInitializers), __runInitializers(this, _onActiveStatusChange_initializers, noop));
            this.#primaryGroups_accessor_storage = (__runInitializers(this, _onActiveStatusChange_extraInitializers), __runInitializers(this, _primaryGroups_initializers, void 0));
            __runInitializers(this, _primaryGroups_extraInitializers);
        }
    };
})();
export { AffineCodeToolbar };
//# sourceMappingURL=code-toolbar.js.map