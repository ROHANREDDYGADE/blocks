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
import { CanvasElementType, Overlay, OverlayIdentifier, } from '@blocksuite/affine-block-surface';
import { ConnectorPathGenerator } from '@blocksuite/affine-block-surface';
import { AutoCompleteArrowIcon, MindMapChildIcon, MindMapSiblingIcon, NoteAutoCompleteIcon, } from '@blocksuite/affine-components/icons';
import { DEFAULT_NOTE_HEIGHT, DEFAULT_SHAPE_STROKE_COLOR, LayoutType, MindmapElementModel, ShapeElementModel, shapeMethods, } from '@blocksuite/affine-model';
import { handleNativeRangeAtPoint } from '@blocksuite/affine-shared/utils';
import { stdContext } from '@blocksuite/block-std';
import { GfxControllerIdentifier } from '@blocksuite/block-std/gfx';
import { assertExists, DisposableGroup, Vec, WithDisposable, } from '@blocksuite/global/utils';
import { consume } from '@lit/context';
import { css, html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { isNoteBlock } from '../../utils/query.js';
import { mountShapeTextEditor } from '../../utils/text.js';
import { EdgelessAutoCompletePanel } from './auto-complete-panel.js';
import { createEdgelessElement, Direction, getPosition, isShape, MAIN_GAP, nextBound, } from './utils.js';
class AutoCompleteOverlay extends Overlay {
    constructor() {
        super(...arguments);
        this.linePoints = [];
        this.renderShape = null;
        this.stroke = '';
    }
    render(ctx, _rc) {
        if (this.linePoints.length && this.renderShape) {
            ctx.setLineDash([2, 2]);
            ctx.strokeStyle = this.stroke;
            ctx.beginPath();
            this.linePoints.forEach((p, index) => {
                if (index === 0)
                    ctx.moveTo(p[0], p[1]);
                else
                    ctx.lineTo(p[0], p[1]);
            });
            ctx.stroke();
            this.renderShape(ctx);
            ctx.stroke();
        }
    }
}
let EdgelessAutoComplete = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __isHover_decorators;
    let __isHover_initializers = [];
    let __isHover_extraInitializers = [];
    let __isMoving_decorators;
    let __isMoving_initializers = [];
    let __isMoving_extraInitializers = [];
    let _current_decorators;
    let _current_initializers = [];
    let _current_extraInitializers = [];
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _selectedRect_decorators;
    let _selectedRect_initializers = [];
    let _selectedRect_extraInitializers = [];
    let _std_decorators;
    let _std_initializers = [];
    let _std_extraInitializers = [];
    return class EdgelessAutoComplete extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __isHover_decorators = [state()];
            __isMoving_decorators = [state()];
            _current_decorators = [property({ attribute: false })];
            _edgeless_decorators = [property({ attribute: false })];
            _selectedRect_decorators = [property({ attribute: false })];
            _std_decorators = [consume({
                    context: stdContext,
                })];
            __esDecorate(this, null, __isHover_decorators, { kind: "accessor", name: "_isHover", static: false, private: false, access: { has: obj => "_isHover" in obj, get: obj => obj._isHover, set: (obj, value) => { obj._isHover = value; } }, metadata: _metadata }, __isHover_initializers, __isHover_extraInitializers);
            __esDecorate(this, null, __isMoving_decorators, { kind: "accessor", name: "_isMoving", static: false, private: false, access: { has: obj => "_isMoving" in obj, get: obj => obj._isMoving, set: (obj, value) => { obj._isMoving = value; } }, metadata: _metadata }, __isMoving_initializers, __isMoving_extraInitializers);
            __esDecorate(this, null, _current_decorators, { kind: "accessor", name: "current", static: false, private: false, access: { has: obj => "current" in obj, get: obj => obj.current, set: (obj, value) => { obj.current = value; } }, metadata: _metadata }, _current_initializers, _current_extraInitializers);
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _selectedRect_decorators, { kind: "accessor", name: "selectedRect", static: false, private: false, access: { has: obj => "selectedRect" in obj, get: obj => obj.selectedRect, set: (obj, value) => { obj.selectedRect = value; } }, metadata: _metadata }, _selectedRect_initializers, _selectedRect_extraInitializers);
            __esDecorate(this, null, _std_decorators, { kind: "accessor", name: "std", static: false, private: false, access: { has: obj => "std" in obj, get: obj => obj.std, set: (obj, value) => { obj.std = value; } }, metadata: _metadata }, _std_initializers, _std_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .edgeless-auto-complete-container {
      position: absolute;
      z-index: 1;
      pointer-events: none;
    }
    .edgeless-auto-complete-arrow-wrapper {
      width: 72px;
      height: 44px;
      position: absolute;
      z-index: 1;
      pointer-events: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .edgeless-auto-complete-arrow-wrapper.hidden {
      display: none;
    }
    .edgeless-auto-complete-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 19px;
      cursor: pointer;
      pointer-events: auto;
      transition:
        background 0.3s linear,
        box-shadow 0.2s linear;
    }
    .edgeless-auto-complete-arrow-wrapper.mindmap {
      width: 26px;
      height: 26px;
    }

    .edgeless-auto-complete-arrow-wrapper:hover
      > .edgeless-auto-complete-arrow {
      border: 1px solid var(--affine-border-color);
      box-shadow: var(--affine-shadow-1);
      background: var(--affine-white);
    }

    .edgeless-auto-complete-arrow-wrapper
      > .edgeless-auto-complete-arrow:hover {
      border: 1px solid var(--affine-white-10);
      box-shadow: var(--affine-shadow-1);
      background: var(--affine-primary-color);
    }

    .edgeless-auto-complete-arrow-wrapper.mindmap
      > .edgeless-auto-complete-arrow {
      border: 1px solid var(--affine-border-color);
      box-shadow: var(--affine-shadow-1);
      background: var(--affine-white);

      transition:
        background 0.3s linear,
        color 0.2s linear;
    }

    .edgeless-auto-complete-arrow-wrapper.mindmap
      > .edgeless-auto-complete-arrow:hover {
      border: 1px solid var(--affine-white-10);
      box-shadow: var(--affine-shadow-1);
      background: var(--affine-primary-color);
    }

    .edgeless-auto-complete-arrow svg {
      fill: #77757d;
      color: #77757d;
    }
    .edgeless-auto-complete-arrow:hover svg {
      fill: #ffffff;
      color: #ffffff;
    }
  `; }
        get canShowAutoComplete() {
            const { current } = this;
            return isShape(current) || isNoteBlock(current);
        }
        get connectionOverlay() {
            return this.std.get(OverlayIdentifier('connection'));
        }
        _addConnector(source, target) {
            const { edgeless } = this;
            const id = edgeless.service.addElement(CanvasElementType.CONNECTOR, {
                source,
                target,
            });
            return edgeless.service.getElementById(id);
        }
        _addMindmapNode(target) {
            const mindmap = this.current.group;
            if (!(mindmap instanceof MindmapElementModel))
                return;
            const parent = target === 'sibling'
                ? (mindmap.getParentNode(this.current.id) ?? this.current)
                : this.current;
            const parentNode = mindmap.getNode(parent.id);
            if (!parentNode)
                return;
            const newNode = mindmap.addNode(parentNode.id, target === 'sibling' ? this.current.id : undefined, undefined, undefined);
            if (parentNode.detail.collapsed) {
                mindmap.toggleCollapse(parentNode);
            }
            requestAnimationFrame(() => {
                mountShapeTextEditor(this.edgeless.service.getElementById(newNode), this.edgeless);
            });
        }
        _computeLine(type, curShape, nextBound) {
            const startBound = this.current.elementBound;
            const { startPosition, endPosition } = getPosition(type);
            const nextShape = {
                xywh: nextBound.serialize(),
                rotate: curShape.rotate,
                shapeType: curShape.shapeType,
            };
            const startPoint = curShape.getRelativePointLocation(startPosition);
            const endPoint = curShape.getRelativePointLocation.call(nextShape, endPosition);
            return this._pathGenerator.generateOrthogonalConnectorPath({
                startBound,
                endBound: nextBound,
                startPoint,
                endPoint,
            });
        }
        _computeNextBound(type) {
            if (isShape(this.current)) {
                const connectedShapes = this._getConnectedElements(this.current).filter(e => e instanceof ShapeElementModel);
                return nextBound(type, this.current, connectedShapes);
            }
            else {
                const bound = this.current.elementBound;
                switch (type) {
                    case Direction.Right: {
                        bound.x += bound.w + MAIN_GAP;
                        break;
                    }
                    case Direction.Bottom: {
                        bound.y += bound.h + MAIN_GAP;
                        break;
                    }
                    case Direction.Left: {
                        bound.x -= bound.w + MAIN_GAP;
                        break;
                    }
                    case Direction.Top: {
                        bound.y -= bound.h + MAIN_GAP;
                        break;
                    }
                }
                return bound;
            }
        }
        _createAutoCompletePanel(e, connector) {
            if (!this.canShowAutoComplete)
                return;
            const position = this.edgeless.service.viewport.toModelCoord(e.clientX, e.clientY);
            const autoCompletePanel = new EdgelessAutoCompletePanel(position, this.edgeless, this.current, connector);
            this.edgeless.append(autoCompletePanel);
        }
        _generateElementOnClick(type) {
            const { doc, service } = this.edgeless;
            const bound = this._computeNextBound(type);
            const id = createEdgelessElement(this.edgeless, this.current, bound);
            if (isShape(this.current)) {
                const { startPosition, endPosition } = getPosition(type);
                this._addConnector({
                    id: this.current.id,
                    position: startPosition,
                }, {
                    id,
                    position: endPosition,
                });
                mountShapeTextEditor(service.getElementById(id), this.edgeless);
            }
            else {
                const model = doc.getBlockById(id);
                assertExists(model);
                const [x, y] = service.viewport.toViewCoord(bound.center[0], bound.y + DEFAULT_NOTE_HEIGHT / 2);
                requestAnimationFrame(() => {
                    handleNativeRangeAtPoint(x, y);
                });
            }
            this.edgeless.service.selection.set({
                elements: [id],
                editing: true,
            });
            this.removeOverlay();
        }
        _getConnectedElements(element) {
            const service = this.edgeless.service;
            return service.getConnectors(element.id).reduce((prev, current) => {
                if (current.target.id === element.id && current.source.id) {
                    prev.push(service.getElementById(current.source.id));
                }
                if (current.source.id === element.id && current.target.id) {
                    prev.push(service.getElementById(current.target.id));
                }
                return prev;
            }, []);
        }
        _getMindmapButtons() {
            const mindmap = this.current.group;
            const mindmapDirection = this.current instanceof ShapeElementModel &&
                mindmap instanceof MindmapElementModel
                ? mindmap.getLayoutDir(this.current.id)
                : null;
            const isRoot = mindmap?.tree.id === this.current.id;
            const mindmapNode = mindmap.getNode(this.current.id);
            let buttons = [];
            switch (mindmapDirection) {
                case LayoutType.LEFT:
                    buttons = [[Direction.Left, 'child', LayoutType.LEFT]];
                    if (!isRoot) {
                        buttons.push([Direction.Bottom, 'sibling', mindmapDirection]);
                    }
                    break;
                case LayoutType.RIGHT:
                    buttons = [[Direction.Right, 'child', LayoutType.RIGHT]];
                    if (!isRoot) {
                        buttons.push([Direction.Bottom, 'sibling', mindmapDirection]);
                    }
                    break;
                case LayoutType.BALANCE:
                    buttons = [
                        [Direction.Right, 'child', LayoutType.RIGHT],
                        [Direction.Left, 'child', LayoutType.LEFT],
                    ];
                    break;
                default:
                    buttons = [];
            }
            return buttons.length
                ? {
                    mindmapNode,
                    buttons,
                }
                : null;
        }
        _initOverlay() {
            const { surface } = this.edgeless;
            this._autoCompleteOverlay = new AutoCompleteOverlay(this.std.get(GfxControllerIdentifier));
            surface.renderer.addOverlay(this._autoCompleteOverlay);
        }
        _renderArrow() {
            const isShape = this.current instanceof ShapeElementModel;
            const { selectedRect } = this;
            const { zoom } = this.edgeless.service.viewport;
            const width = 72;
            const height = 44;
            // Auto-complete arrows for shape and note are different
            // Shape: right, bottom, left, top
            // Note: right, left
            const arrowDirections = isShape
                ? [Direction.Right, Direction.Bottom, Direction.Left, Direction.Top]
                : [Direction.Right, Direction.Left];
            const arrowMargin = isShape ? height / 2 : height * (2 / 3);
            const Arrows = arrowDirections.map(type => {
                let transform = '';
                const icon = isShape ? AutoCompleteArrowIcon : NoteAutoCompleteIcon;
                switch (type) {
                    case Direction.Top:
                        transform += `translate(${selectedRect.width / 2}px, ${-arrowMargin}px)`;
                        break;
                    case Direction.Right:
                        transform += `translate(${selectedRect.width + arrowMargin}px, ${selectedRect.height / 2}px)`;
                        isShape && (transform += `rotate(90deg)`);
                        break;
                    case Direction.Bottom:
                        transform += `translate(${selectedRect.width / 2}px, ${selectedRect.height + arrowMargin}px)`;
                        isShape && (transform += `rotate(180deg)`);
                        break;
                    case Direction.Left:
                        transform += `translate(${-arrowMargin}px, ${selectedRect.height / 2}px)`;
                        isShape && (transform += `rotate(-90deg)`);
                        break;
                }
                transform += `translate(${-width / 2}px, ${-height / 2}px)`;
                const arrowWrapperClasses = classMap({
                    'edgeless-auto-complete-arrow-wrapper': true,
                    hidden: !isShape && type === Direction.Left && zoom >= 1.5,
                });
                return html `<div
        class=${arrowWrapperClasses}
        style=${styleMap({
                    transform,
                    transformOrigin: 'left top',
                })}
      >
        <div
          class="edgeless-auto-complete-arrow"
          @mouseenter=${() => {
                    this._timer = setTimeout(() => {
                        if (this.current instanceof ShapeElementModel) {
                            const bound = this._computeNextBound(type);
                            const path = this._computeLine(type, this.current, bound);
                            this._showNextShape(this.current, bound, path, this.current.shapeType);
                        }
                    }, 300);
                }}
          @mouseleave=${() => {
                    this.removeOverlay();
                }}
          @pointerdown=${(e) => {
                    this._onPointerDown(e, type);
                }}
        >
          ${icon}
        </div>
      </div>`;
            });
            return Arrows;
        }
        _renderMindMapButtons() {
            const mindmapButtons = this._getMindmapButtons();
            if (!mindmapButtons) {
                return;
            }
            const { selectedRect } = this;
            const { zoom } = this.edgeless.service.viewport;
            const size = 26;
            const buttonMargin = (mindmapButtons.mindmapNode?.children.length ?? 0) > 0
                ? size / 2 + 32 * zoom
                : size / 2 + 6;
            const verticalMargin = size / 2 + 6;
            return mindmapButtons.buttons.map(type => {
                let transform = '';
                const [position, target, layout] = type;
                const isLeftLayout = layout === LayoutType.LEFT;
                const icon = target === 'child' ? MindMapChildIcon : MindMapSiblingIcon;
                switch (position) {
                    case Direction.Bottom:
                        transform += `translate(${selectedRect.width / 2}px, ${selectedRect.height + verticalMargin}px)`;
                        isLeftLayout && (transform += `scale(-1)`);
                        break;
                    case Direction.Right:
                        transform += `translate(${selectedRect.width + buttonMargin}px, ${selectedRect.height / 2}px)`;
                        break;
                    case Direction.Left:
                        transform += `translate(${-buttonMargin}px, ${selectedRect.height / 2}px)`;
                        transform += `scale(-1)`;
                        break;
                }
                transform += `translate(${-size / 2}px, ${-size / 2}px)`;
                const arrowWrapperClasses = classMap({
                    'edgeless-auto-complete-arrow-wrapper': true,
                    hidden: position === Direction.Left && zoom >= 1.5,
                    mindmap: true,
                });
                return html `<div
        class=${arrowWrapperClasses}
        style=${styleMap({
                    transform,
                    transformOrigin: 'left top',
                })}
      >
        <div
          class="edgeless-auto-complete-arrow"
          @pointerdown=${() => {
                    this._addMindmapNode(target);
                }}
        >
          ${icon}
        </div>
      </div>`;
            });
        }
        _showNextShape(current, bound, path, targetType) {
            const { surface } = this.edgeless;
            this._autoCompleteOverlay.stroke = surface.renderer.getColorValue(current.strokeColor, DEFAULT_SHAPE_STROKE_COLOR, true);
            this._autoCompleteOverlay.linePoints = path;
            this._autoCompleteOverlay.renderShape = ctx => {
                shapeMethods[targetType].draw(ctx, { ...bound, rotate: current.rotate });
            };
            surface.refresh();
        }
        connectedCallback() {
            super.connectedCallback();
            this._pathGenerator = new ConnectorPathGenerator({
                getElementById: id => this.edgeless.service.getElementById(id),
            });
            this._initOverlay();
        }
        firstUpdated() {
            const { _disposables, edgeless } = this;
            _disposables.add(this.edgeless.service.selection.slots.updated.on(() => {
                this._autoCompleteOverlay.linePoints = [];
                this._autoCompleteOverlay.renderShape = null;
            }));
            _disposables.add(() => this.removeOverlay());
            _disposables.add(edgeless.host.event.add('pointerMove', ctx => {
                const evt = ctx.get('pointerState');
                const [x, y] = edgeless.gfx.viewport.toModelCoord(evt.x, evt.y);
                const elm = edgeless.gfx.getElementByPoint(x, y);
                if (!elm) {
                    this._isHover = false;
                    return;
                }
                this._isHover = elm === this.current ? true : false;
            }));
            this.edgeless.handleEvent('dragStart', () => {
                this._isMoving = true;
            });
            this.edgeless.handleEvent('dragEnd', () => {
                this._isMoving = false;
            });
        }
        removeOverlay() {
            this._timer && clearTimeout(this._timer);
            this.edgeless.surface.renderer.removeOverlay(this._autoCompleteOverlay);
        }
        render() {
            const isShape = this.current instanceof ShapeElementModel;
            const isMindMap = this.current.group instanceof MindmapElementModel;
            if (this._isMoving || (this._isHover && !isShape)) {
                this.removeOverlay();
                return nothing;
            }
            const { selectedRect } = this;
            return html `<div
      class="edgeless-auto-complete-container"
      style=${styleMap({
                top: selectedRect.top + 'px',
                left: selectedRect.left + 'px',
                width: selectedRect.width + 'px',
                height: selectedRect.height + 'px',
                transform: `rotate(${selectedRect.rotate}deg)`,
            })}
    >
      ${isMindMap ? this._renderMindMapButtons() : this._renderArrow()}
    </div>`;
        }
        #_isHover_accessor_storage;
        get _isHover() { return this.#_isHover_accessor_storage; }
        set _isHover(value) { this.#_isHover_accessor_storage = value; }
        #_isMoving_accessor_storage;
        get _isMoving() { return this.#_isMoving_accessor_storage; }
        set _isMoving(value) { this.#_isMoving_accessor_storage = value; }
        #current_accessor_storage;
        get current() { return this.#current_accessor_storage; }
        set current(value) { this.#current_accessor_storage = value; }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #selectedRect_accessor_storage;
        get selectedRect() { return this.#selectedRect_accessor_storage; }
        set selectedRect(value) { this.#selectedRect_accessor_storage = value; }
        #std_accessor_storage;
        get std() { return this.#std_accessor_storage; }
        set std(value) { this.#std_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._onPointerDown = (e, type) => {
                const { service } = this.edgeless;
                const viewportRect = service.viewport.boundingClientRect;
                const start = service.viewport.toModelCoord(e.clientX - viewportRect.left, e.clientY - viewportRect.top);
                if (!this.edgeless.dispatcher)
                    return;
                let connector;
                this._disposables.addFromEvent(document, 'pointermove', e => {
                    const point = service.viewport.toModelCoord(e.clientX - viewportRect.left, e.clientY - viewportRect.top);
                    if (Vec.dist(start, point) > 8 && !this._isMoving) {
                        if (!this.canShowAutoComplete)
                            return;
                        this._isMoving = true;
                        const { startPosition } = getPosition(type);
                        connector = this._addConnector({
                            id: this.current.id,
                            position: startPosition,
                        }, {
                            position: point,
                        });
                    }
                    if (this._isMoving) {
                        assertExists(connector);
                        const otherSideId = connector.source.id;
                        connector.target = this.connectionOverlay.renderConnector(point, otherSideId ? [otherSideId] : []);
                    }
                });
                this._disposables.addFromEvent(document, 'pointerup', e => {
                    if (!this._isMoving) {
                        this._generateElementOnClick(type);
                    }
                    else if (connector && !connector.target.id) {
                        this.edgeless.service.selection.clear();
                        this._createAutoCompletePanel(e, connector);
                    }
                    this._isMoving = false;
                    this.connectionOverlay.clear();
                    this._disposables.dispose();
                    this._disposables = new DisposableGroup();
                });
            };
            this._timer = null;
            this.#_isHover_accessor_storage = __runInitializers(this, __isHover_initializers, true);
            this.#_isMoving_accessor_storage = (__runInitializers(this, __isHover_extraInitializers), __runInitializers(this, __isMoving_initializers, false));
            this.#current_accessor_storage = (__runInitializers(this, __isMoving_extraInitializers), __runInitializers(this, _current_initializers, void 0));
            this.#edgeless_accessor_storage = (__runInitializers(this, _current_extraInitializers), __runInitializers(this, _edgeless_initializers, void 0));
            this.#selectedRect_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _selectedRect_initializers, void 0));
            this.#std_accessor_storage = (__runInitializers(this, _selectedRect_extraInitializers), __runInitializers(this, _std_initializers, void 0));
            __runInitializers(this, _std_extraInitializers);
        }
    };
})();
export { EdgelessAutoComplete };
//# sourceMappingURL=edgeless-auto-complete.js.map