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
import { ShadowlessElement } from '@blocksuite/block-std';
import { WithDisposable } from '@blocksuite/global/utils';
import { css, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ImageResizeManager } from '../image-resize-manager.js';
import { shouldResizeImage } from '../utils.js';
import { ImageSelectedRect } from './image-selected-rect.js';
let ImageBlockPageComponent = (() => {
    let _classSuper = WithDisposable(ShadowlessElement);
    let __isSelected_decorators;
    let __isSelected_initializers = [];
    let __isSelected_extraInitializers = [];
    let _block_decorators;
    let _block_initializers = [];
    let _block_extraInitializers = [];
    let _resizeImg_decorators;
    let _resizeImg_initializers = [];
    let _resizeImg_extraInitializers = [];
    return class ImageBlockPageComponent extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __isSelected_decorators = [state()];
            _block_decorators = [property({ attribute: false })];
            _resizeImg_decorators = [query('.resizable-img')];
            __esDecorate(this, null, __isSelected_decorators, { kind: "accessor", name: "_isSelected", static: false, private: false, access: { has: obj => "_isSelected" in obj, get: obj => obj._isSelected, set: (obj, value) => { obj._isSelected = value; } }, metadata: _metadata }, __isSelected_initializers, __isSelected_extraInitializers);
            __esDecorate(this, null, _block_decorators, { kind: "accessor", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
            __esDecorate(this, null, _resizeImg_decorators, { kind: "accessor", name: "resizeImg", static: false, private: false, access: { has: obj => "resizeImg" in obj, get: obj => obj.resizeImg, set: (obj, value) => { obj.resizeImg = value; } }, metadata: _metadata }, _resizeImg_initializers, _resizeImg_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    affine-page-image {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 0;
      cursor: pointer;
    }

    affine-page-image .resizable-img {
      position: relative;
      max-width: 100%;
    }

    affine-page-image .resizable-img img {
      width: 100%;
      height: 100%;
    }
  `; }
        get _doc() {
            return this.block.doc;
        }
        get _host() {
            return this.block.host;
        }
        get _model() {
            return this.block.model;
        }
        _bindKeyMap() {
            const selection = this._host.selection;
            const addParagraph = (ctx) => {
                const parent = this._doc.getParent(this._model);
                if (!parent)
                    return;
                const index = parent.children.indexOf(this._model);
                const blockId = this._doc.addBlock('affine:paragraph', {}, parent, index + 1);
                const event = ctx.get('defaultState').event;
                event.preventDefault();
                selection.update(selList => selList
                    .filter(sel => !sel.is('image'))
                    .concat(selection.create('text', {
                    from: {
                        blockId,
                        index: 0,
                        length: 0,
                    },
                    to: null,
                })));
            };
            this.block.bindHotKey({
                Escape: () => {
                    selection.update(selList => {
                        return selList.map(sel => {
                            const current = sel.is('image') && sel.blockId === this.block.blockId;
                            if (current) {
                                return selection.create('block', { blockId: this.block.blockId });
                            }
                            return sel;
                        });
                    });
                    return true;
                },
                Delete: ctx => {
                    if (this._host.doc.readonly || !this._isSelected)
                        return;
                    addParagraph(ctx);
                    this._doc.deleteBlock(this._model);
                    return true;
                },
                Backspace: ctx => {
                    if (this._host.doc.readonly || !this._isSelected)
                        return;
                    addParagraph(ctx);
                    this._doc.deleteBlock(this._model);
                    return true;
                },
                Enter: ctx => {
                    if (this._host.doc.readonly || !this._isSelected)
                        return;
                    addParagraph(ctx);
                    return true;
                },
                ArrowDown: ctx => {
                    const std = this._host.std;
                    // If the selection is not image selection, we should not handle it.
                    // eslint-disable-next-line unicorn/prefer-array-some
                    if (!std.selection.find('image')) {
                        return false;
                    }
                    const event = ctx.get('keyboardState');
                    event.raw.preventDefault();
                    std.command
                        .chain()
                        .getNextBlock({ path: this.block.blockId })
                        .inline((ctx, next) => {
                        const { nextBlock } = ctx;
                        if (!nextBlock)
                            return;
                        return next({ focusBlock: nextBlock });
                    })
                        .focusBlockStart()
                        .run();
                    return true;
                },
                ArrowUp: ctx => {
                    const std = this._host.std;
                    // If the selection is not image selection, we should not handle it.
                    // eslint-disable-next-line unicorn/prefer-array-some
                    if (!std.selection.find('image')) {
                        return false;
                    }
                    const event = ctx.get('keyboardState');
                    event.raw.preventDefault();
                    std.command
                        .chain()
                        .getPrevBlock({ path: this.block.blockId })
                        .inline((ctx, next) => {
                        const { prevBlock } = ctx;
                        if (!prevBlock)
                            return;
                        return next({ focusBlock: prevBlock });
                    })
                        .focusBlockEnd()
                        .run();
                    return true;
                },
            });
        }
        _handleError() {
            this.block.error = true;
        }
        _handleSelection() {
            const selection = this._host.selection;
            this._disposables.add(selection.slots.changed.on(selList => {
                this._isSelected = selList.some(sel => sel.blockId === this.block.blockId && sel.is('image'));
            }));
            this._disposables.add(this._model.propsUpdated.on(() => {
                this.requestUpdate();
            }));
            this._disposables.addFromEvent(this.resizeImg, 'click', (event) => {
                // the peek view need handle shift + click
                if (event.shiftKey)
                    return;
                event.stopPropagation();
                selection.update(selList => {
                    return selList
                        .filter(sel => !['block', 'image', 'text'].includes(sel.type))
                        .concat(selection.create('image', { blockId: this.block.blockId }));
                });
                return true;
            });
            this.block.handleEvent('click', () => {
                if (!this._isSelected)
                    return;
                selection.update(selList => selList.filter(sel => !(sel.is('image') && sel.blockId === this.block.blockId)));
            }, {
                global: true,
            });
        }
        _normalizeImageSize() {
            // If is dragging, we should use the real size of the image
            if (this._isDragging && this.resizeImg) {
                return {
                    width: this.resizeImg.style.width,
                };
            }
            const { width, height } = this._model;
            if (!width || !height) {
                return {
                    width: 'unset',
                    height: 'unset',
                };
            }
            return {
                width: `${width}px`,
            };
        }
        _observeDrag() {
            const imageResizeManager = new ImageResizeManager();
            this._disposables.add(this._host.event.add('dragStart', ctx => {
                const pointerState = ctx.get('pointerState');
                const target = pointerState.event.target;
                if (shouldResizeImage(this, target)) {
                    this._isDragging = true;
                    imageResizeManager.onStart(pointerState);
                    return true;
                }
                return false;
            }));
            this._disposables.add(this._host.event.add('dragMove', ctx => {
                const pointerState = ctx.get('pointerState');
                if (this._isDragging) {
                    imageResizeManager.onMove(pointerState);
                    return true;
                }
                return false;
            }));
            this._disposables.add(this._host.event.add('dragEnd', () => {
                if (this._isDragging) {
                    this._isDragging = false;
                    imageResizeManager.onEnd();
                    return true;
                }
                return false;
            }));
        }
        connectedCallback() {
            super.connectedCallback();
            this._bindKeyMap();
            this._observeDrag();
        }
        firstUpdated(changedProperties) {
            super.firstUpdated(changedProperties);
            this._handleSelection();
            // The embed block can not be focused,
            // so the active element will be the last activated element.
            // If the active element is the title textarea,
            // any event will dispatch from it and be ignored. (Most events will ignore title)
            // so we need to blur it.
            // See also https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
            this.addEventListener('click', () => {
                if (document.activeElement &&
                    document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
            });
        }
        render() {
            const imageSize = this._normalizeImageSize();
            const imageSelectedRect = this._isSelected
                ? ImageSelectedRect(this._doc.readonly)
                : null;
            return html `
      <div class="resizable-img" style=${styleMap(imageSize)}>
        <img
          class="drag-target"
          src=${this.block.blobUrl ?? ''}
          draggable="false"
          @error=${this._handleError}
          loading="lazy"
        />

        ${imageSelectedRect}
      </div>
    `;
        }
        #_isSelected_accessor_storage;
        get _isSelected() { return this.#_isSelected_accessor_storage; }
        set _isSelected(value) { this.#_isSelected_accessor_storage = value; }
        #block_accessor_storage;
        get block() { return this.#block_accessor_storage; }
        set block(value) { this.#block_accessor_storage = value; }
        #resizeImg_accessor_storage;
        get resizeImg() { return this.#resizeImg_accessor_storage; }
        set resizeImg(value) { this.#resizeImg_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._isDragging = false;
            this.#_isSelected_accessor_storage = __runInitializers(this, __isSelected_initializers, false);
            this.#block_accessor_storage = (__runInitializers(this, __isSelected_extraInitializers), __runInitializers(this, _block_initializers, void 0));
            this.#resizeImg_accessor_storage = (__runInitializers(this, _block_extraInitializers), __runInitializers(this, _resizeImg_initializers, void 0));
            __runInitializers(this, _resizeImg_extraInitializers);
        }
    };
})();
export { ImageBlockPageComponent };
//# sourceMappingURL=page-image-block.js.map