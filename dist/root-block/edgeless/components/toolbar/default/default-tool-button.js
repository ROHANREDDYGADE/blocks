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
import { ArrowUpIcon, HandIcon, SelectIcon, } from '@blocksuite/affine-components/icons';
import { effect } from '@preact/signals-core';
import { css, html, LitElement } from 'lit';
import { query } from 'lit/decorators.js';
import { getTooltipWithShortcut } from '../../utils.js';
import { QuickToolMixin } from '../mixins/quick-tool.mixin.js';
let EdgelessDefaultToolButton = (() => {
    let _classSuper = QuickToolMixin(LitElement);
    let _currentIcon_decorators;
    let _currentIcon_initializers = [];
    let _currentIcon_extraInitializers = [];
    return class EdgelessDefaultToolButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _currentIcon_decorators = [query('.current-icon')];
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
      color: var(--affine-icon-secondary);
    }
    .active .arrow-up-icon {
      color: inherit;
    }
  `; }
        _changeTool() {
            if (this.toolbar.activePopper) {
                // click manually always closes the popper
                this.toolbar.activePopper.dispose();
            }
            const type = this.edgelessTool?.type;
            if (type !== 'default' && type !== 'pan') {
                if (localStorage.defaultTool === 'default') {
                    this.setEdgelessTool('default');
                }
                else if (localStorage.defaultTool === 'pan') {
                    this.setEdgelessTool('pan', { panning: false });
                }
                return;
            }
            this._fadeOut();
            // wait for animation to finish
            setTimeout(() => {
                if (type === 'default') {
                    this.setEdgelessTool('pan', { panning: false });
                }
                else if (type === 'pan') {
                    this.setEdgelessTool('default');
                }
                this._fadeIn();
            }, 100);
        }
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
            if (!localStorage.defaultTool) {
                localStorage.defaultTool = 'default';
            }
            this.disposables.add(effect(() => {
                const tool = this.edgeless.gfx.tool.currentToolName$.value;
                if (tool === 'default' || tool === 'pan') {
                    localStorage.defaultTool = tool;
                }
            }));
        }
        render() {
            const type = this.edgelessTool?.type;
            const { active } = this;
            return html `
      <edgeless-tool-icon-button
        class="edgeless-default-button ${type} ${active ? 'active' : ''}"
        .tooltip=${type === 'pan'
                ? getTooltipWithShortcut('Hand', 'H')
                : getTooltipWithShortcut('Select', 'V')}
        .tooltipOffset=${17}
        .active=${active}
        .iconContainerPadding=${6}
        @click=${this._changeTool}
      >
        <span class="current-icon">
          ${localStorage.defaultTool === 'default' ? SelectIcon : HandIcon}
        </span>
        <span class="arrow-up-icon">${ArrowUpIcon}</span>
      </edgeless-tool-icon-button>
    `;
        }
        #currentIcon_accessor_storage;
        get currentIcon() { return this.#currentIcon_accessor_storage; }
        set currentIcon(value) { this.#currentIcon_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this.type = ['default', 'pan'];
            this.#currentIcon_accessor_storage = __runInitializers(this, _currentIcon_initializers, void 0);
            __runInitializers(this, _currentIcon_extraInitializers);
        }
    };
})();
export { EdgelessDefaultToolButton };
//# sourceMappingURL=default-tool-button.js.map