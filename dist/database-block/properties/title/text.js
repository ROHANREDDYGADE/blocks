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
import { DefaultInlineManagerExtension, } from '@blocksuite/affine-components/rich-text';
import { ParseDocUrlProvider } from '@blocksuite/affine-shared/services';
import { getViewportElement, isValidUrl, } from '@blocksuite/affine-shared/utils';
import { BaseCellRenderer } from '@blocksuite/data-view';
import { IS_MAC } from '@blocksuite/global/env';
import { assertExists } from '@blocksuite/global/utils';
import { LinkedPageIcon } from '@blocksuite/icons/lit';
import { computed, effect, signal } from '@preact/signals-core';
import { css } from 'lit';
import { property, query } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';
import { ClipboardAdapter } from '../../../root-block/clipboard/adapter.js';
import { HostContextKey } from '../../context/host-context.js';
import { getSingleDocIdFromText } from '../../utils/title-doc.js';
const styles = css `
  data-view-header-area-text {
    width: 100%;
    display: flex;
  }

  data-view-header-area-text rich-text {
    pointer-events: none;
    user-select: none;
  }

  data-view-header-area-text-editing {
    width: 100%;
    display: flex;
    cursor: text;
  }

  .data-view-header-area-rich-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    outline: none;
    word-break: break-all;
    font-size: var(--data-view-cell-text-size);
    line-height: var(--data-view-cell-text-line-height);
  }

  .data-view-header-area-rich-text v-line {
    display: flex !important;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .data-view-header-area-rich-text v-line > div {
    flex-grow: 1;
  }

  .data-view-header-area-icon {
    height: max-content;
    display: flex;
    align-items: center;
    margin-right: 8px;
    padding: 2px;
    border-radius: 4px;
    margin-top: 2px;
    background-color: var(--affine-background-secondary-color);
  }

  .data-view-header-area-icon svg {
    width: 14px;
    height: 14px;
    fill: var(--affine-icon-color);
    color: var(--affine-icon-color);
  }
`;
let BaseTextCell = (() => {
    let _classSuper = BaseCellRenderer;
    let _richText_decorators;
    let _richText_initializers = [];
    let _richText_extraInitializers = [];
    let _showIcon_decorators;
    let _showIcon_initializers = [];
    let _showIcon_extraInitializers = [];
    return class BaseTextCell extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _richText_decorators = [query('rich-text')];
            _showIcon_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _richText_decorators, { kind: "accessor", name: "richText", static: false, private: false, access: { has: obj => "richText" in obj, get: obj => obj.richText, set: (obj, value) => { obj.richText = value; } }, metadata: _metadata }, _richText_initializers, _richText_extraInitializers);
            __esDecorate(this, null, _showIcon_decorators, { kind: "accessor", name: "showIcon", static: false, private: false, access: { has: obj => "showIcon" in obj, get: obj => obj.showIcon, set: (obj, value) => { obj.showIcon = value; } }, metadata: _metadata }, _showIcon_initializers, _showIcon_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = styles; }
        get attributeRenderer() {
            return this.inlineManager?.getRenderer();
        }
        get attributesSchema() {
            return this.inlineManager?.getSchema();
        }
        get host() {
            return this.view.contextGet(HostContextKey);
        }
        get inlineEditor() {
            return this.richText.inlineEditor;
        }
        get inlineManager() {
            return this.host?.std.get(DefaultInlineManagerExtension.identifier);
        }
        get service() {
            return this.host?.std.getService('affine:database');
        }
        get topContenteditableElement() {
            const databaseBlock = this.closest('affine-database');
            return databaseBlock?.topContenteditableElement;
        }
        connectedCallback() {
            super.connectedCallback();
            const yText = this.value?.yText;
            if (yText) {
                const cb = () => {
                    const id = getSingleDocIdFromText(this.value);
                    this.docId$.value = id;
                };
                cb();
                if (this.activity) {
                    yText.observe(cb);
                    this.disposables.add(() => {
                        yText.unobserve(cb);
                    });
                }
            }
        }
        render() {
            return html `${this.renderIcon()}${this.renderBlockText()}`;
        }
        renderIcon() {
            if (this.docId$.value) {
                return html ` <div class="data-view-header-area-icon">
        ${LinkedPageIcon()}
      </div>`;
            }
            if (!this.showIcon) {
                return;
            }
            const iconColumn = this.view.mainProperties$.value.iconColumn;
            if (!iconColumn)
                return;
            const icon = this.view.cellValueGet(this.cell.rowId, iconColumn);
            if (!icon)
                return;
            return html ` <div class="data-view-header-area-icon">${icon}</div>`;
        }
        #richText_accessor_storage;
        get richText() { return this.#richText_accessor_storage; }
        set richText(value) { this.#richText_accessor_storage = value; }
        #showIcon_accessor_storage;
        get showIcon() { return this.#showIcon_accessor_storage; }
        set showIcon(value) { this.#showIcon_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this.activity = true;
            this.docId$ = signal();
            this.isLinkedDoc$ = computed(() => false);
            this.linkedDocTitle$ = computed(() => {
                if (!this.docId$.value) {
                    return this.value;
                }
                const doc = this.host?.std.collection.getDoc(this.docId$.value);
                const root = doc?.root;
                return root.title;
            });
            this.#richText_accessor_storage = __runInitializers(this, _richText_initializers, void 0);
            this.#showIcon_accessor_storage = (__runInitializers(this, _richText_extraInitializers), __runInitializers(this, _showIcon_initializers, false));
            __runInitializers(this, _showIcon_extraInitializers);
        }
    };
})();
export class HeaderAreaTextCell extends BaseTextCell {
    renderBlockText() {
        return html ` <rich-text
      .yText="${this.value}"
      .attributesSchema="${this.attributesSchema}"
      .attributeRenderer="${this.attributeRenderer}"
      .embedChecker="${this.inlineManager?.embedChecker}"
      .markdownShortcutHandler="${this.inlineManager?.markdownShortcutHandler}"
      .readonly="${true}"
      class="data-view-header-area-rich-text"
    ></rich-text>`;
    }
    renderLinkedDoc() {
        return html ` <rich-text
      .yText="${this.linkedDocTitle$.value}"
      .readonly="${true}"
      class="data-view-header-area-rich-text"
    ></rich-text>`;
    }
}
export class HeaderAreaTextCellEditing extends BaseTextCell {
    constructor() {
        super(...arguments);
        this._onCopy = (e) => {
            const inlineEditor = this.inlineEditor;
            assertExists(inlineEditor);
            const inlineRange = inlineEditor.getInlineRange();
            if (!inlineRange)
                return;
            const text = inlineEditor.yTextString.slice(inlineRange.index, inlineRange.index + inlineRange.length);
            e.clipboardData?.setData('text/plain', text);
            e.preventDefault();
            e.stopPropagation();
        };
        this._onCut = (e) => {
            const inlineEditor = this.inlineEditor;
            assertExists(inlineEditor);
            const inlineRange = inlineEditor.getInlineRange();
            if (!inlineRange)
                return;
            const text = inlineEditor.yTextString.slice(inlineRange.index, inlineRange.index + inlineRange.length);
            inlineEditor.deleteText(inlineRange);
            inlineEditor.setInlineRange({
                index: inlineRange.index,
                length: 0,
            });
            e.clipboardData?.setData('text/plain', text);
            e.preventDefault();
            e.stopPropagation();
        };
        this._onPaste = (e) => {
            const inlineEditor = this.inlineEditor;
            const inlineRange = inlineEditor?.getInlineRange();
            if (!inlineRange)
                return;
            if (e.clipboardData) {
                try {
                    const getDeltas = (snapshot) => {
                        // @ts-ignore
                        const text = snapshot.props?.text?.delta;
                        return text
                            ? [...text, ...(snapshot.children?.flatMap(getDeltas) ?? [])]
                            : snapshot.children?.flatMap(getDeltas);
                    };
                    const snapshot = this.std?.clipboard?.readFromClipboard(e.clipboardData)[ClipboardAdapter.MIME];
                    const deltas = JSON.parse(snapshot).snapshot.content.flatMap(getDeltas);
                    deltas.forEach(delta => this.insertDelta(delta));
                    return;
                }
                catch (_e) {
                    //
                }
            }
            const text = e.clipboardData
                ?.getData('text/plain')
                ?.replace(/\r?\n|\r/g, '\n');
            if (!text)
                return;
            e.preventDefault();
            e.stopPropagation();
            if (isValidUrl(text)) {
                const std = this.std;
                const result = std?.getOptional(ParseDocUrlProvider)?.parseDocUrl(text);
                if (result) {
                    const text = ' ';
                    inlineEditor?.insertText(inlineRange, text, {
                        reference: {
                            type: 'LinkedPage',
                            pageId: result.docId,
                            params: {
                                blockIds: result.blockIds,
                                elementIds: result.elementIds,
                                mode: result.mode,
                            },
                        },
                    });
                    inlineEditor?.setInlineRange({
                        index: inlineRange.index + text.length,
                        length: 0,
                    });
                }
                else {
                    inlineEditor?.insertText(inlineRange, text, {
                        link: text,
                    });
                    inlineEditor?.setInlineRange({
                        index: inlineRange.index + text.length,
                        length: 0,
                    });
                }
            }
            else {
                inlineEditor?.insertText(inlineRange, text);
                inlineEditor?.setInlineRange({
                    index: inlineRange.index + text.length,
                    length: 0,
                });
            }
        };
        this.activity = false;
        this.insertDelta = (delta) => {
            const inlineEditor = this.inlineEditor;
            const range = inlineEditor?.getInlineRange();
            if (!range || !delta.insert) {
                return;
            }
            inlineEditor?.insertText(range, delta.insert, delta.attributes);
            inlineEditor?.setInlineRange({
                index: range.index + delta.insert.length,
                length: 0,
            });
        };
    }
    get std() {
        return this.host?.std;
    }
    connectedCallback() {
        super.connectedCallback();
        const selectAll = (e) => {
            if (e.key === 'a' && (IS_MAC ? e.metaKey : e.ctrlKey)) {
                e.stopPropagation();
                e.preventDefault();
                this.inlineEditor?.selectAll();
            }
        };
        this.addEventListener('keydown', selectAll);
        this.disposables.add(() => {
            this.removeEventListener('keydown', selectAll);
        });
    }
    firstUpdated(props) {
        super.firstUpdated(props);
        if (!this.isLinkedDoc$.value) {
            this.disposables.addFromEvent(this.richText, 'copy', this._onCopy);
            this.disposables.addFromEvent(this.richText, 'cut', this._onCut);
            this.disposables.addFromEvent(this.richText, 'paste', this._onPaste);
        }
        this.richText.updateComplete
            .then(() => {
            this.inlineEditor?.focusEnd();
            this.disposables.add(effect(() => {
                const inlineRange = this.inlineEditor?.inlineRange$.value;
                if (inlineRange) {
                    if (!this.isEditing) {
                        this.selectCurrentCell(true);
                    }
                }
                else {
                    if (this.isEditing) {
                        this.selectCurrentCell(false);
                    }
                }
            }));
        })
            .catch(console.error);
    }
    renderBlockText() {
        return html ` <rich-text
      .yText="${this.value}"
      .inlineEventSource="${this.topContenteditableElement}"
      .attributesSchema="${this.attributesSchema}"
      .attributeRenderer="${this.attributeRenderer}"
      .embedChecker="${this.inlineManager?.embedChecker}"
      .markdownShortcutHandler="${this.inlineManager?.markdownShortcutHandler}"
      .readonly="${this.readonly}"
      .enableClipboard="${false}"
      .verticalScrollContainerGetter="${() => this.topContenteditableElement?.host
            ? getViewportElement(this.topContenteditableElement.host)
            : null}"
      class="data-view-header-area-rich-text can-link-doc"
    ></rich-text>`;
    }
    renderLinkedDoc() {
        return html ` <rich-text
      .yText="${this.linkedDocTitle$.value}"
      .inlineEventSource="${this.topContenteditableElement}"
      .readonly="${this.readonly}"
      .enableClipboard="${true}"
      .verticalScrollContainerGetter="${() => this.topContenteditableElement?.host
            ? getViewportElement(this.topContenteditableElement.host)
            : null}"
      class="data-view-header-area-rich-text"
    ></rich-text>`;
    }
}
//# sourceMappingURL=text.js.map