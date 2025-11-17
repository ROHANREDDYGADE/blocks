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
import { HoverController } from '@blocksuite/affine-components/hover';
import { isFormatSupported } from '@blocksuite/affine-components/rich-text';
import { cloneGroups, } from '@blocksuite/affine-components/toolbar';
import { matchFlavours } from '@blocksuite/affine-shared/utils';
import { WidgetComponent } from '@blocksuite/block-std';
import { assertExists, DisposableGroup, nextTick, } from '@blocksuite/global/utils';
import { autoUpdate, computePosition, inline, offset, shift, } from '@floating-ui/dom';
import { html, nothing } from 'lit';
import { query, state } from 'lit/decorators.js';
import { getMoreMenuConfig } from '../../configs/toolbar.js';
import { ConfigRenderer } from './components/config-renderer.js';
import { BUILT_IN_GROUPS, toolbarDefaultConfig, toolbarMoreButton, } from './config.js';
import { formatBarStyle } from './styles.js';
export const AFFINE_FORMAT_BAR_WIDGET = 'affine-format-bar-widget';
let AffineFormatBarWidget = (() => {
    let _classSuper = WidgetComponent;
    let __displayType_decorators;
    let __displayType_initializers = [];
    let __displayType_extraInitializers = [];
    let __dragging_decorators;
    let __dragging_initializers = [];
    let __dragging_extraInitializers = [];
    let __selectedBlocks_decorators;
    let __selectedBlocks_initializers = [];
    let __selectedBlocks_extraInitializers = [];
    let _configItems_decorators;
    let _configItems_initializers = [];
    let _configItems_extraInitializers = [];
    let _formatBarElement_decorators;
    let _formatBarElement_initializers = [];
    let _formatBarElement_extraInitializers = [];
    return class AffineFormatBarWidget extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __displayType_decorators = [state()];
            __dragging_decorators = [state()];
            __selectedBlocks_decorators = [state()];
            _configItems_decorators = [state()];
            _formatBarElement_decorators = [query(`.${AFFINE_FORMAT_BAR_WIDGET}`)];
            __esDecorate(this, null, __displayType_decorators, { kind: "accessor", name: "_displayType", static: false, private: false, access: { has: obj => "_displayType" in obj, get: obj => obj._displayType, set: (obj, value) => { obj._displayType = value; } }, metadata: _metadata }, __displayType_initializers, __displayType_extraInitializers);
            __esDecorate(this, null, __dragging_decorators, { kind: "accessor", name: "_dragging", static: false, private: false, access: { has: obj => "_dragging" in obj, get: obj => obj._dragging, set: (obj, value) => { obj._dragging = value; } }, metadata: _metadata }, __dragging_initializers, __dragging_extraInitializers);
            __esDecorate(this, null, __selectedBlocks_decorators, { kind: "accessor", name: "_selectedBlocks", static: false, private: false, access: { has: obj => "_selectedBlocks" in obj, get: obj => obj._selectedBlocks, set: (obj, value) => { obj._selectedBlocks = value; } }, metadata: _metadata }, __selectedBlocks_initializers, __selectedBlocks_extraInitializers);
            __esDecorate(this, null, _configItems_decorators, { kind: "accessor", name: "configItems", static: false, private: false, access: { has: obj => "configItems" in obj, get: obj => obj.configItems, set: (obj, value) => { obj.configItems = value; } }, metadata: _metadata }, _configItems_initializers, _configItems_extraInitializers);
            __esDecorate(this, null, _formatBarElement_decorators, { kind: "accessor", name: "formatBarElement", static: false, private: false, access: { has: obj => "formatBarElement" in obj, get: obj => obj.formatBarElement, set: (obj, value) => { obj.formatBarElement = value; } }, metadata: _metadata }, _formatBarElement_initializers, _formatBarElement_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = formatBarStyle; }
        get _selectionManager() {
            return this.host.selection;
        }
        get displayType() {
            return this._displayType;
        }
        get nativeRange() {
            const sl = document.getSelection();
            if (!sl || sl.rangeCount === 0)
                return null;
            return sl.getRangeAt(0);
        }
        get selectedBlocks() {
            return this._selectedBlocks;
        }
        _calculatePlacement() {
            const rootComponent = this.block;
            this.handleEvent('dragStart', () => {
                this._dragging = true;
            });
            this.handleEvent('dragEnd', () => {
                this._dragging = false;
            });
            // calculate placement
            this.disposables.add(this.host.event.add('pointerUp', ctx => {
                let targetRect = null;
                if (this.displayType === 'text' || this.displayType === 'native') {
                    const range = this.nativeRange;
                    if (!range) {
                        this.reset();
                        return;
                    }
                    targetRect = range.getBoundingClientRect();
                }
                else if (this.displayType === 'block') {
                    const block = this._selectedBlocks[0];
                    if (!block)
                        return;
                    targetRect = block.getBoundingClientRect();
                }
                else {
                    return;
                }
                const { top: editorHostTop, bottom: editorHostBottom } = this.host.getBoundingClientRect();
                const e = ctx.get('pointerState');
                if (editorHostBottom - targetRect.bottom < 50) {
                    this._placement = 'top';
                }
                else if (targetRect.top - Math.max(editorHostTop, 0) < 50) {
                    this._placement = 'bottom';
                }
                else if (e.raw.y < targetRect.top + targetRect.height / 2) {
                    this._placement = 'top';
                }
                else {
                    this._placement = 'bottom';
                }
            }));
            // listen to selection change
            this.disposables.add(this._selectionManager.slots.changed.on(() => {
                const update = async () => {
                    const textSelection = rootComponent.selection.find('text');
                    const blockSelections = rootComponent.selection.filter('block');
                    // Should not re-render format bar when only cursor selection changed in edgeless
                    const cursorSelection = rootComponent.selection.find('cursor');
                    if (cursorSelection) {
                        if (!this._lastCursor) {
                            this._lastCursor = cursorSelection;
                            return;
                        }
                        if (!this._selectionEqual(cursorSelection, this._lastCursor)) {
                            this._lastCursor = cursorSelection;
                            return;
                        }
                    }
                    // We cannot use `host.getUpdateComplete()` here
                    // because it would cause excessive DOM queries, leading to UI jamming.
                    await nextTick();
                    if (textSelection) {
                        const block = this.host.view.getBlock(textSelection.blockId);
                        if (!textSelection.isCollapsed() &&
                            block &&
                            block.model.role === 'content') {
                            this._displayType = 'text';
                            if (!rootComponent.std.range)
                                return;
                            this.host.std.command
                                .chain()
                                .getTextSelection()
                                .getSelectedBlocks({
                                types: ['text'],
                            })
                                .inline(ctx => {
                                const { selectedBlocks } = ctx;
                                if (!selectedBlocks)
                                    return;
                                this._selectedBlocks = selectedBlocks;
                            })
                                .run();
                            return;
                        }
                        this.reset();
                        return;
                    }
                    if (this.block && blockSelections.length > 0) {
                        this._displayType = 'block';
                        const selectedBlocks = blockSelections
                            .map(selection => {
                            const path = selection.blockId;
                            return this.block.host.view.getBlock(path);
                        })
                            .filter((el) => !!el);
                        this._selectedBlocks = selectedBlocks;
                        return;
                    }
                    this.reset();
                };
                update().catch(console.error);
            }));
            this.disposables.addFromEvent(document, 'selectionchange', () => {
                if (!this.host.event.active)
                    return;
                const databaseSelection = this.host.selection.find('database');
                if (!databaseSelection) {
                    return;
                }
                const reset = () => {
                    this.reset();
                    this.requestUpdate();
                };
                const viewSelection = databaseSelection.viewSelection;
                // check table selection
                if (viewSelection.type === 'table' &&
                    (viewSelection.selectionType !== 'area' || !viewSelection.isEditing))
                    return reset();
                // check kanban selection
                if ((viewSelection.type === 'kanban' &&
                    viewSelection.selectionType !== 'cell') ||
                    !viewSelection.isEditing)
                    return reset();
                const range = this.nativeRange;
                if (!range || range.collapsed)
                    return reset();
                this._displayType = 'native';
                this.requestUpdate();
            });
        }
        _listenFloatingElement() {
            const formatQuickBarElement = this.formatBarElement;
            assertExists(formatQuickBarElement, 'format quick bar should exist');
            const listenFloatingElement = (getElement) => {
                const initialElement = getElement();
                if (!initialElement) {
                    return;
                }
                assertExists(this._floatDisposables);
                HoverController.globalAbortController?.abort();
                this._floatDisposables.add(autoUpdate(initialElement, formatQuickBarElement, () => {
                    const element = getElement();
                    if (!element)
                        return;
                    computePosition(element, formatQuickBarElement, {
                        placement: this._placement,
                        middleware: [
                            offset(10),
                            inline(),
                            shift({
                                padding: 6,
                            }),
                        ],
                    })
                        .then(({ x, y }) => {
                        formatQuickBarElement.style.display = 'flex';
                        formatQuickBarElement.style.top = `${y}px`;
                        formatQuickBarElement.style.left = `${x}px`;
                    })
                        .catch(console.error);
                }, {
                    // follow edgeless viewport update
                    animationFrame: true,
                }));
            };
            const getReferenceElementFromBlock = () => {
                const firstBlock = this._selectedBlocks[0];
                let rect = firstBlock?.getBoundingClientRect();
                if (!rect)
                    return;
                this._selectedBlocks.forEach(el => {
                    const elRect = el.getBoundingClientRect();
                    if (elRect.top < rect.top) {
                        rect = new DOMRect(rect.left, elRect.top, rect.width, rect.bottom);
                    }
                    if (elRect.bottom > rect.bottom) {
                        rect = new DOMRect(rect.left, rect.top, rect.width, elRect.bottom);
                    }
                    if (elRect.left < rect.left) {
                        rect = new DOMRect(elRect.left, rect.top, rect.right, rect.bottom);
                    }
                    if (elRect.right > rect.right) {
                        rect = new DOMRect(rect.left, rect.top, elRect.right, rect.bottom);
                    }
                });
                return {
                    getBoundingClientRect: () => rect,
                    getClientRects: () => this._selectedBlocks.map(el => el.getBoundingClientRect()),
                };
            };
            const getReferenceElementFromText = () => {
                const range = this.nativeRange;
                if (!range) {
                    return;
                }
                return {
                    getBoundingClientRect: () => range.getBoundingClientRect(),
                    getClientRects: () => range.getClientRects(),
                };
            };
            switch (this.displayType) {
                case 'text':
                case 'native':
                    return listenFloatingElement(getReferenceElementFromText);
                case 'block':
                    return listenFloatingElement(getReferenceElementFromBlock);
                default:
                    return;
            }
        }
        _selectionEqual(target, current) {
            if (target === current || (target && current && target.equals(current))) {
                return true;
            }
            return false;
        }
        _shouldDisplay() {
            const readonly = this.doc.awarenessStore.isReadonly(this.doc.blockCollection);
            const active = this.host.event.active;
            if (readonly || !active)
                return false;
            if (this.displayType === 'block' &&
                this._selectedBlocks?.[0]?.flavour === 'affine:surface-ref') {
                return false;
            }
            if (this.displayType === 'block' && this._selectedBlocks.length === 1) {
                const selectedBlock = this._selectedBlocks[0];
                if (!matchFlavours(selectedBlock.model, [
                    'affine:paragraph',
                    'affine:list',
                    'affine:code',
                    'affine:image',
                ])) {
                    return false;
                }
            }
            if (this.displayType === 'none' || this._dragging) {
                return false;
            }
            // if the selection is on an embed (ex. linked page), we should not display the format bar
            if (this.displayType === 'text' && this._selectedBlocks.length === 1) {
                const isEmbed = () => {
                    const [element] = this._selectedBlocks;
                    const richText = element.querySelector('rich-text');
                    const inline = richText?.inlineEditor;
                    if (!richText || !inline) {
                        return false;
                    }
                    const range = inline.getInlineRange();
                    if (!range || range.length > 1) {
                        return false;
                    }
                    const deltas = inline.getDeltasByInlineRange(range);
                    if (deltas.length > 2) {
                        return false;
                    }
                    const delta = deltas?.[1]?.[0];
                    if (!delta) {
                        return false;
                    }
                    return inline.isEmbed(delta);
                };
                if (isEmbed()) {
                    return false;
                }
            }
            // todo: refactor later that ai panel & format bar should not depend on each other
            // do not display if AI panel is open
            const rootBlockId = this.host.doc.root?.id;
            const aiPanel = rootBlockId
                ? this.host.view.getWidget('affine-ai-panel-widget', rootBlockId)
                : null;
            // @ts-ignore
            if (aiPanel && aiPanel?.state !== 'hidden') {
                return false;
            }
            return true;
        }
        addBlockTypeSwitch(config) {
            const { flavour, type, icon } = config;
            return this.addParagraphAction({
                id: `${flavour}/${type ?? ''}`,
                icon,
                flavour,
                name: config.name ?? camelCaseToWords(type ?? flavour),
                action: chain => {
                    chain
                        .updateBlockType({
                        flavour,
                        props: type != null ? { type } : undefined,
                    })
                        .run();
                },
            });
        }
        addDivider() {
            this.configItems.push({ type: 'divider' });
            return this;
        }
        addHighlighterDropdown() {
            this.configItems.push({ type: 'highlighter-dropdown' });
            return this;
        }
        addInlineAction(config) {
            this.configItems.push({ ...config, type: 'inline-action' });
            return this;
        }
        addParagraphAction(config) {
            this.configItems.push({ ...config, type: 'paragraph-action' });
            return this;
        }
        addParagraphDropdown() {
            this.configItems.push({ type: 'paragraph-dropdown' });
            return this;
        }
        addRawConfigItems(configItems, index) {
            if (index === undefined) {
                this.configItems.push(...configItems);
            }
            else {
                this.configItems.splice(index, 0, ...configItems);
            }
            return this;
        }
        addTextStyleToggle(config) {
            const { key } = config;
            return this.addInlineAction({
                id: key,
                name: camelCaseToWords(key),
                icon: config.icon,
                isActive: chain => {
                    const [result] = chain.isTextStyleActive({ key }).run();
                    return result;
                },
                action: config.action,
                showWhen: chain => {
                    const [result] = isFormatSupported(chain).run();
                    return result;
                },
            });
        }
        clearConfig() {
            this.configItems = [];
            return this;
        }
        connectedCallback() {
            super.connectedCallback();
            this._abortController = new AbortController();
            const rootComponent = this.block;
            assertExists(rootComponent);
            const widgets = rootComponent.widgets;
            // check if the host use the format bar widget
            if (!Object.hasOwn(widgets, AFFINE_FORMAT_BAR_WIDGET)) {
                return;
            }
            // check if format bar widget support the host
            if (rootComponent.model.flavour !== 'affine:page') {
                console.error(`format bar not support rootComponent: ${rootComponent.constructor.name} but its widgets has format bar`);
                return;
            }
            this._calculatePlacement();
            if (this.configItems.length === 0) {
                toolbarDefaultConfig(this);
            }
            this.moreGroups = getMoreMenuConfig(this.std).configure(this.moreGroups);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._abortController.abort();
            this.reset();
            this._lastCursor = undefined;
        }
        render() {
            if (!this._shouldDisplay()) {
                return nothing;
            }
            const items = ConfigRenderer(this);
            return html `
      <editor-toolbar class="${AFFINE_FORMAT_BAR_WIDGET}">
        ${items}
        <editor-toolbar-separator></editor-toolbar-separator>
        ${toolbarMoreButton(this)}
      </editor-toolbar>
    `;
        }
        reset() {
            this._displayType = 'none';
            this._selectedBlocks = [];
        }
        updated() {
            if (!this._shouldDisplay()) {
                if (this._floatDisposables) {
                    this._floatDisposables.dispose();
                }
                return;
            }
            this._floatDisposables = new DisposableGroup();
            this._listenFloatingElement();
        }
        #_displayType_accessor_storage;
        get _displayType() { return this.#_displayType_accessor_storage; }
        set _displayType(value) { this.#_displayType_accessor_storage = value; }
        #_dragging_accessor_storage;
        get _dragging() { return this.#_dragging_accessor_storage; }
        set _dragging(value) { this.#_dragging_accessor_storage = value; }
        #_selectedBlocks_accessor_storage;
        get _selectedBlocks() { return this.#_selectedBlocks_accessor_storage; }
        set _selectedBlocks(value) { this.#_selectedBlocks_accessor_storage = value; }
        #configItems_accessor_storage;
        get configItems() { return this.#configItems_accessor_storage; }
        set configItems(value) { this.#configItems_accessor_storage = value; }
        #formatBarElement_accessor_storage;
        get formatBarElement() { return this.#formatBarElement_accessor_storage; }
        set formatBarElement(value) { this.#formatBarElement_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._abortController = new AbortController();
            this._floatDisposables = null;
            this._lastCursor = undefined;
            this._placement = 'top';
            /*
             * Caches the more menu items.
             * Currently only supports configuring more menu.
             */
            this.moreGroups = cloneGroups(BUILT_IN_GROUPS);
            this.#_displayType_accessor_storage = __runInitializers(this, __displayType_initializers, 'none');
            this.#_dragging_accessor_storage = (__runInitializers(this, __displayType_extraInitializers), __runInitializers(this, __dragging_initializers, false));
            this.#_selectedBlocks_accessor_storage = (__runInitializers(this, __dragging_extraInitializers), __runInitializers(this, __selectedBlocks_initializers, []));
            this.#configItems_accessor_storage = (__runInitializers(this, __selectedBlocks_extraInitializers), __runInitializers(this, _configItems_initializers, []));
            this.#formatBarElement_accessor_storage = (__runInitializers(this, _configItems_extraInitializers), __runInitializers(this, _formatBarElement_initializers, null));
            __runInitializers(this, _formatBarElement_extraInitializers);
        }
    };
})();
export { AffineFormatBarWidget };
function camelCaseToWords(s) {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
}
//# sourceMappingURL=format-bar.js.map