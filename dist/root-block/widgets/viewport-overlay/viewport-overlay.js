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
import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
export const AFFINE_VIEWPORT_OVERLAY_WIDGET = 'affine-viewport-overlay-widget';
let AffineViewportOverlayWidget = (() => {
    let _classSuper = WidgetComponent;
    let __lockViewport_decorators;
    let __lockViewport_initializers = [];
    let __lockViewport_extraInitializers = [];
    return class AffineViewportOverlayWidget extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __lockViewport_decorators = [state()];
            __esDecorate(this, null, __lockViewport_decorators, { kind: "accessor", name: "_lockViewport", static: false, private: false, access: { has: obj => "_lockViewport" in obj, get: obj => obj._lockViewport, set: (obj, value) => { obj._lockViewport = value; } }, metadata: _metadata }, __lockViewport_initializers, __lockViewport_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .affine-viewport-overlay-widget {
      position: absolute;
      top: 0;
      left: 0;
      background: transparent;
      pointer-events: none;
      z-index: calc(var(--affine-z-index-popover) - 1);
    }

    .affine-viewport-overlay-widget.lock {
      pointer-events: auto;
    }
  `; }
        connectedCallback() {
            super.connectedCallback();
            this.handleEvent('dragStart', () => {
                return this._lockViewport;
            }, { global: true });
            this.handleEvent('pointerDown', () => {
                return this._lockViewport;
            }, { global: true });
            this.handleEvent('click', () => {
                return this._lockViewport;
            }, { global: true });
        }
        lock() {
            this._lockViewport = true;
        }
        render() {
            const classes = classMap({
                'affine-viewport-overlay-widget': true,
                lock: this._lockViewport,
            });
            const style = styleMap({
                width: `${this._lockViewport ? '100vw' : '0'}`,
                height: `${this._lockViewport ? '100%' : '0'}`,
            });
            return html ` <div class=${classes} style=${style}></div> `;
        }
        toggleLock() {
            this._lockViewport = !this._lockViewport;
        }
        unlock() {
            this._lockViewport = false;
        }
        #_lockViewport_accessor_storage = __runInitializers(this, __lockViewport_initializers, false);
        get _lockViewport() { return this.#_lockViewport_accessor_storage; }
        set _lockViewport(value) { this.#_lockViewport_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, __lockViewport_extraInitializers);
        }
    };
})();
export { AffineViewportOverlayWidget };
//# sourceMappingURL=viewport-overlay.js.map