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
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { cache } from 'lit/directives/cache.js';
import { styleMap } from 'lit/directives/style-map.js';
let EdgelessToolIconButton = (() => {
    let _classSuper = LitElement;
    let _active_decorators;
    let _active_initializers = [];
    let _active_extraInitializers = [];
    let _activeMode_decorators;
    let _activeMode_initializers = [];
    let _activeMode_extraInitializers = [];
    let _arrow_decorators;
    let _arrow_initializers = [];
    let _arrow_extraInitializers = [];
    let _coming_decorators;
    let _coming_initializers = [];
    let _coming_extraInitializers = [];
    let _disabled_decorators;
    let _disabled_initializers = [];
    let _disabled_extraInitializers = [];
    let _hover_decorators;
    let _hover_initializers = [];
    let _hover_extraInitializers = [];
    let _hoverState_decorators;
    let _hoverState_initializers = [];
    let _hoverState_extraInitializers = [];
    let _iconContainerPadding_decorators;
    let _iconContainerPadding_initializers = [];
    let _iconContainerPadding_extraInitializers = [];
    let _iconContainerWidth_decorators;
    let _iconContainerWidth_initializers = [];
    let _iconContainerWidth_extraInitializers = [];
    let _iconSize_decorators;
    let _iconSize_initializers = [];
    let _iconSize_extraInitializers = [];
    let _justify_decorators;
    let _justify_initializers = [];
    let _justify_extraInitializers = [];
    let _labelHeight_decorators;
    let _labelHeight_initializers = [];
    let _labelHeight_extraInitializers = [];
    let _showTooltip_decorators;
    let _showTooltip_initializers = [];
    let _showTooltip_extraInitializers = [];
    let _tipPosition_decorators;
    let _tipPosition_initializers = [];
    let _tipPosition_extraInitializers = [];
    let _tooltip_decorators;
    let _tooltip_initializers = [];
    let _tooltip_extraInitializers = [];
    let _tooltipOffset_decorators;
    let _tooltipOffset_initializers = [];
    let _tooltipOffset_extraInitializers = [];
    let _withHover_decorators;
    let _withHover_initializers = [];
    let _withHover_extraInitializers = [];
    return class EdgelessToolIconButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _active_decorators = [property({ attribute: false })];
            _activeMode_decorators = [property({ attribute: false })];
            _arrow_decorators = [property({ attribute: false })];
            _coming_decorators = [property({ attribute: false })];
            _disabled_decorators = [property({ attribute: false })];
            _hover_decorators = [property({ attribute: false })];
            _hoverState_decorators = [property({ attribute: false })];
            _iconContainerPadding_decorators = [property({ attribute: false })];
            _iconContainerWidth_decorators = [property({ attribute: false })];
            _iconSize_decorators = [property({ attribute: false })];
            _justify_decorators = [property({ attribute: false })];
            _labelHeight_decorators = [property({ attribute: false })];
            _showTooltip_decorators = [property({ type: Boolean })];
            _tipPosition_decorators = [property({ attribute: false })];
            _tooltip_decorators = [property({ attribute: false })];
            _tooltipOffset_decorators = [property({ attribute: false })];
            _withHover_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _active_decorators, { kind: "accessor", name: "active", static: false, private: false, access: { has: obj => "active" in obj, get: obj => obj.active, set: (obj, value) => { obj.active = value; } }, metadata: _metadata }, _active_initializers, _active_extraInitializers);
            __esDecorate(this, null, _activeMode_decorators, { kind: "accessor", name: "activeMode", static: false, private: false, access: { has: obj => "activeMode" in obj, get: obj => obj.activeMode, set: (obj, value) => { obj.activeMode = value; } }, metadata: _metadata }, _activeMode_initializers, _activeMode_extraInitializers);
            __esDecorate(this, null, _arrow_decorators, { kind: "accessor", name: "arrow", static: false, private: false, access: { has: obj => "arrow" in obj, get: obj => obj.arrow, set: (obj, value) => { obj.arrow = value; } }, metadata: _metadata }, _arrow_initializers, _arrow_extraInitializers);
            __esDecorate(this, null, _coming_decorators, { kind: "accessor", name: "coming", static: false, private: false, access: { has: obj => "coming" in obj, get: obj => obj.coming, set: (obj, value) => { obj.coming = value; } }, metadata: _metadata }, _coming_initializers, _coming_extraInitializers);
            __esDecorate(this, null, _disabled_decorators, { kind: "accessor", name: "disabled", static: false, private: false, access: { has: obj => "disabled" in obj, get: obj => obj.disabled, set: (obj, value) => { obj.disabled = value; } }, metadata: _metadata }, _disabled_initializers, _disabled_extraInitializers);
            __esDecorate(this, null, _hover_decorators, { kind: "accessor", name: "hover", static: false, private: false, access: { has: obj => "hover" in obj, get: obj => obj.hover, set: (obj, value) => { obj.hover = value; } }, metadata: _metadata }, _hover_initializers, _hover_extraInitializers);
            __esDecorate(this, null, _hoverState_decorators, { kind: "accessor", name: "hoverState", static: false, private: false, access: { has: obj => "hoverState" in obj, get: obj => obj.hoverState, set: (obj, value) => { obj.hoverState = value; } }, metadata: _metadata }, _hoverState_initializers, _hoverState_extraInitializers);
            __esDecorate(this, null, _iconContainerPadding_decorators, { kind: "accessor", name: "iconContainerPadding", static: false, private: false, access: { has: obj => "iconContainerPadding" in obj, get: obj => obj.iconContainerPadding, set: (obj, value) => { obj.iconContainerPadding = value; } }, metadata: _metadata }, _iconContainerPadding_initializers, _iconContainerPadding_extraInitializers);
            __esDecorate(this, null, _iconContainerWidth_decorators, { kind: "accessor", name: "iconContainerWidth", static: false, private: false, access: { has: obj => "iconContainerWidth" in obj, get: obj => obj.iconContainerWidth, set: (obj, value) => { obj.iconContainerWidth = value; } }, metadata: _metadata }, _iconContainerWidth_initializers, _iconContainerWidth_extraInitializers);
            __esDecorate(this, null, _iconSize_decorators, { kind: "accessor", name: "iconSize", static: false, private: false, access: { has: obj => "iconSize" in obj, get: obj => obj.iconSize, set: (obj, value) => { obj.iconSize = value; } }, metadata: _metadata }, _iconSize_initializers, _iconSize_extraInitializers);
            __esDecorate(this, null, _justify_decorators, { kind: "accessor", name: "justify", static: false, private: false, access: { has: obj => "justify" in obj, get: obj => obj.justify, set: (obj, value) => { obj.justify = value; } }, metadata: _metadata }, _justify_initializers, _justify_extraInitializers);
            __esDecorate(this, null, _labelHeight_decorators, { kind: "accessor", name: "labelHeight", static: false, private: false, access: { has: obj => "labelHeight" in obj, get: obj => obj.labelHeight, set: (obj, value) => { obj.labelHeight = value; } }, metadata: _metadata }, _labelHeight_initializers, _labelHeight_extraInitializers);
            __esDecorate(this, null, _showTooltip_decorators, { kind: "accessor", name: "showTooltip", static: false, private: false, access: { has: obj => "showTooltip" in obj, get: obj => obj.showTooltip, set: (obj, value) => { obj.showTooltip = value; } }, metadata: _metadata }, _showTooltip_initializers, _showTooltip_extraInitializers);
            __esDecorate(this, null, _tipPosition_decorators, { kind: "accessor", name: "tipPosition", static: false, private: false, access: { has: obj => "tipPosition" in obj, get: obj => obj.tipPosition, set: (obj, value) => { obj.tipPosition = value; } }, metadata: _metadata }, _tipPosition_initializers, _tipPosition_extraInitializers);
            __esDecorate(this, null, _tooltip_decorators, { kind: "accessor", name: "tooltip", static: false, private: false, access: { has: obj => "tooltip" in obj, get: obj => obj.tooltip, set: (obj, value) => { obj.tooltip = value; } }, metadata: _metadata }, _tooltip_initializers, _tooltip_extraInitializers);
            __esDecorate(this, null, _tooltipOffset_decorators, { kind: "accessor", name: "tooltipOffset", static: false, private: false, access: { has: obj => "tooltipOffset" in obj, get: obj => obj.tooltipOffset, set: (obj, value) => { obj.tooltipOffset = value; } }, metadata: _metadata }, _tooltipOffset_initializers, _tooltipOffset_extraInitializers);
            __esDecorate(this, null, _withHover_decorators, { kind: "accessor", name: "withHover", static: false, private: false, access: { has: obj => "withHover" in obj, get: obj => obj.withHover, set: (obj, value) => { obj.withHover = value; } }, metadata: _metadata }, _withHover_initializers, _withHover_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .icon-container {
      position: relative;
      display: flex;
      align-items: center;
      padding: var(--icon-container-padding);
      color: var(--affine-icon-color);
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
      box-sizing: border-box;
      width: var(--icon-container-width, unset);
      justify-content: var(--justify, unset);
    }

    .icon-container.active-mode-color[active] {
      color: var(--affine-primary-color);
    }

    .icon-container.active-mode-background[active] {
      background: var(--affine-hover-color);
    }

    .icon-container[disabled] {
      pointer-events: none;
      cursor: not-allowed;
      color: var(--affine-text-disable-color);
    }

    .icon-container[coming] {
      cursor: not-allowed;
      color: var(--affine-text-disable-color);
    }

    ::slotted(svg) {
      flex-shrink: 0;
      height: var(--icon-size, unset);
    }

    ::slotted(.label) {
      flex: 1;
      padding: 0 4px;
      overflow: hidden;
      white-space: nowrap;
      line-height: var(--label-height, inherit);
    }
    ::slotted(.label.padding0) {
      padding: 0;
    }
    ::slotted(.label.ellipsis) {
      text-overflow: ellipsis;
    }
    ::slotted(.label.medium) {
      font-weight: 500;
    }

    .icon-container[with-hover]::before {
      content: '';
      display: block;
      background: var(--affine-hover-color);
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 4px;
    }
  `; }
        constructor() {
            super();
            __runInitializers(this, _withHover_extraInitializers);
            this.addEventListener('click', event => {
                if (this.disabled) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }, { capture: true });
        }
        connectedCallback() {
            super.connectedCallback();
            this.role = 'button';
        }
        render() {
            const tooltip = this.coming ? '(Coming soon)' : this.tooltip;
            const classnames = `icon-container active-mode-${this.activeMode} ${this.hoverState ? 'hovered' : ''}`;
            const padding = this.iconContainerPadding;
            const iconContainerStyles = styleMap({
                '--icon-container-width': this.iconContainerWidth,
                '--icon-container-padding': Array.isArray(padding)
                    ? padding.map(v => `${v}px`).join(' ')
                    : `${padding}px`,
                '--icon-size': this.iconSize,
                '--justify': this.justify,
                '--label-height': this.labelHeight,
            });
            return html `
      <style>
        .icon-container:hover,
        .icon-container.hovered {
          background: ${this.hover ? `var(--affine-hover-color)` : 'inherit'};
        }
      </style>
      <div
        class=${classnames}
        style=${iconContainerStyles}
        ?with-hover=${this.withHover}
        ?disabled=${this.disabled}
        ?active=${this.active}
      >
        <slot></slot>
        ${cache(this.showTooltip && tooltip
                ? html `<affine-tooltip
                tip-position=${this.tipPosition}
                .arrow=${this.arrow}
                .offset=${this.tooltipOffset}
                >${tooltip}</affine-tooltip
              >`
                : nothing)}
      </div>
    `;
        }
        #active_accessor_storage = __runInitializers(this, _active_initializers, false);
        get active() { return this.#active_accessor_storage; }
        set active(value) { this.#active_accessor_storage = value; }
        #activeMode_accessor_storage = (__runInitializers(this, _active_extraInitializers), __runInitializers(this, _activeMode_initializers, 'color'));
        get activeMode() { return this.#activeMode_accessor_storage; }
        set activeMode(value) { this.#activeMode_accessor_storage = value; }
        #arrow_accessor_storage = (__runInitializers(this, _activeMode_extraInitializers), __runInitializers(this, _arrow_initializers, true));
        get arrow() { return this.#arrow_accessor_storage; }
        set arrow(value) { this.#arrow_accessor_storage = value; }
        #coming_accessor_storage = (__runInitializers(this, _arrow_extraInitializers), __runInitializers(this, _coming_initializers, false));
        get coming() { return this.#coming_accessor_storage; }
        set coming(value) { this.#coming_accessor_storage = value; }
        #disabled_accessor_storage = (__runInitializers(this, _coming_extraInitializers), __runInitializers(this, _disabled_initializers, false));
        get disabled() { return this.#disabled_accessor_storage; }
        set disabled(value) { this.#disabled_accessor_storage = value; }
        #hover_accessor_storage = (__runInitializers(this, _disabled_extraInitializers), __runInitializers(this, _hover_initializers, true));
        get hover() { return this.#hover_accessor_storage; }
        set hover(value) { this.#hover_accessor_storage = value; }
        #hoverState_accessor_storage = (__runInitializers(this, _hover_extraInitializers), __runInitializers(this, _hoverState_initializers, false));
        get hoverState() { return this.#hoverState_accessor_storage; }
        set hoverState(value) { this.#hoverState_accessor_storage = value; }
        #iconContainerPadding_accessor_storage = (__runInitializers(this, _hoverState_extraInitializers), __runInitializers(this, _iconContainerPadding_initializers, 2));
        get iconContainerPadding() { return this.#iconContainerPadding_accessor_storage; }
        set iconContainerPadding(value) { this.#iconContainerPadding_accessor_storage = value; }
        #iconContainerWidth_accessor_storage = (__runInitializers(this, _iconContainerPadding_extraInitializers), __runInitializers(this, _iconContainerWidth_initializers, undefined));
        get iconContainerWidth() { return this.#iconContainerWidth_accessor_storage; }
        set iconContainerWidth(value) { this.#iconContainerWidth_accessor_storage = value; }
        #iconSize_accessor_storage = (__runInitializers(this, _iconContainerWidth_extraInitializers), __runInitializers(this, _iconSize_initializers, undefined));
        get iconSize() { return this.#iconSize_accessor_storage; }
        set iconSize(value) { this.#iconSize_accessor_storage = value; }
        #justify_accessor_storage = (__runInitializers(this, _iconSize_extraInitializers), __runInitializers(this, _justify_initializers, undefined));
        get justify() { return this.#justify_accessor_storage; }
        set justify(value) { this.#justify_accessor_storage = value; }
        #labelHeight_accessor_storage = (__runInitializers(this, _justify_extraInitializers), __runInitializers(this, _labelHeight_initializers, undefined));
        get labelHeight() { return this.#labelHeight_accessor_storage; }
        set labelHeight(value) { this.#labelHeight_accessor_storage = value; }
        #showTooltip_accessor_storage = (__runInitializers(this, _labelHeight_extraInitializers), __runInitializers(this, _showTooltip_initializers, true));
        get showTooltip() { return this.#showTooltip_accessor_storage; }
        set showTooltip(value) { this.#showTooltip_accessor_storage = value; }
        #tipPosition_accessor_storage = (__runInitializers(this, _showTooltip_extraInitializers), __runInitializers(this, _tipPosition_initializers, 'top'));
        get tipPosition() { return this.#tipPosition_accessor_storage; }
        set tipPosition(value) { this.#tipPosition_accessor_storage = value; }
        #tooltip_accessor_storage = (__runInitializers(this, _tipPosition_extraInitializers), __runInitializers(this, _tooltip_initializers, void 0));
        get tooltip() { return this.#tooltip_accessor_storage; }
        set tooltip(value) { this.#tooltip_accessor_storage = value; }
        #tooltipOffset_accessor_storage = (__runInitializers(this, _tooltip_extraInitializers), __runInitializers(this, _tooltipOffset_initializers, 8));
        get tooltipOffset() { return this.#tooltipOffset_accessor_storage; }
        set tooltipOffset(value) { this.#tooltipOffset_accessor_storage = value; }
        #withHover_accessor_storage = (__runInitializers(this, _tooltipOffset_extraInitializers), __runInitializers(this, _withHover_initializers, undefined));
        get withHover() { return this.#withHover_accessor_storage; }
        set withHover(value) { this.#withHover_accessor_storage = value; }
    };
})();
export { EdgelessToolIconButton };
//# sourceMappingURL=tool-icon-button.js.map