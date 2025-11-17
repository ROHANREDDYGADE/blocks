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
import { EditPropsStore } from '@blocksuite/affine-shared/services';
import { WidgetComponent } from '@blocksuite/block-std';
import { GfxControllerIdentifier } from '@blocksuite/block-std/gfx';
import { Bound } from '@blocksuite/global/utils';
import { effect } from '@preact/signals-core';
import { css, html, nothing } from 'lit';
import { state } from 'lit/decorators.js';
export const EDGELESS_NAVIGATOR_BLACK_BACKGROUND_WIDGET = 'edgeless-navigator-black-background';
let EdgelessNavigatorBlackBackgroundWidget = (() => {
    let _classSuper = WidgetComponent;
    let _frame_decorators;
    let _frame_initializers = [];
    let _frame_extraInitializers = [];
    let _show_decorators;
    let _show_initializers = [];
    let _show_extraInitializers = [];
    return class EdgelessNavigatorBlackBackgroundWidget extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _frame_decorators = [state()];
            _show_decorators = [state()];
            __esDecorate(this, null, _frame_decorators, { kind: "accessor", name: "frame", static: false, private: false, access: { has: obj => "frame" in obj, get: obj => obj.frame, set: (obj, value) => { obj.frame = value; } }, metadata: _metadata }, _frame_initializers, _frame_extraInitializers);
            __esDecorate(this, null, _show_decorators, { kind: "accessor", name: "show", static: false, private: false, access: { has: obj => "show" in obj, get: obj => obj.show, set: (obj, value) => { obj.show = value; } }, metadata: _metadata }, _show_initializers, _show_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .edgeless-navigator-black-background {
      background-color: black;
      position: absolute;
      z-index: 1;
      background-color: transparent;
      box-shadow: 0 0 0 5000px black;
    }
  `; }
        get gfx() {
            return this.std.get(GfxControllerIdentifier);
        }
        _tryLoadBlackBackground() {
            const value = this.std
                .get(EditPropsStore)
                .getStorage('presentBlackBackground');
            this._blackBackground = value ?? true;
        }
        firstUpdated() {
            const { _disposables, gfx, block } = this;
            _disposables.add(block.slots.navigatorFrameChanged.on(frame => {
                this.frame = frame;
            }));
            _disposables.add(block.slots.navigatorSettingUpdated.on(({ blackBackground }) => {
                if (blackBackground !== undefined) {
                    this.std
                        .get(EditPropsStore)
                        .setStorage('presentBlackBackground', blackBackground);
                    this._blackBackground = blackBackground;
                    this.show =
                        blackBackground &&
                            block.gfx.tool.currentToolOption$.peek().type === 'frameNavigator';
                }
            }));
            _disposables.add(effect(() => {
                const tool = gfx.tool.currentToolName$.value;
                if (tool !== 'frameNavigator') {
                    this.show = false;
                }
                else {
                    this.show = this._blackBackground;
                }
            }));
            _disposables.add(block.slots.fullScreenToggled.on(() => setTimeout(() => {
                this.requestUpdate();
            }, 500) // wait for full screen animation
            ));
            this._tryLoadBlackBackground();
        }
        render() {
            const { frame, show, gfx } = this;
            if (!show || !frame)
                return nothing;
            const bound = Bound.deserialize(frame.xywh);
            const zoom = gfx.viewport.zoom;
            const width = bound.w * zoom;
            const height = bound.h * zoom;
            const [x, y] = gfx.viewport.toViewCoord(bound.x, bound.y);
            return html ` <style>
        .edgeless-navigator-black-background {
          width: ${width}px;
          height: ${height}px;
          top: ${y}px;
          left: ${x}px;
        }
      </style>
      <div class="edgeless-navigator-black-background"></div>`;
        }
        #frame_accessor_storage;
        get frame() { return this.#frame_accessor_storage; }
        set frame(value) { this.#frame_accessor_storage = value; }
        #show_accessor_storage;
        get show() { return this.#show_accessor_storage; }
        set show(value) { this.#show_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._blackBackground = false;
            this.#frame_accessor_storage = __runInitializers(this, _frame_initializers, undefined);
            this.#show_accessor_storage = (__runInitializers(this, _frame_extraInitializers), __runInitializers(this, _show_initializers, false));
            __runInitializers(this, _show_extraInitializers);
        }
    };
})();
export { EdgelessNavigatorBlackBackgroundWidget };
//# sourceMappingURL=edgeless-navigator-black-background.js.map