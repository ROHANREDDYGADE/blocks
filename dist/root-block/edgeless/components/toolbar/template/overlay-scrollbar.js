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
import { on, once, requestConnectedFrame, } from '@blocksuite/affine-shared/utils';
import { DisposableGroup } from '@blocksuite/global/utils';
import { css, html, LitElement } from 'lit';
import { query } from 'lit/decorators.js';
/**
 * A scrollbar that is only visible when the user is interacting with it.
 * Append this element to the a container that has a scrollable element. Which means
 * the scrollable element should lay on the same level as the overlay-scrollbar.
 *
 * And the scrollable element should have a `data-scrollable` attribute.
 *
 * Example:
 * ```
 * <div class="container">
 *    <div class="scrollable-element-with-fixed-height" data-scrollable>
 *       <!--.... very long content ....-->
 *    </div>
 *    <overlay-scrollbar></overlay-scrollbar>
 * </div>
 * ```
 *
 * Note:
 * - It only works with vertical scrollbars.
 */
let OverlayScrollbar = (() => {
    let _classSuper = LitElement;
    let __handle_decorators;
    let __handle_initializers = [];
    let __handle_extraInitializers = [];
    return class OverlayScrollbar extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __handle_decorators = [query('.overlay-handle')];
            __esDecorate(this, null, __handle_decorators, { kind: "accessor", name: "_handle", static: false, private: false, access: { has: obj => "_handle" in obj, get: obj => obj._handle, set: (obj, value) => { obj._handle = value; } }, metadata: _metadata }, __handle_initializers, __handle_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 10px;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .overlay-handle {
      position: absolute;
      top: 0;
      left: 2px;
      background-color: rgba(0, 0, 0, 0.44);
      border-radius: 3px;
      width: 6px;
    }
  `; }
        _dragHandle(event) {
            let startY = event.clientY;
            this._handleVisible = true;
            const dispose = on(document, 'pointermove', evt => {
                this._scroll(evt.clientY - startY);
                startY = evt.clientY;
            });
            once(document, 'pointerup', e => {
                this._handleVisible = false;
                e.stopPropagation();
                setTimeout(() => {
                    this._toggleScrollbarVisible(false);
                }, 800);
                dispose();
            });
        }
        _initWheelHandler() {
            const container = this.parentElement;
            container.style.contain = 'layout';
            container.style.overflow = 'hidden';
            let hideScrollbarTimeId = null;
            const delayHideScrollbar = () => {
                if (hideScrollbarTimeId)
                    clearTimeout(hideScrollbarTimeId);
                hideScrollbarTimeId = setTimeout(() => {
                    this._toggleScrollbarVisible(false);
                    hideScrollbarTimeId = null;
                }, 800);
            };
            let scrollable = null;
            this._disposable.addFromEvent(container, 'wheel', event => {
                scrollable = scrollable?.isConnected
                    ? scrollable
                    : container.querySelector('[data-scrollable]');
                this._scrollable = scrollable;
                if (!scrollable)
                    return;
                // firefox may report a wheel event with deltaMode of value other than 0
                // we just simply multiply it by 16 which is common default line height to get the correct value
                const scrollDistance = event.deltaMode === 0 ? event.deltaY : event.deltaY * 16;
                this._scroll(scrollDistance ?? 0);
                delayHideScrollbar();
            });
        }
        _scroll(scrollDistance) {
            const scrollable = this._scrollable;
            if (!scrollable)
                return;
            scrollable.scrollBy({
                left: 0,
                top: scrollDistance,
                behavior: 'instant',
            });
            requestConnectedFrame(() => {
                this._updateScrollbarRect(scrollable);
                this._toggleScrollbarVisible(true);
            }, this);
        }
        _toggleScrollbarVisible(visible) {
            const vis = visible || this._handleVisible ? '1' : '0';
            if (this.style.opacity !== vis) {
                this.style.opacity = vis;
            }
        }
        _updateScrollbarRect(rect) {
            if (rect.scrollHeight !== undefined && rect.clientHeight !== undefined) {
                this._handle.style.height = `${(rect.clientHeight / rect.scrollHeight) * 100}%`;
            }
            if (rect.scrollTop !== undefined && rect.scrollHeight !== undefined) {
                this._handle.style.top = `${(rect.scrollTop / rect.scrollHeight) * 100}%`;
            }
        }
        connectedCallback() {
            super.connectedCallback();
            this._disposable.dispose();
        }
        firstUpdated() {
            this._initWheelHandler();
        }
        render() {
            return html `<div
      class="overlay-handle"
      @pointerdown=${this._dragHandle}
    ></div>`;
        }
        #_handle_accessor_storage;
        get _handle() { return this.#_handle_accessor_storage; }
        set _handle(value) { this.#_handle_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._disposable = new DisposableGroup();
            this._handleVisible = false;
            this._scrollable = null;
            this.#_handle_accessor_storage = __runInitializers(this, __handle_initializers, void 0);
            __runInitializers(this, __handle_extraInitializers);
        }
    };
})();
export { OverlayScrollbar };
//# sourceMappingURL=overlay-scrollbar.js.map