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
import { FrameOrderAdjustmentIcon } from '@blocksuite/affine-components/icons';
import { createButtonPopper } from '@blocksuite/affine-shared/utils';
import { WithDisposable } from '@blocksuite/global/utils';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
let EdgelessFrameOrderButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __edgelessFrameOrderButton_decorators;
    let __edgelessFrameOrderButton_initializers = [];
    let __edgelessFrameOrderButton_extraInitializers = [];
    let __edgelessFrameOrderMenu_decorators;
    let __edgelessFrameOrderMenu_initializers = [];
    let __edgelessFrameOrderMenu_extraInitializers = [];
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _frames_decorators;
    let _frames_initializers = [];
    let _frames_extraInitializers = [];
    let _popperShow_decorators;
    let _popperShow_initializers = [];
    let _popperShow_extraInitializers = [];
    let _setPopperShow_decorators;
    let _setPopperShow_initializers = [];
    let _setPopperShow_extraInitializers = [];
    return class EdgelessFrameOrderButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __edgelessFrameOrderButton_decorators = [query('.edgeless-frame-order-button')];
            __edgelessFrameOrderMenu_decorators = [query('edgeless-frame-order-menu')];
            _edgeless_decorators = [property({ attribute: false })];
            _frames_decorators = [property({ attribute: false })];
            _popperShow_decorators = [property({ attribute: false })];
            _setPopperShow_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __edgelessFrameOrderButton_decorators, { kind: "accessor", name: "_edgelessFrameOrderButton", static: false, private: false, access: { has: obj => "_edgelessFrameOrderButton" in obj, get: obj => obj._edgelessFrameOrderButton, set: (obj, value) => { obj._edgelessFrameOrderButton = value; } }, metadata: _metadata }, __edgelessFrameOrderButton_initializers, __edgelessFrameOrderButton_extraInitializers);
            __esDecorate(this, null, __edgelessFrameOrderMenu_decorators, { kind: "accessor", name: "_edgelessFrameOrderMenu", static: false, private: false, access: { has: obj => "_edgelessFrameOrderMenu" in obj, get: obj => obj._edgelessFrameOrderMenu, set: (obj, value) => { obj._edgelessFrameOrderMenu = value; } }, metadata: _metadata }, __edgelessFrameOrderMenu_initializers, __edgelessFrameOrderMenu_extraInitializers);
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _frames_decorators, { kind: "accessor", name: "frames", static: false, private: false, access: { has: obj => "frames" in obj, get: obj => obj.frames, set: (obj, value) => { obj.frames = value; } }, metadata: _metadata }, _frames_initializers, _frames_extraInitializers);
            __esDecorate(this, null, _popperShow_decorators, { kind: "accessor", name: "popperShow", static: false, private: false, access: { has: obj => "popperShow" in obj, get: obj => obj.popperShow, set: (obj, value) => { obj.popperShow = value; } }, metadata: _metadata }, _popperShow_initializers, _popperShow_extraInitializers);
            __esDecorate(this, null, _setPopperShow_decorators, { kind: "accessor", name: "setPopperShow", static: false, private: false, access: { has: obj => "setPopperShow" in obj, get: obj => obj.setPopperShow, set: (obj, value) => { obj.setPopperShow = value; } }, metadata: _metadata }, _setPopperShow_initializers, _setPopperShow_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    edgeless-frame-order-menu {
      display: none;
    }

    edgeless-frame-order-menu[data-show] {
      display: initial;
    }
  `; }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._edgelessFrameOrderPopper?.dispose();
        }
        firstUpdated() {
            this._edgelessFrameOrderPopper = createButtonPopper(this._edgelessFrameOrderButton, this._edgelessFrameOrderMenu, ({ display }) => this.setPopperShow(display === 'show'), {
                mainAxis: 22,
            });
        }
        render() {
            const { readonly } = this.edgeless.doc;
            return html `
      <style>
        .edgeless-frame-order-button svg {
          color: ${readonly ? 'var(--affine-text-disable-color)' : 'inherit'};
        }
      </style>
      <edgeless-tool-icon-button
        class="edgeless-frame-order-button"
        .tooltip=${this.popperShow ? '' : 'Frame Order'}
        @click=${() => {
                if (readonly)
                    return;
                this._edgelessFrameOrderPopper?.toggle();
            }}
        .iconContainerPadding=${0}
      >
        ${FrameOrderAdjustmentIcon}
      </edgeless-tool-icon-button>
      <edgeless-frame-order-menu .edgeless=${this.edgeless}>
      </edgeless-frame-order-menu>
    `;
        }
        #_edgelessFrameOrderButton_accessor_storage;
        get _edgelessFrameOrderButton() { return this.#_edgelessFrameOrderButton_accessor_storage; }
        set _edgelessFrameOrderButton(value) { this.#_edgelessFrameOrderButton_accessor_storage = value; }
        #_edgelessFrameOrderMenu_accessor_storage;
        get _edgelessFrameOrderMenu() { return this.#_edgelessFrameOrderMenu_accessor_storage; }
        set _edgelessFrameOrderMenu(value) { this.#_edgelessFrameOrderMenu_accessor_storage = value; }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #frames_accessor_storage;
        get frames() { return this.#frames_accessor_storage; }
        set frames(value) { this.#frames_accessor_storage = value; }
        #popperShow_accessor_storage;
        get popperShow() { return this.#popperShow_accessor_storage; }
        set popperShow(value) { this.#popperShow_accessor_storage = value; }
        #setPopperShow_accessor_storage;
        get setPopperShow() { return this.#setPopperShow_accessor_storage; }
        set setPopperShow(value) { this.#setPopperShow_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._edgelessFrameOrderPopper = null;
            this.#_edgelessFrameOrderButton_accessor_storage = __runInitializers(this, __edgelessFrameOrderButton_initializers, void 0);
            this.#_edgelessFrameOrderMenu_accessor_storage = (__runInitializers(this, __edgelessFrameOrderButton_extraInitializers), __runInitializers(this, __edgelessFrameOrderMenu_initializers, void 0));
            this.#edgeless_accessor_storage = (__runInitializers(this, __edgelessFrameOrderMenu_extraInitializers), __runInitializers(this, _edgeless_initializers, void 0));
            this.#frames_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _frames_initializers, void 0));
            this.#popperShow_accessor_storage = (__runInitializers(this, _frames_extraInitializers), __runInitializers(this, _popperShow_initializers, false));
            this.#setPopperShow_accessor_storage = (__runInitializers(this, _popperShow_extraInitializers), __runInitializers(this, _setPopperShow_initializers, () => { }));
            __runInitializers(this, _setPopperShow_extraInitializers);
        }
    };
})();
export { EdgelessFrameOrderButton };
//# sourceMappingURL=frame-order-button.js.map