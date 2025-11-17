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
import { CanvasElementType } from '@blocksuite/affine-block-surface';
import { getShapeRadius, getShapeType, } from '@blocksuite/affine-model';
import { Bound, sleep, WithDisposable } from '@blocksuite/global/utils';
import { css, html, LitElement, } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ShapeTool } from '../../../gfx-tool/shape-tool.js';
let EdgelessShapeToolElement = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __backupShapeElement_decorators;
    let __backupShapeElement_initializers = [];
    let __backupShapeElement_extraInitializers = [];
    let __dragging_decorators;
    let __dragging_initializers = [];
    let __dragging_extraInitializers = [];
    let __isOutside_decorators;
    let __isOutside_initializers = [];
    let __isOutside_extraInitializers = [];
    let __shapeElement_decorators;
    let __shapeElement_initializers = [];
    let __shapeElement_extraInitializers = [];
    let __startCoord_decorators;
    let __startCoord_initializers = [];
    let __startCoord_extraInitializers = [];
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _getContainerRect_decorators;
    let _getContainerRect_initializers = [];
    let _getContainerRect_extraInitializers = [];
    let _handleClick_decorators;
    let _handleClick_initializers = [];
    let _handleClick_extraInitializers = [];
    let _order_decorators;
    let _order_initializers = [];
    let _order_extraInitializers = [];
    let _shape_decorators;
    let _shape_initializers = [];
    let _shape_extraInitializers = [];
    let _shapeStyle_decorators;
    let _shapeStyle_initializers = [];
    let _shapeStyle_extraInitializers = [];
    let _shapeType_decorators;
    let _shapeType_initializers = [];
    let _shapeType_extraInitializers = [];
    return class EdgelessShapeToolElement extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __backupShapeElement_decorators = [query('#backup-shape-element')];
            __dragging_decorators = [state()];
            __isOutside_decorators = [state()];
            __shapeElement_decorators = [query('#shape-tool-element')];
            __startCoord_decorators = [state()];
            _edgeless_decorators = [property({ attribute: false })];
            _getContainerRect_decorators = [property({ attribute: false })];
            _handleClick_decorators = [property({ attribute: false })];
            _order_decorators = [property({ attribute: false })];
            _shape_decorators = [property({ attribute: false })];
            _shapeStyle_decorators = [property({ attribute: false })];
            _shapeType_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __backupShapeElement_decorators, { kind: "accessor", name: "_backupShapeElement", static: false, private: false, access: { has: obj => "_backupShapeElement" in obj, get: obj => obj._backupShapeElement, set: (obj, value) => { obj._backupShapeElement = value; } }, metadata: _metadata }, __backupShapeElement_initializers, __backupShapeElement_extraInitializers);
            __esDecorate(this, null, __dragging_decorators, { kind: "accessor", name: "_dragging", static: false, private: false, access: { has: obj => "_dragging" in obj, get: obj => obj._dragging, set: (obj, value) => { obj._dragging = value; } }, metadata: _metadata }, __dragging_initializers, __dragging_extraInitializers);
            __esDecorate(this, null, __isOutside_decorators, { kind: "accessor", name: "_isOutside", static: false, private: false, access: { has: obj => "_isOutside" in obj, get: obj => obj._isOutside, set: (obj, value) => { obj._isOutside = value; } }, metadata: _metadata }, __isOutside_initializers, __isOutside_extraInitializers);
            __esDecorate(this, null, __shapeElement_decorators, { kind: "accessor", name: "_shapeElement", static: false, private: false, access: { has: obj => "_shapeElement" in obj, get: obj => obj._shapeElement, set: (obj, value) => { obj._shapeElement = value; } }, metadata: _metadata }, __shapeElement_initializers, __shapeElement_extraInitializers);
            __esDecorate(this, null, __startCoord_decorators, { kind: "accessor", name: "_startCoord", static: false, private: false, access: { has: obj => "_startCoord" in obj, get: obj => obj._startCoord, set: (obj, value) => { obj._startCoord = value; } }, metadata: _metadata }, __startCoord_initializers, __startCoord_extraInitializers);
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _getContainerRect_decorators, { kind: "accessor", name: "getContainerRect", static: false, private: false, access: { has: obj => "getContainerRect" in obj, get: obj => obj.getContainerRect, set: (obj, value) => { obj.getContainerRect = value; } }, metadata: _metadata }, _getContainerRect_initializers, _getContainerRect_extraInitializers);
            __esDecorate(this, null, _handleClick_decorators, { kind: "accessor", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick, set: (obj, value) => { obj.handleClick = value; } }, metadata: _metadata }, _handleClick_initializers, _handleClick_extraInitializers);
            __esDecorate(this, null, _order_decorators, { kind: "accessor", name: "order", static: false, private: false, access: { has: obj => "order" in obj, get: obj => obj.order, set: (obj, value) => { obj.order = value; } }, metadata: _metadata }, _order_initializers, _order_extraInitializers);
            __esDecorate(this, null, _shape_decorators, { kind: "accessor", name: "shape", static: false, private: false, access: { has: obj => "shape" in obj, get: obj => obj.shape, set: (obj, value) => { obj.shape = value; } }, metadata: _metadata }, _shape_initializers, _shape_extraInitializers);
            __esDecorate(this, null, _shapeStyle_decorators, { kind: "accessor", name: "shapeStyle", static: false, private: false, access: { has: obj => "shapeStyle" in obj, get: obj => obj.shapeStyle, set: (obj, value) => { obj.shapeStyle = value; } }, metadata: _metadata }, _shapeStyle_initializers, _shapeStyle_extraInitializers);
            __esDecorate(this, null, _shapeType_decorators, { kind: "accessor", name: "shapeType", static: false, private: false, access: { has: obj => "shapeType" in obj, get: obj => obj.shapeType, set: (obj, value) => { obj.shapeType = value; } }, metadata: _metadata }, _shapeType_initializers, _shapeType_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .shape {
      --x: 0px;
      --y: 0px;
      --offset-x: 0px;
      --offset-y: 0px;
      --scale: 1;
      transform: translateX(calc(var(--offset-x) + var(--x)))
        translateY(calc(var(--y) + var(--offset-y))) scale(var(--scale));
      height: 60px;
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 12px;
      left: 16px;
      transition: all 0.5s cubic-bezier(0, -0.01, 0.01, 1.01);
    }
    .shape.dragging {
      transition: none;
    }
    .shape svg {
      height: 100%;
      filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));
    }
  `; }
        connectedCallback() {
            super.connectedCallback();
            this._disposables.addFromEvent(this.edgeless.host, 'mousemove', this._onMouseMove);
            this._disposables.addFromEvent(this.edgeless.host, 'touchmove', this._touchMove);
            this._disposables.addFromEvent(this.edgeless.host, 'mouseup', this._onMouseUp);
            this._disposables.addFromEvent(this.edgeless.host, 'touchend', this._onTouchEnd);
        }
        render() {
            return html `
      <div
        id="shape-tool-element"
        class="shape"
        @mousedown=${(event) => this._onDragStart({ x: event.clientX, y: event.clientY })}
        @touchstart=${(event) => {
                event.preventDefault();
                this._onDragStart({
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY,
                });
            }}
      >
        ${this.shape.svg}
      </div>
      ${this.order === 1
                ? html `<div id="backup-shape-element" class="shape">
            ${this.shape.svg}
          </div>`
                : null}
    `;
        }
        updated(changedProperties) {
            if (!changedProperties.has('shape') && !changedProperties.has('order')) {
                return;
            }
            const transform = this._transformMap[this.order <= 3 ? `z${this.order}` : 'hidden'];
            this._shapeElement.style.setProperty('--x', `${transform.x}px`);
            this._shapeElement.style.setProperty('--y', `${transform.y}px`);
            this._shapeElement.style.setProperty('--scale', String(transform.scale || 1));
            this._shapeElement.style.zIndex = String(999 - this.order);
            this._shapeElement.style.transformOrigin = transform.origin;
            if (this._backupShapeElement) {
                this._backupShapeElement.style.setProperty('--y', '100px');
                this._backupShapeElement.style.setProperty('--scale', '0.9');
                this._backupShapeElement.style.zIndex = '999';
            }
        }
        #_backupShapeElement_accessor_storage;
        get _backupShapeElement() { return this.#_backupShapeElement_accessor_storage; }
        set _backupShapeElement(value) { this.#_backupShapeElement_accessor_storage = value; }
        #_dragging_accessor_storage;
        get _dragging() { return this.#_dragging_accessor_storage; }
        set _dragging(value) { this.#_dragging_accessor_storage = value; }
        #_isOutside_accessor_storage;
        get _isOutside() { return this.#_isOutside_accessor_storage; }
        set _isOutside(value) { this.#_isOutside_accessor_storage = value; }
        #_shapeElement_accessor_storage;
        get _shapeElement() { return this.#_shapeElement_accessor_storage; }
        set _shapeElement(value) { this.#_shapeElement_accessor_storage = value; }
        #_startCoord_accessor_storage;
        get _startCoord() { return this.#_startCoord_accessor_storage; }
        set _startCoord(value) { this.#_startCoord_accessor_storage = value; }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #getContainerRect_accessor_storage;
        get getContainerRect() { return this.#getContainerRect_accessor_storage; }
        set getContainerRect(value) { this.#getContainerRect_accessor_storage = value; }
        #handleClick_accessor_storage;
        get handleClick() { return this.#handleClick_accessor_storage; }
        set handleClick(value) { this.#handleClick_accessor_storage = value; }
        #order_accessor_storage;
        get order() { return this.#order_accessor_storage; }
        set order(value) { this.#order_accessor_storage = value; }
        #shape_accessor_storage;
        get shape() { return this.#shape_accessor_storage; }
        set shape(value) { this.#shape_accessor_storage = value; }
        #shapeStyle_accessor_storage;
        get shapeStyle() { return this.#shapeStyle_accessor_storage; }
        set shapeStyle(value) { this.#shapeStyle_accessor_storage = value; }
        #shapeType_accessor_storage;
        get shapeType() { return this.#shapeType_accessor_storage; }
        set shapeType(value) { this.#shapeType_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._addShape = (coord, padding) => {
                const width = 100;
                const height = 100;
                const { x: edgelessX, y: edgelessY } = this.edgeless.getBoundingClientRect();
                const zoom = this.edgeless.service.viewport.zoom;
                const [modelX, modelY] = this.edgeless.service.viewport.toModelCoord(coord.x - edgelessX - width * padding.x * zoom, coord.y - edgelessY - height * padding.y * zoom);
                const xywh = new Bound(modelX, modelY, width, height).serialize();
                this.edgeless.service.addElement(CanvasElementType.SHAPE, {
                    shapeType: getShapeType(this.shape.name),
                    xywh: xywh,
                    radius: getShapeRadius(this.shape.name),
                });
            };
            this._onDragEnd = async (coord) => {
                if (this._startCoord.x === coord.x && this._startCoord.y === coord.y) {
                    this.handleClick();
                    this._dragging = false;
                    return;
                }
                if (!this._dragging) {
                    return;
                }
                this._dragging = false;
                this.edgeless.gfx.tool.setTool('default');
                if (this._isOutside) {
                    const rect = this._shapeElement.getBoundingClientRect();
                    this._backupShapeElement.style.setProperty('transition', 'none');
                    this._backupShapeElement.style.setProperty('--y', '100px');
                    this._shapeElement.style.setProperty('--offset-x', `${0}px`);
                    this._shapeElement.style.setProperty('--offset-y', `${0}px`);
                    await sleep(0);
                    this._shapeElement.classList.remove('dragging');
                    this._backupShapeElement.style.removeProperty('transition');
                    const padding = {
                        x: (coord.x - rect.left) / rect.width,
                        y: (coord.y - rect.top) / rect.height,
                    };
                    this._addShape(coord, padding);
                }
                else {
                    this._shapeElement.classList.remove('dragging');
                    this._shapeElement.style.setProperty('--offset-x', `${0}px`);
                    this._shapeElement.style.setProperty('--offset-y', `${0}px`);
                    this._backupShapeElement.style.setProperty('--y', '100px');
                }
            };
            this._onDragMove = (coord) => {
                if (!this._dragging) {
                    return;
                }
                const controller = this.edgeless.gfx.tool.currentTool$.peek();
                if (controller instanceof ShapeTool) {
                    controller.clearOverlay();
                }
                const { x, y } = coord;
                this._shapeElement.style.setProperty('--offset-x', `${x - this._startCoord.x}px`);
                this._shapeElement.style.setProperty('--offset-y', `${y - this._startCoord.y}px`);
                const containerRect = this.getContainerRect();
                const isOut = y < containerRect.top ||
                    x < containerRect.left ||
                    x > containerRect.right;
                if (isOut !== this._isOutside) {
                    this._backupShapeElement.style.setProperty('--y', isOut ? '5px' : '100px');
                    this._backupShapeElement.style.setProperty('--scale', isOut ? '1' : '0.9');
                }
                this._isOutside = isOut;
            };
            this._onDragStart = (coord) => {
                this._startCoord = { x: coord.x, y: coord.y };
                if (this.order !== 1) {
                    return;
                }
                this._dragging = true;
                this._shapeElement.classList.add('dragging');
            };
            this._onMouseMove = (event) => {
                if (!this._dragging) {
                    return;
                }
                this._onDragMove({ x: event.clientX, y: event.clientY });
            };
            this._onMouseUp = (event) => {
                this._onDragEnd({ x: event.clientX, y: event.clientY }).catch(console.error);
            };
            this._onTouchEnd = (event) => {
                if (!event.changedTouches.length)
                    return;
                this._onDragEnd({
                    // https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent#touchend
                    x: event.changedTouches[0].clientX,
                    y: event.changedTouches[0].clientY,
                }).catch(console.error);
            };
            this._touchMove = (event) => {
                if (!this._dragging) {
                    return;
                }
                this._onDragMove({
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY,
                });
            };
            this._transformMap = {
                z1: { x: 0, y: 5, scale: 1.1, origin: '50% 100%' },
                z2: { x: -15, y: 0, scale: 0.75, origin: '20% 20%' },
                z3: { x: 15, y: 0, scale: 0.75, origin: '80% 20%' },
                hidden: { x: 0, y: 120, scale: 0, origin: '50% 50%' },
            };
            this.#_backupShapeElement_accessor_storage = __runInitializers(this, __backupShapeElement_initializers, void 0);
            this.#_dragging_accessor_storage = (__runInitializers(this, __backupShapeElement_extraInitializers), __runInitializers(this, __dragging_initializers, false));
            this.#_isOutside_accessor_storage = (__runInitializers(this, __dragging_extraInitializers), __runInitializers(this, __isOutside_initializers, false));
            this.#_shapeElement_accessor_storage = (__runInitializers(this, __isOutside_extraInitializers), __runInitializers(this, __shapeElement_initializers, void 0));
            this.#_startCoord_accessor_storage = (__runInitializers(this, __shapeElement_extraInitializers), __runInitializers(this, __startCoord_initializers, { x: -1, y: -1 }));
            this.#edgeless_accessor_storage = (__runInitializers(this, __startCoord_extraInitializers), __runInitializers(this, _edgeless_initializers, void 0));
            this.#getContainerRect_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _getContainerRect_initializers, void 0));
            this.#handleClick_accessor_storage = (__runInitializers(this, _getContainerRect_extraInitializers), __runInitializers(this, _handleClick_initializers, void 0));
            this.#order_accessor_storage = (__runInitializers(this, _handleClick_extraInitializers), __runInitializers(this, _order_initializers, void 0));
            this.#shape_accessor_storage = (__runInitializers(this, _order_extraInitializers), __runInitializers(this, _shape_initializers, void 0));
            this.#shapeStyle_accessor_storage = (__runInitializers(this, _shape_extraInitializers), __runInitializers(this, _shapeStyle_initializers, void 0));
            this.#shapeType_accessor_storage = (__runInitializers(this, _shapeStyle_extraInitializers), __runInitializers(this, _shapeType_initializers, void 0));
            __runInitializers(this, _shapeType_extraInitializers);
        }
    };
})();
export { EdgelessShapeToolElement };
//# sourceMappingURL=shape-tool-element.js.map