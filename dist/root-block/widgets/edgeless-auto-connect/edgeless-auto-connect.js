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
import { AutoConnectLeftIcon, AutoConnectRightIcon, HiddenIcon, SmallDocIcon, } from '@blocksuite/affine-components/icons';
import { FrameBlockModel, NoteBlockModel, } from '@blocksuite/affine-model';
import { NoteDisplayMode } from '@blocksuite/affine-model';
import { matchFlavours, stopPropagation, } from '@blocksuite/affine-shared/utils';
import { WidgetComponent } from '@blocksuite/block-std';
import { Bound } from '@blocksuite/global/utils';
import { css, html, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { isNoteBlock } from '../../edgeless/utils/query.js';
const PAGE_VISIBLE_INDEX_LABEL_WIDTH = 44;
const PAGE_VISIBLE_INDEX_LABEL_HEIGHT = 24;
const EDGELESS_ONLY_INDEX_LABEL_WIDTH = 24;
const EDGELESS_ONLY_INDEX_LABEL_HEIGHT = 24;
const INDEX_LABEL_OFFSET = 16;
function calculatePosition(gap, count, iconWidth) {
    const positions = [];
    if (count === 1) {
        positions.push([0, 10]);
        return positions;
    }
    const middleIndex = (count - 1) / 2;
    const isEven = count % 2 === 0;
    const middleOffset = (gap + iconWidth) / 2;
    function getSign(num) {
        return num - middleIndex > 0 ? 1 : -1;
    }
    for (let j = 0; j < count; j++) {
        let left = 10;
        if (isEven) {
            if (Math.abs(j - middleIndex) < 1 && isEven) {
                left = 10 + middleOffset * getSign(j);
            }
            else {
                left =
                    10 +
                        ((Math.ceil(Math.abs(j - middleIndex)) - 1) * (gap + 24) +
                            middleOffset) *
                            getSign(j);
            }
        }
        else {
            const offset = gap + iconWidth;
            left = 10 + Math.ceil(Math.abs(j - middleIndex)) * offset * getSign(j);
        }
        positions.push([0, left]);
    }
    return positions;
}
function getIndexLabelTooltip(icon, content) {
    const styles = css `
    .index-label-tooltip {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      gap: 10px;
    }

    .index-label-tooltip-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .index-label-tooltip-content {
      font-size: var(--affine-font-sm);

      display: flex;
      height: 16px;
      line-height: 16px;
    }
  `;
    return html `<style>
      ${styles}
    </style>
    <div class="index-label-tooltip">
      <span class="index-label-tooltip-icon">${icon}</span>
      <span class="index-label-tooltip-content">${content}</span>
    </div>`;
}
function isAutoConnectElement(element) {
    return (element instanceof NoteBlockModel || element instanceof FrameBlockModel);
}
export const AFFINE_EDGELESS_AUTO_CONNECT_WIDGET = 'affine-edgeless-auto-connect-widget';
let EdgelessAutoConnectWidget = (() => {
    let _classSuper = WidgetComponent;
    let __dragging_decorators;
    let __dragging_initializers = [];
    let __dragging_extraInitializers = [];
    let __edgelessOnlyNotesSet_decorators;
    let __edgelessOnlyNotesSet_initializers = [];
    let __edgelessOnlyNotesSet_extraInitializers = [];
    let __index_decorators;
    let __index_initializers = [];
    let __index_extraInitializers = [];
    let __pageVisibleElementsMap_decorators;
    let __pageVisibleElementsMap_initializers = [];
    let __pageVisibleElementsMap_extraInitializers = [];
    let __show_decorators;
    let __show_initializers = [];
    let __show_extraInitializers = [];
    return class EdgelessAutoConnectWidget extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __dragging_decorators = [state()];
            __edgelessOnlyNotesSet_decorators = [state()];
            __index_decorators = [state()];
            __pageVisibleElementsMap_decorators = [state()];
            __show_decorators = [state()];
            __esDecorate(this, null, __dragging_decorators, { kind: "accessor", name: "_dragging", static: false, private: false, access: { has: obj => "_dragging" in obj, get: obj => obj._dragging, set: (obj, value) => { obj._dragging = value; } }, metadata: _metadata }, __dragging_initializers, __dragging_extraInitializers);
            __esDecorate(this, null, __edgelessOnlyNotesSet_decorators, { kind: "accessor", name: "_edgelessOnlyNotesSet", static: false, private: false, access: { has: obj => "_edgelessOnlyNotesSet" in obj, get: obj => obj._edgelessOnlyNotesSet, set: (obj, value) => { obj._edgelessOnlyNotesSet = value; } }, metadata: _metadata }, __edgelessOnlyNotesSet_initializers, __edgelessOnlyNotesSet_extraInitializers);
            __esDecorate(this, null, __index_decorators, { kind: "accessor", name: "_index", static: false, private: false, access: { has: obj => "_index" in obj, get: obj => obj._index, set: (obj, value) => { obj._index = value; } }, metadata: _metadata }, __index_initializers, __index_extraInitializers);
            __esDecorate(this, null, __pageVisibleElementsMap_decorators, { kind: "accessor", name: "_pageVisibleElementsMap", static: false, private: false, access: { has: obj => "_pageVisibleElementsMap" in obj, get: obj => obj._pageVisibleElementsMap, set: (obj, value) => { obj._pageVisibleElementsMap = value; } }, metadata: _metadata }, __pageVisibleElementsMap_initializers, __pageVisibleElementsMap_extraInitializers);
            __esDecorate(this, null, __show_decorators, { kind: "accessor", name: "_show", static: false, private: false, access: { has: obj => "_show" in obj, get: obj => obj._show, set: (obj, value) => { obj._show = value; } }, metadata: _metadata }, __show_initializers, __show_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .page-visible-index-label {
      box-sizing: border-box;
      padding: 0px 6px;
      border: 1px solid #0000001a;

      width: fit-content;
      height: 24px;
      min-width: 24px;

      color: var(--affine-white);
      font-size: 15px;
      line-height: 22px;
      text-align: center;

      cursor: pointer;
      user-select: none;

      border-radius: 25px;
      background: var(--affine-primary-color);
    }

    .navigator {
      width: 48px;
      padding: 4px;
      border-radius: 58px;
      border: 1px solid rgba(227, 226, 228, 1);
      transition: opacity 0.5s ease-in-out;
      background: rgba(251, 251, 252, 1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      opacity: 0;
    }

    .navigator div {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .navigator span {
      display: inline-block;
      height: 8px;
      border: 1px solid rgba(227, 226, 228, 1);
    }

    .navigator div:hover {
      background: var(--affine-hover-color);
    }

    .navigator.show {
      opacity: 1;
    }
  `; }
        _EdgelessOnlyLabels() {
            const { _edgelessOnlyNotesSet } = this;
            if (!_edgelessOnlyNotesSet.size)
                return nothing;
            return html `${repeat(_edgelessOnlyNotesSet, note => note.id, note => {
                const { viewport } = this.service;
                const { zoom } = viewport;
                const bound = Bound.deserialize(note.xywh);
                const [left, right] = viewport.toViewCoord(bound.x, bound.y);
                const [width, height] = [bound.w * zoom, bound.h * zoom];
                const style = styleMap({
                    width: `${EDGELESS_ONLY_INDEX_LABEL_WIDTH}px`,
                    height: `${EDGELESS_ONLY_INDEX_LABEL_HEIGHT}px`,
                    borderRadius: '50%',
                    backgroundColor: 'var(--affine-text-secondary-color)',
                    border: '1px solid var(--affine-border-color)',
                    color: 'var(--affine-white)',
                    position: 'absolute',
                    transform: `translate(${left + width / 2 - EDGELESS_ONLY_INDEX_LABEL_WIDTH / 2}px,
          ${right + height + INDEX_LABEL_OFFSET}px)`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                });
                return html `<div style=${style} class="edgeless-only-index-label">
          ${HiddenIcon}
          <affine-tooltip tip-position="bottom">
            ${getIndexLabelTooltip(SmallDocIcon, 'Hidden on page')}
          </affine-tooltip>
        </div>`;
            })}`;
        }
        _getElementsAndCounts() {
            const elements = [];
            const counts = [];
            for (const [key, value] of this._pageVisibleElementsMap.entries()) {
                elements.push(key);
                counts.push(value);
            }
            return { elements, counts };
        }
        _initLabels() {
            const { service } = this.block;
            const surfaceRefs = service.doc
                .getBlocksByFlavour('affine:surface-ref')
                .map(block => block.model);
            const getVisibility = () => {
                const { selectedElements } = service.selection;
                if (selectedElements.length === 1 &&
                    !service.selection.editing &&
                    (isNoteBlock(selectedElements[0]) ||
                        surfaceRefs.some(ref => ref.reference === selectedElements[0].id))) {
                    this._show = true;
                }
                else {
                    this._show = false;
                }
                return this._show;
            };
            this._disposables.add(service.selection.slots.updated.on(() => {
                getVisibility();
            }));
            this._disposables.add(this.doc.slots.blockUpdated.on(payload => {
                if (payload.flavour === 'affine:surface-ref') {
                    switch (payload.type) {
                        case 'add':
                            surfaceRefs.push(payload.model);
                            break;
                        case 'delete':
                            {
                                const idx = surfaceRefs.indexOf(payload.model);
                                if (idx >= 0) {
                                    surfaceRefs.splice(idx, 1);
                                }
                            }
                            break;
                        case 'update':
                            if (payload.props.key !== 'reference') {
                                return;
                            }
                    }
                    this.requestUpdate();
                }
            }));
            this._disposables.add(service.surface.elementUpdated.on(payload => {
                if (payload.props['xywh'] &&
                    surfaceRefs.some(ref => ref.reference === payload.id)) {
                    this.requestUpdate();
                }
            }));
        }
        _navigateToNext() {
            const { elements } = this._getElementsAndCounts();
            if (this._index >= elements.length - 1)
                return;
            this._index = this._index + 1;
            const element = elements[this._index];
            const bound = Bound.deserialize(element.xywh);
            this.service.selection.set({
                elements: [element.id],
                editing: false,
            });
            this.service.viewport.setViewportByBound(bound, [80, 80, 80, 80], true);
        }
        _navigateToPrev() {
            const { elements } = this._getElementsAndCounts();
            if (this._index <= 0)
                return;
            this._index = this._index - 1;
            const element = elements[this._index];
            const bound = Bound.deserialize(element.xywh);
            this.service.selection.set({
                elements: [element.id],
                editing: false,
            });
            this.service.viewport.setViewportByBound(bound, [80, 80, 80, 80], true);
        }
        _NavigatorComponent(elements) {
            const { viewport } = this.service;
            const { zoom } = viewport;
            const className = `navigator ${this._index >= 0 ? 'show' : 'hidden'}`;
            const element = elements[this._index];
            const bound = Bound.deserialize(element.xywh);
            const [left, right] = viewport.toViewCoord(bound.x, bound.y);
            const [width, height] = [bound.w * zoom, bound.h * zoom];
            const navigatorStyle = styleMap({
                position: 'absolute',
                transform: `translate(${left + width / 2 - 26}px, ${right + height + 16}px)`,
            });
            return html `<div class=${className} style=${navigatorStyle}>
      <div
        role="button"
        class="edgeless-auto-connect-previous-button"
        @pointerdown=${(e) => {
                stopPropagation(e);
                this._navigateToPrev();
            }}
      >
        ${AutoConnectLeftIcon}
      </div>
      <span></span>
      <div
        role="button"
        class="edgeless-auto-connect-next-button"
        @pointerdown=${(e) => {
                stopPropagation(e);
                this._navigateToNext();
            }}
      >
        ${AutoConnectRightIcon}
      </div>
    </div> `;
        }
        _PageVisibleIndexLabels(elements, counts) {
            const { viewport } = this.service;
            const { zoom } = viewport;
            let index = 0;
            return html `${repeat(elements, element => element.id, (element, i) => {
                const bound = Bound.deserialize(element.xywh$.value);
                const [left, right] = viewport.toViewCoord(bound.x, bound.y);
                const [width, height] = [bound.w * zoom, bound.h * zoom];
                const style = styleMap({
                    width: `${PAGE_VISIBLE_INDEX_LABEL_WIDTH}px`,
                    maxWidth: `${PAGE_VISIBLE_INDEX_LABEL_WIDTH}px`,
                    height: `${PAGE_VISIBLE_INDEX_LABEL_HEIGHT}px`,
                    position: 'absolute',
                    transform: `translate(${left + width / 2 - PAGE_VISIBLE_INDEX_LABEL_WIDTH / 2}px,
          ${right + height + INDEX_LABEL_OFFSET}px)`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                });
                const components = [];
                const count = counts[i];
                const initGap = 24 / count - 24;
                const positions = calculatePosition(initGap, count, PAGE_VISIBLE_INDEX_LABEL_HEIGHT);
                for (let j = 0; j < count; j++) {
                    index++;
                    components.push(html `
            <div
              style=${styleMap({
                        position: 'absolute',
                        top: positions[j][0] + 'px',
                        left: positions[j][1] + 'px',
                        transition: 'all 0.1s linear',
                    })}
              index=${i}
              class="page-visible-index-label"
              @pointerdown=${(e) => {
                        stopPropagation(e);
                        this._index = this._index === i ? -1 : i;
                    }}
            >
              ${index}
              <affine-tooltip tip-position="bottom">
                ${getIndexLabelTooltip(SmallDocIcon, 'Page mode index')}
              </affine-tooltip>
            </div>
          `);
                }
                function updateChildrenPosition(e, positions) {
                    if (!e.target)
                        return;
                    const children = e.target.children;
                    Array.from(children).forEach((c, index) => {
                        c.style.top = positions[index][0] + 'px';
                        c.style.left = positions[index][1] + 'px';
                    });
                }
                return html `<div
          style=${style}
          @mouseenter=${(e) => {
                    const positions = calculatePosition(5, count, PAGE_VISIBLE_INDEX_LABEL_HEIGHT);
                    updateChildrenPosition(e, positions);
                }}
          @mouseleave=${(e) => {
                    const positions = calculatePosition(initGap, count, PAGE_VISIBLE_INDEX_LABEL_HEIGHT);
                    updateChildrenPosition(e, positions);
                }}
        >
          ${components}
        </div>`;
            })}`;
        }
        _setHostStyle() {
            this.style.position = 'absolute';
            this.style.top = '0';
            this.style.left = '0';
            this.style.zIndex = '1';
        }
        connectedCallback() {
            super.connectedCallback();
            this._setHostStyle();
            this._initLabels();
        }
        firstUpdated() {
            const { _disposables, service } = this;
            _disposables.add(service.viewport.viewportUpdated.on(() => {
                this.requestUpdate();
            }));
            _disposables.add(service.selection.slots.updated.on(() => {
                const { selectedElements } = service.selection;
                if (!(selectedElements.length === 1 && isNoteBlock(selectedElements[0]))) {
                    this._index = -1;
                }
            }));
            _disposables.add(service.uiEventDispatcher.add('dragStart', () => {
                this._dragging = true;
            }));
            _disposables.add(service.uiEventDispatcher.add('dragEnd', () => {
                this._dragging = false;
            }));
            _disposables.add(service.slots.elementResizeStart.on(() => {
                this._dragging = true;
            }));
            _disposables.add(service.slots.elementResizeEnd.on(() => {
                this._dragging = false;
            }));
        }
        render() {
            const advancedVisibilityEnabled = this.doc.awarenessStore.getFlag('enable_advanced_block_visibility');
            if (!this._show || this._dragging || !advancedVisibilityEnabled) {
                return nothing;
            }
            this._updateLabels();
            const { elements, counts } = this._getElementsAndCounts();
            return html `${this._PageVisibleIndexLabels(elements, counts)}
    ${this._EdgelessOnlyLabels()}
    ${this._index >= 0 && this._index < elements.length
                ? this._NavigatorComponent(elements)
                : nothing} `;
        }
        #_dragging_accessor_storage;
        get _dragging() { return this.#_dragging_accessor_storage; }
        set _dragging(value) { this.#_dragging_accessor_storage = value; }
        #_edgelessOnlyNotesSet_accessor_storage;
        get _edgelessOnlyNotesSet() { return this.#_edgelessOnlyNotesSet_accessor_storage; }
        set _edgelessOnlyNotesSet(value) { this.#_edgelessOnlyNotesSet_accessor_storage = value; }
        #_index_accessor_storage;
        get _index() { return this.#_index_accessor_storage; }
        set _index(value) { this.#_index_accessor_storage = value; }
        #_pageVisibleElementsMap_accessor_storage;
        get _pageVisibleElementsMap() { return this.#_pageVisibleElementsMap_accessor_storage; }
        set _pageVisibleElementsMap(value) { this.#_pageVisibleElementsMap_accessor_storage = value; }
        #_show_accessor_storage;
        get _show() { return this.#_show_accessor_storage; }
        set _show(value) { this.#_show_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._updateLabels = () => {
                const service = this.service;
                if (!service.doc.root)
                    return;
                const pageVisibleBlocks = new Map();
                const notes = service.doc.root?.children.filter(child => matchFlavours(child, ['affine:note']));
                const edgelessOnlyNotesSet = new Set();
                notes.forEach(note => {
                    if (isNoteBlock(note)) {
                        if (note.displayMode$.value === NoteDisplayMode.EdgelessOnly) {
                            edgelessOnlyNotesSet.add(note);
                        }
                        else if (note.displayMode$.value === NoteDisplayMode.DocAndEdgeless) {
                            pageVisibleBlocks.set(note, 1);
                        }
                    }
                    note.children.forEach(model => {
                        if (matchFlavours(model, ['affine:surface-ref'])) {
                            const reference = service.getElementById(model.reference);
                            if (!isAutoConnectElement(reference))
                                return;
                            if (!pageVisibleBlocks.has(reference)) {
                                pageVisibleBlocks.set(reference, 1);
                            }
                            else {
                                pageVisibleBlocks.set(reference, pageVisibleBlocks.get(reference) + 1);
                            }
                        }
                    });
                });
                this._edgelessOnlyNotesSet = edgelessOnlyNotesSet;
                this._pageVisibleElementsMap = pageVisibleBlocks;
            };
            this.#_dragging_accessor_storage = __runInitializers(this, __dragging_initializers, false);
            this.#_edgelessOnlyNotesSet_accessor_storage = (__runInitializers(this, __dragging_extraInitializers), __runInitializers(this, __edgelessOnlyNotesSet_initializers, new Set()));
            this.#_index_accessor_storage = (__runInitializers(this, __edgelessOnlyNotesSet_extraInitializers), __runInitializers(this, __index_initializers, -1));
            this.#_pageVisibleElementsMap_accessor_storage = (__runInitializers(this, __index_extraInitializers), __runInitializers(this, __pageVisibleElementsMap_initializers, new Map()));
            this.#_show_accessor_storage = (__runInitializers(this, __pageVisibleElementsMap_extraInitializers), __runInitializers(this, __show_initializers, false));
            __runInitializers(this, __show_extraInitializers);
        }
    };
})();
export { EdgelessAutoConnectWidget };
//# sourceMappingURL=edgeless-auto-connect.js.map