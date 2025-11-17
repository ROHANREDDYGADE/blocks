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
import { WithDisposable, } from '@blocksuite/global/utils';
import { consume } from '@lit/context';
import { effect } from '@preact/signals-core';
import { cssVar } from '@toeverything/theme';
import { property, state } from 'lit/decorators.js';
import { createPopper } from '../common/create-popper.js';
import { edgelessToolbarContext, edgelessToolbarSlotsContext, edgelessToolbarThemeContext, } from '../context.js';
export const EdgelessToolbarToolMixin = (SuperClass) => {
    let DerivedClass = (() => {
        let _classSuper = WithDisposable(SuperClass);
        let _edgeless_decorators;
        let _edgeless_initializers = [];
        let _edgeless_extraInitializers = [];
        let _edgelessTool_decorators;
        let _edgelessTool_initializers = [];
        let _edgelessTool_extraInitializers = [];
        let _popper_decorators;
        let _popper_initializers = [];
        let _popper_extraInitializers = [];
        let _theme_decorators;
        let _theme_initializers = [];
        let _theme_extraInitializers = [];
        let _toolbar_decorators;
        let _toolbar_initializers = [];
        let _toolbar_extraInitializers = [];
        let _toolbarContainer_decorators;
        let _toolbarContainer_initializers = [];
        let _toolbarContainer_extraInitializers = [];
        let _toolbarSlots_decorators;
        let _toolbarSlots_initializers = [];
        let _toolbarSlots_extraInitializers = [];
        return class DerivedClass extends _classSuper {
            static {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
                _edgeless_decorators = [property({ attribute: false })];
                _edgelessTool_decorators = [state()];
                _popper_decorators = [state()];
                _theme_decorators = [consume({ context: edgelessToolbarThemeContext, subscribe: true })];
                _toolbar_decorators = [consume({ context: edgelessToolbarContext })];
                _toolbarContainer_decorators = [property({ attribute: false })];
                _toolbarSlots_decorators = [consume({ context: edgelessToolbarSlotsContext })];
                __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
                __esDecorate(this, null, _edgelessTool_decorators, { kind: "accessor", name: "edgelessTool", static: false, private: false, access: { has: obj => "edgelessTool" in obj, get: obj => obj.edgelessTool, set: (obj, value) => { obj.edgelessTool = value; } }, metadata: _metadata }, _edgelessTool_initializers, _edgelessTool_extraInitializers);
                __esDecorate(this, null, _popper_decorators, { kind: "accessor", name: "popper", static: false, private: false, access: { has: obj => "popper" in obj, get: obj => obj.popper, set: (obj, value) => { obj.popper = value; } }, metadata: _metadata }, _popper_initializers, _popper_extraInitializers);
                __esDecorate(this, null, _theme_decorators, { kind: "accessor", name: "theme", static: false, private: false, access: { has: obj => "theme" in obj, get: obj => obj.theme, set: (obj, value) => { obj.theme = value; } }, metadata: _metadata }, _theme_initializers, _theme_extraInitializers);
                __esDecorate(this, null, _toolbar_decorators, { kind: "accessor", name: "toolbar", static: false, private: false, access: { has: obj => "toolbar" in obj, get: obj => obj.toolbar, set: (obj, value) => { obj.toolbar = value; } }, metadata: _metadata }, _toolbar_initializers, _toolbar_extraInitializers);
                __esDecorate(this, null, _toolbarContainer_decorators, { kind: "accessor", name: "toolbarContainer", static: false, private: false, access: { has: obj => "toolbarContainer" in obj, get: obj => obj.toolbarContainer, set: (obj, value) => { obj.toolbarContainer = value; } }, metadata: _metadata }, _toolbarContainer_initializers, _toolbarContainer_extraInitializers);
                __esDecorate(this, null, _toolbarSlots_decorators, { kind: "accessor", name: "toolbarSlots", static: false, private: false, access: { has: obj => "toolbarSlots" in obj, get: obj => obj.toolbarSlots, set: (obj, value) => { obj.toolbarSlots = value; } }, metadata: _metadata }, _toolbarSlots_initializers, _toolbarSlots_extraInitializers);
                if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            }
            get active() {
                const { type } = this;
                const activeType = this.edgelessTool?.type;
                return activeType
                    ? Array.isArray(type)
                        ? type.includes(activeType)
                        : activeType === type
                    : false;
            }
            get setEdgelessTool() {
                return (...args) => {
                    this.edgeless.gfx.tool.setTool(
                    // @ts-ignore
                    ...args);
                };
            }
            _applyActiveStyle() {
                if (!this.enableActiveBackground)
                    return;
                this.style.background = this.active
                    ? cssVar('hoverColor')
                    : 'transparent';
            }
            _updateActiveEdgelessTool() {
                this.edgelessTool = this.edgeless.gfx.tool.currentToolOption$.value;
                this._applyActiveStyle();
            }
            connectedCallback() {
                super.connectedCallback();
                if (!this.edgeless)
                    return;
                this._updateActiveEdgelessTool();
                this._applyActiveStyle();
                this._disposables.add(effect(() => {
                    this._updateActiveEdgelessTool();
                }));
            }
            // TODO: move to toolbar-tool-with-menu.mixin
            createPopper(...args) {
                if (this.toolbar.activePopper) {
                    this.toolbar.activePopper.dispose();
                    this.toolbar.activePopper = null;
                }
                this.popper = createPopper(args[0], args[1], {
                    ...args[2],
                    onDispose: () => {
                        args[2]?.onDispose?.();
                        this.popper = null;
                    },
                });
                this.toolbar.activePopper = this.popper;
                return this.popper;
            }
            disconnectedCallback() {
                super.disconnectedCallback();
                this.popper?.dispose();
            }
            tryDisposePopper() {
                if (!this.active)
                    return false;
                if (this.popper) {
                    this.popper.dispose();
                    this.popper = null;
                    return true;
                }
                return false;
            }
            #edgeless_accessor_storage;
            get edgeless() { return this.#edgeless_accessor_storage; }
            set edgeless(value) { this.#edgeless_accessor_storage = value; }
            #edgelessTool_accessor_storage;
            get edgelessTool() { return this.#edgelessTool_accessor_storage; }
            set edgelessTool(value) { this.#edgelessTool_accessor_storage = value; }
            #popper_accessor_storage;
            get popper() { return this.#popper_accessor_storage; }
            set popper(value) { this.#popper_accessor_storage = value; }
            #theme_accessor_storage;
            get theme() { return this.#theme_accessor_storage; }
            set theme(value) { this.#theme_accessor_storage = value; }
            #toolbar_accessor_storage;
            get toolbar() { return this.#toolbar_accessor_storage; }
            set toolbar(value) { this.#toolbar_accessor_storage = value; }
            #toolbarContainer_accessor_storage;
            get toolbarContainer() { return this.#toolbarContainer_accessor_storage; }
            set toolbarContainer(value) { this.#toolbarContainer_accessor_storage = value; }
            #toolbarSlots_accessor_storage;
            get toolbarSlots() { return this.#toolbarSlots_accessor_storage; }
            set toolbarSlots(value) { this.#toolbarSlots_accessor_storage = value; }
            constructor() {
                super(...arguments);
                this.enableActiveBackground = false;
                this.#edgeless_accessor_storage = __runInitializers(this, _edgeless_initializers, void 0);
                this.#edgelessTool_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _edgelessTool_initializers, void 0));
                this.#popper_accessor_storage = (__runInitializers(this, _edgelessTool_extraInitializers), __runInitializers(this, _popper_initializers, null));
                this.#theme_accessor_storage = (__runInitializers(this, _popper_extraInitializers), __runInitializers(this, _theme_initializers, void 0));
                this.#toolbar_accessor_storage = (__runInitializers(this, _theme_extraInitializers), __runInitializers(this, _toolbar_initializers, void 0));
                this.#toolbarContainer_accessor_storage = (__runInitializers(this, _toolbar_extraInitializers), __runInitializers(this, _toolbarContainer_initializers, null));
                this.#toolbarSlots_accessor_storage = (__runInitializers(this, _toolbarContainer_extraInitializers), __runInitializers(this, _toolbarSlots_initializers, void 0));
                __runInitializers(this, _toolbarSlots_extraInitializers);
            }
        };
    })();
    return DerivedClass;
};
//# sourceMappingURL=tool.mixin.js.map