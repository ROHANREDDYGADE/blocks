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
import { DocModeProvider, DragHandleConfigIdentifier, } from '@blocksuite/affine-shared/services';
import { getScrollContainer, isInsideEdgelessEditor, isInsidePageEditor, matchFlavours, } from '@blocksuite/affine-shared/utils';
import { WidgetComponent, } from '@blocksuite/block-std';
import { DisposableGroup, Point, Rect } from '@blocksuite/global/utils';
import { computed, signal } from '@preact/signals-core';
import { html } from 'lit';
import { query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { isTopLevelBlock } from '../../../root-block/edgeless/utils/query.js';
import { autoScroll } from '../../../root-block/text-selection/utils.js';
import { DragHandleOptionsRunner } from './config.js';
import { PreviewHelper } from './helpers/preview-helper.js';
import { RectHelper } from './helpers/rect-helper.js';
import { SelectionHelper } from './helpers/selection-helper.js';
import { styles } from './styles.js';
import { calcDropTarget, containBlock, containChildBlock, getClosestBlockByPoint, getClosestNoteBlock, isOutOfNoteBlock, updateDragHandleClassName, } from './utils.js';
import { DragEventWatcher } from './watchers/drag-event-watcher.js';
import { EdgelessWatcher } from './watchers/edgeless-watcher.js';
import { HandleEventWatcher } from './watchers/handle-event-watcher.js';
import { KeyboardEventWatcher } from './watchers/keyboard-event-watcher.js';
import { LegacyDragEventWatcher } from './watchers/legacy-drag-event-watcher.js';
import { PageWatcher } from './watchers/page-watcher.js';
import { PointerEventWatcher } from './watchers/pointer-event-watcher.js';
let AffineDragHandleWidget = (() => {
    let _classSuper = WidgetComponent;
    let _dragHandleContainer_decorators;
    let _dragHandleContainer_initializers = [];
    let _dragHandleContainer_extraInitializers = [];
    let _dragHandleGrabber_decorators;
    let _dragHandleGrabber_initializers = [];
    let _dragHandleGrabber_extraInitializers = [];
    let _dragHoverRect_decorators;
    let _dragHoverRect_initializers = [];
    let _dragHoverRect_extraInitializers = [];
    return class AffineDragHandleWidget extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _dragHandleContainer_decorators = [query('.affine-drag-handle-container')];
            _dragHandleGrabber_decorators = [query('.affine-drag-handle-grabber')];
            _dragHoverRect_decorators = [state()];
            __esDecorate(this, null, _dragHandleContainer_decorators, { kind: "accessor", name: "dragHandleContainer", static: false, private: false, access: { has: obj => "dragHandleContainer" in obj, get: obj => obj.dragHandleContainer, set: (obj, value) => { obj.dragHandleContainer = value; } }, metadata: _metadata }, _dragHandleContainer_initializers, _dragHandleContainer_extraInitializers);
            __esDecorate(this, null, _dragHandleGrabber_decorators, { kind: "accessor", name: "dragHandleGrabber", static: false, private: false, access: { has: obj => "dragHandleGrabber" in obj, get: obj => obj.dragHandleGrabber, set: (obj, value) => { obj.dragHandleGrabber = value; } }, metadata: _metadata }, _dragHandleGrabber_initializers, _dragHandleGrabber_extraInitializers);
            __esDecorate(this, null, _dragHoverRect_decorators, { kind: "accessor", name: "dragHoverRect", static: false, private: false, access: { has: obj => "dragHoverRect" in obj, get: obj => obj.dragHoverRect, set: (obj, value) => { obj.dragHoverRect = value; } }, metadata: _metadata }, _dragHoverRect_initializers, _dragHoverRect_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = styles; }
        get _enableNewDnd() {
            return this.std.doc.awarenessStore.getFlag('enable_new_dnd') ?? true;
        }
        get dragHandleContainerOffsetParent() {
            return this.dragHandleContainer.parentElement;
        }
        get mode() {
            return this.std.get(DocModeProvider).getEditorMode();
        }
        get rootComponent() {
            return this.block;
        }
        clearRaf() {
            if (this.rafID) {
                cancelAnimationFrame(this.rafID);
                this.rafID = 0;
            }
        }
        connectedCallback() {
            super.connectedCallback();
            this.std.provider.getAll(DragHandleConfigIdentifier).forEach(config => {
                this.optionRunner.register(config);
            });
            this.pointerEventWatcher.watch();
            this._keyboardEventWatcher.watch();
            if (this._enableNewDnd) {
                this._dragEventWatcher.watch();
            }
            else {
                this._legacyDragEventWatcher.watch();
            }
        }
        disconnectedCallback() {
            this.hide(true);
            this._disposables.dispose();
            this._anchorModelDisposables?.dispose();
            super.disconnectedCallback();
        }
        firstUpdated() {
            this.hide(true);
            this._disposables.addFromEvent(this.host, 'pointerleave', () => {
                this.hide();
            });
            this._handleEventWatcher.watch();
            if (isInsidePageEditor(this.host)) {
                this._pageWatcher.watch();
            }
            else if (isInsideEdgelessEditor(this.host)) {
                this.edgelessWatcher.watch();
            }
        }
        render() {
            const hoverRectStyle = styleMap(this.dragHoverRect
                ? {
                    width: `${this.dragHoverRect.width}px`,
                    height: `${this.dragHoverRect.height}px`,
                    top: `${this.dragHoverRect.top}px`,
                    left: `${this.dragHoverRect.left}px`,
                }
                : {
                    display: 'none',
                });
            return html `
      <div class="affine-drag-handle-widget">
        <div class="affine-drag-handle-container" draggable="true">
          <div class="affine-drag-handle-grabber"></div>
        </div>
        <div class="affine-drag-hover-rect" style=${hoverRectStyle}></div>
      </div>
    `;
        }
        #dragHandleContainer_accessor_storage;
        get dragHandleContainer() { return this.#dragHandleContainer_accessor_storage; }
        set dragHandleContainer(value) { this.#dragHandleContainer_accessor_storage = value; }
        #dragHandleGrabber_accessor_storage;
        get dragHandleGrabber() { return this.#dragHandleGrabber_accessor_storage; }
        set dragHandleGrabber(value) { this.#dragHandleGrabber_accessor_storage = value; }
        #dragHoverRect_accessor_storage;
        get dragHoverRect() { return this.#dragHoverRect_accessor_storage; }
        set dragHoverRect(value) { this.#dragHoverRect_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._anchorModelDisposables = null;
            this._dragEventWatcher = new DragEventWatcher(this);
            this._getBlockView = (blockId) => {
                return this.host.view.getBlock(blockId);
            };
            /**
             * When dragging, should update indicator position and target drop block id
             */
            this._getDropResult = (state) => {
                const point = new Point(state.raw.x, state.raw.y);
                const closestBlock = getClosestBlockByPoint(this.host, this.rootComponent, point);
                if (!closestBlock)
                    return null;
                const blockId = closestBlock.model.id;
                const model = closestBlock.model;
                const isDatabase = matchFlavours(model, ['affine:database']);
                if (isDatabase)
                    return null;
                // note block can only be dropped into another note block
                // prevent note block from being dropped into other blocks
                const isDraggedElementNote = this.draggingElements.length === 1 &&
                    matchFlavours(this.draggingElements[0].model, ['affine:note']);
                if (isDraggedElementNote) {
                    const parent = this.std.doc.getParent(closestBlock.model);
                    if (!parent)
                        return null;
                    const parentElement = this._getBlockView(parent.id);
                    if (!parentElement)
                        return null;
                    if (!matchFlavours(parentElement.model, ['affine:note']))
                        return null;
                }
                // Should make sure that target drop block is
                // neither within the dragging elements
                // nor a child-block of any dragging elements
                if (containBlock(this.draggingElements.map(block => block.model.id), blockId) ||
                    containChildBlock(this.draggingElements, model)) {
                    return null;
                }
                let rect = null;
                let dropType = 'before';
                const result = calcDropTarget(point, model, closestBlock, this.draggingElements, this.scale.peek(), isDraggedElementNote === false);
                if (result) {
                    rect = result.rect;
                    dropType = result.dropType;
                }
                if (isDraggedElementNote && dropType === 'in')
                    return null;
                const dropIndicator = {
                    rect,
                    dropBlockId: blockId,
                    dropType,
                };
                return dropIndicator;
            };
            this._handleEventWatcher = new HandleEventWatcher(this);
            this._keyboardEventWatcher = new KeyboardEventWatcher(this);
            this._legacyDragEventWatcher = new LegacyDragEventWatcher(this);
            this._pageWatcher = new PageWatcher(this);
            this._removeDropIndicator = () => {
                if (this.dropIndicator) {
                    this.dropIndicator.remove();
                    this.dropIndicator = null;
                }
            };
            this._reset = () => {
                this.draggingElements = [];
                this.dropBlockId = '';
                this.dropType = null;
                this.lastDragPointerState = null;
                this.rafID = 0;
                this.dragging = false;
                this.dragHoverRect = null;
                this.anchorBlockId.value = null;
                this.isDragHandleHovered = false;
                this.isHoverDragHandleVisible = false;
                this.isTopLevelDragHandleVisible = false;
                this.pointerEventWatcher.reset();
                this.previewHelper.removeDragPreview();
                this._removeDropIndicator();
                this._resetCursor();
            };
            this._resetCursor = () => {
                document.documentElement.classList.remove('affine-drag-preview-grabbing');
            };
            this._resetDropResult = () => {
                this.dropBlockId = '';
                this.dropType = null;
                if (this.dropIndicator)
                    this.dropIndicator.rect = null;
            };
            this._updateDropResult = (dropResult) => {
                if (!this.dropIndicator)
                    return;
                this.dropBlockId = dropResult?.dropBlockId ?? '';
                this.dropType = dropResult?.dropType ?? null;
                if (dropResult?.rect) {
                    const offsetParentRect = this.dragHandleContainerOffsetParent.getBoundingClientRect();
                    let { left, top } = dropResult.rect;
                    left -= offsetParentRect.left;
                    top -= offsetParentRect.top;
                    const { width, height } = dropResult.rect;
                    const rect = Rect.fromLWTH(left, width, top, height);
                    this.dropIndicator.rect = rect;
                }
                else {
                    this.dropIndicator.rect = dropResult?.rect ?? null;
                }
            };
            this.anchorBlockId = signal(null);
            this.anchorBlockComponent = computed(() => {
                if (!this.anchorBlockId.value)
                    return null;
                return this.std.view.getBlock(this.anchorBlockId.value);
            });
            this.anchorEdgelessElement = computed(() => {
                if (!this.anchorBlockId.value)
                    return null;
                if (this.mode === 'page')
                    return null;
                const service = this.std.getService('affine:page');
                const edgelessElement = service.getElementById(this.anchorBlockId.value);
                return isTopLevelBlock(edgelessElement) ? edgelessElement : null;
            });
            // Single block: drag handle should show on the vertical middle of the first line of element
            this.center = [0, 0];
            this.dragging = false;
            this.rectHelper = new RectHelper(this);
            this.draggingAreaRect = computed(this.rectHelper.getDraggingAreaRect);
            this.draggingElements = [];
            this.dragPreview = null;
            this.dropBlockId = '';
            this.dropIndicator = null;
            this.dropType = null;
            this.edgelessWatcher = new EdgelessWatcher(this);
            this.handleAnchorModelDisposables = () => {
                const block = this.anchorBlockComponent.peek();
                if (!block)
                    return;
                const blockModel = block.model;
                if (this._anchorModelDisposables) {
                    this._anchorModelDisposables.dispose();
                    this._anchorModelDisposables = null;
                }
                this._anchorModelDisposables = new DisposableGroup();
                this._anchorModelDisposables.add(blockModel.propsUpdated.on(() => this.hide()));
                this._anchorModelDisposables.add(blockModel.deleted.on(() => this.hide()));
            };
            this.hide = (force = false) => {
                if (this.dragging && !force)
                    return;
                updateDragHandleClassName();
                this.isHoverDragHandleVisible = false;
                this.isTopLevelDragHandleVisible = false;
                this.isDragHandleHovered = false;
                this.anchorBlockId.value = null;
                if (this.dragHandleContainer) {
                    this.dragHandleContainer.style.display = 'none';
                }
                if (force) {
                    this._reset();
                }
            };
            this.isDragHandleHovered = false;
            this.isHoverDragHandleVisible = false;
            this.isTopLevelDragHandleVisible = false;
            this.lastDragPointerState = null;
            this.noteScale = signal(1);
            this.optionRunner = new DragHandleOptionsRunner();
            this.pointerEventWatcher = new PointerEventWatcher(this);
            this.previewHelper = new PreviewHelper(this);
            this.rafID = 0;
            this.scale = signal(1);
            this.scaleInNote = computed(() => this.scale.value * this.noteScale.value);
            this.selectionHelper = new SelectionHelper(this);
            this.updateDropIndicator = (state, shouldAutoScroll = false) => {
                const point = new Point(state.raw.x, state.raw.y);
                const closestNoteBlock = getClosestNoteBlock(this.host, this.rootComponent, point);
                if (!closestNoteBlock ||
                    isOutOfNoteBlock(this.host, closestNoteBlock, point, this.scale.peek())) {
                    this._resetDropResult();
                }
                else {
                    const dropResult = this._getDropResult(state);
                    this._updateDropResult(dropResult);
                }
                this.lastDragPointerState = state;
                if (this.mode === 'page') {
                    if (!shouldAutoScroll)
                        return;
                    const scrollContainer = getScrollContainer(this.rootComponent);
                    const result = autoScroll(scrollContainer, state.raw.y);
                    if (!result) {
                        this.clearRaf();
                        return;
                    }
                    this.rafID = requestAnimationFrame(() => this.updateDropIndicator(state, true));
                }
                else {
                    this.clearRaf();
                }
            };
            this.updateDropIndicatorOnScroll = () => {
                if (!this.dragging ||
                    this.draggingElements.length === 0 ||
                    !this.lastDragPointerState)
                    return;
                const state = this.lastDragPointerState;
                this.rafID = requestAnimationFrame(() => this.updateDropIndicator(state, false));
            };
            this.#dragHandleContainer_accessor_storage = __runInitializers(this, _dragHandleContainer_initializers, void 0);
            this.#dragHandleGrabber_accessor_storage = (__runInitializers(this, _dragHandleContainer_extraInitializers), __runInitializers(this, _dragHandleGrabber_initializers, void 0));
            this.#dragHoverRect_accessor_storage = (__runInitializers(this, _dragHandleGrabber_extraInitializers), __runInitializers(this, _dragHoverRect_initializers, null));
            __runInitializers(this, _dragHoverRect_extraInitializers);
        }
    };
})();
export { AffineDragHandleWidget };
//# sourceMappingURL=drag-handle.js.map