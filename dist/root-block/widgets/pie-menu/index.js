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
import { WidgetComponent } from '@blocksuite/block-std';
import { noop } from '@blocksuite/global/utils';
import { nothing } from 'lit';
import { state } from 'lit/decorators.js';
import { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
import { PieNodeCenter } from './components/pie-node-center.js';
import { PieNodeChild } from './components/pie-node-child.js';
import { PieNodeContent } from './components/pie-node-content.js';
import { PieCenterRotator } from './components/rotator.js';
import { edgelessToolsPieSchema } from './config.js';
import { PieMenu } from './menu.js';
import { PieManager } from './pie-manager.js';
noop(PieNodeContent);
noop(PieNodeCenter);
noop(PieCenterRotator);
noop(PieNodeChild);
export const AFFINE_PIE_MENU_WIDGET = 'affine-pie-menu-widget';
let AffinePieMenuWidget = (() => {
    let _classSuper = WidgetComponent;
    let _currentMenu_decorators;
    let _currentMenu_initializers = [];
    let _currentMenu_extraInitializers = [];
    return class AffinePieMenuWidget extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _currentMenu_decorators = [state()];
            __esDecorate(this, null, _currentMenu_decorators, { kind: "accessor", name: "currentMenu", static: false, private: false, access: { has: obj => "currentMenu" in obj, get: obj => obj.currentMenu, set: (obj, value) => { obj.currentMenu = value; } }, metadata: _metadata }, _currentMenu_initializers, _currentMenu_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get isEnabled() {
            return this.doc.awarenessStore.getFlag('enable_pie_menu');
        }
        // if key is released before 100ms then the menu is kept open, else
        get isOpen() {
            return !!this.currentMenu;
        }
        get rootComponent() {
            const rootComponent = this.block;
            if (rootComponent instanceof EdgelessRootBlockComponent) {
                return rootComponent;
            }
            throw new Error('AffinePieMenuWidget is only supported in edgeless');
        }
        _attachMenu(schema) {
            if (this.currentMenu && this.currentMenu.id === schema.id)
                return this.currentMenu.close();
            const [x, y] = this.mouse;
            const menu = this._createMenu(schema, {
                x,
                y,
                widgetComponent: this,
            });
            this.currentMenu = menu;
            this.selectOnTrigRelease.timeout = setTimeout(() => {
                this.selectOnTrigRelease.allow = true;
            }, PieManager.settings.SELECT_ON_RELEASE_TIMEOUT);
        }
        _initPie() {
            PieManager.setup({ rootComponent: this.rootComponent });
            this._disposables.add(PieManager.slots.open.on(this._attachMenu.bind(this)));
        }
        _onMenuClose() {
            this.currentMenu = null;
            this.selectOnTrigRelease.allow = false;
        }
        // on trigger key release it will select the currently hovered menu node
        _createMenu(schema, { x, y, widgetComponent, }) {
            const menu = new PieMenu();
            menu.id = schema.id;
            menu.schema = schema;
            menu.position = [x, y];
            menu.rootComponent = widgetComponent.rootComponent;
            menu.widgetComponent = widgetComponent;
            menu.abortController.signal.addEventListener('abort', this._onMenuClose.bind(this));
            return menu;
        }
        connectedCallback() {
            super.connectedCallback();
            if (!this.isEnabled)
                return;
            this.handleEvent('keyUp', this._handleKeyUp, { global: true });
            this.handleEvent('pointerMove', this._handleCursorPos, { global: true });
            this.handleEvent('wheel', ctx => {
                const state = ctx.get('defaultState');
                if (state.event instanceof WheelEvent)
                    state.event.stopPropagation();
            }, { global: true });
            this._initPie();
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            PieManager.dispose();
        }
        render() {
            return this.currentMenu ?? nothing;
        }
        #currentMenu_accessor_storage;
        get currentMenu() { return this.#currentMenu_accessor_storage; }
        set currentMenu(value) { this.#currentMenu_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._handleCursorPos = (ctx) => {
                const ev = ctx.get('pointerState');
                const { x, y } = ev.point;
                this.mouse = [x, y];
            };
            this._handleKeyUp = (ctx) => {
                if (!this.currentMenu)
                    return;
                const ev = ctx.get('keyboardState');
                const { trigger } = this.currentMenu.schema;
                if (trigger({ keyEvent: ev.raw, rootComponent: this.rootComponent })) {
                    clearTimeout(this.selectOnTrigRelease.timeout);
                    if (this.selectOnTrigRelease.allow) {
                        this.currentMenu.selectHovered();
                        this.currentMenu.close();
                    }
                }
            };
            this.mouse = [innerWidth / 2, innerHeight / 2];
            // No action if the currently hovered node is a submenu
            this.selectOnTrigRelease = {
                allow: false,
            };
            this.#currentMenu_accessor_storage = __runInitializers(this, _currentMenu_initializers, null);
            __runInitializers(this, _currentMenu_extraInitializers);
        }
    };
})();
export { AffinePieMenuWidget };
PieManager.add(edgelessToolsPieSchema);
//# sourceMappingURL=index.js.map