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
import { SurfaceElementModel, } from '@blocksuite/affine-block-surface';
import { EdgelessModeIcon, FrameIcon, MoreDeleteIcon, } from '@blocksuite/affine-components/icons';
import { Peekable } from '@blocksuite/affine-components/peek';
import { FrameBlockModel, GroupElementModel, } from '@blocksuite/affine-model';
import { DocModeProvider, EditPropsStore, ThemeProvider, } from '@blocksuite/affine-shared/services';
import { requestConnectedFrame } from '@blocksuite/affine-shared/utils';
import { BlockStdScope, LifeCycleWatcher, } from '@blocksuite/block-std';
import { BlockComponent, BlockServiceWatcher } from '@blocksuite/block-std';
import { GfxBlockElementModel } from '@blocksuite/block-std/gfx';
import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';
import { Bound, deserializeXYWH, DisposableGroup, } from '@blocksuite/global/utils';
import { assertExists } from '@blocksuite/global/utils';
import { css, html, nothing } from 'lit';
import { query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { SpecProvider } from '../_specs/index.js';
import { EdgelessRootService } from '../root-block/index.js';
import { noContentPlaceholder } from './utils.js';
const REF_LABEL_ICON = {
    'affine:frame': FrameIcon,
    DEFAULT_NOTE_HEIGHT: EdgelessModeIcon,
};
const NO_CONTENT_TITLE = {
    'affine:frame': 'Frame',
    group: 'Group',
    DEFAULT: 'Content',
};
const NO_CONTENT_REASON = {
    group: 'This content was ungrouped or deleted on edgeless mode',
    DEFAULT: 'This content was deleted on edgeless mode',
};
let SurfaceRefBlockComponent = (() => {
    let _classDecorators = [Peekable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = BlockComponent;
    let __focused_decorators;
    let __focused_initializers = [];
    let __focused_extraInitializers = [];
    let __surfaceModel_decorators;
    let __surfaceModel_initializers = [];
    let __surfaceModel_extraInitializers = [];
    let _captionElement_decorators;
    let _captionElement_initializers = [];
    let _captionElement_extraInitializers = [];
    let _previewEditor_decorators;
    let _previewEditor_initializers = [];
    let _previewEditor_extraInitializers = [];
    var SurfaceRefBlockComponent = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __focused_decorators = [state()];
            __surfaceModel_decorators = [state()];
            _captionElement_decorators = [query('affine-surface-ref > block-caption-editor')];
            _previewEditor_decorators = [query('editor-host')];
            __esDecorate(this, null, __focused_decorators, { kind: "accessor", name: "_focused", static: false, private: false, access: { has: obj => "_focused" in obj, get: obj => obj._focused, set: (obj, value) => { obj._focused = value; } }, metadata: _metadata }, __focused_initializers, __focused_extraInitializers);
            __esDecorate(this, null, __surfaceModel_decorators, { kind: "accessor", name: "_surfaceModel", static: false, private: false, access: { has: obj => "_surfaceModel" in obj, get: obj => obj._surfaceModel, set: (obj, value) => { obj._surfaceModel = value; } }, metadata: _metadata }, __surfaceModel_initializers, __surfaceModel_extraInitializers);
            __esDecorate(this, null, _captionElement_decorators, { kind: "accessor", name: "captionElement", static: false, private: false, access: { has: obj => "captionElement" in obj, get: obj => obj.captionElement, set: (obj, value) => { obj.captionElement = value; } }, metadata: _metadata }, _captionElement_initializers, _captionElement_extraInitializers);
            __esDecorate(this, null, _previewEditor_decorators, { kind: "accessor", name: "previewEditor", static: false, private: false, access: { has: obj => "previewEditor" in obj, get: obj => obj.previewEditor, set: (obj, value) => { obj.previewEditor = value; } }, metadata: _metadata }, _previewEditor_initializers, _previewEditor_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SurfaceRefBlockComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .affine-surface-ref {
      position: relative;
      user-select: none;
      margin: 10px 0;
      break-inside: avoid;
    }

    @media print {
      .affine-surface-ref {
        outline: none !important;
      }
    }

    .ref-placeholder {
      padding: 26px 0px 0px;
    }

    .placeholder-image {
      margin: 0 auto;
      text-align: center;
    }

    .placeholder-text {
      margin: 12px auto 0;
      text-align: center;
      font-size: 28px;
      font-weight: 600;
      line-height: 36px;
      font-family: var(--affine-font-family);
    }

    .placeholder-action {
      margin: 32px auto 0;
      text-align: center;
    }

    .delete-button {
      width: 204px;
      padding: 4px 18px;

      display: inline-flex;
      justify-content: center;
      align-items: center;
      gap: 4px;

      border-radius: 8px;
      border: 1px solid var(--affine-border-color);

      font-family: var(--affine-font-family);
      font-size: 12px;
      font-weight: 500;
      line-height: 20px;

      background-color: transparent;
      cursor: pointer;
    }

    .delete-button > .icon > svg {
      color: var(--affine-icon-color);
      width: 16px;
      height: 16px;
      display: block;
    }

    .placeholder-reason {
      margin: 72px auto 0;
      padding: 10px;

      text-align: center;
      font-size: 12px;
      font-family: var(--affine-font-family);
      line-height: 20px;

      color: var(--affine-warning-color);
      background-color: var(--affine-background-error-color);
    }

    .ref-content {
      position: relative;
      padding: 20px;
      background-color: var(--affine-background-primary-color);
      background: radial-gradient(
        var(--affine-edgeless-grid-color) 1px,
        var(--affine-background-primary-color) 1px
      );
    }

    .ref-viewport {
      max-width: 100%;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      pointer-events: none;
      user-select: none;
    }

    .ref-viewport.frame {
      border-radius: 2px;
      border: 1px solid var(--affine-black-30);
    }

    .surface-ref-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      break-inside: avoid;
    }

    .surface-ref-mask:hover {
      background-color: rgba(211, 211, 211, 0.1);
    }

    .surface-ref-mask:hover .ref-label {
      display: block;
    }

    .ref-label {
      display: none;
      user-select: none;
    }

    .ref-label {
      position: absolute;
      left: 0;
      bottom: 0;

      width: 100%;
      padding: 8px 16px;
      border: 1px solid var(--affine-border-color);
      gap: 14px;

      background: var(--affine-background-primary-color);

      font-size: 12px;

      user-select: none;
    }

    .ref-label .title {
      display: inline-block;
      font-weight: 600;
      font-family: var(--affine-font-family);
      line-height: 20px;

      color: var(--affine-text-secondary-color);
    }

    .ref-label .title > svg {
      color: var(--affine-icon-secondary);
      display: inline-block;
      vertical-align: baseline;
      width: 20px;
      height: 20px;
      vertical-align: bottom;
    }

    .ref-label .suffix {
      display: inline-block;
      font-weight: 400;
      color: var(--affine-text-disable-color);
      line-height: 20px;
    }
  `; }
        get _shouldRender() {
            return (this.isConnected &&
                // prevent surface-ref from render itself in loop
                !this.parentComponent?.closest('affine-surface-ref'));
        }
        get referenceModel() {
            return this._referencedModel;
        }
        _deleteThis() {
            this.doc.deleteBlock(this.model);
        }
        _focusBlock() {
            this.selection.update(() => {
                return [this.selection.create('block', { blockId: this.blockId })];
            });
        }
        _initHotkey() {
            const selection = this.host.selection;
            const addParagraph = () => {
                if (!this.doc.getParent(this.model))
                    return;
                const [paragraphId] = this.doc.addSiblingBlocks(this.model, [
                    {
                        flavour: 'affine:paragraph',
                    },
                ]);
                const model = this.doc.getBlockById(paragraphId);
                assertExists(model, `Failed to add paragraph block.`);
                requestConnectedFrame(() => {
                    selection.update(selList => {
                        return selList
                            .filter(sel => !sel.is('block'))
                            .concat(selection.create('text', {
                            from: {
                                blockId: model.id,
                                index: 0,
                                length: 0,
                            },
                            to: null,
                        }));
                    });
                }, this);
            };
            this.bindHotKey({
                Enter: () => {
                    if (!this._focused)
                        return;
                    addParagraph();
                    return true;
                },
            });
        }
        _initReferencedModel() {
            const surfaceModel = this.doc.getBlocksByFlavour('affine:surface')[0]?.model ?? null;
            this._surfaceModel = surfaceModel;
            const findReferencedModel = () => {
                if (!this.model.reference)
                    return [null, this.doc.id];
                if (this.doc.getBlock(this.model.reference)) {
                    return [
                        this.doc.getBlock(this.model.reference)
                            ?.model,
                        this.doc.id,
                    ];
                }
                if (this._surfaceModel?.getElementById(this.model.reference)) {
                    return [
                        this._surfaceModel.getElementById(this.model.reference),
                        this.doc.id,
                    ];
                }
                const doc = [...this.std.collection.docs.values()]
                    .map(doc => doc.getDoc())
                    .find(doc => doc.getBlock(this.model.reference) ||
                    doc.getBlocksByFlavour('affine:surface')[0]
                        .model.getElementById(this.model.reference));
                if (doc) {
                    this._surfaceModel = doc.getBlocksByFlavour('affine:surface')[0]
                        .model;
                }
                if (doc && doc.getBlock(this.model.reference)) {
                    return [
                        doc.getBlock(this.model.reference)?.model,
                        doc.id,
                    ];
                }
                if (doc && doc.getBlocksByFlavour('affine:surface')[0]) {
                    return [
                        doc.getBlocksByFlavour('affine:surface')[0]
                            .model.getElementById(this.model.reference),
                        doc.id,
                    ];
                }
                return [null, this.doc.id];
            };
            const init = () => {
                const [referencedModel, docId] = findReferencedModel();
                this._referencedModel =
                    referencedModel && referencedModel.xywh ? referencedModel : null;
                this._previewDoc = this.doc.collection.getDoc(docId, {
                    readonly: true,
                });
                this._referenceXYWH = this._referencedModel?.xywh ?? null;
            };
            init();
            this._disposables.add(this.model.propsUpdated.on(payload => {
                if (payload.key === 'reference' &&
                    this.model.reference !== this._referencedModel?.id) {
                    init();
                }
            }));
            if (surfaceModel && this._referencedModel instanceof SurfaceElementModel) {
                this._disposables.add(surfaceModel.elementRemoved.on(({ id }) => {
                    if (this.model.reference === id) {
                        init();
                    }
                }));
            }
            if (this._referencedModel instanceof GfxBlockElementModel) {
                this._disposables.add(this.doc.slots.blockUpdated.on(({ type, id }) => {
                    if (type === 'delete' && id === this.model.reference) {
                        init();
                    }
                }));
            }
        }
        _initSelection() {
            const selection = this.host.selection;
            this._disposables.add(selection.slots.changed.on(selList => {
                this._focused = selList.some(sel => sel.blockId === this.blockId && sel.is('block'));
            }));
        }
        _initSpec() {
            const refreshViewport = this._refreshViewport.bind(this);
            class PageViewWatcher extends BlockServiceWatcher {
                static { this.flavour = 'affine:page'; }
                mounted() {
                    this.blockService.disposables.add(this.blockService.specSlots.viewConnected.once(({ component }) => {
                        const edgelessBlock = component;
                        edgelessBlock.editorViewportSelector = 'ref-viewport';
                        refreshViewport();
                        edgelessBlock.service.viewport.sizeUpdated.once(() => {
                            refreshViewport();
                        });
                    }));
                }
            }
            this._previewSpec.extend([PageViewWatcher]);
            const referenceId = this.model.reference;
            const setReferenceXYWH = (xywh) => {
                this._referenceXYWH = xywh;
            };
            class FrameGroupViewWatcher extends LifeCycleWatcher {
                constructor() {
                    super(...arguments);
                    this._disposable = new DisposableGroup();
                }
                static { this.key = 'surface-ref-group-view-watcher'; }
                mounted() {
                    const edgelessService = this.std.get(EdgelessRootService);
                    const { _disposable } = this;
                    const referenceElement = edgelessService.getElementById(referenceId);
                    if (!referenceElement) {
                        throw new BlockSuiteError(ErrorCode.MissingViewModelError, `can not find element(id:${referenceElement})`);
                    }
                    if (referenceElement instanceof FrameBlockModel) {
                        _disposable.add(referenceElement.xywh$.subscribe(xywh => {
                            setReferenceXYWH(xywh);
                            refreshViewport();
                        }));
                    }
                    else if (referenceElement instanceof GroupElementModel) {
                        _disposable.add(edgelessService.surface.elementUpdated.on(({ id, oldValues }) => {
                            if (id === referenceId &&
                                oldValues.xywh !== referenceElement.xywh) {
                                setReferenceXYWH(referenceElement.xywh);
                                refreshViewport();
                            }
                        }));
                    }
                    else {
                        console.warn('Unsupported reference element type');
                    }
                }
                unmounted() {
                    this._disposable.dispose();
                }
            }
            this._previewSpec.extend([FrameGroupViewWatcher]);
        }
        _refreshViewport() {
            if (!this._referenceXYWH)
                return;
            const previewEditorHost = this.previewEditor;
            if (!previewEditorHost)
                return;
            const edgelessService = previewEditorHost.std.getService('affine:page');
            edgelessService.viewport.setViewportByBound(Bound.deserialize(this._referenceXYWH));
        }
        _renderMask(referencedModel, flavourOrType) {
            const title = 'title' in referencedModel ? referencedModel.title : '';
            return html `
      <div class="surface-ref-mask">
        <div class="ref-label">
          <div class="title">
            ${REF_LABEL_ICON[flavourOrType ?? 'DEFAULT'] ??
                REF_LABEL_ICON.DEFAULT}
            <span>${title}</span>
          </div>
          <div class="suffix">from edgeless mode</div>
        </div>
      </div>
    `;
        }
        _renderRefContent(referencedModel) {
            const [, , w, h] = deserializeXYWH(referencedModel.xywh);
            const flavourOrType = 'flavour' in referencedModel
                ? referencedModel.flavour
                : referencedModel.type;
            const _previewSpec = this._previewSpec.value;
            if (!this._viewportEditor) {
                this._viewportEditor = new BlockStdScope({
                    doc: this._previewDoc,
                    extensions: _previewSpec,
                }).render();
            }
            return html `<div class="ref-content">
      <div
        class="ref-viewport ${flavourOrType === 'affine:frame' ? 'frame' : ''}"
        style=${styleMap({
                width: `${w}px`,
                aspectRatio: `${w} / ${h}`,
            })}
      >
        ${this._viewportEditor}
      </div>
      ${this._renderMask(referencedModel, flavourOrType)}
    </div>`;
        }
        _renderRefPlaceholder(model) {
            return html `<div class="ref-placeholder">
      <div class="placeholder-image">${noContentPlaceholder}</div>
      <div class="placeholder-text">
        No Such
        ${NO_CONTENT_TITLE[model.refFlavour ?? 'DEFAULT'] ??
                NO_CONTENT_TITLE.DEFAULT}
      </div>
      <div class="placeholder-action">
        <button class="delete-button" type="button" @click=${this._deleteThis}>
          <span class="icon">${MoreDeleteIcon}</span
          ><span>Delete this block</span>
        </button>
      </div>
      <div class="placeholder-reason">
        ${NO_CONTENT_REASON[model.refFlavour ?? 'DEFAULT'] ??
                NO_CONTENT_REASON.DEFAULT}
      </div>
    </div>`;
        }
        connectedCallback() {
            super.connectedCallback();
            this.contentEditable = 'false';
            if (!this._shouldRender)
                return;
            const service = this.service;
            assertExists(service, `Surface ref block must run with its service.`);
            this._initHotkey();
            this._initSpec();
            this._initReferencedModel();
            this._initSelection();
        }
        render() {
            if (!this._shouldRender)
                return nothing;
            const { _surfaceModel, _referencedModel, model } = this;
            const isEmpty = !_surfaceModel || !_referencedModel || !_referencedModel.xywh;
            const content = isEmpty
                ? this._renderRefPlaceholder(model)
                : this._renderRefContent(_referencedModel);
            const edgelessTheme = this.std.get(ThemeProvider).edgeless$.value;
            return html `
      <div
        class="affine-surface-ref"
        data-theme=${edgelessTheme}
        @click=${this._focusBlock}
        style=${styleMap({
                outline: this._focused
                    ? '2px solid var(--affine-primary-color)'
                    : undefined,
            })}
      >
        ${content}
      </div>

      <block-caption-editor></block-caption-editor>

      ${Object.values(this.widgets)}
    `;
        }
        viewInEdgeless() {
            if (!this._referenceXYWH)
                return;
            const viewport = {
                xywh: this._referenceXYWH,
                padding: [60, 20, 20, 20],
            };
            this.std.get(EditPropsStore).setStorage('viewport', viewport);
            this.std.get(DocModeProvider).setEditorMode('edgeless');
        }
        willUpdate(_changedProperties) {
            if (_changedProperties.has('_referencedModel')) {
                this._refreshViewport();
            }
        }
        #_focused_accessor_storage;
        get _focused() { return this.#_focused_accessor_storage; }
        set _focused(value) { this.#_focused_accessor_storage = value; }
        #_surfaceModel_accessor_storage;
        get _surfaceModel() { return this.#_surfaceModel_accessor_storage; }
        set _surfaceModel(value) { this.#_surfaceModel_accessor_storage = value; }
        #captionElement_accessor_storage;
        get captionElement() { return this.#captionElement_accessor_storage; }
        set captionElement(value) { this.#captionElement_accessor_storage = value; }
        #previewEditor_accessor_storage;
        get previewEditor() { return this.#previewEditor_accessor_storage; }
        set previewEditor(value) { this.#previewEditor_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._previewDoc = null;
            this._previewSpec = SpecProvider.getInstance().getSpec('edgeless:preview');
            this._referencedModel = null;
            this._referenceXYWH = null;
            this._viewportEditor = null;
            this.#_focused_accessor_storage = __runInitializers(this, __focused_initializers, false);
            this.#_surfaceModel_accessor_storage = (__runInitializers(this, __focused_extraInitializers), __runInitializers(this, __surfaceModel_initializers, null));
            this.#captionElement_accessor_storage = (__runInitializers(this, __surfaceModel_extraInitializers), __runInitializers(this, _captionElement_initializers, void 0));
            this.#previewEditor_accessor_storage = (__runInitializers(this, _captionElement_extraInitializers), __runInitializers(this, _previewEditor_initializers, void 0));
            __runInitializers(this, _previewEditor_extraInitializers);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return SurfaceRefBlockComponent = _classThis;
})();
export { SurfaceRefBlockComponent };
//# sourceMappingURL=surface-ref-block.js.map