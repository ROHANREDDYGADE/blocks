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
import { OverlayIdentifier, } from '@blocksuite/affine-block-surface';
import { docContext, stdContext, } from '@blocksuite/block-std';
import { GfxControllerIdentifier } from '@blocksuite/block-std/gfx';
import { DisposableGroup, Vec, WithDisposable } from '@blocksuite/global/utils';
import { consume } from '@lit/context';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
const SIZE = 12;
const HALF_SIZE = SIZE / 2;
let EdgelessConnectorHandle = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __endHandler_decorators;
    let __endHandler_initializers = [];
    let __endHandler_extraInitializers = [];
    let __startHandler_decorators;
    let __startHandler_initializers = [];
    let __startHandler_extraInitializers = [];
    let _connector_decorators;
    let _connector_initializers = [];
    let _connector_extraInitializers = [];
    let _doc_decorators;
    let _doc_initializers = [];
    let _doc_extraInitializers = [];
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _std_decorators;
    let _std_initializers = [];
    let _std_extraInitializers = [];
    return class EdgelessConnectorHandle extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __endHandler_decorators = [query('.line-end')];
            __startHandler_decorators = [query('.line-start')];
            _connector_decorators = [property({ attribute: false })];
            _doc_decorators = [consume({
                    context: docContext,
                })];
            _edgeless_decorators = [property({ attribute: false })];
            _std_decorators = [consume({
                    context: stdContext,
                })];
            __esDecorate(this, null, __endHandler_decorators, { kind: "accessor", name: "_endHandler", static: false, private: false, access: { has: obj => "_endHandler" in obj, get: obj => obj._endHandler, set: (obj, value) => { obj._endHandler = value; } }, metadata: _metadata }, __endHandler_initializers, __endHandler_extraInitializers);
            __esDecorate(this, null, __startHandler_decorators, { kind: "accessor", name: "_startHandler", static: false, private: false, access: { has: obj => "_startHandler" in obj, get: obj => obj._startHandler, set: (obj, value) => { obj._startHandler = value; } }, metadata: _metadata }, __startHandler_initializers, __startHandler_extraInitializers);
            __esDecorate(this, null, _connector_decorators, { kind: "accessor", name: "connector", static: false, private: false, access: { has: obj => "connector" in obj, get: obj => obj.connector, set: (obj, value) => { obj.connector = value; } }, metadata: _metadata }, _connector_initializers, _connector_extraInitializers);
            __esDecorate(this, null, _doc_decorators, { kind: "accessor", name: "doc", static: false, private: false, access: { has: obj => "doc" in obj, get: obj => obj.doc, set: (obj, value) => { obj.doc = value; } }, metadata: _metadata }, _doc_initializers, _doc_extraInitializers);
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _std_decorators, { kind: "accessor", name: "std", static: false, private: false, access: { has: obj => "std" in obj, get: obj => obj.std, set: (obj, value) => { obj.std = value; } }, metadata: _metadata }, _std_initializers, _std_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .line-controller {
      position: absolute;
      width: ${SIZE}px;
      height: ${SIZE}px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 2px solid var(--affine-text-emphasis-color);
      background-color: var(--affine-background-primary-color);
      cursor: pointer;
      z-index: 10;
      pointer-events: all;
      /**
       * Fix: pointerEvent stops firing after a short time.
       * When a gesture is started, the browser intersects the touch-action values of the touched element and its ancestors,
       * up to the one that implements the gesture (in other words, the first containing scrolling element)
       * https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
       */
      touch-action: none;
    }
    .line-controller-hidden {
      display: none;
    }
  `; }
        get connectionOverlay() {
            return this.std.get(OverlayIdentifier('connection'));
        }
        get gfx() {
            return this.std.get(GfxControllerIdentifier);
        }
        _bindEvent() {
            const edgeless = this.edgeless;
            this._disposables.addFromEvent(this._startHandler, 'pointerdown', e => {
                edgeless.slots.elementResizeStart.emit();
                this._capPointerDown(e, 'source');
            });
            this._disposables.addFromEvent(this._endHandler, 'pointerdown', e => {
                edgeless.slots.elementResizeStart.emit();
                this._capPointerDown(e, 'target');
            });
            this._disposables.add(() => {
                this.connectionOverlay.clear();
            });
        }
        _capPointerDown(e, connection) {
            const { edgeless, connector, _disposables } = this;
            const { service } = edgeless;
            e.stopPropagation();
            _disposables.addFromEvent(document, 'pointermove', e => {
                const point = service.viewport.toModelCoordFromClientCoord([e.x, e.y]);
                const isStartPointer = connection === 'source';
                const otherSideId = connector[isStartPointer ? 'target' : 'source'].id;
                connector[connection] = this.connectionOverlay.renderConnector(point, otherSideId ? [otherSideId] : []);
                this.requestUpdate();
            });
            _disposables.addFromEvent(document, 'pointerup', () => {
                this.doc.captureSync();
                _disposables.dispose();
                this._disposables = new DisposableGroup();
                this._bindEvent();
                edgeless.slots.elementResizeEnd.emit();
            });
        }
        firstUpdated() {
            const { edgeless } = this;
            const { viewport } = edgeless.service;
            this._lastZoom = viewport.zoom;
            edgeless.service.viewport.viewportUpdated.on(() => {
                if (viewport.zoom !== this._lastZoom) {
                    this._lastZoom = viewport.zoom;
                    this.requestUpdate();
                }
            });
            this._bindEvent();
        }
        render() {
            const { service } = this.edgeless;
            // path is relative to the element's xywh
            const { path } = this.connector;
            const zoom = service.viewport.zoom;
            const startPoint = Vec.subScalar(Vec.mul(path[0], zoom), HALF_SIZE);
            const endPoint = Vec.subScalar(Vec.mul(path[path.length - 1], zoom), HALF_SIZE);
            const startStyle = {
                transform: `translate3d(${startPoint[0]}px,${startPoint[1]}px,0)`,
            };
            const endStyle = {
                transform: `translate3d(${endPoint[0]}px,${endPoint[1]}px,0)`,
            };
            return html `
      <div
        class="line-controller line-start"
        style=${styleMap(startStyle)}
      ></div>
      <div class="line-controller line-end" style=${styleMap(endStyle)}></div>
    `;
        }
        #_endHandler_accessor_storage;
        get _endHandler() { return this.#_endHandler_accessor_storage; }
        set _endHandler(value) { this.#_endHandler_accessor_storage = value; }
        #_startHandler_accessor_storage;
        get _startHandler() { return this.#_startHandler_accessor_storage; }
        set _startHandler(value) { this.#_startHandler_accessor_storage = value; }
        #connector_accessor_storage;
        get connector() { return this.#connector_accessor_storage; }
        set connector(value) { this.#connector_accessor_storage = value; }
        #doc_accessor_storage;
        get doc() { return this.#doc_accessor_storage; }
        set doc(value) { this.#doc_accessor_storage = value; }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #std_accessor_storage;
        get std() { return this.#std_accessor_storage; }
        set std(value) { this.#std_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._lastZoom = 1;
            this.#_endHandler_accessor_storage = __runInitializers(this, __endHandler_initializers, void 0);
            this.#_startHandler_accessor_storage = (__runInitializers(this, __endHandler_extraInitializers), __runInitializers(this, __startHandler_initializers, void 0));
            this.#connector_accessor_storage = (__runInitializers(this, __startHandler_extraInitializers), __runInitializers(this, _connector_initializers, void 0));
            this.#doc_accessor_storage = (__runInitializers(this, _connector_extraInitializers), __runInitializers(this, _doc_initializers, void 0));
            this.#edgeless_accessor_storage = (__runInitializers(this, _doc_extraInitializers), __runInitializers(this, _edgeless_initializers, void 0));
            this.#std_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _std_initializers, void 0));
            __runInitializers(this, _std_extraInitializers);
        }
    };
})();
export { EdgelessConnectorHandle };
//# sourceMappingURL=connector-handle.js.map