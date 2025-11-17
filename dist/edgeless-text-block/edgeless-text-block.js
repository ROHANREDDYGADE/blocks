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
import { TextUtils } from '@blocksuite/affine-block-surface';
import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { matchFlavours } from '@blocksuite/affine-shared/utils';
import { GfxBlockComponent } from '@blocksuite/block-std';
import { Bound } from '@blocksuite/global/utils';
import { css, html } from 'lit';
import { query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
export const EDGELESS_TEXT_BLOCK_MIN_WIDTH = 50;
export const EDGELESS_TEXT_BLOCK_MIN_HEIGHT = 50;
let EdgelessTextBlockComponent = (() => {
    let _classSuper = GfxBlockComponent;
    let __editing_decorators;
    let __editing_initializers = [];
    let __editing_extraInitializers = [];
    let __textContainer_decorators;
    let __textContainer_initializers = [];
    let __textContainer_extraInitializers = [];
    let _childrenContainer_decorators;
    let _childrenContainer_initializers = [];
    let _childrenContainer_extraInitializers = [];
    return class EdgelessTextBlockComponent extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __editing_decorators = [state()];
            __textContainer_decorators = [query('.edgeless-text-block-container')];
            _childrenContainer_decorators = [query('.affine-block-children-container')];
            __esDecorate(this, null, __editing_decorators, { kind: "accessor", name: "_editing", static: false, private: false, access: { has: obj => "_editing" in obj, get: obj => obj._editing, set: (obj, value) => { obj._editing = value; } }, metadata: _metadata }, __editing_initializers, __editing_extraInitializers);
            __esDecorate(this, null, __textContainer_decorators, { kind: "accessor", name: "_textContainer", static: false, private: false, access: { has: obj => "_textContainer" in obj, get: obj => obj._textContainer, set: (obj, value) => { obj._textContainer = value; } }, metadata: _metadata }, __textContainer_initializers, __textContainer_extraInitializers);
            __esDecorate(this, null, _childrenContainer_decorators, { kind: "accessor", name: "childrenContainer", static: false, private: false, access: { has: obj => "childrenContainer" in obj, get: obj => obj.childrenContainer, set: (obj, value) => { obj.childrenContainer = value; } }, metadata: _metadata }, _childrenContainer_initializers, _childrenContainer_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .edgeless-text-block-container[data-max-width='false'] .inline-editor span {
      word-break: keep-all !important;
      text-wrap: nowrap !important;
    }

    .edgeless-text-block-container affine-paragraph,
    affine-list {
      color: var(--edgeless-text-color);
      font-family: var(--edgeless-text-font-family);
      font-style: var(--edgeless-text-font-style);
      font-weight: var(--edgeless-text-font-weight);
      text-align: var(--edgeless-text-text-align);
    }
  `; }
        get rootService() {
            return this.std.getService('affine:page');
        }
        _updateH() {
            const bound = Bound.deserialize(this.model.xywh);
            const rect = this._textContainer.getBoundingClientRect();
            bound.h = rect.height / this.gfx.viewport.zoom;
            this.doc.updateBlock(this.model, {
                xywh: bound.serialize(),
            });
        }
        _updateW() {
            const bound = Bound.deserialize(this.model.xywh);
            const rect = this._textContainer.getBoundingClientRect();
            bound.w = Math.max(rect.width / this.gfx.viewport.zoom, EDGELESS_TEXT_BLOCK_MIN_WIDTH * this.gfx.viewport.zoom);
            this.doc.updateBlock(this.model, {
                xywh: bound.serialize(),
            });
        }
        checkWidthOverflow(width) {
            let wValid = true;
            const oldWidthStr = this._textContainer.style.width;
            this._textContainer.style.width = `${width}px`;
            if (this.childrenContainer.scrollWidth > this.childrenContainer.offsetWidth) {
                wValid = false;
            }
            this._textContainer.style.width = oldWidthStr;
            return wValid;
        }
        connectedCallback() {
            super.connectedCallback();
            this.disposables.add(this.model.propsUpdated.on(({ key }) => {
                this.updateComplete
                    .then(() => {
                    if (!this.host)
                        return;
                    const command = this.host.command;
                    const blockSelections = this.model.children.map(child => this.host.selection.create('block', {
                        blockId: child.id,
                    }));
                    if (key === 'fontStyle') {
                        command.exec('formatBlock', {
                            blockSelections,
                            styles: {
                                italic: null,
                            },
                        });
                    }
                    else if (key === 'color') {
                        command.exec('formatBlock', {
                            blockSelections,
                            styles: {
                                color: null,
                            },
                        });
                    }
                    else if (key === 'fontWeight') {
                        command.exec('formatBlock', {
                            blockSelections,
                            styles: {
                                bold: null,
                            },
                        });
                    }
                })
                    .catch(console.error);
            }));
        }
        firstUpdated(props) {
            super.firstUpdated(props);
            const { disposables, rootService } = this;
            const edgelessSelection = rootService.selection;
            disposables.add(edgelessSelection.slots.updated.on(() => {
                if (edgelessSelection.has(this.model.id) && edgelessSelection.editing) {
                    this._editing = true;
                }
                else {
                    this._editing = false;
                }
            }));
            this._resizeObserver.observe(this._textContainer);
            disposables.add(() => {
                this._resizeObserver.disconnect();
            });
            disposables.addFromEvent(this._textContainer, 'click', e => {
                if (!this._editing)
                    return;
                const containerRect = this._textContainer.getBoundingClientRect();
                const isTop = e.clientY < containerRect.top + containerRect.height / 2;
                let newParagraphId = null;
                if (isTop) {
                    const firstChild = this.model.firstChild();
                    if (!firstChild ||
                        !matchFlavours(firstChild, ['affine:list', 'affine:paragraph'])) {
                        newParagraphId = this.doc.addBlock('affine:paragraph', {}, this.model.id, 0);
                    }
                }
                else {
                    const lastChild = this.model.lastChild();
                    if (!lastChild ||
                        !matchFlavours(lastChild, ['affine:list', 'affine:paragraph'])) {
                        newParagraphId = this.doc.addBlock('affine:paragraph', {}, this.model.id);
                    }
                }
                if (newParagraphId) {
                    this.rootService.selectionManager.setGroup('note', [
                        this.rootService.selectionManager.create('text', {
                            from: {
                                blockId: newParagraphId,
                                index: 0,
                                length: 0,
                            },
                            to: null,
                        }),
                    ]);
                }
            });
            disposables.addFromEvent(this._textContainer, 'focusout', () => {
                if (!this._editing)
                    return;
                this.rootService.selectionManager.clear();
            });
            let composingWidth = EDGELESS_TEXT_BLOCK_MIN_WIDTH;
            disposables.addFromEvent(this, 'compositionupdate', () => {
                composingWidth = Math.max(this._textContainer.offsetWidth, EDGELESS_TEXT_BLOCK_MIN_HEIGHT);
            });
            disposables.addFromEvent(this, 'compositionend', () => {
                if (this.model.hasMaxWidth) {
                    composingWidth = EDGELESS_TEXT_BLOCK_MIN_WIDTH;
                    return;
                }
                // when IME finish container will crash to a small width, so
                // we set a max width to prevent this
                this._textContainer.style.width = `${composingWidth}px`;
                this.model.hasMaxWidth = true;
                requestAnimationFrame(() => {
                    this._textContainer.style.width = '';
                });
            });
        }
        getCSSTransform() {
            const viewport = this.gfx.viewport;
            const { translateX, translateY, zoom } = viewport;
            const bound = Bound.deserialize(this.model.xywh);
            const scaledX = bound.x * zoom;
            const scaledY = bound.y * zoom;
            const deltaX = scaledX - bound.x;
            const deltaY = scaledY - bound.y;
            return `translate(${translateX + deltaX}px, ${translateY + deltaY}px) scale(${zoom * this.model.scale})`;
        }
        getRenderingRect() {
            const { xywh, scale, rotate, hasMaxWidth } = this.model;
            const bound = Bound.deserialize(xywh);
            const w = hasMaxWidth ? bound.w / scale : undefined;
            return {
                x: bound.x,
                y: bound.y,
                w,
                h: bound.h / scale,
                rotate,
                zIndex: this.toZIndex(),
            };
        }
        renderGfxBlock() {
            const { model } = this;
            const { rotate, hasMaxWidth } = model;
            const editing = this._editing;
            const containerStyle = {
                transform: `rotate(${rotate}deg)`,
                transformOrigin: 'center',
                border: `1px solid ${editing ? 'var(--affine—primary—color, #1e96eb)' : 'transparent'}`,
                borderRadius: '4px',
                boxSizing: 'border-box',
                boxShadow: editing ? '0px 0px 0px 2px rgba(30, 150, 235, 0.3)' : 'none',
                fontWeight: '400',
                lineHeight: 'var(--affine-line-height)',
            };
            return html `
      <div
        class="edgeless-text-block-container"
        data-max-width="${hasMaxWidth}"
        style=${styleMap(containerStyle)}
      >
        <div
          style=${styleMap({
                pointerEvents: editing ? 'auto' : 'none',
                userSelect: editing ? 'auto' : 'none',
            })}
          contenteditable=${editing}
        >
          ${this.renderPageContent()}
        </div>
      </div>
    `;
        }
        renderPageContent() {
            const { fontFamily, fontStyle, fontWeight, textAlign } = this.model;
            const color = this.std
                .get(ThemeProvider)
                .generateColorProperty(this.model.color, '#000000');
            const style = styleMap({
                '--edgeless-text-color': color,
                '--edgeless-text-font-family': TextUtils.wrapFontFamily(fontFamily),
                '--edgeless-text-font-style': fontStyle,
                '--edgeless-text-font-weight': fontWeight,
                '--edgeless-text-text-align': textAlign,
                '--affine-list-margin': '0',
                '--affine-paragraph-margin': '0',
            });
            return html `
      <div style=${style} class="affine-block-children-container">
        ${this.renderChildren(this.model)}
      </div>
    `;
        }
        tryFocusEnd() {
            const paragraphOrLists = Array.from(this.querySelectorAll('affine-paragraph, affine-list'));
            const last = paragraphOrLists.at(-1);
            if (last) {
                this.host.selection.setGroup('note', [
                    this.host.selection.create('text', {
                        from: {
                            blockId: last.blockId,
                            index: last.model.text?.length ?? 0,
                            length: 0,
                        },
                        to: null,
                    }),
                ]);
            }
        }
        #_editing_accessor_storage;
        get _editing() { return this.#_editing_accessor_storage; }
        set _editing(value) { this.#_editing_accessor_storage = value; }
        #_textContainer_accessor_storage;
        get _textContainer() { return this.#_textContainer_accessor_storage; }
        set _textContainer(value) { this.#_textContainer_accessor_storage = value; }
        #childrenContainer_accessor_storage;
        get childrenContainer() { return this.#childrenContainer_accessor_storage; }
        set childrenContainer(value) { this.#childrenContainer_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._resizeObserver = new ResizeObserver(() => {
                if (this.doc.readonly) {
                    return;
                }
                if (!this.model.hasMaxWidth) {
                    this._updateW();
                }
                this._updateH();
            });
            this.#_editing_accessor_storage = __runInitializers(this, __editing_initializers, false);
            this.#_textContainer_accessor_storage = (__runInitializers(this, __editing_extraInitializers), __runInitializers(this, __textContainer_initializers, void 0));
            this.#childrenContainer_accessor_storage = (__runInitializers(this, __textContainer_extraInitializers), __runInitializers(this, _childrenContainer_initializers, void 0));
            __runInitializers(this, _childrenContainer_extraInitializers);
        }
    };
})();
export { EdgelessTextBlockComponent };
//# sourceMappingURL=edgeless-text-block.js.map