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
import { ArrowRightSmallIcon } from '@blocksuite/affine-components/icons';
import { WithDisposable } from '@blocksuite/global/utils';
import { consume } from '@lit/context';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { edgelessToolbarSlotsContext, } from '../context.js';
let EdgelessSlideMenu = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __menuContainer_decorators;
    let __menuContainer_initializers = [];
    let __menuContainer_extraInitializers = [];
    let __slideMenuContent_decorators;
    let __slideMenuContent_initializers = [];
    let __slideMenuContent_extraInitializers = [];
    let _height_decorators;
    let _height_initializers = [];
    let _height_extraInitializers = [];
    let _showNext_decorators;
    let _showNext_initializers = [];
    let _showNext_extraInitializers = [];
    let _showPrevious_decorators;
    let _showPrevious_initializers = [];
    let _showPrevious_extraInitializers = [];
    let _toolbarSlots_decorators;
    let _toolbarSlots_initializers = [];
    let _toolbarSlots_extraInitializers = [];
    return class EdgelessSlideMenu extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __menuContainer_decorators = [query('.menu-container')];
            __slideMenuContent_decorators = [query('.slide-menu-content')];
            _height_decorators = [property({ attribute: false })];
            _showNext_decorators = [property({ attribute: false })];
            _showPrevious_decorators = [property({ attribute: false })];
            _toolbarSlots_decorators = [consume({ context: edgelessToolbarSlotsContext })];
            __esDecorate(this, null, __menuContainer_decorators, { kind: "accessor", name: "_menuContainer", static: false, private: false, access: { has: obj => "_menuContainer" in obj, get: obj => obj._menuContainer, set: (obj, value) => { obj._menuContainer = value; } }, metadata: _metadata }, __menuContainer_initializers, __menuContainer_extraInitializers);
            __esDecorate(this, null, __slideMenuContent_decorators, { kind: "accessor", name: "_slideMenuContent", static: false, private: false, access: { has: obj => "_slideMenuContent" in obj, get: obj => obj._slideMenuContent, set: (obj, value) => { obj._slideMenuContent = value; } }, metadata: _metadata }, __slideMenuContent_initializers, __slideMenuContent_extraInitializers);
            __esDecorate(this, null, _height_decorators, { kind: "accessor", name: "height", static: false, private: false, access: { has: obj => "height" in obj, get: obj => obj.height, set: (obj, value) => { obj.height = value; } }, metadata: _metadata }, _height_initializers, _height_extraInitializers);
            __esDecorate(this, null, _showNext_decorators, { kind: "accessor", name: "showNext", static: false, private: false, access: { has: obj => "showNext" in obj, get: obj => obj.showNext, set: (obj, value) => { obj.showNext = value; } }, metadata: _metadata }, _showNext_initializers, _showNext_extraInitializers);
            __esDecorate(this, null, _showPrevious_decorators, { kind: "accessor", name: "showPrevious", static: false, private: false, access: { has: obj => "showPrevious" in obj, get: obj => obj.showPrevious, set: (obj, value) => { obj.showPrevious = value; } }, metadata: _metadata }, _showPrevious_initializers, _showPrevious_extraInitializers);
            __esDecorate(this, null, _toolbarSlots_decorators, { kind: "accessor", name: "toolbarSlots", static: false, private: false, access: { has: obj => "toolbarSlots" in obj, get: obj => obj.toolbarSlots, set: (obj, value) => { obj.toolbarSlots = value; } }, metadata: _metadata }, _toolbarSlots_initializers, _toolbarSlots_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      max-width: 100%;
    }
    ::-webkit-scrollbar {
      display: none;
    }
    .slide-menu-wrapper {
      position: relative;
    }
    .menu-container {
      background: var(--affine-background-overlay-panel-color);
      border-radius: 8px 8px 0 0;
      border: 1px solid var(--affine-border-color);
      border-bottom: none;
      display: flex;
      align-items: center;
      width: fit-content;
      max-width: 100%;
      overflow-x: auto;
      overscroll-behavior: none;
      scrollbar-width: none;
      position: relative;
      height: calc(var(--menu-height) + 1px);
      box-sizing: border-box;
      padding: 0 10px;
      scroll-snap-type: x mandatory;
    }
    .slide-menu-content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      transition: left 0.5s ease-in-out;
    }
    .next-slide-button,
    .previous-slide-button {
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid var(--affine-border-color);
      background: var(--affine-background-overlay-panel-color);
      box-shadow: var(--affine-shadow-2);
      color: var(--affine-icon-color);
      transition:
        transform 0.3s ease-in-out,
        opacity 0.5s ease-in-out;
      z-index: 12;
    }
    .next-slide-button {
      opacity: 0;
      display: flex;
      top: 50%;
      right: 0;
      transform: translate(50%, -50%) scale(0.5);
    }
    .next-slide-button:hover {
      cursor: pointer;
      transform: translate(50%, -50%) scale(1);
    }
    .previous-slide-button {
      opacity: 0;
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    .previous-slide-button:hover {
      cursor: pointer;
      transform: translate(-50%, -50%) scale(1);
    }
    .previous-slide-button svg {
      transform: rotate(180deg);
    }
  `; }
        _handleSlideButtonClick(direction) {
            const totalWidth = this._slideMenuContent.clientWidth;
            const currentScrollLeft = this._menuContainer.scrollLeft;
            const menuWidth = this._menuContainer.clientWidth;
            const newLeft = currentScrollLeft + (direction === 'left' ? -menuWidth : menuWidth);
            this._menuContainer.scrollTo({
                left: Math.max(0, Math.min(newLeft, totalWidth)),
                behavior: 'smooth',
            });
        }
        _handleWheel(event) {
            event.stopPropagation();
        }
        _toggleSlideButton() {
            const scrollLeft = this._menuContainer.scrollLeft;
            const menuWidth = this._menuContainer.clientWidth;
            const leftMin = 0;
            const leftMax = this._slideMenuContent.clientWidth - menuWidth + 2; // border is 2
            this.showPrevious = scrollLeft > leftMin;
            this.showNext = scrollLeft < leftMax;
        }
        firstUpdated() {
            setTimeout(this._toggleSlideButton.bind(this), 0);
            this._disposables.addFromEvent(this._menuContainer, 'scrollend', () => {
                this._toggleSlideButton();
            });
            this._disposables.add(this.toolbarSlots.resize.on(() => this._toggleSlideButton()));
        }
        render() {
            return html `
      <div class="slide-menu-wrapper">
        <div
          class="previous-slide-button"
          @click=${() => this._handleSlideButtonClick('left')}
          style=${styleMap({ opacity: this.showPrevious ? '1' : '0' })}
        >
          ${ArrowRightSmallIcon}
        </div>
        <div
          class="menu-container"
          style=${styleMap({ '--menu-height': this.height })}
        >
          <div class="slide-menu-content" @wheel=${this._handleWheel}>
            <slot></slot>
          </div>
        </div>
        <div
          style=${styleMap({ opacity: this.showNext ? '1' : '0' })}
          class="next-slide-button"
          @click=${() => this._handleSlideButtonClick('right')}
        >
          ${ArrowRightSmallIcon}
        </div>
      </div>
    `;
        }
        #_menuContainer_accessor_storage = __runInitializers(this, __menuContainer_initializers, void 0);
        get _menuContainer() { return this.#_menuContainer_accessor_storage; }
        set _menuContainer(value) { this.#_menuContainer_accessor_storage = value; }
        #_slideMenuContent_accessor_storage = (__runInitializers(this, __menuContainer_extraInitializers), __runInitializers(this, __slideMenuContent_initializers, void 0));
        get _slideMenuContent() { return this.#_slideMenuContent_accessor_storage; }
        set _slideMenuContent(value) { this.#_slideMenuContent_accessor_storage = value; }
        #height_accessor_storage = (__runInitializers(this, __slideMenuContent_extraInitializers), __runInitializers(this, _height_initializers, '40px'));
        get height() { return this.#height_accessor_storage; }
        set height(value) { this.#height_accessor_storage = value; }
        #showNext_accessor_storage = (__runInitializers(this, _height_extraInitializers), __runInitializers(this, _showNext_initializers, false));
        get showNext() { return this.#showNext_accessor_storage; }
        set showNext(value) { this.#showNext_accessor_storage = value; }
        #showPrevious_accessor_storage = (__runInitializers(this, _showNext_extraInitializers), __runInitializers(this, _showPrevious_initializers, false));
        get showPrevious() { return this.#showPrevious_accessor_storage; }
        set showPrevious(value) { this.#showPrevious_accessor_storage = value; }
        #toolbarSlots_accessor_storage = (__runInitializers(this, _showPrevious_extraInitializers), __runInitializers(this, _toolbarSlots_initializers, void 0));
        get toolbarSlots() { return this.#toolbarSlots_accessor_storage; }
        set toolbarSlots(value) { this.#toolbarSlots_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _toolbarSlots_extraInitializers);
        }
    };
})();
export { EdgelessSlideMenu };
//# sourceMappingURL=slide-menu.js.map