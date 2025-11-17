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
import { ArrowDownSmallIcon } from '@blocksuite/affine-components/icons';
import { once } from '@blocksuite/affine-shared/utils';
import { arrow, autoUpdate, computePosition, offset, shift, } from '@floating-ui/dom';
import { css, html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { EdgelessToolbarToolMixin } from '../mixins/tool.mixin.js';
import { TemplateCard1, TemplateCard2, TemplateCard3 } from './icon.js';
let EdgelessTemplateButton = (() => {
    let _classSuper = EdgelessToolbarToolMixin(LitElement);
    let __openedPanel_decorators;
    let __openedPanel_initializers = [];
    let __openedPanel_extraInitializers = [];
    return class EdgelessTemplateButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __openedPanel_decorators = [state()];
            __esDecorate(this, null, __openedPanel_decorators, { kind: "accessor", name: "_openedPanel", static: false, private: false, access: { has: obj => "_openedPanel" in obj, get: obj => obj._openedPanel, set: (obj, value) => { obj._openedPanel = value; } }, metadata: _metadata }, __openedPanel_initializers, __openedPanel_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      position: relative;
      width: 100%;
      height: 100%;
    }

    edgeless-template-button {
      cursor: pointer;
    }

    .template-cards {
      width: 100%;
      height: 64px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .template-card,
    .arrow-icon {
      --x: 0;
      --y: 0;
      --r: 0;
      --s: 1;
      position: absolute;
      transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(var(--s));
      transition: all 0.3s ease;
    }

    .arrow-icon {
      --y: 17px;
      background: var(--affine-black-10);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .arrow-icon > svg {
      color: var(--affine-icon-color);
      fill: currentColor;
      width: 20px;
      height: 20px;
    }

    .template-card.card1 {
      transform-origin: 100% 50%;
      --x: 15px;
      --y: 8px;
    }
    .template-card.card2 {
      transform-origin: 0% 50%;
      --x: -17px;
    }
    .template-card.card3 {
      --y: 27px;
    }

    /* hover */
    .template-cards:not(.expanded):hover .card1 {
      --r: 8.69deg;
    }
    .template-cards:not(.expanded):hover .card2 {
      --r: -10.93deg;
    }
    .template-cards:not(.expanded):hover .card3 {
      --y: 22px;
      --r: 5.19deg;
    }

    /* expanded */
    .template-cards.expanded .card1 {
      --x: 17px;
      --y: -5px;
      --r: 8.69deg;
      --s: 0.64;
    }
    .template-cards.expanded .card2 {
      --x: -19px;
      --y: -6px;
      --r: -10.93deg;
      --s: 0.64;
    }
    .template-cards.expanded .card3 {
      --y: -10px;
      --s: 0.599;
      --r: 5.19deg;
    }
  `; }
        get cards() {
            const { theme } = this;
            return [TemplateCard1[theme], TemplateCard2[theme], TemplateCard3[theme]];
        }
        _closePanel() {
            if (this._openedPanel) {
                this._openedPanel.remove();
                this._openedPanel = null;
                this._cleanup?.();
                this._cleanup = null;
                this.requestUpdate();
                if (this._prevTool && this._prevTool.type !== 'template') {
                    this.setEdgelessTool(this._prevTool);
                    this._prevTool = null;
                }
                else {
                    this.setEdgelessTool('default');
                }
            }
        }
        _togglePanel() {
            if (this._openedPanel) {
                this._closePanel();
                if (this._prevTool) {
                    this.setEdgelessTool(this._prevTool);
                    this._prevTool = null;
                }
                return;
            }
            this._prevTool = this.edgelessTool ? { ...this.edgelessTool } : null;
            this.setEdgelessTool('template');
            const panel = document.createElement('edgeless-templates-panel');
            panel.edgeless = this.edgeless;
            this._cleanup = once(panel, 'closepanel', () => {
                this._closePanel();
            });
            this._openedPanel = panel;
            this.renderRoot.append(panel);
            requestAnimationFrame(() => {
                const arrowEl = panel.renderRoot.querySelector('.arrow');
                autoUpdate(this, panel, () => {
                    computePosition(this, panel, {
                        placement: 'top',
                        middleware: [offset(20), arrow({ element: arrowEl }), shift()],
                    })
                        .then(({ x, y, middlewareData }) => {
                        panel.style.left = `${x}px`;
                        panel.style.top = `${y}px`;
                        arrowEl.style.left = `${(middlewareData.arrow?.x ?? 0) - (middlewareData.shift?.x ?? 0)}px`;
                    })
                        .catch(e => {
                        console.warn("Can't compute position", e);
                    });
                });
            });
        }
        render() {
            const { cards, _openedPanel } = this;
            const expanded = _openedPanel !== null;
            return html `<edgeless-toolbar-button @click=${this._togglePanel}>
      <div class="template-cards ${expanded ? 'expanded' : ''}">
        <div class="arrow-icon">${ArrowDownSmallIcon}</div>
        ${repeat(cards, (card, n) => html `
            <div
              class=${classMap({
                'template-card': true,
                [`card${n + 1}`]: true,
            })}
            >
              ${card}
            </div>
          `)}
      </div>
    </edgeless-toolbar-button>`;
        }
        #_openedPanel_accessor_storage;
        get _openedPanel() { return this.#_openedPanel_accessor_storage; }
        set _openedPanel(value) { this.#_openedPanel_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._cleanup = null;
            this._prevTool = null;
            this.enableActiveBackground = true;
            this.type = 'template';
            this.#_openedPanel_accessor_storage = __runInitializers(this, __openedPanel_initializers, null);
            __runInitializers(this, __openedPanel_extraInitializers);
        }
    };
})();
export { EdgelessTemplateButton };
//# sourceMappingURL=template-tool-button.js.map