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
import { generateKeyBetweenV2 } from '@blocksuite/block-std/gfx';
import { DisposableGroup, SignalWatcher, WithDisposable, } from '@blocksuite/global/utils';
import { css, html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
let EdgelessFrameOrderMenu = (() => {
    let _classSuper = SignalWatcher(WithDisposable(LitElement));
    let __clone_decorators;
    let __clone_initializers = [];
    let __clone_extraInitializers = [];
    let __container_decorators;
    let __container_initializers = [];
    let __container_extraInitializers = [];
    let __curIndex_decorators;
    let __curIndex_initializers = [];
    let __curIndex_extraInitializers = [];
    let __indicatorLine_decorators;
    let __indicatorLine_initializers = [];
    let __indicatorLine_extraInitializers = [];
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _embed_decorators;
    let _embed_initializers = [];
    let _embed_extraInitializers = [];
    return class EdgelessFrameOrderMenu extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __clone_decorators = [query('.clone')];
            __container_decorators = [query('.edgeless-frame-order-items-container')];
            __curIndex_decorators = [state()];
            __indicatorLine_decorators = [query('.indicator-line')];
            _edgeless_decorators = [property({ attribute: false })];
            _embed_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __clone_decorators, { kind: "accessor", name: "_clone", static: false, private: false, access: { has: obj => "_clone" in obj, get: obj => obj._clone, set: (obj, value) => { obj._clone = value; } }, metadata: _metadata }, __clone_initializers, __clone_extraInitializers);
            __esDecorate(this, null, __container_decorators, { kind: "accessor", name: "_container", static: false, private: false, access: { has: obj => "_container" in obj, get: obj => obj._container, set: (obj, value) => { obj._container = value; } }, metadata: _metadata }, __container_initializers, __container_extraInitializers);
            __esDecorate(this, null, __curIndex_decorators, { kind: "accessor", name: "_curIndex", static: false, private: false, access: { has: obj => "_curIndex" in obj, get: obj => obj._curIndex, set: (obj, value) => { obj._curIndex = value; } }, metadata: _metadata }, __curIndex_initializers, __curIndex_extraInitializers);
            __esDecorate(this, null, __indicatorLine_decorators, { kind: "accessor", name: "_indicatorLine", static: false, private: false, access: { has: obj => "_indicatorLine" in obj, get: obj => obj._indicatorLine, set: (obj, value) => { obj._indicatorLine = value; } }, metadata: _metadata }, __indicatorLine_initializers, __indicatorLine_extraInitializers);
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _embed_decorators, { kind: "accessor", name: "embed", static: false, private: false, access: { has: obj => "embed" in obj, get: obj => obj.embed, set: (obj, value) => { obj.embed = value; } }, metadata: _metadata }, _embed_initializers, _embed_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      position: relative;
    }
    .edgeless-frame-order-items-container {
      max-height: 281px;
      border-radius: 8px;
      padding: 8px;
      background: var(--affine-background-overlay-panel-color);
      box-shadow: var(--affine-menu-shadow);
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .edgeless-frame-order-items-container.embed {
      padding: 0;
      background: unset;
      box-shadow: unset;
      border-radius: 0;
    }

    .item {
      box-sizing: border-box;
      width: 256px;
      border-radius: 4px;
      padding: 4px;
      display: flex;
      gap: 4px;
      align-items: center;
      cursor: grab;
    }

    .draggable:hover {
      background-color: var(--affine-hover-color);
    }

    .item:hover .drag-indicator {
      opacity: 1;
    }

    .drag-indicator {
      cursor: pointer;
      width: 4px;
      height: 12px;
      border-radius: 1px;
      opacity: 0.2;
      background: var(--affine-placeholder-color);
      margin-right: 2px;
    }

    .title {
      font-size: 14px;
      font-weight: 400;
      height: 22px;
      line-height: 22px;
      color: var(--affine-text-primary-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .clone {
      visibility: hidden;
      position: absolute;
      z-index: 1;
      left: 8px;
      height: 30px;
      border: 1px solid var(--affine-border-color);
      box-shadow: var(--affine-menu-shadow);
      background-color: var(--affine-white);
      pointer-events: none;
    }

    .indicator-line {
      visibility: hidden;
      position: absolute;
      z-index: 1;
      left: 8px;
      background-color: var(--affine-primary-color);
      height: 1px;
      width: 90%;
    }
  `; }
        get _frames() {
            return this.edgeless.service.frames;
        }
        _bindEvent() {
            const { _disposables } = this;
            _disposables.addFromEvent(this._container, 'wheel', e => {
                e.stopPropagation();
            });
            _disposables.addFromEvent(this._container, 'pointerdown', e => {
                const ele = e.target;
                const draggable = ele.closest('.draggable');
                if (!draggable)
                    return;
                const clone = this._clone;
                const indicatorLine = this._indicatorLine;
                clone.style.visibility = 'visible';
                const rect = draggable.getBoundingClientRect();
                const index = Number(draggable.getAttribute('index'));
                this._curIndex = index;
                let newIndex = -1;
                const containerRect = this._container.getBoundingClientRect();
                const start = containerRect.top + 8;
                const end = containerRect.bottom;
                const shiftX = e.clientX - rect.left;
                const shiftY = e.clientY - rect.top;
                function moveAt(x, y) {
                    clone.style.left = x - containerRect.left - shiftX + 'px';
                    clone.style.top = y - containerRect.top - shiftY + 'px';
                }
                function isInsideContainer(e) {
                    return e.clientY >= start && e.clientY <= end;
                }
                moveAt(e.clientX, e.clientY);
                this._disposables.addFromEvent(document, 'pointermove', e => {
                    indicatorLine.style.visibility = 'visible';
                    moveAt(e.clientX, e.clientY);
                    if (isInsideContainer(e)) {
                        const relativeY = e.pageY + this._container.scrollTop - start;
                        let top = 0;
                        if (relativeY < rect.height / 2) {
                            newIndex = 0;
                            top = this.embed ? -2 : 4;
                        }
                        else {
                            newIndex = Math.ceil((relativeY - rect.height / 2) / (rect.height + 10));
                            top =
                                (this.embed ? -2 : 7.5) +
                                    newIndex * rect.height +
                                    (newIndex - 0.5) * 4;
                        }
                        indicatorLine.style.top = top - this._container.scrollTop + 'px';
                        return;
                    }
                    newIndex = -1;
                });
                this._disposables.addFromEvent(document, 'pointerup', () => {
                    clone.style.visibility = 'hidden';
                    indicatorLine.style.visibility = 'hidden';
                    if (newIndex >= 0 &&
                        newIndex <= this._frames.length &&
                        newIndex !== index &&
                        newIndex !== index + 1) {
                        const frameMgr = this.edgeless.service.frame;
                        // Legacy compatibility
                        frameMgr.refreshLegacyFrameOrder();
                        const before = this._frames[newIndex - 1]?.presentationIndex || null;
                        const after = this._frames[newIndex]?.presentationIndex || null;
                        const frame = this._frames[index];
                        this.edgeless.service.updateElement(frame.id, {
                            presentationIndex: generateKeyBetweenV2(before, after),
                        });
                        this.edgeless.doc.captureSync();
                        this.requestUpdate();
                    }
                    this._disposables.dispose();
                    this._disposables = new DisposableGroup();
                    this._bindEvent();
                });
            });
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._disposables.dispose();
        }
        firstUpdated() {
            this._bindEvent();
        }
        render() {
            const frame = this._frames[this._curIndex];
            return html `
      <div
        class="edgeless-frame-order-items-container ${this.embed
                ? 'embed'
                : ''}"
        @click=${(e) => e.stopPropagation()}
      >
        ${repeat(this._frames, frame => frame.id, (frame, index) => html `
            <div class="item draggable" id=${frame.id} index=${index}>
              <div class="drag-indicator"></div>
              <div class="title">${frame.title.toString()}</div>
            </div>
          `)}
        <div class="indicator-line"></div>
        <div class="clone item">
          ${frame
                ? html `<div class="drag-indicator"></div>
                <div class="index">${this._curIndex + 1}</div>
                <div class="title">${frame.title.toString()}</div>`
                : nothing}
        </div>
      </div>
    `;
        }
        #_clone_accessor_storage = __runInitializers(this, __clone_initializers, void 0);
        get _clone() { return this.#_clone_accessor_storage; }
        set _clone(value) { this.#_clone_accessor_storage = value; }
        #_container_accessor_storage = (__runInitializers(this, __clone_extraInitializers), __runInitializers(this, __container_initializers, void 0));
        get _container() { return this.#_container_accessor_storage; }
        set _container(value) { this.#_container_accessor_storage = value; }
        #_curIndex_accessor_storage = (__runInitializers(this, __container_extraInitializers), __runInitializers(this, __curIndex_initializers, -1));
        get _curIndex() { return this.#_curIndex_accessor_storage; }
        set _curIndex(value) { this.#_curIndex_accessor_storage = value; }
        #_indicatorLine_accessor_storage = (__runInitializers(this, __curIndex_extraInitializers), __runInitializers(this, __indicatorLine_initializers, void 0));
        get _indicatorLine() { return this.#_indicatorLine_accessor_storage; }
        set _indicatorLine(value) { this.#_indicatorLine_accessor_storage = value; }
        #edgeless_accessor_storage = (__runInitializers(this, __indicatorLine_extraInitializers), __runInitializers(this, _edgeless_initializers, void 0));
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #embed_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _embed_initializers, false));
        get embed() { return this.#embed_accessor_storage; }
        set embed(value) { this.#embed_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _embed_extraInitializers);
        }
    };
})();
export { EdgelessFrameOrderMenu };
//# sourceMappingURL=frame-order-menu.js.map