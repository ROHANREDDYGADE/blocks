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
import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { GfxBlockComponent } from '@blocksuite/block-std';
import { Bound } from '@blocksuite/global/utils';
import { cssVarV2 } from '@toeverything/theme/v2';
import { html } from 'lit';
import { state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
let FrameBlockComponent = (() => {
    let _classSuper = GfxBlockComponent;
    let _showBorder_decorators;
    let _showBorder_initializers = [];
    let _showBorder_extraInitializers = [];
    return class FrameBlockComponent extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _showBorder_decorators = [state()];
            __esDecorate(this, null, _showBorder_decorators, { kind: "accessor", name: "showBorder", static: false, private: false, access: { has: obj => "showBorder" in obj, get: obj => obj.showBorder, set: (obj, value) => { obj.showBorder = value; } }, metadata: _metadata }, _showBorder_initializers, _showBorder_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get rootService() {
            return this.std.getService('affine:page');
        }
        connectedCallback() {
            super.connectedCallback();
            this._disposables.add(this.doc.slots.blockUpdated.on(({ type, id }) => {
                if (id === this.model.id && type === 'update') {
                    this.requestUpdate();
                }
            }));
            this._disposables.add(this.gfx.viewport.viewportUpdated.on(() => {
                this.requestUpdate();
            }));
        }
        /**
         * Due to potentially very large frame sizes, CSS scaling can cause iOS Safari to crash.
         * To mitigate this issue, we combine size calculations within the rendering rect.
         */
        getCSSTransform() {
            return '';
        }
        getRenderingRect() {
            const viewport = this.gfx.viewport;
            const { translateX, translateY, zoom } = viewport;
            const { xywh, rotate } = this.model;
            const bound = Bound.deserialize(xywh);
            const scaledX = bound.x * zoom + translateX;
            const scaledY = bound.y * zoom + translateY;
            return {
                x: scaledX,
                y: scaledY,
                w: bound.w * zoom,
                h: bound.h * zoom,
                rotate,
                zIndex: this.toZIndex(),
            };
        }
        renderGfxBlock() {
            const { model, showBorder, rootService, std } = this;
            const backgroundColor = std
                .get(ThemeProvider)
                .generateColorProperty(model.background, '--affine-platte-transparent');
            const _isNavigator = this.gfx.tool.currentToolName$.value === 'frameNavigator';
            const frameIndex = rootService.layer.getZIndex(model);
            return html `
      <div
        class="affine-frame-container"
        style=${styleMap({
                zIndex: `${frameIndex}`,
                backgroundColor,
                height: '100%',
                width: '100%',
                borderRadius: '2px',
                border: _isNavigator || !showBorder
                    ? 'none'
                    : `1px solid ${cssVarV2('edgeless/frame/border/default')}`,
            })}
      ></div>
    `;
        }
        #showBorder_accessor_storage = __runInitializers(this, _showBorder_initializers, true);
        get showBorder() { return this.#showBorder_accessor_storage; }
        set showBorder(value) { this.#showBorder_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _showBorder_extraInitializers);
        }
    };
})();
export { FrameBlockComponent };
//# sourceMappingURL=frame-block.js.map