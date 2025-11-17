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
import { getScrollContainer, matchFlavours, } from '@blocksuite/affine-shared/utils';
import { BLOCK_ID_ATTR } from '@blocksuite/block-std';
import { BlockComponent, WidgetComponent } from '@blocksuite/block-std';
import { assertInstanceOf } from '@blocksuite/global/utils';
import { html, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { autoScroll } from '../../text-selection/utils.js';
export const AFFINE_PAGE_DRAGGING_AREA_WIDGET = 'affine-page-dragging-area-widget';
let AffinePageDraggingAreaWidget = (() => {
    let _classSuper = WidgetComponent;
    let _rect_decorators;
    let _rect_initializers = [];
    let _rect_extraInitializers = [];
    return class AffinePageDraggingAreaWidget extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _rect_decorators = [state()];
            __esDecorate(this, null, _rect_decorators, { kind: "accessor", name: "rect", static: false, private: false, access: { has: obj => "rect" in obj, get: obj => obj.rect, set: (obj, value) => { obj.rect = value; } }, metadata: _metadata }, _rect_initializers, _rect_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.excludeFlavours = ['affine:note', 'affine:surface']; }
        get _allBlocksWithRect() {
            if (!this._viewport) {
                return [];
            }
            const { scrollLeft, scrollTop } = this._viewport;
            const getAllNodeFromTree = () => {
                const blocks = [];
                this.host.view.walkThrough(node => {
                    const view = node;
                    if (!(view instanceof BlockComponent)) {
                        return true;
                    }
                    if (view.model.role !== 'root' &&
                        !AffinePageDraggingAreaWidget.excludeFlavours.includes(view.model.flavour)) {
                        blocks.push(view);
                    }
                    return;
                });
                return blocks;
            };
            const elements = getAllNodeFromTree();
            return elements.map(element => {
                const bounding = element.getBoundingClientRect();
                return {
                    element,
                    rect: {
                        left: bounding.left + scrollLeft,
                        top: bounding.top + scrollTop,
                        width: bounding.width,
                        height: bounding.height,
                    },
                };
            });
        }
        get _viewport() {
            const rootComponent = this.block;
            if (!rootComponent)
                return;
            return rootComponent.viewport;
        }
        get scrollContainer() {
            return getScrollContainer(this.block);
        }
        _clearRaf() {
            if (this._rafID) {
                cancelAnimationFrame(this._rafID);
                this._rafID = 0;
            }
        }
        _selectBlocksByRect(userRect) {
            const selections = getSelectingBlockPaths(this._allBlocksWithRect, userRect).map(blockPath => {
                return this.host.selection.create('block', {
                    blockId: blockPath,
                });
            });
            this.host.selection.setGroup('note', selections);
        }
        connectedCallback() {
            super.connectedCallback();
            this.handleEvent('pointerDown', ctx => {
                const container = this.block.rootElementContainer;
                if (!container)
                    return;
                const containerRect = container.getBoundingClientRect();
                const containerStyles = window.getComputedStyle(container);
                const paddingLeft = parseFloat(containerStyles.paddingLeft);
                const paddingRight = parseFloat(containerStyles.paddingRight);
                const state = ctx.get('pointerState');
                const raw = state.raw;
                if (raw.clientX > containerRect.left + paddingLeft &&
                    raw.clientX < containerRect.right - paddingRight &&
                    raw.clientY > containerRect.top &&
                    raw.clientY < containerRect.bottom) {
                    return;
                }
                state.raw.preventDefault();
            }, {
                global: true,
            });
            this.handleEvent('dragStart', ctx => {
                const state = ctx.get('pointerState');
                const { button } = state.raw;
                if (button !== 0)
                    return;
                if (isDragArea(state)) {
                    if (!this._viewport) {
                        return;
                    }
                    this._dragging = true;
                    const { scrollLeft, scrollTop } = this._viewport;
                    this._initialScrollOffset = {
                        left: scrollLeft,
                        top: scrollTop,
                    };
                    this._initialContainerOffset = {
                        x: state.containerOffset.x,
                        y: state.containerOffset.y,
                    };
                    return true;
                }
                return;
            }, { global: true });
            this.handleEvent('dragMove', ctx => {
                this._clearRaf();
                if (!this._dragging) {
                    return;
                }
                const state = ctx.get('pointerState');
                // TODO(@L-Sun) support drag area for touch device
                if (state.raw.pointerType === 'touch')
                    return;
                ctx.get('defaultState').event.preventDefault();
                this._rafID = requestAnimationFrame(() => {
                    this._updateDraggingArea(state, true);
                });
                return true;
            }, { global: true });
            this.handleEvent('dragEnd', () => {
                this._clearRaf();
                this._dragging = false;
                this.rect = null;
                this._initialScrollOffset = {
                    top: 0,
                    left: 0,
                };
                this._initialContainerOffset = {
                    x: 0,
                    y: 0,
                };
                this._lastPointerState = null;
            }, {
                global: true,
            });
            this.handleEvent('pointerMove', ctx => {
                if (this._dragging) {
                    const state = ctx.get('pointerState');
                    state.raw.preventDefault();
                }
            }, {
                global: true,
            });
        }
        disconnectedCallback() {
            this._clearRaf();
            this._disposables.dispose();
            super.disconnectedCallback();
        }
        firstUpdated() {
            this._disposables.addFromEvent(this.scrollContainer, 'scroll', () => {
                if (!this._dragging || !this._lastPointerState)
                    return;
                const state = this._lastPointerState;
                this._rafID = requestAnimationFrame(() => {
                    this._updateDraggingArea(state, false);
                });
            });
        }
        render() {
            const rect = this.rect;
            if (!rect)
                return nothing;
            const style = {
                left: rect.left + 'px',
                top: rect.top + 'px',
                width: rect.width + 'px',
                height: rect.height + 'px',
            };
            return html `
      <style>
        .affine-page-dragging-area {
          position: absolute;
          background: var(--affine-hover-color);
          z-index: 1;
          pointer-events: none;
        }
      </style>
      <div class="affine-page-dragging-area" style=${styleMap(style)}></div>
    `;
        }
        #rect_accessor_storage;
        get rect() { return this.#rect_accessor_storage; }
        set rect(value) { this.#rect_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._dragging = false;
            this._initialContainerOffset = {
                x: 0,
                y: 0,
            };
            this._initialScrollOffset = {
                top: 0,
                left: 0,
            };
            this._lastPointerState = null;
            this._rafID = 0;
            this._updateDraggingArea = (state, shouldAutoScroll) => {
                const { x, y } = state;
                const { x: startX, y: startY } = state.start;
                const { left: initScrollX, top: initScrollY } = this._initialScrollOffset;
                if (!this._viewport) {
                    return;
                }
                const { scrollLeft, scrollTop, scrollWidth, scrollHeight } = this._viewport;
                const { x: initConX, y: initConY } = this._initialContainerOffset;
                const { x: conX, y: conY } = state.containerOffset;
                const { left: viewportLeft, top: viewportTop } = this._viewport;
                let left = Math.min(startX + initScrollX + initConX - viewportLeft, x + scrollLeft + conX - viewportLeft);
                let right = Math.max(startX + initScrollX + initConX - viewportLeft, x + scrollLeft + conX - viewportLeft);
                let top = Math.min(startY + initScrollY + initConY - viewportTop, y + scrollTop + conY - viewportTop);
                let bottom = Math.max(startY + initScrollY + initConY - viewportTop, y + scrollTop + conY - viewportTop);
                left = Math.max(left, conX - viewportLeft);
                right = Math.min(right, scrollWidth);
                top = Math.max(top, conY - viewportTop);
                bottom = Math.min(bottom, scrollHeight);
                const userRect = {
                    left,
                    top,
                    width: right - left,
                    height: bottom - top,
                };
                this.rect = userRect;
                this._selectBlocksByRect({
                    left: userRect.left + viewportLeft,
                    top: userRect.top + viewportTop,
                    width: userRect.width,
                    height: userRect.height,
                });
                this._lastPointerState = state;
                if (shouldAutoScroll) {
                    const rect = this.scrollContainer.getBoundingClientRect();
                    const result = autoScroll(this.scrollContainer, state.raw.y - rect.top);
                    if (!result) {
                        this._clearRaf();
                        return;
                    }
                }
            };
            this.#rect_accessor_storage = __runInitializers(this, _rect_initializers, null);
            __runInitializers(this, _rect_extraInitializers);
        }
    };
})();
export { AffinePageDraggingAreaWidget };
function rectIntersects(a, b) {
    return (a.left < b.left + b.width &&
        a.left + a.width > b.left &&
        a.top < b.top + b.height &&
        a.top + a.height > b.top);
}
function rectIncludesTopAndBottom(a, b) {
    return a.top <= b.top && a.top + a.height >= b.top + b.height;
}
function filterBlockInfos(blockInfos, userRect) {
    const results = [];
    for (const blockInfo of blockInfos) {
        const rect = blockInfo.rect;
        if (userRect.top + userRect.height < rect.top)
            break;
        results.push(blockInfo);
    }
    return results;
}
function filterBlockInfosByParent(parentInfos, userRect, filteredBlockInfos) {
    const targetBlock = parentInfos.element;
    let results = [parentInfos];
    if (targetBlock.childElementCount > 0) {
        const childBlockInfos = targetBlock.childBlocks
            .map(el => filteredBlockInfos.find(blockInfo => blockInfo.element.model.id === el.model.id))
            .filter(block => block);
        const firstIndex = childBlockInfos.findIndex(bl => rectIntersects(bl.rect, userRect) && bl.rect.top < userRect.top);
        const lastIndex = childBlockInfos.findIndex(bl => rectIntersects(bl.rect, userRect) &&
            bl.rect.top + bl.rect.height > userRect.top + userRect.height);
        if (firstIndex !== -1 && lastIndex !== -1) {
            results = childBlockInfos.slice(firstIndex, lastIndex + 1);
        }
    }
    return results;
}
function getSelectingBlockPaths(blockInfos, userRect) {
    const filteredBlockInfos = filterBlockInfos(blockInfos, userRect);
    const len = filteredBlockInfos.length;
    const blockPaths = [];
    let singleTargetParentBlock = null;
    let blocks = [];
    if (len === 0)
        return blockPaths;
    // To get the single target parent block info
    for (const block of filteredBlockInfos) {
        const rect = block.rect;
        if (rectIntersects(userRect, rect) &&
            rectIncludesTopAndBottom(rect, userRect)) {
            singleTargetParentBlock = block;
        }
    }
    if (singleTargetParentBlock) {
        blocks = filterBlockInfosByParent(singleTargetParentBlock, userRect, filteredBlockInfos);
    }
    else {
        // If there is no block contains the top and bottom of the userRect
        // Then get all the blocks that intersect with the userRect
        for (const block of filteredBlockInfos) {
            if (rectIntersects(userRect, block.rect)) {
                blocks.push(block);
            }
        }
    }
    // Filter out the blocks which parent is in the blocks
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const parent = blocks[i].element.doc.getParent(block.element.model);
        const parentId = parent?.id;
        if (parentId) {
            const isParentInBlocks = blocks.some(block => block.element.model.id === parentId);
            if (!isParentInBlocks) {
                blockPaths.push(blocks[i].element.blockId);
            }
        }
    }
    return blockPaths;
}
function isDragArea(e) {
    const el = e.raw.target;
    assertInstanceOf(el, Element);
    const block = el.closest(`[${BLOCK_ID_ATTR}]`);
    return block && matchFlavours(block.model, ['affine:page', 'affine:note']);
}
//# sourceMappingURL=page-dragging-area.js.map