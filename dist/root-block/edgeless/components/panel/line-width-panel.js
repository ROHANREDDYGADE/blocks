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
import { LineWidth } from '@blocksuite/affine-model';
import { requestConnectedFrame } from '@blocksuite/affine-shared/utils';
import { WithDisposable } from '@blocksuite/global/utils';
import { css, html, LitElement, nothing } from 'lit';
import { property, query, queryAll } from 'lit/decorators.js';
export class LineWidthEvent extends Event {
    constructor(type, { detail, composed, bubbles, }) {
        super(type, { bubbles, composed });
        this.detail = detail;
    }
}
let EdgelessLineWidthPanel = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __bottomLine_decorators;
    let __bottomLine_initializers = [];
    let __bottomLine_extraInitializers = [];
    let __dragHandle_decorators;
    let __dragHandle_initializers = [];
    let __dragHandle_extraInitializers = [];
    let __lineWidthIcons_decorators;
    let __lineWidthIcons_initializers = [];
    let __lineWidthIcons_extraInitializers = [];
    let __lineWidthOverlay_decorators;
    let __lineWidthOverlay_initializers = [];
    let __lineWidthOverlay_extraInitializers = [];
    let __lineWidthPanel_decorators;
    let __lineWidthPanel_initializers = [];
    let __lineWidthPanel_extraInitializers = [];
    let _disable_decorators;
    let _disable_initializers = [];
    let _disable_extraInitializers = [];
    let _hasTooltip_decorators;
    let _hasTooltip_initializers = [];
    let _hasTooltip_extraInitializers = [];
    let _selectedSize_decorators;
    let _selectedSize_initializers = [];
    let _selectedSize_extraInitializers = [];
    return class EdgelessLineWidthPanel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __bottomLine_decorators = [query('.bottom-line')];
            __dragHandle_decorators = [query('.drag-handle')];
            __lineWidthIcons_decorators = [queryAll('.line-width-icon')];
            __lineWidthOverlay_decorators = [query('.line-width-overlay')];
            __lineWidthPanel_decorators = [query('.line-width-panel')];
            _disable_decorators = [property({ attribute: false })];
            _hasTooltip_decorators = [property({ attribute: false })];
            _selectedSize_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __bottomLine_decorators, { kind: "accessor", name: "_bottomLine", static: false, private: false, access: { has: obj => "_bottomLine" in obj, get: obj => obj._bottomLine, set: (obj, value) => { obj._bottomLine = value; } }, metadata: _metadata }, __bottomLine_initializers, __bottomLine_extraInitializers);
            __esDecorate(this, null, __dragHandle_decorators, { kind: "accessor", name: "_dragHandle", static: false, private: false, access: { has: obj => "_dragHandle" in obj, get: obj => obj._dragHandle, set: (obj, value) => { obj._dragHandle = value; } }, metadata: _metadata }, __dragHandle_initializers, __dragHandle_extraInitializers);
            __esDecorate(this, null, __lineWidthIcons_decorators, { kind: "accessor", name: "_lineWidthIcons", static: false, private: false, access: { has: obj => "_lineWidthIcons" in obj, get: obj => obj._lineWidthIcons, set: (obj, value) => { obj._lineWidthIcons = value; } }, metadata: _metadata }, __lineWidthIcons_initializers, __lineWidthIcons_extraInitializers);
            __esDecorate(this, null, __lineWidthOverlay_decorators, { kind: "accessor", name: "_lineWidthOverlay", static: false, private: false, access: { has: obj => "_lineWidthOverlay" in obj, get: obj => obj._lineWidthOverlay, set: (obj, value) => { obj._lineWidthOverlay = value; } }, metadata: _metadata }, __lineWidthOverlay_initializers, __lineWidthOverlay_extraInitializers);
            __esDecorate(this, null, __lineWidthPanel_decorators, { kind: "accessor", name: "_lineWidthPanel", static: false, private: false, access: { has: obj => "_lineWidthPanel" in obj, get: obj => obj._lineWidthPanel, set: (obj, value) => { obj._lineWidthPanel = value; } }, metadata: _metadata }, __lineWidthPanel_initializers, __lineWidthPanel_extraInitializers);
            __esDecorate(this, null, _disable_decorators, { kind: "accessor", name: "disable", static: false, private: false, access: { has: obj => "disable" in obj, get: obj => obj.disable, set: (obj, value) => { obj.disable = value; } }, metadata: _metadata }, _disable_initializers, _disable_extraInitializers);
            __esDecorate(this, null, _hasTooltip_decorators, { kind: "accessor", name: "hasTooltip", static: false, private: false, access: { has: obj => "hasTooltip" in obj, get: obj => obj.hasTooltip, set: (obj, value) => { obj.hasTooltip = value; } }, metadata: _metadata }, _hasTooltip_initializers, _hasTooltip_extraInitializers);
            __esDecorate(this, null, _selectedSize_decorators, { kind: "accessor", name: "selectedSize", static: false, private: false, access: { has: obj => "selectedSize" in obj, get: obj => obj.selectedSize, set: (obj, value) => { obj.selectedSize = value; } }, metadata: _metadata }, _selectedSize_initializers, _selectedSize_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: stretch;
    }

    .line-width-panel {
      width: 108px;
      height: 24px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      position: relative;
      cursor: default;
    }

    .line-width-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      z-index: 2;
    }

    .line-width-icon {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: var(--affine-border-color);
    }

    .line-width-button:nth-child(1) {
      margin-right: 0;
    }

    .line-width-button:nth-child(6) {
      margin-left: 0;
    }

    .drag-handle {
      position: absolute;
      left: 0;
      top: 50%;
      width: 8px;
      height: 8px;
      transform: translateY(-50%) translateX(4px);
      border-radius: 50%;
      background-color: var(--affine-icon-color);
      z-index: 3;
    }

    .bottom-line,
    .line-width-overlay {
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      height: 1px;
      background-color: var(--affine-border-color);
      position: absolute;
    }

    .bottom-line {
      width: calc(100% - 16px);
      background-color: var(--affine-border-color);
    }

    .line-width-overlay {
      width: 0;
      background-color: var(--affine-icon-color);
      z-index: 1;
    }
  `; }
        _onSelect(lineWidth) {
            // If the selected size is the same as the previous one, do nothing.
            if (lineWidth === this.selectedSize)
                return;
            this.dispatchEvent(new LineWidthEvent('select', {
                detail: lineWidth,
                composed: true,
                bubbles: true,
            }));
            this.selectedSize = lineWidth;
        }
        _updateLineWidthPanel(selectedSize) {
            if (!this._lineWidthOverlay)
                return;
            let width = 0;
            let dragHandleOffsetX = 0;
            switch (selectedSize) {
                case LineWidth.Two:
                    width = 0;
                    break;
                case LineWidth.Four:
                    width = 16;
                    dragHandleOffsetX = 1;
                    break;
                case LineWidth.Six:
                    width = 32;
                    dragHandleOffsetX = 2;
                    break;
                case LineWidth.Eight:
                    width = 48;
                    dragHandleOffsetX = 3;
                    break;
                case LineWidth.Ten:
                    width = 64;
                    dragHandleOffsetX = 4;
                    break;
                default:
                    width = 80;
                    dragHandleOffsetX = 4;
            }
            dragHandleOffsetX += 4;
            this._lineWidthOverlay.style.width = `${width}%`;
            this._dragHandle.style.left = `${width}%`;
            this._dragHandle.style.transform = `translateY(-50%) translateX(${dragHandleOffsetX}px)`;
            this._updateIconsColor();
        }
        _updateLineWidthPanelByDragHandlePosition(dragHandlerPosition) {
            // Calculate the selected size based on the drag handle position.
            // Need to select the nearest size.
            let selectedSize = this.selectedSize;
            if (dragHandlerPosition <= 12) {
                selectedSize = LineWidth.Two;
            }
            else if (dragHandlerPosition > 12 && dragHandlerPosition <= 26) {
                selectedSize = LineWidth.Four;
            }
            else if (dragHandlerPosition > 26 && dragHandlerPosition <= 40) {
                selectedSize = LineWidth.Six;
            }
            else if (dragHandlerPosition > 40 && dragHandlerPosition <= 54) {
                selectedSize = LineWidth.Eight;
            }
            else if (dragHandlerPosition > 54 && dragHandlerPosition <= 68) {
                selectedSize = LineWidth.Ten;
            }
            else {
                selectedSize = LineWidth.Twelve;
            }
            this._updateLineWidthPanel(selectedSize);
            this._onSelect(selectedSize);
        }
        disconnectedCallback() {
            this._disposables.dispose();
        }
        firstUpdated() {
            this._updateLineWidthPanel(this.selectedSize);
            this._disposables.addFromEvent(this, 'pointerdown', this._onPointerDown);
            this._disposables.addFromEvent(this, 'pointermove', this._onPointerMove);
            this._disposables.addFromEvent(this, 'pointerup', this._onPointerUp);
            this._disposables.addFromEvent(this, 'pointerout', this._onPointerOut);
        }
        render() {
            return html `<style>
        .line-width-panel {
          opacity: ${this.disable ? '0.5' : '1'};
        }
      </style>
      <div
        class="line-width-panel"
        @mousedown="${(e) => e.preventDefault()}"
      >
        <div class="line-width-button">
          <div class="line-width-icon"></div>
        </div>
        <div class="line-width-button">
          <div class="line-width-icon"></div>
        </div>
        <div class="line-width-button">
          <div class="line-width-icon"></div>
        </div>
        <div class="line-width-button">
          <div class="line-width-icon"></div>
        </div>
        <div class="line-width-button">
          <div class="line-width-icon"></div>
        </div>
        <div class="line-width-button">
          <div class="line-width-icon"></div>
        </div>
        <div class="drag-handle"></div>
        <div class="bottom-line"></div>
        <div class="line-width-overlay"></div>
        ${this.hasTooltip
                ? html `<affine-tooltip .offset=${8}>Thickness</affine-tooltip>`
                : nothing}
      </div>`;
        }
        willUpdate(changedProperties) {
            if (changedProperties.has('selectedSize')) {
                this._updateLineWidthPanel(this.selectedSize);
            }
        }
        #_bottomLine_accessor_storage;
        get _bottomLine() { return this.#_bottomLine_accessor_storage; }
        set _bottomLine(value) { this.#_bottomLine_accessor_storage = value; }
        #_dragHandle_accessor_storage;
        get _dragHandle() { return this.#_dragHandle_accessor_storage; }
        set _dragHandle(value) { this.#_dragHandle_accessor_storage = value; }
        #_lineWidthIcons_accessor_storage;
        get _lineWidthIcons() { return this.#_lineWidthIcons_accessor_storage; }
        set _lineWidthIcons(value) { this.#_lineWidthIcons_accessor_storage = value; }
        #_lineWidthOverlay_accessor_storage;
        get _lineWidthOverlay() { return this.#_lineWidthOverlay_accessor_storage; }
        set _lineWidthOverlay(value) { this.#_lineWidthOverlay_accessor_storage = value; }
        #_lineWidthPanel_accessor_storage;
        get _lineWidthPanel() { return this.#_lineWidthPanel_accessor_storage; }
        set _lineWidthPanel(value) { this.#_lineWidthPanel_accessor_storage = value; }
        #disable_accessor_storage;
        get disable() { return this.#disable_accessor_storage; }
        set disable(value) { this.#disable_accessor_storage = value; }
        #hasTooltip_accessor_storage;
        get hasTooltip() { return this.#hasTooltip_accessor_storage; }
        set hasTooltip(value) { this.#hasTooltip_accessor_storage = value; }
        #selectedSize_accessor_storage;
        get selectedSize() { return this.#selectedSize_accessor_storage; }
        set selectedSize(value) { this.#selectedSize_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._dragConfig = null;
            this._getDragHandlePosition = (e, config) => {
                const x = e.clientX;
                const { boundLeft, bottomLineWidth, stepWidth, containerWidth } = config;
                let steps;
                if (x <= boundLeft) {
                    steps = 0;
                }
                else if (x - boundLeft >= containerWidth) {
                    steps = 100;
                }
                else {
                    steps = Math.floor((x - boundLeft) / stepWidth);
                }
                // The drag handle should not be dragged to the left of the first icon or right of the last icon.
                // Calculate the drag handle position based on the steps.
                const bottomLineOffsetX = 4;
                const bottomLineStepWidth = (bottomLineWidth - bottomLineOffsetX) / 100;
                const dragHandlerPosition = steps * bottomLineStepWidth;
                return dragHandlerPosition;
            };
            this._onPointerDown = (e) => {
                e.preventDefault();
                if (this.disable)
                    return;
                const { left, width } = this._lineWidthPanel.getBoundingClientRect();
                const bottomLineWidth = this._bottomLine.getBoundingClientRect().width;
                this._dragConfig = {
                    stepWidth: width / 100,
                    boundLeft: left,
                    containerWidth: width,
                    bottomLineWidth,
                };
                this._onPointerMove(e);
            };
            this._onPointerMove = (e) => {
                e.preventDefault();
                if (!this._dragConfig)
                    return;
                const dragHandlerPosition = this._getDragHandlePosition(e, this._dragConfig);
                this._dragHandle.style.left = `${dragHandlerPosition}%`;
                this._lineWidthOverlay.style.width = `${dragHandlerPosition}%`;
                this._updateIconsColor();
            };
            this._onPointerOut = (e) => {
                // If the pointer is out of the line width panel
                // Stop dragging and update the selected size by nearest size.
                e.preventDefault();
                if (!this._dragConfig)
                    return;
                const dragHandlerPosition = this._getDragHandlePosition(e, this._dragConfig);
                this._updateLineWidthPanelByDragHandlePosition(dragHandlerPosition);
                this._dragConfig = null;
            };
            this._onPointerUp = (e) => {
                e.preventDefault();
                if (!this._dragConfig)
                    return;
                const dragHandlerPosition = this._getDragHandlePosition(e, this._dragConfig);
                this._updateLineWidthPanelByDragHandlePosition(dragHandlerPosition);
                this._dragConfig = null;
            };
            this._updateIconsColor = () => {
                if (!this._dragHandle.offsetParent) {
                    requestConnectedFrame(() => this._updateIconsColor(), this);
                    return;
                }
                const dragHandleRect = this._dragHandle.getBoundingClientRect();
                const dragHandleCenterX = dragHandleRect.left + dragHandleRect.width / 2;
                // All the icons located at the left of the drag handle should be filled with the icon color.
                const leftIcons = [];
                // All the icons located at the right of the drag handle should be filled with the border color.
                const rightIcons = [];
                for (const icon of this._lineWidthIcons) {
                    const { left, width } = icon.getBoundingClientRect();
                    const centerX = left + width / 2;
                    if (centerX < dragHandleCenterX) {
                        leftIcons.push(icon);
                    }
                    else {
                        rightIcons.push(icon);
                    }
                }
                leftIcons.forEach(icon => (icon.style.backgroundColor = 'var(--affine-icon-color)'));
                rightIcons.forEach(icon => (icon.style.backgroundColor = 'var(--affine-border-color)'));
            };
            this.#_bottomLine_accessor_storage = __runInitializers(this, __bottomLine_initializers, void 0);
            this.#_dragHandle_accessor_storage = (__runInitializers(this, __bottomLine_extraInitializers), __runInitializers(this, __dragHandle_initializers, void 0));
            this.#_lineWidthIcons_accessor_storage = (__runInitializers(this, __dragHandle_extraInitializers), __runInitializers(this, __lineWidthIcons_initializers, void 0));
            this.#_lineWidthOverlay_accessor_storage = (__runInitializers(this, __lineWidthIcons_extraInitializers), __runInitializers(this, __lineWidthOverlay_initializers, void 0));
            this.#_lineWidthPanel_accessor_storage = (__runInitializers(this, __lineWidthOverlay_extraInitializers), __runInitializers(this, __lineWidthPanel_initializers, void 0));
            this.#disable_accessor_storage = (__runInitializers(this, __lineWidthPanel_extraInitializers), __runInitializers(this, _disable_initializers, false));
            this.#hasTooltip_accessor_storage = (__runInitializers(this, _disable_extraInitializers), __runInitializers(this, _hasTooltip_initializers, true));
            this.#selectedSize_accessor_storage = (__runInitializers(this, _hasTooltip_extraInitializers), __runInitializers(this, _selectedSize_initializers, LineWidth.Two));
            __runInitializers(this, _selectedSize_extraInitializers);
        }
    };
})();
export { EdgelessLineWidthPanel };
//# sourceMappingURL=line-width-panel.js.map