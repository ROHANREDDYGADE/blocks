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
import { toast } from '@blocksuite/affine-components/toast';
import { EditPropsStore, TelemetryProvider, } from '@blocksuite/affine-shared/services';
import { modelContext, stdContext } from '@blocksuite/block-std';
import { ErrorCode } from '@blocksuite/global/exceptions';
import { SignalWatcher } from '@blocksuite/global/utils';
import { consume } from '@lit/context';
import { computed } from '@preact/signals-core';
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { getTooltipWithShortcut } from '../../utils.js';
import { EdgelessDraggableElementController } from '../common/draggable/draggable-element.controller.js';
import { EdgelessToolbarToolMixin } from '../mixins/tool.mixin.js';
import { getMindMaps } from './assets.js';
import { textRender } from './basket-elements.js';
import { importMindMapIcon, textIcon } from './icons.js';
import { MindMapPlaceholder } from './mindmap-importing-placeholder.js';
const textItem = { type: 'text', icon: textIcon, render: textRender };
let EdgelessMindmapMenu = (() => {
    let _classSuper = EdgelessToolbarToolMixin(SignalWatcher(LitElement));
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _onActiveStyleChange_decorators;
    let _onActiveStyleChange_initializers = [];
    let _onActiveStyleChange_extraInitializers = [];
    let _onImportMindMap_decorators;
    let _onImportMindMap_initializers = [];
    let _onImportMindMap_extraInitializers = [];
    let _std_decorators;
    let _std_initializers = [];
    let _std_extraInitializers = [];
    return class EdgelessMindmapMenu extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _model_decorators = [consume({ context: modelContext })];
            _onActiveStyleChange_decorators = [property({ attribute: false })];
            _onImportMindMap_decorators = [property({ attribute: false })];
            _std_decorators = [consume({ context: stdContext })];
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(this, null, _onActiveStyleChange_decorators, { kind: "accessor", name: "onActiveStyleChange", static: false, private: false, access: { has: obj => "onActiveStyleChange" in obj, get: obj => obj.onActiveStyleChange, set: (obj, value) => { obj.onActiveStyleChange = value; } }, metadata: _metadata }, _onActiveStyleChange_initializers, _onActiveStyleChange_extraInitializers);
            __esDecorate(this, null, _onImportMindMap_decorators, { kind: "accessor", name: "onImportMindMap", static: false, private: false, access: { has: obj => "onImportMindMap" in obj, get: obj => obj.onImportMindMap, set: (obj, value) => { obj.onImportMindMap = value; } }, metadata: _metadata }, _onImportMindMap_initializers, _onImportMindMap_extraInitializers);
            __esDecorate(this, null, _std_decorators, { kind: "accessor", name: "std", static: false, private: false, access: { has: obj => "std" in obj, get: obj => obj.std, set: (obj, value) => { obj.std = value; } }, metadata: _metadata }, _std_initializers, _std_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      z-index: -1;
      justify-content: flex-end;
    }
    .text-and-mindmap {
      display: flex;
      gap: 10px;
      padding: 8px 0px;
      box-sizing: border-box;
    }
    .thin-divider {
      width: 1px;
      transform: scaleX(0.5);
      height: 48px;
      background: var(--affine-border-color);
    }
    .text-item {
      width: 60px;
    }
    .mindmap-item {
      width: 64px;
    }

    .text-item,
    .mindmap-item {
      border-radius: 4px;
      height: 48px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .text-item > button,
    .mindmap-item > button {
      position: absolute;
      border-radius: inherit;
      border: none;
      background: none;
      cursor: grab;
      padding: 0;
    }
    .text-item:hover,
    .mindmap-item[data-is-active='true'],
    .mindmap-item:hover {
      background: var(--affine-hover-color);
    }
    .text-item > button.next,
    .mindmap-item > button.next {
      transition: transform 0.3s ease-in-out;
    }
  `; }
        get _rootBlock() {
            return this.std.view.getBlock(this.model.id);
        }
        get mindMaps() {
            return getMindMaps(this.theme);
        }
        _importMindMapEntry() {
            const { draggingElement } = this.draggableController?.states || {};
            const isBeingDragged = draggingElement?.data.type === 'import';
            return html `<div class="mindmap-item">
      <button
        style="opacity: ${isBeingDragged ? 0 : 1}"
        class="next"
        @mousedown=${(e) => {
                this.draggableController.onMouseDown(e, {
                    preview: importMindMapIcon,
                    data: {
                        type: 'import',
                        icon: importMindMapIcon,
                    },
                    standardWidth: 350,
                });
            }}
        @touchstart=${(e) => {
                this.draggableController.onTouchStart(e, {
                    preview: importMindMapIcon,
                    data: {
                        type: 'import',
                        icon: importMindMapIcon,
                    },
                    standardWidth: 350,
                });
            }}
        @click=${() => {
                this.draggableController.cancel();
                const viewportBound = this._rootBlock.service.viewport.viewportBounds;
                viewportBound.x += viewportBound.w / 2;
                viewportBound.y += viewportBound.h / 2;
                this._onImportMindMap(viewportBound);
            }}
      >
        ${importMindMapIcon}
      </button>
      <affine-tooltip tip-position="top" .offset=${12}>
        ${getTooltipWithShortcut('Support import of FreeMind,OPML.')}
      </affine-tooltip>
    </div>`;
        }
        _onImportMindMap(bound) {
            const edgelessBlock = this._rootBlock;
            if (!edgelessBlock)
                return;
            const placeholder = new MindMapPlaceholder();
            placeholder.style.position = 'absolute';
            placeholder.style.left = `${bound.x}px`;
            placeholder.style.top = `${bound.y}px`;
            edgelessBlock.gfxViewportElm.append(placeholder);
            this.onImportMindMap?.(bound)
                .then(() => {
                this.std.getOptional(TelemetryProvider)?.track('CanvasElementAdded', {
                    page: 'whiteboard editor',
                    type: 'imported mind map',
                    other: 'success',
                    module: 'toolbar',
                });
            })
                .catch(e => {
                if (e.code === ErrorCode.UserAbortError)
                    return;
                this.std.getOptional(TelemetryProvider)?.track('CanvasElementAdded', {
                    page: 'whiteboard editor',
                    type: 'imported mind map',
                    other: 'failed',
                    module: 'toolbar',
                });
                toast(this.edgeless.host, 'Import failed, please try again');
                console.error(e);
            })
                .finally(() => {
                placeholder.remove();
            });
        }
        initDragController() {
            if (this.draggableController || !this.edgeless)
                return;
            this.draggableController = new EdgelessDraggableElementController(this, {
                service: this.edgeless.service,
                edgeless: this.edgeless,
                scopeElement: this,
                clickToDrag: true,
                onOverlayCreated: (_layer, element) => {
                    if (element.data.type === 'mindmap') {
                        this.onActiveStyleChange?.(element.data.style);
                    }
                    // a workaround to active mindmap, so that menu cannot be closed by `Escape`
                    this.setEdgelessTool({ type: 'empty' });
                },
                onDrop: (element, bound) => {
                    if ('render' in element.data) {
                        const id = element.data.render(bound, this.edgeless.service, this.edgeless);
                        if (element.data.type === 'mindmap') {
                            this.onActiveStyleChange?.(element.data.style);
                            this.setEdgelessTool({ type: 'default' });
                            this.edgeless.gfx.selection.set({ elements: [id], editing: false });
                        }
                        else if (element.data.type === 'text') {
                            this.setEdgelessTool({ type: 'default' });
                        }
                    }
                    if (element.data.type === 'import') {
                        this._onImportMindMap?.(bound);
                    }
                },
            });
        }
        render() {
            const { cancelled, draggingElement, dragOut } = this.draggableController?.states || {};
            const isDraggingText = draggingElement?.data?.type === 'text';
            const showNextText = dragOut && !cancelled;
            return html `<edgeless-slide-menu .height=${'64px'}>
      <div class="text-and-mindmap">
        <div class="text-item">
          ${isDraggingText
                ? html `<button
                class="next"
                style="transform: translateY(${showNextText ? 0 : 64}px)"
              >
                ${textItem.icon}
              </button>`
                : nothing}
          <button
            style="opacity: ${isDraggingText ? 0 : 1}"
            @mousedown=${(e) => this.draggableController.onMouseDown(e, {
                preview: textItem.icon,
                data: textItem,
            })}
            @touchstart=${(e) => this.draggableController.onTouchStart(e, {
                preview: textItem.icon,
                data: textItem,
            })}
          >
            ${textItem.icon}
          </button>
          <affine-tooltip tip-position="top" .offset=${12}>
            ${getTooltipWithShortcut('Edgeless Text', 'T')}
          </affine-tooltip>
        </div>
        <div class="thin-divider"></div>
        <!-- mind map -->
        ${repeat(this.mindMaps, mindMap => {
                const isDraggingMindMap = draggingElement?.data?.type !== 'text';
                const draggingEle = draggingElement?.data;
                const isBeingDragged = isDraggingMindMap && draggingEle?.style === mindMap.style;
                const showNext = dragOut && !cancelled;
                const isActive = this._style$.value === mindMap.style;
                return html `
            <div class="mindmap-item" data-is-active=${isActive}>
              ${isBeingDragged
                    ? html `<button
                    style="transform: translateY(${showNext ? 0 : 64}px)"
                    class="next"
                  >
                    ${mindMap.icon}
                  </button>`
                    : nothing}
              <button
                style="opacity: ${isBeingDragged ? 0 : 1}"
                @mousedown=${(e) => {
                    this.draggableController.onMouseDown(e, {
                        preview: mindMap.icon,
                        data: mindMap,
                        standardWidth: 350,
                    });
                }}
                @touchstart=${(e) => {
                    this.draggableController.onTouchStart(e, {
                        preview: mindMap.icon,
                        data: mindMap,
                        standardWidth: 350,
                    });
                }}
                @click=${() => this.onActiveStyleChange?.(mindMap.style)}
              >
                ${mindMap.icon}
              </button>
              <affine-tooltip tip-position="top" .offset=${12}>
                ${getTooltipWithShortcut('Mind Map', 'M')}
              </affine-tooltip>
            </div>
          `;
            })}
        ${this.std.doc.awarenessStore.getFlag('enable_mind_map_import')
                ? this._importMindMapEntry()
                : nothing}
      </div>
    </edgeless-slide-menu>`;
        }
        updated(changedProperties) {
            if (!changedProperties.has('edgeless'))
                return;
            this.initDragController();
        }
        #model_accessor_storage;
        get model() { return this.#model_accessor_storage; }
        set model(value) { this.#model_accessor_storage = value; }
        #onActiveStyleChange_accessor_storage;
        get onActiveStyleChange() { return this.#onActiveStyleChange_accessor_storage; }
        set onActiveStyleChange(value) { this.#onActiveStyleChange_accessor_storage = value; }
        #onImportMindMap_accessor_storage;
        get onImportMindMap() { return this.#onImportMindMap_accessor_storage; }
        set onImportMindMap(value) { this.#onImportMindMap_accessor_storage = value; }
        #std_accessor_storage;
        get std() { return this.#std_accessor_storage; }
        set std(value) { this.#std_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._style$ = computed(() => {
                const { style } = this.edgeless.std.get(EditPropsStore).lastProps$.value.mindmap;
                return style;
            });
            this.type = 'empty';
            this.#model_accessor_storage = __runInitializers(this, _model_initializers, void 0);
            this.#onActiveStyleChange_accessor_storage = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _onActiveStyleChange_initializers, void 0));
            this.#onImportMindMap_accessor_storage = (__runInitializers(this, _onActiveStyleChange_extraInitializers), __runInitializers(this, _onImportMindMap_initializers, void 0));
            this.#std_accessor_storage = (__runInitializers(this, _onImportMindMap_extraInitializers), __runInitializers(this, _std_initializers, void 0));
            __runInitializers(this, _std_extraInitializers);
        }
    };
})();
export { EdgelessMindmapMenu };
//# sourceMappingURL=mindmap-menu.js.map