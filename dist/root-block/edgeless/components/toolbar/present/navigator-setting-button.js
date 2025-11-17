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
import { NavigatorSettingsIcon } from '@blocksuite/affine-components/icons';
import { EditPropsStore } from '@blocksuite/affine-shared/services';
import { createButtonPopper } from '@blocksuite/affine-shared/utils';
import { WithDisposable } from '@blocksuite/global/utils';
import { css, html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
let EdgelessNavigatorSettingButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __navigatorSettingButton_decorators;
    let __navigatorSettingButton_initializers = [];
    let __navigatorSettingButton_extraInitializers = [];
    let __navigatorSettingMenu_decorators;
    let __navigatorSettingMenu_initializers = [];
    let __navigatorSettingMenu_extraInitializers = [];
    let _blackBackground_decorators;
    let _blackBackground_initializers = [];
    let _blackBackground_extraInitializers = [];
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _hideToolbar_decorators;
    let _hideToolbar_initializers = [];
    let _hideToolbar_extraInitializers = [];
    let _includeFrameOrder_decorators;
    let _includeFrameOrder_initializers = [];
    let _includeFrameOrder_extraInitializers = [];
    let _onHideToolbarChange_decorators;
    let _onHideToolbarChange_initializers = [];
    let _onHideToolbarChange_extraInitializers = [];
    let _popperShow_decorators;
    let _popperShow_initializers = [];
    let _popperShow_extraInitializers = [];
    let _setPopperShow_decorators;
    let _setPopperShow_initializers = [];
    let _setPopperShow_extraInitializers = [];
    return class EdgelessNavigatorSettingButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __navigatorSettingButton_decorators = [query('.navigator-setting-button')];
            __navigatorSettingMenu_decorators = [query('.navigator-setting-menu')];
            _blackBackground_decorators = [state()];
            _edgeless_decorators = [property({ attribute: false })];
            _hideToolbar_decorators = [property({ attribute: false })];
            _includeFrameOrder_decorators = [property({ attribute: false })];
            _onHideToolbarChange_decorators = [property({ attribute: false })];
            _popperShow_decorators = [property({ attribute: false })];
            _setPopperShow_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __navigatorSettingButton_decorators, { kind: "accessor", name: "_navigatorSettingButton", static: false, private: false, access: { has: obj => "_navigatorSettingButton" in obj, get: obj => obj._navigatorSettingButton, set: (obj, value) => { obj._navigatorSettingButton = value; } }, metadata: _metadata }, __navigatorSettingButton_initializers, __navigatorSettingButton_extraInitializers);
            __esDecorate(this, null, __navigatorSettingMenu_decorators, { kind: "accessor", name: "_navigatorSettingMenu", static: false, private: false, access: { has: obj => "_navigatorSettingMenu" in obj, get: obj => obj._navigatorSettingMenu, set: (obj, value) => { obj._navigatorSettingMenu = value; } }, metadata: _metadata }, __navigatorSettingMenu_initializers, __navigatorSettingMenu_extraInitializers);
            __esDecorate(this, null, _blackBackground_decorators, { kind: "accessor", name: "blackBackground", static: false, private: false, access: { has: obj => "blackBackground" in obj, get: obj => obj.blackBackground, set: (obj, value) => { obj.blackBackground = value; } }, metadata: _metadata }, _blackBackground_initializers, _blackBackground_extraInitializers);
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _hideToolbar_decorators, { kind: "accessor", name: "hideToolbar", static: false, private: false, access: { has: obj => "hideToolbar" in obj, get: obj => obj.hideToolbar, set: (obj, value) => { obj.hideToolbar = value; } }, metadata: _metadata }, _hideToolbar_initializers, _hideToolbar_extraInitializers);
            __esDecorate(this, null, _includeFrameOrder_decorators, { kind: "accessor", name: "includeFrameOrder", static: false, private: false, access: { has: obj => "includeFrameOrder" in obj, get: obj => obj.includeFrameOrder, set: (obj, value) => { obj.includeFrameOrder = value; } }, metadata: _metadata }, _includeFrameOrder_initializers, _includeFrameOrder_extraInitializers);
            __esDecorate(this, null, _onHideToolbarChange_decorators, { kind: "accessor", name: "onHideToolbarChange", static: false, private: false, access: { has: obj => "onHideToolbarChange" in obj, get: obj => obj.onHideToolbarChange, set: (obj, value) => { obj.onHideToolbarChange = value; } }, metadata: _metadata }, _onHideToolbarChange_initializers, _onHideToolbarChange_extraInitializers);
            __esDecorate(this, null, _popperShow_decorators, { kind: "accessor", name: "popperShow", static: false, private: false, access: { has: obj => "popperShow" in obj, get: obj => obj.popperShow, set: (obj, value) => { obj.popperShow = value; } }, metadata: _metadata }, _popperShow_initializers, _popperShow_extraInitializers);
            __esDecorate(this, null, _setPopperShow_decorators, { kind: "accessor", name: "setPopperShow", static: false, private: false, access: { has: obj => "setPopperShow" in obj, get: obj => obj.setPopperShow, set: (obj, value) => { obj.setPopperShow = value; } }, metadata: _metadata }, _setPopperShow_initializers, _setPopperShow_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .navigator-setting-menu {
      display: none;
      padding: 8px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      background-color: var(--affine-background-overlay-panel-color);
      box-shadow: var(--affine-menu-shadow);
      color: var(--affine-text-primary-color);
    }

    .navigator-setting-menu[data-show] {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .item-container {
      padding: 4px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 264px;
      width: 100%;
      box-sizing: border-box;
    }
    .item-container.header {
      height: 34px;
    }

    .text {
      padding: 0px 4px;
      line-height: 22px;
      font-size: var(--affine-font-sm);
      color: var(--affine-text-primary-color);
    }

    .text.title {
      font-weight: 500;
      line-height: 20px;
      font-size: var(--affine-font-xs);
      color: var(--affine-text-secondary-color);
    }

    .divider {
      width: 100%;
      height: 16px;
      display: flex;
      align-items: center;
    }
    .divider::before {
      content: '';
      width: 100%;
      height: 1px;
      background: var(--affine-border-color);
    }
  `; }
        _tryRestoreSettings() {
            const blackBackground = this.edgeless.std
                .get(EditPropsStore)
                .getStorage('presentBlackBackground');
            this.blackBackground = blackBackground ?? true;
        }
        connectedCallback() {
            super.connectedCallback();
            this._tryRestoreSettings();
        }
        disconnectedCallback() {
            this._navigatorSettingPopper?.dispose();
            this._navigatorSettingPopper = null;
        }
        firstUpdated() {
            this._navigatorSettingPopper = createButtonPopper(this._navigatorSettingButton, this._navigatorSettingMenu, ({ display }) => this.setPopperShow(display === 'show'), {
                mainAxis: 22,
            });
        }
        render() {
            return html `
      <edgeless-tool-icon-button
        class="navigator-setting-button"
        .tooltip=${this.popperShow ? '' : 'Settings'}
        @click=${() => {
                this._navigatorSettingPopper?.toggle();
            }}
        .iconContainerPadding=${0}
      >
        ${NavigatorSettingsIcon}
      </edgeless-tool-icon-button>

      <div
        class="navigator-setting-menu"
        @click=${(e) => {
                e.stopPropagation();
            }}
      >
        <div class="item-container header">
          <div class="text title">Playback Settings</div>
        </div>

        <div class="item-container">
          <div class="text">Black background</div>

          <toggle-switch
            .on=${this.blackBackground}
            .onChange=${this._onBlackBackgroundChange}
          >
          </toggle-switch>
        </div>

        <div class="item-container">
          <div class="text">Hide toolbar</div>

          <toggle-switch
            .on=${this.hideToolbar}
            .onChange=${(checked) => {
                this.onHideToolbarChange && this.onHideToolbarChange(checked);
            }}
          >
          </toggle-switch>
        </div>

        ${this.includeFrameOrder
                ? html ` <div class="divider"></div>
              <div class="item-container header">
                <div class="text title">Frame Order</div>
              </div>

              <edgeless-frame-order-menu
                .edgeless=${this.edgeless}
                .embed=${true}
              ></edgeless-frame-order-menu>`
                : nothing}
      </div>
    `;
        }
        #_navigatorSettingButton_accessor_storage;
        get _navigatorSettingButton() { return this.#_navigatorSettingButton_accessor_storage; }
        set _navigatorSettingButton(value) { this.#_navigatorSettingButton_accessor_storage = value; }
        #_navigatorSettingMenu_accessor_storage;
        get _navigatorSettingMenu() { return this.#_navigatorSettingMenu_accessor_storage; }
        set _navigatorSettingMenu(value) { this.#_navigatorSettingMenu_accessor_storage = value; }
        #blackBackground_accessor_storage;
        get blackBackground() { return this.#blackBackground_accessor_storage; }
        set blackBackground(value) { this.#blackBackground_accessor_storage = value; }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #hideToolbar_accessor_storage;
        get hideToolbar() { return this.#hideToolbar_accessor_storage; }
        set hideToolbar(value) { this.#hideToolbar_accessor_storage = value; }
        #includeFrameOrder_accessor_storage;
        get includeFrameOrder() { return this.#includeFrameOrder_accessor_storage; }
        set includeFrameOrder(value) { this.#includeFrameOrder_accessor_storage = value; }
        #onHideToolbarChange_accessor_storage;
        get onHideToolbarChange() { return this.#onHideToolbarChange_accessor_storage; }
        set onHideToolbarChange(value) { this.#onHideToolbarChange_accessor_storage = value; }
        #popperShow_accessor_storage;
        get popperShow() { return this.#popperShow_accessor_storage; }
        set popperShow(value) { this.#popperShow_accessor_storage = value; }
        #setPopperShow_accessor_storage;
        get setPopperShow() { return this.#setPopperShow_accessor_storage; }
        set setPopperShow(value) { this.#setPopperShow_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._navigatorSettingPopper = null;
            this._onBlackBackgroundChange = (checked) => {
                this.blackBackground = checked;
                this.edgeless.slots.navigatorSettingUpdated.emit({
                    blackBackground: this.blackBackground,
                });
            };
            this.#_navigatorSettingButton_accessor_storage = __runInitializers(this, __navigatorSettingButton_initializers, void 0);
            this.#_navigatorSettingMenu_accessor_storage = (__runInitializers(this, __navigatorSettingButton_extraInitializers), __runInitializers(this, __navigatorSettingMenu_initializers, void 0));
            this.#blackBackground_accessor_storage = (__runInitializers(this, __navigatorSettingMenu_extraInitializers), __runInitializers(this, _blackBackground_initializers, true));
            this.#edgeless_accessor_storage = (__runInitializers(this, _blackBackground_extraInitializers), __runInitializers(this, _edgeless_initializers, void 0));
            this.#hideToolbar_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _hideToolbar_initializers, false));
            this.#includeFrameOrder_accessor_storage = (__runInitializers(this, _hideToolbar_extraInitializers), __runInitializers(this, _includeFrameOrder_initializers, false));
            this.#onHideToolbarChange_accessor_storage = (__runInitializers(this, _includeFrameOrder_extraInitializers), __runInitializers(this, _onHideToolbarChange_initializers, undefined));
            this.#popperShow_accessor_storage = (__runInitializers(this, _onHideToolbarChange_extraInitializers), __runInitializers(this, _popperShow_initializers, false));
            this.#setPopperShow_accessor_storage = (__runInitializers(this, _popperShow_extraInitializers), __runInitializers(this, _setPopperShow_initializers, () => { }));
            __runInitializers(this, _setPopperShow_extraInitializers);
        }
    };
})();
export { EdgelessNavigatorSettingButton };
//# sourceMappingURL=navigator-setting-button.js.map