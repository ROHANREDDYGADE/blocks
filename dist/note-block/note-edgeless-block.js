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
import { MoreIndicatorIcon } from '@blocksuite/affine-components/icons';
import { DEFAULT_NOTE_BACKGROUND_COLOR, NoteDisplayMode, StrokeStyle, } from '@blocksuite/affine-model';
import { EDGELESS_BLOCK_CHILD_PADDING } from '@blocksuite/affine-shared/consts';
import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { getClosestBlockComponentByPoint, handleNativeRangeAtPoint, matchFlavours, stopPropagation, } from '@blocksuite/affine-shared/utils';
import { ShadowlessElement, toGfxBlockComponent } from '@blocksuite/block-std';
import { almostEqual, Bound, clamp, Point, WithDisposable, } from '@blocksuite/global/utils';
import { css, html, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { NoteBlockComponent } from './note-block.js';
let EdgelessNoteMask = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let _display_decorators;
    let _display_initializers = [];
    let _display_extraInitializers = [];
    let _editing_decorators;
    let _editing_initializers = [];
    let _editing_extraInitializers = [];
    let _host_decorators;
    let _host_initializers = [];
    let _host_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _zoom_decorators;
    let _zoom_initializers = [];
    let _zoom_extraInitializers = [];
    return class EdgelessNoteMask extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _display_decorators = [property({ attribute: false })];
            _editing_decorators = [property({ attribute: false })];
            _host_decorators = [property({ attribute: false })];
            _model_decorators = [property({ attribute: false })];
            _zoom_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _display_decorators, { kind: "accessor", name: "display", static: false, private: false, access: { has: obj => "display" in obj, get: obj => obj.display, set: (obj, value) => { obj.display = value; } }, metadata: _metadata }, _display_initializers, _display_extraInitializers);
            __esDecorate(this, null, _editing_decorators, { kind: "accessor", name: "editing", static: false, private: false, access: { has: obj => "editing" in obj, get: obj => obj.editing, set: (obj, value) => { obj.editing = value; } }, metadata: _metadata }, _editing_initializers, _editing_extraInitializers);
            __esDecorate(this, null, _host_decorators, { kind: "accessor", name: "host", static: false, private: false, access: { has: obj => "host" in obj, get: obj => obj.host, set: (obj, value) => { obj.host = value; } }, metadata: _metadata }, _host_initializers, _host_extraInitializers);
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(this, null, _zoom_decorators, { kind: "accessor", name: "zoom", static: false, private: false, access: { has: obj => "zoom" in obj, get: obj => obj.zoom, set: (obj, value) => { obj.zoom = value; } }, metadata: _metadata }, _zoom_initializers, _zoom_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        firstUpdated() {
            const maskDOM = this.renderRoot.querySelector('.affine-note-mask');
            const observer = new ResizeObserver(entries => {
                for (const entry of entries) {
                    if (!this.model.edgeless.collapse) {
                        const bound = Bound.deserialize(this.model.xywh);
                        const scale = this.model.edgeless.scale ?? 1;
                        const height = entry.contentRect.height * scale;
                        if (!height || almostEqual(bound.h, height)) {
                            return;
                        }
                        bound.h = height;
                        this.model.stash('xywh');
                        this.model.xywh = bound.serialize();
                        this.model.pop('xywh');
                    }
                }
            });
            observer.observe(maskDOM);
            this._disposables.add(() => {
                observer.disconnect();
            });
        }
        render() {
            const extra = this.editing ? ACTIVE_NOTE_EXTRA_PADDING : 0;
            return html `
      <div
        class="affine-note-mask"
        style=${styleMap({
                position: 'absolute',
                top: `${-extra}px`,
                left: `${-extra}px`,
                bottom: `${-extra}px`,
                right: `${-extra}px`,
                zIndex: '1',
                pointerEvents: this.display ? 'auto' : 'none',
                borderRadius: `${this.model.edgeless.style.borderRadius * this.zoom}px`,
            })}
      ></div>
    `;
        }
        #display_accessor_storage = __runInitializers(this, _display_initializers, void 0);
        get display() { return this.#display_accessor_storage; }
        set display(value) { this.#display_accessor_storage = value; }
        #editing_accessor_storage = (__runInitializers(this, _display_extraInitializers), __runInitializers(this, _editing_initializers, void 0));
        get editing() { return this.#editing_accessor_storage; }
        set editing(value) { this.#editing_accessor_storage = value; }
        #host_accessor_storage = (__runInitializers(this, _editing_extraInitializers), __runInitializers(this, _host_initializers, void 0));
        get host() { return this.#host_accessor_storage; }
        set host(value) { this.#host_accessor_storage = value; }
        #model_accessor_storage = (__runInitializers(this, _host_extraInitializers), __runInitializers(this, _model_initializers, void 0));
        get model() { return this.#model_accessor_storage; }
        set model(value) { this.#model_accessor_storage = value; }
        #zoom_accessor_storage = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _zoom_initializers, void 0));
        get zoom() { return this.#zoom_accessor_storage; }
        set zoom(value) { this.#zoom_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _zoom_extraInitializers);
        }
    };
})();
export { EdgelessNoteMask };
const ACTIVE_NOTE_EXTRA_PADDING = 20;
let EdgelessNoteBlockComponent = (() => {
    let _classSuper = toGfxBlockComponent(NoteBlockComponent);
    let __editing_decorators;
    let __editing_initializers = [];
    let __editing_extraInitializers = [];
    let __isHover_decorators;
    let __isHover_initializers = [];
    let __isHover_extraInitializers = [];
    let __isResizing_decorators;
    let __isResizing_initializers = [];
    let __isResizing_extraInitializers = [];
    let __isSelected_decorators;
    let __isSelected_initializers = [];
    let __isSelected_extraInitializers = [];
    let __noteFullHeight_decorators;
    let __noteFullHeight_initializers = [];
    let __noteFullHeight_extraInitializers = [];
    let __notePageContent_decorators;
    let __notePageContent_initializers = [];
    let __notePageContent_extraInitializers = [];
    return class EdgelessNoteBlockComponent extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __editing_decorators = [state()];
            __isHover_decorators = [state()];
            __isResizing_decorators = [state()];
            __isSelected_decorators = [state()];
            __noteFullHeight_decorators = [state()];
            __notePageContent_decorators = [query('.edgeless-note-page-content .affine-note-block-container')];
            __esDecorate(this, null, __editing_decorators, { kind: "accessor", name: "_editing", static: false, private: false, access: { has: obj => "_editing" in obj, get: obj => obj._editing, set: (obj, value) => { obj._editing = value; } }, metadata: _metadata }, __editing_initializers, __editing_extraInitializers);
            __esDecorate(this, null, __isHover_decorators, { kind: "accessor", name: "_isHover", static: false, private: false, access: { has: obj => "_isHover" in obj, get: obj => obj._isHover, set: (obj, value) => { obj._isHover = value; } }, metadata: _metadata }, __isHover_initializers, __isHover_extraInitializers);
            __esDecorate(this, null, __isResizing_decorators, { kind: "accessor", name: "_isResizing", static: false, private: false, access: { has: obj => "_isResizing" in obj, get: obj => obj._isResizing, set: (obj, value) => { obj._isResizing = value; } }, metadata: _metadata }, __isResizing_initializers, __isResizing_extraInitializers);
            __esDecorate(this, null, __isSelected_decorators, { kind: "accessor", name: "_isSelected", static: false, private: false, access: { has: obj => "_isSelected" in obj, get: obj => obj._isSelected, set: (obj, value) => { obj._isSelected = value; } }, metadata: _metadata }, __isSelected_initializers, __isSelected_extraInitializers);
            __esDecorate(this, null, __noteFullHeight_decorators, { kind: "accessor", name: "_noteFullHeight", static: false, private: false, access: { has: obj => "_noteFullHeight" in obj, get: obj => obj._noteFullHeight, set: (obj, value) => { obj._noteFullHeight = value; } }, metadata: _metadata }, __noteFullHeight_initializers, __noteFullHeight_extraInitializers);
            __esDecorate(this, null, __notePageContent_decorators, { kind: "accessor", name: "_notePageContent", static: false, private: false, access: { has: obj => "_notePageContent" in obj, get: obj => obj._notePageContent, set: (obj, value) => { obj._notePageContent = value; } }, metadata: _metadata }, __notePageContent_initializers, __notePageContent_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .edgeless-note-collapse-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      z-index: 2;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0.2;
      transition: opacity 0.3s;
    }
    .edgeless-note-collapse-button:hover {
      opacity: 1;
    }
    .edgeless-note-collapse-button.flip {
      transform: translateX(-50%) rotate(180deg);
    }
    .edgeless-note-collapse-button.hide {
      display: none;
    }

    .edgeless-note-container:has(.affine-embed-synced-doc-container.editing)
      > .note-background {
      left: ${-ACTIVE_NOTE_EXTRA_PADDING}px !important;
      top: ${-ACTIVE_NOTE_EXTRA_PADDING}px !important;
      width: calc(100% + ${ACTIVE_NOTE_EXTRA_PADDING * 2}px) !important;
      height: calc(100% + ${ACTIVE_NOTE_EXTRA_PADDING * 2}px) !important;
    }

    .edgeless-note-container:has(.affine-embed-synced-doc-container.editing)
      > edgeless-note-mask {
      display: none;
    }
  `; }
        get _isShowCollapsedContent() {
            return this.model.edgeless.collapse && (this._isResizing || this._isHover);
        }
        get _zoom() {
            return this.gfx.viewport.zoom;
        }
        get rootService() {
            return this.std.getService('affine:page');
        }
        _collapsedContent() {
            if (!this._isShowCollapsedContent) {
                return nothing;
            }
            const { xywh, edgeless } = this.model;
            const { borderSize } = edgeless.style;
            const extraPadding = this._editing ? ACTIVE_NOTE_EXTRA_PADDING : 0;
            const extraBorder = this._editing ? borderSize : 0;
            const bound = Bound.deserialize(xywh);
            const scale = edgeless.scale ?? 1;
            const width = bound.w / scale + extraPadding * 2 + extraBorder;
            const height = bound.h / scale;
            const rect = this._notePageContent?.getBoundingClientRect();
            if (!rect)
                return nothing;
            const zoom = this.gfx.viewport.zoom;
            this._noteFullHeight =
                rect.height / scale / zoom + 2 * EDGELESS_BLOCK_CHILD_PADDING;
            if (height >= this._noteFullHeight) {
                return nothing;
            }
            return html `
      <div
        style=${styleMap({
                width: `${width}px`,
                height: `${this._noteFullHeight - height}px`,
                position: 'absolute',
                left: `${-(extraPadding + extraBorder / 2)}px`,
                top: `${height + extraPadding + extraBorder / 2}px`,
                background: 'var(--affine-white)',
                opacity: 0.5,
                pointerEvents: 'none',
                borderLeft: '2px var(--affine-blue) solid',
                borderBottom: '2px var(--affine-blue) solid',
                borderRight: '2px var(--affine-blue) solid',
                borderRadius: '0 0 8px 8px',
            })}
      ></div>
    `;
        }
        _handleClickAtBackground(e) {
            e.stopPropagation();
            if (!this._editing)
                return;
            const rect = this.getBoundingClientRect();
            const offsetY = 16 * this._zoom;
            const offsetX = 2 * this._zoom;
            const x = clamp(e.x, rect.left + offsetX, rect.right - offsetX);
            const y = clamp(e.y, rect.top + offsetY, rect.bottom - offsetY);
            handleNativeRangeAtPoint(x, y);
            if (this.doc.readonly)
                return;
            this._tryAddParagraph(x, y);
        }
        _hovered() {
            if (this.selection.value.some(sel => sel.type === 'surface' && sel.blockId === this.model.id)) {
                this._isHover = true;
            }
        }
        _leaved() {
            if (this._isHover) {
                this._isHover = false;
            }
        }
        _setCollapse(event) {
            event.stopImmediatePropagation();
            const { collapse, collapsedHeight } = this.model.edgeless;
            if (collapse) {
                this.model.doc.updateBlock(this.model, () => {
                    this.model.edgeless.collapse = false;
                });
            }
            else if (collapsedHeight) {
                const { xywh, edgeless } = this.model;
                const bound = Bound.deserialize(xywh);
                bound.h = collapsedHeight * (edgeless.scale ?? 1);
                this.model.doc.updateBlock(this.model, () => {
                    this.model.edgeless.collapse = true;
                    this.model.xywh = bound.serialize();
                });
            }
            this.selection.clear();
        }
        _tryAddParagraph(x, y) {
            const nearest = getClosestBlockComponentByPoint(new Point(x, y));
            if (!nearest)
                return;
            const nearestBBox = nearest.getBoundingClientRect();
            const yRel = y - nearestBBox.top;
            const insertPos = yRel < nearestBBox.height / 2 ? 'before' : 'after';
            const nearestModel = nearest.model;
            const nearestModelIdx = this.model.children.indexOf(nearestModel);
            const children = this.model.children;
            const siblingModel = children[clamp(nearestModelIdx + (insertPos === 'before' ? -1 : 1), 0, children.length)];
            if ((!nearestModel.text ||
                !matchFlavours(nearestModel, ['affine:paragraph', 'affine:list'])) &&
                (!siblingModel ||
                    !siblingModel.text ||
                    !matchFlavours(siblingModel, ['affine:paragraph', 'affine:list']))) {
                const [pId] = this.doc.addSiblingBlocks(nearestModel, [{ flavour: 'affine:paragraph' }], insertPos);
                this.updateComplete
                    .then(() => {
                    this.std.selection.setGroup('note', [
                        this.std.selection.create('text', {
                            from: {
                                blockId: pId,
                                index: 0,
                                length: 0,
                            },
                            to: null,
                        }),
                    ]);
                })
                    .catch(console.error);
            }
        }
        connectedCallback() {
            super.connectedCallback();
            const selection = this.rootService.selection;
            this._editing = selection.has(this.model.id) && selection.editing;
            this._disposables.add(selection.slots.updated.on(() => {
                if (selection.has(this.model.id) && selection.editing) {
                    this._editing = true;
                }
                else {
                    this._editing = false;
                }
            }));
        }
        firstUpdated() {
            const { _disposables } = this;
            const selection = this.rootService.selection;
            _disposables.add(this.rootService.slots.elementResizeStart.on(() => {
                if (selection.selectedElements.includes(this.model)) {
                    this._isResizing = true;
                }
            }));
            _disposables.add(this.rootService.slots.elementResizeEnd.on(() => {
                this._isResizing = false;
            }));
            const observer = new MutationObserver(() => {
                const rect = this._notePageContent?.getBoundingClientRect();
                if (!rect)
                    return;
                const zoom = this.gfx.viewport.zoom;
                const scale = this.model.edgeless.scale ?? 1;
                this._noteFullHeight =
                    rect.height / scale / zoom + 2 * EDGELESS_BLOCK_CHILD_PADDING;
            });
            if (this._notePageContent) {
                observer.observe(this, { childList: true, subtree: true });
                _disposables.add(() => observer.disconnect());
            }
        }
        getRenderingRect() {
            const { xywh, edgeless } = this.model;
            const { collapse, scale = 1 } = edgeless;
            const bound = Bound.deserialize(xywh);
            const width = bound.w / scale;
            const height = bound.h / scale;
            return {
                x: bound.x,
                y: bound.y,
                w: width,
                h: collapse ? height : 'inherit',
                zIndex: this.toZIndex(),
            };
        }
        renderGfxBlock() {
            const { model } = this;
            const { displayMode } = model;
            if (!!displayMode && displayMode === NoteDisplayMode.DocOnly)
                return nothing;
            const { xywh, edgeless } = model;
            const { borderRadius, borderSize, borderStyle, shadowType } = edgeless.style;
            const { collapse, collapsedHeight, scale = 1 } = edgeless;
            const bound = Bound.deserialize(xywh);
            const width = bound.w / scale;
            const height = bound.h / scale;
            const style = {
                height: '100%',
                padding: `${EDGELESS_BLOCK_CHILD_PADDING}px`,
                boxSizing: 'border-box',
                borderRadius: borderRadius + 'px',
                pointerEvents: 'all',
                transformOrigin: '0 0',
                transform: `scale(${scale})`,
                fontWeight: '400',
                lineHeight: 'var(--affine-line-height)',
            };
            const extra = this._editing ? ACTIVE_NOTE_EXTRA_PADDING : 0;
            const backgroundColor = this.std
                .get(ThemeProvider)
                .generateColorProperty(model.background, DEFAULT_NOTE_BACKGROUND_COLOR);
            const backgroundStyle = {
                position: 'absolute',
                left: `${-extra}px`,
                top: `${-extra}px`,
                width: `${width + extra * 2}px`,
                height: `calc(100% + ${extra * 2}px)`,
                borderRadius: borderRadius + 'px',
                transition: this._editing
                    ? 'left 0.3s, top 0.3s, width 0.3s, height 0.3s'
                    : 'none',
                backgroundColor,
                border: `${borderSize}px ${borderStyle === StrokeStyle.Dash ? 'dashed' : borderStyle} var(--affine-black-10)`,
                boxShadow: this._editing
                    ? 'var(--affine-active-shadow)'
                    : !shadowType
                        ? 'none'
                        : `var(${shadowType})`,
            };
            const isCollapsable = collapse != null &&
                collapsedHeight != null &&
                collapsedHeight !== this._noteFullHeight;
            const isCollapseArrowUp = collapse
                ? this._noteFullHeight < height
                : !!collapsedHeight && collapsedHeight < height;
            return html `
      <div
        class="edgeless-note-container"
        style=${styleMap(style)}
        data-model-height="${bound.h}"
        @mouseleave=${this._leaved}
        @mousemove=${this._hovered}
        data-scale="${scale}"
      >
        <div
          class="note-background"
          style=${styleMap(backgroundStyle)}
          @pointerdown=${stopPropagation}
          @click=${this._handleClickAtBackground}
        ></div>

        <div
          class="edgeless-note-page-content"
          style=${styleMap({
                width: '100%',
                height: '100%',
                'overflow-y': this._isShowCollapsedContent ? 'initial' : 'clip',
            })}
        >
          ${this.renderPageContent()}
        </div>

        ${isCollapsable
                ? html `<div
              class="${classMap({
                    'edgeless-note-collapse-button': true,
                    flip: isCollapseArrowUp,
                    hide: this._isSelected,
                })}"
              style=${styleMap({
                    bottom: this._editing ? `${-extra}px` : '0',
                })}
              @mousedown=${stopPropagation}
              @mouseup=${stopPropagation}
              @click=${this._setCollapse}
            >
              ${MoreIndicatorIcon}
            </div>`
                : nothing}
        ${this._collapsedContent()}

        <edgeless-note-mask
          .model=${this.model}
          .display=${!this._editing}
          .host=${this.host}
          .zoom=${this.gfx.viewport.zoom ?? 1}
          .editing=${this._editing}
        ></edgeless-note-mask>
      </div>
    `;
        }
        #_editing_accessor_storage = __runInitializers(this, __editing_initializers, false);
        get _editing() { return this.#_editing_accessor_storage; }
        set _editing(value) { this.#_editing_accessor_storage = value; }
        #_isHover_accessor_storage = (__runInitializers(this, __editing_extraInitializers), __runInitializers(this, __isHover_initializers, false));
        get _isHover() { return this.#_isHover_accessor_storage; }
        set _isHover(value) { this.#_isHover_accessor_storage = value; }
        #_isResizing_accessor_storage = (__runInitializers(this, __isHover_extraInitializers), __runInitializers(this, __isResizing_initializers, false));
        get _isResizing() { return this.#_isResizing_accessor_storage; }
        set _isResizing(value) { this.#_isResizing_accessor_storage = value; }
        #_isSelected_accessor_storage = (__runInitializers(this, __isResizing_extraInitializers), __runInitializers(this, __isSelected_initializers, false));
        get _isSelected() { return this.#_isSelected_accessor_storage; }
        set _isSelected(value) { this.#_isSelected_accessor_storage = value; }
        #_noteFullHeight_accessor_storage = (__runInitializers(this, __isSelected_extraInitializers), __runInitializers(this, __noteFullHeight_initializers, 0));
        get _noteFullHeight() { return this.#_noteFullHeight_accessor_storage; }
        set _noteFullHeight(value) { this.#_noteFullHeight_accessor_storage = value; }
        #_notePageContent_accessor_storage = (__runInitializers(this, __noteFullHeight_extraInitializers), __runInitializers(this, __notePageContent_initializers, null));
        get _notePageContent() { return this.#_notePageContent_accessor_storage; }
        set _notePageContent(value) { this.#_notePageContent_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, __notePageContent_extraInitializers);
        }
    };
})();
export { EdgelessNoteBlockComponent };
//# sourceMappingURL=note-edgeless-block.js.map