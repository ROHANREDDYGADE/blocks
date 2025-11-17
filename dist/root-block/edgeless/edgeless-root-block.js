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
import { CommonUtils } from '@blocksuite/affine-block-surface';
import { toast } from '@blocksuite/affine-components/toast';
import { EditPropsStore, FontLoaderService, ThemeProvider, } from '@blocksuite/affine-shared/services';
import { isTouchPadPinchEvent, requestConnectedFrame, requestThrottledConnectedFrame, } from '@blocksuite/affine-shared/utils';
import { BlockComponent } from '@blocksuite/block-std';
import { GfxControllerIdentifier, } from '@blocksuite/block-std/gfx';
import { IS_WINDOWS } from '@blocksuite/global/env';
import { assertExists, Bound, Point, Vec } from '@blocksuite/global/utils';
import { effect } from '@preact/signals-core';
import { css, html } from 'lit';
import { query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { isSingleMindMapNode } from '../../_common/edgeless/mindmap/index.js';
import { EdgelessClipboardController } from './clipboard/clipboard.js';
import { EdgelessPageKeyboardManager } from './edgeless-keyboard.js';
import { getBackgroundGrid, isCanvasElement } from './utils/query.js';
import { mountShapeTextEditor } from './utils/text.js';
import { fitToScreen } from './utils/viewport.js';
const { normalizeWheelDeltaY } = CommonUtils;
let EdgelessRootBlockComponent = (() => {
    let _classSuper = BlockComponent;
    let _backgroundElm_decorators;
    let _backgroundElm_initializers = [];
    let _backgroundElm_extraInitializers = [];
    let _gfxViewportElm_decorators;
    let _gfxViewportElm_initializers = [];
    let _gfxViewportElm_extraInitializers = [];
    let _mountElm_decorators;
    let _mountElm_initializers = [];
    let _mountElm_extraInitializers = [];
    let _surface_decorators;
    let _surface_initializers = [];
    let _surface_extraInitializers = [];
    return class EdgelessRootBlockComponent extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _backgroundElm_decorators = [query('.edgeless-background')];
            _gfxViewportElm_decorators = [query('gfx-viewport')];
            _mountElm_decorators = [query('.edgeless-mount-point')];
            _surface_decorators = [query('affine-surface')];
            __esDecorate(this, null, _backgroundElm_decorators, { kind: "accessor", name: "backgroundElm", static: false, private: false, access: { has: obj => "backgroundElm" in obj, get: obj => obj.backgroundElm, set: (obj, value) => { obj.backgroundElm = value; } }, metadata: _metadata }, _backgroundElm_initializers, _backgroundElm_extraInitializers);
            __esDecorate(this, null, _gfxViewportElm_decorators, { kind: "accessor", name: "gfxViewportElm", static: false, private: false, access: { has: obj => "gfxViewportElm" in obj, get: obj => obj.gfxViewportElm, set: (obj, value) => { obj.gfxViewportElm = value; } }, metadata: _metadata }, _gfxViewportElm_initializers, _gfxViewportElm_extraInitializers);
            __esDecorate(this, null, _mountElm_decorators, { kind: "accessor", name: "mountElm", static: false, private: false, access: { has: obj => "mountElm" in obj, get: obj => obj.mountElm, set: (obj, value) => { obj.mountElm = value; } }, metadata: _metadata }, _mountElm_initializers, _mountElm_extraInitializers);
            __esDecorate(this, null, _surface_decorators, { kind: "accessor", name: "surface", static: false, private: false, access: { has: obj => "surface" in obj, get: obj => obj.surface, set: (obj, value) => { obj.surface = value; } }, metadata: _metadata }, _surface_initializers, _surface_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    affine-edgeless-root {
      -webkit-user-select: none;
      user-select: none;
      display: block;
      height: 100%;
      touch-action: none;
    }

    .widgets-container {
      position: absolute;
      left: 0;
      top: 0;
      pointer-events: none;
      contain: size layout;
      height: 100%;
      width: 100%;
    }

    .widgets-container > * {
      pointer-events: auto;
    }

    .edgeless-background {
      height: 100%;
      background-color: var(--affine-background-primary-color);
      background-image: radial-gradient(
        var(--affine-edgeless-grid-color) 1px,
        var(--affine-background-primary-color) 1px
      );
    }

    .edgeless-container {
      color: var(--affine-text-primary-color);
      position: relative;
    }

    @media print {
      .selected {
        background-color: transparent !important;
      }
    }
  `; }
        get dispatcher() {
            return this.std.event;
        }
        get gfx() {
            return this.std.get(GfxControllerIdentifier);
        }
        get selectedRectWidget() {
            return this.host.view.getWidget('edgeless-selected-rect', this.host.id);
        }
        get slots() {
            return this.service.slots;
        }
        get surfaceBlockModel() {
            return this.model.children.find(child => child.flavour === 'affine:surface');
        }
        /**
         * Don't confuse with `gfx.viewport` which is edgeless-only concept.
         * This refers to the wrapper element of the EditorHost.
         */
        get viewport() {
            const { scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth, clientHeight, } = this.viewportElement;
            const { top, left } = this.viewportElement.getBoundingClientRect();
            return {
                top,
                left,
                scrollLeft,
                scrollTop,
                scrollWidth,
                scrollHeight,
                clientWidth,
                clientHeight,
            };
        }
        get viewportElement() {
            if (this._viewportElement)
                return this._viewportElement;
            this._viewportElement = this.host.closest('.affine-edgeless-viewport');
            assertExists(this._viewportElement);
            return this._viewportElement;
        }
        _initFontLoader() {
            this.std
                .get(FontLoaderService)
                .ready.then(() => {
                this.surface.refresh();
            })
                .catch(console.error);
        }
        _initLayerUpdateEffect() {
            const updateLayers = requestThrottledConnectedFrame(() => {
                const blocks = Array.from(this.gfxViewportElm.children);
                blocks.forEach((block) => {
                    block.updateZIndex?.();
                });
            });
            this._disposables.add(this.gfx.layer.slots.layerUpdated.on(() => updateLayers()));
        }
        _initPanEvent() {
            this.disposables.add(this.dispatcher.add('pan', ctx => {
                const { viewport } = this.gfx;
                if (viewport.locked)
                    return;
                const multiPointersState = ctx.get('multiPointerState');
                const [p1, p2] = multiPointersState.pointers;
                const dx = (0.25 * (p1.delta.x + p2.delta.x)) / viewport.zoom / viewport.scale;
                const dy = (0.25 * (p1.delta.y + p2.delta.y)) / viewport.zoom / viewport.scale;
                // direction is opposite
                viewport.applyDeltaCenter(-dx, -dy);
            }));
        }
        _initPinchEvent() {
            this.disposables.add(this.dispatcher.add('pinch', ctx => {
                const { viewport } = this.gfx;
                if (viewport.locked)
                    return;
                const multiPointersState = ctx.get('multiPointerState');
                const [p1, p2] = multiPointersState.pointers;
                const currentCenter = new Point(0.5 * (p1.x + p2.x), 0.5 * (p1.y + p2.y));
                const lastDistance = Vec.dist([p1.x - p1.delta.x, p1.y - p1.delta.y], [p2.x - p2.delta.x, p2.y - p2.delta.y]);
                const currentDistance = Vec.dist([p1.x, p1.y], [p2.x, p2.y]);
                const zoom = (currentDistance / lastDistance) * viewport.zoom;
                const [baseX, baseY] = viewport.toModelCoord(currentCenter.x, currentCenter.y);
                viewport.setZoom(zoom, new Point(baseX, baseY));
                return false;
            }));
        }
        _initPixelRatioChangeEffect() {
            let media;
            const onPixelRatioChange = () => {
                if (media) {
                    this.gfx.viewport.onResize();
                    media.removeEventListener('change', onPixelRatioChange);
                }
                media = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
                media.addEventListener('change', onPixelRatioChange);
            };
            onPixelRatioChange();
            this._disposables.add(() => {
                media?.removeEventListener('change', onPixelRatioChange);
            });
        }
        _initRemoteCursor() {
            let rafId = null;
            const setRemoteCursor = (pos) => {
                if (rafId)
                    cancelAnimationFrame(rafId);
                rafId = requestConnectedFrame(() => {
                    if (!this.gfx.viewport)
                        return;
                    const cursorPosition = this.gfx.viewport.toModelCoord(pos.x, pos.y);
                    this.gfx.selection.setCursor({
                        x: cursorPosition[0],
                        y: cursorPosition[1],
                    });
                    rafId = null;
                }, this);
            };
            this.handleEvent('pointerMove', e => {
                const pointerEvent = e.get('pointerState');
                setRemoteCursor(pointerEvent);
            });
        }
        _initResizeEffect() {
            const resizeObserver = new ResizeObserver((_) => {
                this.gfx.selection.set(this.gfx.selection.surfaceSelections);
                this.gfx.viewport.onResize();
            });
            resizeObserver.observe(this.viewportElement);
            this._resizeObserver = resizeObserver;
        }
        _initSlotEffects() {
            const { disposables, slots } = this;
            this.disposables.add(this.std.get(ThemeProvider).theme$.subscribe(() => this.surface.refresh()));
            disposables.add(effect(() => {
                this.style.cursor = this.gfx.cursor$.value;
            }));
            let canCopyAsPng = true;
            disposables.add(slots.copyAsPng.on(({ blocks, shapes }) => {
                if (!canCopyAsPng)
                    return;
                canCopyAsPng = false;
                this.clipboardController
                    .copyAsPng(blocks, shapes)
                    .then(() => toast(this.host, 'Copied to clipboard'))
                    .catch(() => toast(this.host, 'Failed to copy as PNG'))
                    .finally(() => {
                    canCopyAsPng = true;
                });
            }));
        }
        _initViewport() {
            const { std, gfx } = this;
            const run = () => {
                const storedViewport = std.get(EditPropsStore).getStorage('viewport');
                if (!storedViewport) {
                    fitToScreen(this.gfx.gfxElements, gfx.viewport, {
                        smooth: false,
                    });
                    return;
                }
                if ('xywh' in storedViewport) {
                    const bound = Bound.deserialize(storedViewport.xywh);
                    gfx.viewport.setViewportByBound(bound, storedViewport.padding);
                }
                else {
                    const { zoom, centerX, centerY } = storedViewport;
                    gfx.viewport.setViewport(zoom, [centerX, centerY]);
                }
            };
            run();
            this._disposables.add(() => {
                std.get(EditPropsStore).setStorage('viewport', {
                    centerX: gfx.viewport.centerX,
                    centerY: gfx.viewport.centerY,
                    zoom: gfx.viewport.zoom,
                });
            });
        }
        _initWheelEvent() {
            this._disposables.add(this.dispatcher.add('wheel', ctx => {
                const state = ctx.get('defaultState');
                const e = state.event;
                e.preventDefault();
                const { viewport } = this.gfx;
                if (viewport.locked)
                    return;
                // zoom
                if (isTouchPadPinchEvent(e)) {
                    const rect = this.getBoundingClientRect();
                    // Perform zooming relative to the mouse position
                    const [baseX, baseY] = this.gfx.viewport.toModelCoord(e.clientX - rect.x, e.clientY - rect.y);
                    const zoom = normalizeWheelDeltaY(e.deltaY, viewport.zoom);
                    viewport.setZoom(zoom, new Point(baseX, baseY));
                    e.stopPropagation();
                }
                // pan
                else {
                    const simulateHorizontalScroll = IS_WINDOWS && e.shiftKey;
                    const dx = simulateHorizontalScroll
                        ? e.deltaY / viewport.zoom
                        : e.deltaX / viewport.zoom;
                    const dy = simulateHorizontalScroll ? 0 : e.deltaY / viewport.zoom;
                    viewport.applyDeltaCenter(dx, dy);
                    viewport.viewportMoved.emit([dx, dy]);
                    e.stopPropagation();
                }
            }));
        }
        bindHotKey(keymap, options) {
            const { gfx } = this;
            const selection = gfx.selection;
            Object.keys(keymap).forEach(key => {
                if (key.length === 1 && key >= 'A' && key <= 'z') {
                    const handler = keymap[key];
                    keymap[key] = ctx => {
                        const elements = selection.selectedElements;
                        if (isSingleMindMapNode(elements) && !selection.editing) {
                            const target = gfx.getElementById(elements[0].id);
                            if (target.text) {
                                this.doc.transact(() => {
                                    target.text.delete(0, target.text.length);
                                    target.text.insert(0, key);
                                });
                            }
                            mountShapeTextEditor(target, this);
                        }
                        else {
                            handler(ctx);
                        }
                    };
                }
            });
            return super.bindHotKey(keymap, options);
        }
        connectedCallback() {
            super.connectedCallback();
            this._initViewport();
            this.clipboardController.hostConnected();
            this.keyboardManager = new EdgelessPageKeyboardManager(this);
            this.handleEvent('selectionChange', () => {
                const surface = this.host.selection.value.find((sel) => sel.is('surface'));
                if (!surface)
                    return;
                const el = this.gfx.getElementById(surface.elements[0]);
                if (isCanvasElement(el)) {
                    return true;
                }
                return;
            });
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.clipboardController.hostDisconnected();
            if (this._resizeObserver) {
                this._resizeObserver.disconnect();
                this._resizeObserver = null;
            }
            this.keyboardManager = null;
        }
        firstUpdated() {
            this._initSlotEffects();
            this._initResizeEffect();
            this._initPixelRatioChangeEffect();
            this._initFontLoader();
            this._initRemoteCursor();
            this._initLayerUpdateEffect();
            this._initWheelEvent();
            this._initPanEvent();
            this._initPinchEvent();
            if (this.doc.readonly) {
                this.gfx.tool.setTool('pan', { panning: true });
            }
            else {
                this.gfx.tool.setTool('default');
            }
            requestConnectedFrame(() => {
                this.requestUpdate();
            }, this);
            this._disposables.add(this.gfx.viewport.viewportUpdated.on(() => {
                this._refreshLayerViewport();
            }));
            this._refreshLayerViewport();
        }
        renderBlock() {
            const widgets = repeat(Object.entries(this.widgets), ([id]) => id, ([_, widget]) => widget);
            return html `
      <div class="edgeless-background edgeless-container">
        <gfx-viewport
          .maxConcurrentRenders=${6}
          .viewport=${this.gfx.viewport}
          .getModelsInViewport=${() => {
                const blocks = this.gfx.grid.search(this.gfx.viewport.viewportBounds, {
                    useSet: true,
                    filter: ['block'],
                });
                return blocks;
            }}
          .host=${this.host}
        >
          ${this.renderChildren(this.model)}
          ${this.renderChildren(this.surfaceBlockModel)}
        </gfx-viewport>
      </div>

      <!--
        Used to mount component before widgets
        Eg., canvas text editor
      -->
      <div class="edgeless-mount-point"></div>

      <div class="widgets-container">${widgets}</div>
    `;
        }
        #backgroundElm_accessor_storage;
        get backgroundElm() { return this.#backgroundElm_accessor_storage; }
        set backgroundElm(value) { this.#backgroundElm_accessor_storage = value; }
        #gfxViewportElm_accessor_storage;
        get gfxViewportElm() { return this.#gfxViewportElm_accessor_storage; }
        set gfxViewportElm(value) { this.#gfxViewportElm_accessor_storage = value; }
        #mountElm_accessor_storage;
        get mountElm() { return this.#mountElm_accessor_storage; }
        set mountElm(value) { this.#mountElm_accessor_storage = value; }
        #surface_accessor_storage;
        get surface() { return this.#surface_accessor_storage; }
        set surface(value) { this.#surface_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._refreshLayerViewport = requestThrottledConnectedFrame(() => {
                const { zoom, translateX, translateY } = this.gfx.viewport;
                const { gap } = getBackgroundGrid(zoom, true);
                if (this.backgroundElm) {
                    this.backgroundElm.style.setProperty('background-position', `${translateX}px ${translateY}px`);
                    this.backgroundElm.style.setProperty('background-size', `${gap}px ${gap}px`);
                }
            }, this);
            this._resizeObserver = null;
            this._viewportElement = null;
            this.clipboardController = new EdgelessClipboardController(this);
            this.keyboardManager = null;
            this.#backgroundElm_accessor_storage = __runInitializers(this, _backgroundElm_initializers, null);
            this.#gfxViewportElm_accessor_storage = (__runInitializers(this, _backgroundElm_extraInitializers), __runInitializers(this, _gfxViewportElm_initializers, void 0));
            this.#mountElm_accessor_storage = (__runInitializers(this, _gfxViewportElm_extraInitializers), __runInitializers(this, _mountElm_initializers, null));
            this.#surface_accessor_storage = (__runInitializers(this, _mountElm_extraInitializers), __runInitializers(this, _surface_initializers, void 0));
            __runInitializers(this, _surface_extraInitializers);
        }
    };
})();
export { EdgelessRootBlockComponent };
//# sourceMappingURL=edgeless-root-block.js.map