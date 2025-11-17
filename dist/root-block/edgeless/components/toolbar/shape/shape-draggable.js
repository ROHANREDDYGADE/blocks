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
import { ellipseSvg, roundedSvg, triangleSvg, } from '@blocksuite/affine-components/icons';
import { getShapeRadius, getShapeType, ShapeType, } from '@blocksuite/affine-model';
import { EditPropsStore, TelemetryProvider, ThemeProvider, } from '@blocksuite/affine-shared/services';
import { assertExists, SignalWatcher } from '@blocksuite/global/utils';
import { css, html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ShapeTool } from '../../../gfx-tool/shape-tool.js';
import { EdgelessDraggableElementController } from '../common/draggable/draggable-element.controller.js';
import { EdgelessToolbarToolMixin } from '../mixins/tool.mixin.js';
import { buildVariablesObject } from './utils.js';
const shapes = [];
// to move shapes together
const oy = -2;
const ox = 0;
shapes.push({
    name: 'roundedRect',
    svg: roundedSvg,
    style: {
        default: { x: -9, y: 6 },
        hover: { y: -5, z: 1 },
        next: { y: 60 },
    },
});
shapes.push({
    name: ShapeType.Ellipse,
    svg: ellipseSvg,
    style: {
        default: { x: -20, y: 31 },
        hover: { y: 15, z: 1 },
        next: { y: 64 },
    },
});
shapes.push({
    name: ShapeType.Triangle,
    svg: triangleSvg,
    style: {
        default: { x: 18, y: 25 },
        hover: { y: 7, z: 1 },
        next: { y: 64 },
    },
});
shapes.forEach(s => {
    Object.values(s.style).forEach(style => {
        if (style.y)
            style.y += oy;
        if (style.x)
            style.x += ox;
    });
});
let EdgelessToolbarShapeDraggable = (() => {
    let _classSuper = EdgelessToolbarToolMixin(SignalWatcher(LitElement));
    let _onShapeClick_decorators;
    let _onShapeClick_initializers = [];
    let _onShapeClick_extraInitializers = [];
    let _readyToDrop_decorators;
    let _readyToDrop_initializers = [];
    let _readyToDrop_extraInitializers = [];
    let _shapeContainer_decorators;
    let _shapeContainer_initializers = [];
    let _shapeContainer_extraInitializers = [];
    return class EdgelessToolbarShapeDraggable extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _onShapeClick_decorators = [property({ attribute: false })];
            _readyToDrop_decorators = [state()];
            _shapeContainer_decorators = [query('.edgeless-shape-draggable')];
            __esDecorate(this, null, _onShapeClick_decorators, { kind: "accessor", name: "onShapeClick", static: false, private: false, access: { has: obj => "onShapeClick" in obj, get: obj => obj.onShapeClick, set: (obj, value) => { obj.onShapeClick = value; } }, metadata: _metadata }, _onShapeClick_initializers, _onShapeClick_extraInitializers);
            __esDecorate(this, null, _readyToDrop_decorators, { kind: "accessor", name: "readyToDrop", static: false, private: false, access: { has: obj => "readyToDrop" in obj, get: obj => obj.readyToDrop, set: (obj, value) => { obj.readyToDrop = value; } }, metadata: _metadata }, _readyToDrop_initializers, _readyToDrop_extraInitializers);
            __esDecorate(this, null, _shapeContainer_decorators, { kind: "accessor", name: "shapeContainer", static: false, private: false, access: { has: obj => "shapeContainer" in obj, get: obj => obj.shapeContainer, set: (obj, value) => { obj.shapeContainer = value; } }, metadata: _metadata }, _shapeContainer_initializers, _shapeContainer_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }
    .edgeless-shape-draggable {
      /* avoid shadow clipping */
      --shadow-safe-area: 10px;
      box-sizing: border-box;
      flex-shrink: 0;
      width: calc(100% + 2 * var(--shadow-safe-area));
      height: calc(100% + var(--shadow-safe-area));
      padding-top: var(--shadow-safe-area);
      padding-left: var(--shadow-safe-area);
      padding-right: var(--shadow-safe-area);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      pointer-events: none;
    }

    .shape {
      width: fit-content;
      height: fit-content;
      position: absolute;
      transition:
        transform 0.3s,
        z-index 0.1s;
      transform: translateX(var(--default-x, 0)) translateY(var(--default-y, 0))
        scale(var(--default-s, 1));
      z-index: var(--default-z, 0);
      pointer-events: none;
    }
    .shape svg {
      display: block;
    }
    .shape svg path,
    .shape svg circle,
    .shape svg rect {
      pointer-events: auto;
      cursor: grab;
    }
    .shape:hover,
    .shape.cancel {
      transform: translateX(var(--hover-x, 0)) translateY(var(--hover-y, 0))
        scale(var(--hover-s, 1));
      z-index: var(--hover-z, 0);
    }
    .shape.next {
      transition: all 0.5s cubic-bezier(0.39, 0.28, 0.09, 0.95);
      pointer-events: none;
      transform: translateX(var(--next-x, 0)) translateY(var(--next-y, 0))
        scale(var(--next-s, 1));
    }
    .shape.next.coming {
      transform: translateX(var(--default-x, 0)) translateY(var(--default-y, 0))
        scale(var(--default-s, 1));
    }
  `; }
        get shapeShadow() {
            return this.theme === 'dark'
                ? '0 0 7px rgba(0, 0, 0, .22)'
                : '0 0 5px rgba(0, 0, 0, .2)';
        }
        _setShapeOverlayLock(lock) {
            const controller = this.edgeless.gfx.tool.currentTool$.peek();
            if (controller instanceof ShapeTool) {
                controller.setDisableOverlay(lock);
            }
        }
        initDragController() {
            if (!this.edgeless || !this.toolbarContainer)
                return;
            if (this.draggableController)
                return;
            this.draggableController = new EdgelessDraggableElementController(this, {
                service: this.edgeless.service,
                edgeless: this.edgeless,
                scopeElement: this.toolbarContainer,
                standardWidth: 100,
                clickToDrag: true,
                onOverlayCreated: (overlay, element) => {
                    const shapeName = this.draggableController.states.draggingElement?.data.name;
                    if (!shapeName)
                        return;
                    this.setEdgelessTool({
                        type: 'shape',
                        shapeName,
                    });
                    const controller = this.edgeless.gfx.tool.currentTool$.peek();
                    if (controller instanceof ShapeTool) {
                        controller.clearOverlay();
                    }
                    overlay.element.style.filter = `drop-shadow(${this.shapeShadow})`;
                    this.readyToDrop = true;
                    this.draggingShape = element.data.name;
                },
                onDrop: (el, bound) => {
                    const xywh = bound.serialize();
                    const shape = el.data;
                    const id = this.edgeless.service.addElement(CanvasElementType.SHAPE, {
                        shapeType: getShapeType(shape.name),
                        xywh,
                        radius: getShapeRadius(shape.name),
                    });
                    this.edgeless.std
                        .getOptional(TelemetryProvider)
                        ?.track('CanvasElementAdded', {
                        control: 'toolbar:dnd',
                        page: 'whiteboard editor',
                        module: 'toolbar',
                        segment: 'toolbar',
                        type: 'shape',
                        other: {
                            shapeType: getShapeType(shape.name),
                        },
                    });
                    this._setShapeOverlayLock(false);
                    this.readyToDrop = false;
                    this.edgeless.gfx.tool.setTool('default');
                    this.edgeless.gfx.selection.set({
                        elements: [id],
                        editing: false,
                    });
                },
                onCanceled: () => {
                    this._setShapeOverlayLock(false);
                    this.readyToDrop = false;
                },
                onElementClick: el => {
                    this.onShapeClick?.(el.data);
                    this._setShapeOverlayLock(true);
                },
                onEnterOrLeaveScope: (overlay, isOutside) => {
                    overlay.element.style.filter = isOutside
                        ? 'none'
                        : `drop-shadow(${this.shapeShadow})`;
                },
            });
            this.edgeless.bindHotKey({
                s: ctx => {
                    // `page.keyboard.press('Shift+s')` in playwright will also trigger this 's' key event
                    if (ctx.get('keyboardState').raw.shiftKey)
                        return;
                    const service = this.edgeless.service;
                    if (service.locked || service.selection.editing)
                        return;
                    if (this.readyToDrop) {
                        const activeIndex = shapes.findIndex(s => s.name === this.draggingShape);
                        const nextIndex = (activeIndex + 1) % shapes.length;
                        const next = shapes[nextIndex];
                        this.draggingShape = next.name;
                        this.draggableController.cancelWithoutAnimation();
                    }
                    const el = this.shapeContainer.querySelector(`.shape.${this.draggingShape}`);
                    assertExists(el, 'Edgeless toolbar Shape element not found');
                    const { x, y } = service.gfx.tool.lastMousePos$.peek();
                    const { left, top } = this.edgeless.viewport;
                    const clientPos = { x: x + left, y: y + top };
                    this.draggableController.clickToDrag(el, clientPos);
                },
            }, { global: true });
        }
        render() {
            const { cancelled, dragOut, draggingElement } = this.draggableController?.states || {};
            const draggingShape = draggingElement?.data;
            return html `<div class="edgeless-shape-draggable">
      ${repeat(shapes, s => s.name, shape => {
                const isBeingDragged = draggingShape?.name === shape.name;
                const { fillColor, strokeColor } = this.edgeless.std.get(EditPropsStore).lastProps$.value[`shape:${shape.name}`] || {};
                const color = this.edgeless.std
                    .get(ThemeProvider)
                    .generateColorProperty(fillColor);
                const stroke = this.edgeless.std
                    .get(ThemeProvider)
                    .generateColorProperty(strokeColor);
                const baseStyle = {
                    ...buildVariablesObject(shape.style),
                    filter: `drop-shadow(${this.shapeShadow})`,
                    color,
                    stroke,
                };
                const currStyle = styleMap({
                    ...baseStyle,
                    opacity: isBeingDragged ? 0 : 1,
                });
                const nextStyle = styleMap(baseStyle);
                return html `${isBeingDragged
                    ? html `<div
                  style=${nextStyle}
                  class=${classMap({
                        shape: true,
                        next: true,
                        coming: !!dragOut && !cancelled,
                    })}
                >
                  ${shape.svg}
                </div>`
                    : nothing}
            <div
              style=${currStyle}
              class=${classMap({
                    shape: true,
                    [shape.name]: true,
                    cancel: isBeingDragged && !dragOut,
                })}
              @mousedown=${(e) => this.draggableController.onMouseDown(e, {
                    data: shape,
                    preview: shape.svg,
                })}
              @touchstart=${(e) => this.draggableController.onTouchStart(e, {
                    data: shape,
                    preview: shape.svg,
                })}
              @click=${(e) => e.stopPropagation()}
            >
              ${shape.svg}
            </div>`;
            })}
    </div>`;
        }
        updated(_changedProperties) {
            const controllerRequiredProps = ['edgeless', 'toolbarContainer'];
            if (controllerRequiredProps.some(p => _changedProperties.has(p)) &&
                !this.draggableController) {
                this.initDragController();
            }
        }
        #onShapeClick_accessor_storage;
        get onShapeClick() { return this.#onShapeClick_accessor_storage; }
        set onShapeClick(value) { this.#onShapeClick_accessor_storage = value; }
        #readyToDrop_accessor_storage;
        get readyToDrop() { return this.#readyToDrop_accessor_storage; }
        set readyToDrop(value) { this.#readyToDrop_accessor_storage = value; }
        #shapeContainer_accessor_storage;
        get shapeContainer() { return this.#shapeContainer_accessor_storage; }
        set shapeContainer(value) { this.#shapeContainer_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this.draggingShape = 'roundedRect';
            this.type = 'shape';
            this.#onShapeClick_accessor_storage = __runInitializers(this, _onShapeClick_initializers, () => { });
            this.#readyToDrop_accessor_storage = (__runInitializers(this, _onShapeClick_extraInitializers), __runInitializers(this, _readyToDrop_initializers, false));
            this.#shapeContainer_accessor_storage = (__runInitializers(this, _readyToDrop_extraInitializers), __runInitializers(this, _shapeContainer_initializers, void 0));
            __runInitializers(this, _shapeContainer_extraInitializers);
        }
    };
})();
export { EdgelessToolbarShapeDraggable };
//# sourceMappingURL=shape-draggable.js.map