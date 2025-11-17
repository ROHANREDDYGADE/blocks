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
import { EditPropsStore, ThemeProvider, } from '@blocksuite/affine-shared/services';
import { SignalWatcher } from '@blocksuite/global/utils';
import { computed } from '@preact/signals-core';
import { css, html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { EdgelessDraggableElementController } from '../common/draggable/draggable-element.controller.js';
import { EdgelessToolbarToolMixin } from '../mixins/tool.mixin.js';
import { getMindMaps } from './assets.js';
import { getMindmapRender, mindmapConfig, textConfig, textRender, toolConfig2StyleObj, } from './basket-elements.js';
import { basketIconDark, basketIconLight, textIcon } from './icons.js';
import { importMindmap } from './utils/import-mindmap.js';
let EdgelessMindmapToolButton = (() => {
    let _classSuper = EdgelessToolbarToolMixin(SignalWatcher(LitElement));
    let _enableBlur_decorators;
    let _enableBlur_initializers = [];
    let _enableBlur_extraInitializers = [];
    let _mindmapElement_decorators;
    let _mindmapElement_initializers = [];
    let _mindmapElement_extraInitializers = [];
    let _readyToDrop_decorators;
    let _readyToDrop_initializers = [];
    let _readyToDrop_extraInitializers = [];
    return class EdgelessMindmapToolButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _enableBlur_decorators = [property({ type: Boolean })];
            _mindmapElement_decorators = [query('.basket-tool-item.mindmap')];
            _readyToDrop_decorators = [state()];
            __esDecorate(this, null, _enableBlur_decorators, { kind: "accessor", name: "enableBlur", static: false, private: false, access: { has: obj => "enableBlur" in obj, get: obj => obj.enableBlur, set: (obj, value) => { obj.enableBlur = value; } }, metadata: _metadata }, _enableBlur_initializers, _enableBlur_extraInitializers);
            __esDecorate(this, null, _mindmapElement_decorators, { kind: "accessor", name: "mindmapElement", static: false, private: false, access: { has: obj => "mindmapElement" in obj, get: obj => obj.mindmapElement, set: (obj, value) => { obj.mindmapElement = value; } }, metadata: _metadata }, _mindmapElement_initializers, _mindmapElement_extraInitializers);
            __esDecorate(this, null, _readyToDrop_decorators, { kind: "accessor", name: "readyToDrop", static: false, private: false, access: { has: obj => "readyToDrop" in obj, get: obj => obj.readyToDrop, set: (obj, value) => { obj.readyToDrop = value; } }, metadata: _metadata }, _readyToDrop_initializers, _readyToDrop_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .partial-clip {
      flex-shrink: 0;
      box-sizing: border-box;
      width: calc(100% + 20px);
      pointer-events: none;
      padding: 0 10px;
      overflow: hidden;
    }
    .basket-wrapper {
      pointer-events: auto;
      height: 64px;
      width: 96px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      position: relative;
    }
    .basket,
    .basket-tool-item {
      transition: transform 0.3s ease-in-out;
      position: absolute;
    }

    .basket {
      bottom: 0;
      height: 17px;
      width: 76px;
    }
    .basket > div,
    .basket > svg {
      position: absolute;
    }
    .glass {
      width: 76px;
      height: 17px;
      border-radius: 2px;
      mask: url(#mindmap-basket-body-mask);
    }
    .glass.enabled {
      backdrop-filter: blur(2px);
    }

    .basket {
      z-index: 3;
    }
    .basket-tool-item {
      cursor: grab;
    }
    .basket-tool-item svg {
      display: block;
    }
    .basket-tool-item {
      transform: translate(var(--default-x, 0), var(--default-y, 0))
        rotate(var(--default-r, 0)) scale(var(--default-s, 1));
      z-index: var(--default-z, 0);
    }

    .basket-tool-item.next {
      transform: translate(var(--next-x, 0), var(--next-y, 0))
        rotate(var(--next-r, 0)) scale(var(--next-s, 1));
      z-index: var(--next-z, 0);
    }

    /* active & hover */
    .basket-wrapper:hover .basket,
    .basket-wrapper.active .basket {
      z-index: 0;
    }
    .basket-wrapper:hover .basket-tool-item.current,
    .basket-wrapper.active .basket-tool-item.current {
      transform: translate(var(--active-x, 0), var(--active-y, 0))
        rotate(var(--active-r, 0)) scale(var(--active-s, 1));
      z-index: var(--active-z, 0);
    }

    .basket-tool-item.next.coming,
    .basket-wrapper:hover .basket-tool-item.current:hover {
      transform: translate(var(--hover-x, 0), var(--hover-y, 0))
        rotate(var(--hover-r, 0)) scale(var(--hover-s, 1));
      z-index: var(--hover-z, 0);
    }
  `; }
        get draggableTools() {
            const style = this._style$.value;
            const mindmap = this.mindmaps.find(m => m.style === style) || this.mindmaps[0];
            return [
                {
                    name: 'text',
                    icon: textIcon,
                    config: textConfig,
                    standardWidth: 100,
                    render: textRender,
                },
                {
                    name: 'mindmap',
                    icon: mindmap.icon,
                    config: mindmapConfig,
                    standardWidth: 350,
                    render: getMindmapRender(style),
                },
            ];
        }
        get mindmaps() {
            return getMindMaps(this.theme);
        }
        _toggleMenu() {
            if (this.tryDisposePopper())
                return;
            this.setEdgelessTool({ type: 'default' });
            const menu = this.createPopper('edgeless-mindmap-menu', this);
            Object.assign(menu.element, {
                edgeless: this.edgeless,
                onActiveStyleChange: (style) => {
                    this.edgeless.std.get(EditPropsStore).recordLastProps('mindmap', {
                        style,
                    });
                },
                onImportMindMap: (bound) => {
                    return importMindmap(bound).then(mindmap => {
                        const id = this.edgeless.service.addElement('mindmap', {
                            children: mindmap,
                            layoutType: mindmap?.layoutType === 'left' ? 1 : 0,
                        });
                        const element = this.edgeless.service.getElementById(id);
                        this.tryDisposePopper();
                        this.setEdgelessTool({ type: 'default' });
                        this.edgeless.gfx.selection.set({
                            elements: [element.tree.id],
                            editing: false,
                        });
                    });
                },
            });
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
                onOverlayCreated: (overlay, { data }) => {
                    const tool = this.draggableTools.find(t => t.name === data.name);
                    if (!tool)
                        return;
                    // recover the rotation
                    const rotate = tool.config?.hover?.r ?? tool.config?.default?.r ?? 0;
                    overlay.element.style.setProperty('--rotate', rotate + 'deg');
                    setTimeout(() => {
                        overlay.transitionWrapper.style.setProperty('--rotate', -rotate + 'deg');
                    }, 50);
                    // set the scale (without transition)
                    const scale = tool.config?.hover?.s ?? tool.config?.default?.s ?? 1;
                    overlay.element.style.setProperty('--scale', `${scale}`);
                    // a workaround to handle getBoundingClientRect() when the element is rotated
                    const _left = parseInt(overlay.element.style.left);
                    const _top = parseInt(overlay.element.style.top);
                    if (data.name === 'mindmap') {
                        overlay.element.style.left = _left + 3 + 'px';
                        overlay.element.style.top = _top + 5 + 'px';
                    }
                    else if (data.name === 'text') {
                        overlay.element.style.left = _left + 0 + 'px';
                        overlay.element.style.top = _top + 3 + 'px';
                    }
                    this.readyToDrop = true;
                },
                onCanceled: overlay => {
                    overlay.transitionWrapper.style.transformOrigin = 'unset';
                    overlay.transitionWrapper.style.setProperty('--rotate', '0deg');
                    this.readyToDrop = false;
                },
                onDrop: (el, bound) => {
                    const id = el.data.render(bound, this.edgeless.service, this.edgeless);
                    this.readyToDrop = false;
                    if (el.data.name === 'mindmap') {
                        this.setEdgelessTool({ type: 'default' });
                        this.edgeless.gfx.selection.set({ elements: [id], editing: false });
                    }
                    else if (el.data.name === 'text') {
                        this.setEdgelessTool({ type: 'default' });
                    }
                },
            });
            this.edgeless.bindHotKey({
                m: () => {
                    const service = this.edgeless.service;
                    if (service.locked)
                        return;
                    if (service.selection.editing)
                        return;
                    if (this.readyToDrop) {
                        // change the style
                        const activeIndex = this.mindmaps.findIndex(m => m.style === this._style$.value);
                        const nextIndex = (activeIndex + 1) % this.mindmaps.length;
                        const next = this.mindmaps[nextIndex];
                        this.edgeless.std.get(EditPropsStore).recordLastProps('mindmap', {
                            style: next.style,
                        });
                        const tool = this.draggableTools.find(t => t.name === 'mindmap');
                        this.draggableController.updateElementInfo({
                            data: tool,
                            preview: next.icon,
                        });
                        return;
                    }
                    this.setEdgelessTool({ type: 'empty' });
                    const icon = this.mindmapElement;
                    const { x, y } = service.gfx.tool.lastMousePos$.peek();
                    const { left, top } = this.edgeless.viewport;
                    const clientPos = { x: x + left, y: y + top };
                    this.draggableController.clickToDrag(icon, clientPos);
                },
            }, { global: true });
        }
        render() {
            const { popper } = this;
            const appTheme = this.edgeless.std.get(ThemeProvider).app$.value;
            const basketIcon = appTheme === 'light' ? basketIconLight : basketIconDark;
            const glassBg = appTheme === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(74, 74, 74, 0.6)';
            const { cancelled, dragOut, draggingElement } = this.draggableController?.states || {};
            const active = popper || draggingElement;
            return html `<edgeless-toolbar-button
      class="edgeless-mindmap-button"
      ?withHover=${true}
      .tooltip=${popper ? '' : 'Others'}
      .tooltipOffset=${4}
      @click=${this._toggleMenu}
      style="width: 100%; height: 100%; display: inline-block"
    >
      <div class="partial-clip">
        <div class="basket-wrapper ${active ? 'active' : ''}">
          ${repeat(this.draggableTools, t => t.name, tool => {
                const isBeingDragged = draggingElement?.data.name === tool.name;
                const variables = toolConfig2StyleObj(tool.config);
                const nextStyle = styleMap({
                    ...variables,
                });
                const currentStyle = styleMap({
                    ...variables,
                    opacity: isBeingDragged ? 0 : 1,
                    pointerEvents: draggingElement ? 'none' : 'auto',
                });
                return html `${isBeingDragged
                    ? html `<div
                      class=${classMap({
                        'basket-tool-item': true,
                        next: true,
                        coming: !!dragOut && !cancelled,
                    })}
                      style=${nextStyle}
                    >
                      ${tool.icon}
                    </div>`
                    : nothing}

                <div
                  style=${currentStyle}
                  @mousedown=${(e) => this.draggableController.onMouseDown(e, {
                    data: tool,
                    preview: tool.icon,
                    standardWidth: tool.standardWidth,
                })}
                  @touchstart=${(e) => this.draggableController.onTouchStart(e, {
                    data: tool,
                    preview: tool.icon,
                    standardWidth: tool.standardWidth,
                })}
                  class="basket-tool-item current ${tool.name}"
                >
                  ${tool.icon}
                </div>`;
            })}

          <div class="basket">
            <div
              class="glass ${this.enableBlur ? 'enabled' : ''}"
              style="background: ${glassBg}"
            ></div>
            ${basketIcon}
          </div>
        </div>
      </div>

      <svg width="0" height="0" style="opacity: 0; pointer-events: none">
        <defs>
          <mask id="mindmap-basket-body-mask">
            <rect
              x="2"
              width="71.8"
              y="2"
              height="15"
              rx="1.5"
              ry="1.5"
              fill="white"
            />
            <rect
              width="32"
              height="6"
              x="22"
              y="5.9"
              fill="black"
              rx="3"
              ry="3"
            />
          </mask>
        </defs>
      </svg>
    </edgeless-toolbar-button>`;
        }
        updated(_changedProperties) {
            const controllerRequiredProps = ['edgeless', 'toolbarContainer'];
            if (controllerRequiredProps.some(p => _changedProperties.has(p)) &&
                !this.draggableController) {
                this.initDragController();
            }
        }
        #enableBlur_accessor_storage;
        get enableBlur() { return this.#enableBlur_accessor_storage; }
        set enableBlur(value) { this.#enableBlur_accessor_storage = value; }
        #mindmapElement_accessor_storage;
        get mindmapElement() { return this.#mindmapElement_accessor_storage; }
        set mindmapElement(value) { this.#mindmapElement_accessor_storage = value; }
        #readyToDrop_accessor_storage;
        get readyToDrop() { return this.#readyToDrop_accessor_storage; }
        set readyToDrop(value) { this.#readyToDrop_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._style$ = computed(() => {
                const { style } = this.edgeless.std.get(EditPropsStore).lastProps$.value.mindmap;
                return style;
            });
            this.enableActiveBackground = true;
            this.type = ['empty', 'text'];
            this.#enableBlur_accessor_storage = __runInitializers(this, _enableBlur_initializers, true);
            this.#mindmapElement_accessor_storage = (__runInitializers(this, _enableBlur_extraInitializers), __runInitializers(this, _mindmapElement_initializers, void 0));
            this.#readyToDrop_accessor_storage = (__runInitializers(this, _mindmapElement_extraInitializers), __runInitializers(this, _readyToDrop_initializers, false));
            __runInitializers(this, _readyToDrop_extraInitializers);
        }
    };
})();
export { EdgelessMindmapToolButton };
//# sourceMappingURL=mindmap-tool-button.js.map