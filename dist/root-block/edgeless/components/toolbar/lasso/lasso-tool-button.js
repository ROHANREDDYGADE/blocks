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
import { ArrowUpIcon, LassoFreeHandIcon, LassoPolygonalIcon, } from '@blocksuite/affine-components/icons';
import { WithDisposable } from '@blocksuite/global/utils';
import { effect } from '@preact/signals-core';
import { css, html, LitElement } from 'lit';
import { query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { LassoMode } from '../../../../../_common/types.js';
import { getTooltipWithShortcut } from '../../utils.js';
import { QuickToolMixin } from '../mixins/quick-tool.mixin.js';
let EdgelessLassoToolButton = (() => {
    let _classSuper = QuickToolMixin(WithDisposable(LitElement));
    let _curMode_decorators;
    let _curMode_initializers = [];
    let _curMode_extraInitializers = [];
    let _currentIcon_decorators;
    let _currentIcon_initializers = [];
    let _currentIcon_extraInitializers = [];
    return class EdgelessLassoToolButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _curMode_decorators = [state()];
            _currentIcon_decorators = [query('.current-icon')];
            __esDecorate(this, null, _curMode_decorators, { kind: "accessor", name: "curMode", static: false, private: false, access: { has: obj => "curMode" in obj, get: obj => obj.curMode, set: (obj, value) => { obj.curMode = value; } }, metadata: _metadata }, _curMode_initializers, _curMode_extraInitializers);
            __esDecorate(this, null, _currentIcon_decorators, { kind: "accessor", name: "currentIcon", static: false, private: false, access: { has: obj => "currentIcon" in obj, get: obj => obj.currentIcon, set: (obj, value) => { obj.currentIcon = value; } }, metadata: _metadata }, _currentIcon_initializers, _currentIcon_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .current-icon {
      transition: 100ms;
      width: 24px;
      height: 24px;
    }
    .current-icon > svg {
      display: block;
    }
    .arrow-up-icon {
      position: absolute;
      top: 4px;
      right: 2px;
      font-size: 0;
    }
  `; }
        _fadeIn() {
            this.currentIcon.style.opacity = '1';
            this.currentIcon.style.transform = `translateY(0px)`;
        }
        _fadeOut() {
            this.currentIcon.style.opacity = '0';
            this.currentIcon.style.transform = `translateY(-5px)`;
        }
        connectedCallback() {
            super.connectedCallback();
            this.disposables.add(effect(() => {
                const tool = this.edgeless.gfx.tool.currentToolOption$.value;
                if (tool?.type === 'lasso') {
                    const { mode } = tool;
                    this.curMode = mode;
                }
            }));
        }
        render() {
            const type = this.edgelessTool?.type;
            const mode = this.curMode === LassoMode.FreeHand ? 'freehand' : 'polygonal';
            const arrowColor = type === 'lasso' ? 'currentColor' : 'var(--affine-icon-secondary)';
            return html `
      <edgeless-tool-icon-button
        class="edgeless-lasso-button ${mode}"
        .tooltip=${getTooltipWithShortcut('Lasso', 'L')}
        .tooltipOffset=${17}
        .active=${type === 'lasso'}
        .iconContainerPadding=${6}
        @click=${this._changeTool}
      >
        <span class="current-icon">
          ${this.curMode === LassoMode.FreeHand
                ? LassoFreeHandIcon
                : LassoPolygonalIcon}
        </span>
        <span class="arrow-up-icon" style=${styleMap({ color: arrowColor })}>
          ${ArrowUpIcon}
        </span>
      </edgeless-tool-icon-button>
    `;
        }
        #curMode_accessor_storage;
        get curMode() { return this.#curMode_accessor_storage; }
        set curMode(value) { this.#curMode_accessor_storage = value; }
        #currentIcon_accessor_storage;
        get currentIcon() { return this.#currentIcon_accessor_storage; }
        set currentIcon(value) { this.#currentIcon_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._changeTool = () => {
                const tool = this.edgelessTool;
                if (tool.type !== 'lasso') {
                    this.setEdgelessTool({ type: 'lasso', mode: this.curMode });
                    return;
                }
                this._fadeOut();
                setTimeout(() => {
                    this.curMode === LassoMode.FreeHand
                        ? this.setEdgelessTool({ type: 'lasso', mode: LassoMode.Polygonal })
                        : this.setEdgelessTool({ type: 'lasso', mode: LassoMode.FreeHand });
                    this._fadeIn();
                }, 100);
            };
            this.type = 'lasso';
            this.#curMode_accessor_storage = __runInitializers(this, _curMode_initializers, LassoMode.FreeHand);
            this.#currentIcon_accessor_storage = (__runInitializers(this, _curMode_extraInitializers), __runInitializers(this, _currentIcon_initializers, void 0));
            __runInitializers(this, _currentIcon_extraInitializers);
        }
    };
})();
export { EdgelessLassoToolButton };
//# sourceMappingURL=lasso-tool-button.js.map