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
import { CanvasRenderer, elementRenderers, fitContent, } from '@blocksuite/affine-block-surface';
import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { BlockComponent } from '@blocksuite/block-std';
import { GfxControllerIdentifier } from '@blocksuite/block-std/gfx';
import { html } from 'lit';
import { query } from 'lit/decorators.js';
let MindmapSurfaceBlock = (() => {
    let _classSuper = BlockComponent;
    let _editorContainer_decorators;
    let _editorContainer_initializers = [];
    let _editorContainer_extraInitializers = [];
    return class MindmapSurfaceBlock extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _editorContainer_decorators = [query('.affine-mini-mindmap-surface')];
            __esDecorate(this, null, _editorContainer_decorators, { kind: "accessor", name: "editorContainer", static: false, private: false, access: { has: obj => "editorContainer" in obj, get: obj => obj.editorContainer, set: (obj, value) => { obj.editorContainer = value; } }, metadata: _metadata }, _editorContainer_initializers, _editorContainer_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get _grid() {
            return this.std.get(GfxControllerIdentifier).grid;
        }
        get _layer() {
            return this.std.get(GfxControllerIdentifier).layer;
        }
        get mindmapService() {
            return this.std.getService('affine:page');
        }
        get viewport() {
            return this.std.get(GfxControllerIdentifier).viewport;
        }
        constructor() {
            super();
            __runInitializers(this, _editorContainer_extraInitializers);
        }
        _adjustNodeWidth() {
            this.model.doc.transact(() => {
                this.model.elementModels.forEach(element => {
                    if (element.type === 'shape') {
                        fitContent(element);
                    }
                });
            });
        }
        _resizeEffect() {
            const observer = new ResizeObserver(() => {
                this.viewport.onResize();
            });
            observer.observe(this.editorContainer);
            this._disposables.add(() => {
                observer.disconnect();
            });
        }
        _setupCenterEffect() {
            this._disposables.add(this.mindmapService.requestCenter.on(() => {
                let bound;
                this.model.elementModels.forEach(el => {
                    if (!bound) {
                        bound = el.elementBound;
                    }
                    else {
                        bound = bound.unite(el.elementBound);
                    }
                });
                if (bound) {
                    this.viewport.setViewportByBound(bound, [10, 10, 10, 10]);
                }
            }));
        }
        _setupRenderer() {
            this._disposables.add(this.model.elementUpdated.on(() => {
                this.mindmapService.center();
            }));
            this.viewport.ZOOM_MIN = 0.01;
        }
        connectedCallback() {
            super.connectedCallback();
            const themeService = this.std.get(ThemeProvider);
            this.renderer = new CanvasRenderer({
                viewport: this.viewport,
                layerManager: this._layer,
                gridManager: this._grid,
                enableStackingCanvas: true,
                provider: {
                    selectedElements: () => [],
                    getColorScheme: () => themeService.edgelessTheme,
                    getColorValue: (color, fallback, real) => themeService.getColorValue(color, fallback, real, themeService.edgelessTheme),
                    generateColorProperty: (color, fallback) => themeService.generateColorProperty(color, fallback, themeService.edgelessTheme),
                    getPropertyValue: (property) => themeService.getCssVariableColor(property, themeService.edgelessTheme),
                },
                elementRenderers,
                surfaceModel: this.model,
            });
            this._disposables.add(this.renderer);
        }
        firstUpdated(_changedProperties) {
            this.renderer?.attach(this.editorContainer);
            this._resizeEffect();
            this._setupCenterEffect();
            this._setupRenderer();
            this._adjustNodeWidth();
            this.mindmapService.center();
        }
        render() {
            return html `
      <style>
        .affine-mini-mindmap-surface {
          width: 100%;
          height: 100%;
        }
      </style>
      <div class="affine-mini-mindmap-surface">
        <!-- attach cavnas later in renderer -->
      </div>
    `;
        }
        #editorContainer_accessor_storage = __runInitializers(this, _editorContainer_initializers, void 0);
        get editorContainer() { return this.#editorContainer_accessor_storage; }
        set editorContainer(value) { this.#editorContainer_accessor_storage = value; }
    };
})();
export { MindmapSurfaceBlock };
//# sourceMappingURL=surface-block.js.map