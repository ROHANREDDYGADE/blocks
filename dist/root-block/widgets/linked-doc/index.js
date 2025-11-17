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
import { getInlineEditorByModel } from '@blocksuite/affine-components/rich-text';
import { getViewportElement, matchFlavours, } from '@blocksuite/affine-shared/utils';
import { WidgetComponent } from '@blocksuite/block-std';
import { IS_MOBILE } from '@blocksuite/global/env';
import { InlineEditor } from '@blocksuite/inline';
import { signal } from '@preact/signals-core';
import { html, nothing } from 'lit';
import { state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { getMenus, } from './config.js';
import { linkedDocWidgetStyles } from './styles.js';
export {} from './config.js';
export const AFFINE_LINKED_DOC_WIDGET = 'affine-linked-doc-widget';
let AffineLinkedDocWidget = (() => {
    let _classSuper = WidgetComponent;
    let __inputRects_decorators;
    let __inputRects_initializers = [];
    let __inputRects_extraInitializers = [];
    let __triggerKey_decorators;
    let __triggerKey_initializers = [];
    let __triggerKey_extraInitializers = [];
    return class AffineLinkedDocWidget extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __inputRects_decorators = [state()];
            __triggerKey_decorators = [state()];
            __esDecorate(this, null, __inputRects_decorators, { kind: "accessor", name: "_inputRects", static: false, private: false, access: { has: obj => "_inputRects" in obj, get: obj => obj._inputRects, set: (obj, value) => { obj._inputRects = value; } }, metadata: _metadata }, __inputRects_initializers, __inputRects_extraInitializers);
            __esDecorate(this, null, __triggerKey_decorators, { kind: "accessor", name: "_triggerKey", static: false, private: false, access: { has: obj => "_triggerKey" in obj, get: obj => obj._triggerKey, set: (obj, value) => { obj._triggerKey = value; } }, metadata: _metadata }, __triggerKey_initializers, __triggerKey_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = linkedDocWidgetStyles; }
        get _context() {
            return {
                std: this.std,
                inlineEditor: this._inlineEditor,
                startRange: this._startRange,
                triggerKey: this._triggerKey,
                config: this.config,
                close: this.close,
            };
        }
        get config() {
            return {
                triggerKeys: ['@', '[[', '【【'],
                ignoreBlockTypes: ['affine:code'],
                convertTriggerKey: true,
                getMenus,
                mobile: {
                    useScreenHeight: false,
                    scrollContainer: getViewportElement(this.std.host) ?? window,
                    scrollTopOffset: 46,
                },
                ...this.std.getConfig('affine:page')?.linkedWidget,
            };
        }
        _handleInput(isCompositionEnd) {
            const primaryTriggerKey = this.config.triggerKeys[0];
            const inlineEditor = this._inlineEditor;
            if (!inlineEditor)
                return;
            const inlineRangeApplyCallback = (callback) => {
                // the inline ranged updated in compositionEnd event before this event callback
                if (isCompositionEnd)
                    callback();
                else
                    inlineEditor.slots.inlineRangeSync.once(callback);
            };
            inlineRangeApplyCallback(() => {
                const inlineRange = inlineEditor.getInlineRange();
                if (!inlineRange)
                    return;
                const textPoint = inlineEditor.getTextPoint(inlineRange.index);
                if (!textPoint)
                    return;
                const [leafStart, offsetStart] = textPoint;
                const text = leafStart.textContent
                    ? leafStart.textContent.slice(0, offsetStart)
                    : '';
                const matchedKey = this.config.triggerKeys.find(triggerKey => text.endsWith(triggerKey));
                if (!matchedKey)
                    return;
                if (this.config.convertTriggerKey && primaryTriggerKey !== matchedKey) {
                    const inlineRange = inlineEditor.getInlineRange();
                    if (!inlineRange)
                        return;
                    // Convert to the primary trigger key
                    // e.g. [[ -> @
                    this._triggerKey = primaryTriggerKey;
                    const startIdxBeforeMatchKey = inlineRange.index - matchedKey.length;
                    inlineEditor.deleteText({
                        index: startIdxBeforeMatchKey,
                        length: matchedKey.length,
                    });
                    inlineEditor.insertText({ index: startIdxBeforeMatchKey, length: 0 }, primaryTriggerKey);
                    inlineEditor.setInlineRange({
                        index: startIdxBeforeMatchKey + primaryTriggerKey.length,
                        length: 0,
                    });
                    inlineEditor.slots.inlineRangeSync.once(() => {
                        this.show(IS_MOBILE ? 'mobile' : 'desktop');
                    });
                    return;
                }
                else {
                    this._triggerKey = matchedKey;
                    this.show(IS_MOBILE ? 'mobile' : 'desktop');
                }
            });
        }
        _renderInputMask() {
            return html `${repeat(this._inputRects, ({ top, left, width, height }, index) => {
                const last = index === this._inputRects.length - 1;
                const padding = 2;
                return html `<div
          class="input-mask"
          style=${styleMap({
                    top: `${top - padding}px`,
                    left: `${left}px`,
                    width: `${width + (last ? 10 : 0)}px`,
                    height: `${height + 2 * padding}px`,
                })}
        ></div>`;
            })}`;
        }
        connectedCallback() {
            super.connectedCallback();
            this.handleEvent('keyDown', this._onKeyDown);
            this.handleEvent('compositionEnd', this._onCompositionEnd);
        }
        render() {
            if (this._show$.value === 'none')
                return nothing;
            return html `${this._renderInputMask()}
      <blocksuite-portal
        .shadowDom=${false}
        .template=${choose(this._show$.value, [
                ['desktop', this._renderLinkedDocPopover],
                ['mobile', this._renderLinkedDocMenu],
            ], () => html `${nothing}`)}
      ></blocksuite-portal>`;
        }
        #_inputRects_accessor_storage;
        get _inputRects() { return this.#_inputRects_accessor_storage; }
        set _inputRects(value) { this.#_inputRects_accessor_storage = value; }
        #_triggerKey_accessor_storage;
        get _triggerKey() { return this.#_triggerKey_accessor_storage; }
        set _triggerKey(value) { this.#_triggerKey_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._disposeObserveInputRects = null;
            this._getInlineEditor = (evt) => {
                if (evt && evt.target instanceof HTMLElement) {
                    const editor = evt.target.closest('.can-link-doc > .inline-editor')?.inlineEditor;
                    if (editor instanceof InlineEditor) {
                        return editor;
                    }
                }
                const text = this.host.selection.value.find(selection => selection.is('text'));
                if (!text)
                    return null;
                const model = this.host.doc.getBlockById(text.blockId);
                if (!model)
                    return null;
                if (matchFlavours(model, this.config.ignoreBlockTypes)) {
                    return null;
                }
                return getInlineEditorByModel(this.host, model);
            };
            this._inlineEditor = null;
            this._observeInputRects = () => {
                if (!this._inlineEditor)
                    return;
                const updateInputRects = () => {
                    const blockId = this.std.command.exec('getSelectedModels').selectedModels?.[0]?.id;
                    if (!blockId)
                        return;
                    if (!this._startRange)
                        return;
                    const index = this._startRange.index - this._triggerKey.length;
                    if (index < 0)
                        return;
                    const currentRange = this._inlineEditor?.getInlineRange();
                    if (!currentRange)
                        return;
                    const length = currentRange.index + currentRange.length - index;
                    const textSelection = this.std.selection.create('text', {
                        from: { blockId, index, length },
                        to: null,
                    });
                    const { selectionRects } = this.std.command.exec('getSelectionRects', {
                        textSelection,
                    });
                    if (!selectionRects)
                        return;
                    this._inputRects = selectionRects;
                };
                updateInputRects();
                this._disposeObserveInputRects =
                    this._inlineEditor.slots.renderComplete.on(updateInputRects);
            };
            this._onCompositionEnd = (ctx) => {
                const event = ctx.get('defaultState').event;
                const key = event.data;
                if (!key ||
                    !this.config.triggerKeys.some(triggerKey => triggerKey.includes(key)))
                    return;
                this._inlineEditor = this._getInlineEditor(event);
                if (!this._inlineEditor)
                    return;
                this._handleInput(true);
            };
            this._onKeyDown = (ctx) => {
                const eventState = ctx.get('keyboardState');
                const event = eventState.raw;
                const key = event.key;
                if (key === undefined || // in mac os, the key may be undefined
                    key === 'Process' ||
                    event.isComposing)
                    return;
                if (!this.config.triggerKeys.some(triggerKey => triggerKey.includes(key)))
                    return;
                this._inlineEditor = this._getInlineEditor(event);
                if (!this._inlineEditor)
                    return;
                const inlineRange = this._inlineEditor.getInlineRange();
                if (!inlineRange)
                    return;
                if (inlineRange.length > 0) {
                    // When select text and press `[[` should not trigger transform,
                    // since it will break the bracket complete.
                    // Expected `[[selected text]]` instead of `@selected text]]`
                    return;
                }
                this._handleInput(false);
            };
            this._renderLinkedDocMenu = () => {
                if (!this.block.rootComponent)
                    return nothing;
                return html `<affine-mobile-linked-doc-menu
      .context=${this._context}
      .rootComponent=${this.block.rootComponent}
    ></affine-mobile-linked-doc-menu>`;
            };
            this._renderLinkedDocPopover = () => {
                return html `<affine-linked-doc-popover
      .context=${this._context}
    ></affine-linked-doc-popover>`;
            };
            this._show$ = signal('none');
            this._startRange = null;
            this.close = () => {
                this._disposeObserveInputRects?.dispose();
                this._disposeObserveInputRects = null;
                this._inlineEditor = null;
                this._triggerKey = '';
                this._show$.value = 'none';
                this._startRange = null;
            };
            this.show = (mode = 'desktop') => {
                if (this._inlineEditor === null) {
                    this._inlineEditor = this._getInlineEditor();
                }
                if (this._triggerKey === '') {
                    this._triggerKey = this.config.triggerKeys[0];
                }
                this._startRange = this._inlineEditor?.getInlineRange() ?? null;
                const enableMobile = this.doc.awarenessStore.getFlag('enable_mobile_linked_doc_menu');
                this._observeInputRects();
                this._show$.value = enableMobile ? mode : 'desktop';
            };
            this.#_inputRects_accessor_storage = __runInitializers(this, __inputRects_initializers, []);
            this.#_triggerKey_accessor_storage = (__runInitializers(this, __inputRects_extraInitializers), __runInitializers(this, __triggerKey_initializers, ''));
            __runInitializers(this, __triggerKey_extraInitializers);
        }
    };
})();
export { AffineLinkedDocWidget };
//# sourceMappingURL=index.js.map