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
import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { focusTextModel, } from '@blocksuite/affine-components/rich-text';
import { BRACKET_PAIRS, NOTE_SELECTOR } from '@blocksuite/affine-shared/consts';
import { NotificationProvider } from '@blocksuite/affine-shared/services';
import { getViewportElement } from '@blocksuite/affine-shared/utils';
import { getInlineRangeProvider } from '@blocksuite/block-std';
import { IS_MAC } from '@blocksuite/global/env';
import { noop } from '@blocksuite/global/utils';
import { INLINE_ROOT_ATTR, } from '@blocksuite/inline';
import { Slice } from '@blocksuite/store';
import { computed, effect, signal } from '@preact/signals-core';
import { html, nothing } from 'lit';
import { query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { EdgelessRootBlockComponent } from '../root-block/edgeless/edgeless-root-block.js';
import { CodeClipboardController } from './clipboard/index.js';
import { CodeBlockInlineManagerExtension } from './code-block-inline.js';
import { codeBlockStyles } from './styles.js';
let CodeBlockComponent = (() => {
    let _classSuper = CaptionedBlockComponent;
    let __richTextElement_decorators;
    let __richTextElement_initializers = [];
    let __richTextElement_extraInitializers = [];
    return class CodeBlockComponent extends _classSuper {
        constructor() {
            super(...arguments);
            this._inlineRangeProvider = null;
            this.clipboardController = new CodeClipboardController(this);
            this.highlightTokens$ = signal([]);
            this.languageName$ = computed(() => {
                const lang = this.model.language$.value;
                if (lang === null) {
                    return 'Plain Text';
                }
                const matchedInfo = this.service.langs.find(info => info.id === lang);
                return matchedInfo ? matchedInfo.name : 'Plain Text';
            });
            this.#_richTextElement_accessor_storage = __runInitializers(this, __richTextElement_initializers, null);
            this.#blockContainerStyles_accessor_storage = (__runInitializers(this, __richTextElement_extraInitializers), {
                margin: '18px 0',
            });
            this.#useCaptionEditor_accessor_storage = true;
            this.#useZeroWidth_accessor_storage = true;
        }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __richTextElement_decorators = [query('rich-text')];
            __esDecorate(this, null, __richTextElement_decorators, { kind: "accessor", name: "_richTextElement", static: false, private: false, access: { has: obj => "_richTextElement" in obj, get: obj => obj._richTextElement, set: (obj, value) => { obj._richTextElement = value; } }, metadata: _metadata }, __richTextElement_initializers, __richTextElement_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = codeBlockStyles; }
        get inlineEditor() {
            const inlineRoot = this.querySelector(`[${INLINE_ROOT_ATTR}]`);
            return inlineRoot?.inlineEditor;
        }
        get inlineManager() {
            return this.std.get(CodeBlockInlineManagerExtension.identifier);
        }
        get notificationService() {
            return this.std.getOptional(NotificationProvider);
        }
        get readonly() {
            return this.doc.readonly;
        }
        get topContenteditableElement() {
            if (this.rootComponent instanceof EdgelessRootBlockComponent) {
                const el = this.closest(NOTE_SELECTOR);
                return el;
            }
            return this.rootComponent;
        }
        _updateHighlightTokens() {
            const modelLang = this.model.language$.value;
            if (modelLang === null) {
                this.highlightTokens$.value = [];
                return;
            }
            const matchedInfo = this.service.langs.find(info => info.id === modelLang ||
                info.name === modelLang ||
                info.aliases?.includes(modelLang));
            if (matchedInfo) {
                this.model.language$.value = matchedInfo.id;
                const langImport = matchedInfo.import;
                const lang = matchedInfo.id;
                const highlighter = this.service.highlighter$.value;
                const theme = this.service.themeKey;
                if (!theme || !highlighter) {
                    this.highlightTokens$.value = [];
                    return;
                }
                noop(this.model.text.deltas$.value);
                const code = this.model.text.toString();
                const loadedLanguages = highlighter.getLoadedLanguages();
                if (!loadedLanguages.includes(lang)) {
                    highlighter
                        .loadLanguage(langImport)
                        .then(() => {
                        this.highlightTokens$.value = highlighter.codeToTokensBase(code, {
                            lang,
                            theme,
                        });
                    })
                        .catch(console.error);
                }
                else {
                    this.highlightTokens$.value = highlighter.codeToTokensBase(code, {
                        lang,
                        theme,
                    });
                }
            }
            else {
                this.highlightTokens$.value = [];
                // clear language if not found
                this.model.language$.value = null;
            }
        }
        connectedCallback() {
            super.connectedCallback();
            // set highlight options getter used by "exportToHtml"
            this.clipboardController.hostConnected();
            this.disposables.add(effect(() => {
                this._updateHighlightTokens();
            }));
            this.disposables.add(effect(() => {
                noop(this.highlightTokens$.value);
                this._richTextElement?.inlineEditor?.render();
            }));
            const selectionManager = this.host.selection;
            const INDENT_SYMBOL = '  ';
            const LINE_BREAK_SYMBOL = '\n';
            const allIndexOf = (text, symbol, start = 0, end = text.length) => {
                const indexArr = [];
                let i = start;
                while (i < end) {
                    const index = text.indexOf(symbol, i);
                    if (index === -1 || index > end) {
                        break;
                    }
                    indexArr.push(index);
                    i = index + 1;
                }
                return indexArr;
            };
            // TODO: move to service for better performance
            this.bindHotKey({
                Backspace: ctx => {
                    const state = ctx.get('keyboardState');
                    const textSelection = selectionManager.find('text');
                    if (!textSelection) {
                        state.raw.preventDefault();
                        return;
                    }
                    const from = textSelection.from;
                    if (from.index === 0 && from.length === 0) {
                        state.raw.preventDefault();
                        selectionManager.setGroup('note', [
                            selectionManager.create('block', { blockId: this.blockId }),
                        ]);
                        return true;
                    }
                    const inlineEditor = this.inlineEditor;
                    const inlineRange = inlineEditor?.getInlineRange();
                    if (!inlineRange || !inlineEditor)
                        return;
                    const left = inlineEditor.yText.toString()[inlineRange.index - 1];
                    const right = inlineEditor.yText.toString()[inlineRange.index];
                    const leftBrackets = BRACKET_PAIRS.map(pair => pair.left);
                    if (BRACKET_PAIRS[leftBrackets.indexOf(left)]?.right === right) {
                        const index = inlineRange.index - 1;
                        inlineEditor.deleteText({
                            index: index,
                            length: 2,
                        });
                        inlineEditor.setInlineRange({
                            index: index,
                            length: 0,
                        });
                        state.raw.preventDefault();
                        return true;
                    }
                    return;
                },
                Tab: ctx => {
                    if (this.doc.readonly)
                        return;
                    const state = ctx.get('keyboardState');
                    const event = state.raw;
                    const inlineEditor = this.inlineEditor;
                    if (!inlineEditor)
                        return;
                    const inlineRange = inlineEditor.getInlineRange();
                    if (inlineRange) {
                        event.stopPropagation();
                        event.preventDefault();
                        const text = this.inlineEditor.yText.toString();
                        const index = text.lastIndexOf(LINE_BREAK_SYMBOL, inlineRange.index - 1);
                        const indexArr = allIndexOf(text, LINE_BREAK_SYMBOL, inlineRange.index, inlineRange.index + inlineRange.length)
                            .map(i => i + 1)
                            .reverse();
                        if (index !== -1) {
                            indexArr.push(index + 1);
                        }
                        else {
                            indexArr.push(0);
                        }
                        indexArr.forEach(i => {
                            if (!this.inlineEditor)
                                return;
                            this.inlineEditor.insertText({
                                index: i,
                                length: 0,
                            }, INDENT_SYMBOL);
                        });
                        this.inlineEditor.setInlineRange({
                            index: inlineRange.index + 2,
                            length: inlineRange.length + (indexArr.length - 1) * INDENT_SYMBOL.length,
                        });
                        return true;
                    }
                    return;
                },
                'Shift-Tab': ctx => {
                    const state = ctx.get('keyboardState');
                    const event = state.raw;
                    const inlineEditor = this.inlineEditor;
                    if (!inlineEditor)
                        return;
                    const inlineRange = inlineEditor.getInlineRange();
                    if (inlineRange) {
                        event.stopPropagation();
                        event.preventDefault();
                        const text = this.inlineEditor.yText.toString();
                        const index = text.lastIndexOf(LINE_BREAK_SYMBOL, inlineRange.index - 1);
                        let indexArr = allIndexOf(text, LINE_BREAK_SYMBOL, inlineRange.index, inlineRange.index + inlineRange.length)
                            .map(i => i + 1)
                            .reverse();
                        if (index !== -1) {
                            indexArr.push(index + 1);
                        }
                        else {
                            indexArr.push(0);
                        }
                        indexArr = indexArr.filter(i => text.slice(i, i + 2) === INDENT_SYMBOL);
                        indexArr.forEach(i => {
                            if (!this.inlineEditor)
                                return;
                            this.inlineEditor.deleteText({
                                index: i,
                                length: 2,
                            });
                        });
                        if (indexArr.length > 0) {
                            this.inlineEditor.setInlineRange({
                                index: inlineRange.index -
                                    (indexArr[indexArr.length - 1] < inlineRange.index ? 2 : 0),
                                length: inlineRange.length -
                                    (indexArr.length - 1) * INDENT_SYMBOL.length,
                            });
                        }
                        return true;
                    }
                    return;
                },
                'Control-d': () => {
                    if (!IS_MAC)
                        return;
                    return true;
                },
                Delete: () => {
                    return true;
                },
                Enter: () => {
                    this.doc.captureSync();
                    return true;
                },
                'Mod-Enter': () => {
                    const { model, std } = this;
                    if (!model || !std)
                        return;
                    const inlineEditor = this.inlineEditor;
                    const inlineRange = inlineEditor?.getInlineRange();
                    if (!inlineRange || !inlineEditor)
                        return;
                    const isEnd = model.text.length === inlineRange.index;
                    if (!isEnd)
                        return;
                    const parent = this.doc.getParent(model);
                    if (!parent)
                        return;
                    const index = parent.children.indexOf(model);
                    if (index === -1)
                        return;
                    const id = this.doc.addBlock('affine:paragraph', {}, parent, index + 1);
                    focusTextModel(std, id);
                    return true;
                },
            });
            this._inlineRangeProvider = getInlineRangeProvider(this);
        }
        copyCode() {
            const model = this.model;
            const slice = Slice.fromModels(model.doc, [model]);
            this.std.clipboard
                .copySlice(slice)
                .then(() => {
                this.notificationService?.toast('Copied to clipboard');
            })
                .catch(e => {
                this.notificationService?.toast('Copied failed, something went wrong');
                console.error(e);
            });
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.clipboardController.hostDisconnected();
        }
        async getUpdateComplete() {
            const result = await super.getUpdateComplete();
            await this._richTextElement?.updateComplete;
            return result;
        }
        renderBlock() {
            const showLineNumbers = this.std.getConfig('affine:code')?.showLineNumbers ?? true;
            return html `
      <div
        class=${classMap({
                'affine-code-block-container': true,
                wrap: this.model.wrap,
            })}
      >
        <rich-text
          .yText=${this.model.text.yText}
          .inlineEventSource=${this.topContenteditableElement ?? nothing}
          .undoManager=${this.doc.history}
          .attributesSchema=${this.inlineManager.getSchema()}
          .attributeRenderer=${this.inlineManager.getRenderer()}
          .readonly=${this.doc.readonly}
          .inlineRangeProvider=${this._inlineRangeProvider}
          .enableClipboard=${false}
          .enableUndoRedo=${false}
          .wrapText=${this.model.wrap}
          .verticalScrollContainerGetter=${() => getViewportElement(this.host)}
          .vLineRenderer=${showLineNumbers
                ? (vLine) => {
                    return html `
                  <span contenteditable="false" class="line-number"
                    >${vLine.index + 1}</span
                  >
                  ${vLine.renderVElements()}
                `;
                }
                : undefined}
        >
        </rich-text>

        ${this.renderChildren(this.model)} ${Object.values(this.widgets)}
      </div>
    `;
        }
        setWrap(wrap) {
            this.doc.updateBlock(this.model, { wrap });
        }
        #_richTextElement_accessor_storage;
        get _richTextElement() { return this.#_richTextElement_accessor_storage; }
        set _richTextElement(value) { this.#_richTextElement_accessor_storage = value; }
        #blockContainerStyles_accessor_storage;
        get blockContainerStyles() { return this.#blockContainerStyles_accessor_storage; }
        set blockContainerStyles(value) { this.#blockContainerStyles_accessor_storage = value; }
        #useCaptionEditor_accessor_storage;
        get useCaptionEditor() { return this.#useCaptionEditor_accessor_storage; }
        set useCaptionEditor(value) { this.#useCaptionEditor_accessor_storage = value; }
        #useZeroWidth_accessor_storage;
        get useZeroWidth() { return this.#useZeroWidth_accessor_storage; }
        set useZeroWidth(value) { this.#useZeroWidth_accessor_storage = value; }
    };
})();
export { CodeBlockComponent };
//# sourceMappingURL=code-block.js.map