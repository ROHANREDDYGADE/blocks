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
import { darkToolbarStyles, lightToolbarStyles, } from '@blocksuite/affine-components/toolbar';
import { EditPropsStore, ThemeProvider, } from '@blocksuite/affine-shared/services';
import { requestConnectedFrame, stopPropagation, } from '@blocksuite/affine-shared/utils';
import { WithDisposable } from '@blocksuite/global/utils';
import { baseTheme } from '@toeverything/theme';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { EdgelessDraggableElementController } from '../common/draggable/draggable-element.controller.js';
import { builtInTemplates } from './builtin-templates.js';
import { ArrowIcon, defaultPreview } from './icon.js';
import { cloneDeep } from './utils.js';
let EdgelessTemplatePanel = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __categories_decorators;
    let __categories_initializers = [];
    let __categories_extraInitializers = [];
    let __currentCategory_decorators;
    let __currentCategory_initializers = [];
    let __currentCategory_extraInitializers = [];
    let __loading_decorators;
    let __loading_initializers = [];
    let __loading_extraInitializers = [];
    let __loadingTemplate_decorators;
    let __loadingTemplate_initializers = [];
    let __loadingTemplate_extraInitializers = [];
    let __searchKeyword_decorators;
    let __searchKeyword_initializers = [];
    let __searchKeyword_extraInitializers = [];
    let __templates_decorators;
    let __templates_initializers = [];
    let __templates_extraInitializers = [];
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _isDragging_decorators;
    let _isDragging_initializers = [];
    let _isDragging_extraInitializers = [];
    return class EdgelessTemplatePanel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __categories_decorators = [state()];
            __currentCategory_decorators = [state()];
            __loading_decorators = [state()];
            __loadingTemplate_decorators = [state()];
            __searchKeyword_decorators = [state()];
            __templates_decorators = [state()];
            _edgeless_decorators = [property({ attribute: false })];
            _isDragging_decorators = [state()];
            __esDecorate(this, null, __categories_decorators, { kind: "accessor", name: "_categories", static: false, private: false, access: { has: obj => "_categories" in obj, get: obj => obj._categories, set: (obj, value) => { obj._categories = value; } }, metadata: _metadata }, __categories_initializers, __categories_extraInitializers);
            __esDecorate(this, null, __currentCategory_decorators, { kind: "accessor", name: "_currentCategory", static: false, private: false, access: { has: obj => "_currentCategory" in obj, get: obj => obj._currentCategory, set: (obj, value) => { obj._currentCategory = value; } }, metadata: _metadata }, __currentCategory_initializers, __currentCategory_extraInitializers);
            __esDecorate(this, null, __loading_decorators, { kind: "accessor", name: "_loading", static: false, private: false, access: { has: obj => "_loading" in obj, get: obj => obj._loading, set: (obj, value) => { obj._loading = value; } }, metadata: _metadata }, __loading_initializers, __loading_extraInitializers);
            __esDecorate(this, null, __loadingTemplate_decorators, { kind: "accessor", name: "_loadingTemplate", static: false, private: false, access: { has: obj => "_loadingTemplate" in obj, get: obj => obj._loadingTemplate, set: (obj, value) => { obj._loadingTemplate = value; } }, metadata: _metadata }, __loadingTemplate_initializers, __loadingTemplate_extraInitializers);
            __esDecorate(this, null, __searchKeyword_decorators, { kind: "accessor", name: "_searchKeyword", static: false, private: false, access: { has: obj => "_searchKeyword" in obj, get: obj => obj._searchKeyword, set: (obj, value) => { obj._searchKeyword = value; } }, metadata: _metadata }, __searchKeyword_initializers, __searchKeyword_extraInitializers);
            __esDecorate(this, null, __templates_decorators, { kind: "accessor", name: "_templates", static: false, private: false, access: { has: obj => "_templates" in obj, get: obj => obj._templates, set: (obj, value) => { obj._templates = value; } }, metadata: _metadata }, __templates_initializers, __templates_extraInitializers);
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _isDragging_decorators, { kind: "accessor", name: "isDragging", static: false, private: false, access: { has: obj => "isDragging" in obj, get: obj => obj.isDragging, set: (obj, value) => { obj.isDragging = value; } }, metadata: _metadata }, _isDragging_initializers, _isDragging_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      position: absolute;
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
      z-index: 1;
    }

    .edgeless-templates-panel {
      width: 467px;
      height: 568px;
      border-radius: 12px;
      background-color: var(--affine-background-overlay-panel-color);
      box-shadow: 0px 10px 80px 0px rgba(0, 0, 0, 0.2);

      display: flex;
      flex-direction: column;
    }
    .edgeless-templates-panel[data-app-theme='light'] {
      ${unsafeCSS(lightToolbarStyles.join('\n'))}
    }
    .edgeless-templates-panel[data-app-theme='dark'] {
      ${unsafeCSS(darkToolbarStyles.join('\n'))}
    }

    .search-bar {
      padding: 21px 24px;
      font-size: 18px;
      color: var(--affine-secondary);
      border-bottom: 1px solid var(--affine-divider-color);

      flex-shrink: 0;
    }

    .search-input {
      border: 0;
      color: var(--affine-text-primary-color);
      font-size: 20px;
      background-color: inherit;
      outline: none;
      width: 100%;
    }

    .search-input::placeholder {
      color: var(--affine-text-secondary-color);
    }

    .template-categories {
      display: flex;
      padding: 6px 8px;
      gap: 4px;
      overflow-x: scroll;

      flex-shrink: 0;
    }

    .category-entry {
      color: var(--affine-text-primary-color);
      font-size: 12px;
      font-weight: 600;
      line-height: 20px;
      border-radius: 8px;
      flex-shrink: 0;
      flex-grow: 0;
      width: fit-content;
      padding: 4px 9px;
      cursor: pointer;
    }

    .category-entry.selected,
    .category-entry:hover {
      color: var(--affine-text-primary-color);
      background-color: var(--affine-background-tertiary-color);
    }

    .template-viewport {
      position: relative;
      flex-grow: 1;
    }

    .template-scrollcontent {
      overflow: hidden;
      height: 100%;
      width: 100%;
    }

    .template-list {
      padding: 10px;
      display: flex;
      align-items: flex-start;
      align-content: flex-start;
      gap: 10px 20px;
      flex-wrap: wrap;
    }

    .template-item {
      position: relative;
      width: 135px;
      height: 80px;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.02);
      background-color: var(--affine-background-primary-color);
      border-radius: 4px;
      cursor: pointer;
    }

    .template-item > svg {
      display: block;
      margin: 0 auto;
      width: 135px;
      height: 80px;
      color: var(--affine-background-primary-color);
    }

    /* .template-item:hover::before {
      content: attr(data-hover-text);
      position: absolute;
      display: block;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 110px;
      border-radius: 8px;
      padding: 4px 22px;
      box-sizing: border-box;
      z-index: 1;
      text-align: center;
      font-size: 12px;

      background-color: var(--affine-primary-color);
      color: var(--affine-white);
    } */

    .template-item:hover::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 1px solid var(--affine-black-10);
      border-radius: 4px;
      background-color: var(--affine-hover-color);
    }

    .template-item.loading::before {
      display: none;
    }

    .template-item.loading > affine-template-loading {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .template-item img.template-preview {
      object-fit: contain;
      width: 100%;
      height: 100%;
      display: block;
    }

    .arrow {
      bottom: 0;
      position: absolute;
      transform: translateY(20px);
      color: var(--affine-background-overlay-panel-color);
    }
  `; }
        static { this.templates = builtInTemplates; }
        _closePanel() {
            if (this.isDragging)
                return;
            this.dispatchEvent(new CustomEvent('closepanel'));
        }
        _fetch(fn) {
            if (this._fetchJob) {
                this._fetchJob.cancel();
            }
            this._loading = true;
            const state = { canceled: false };
            const job = {
                cancel: () => {
                    state.canceled = true;
                },
            };
            this._fetchJob = job;
            fn(state)
                .catch(() => { })
                .finally(() => {
                if (!state.canceled && job === this._fetchJob) {
                    this._loading = false;
                    this._fetchJob = null;
                }
            });
        }
        _getLocalSelectedCategory() {
            return this.edgeless.std.get(EditPropsStore).getStorage('templateCache');
        }
        async _initCategory() {
            try {
                this._categories = await EdgelessTemplatePanel.templates.categories();
                this._currentCategory =
                    this._getLocalSelectedCategory() ?? this._categories[0];
                this._updateTemplates();
            }
            catch (e) {
                console.error('Failed to load categories', e);
            }
        }
        _initDragController() {
            if (this.draggableController)
                return;
            this.draggableController = new EdgelessDraggableElementController(this, {
                service: this.edgeless.service,
                edgeless: this.edgeless,
                clickToDrag: true,
                standardWidth: 560,
                onOverlayCreated: overlay => {
                    this.isDragging = true;
                    overlay.mask.style.color = 'transparent';
                },
                onDrop: (el, bound) => {
                    this._insertTemplate(el.data, bound)
                        .finally(() => {
                        this.isDragging = false;
                    })
                        .catch(console.error);
                },
                onCanceled: () => {
                    this.isDragging = false;
                },
            });
        }
        async _insertTemplate(template, bound) {
            this._loadingTemplate = template;
            template = cloneDeep(template);
            const center = {
                x: bound.x + bound.w / 2,
                y: bound.y + bound.h / 2,
            };
            const templateJob = this.edgeless.service.createTemplateJob(template.type, center);
            const service = this.edgeless.service;
            try {
                const { assets } = template;
                if (assets) {
                    await Promise.all(Object.entries(assets).map(([key, value]) => fetch(value)
                        .then(res => res.blob())
                        .then(blob => templateJob.job.assets.set(key, blob))));
                }
                const insertedBound = await templateJob.insertTemplate(template.content);
                if (insertedBound && template.type === 'template') {
                    const padding = 20 / service.viewport.zoom;
                    service.viewport.setViewportByBound(insertedBound, [padding, padding, padding, padding], true);
                }
            }
            finally {
                this._loadingTemplate = null;
                this.edgeless.gfx.tool.setTool('default');
            }
        }
        _updateSearchKeyword(inputEvt) {
            this._searchKeyword = inputEvt.target.value;
            this._updateTemplates();
        }
        _updateTemplates() {
            this._fetch(async (state) => {
                try {
                    const templates = this._searchKeyword
                        ? await EdgelessTemplatePanel.templates.search(this._searchKeyword)
                        : await EdgelessTemplatePanel.templates.list(this._currentCategory);
                    if (state.canceled)
                        return;
                    this._templates = templates;
                }
                catch (e) {
                    if (state.canceled)
                        return;
                    console.error('Failed to load templates', e);
                }
            });
        }
        connectedCallback() {
            super.connectedCallback();
            this._initDragController();
            this.addEventListener('keydown', stopPropagation, false);
            this._disposables.add(() => {
                if (this._currentCategory) {
                    this.edgeless.std
                        .get(EditPropsStore)
                        .setStorage('templateCache', this._currentCategory);
                }
            });
        }
        firstUpdated() {
            requestConnectedFrame(() => {
                this._disposables.addFromEvent(document, 'click', evt => {
                    if (this.contains(evt.target)) {
                        return;
                    }
                    this._closePanel();
                });
            }, this);
            this._disposables.addFromEvent(this, 'click', stopPropagation);
            this._disposables.addFromEvent(this, 'wheel', stopPropagation);
            this._initCategory().catch(() => { });
        }
        render() {
            const { _categories, _currentCategory, _templates } = this;
            const { draggingElement } = this.draggableController?.states || {};
            const appTheme = this.edgeless.std.get(ThemeProvider).app$.value;
            return html `
      <div
        class="edgeless-templates-panel"
        data-app-theme=${appTheme}
        style=${styleMap({
                opacity: this.isDragging ? '0' : '1',
                transition: 'opacity 0.2s',
            })}
      >
        <div class="search-bar">
          <input
            class="search-input"
            type="text"
            placeholder="Search file or anything..."
            @input=${this._updateSearchKeyword}
            @cut=${stopPropagation}
            @copy=${stopPropagation}
            @paste=${stopPropagation}
          />
        </div>
        <div class="template-categories">
          ${repeat(_categories, cate => cate, cate => {
                return html `<div
                class="category-entry ${_currentCategory === cate
                    ? 'selected'
                    : ''}"
                @click=${() => {
                    this._currentCategory = cate;
                    this._updateTemplates();
                }}
              >
                ${cate}
              </div>`;
            })}
        </div>
        <div class="template-viewport">
          <div class="template-scrollcontent" data-scrollable>
            <div class="template-list">
              ${this._loading
                ? html `<affine-template-loading
                    style=${styleMap({
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                })}
                  ></affine-template-loading>`
                : repeat(_templates, template => template.name, template => {
                    const preview = template.preview
                        ? template.preview.startsWith('<svg')
                            ? html `${unsafeSVG(template.preview)}`
                            : html `<img
                              src="${template.preview}"
                              class="template-preview"
                              loading="lazy"
                            />`
                        : defaultPreview;
                    const isBeingDragged = draggingElement &&
                        draggingElement.data.name === template.name;
                    return html `
                        <div
                          class=${`template-item ${template === this._loadingTemplate ? 'loading' : ''}`}
                          style=${styleMap({
                        opacity: isBeingDragged ? '0' : '1',
                    })}
                          data-hover-text="Add"
                          @mousedown=${(e) => this.draggableController.onMouseDown(e, {
                        data: template,
                        preview,
                    })}
                          @touchstart=${(e) => {
                        this.draggableController.onTouchStart(e, {
                            data: template,
                            preview,
                        });
                    }}
                        >
                          ${preview}
                          ${template === this._loadingTemplate
                        ? html `<affine-template-loading></affine-template-loading>`
                        : nothing}
                          ${template.name
                        ? html `<affine-tooltip
                                .offset=${12}
                                tip-position="top"
                              >
                                ${template.name}
                              </affine-tooltip>`
                        : nothing}
                        </div>
                      `;
                })}
            </div>
          </div>
          <overlay-scrollbar></overlay-scrollbar>
        </div>
        <div class="arrow">${ArrowIcon}</div>
      </div>
    `;
        }
        #_categories_accessor_storage;
        get _categories() { return this.#_categories_accessor_storage; }
        set _categories(value) { this.#_categories_accessor_storage = value; }
        #_currentCategory_accessor_storage;
        get _currentCategory() { return this.#_currentCategory_accessor_storage; }
        set _currentCategory(value) { this.#_currentCategory_accessor_storage = value; }
        #_loading_accessor_storage;
        get _loading() { return this.#_loading_accessor_storage; }
        set _loading(value) { this.#_loading_accessor_storage = value; }
        #_loadingTemplate_accessor_storage;
        get _loadingTemplate() { return this.#_loadingTemplate_accessor_storage; }
        set _loadingTemplate(value) { this.#_loadingTemplate_accessor_storage = value; }
        #_searchKeyword_accessor_storage;
        get _searchKeyword() { return this.#_searchKeyword_accessor_storage; }
        set _searchKeyword(value) { this.#_searchKeyword_accessor_storage = value; }
        #_templates_accessor_storage;
        get _templates() { return this.#_templates_accessor_storage; }
        set _templates(value) { this.#_templates_accessor_storage = value; }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #isDragging_accessor_storage;
        get isDragging() { return this.#isDragging_accessor_storage; }
        set isDragging(value) { this.#isDragging_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._fetchJob = null;
            this.#_categories_accessor_storage = __runInitializers(this, __categories_initializers, []);
            this.#_currentCategory_accessor_storage = (__runInitializers(this, __categories_extraInitializers), __runInitializers(this, __currentCategory_initializers, ''));
            this.#_loading_accessor_storage = (__runInitializers(this, __currentCategory_extraInitializers), __runInitializers(this, __loading_initializers, false));
            this.#_loadingTemplate_accessor_storage = (__runInitializers(this, __loading_extraInitializers), __runInitializers(this, __loadingTemplate_initializers, null));
            this.#_searchKeyword_accessor_storage = (__runInitializers(this, __loadingTemplate_extraInitializers), __runInitializers(this, __searchKeyword_initializers, ''));
            this.#_templates_accessor_storage = (__runInitializers(this, __searchKeyword_extraInitializers), __runInitializers(this, __templates_initializers, []));
            this.#edgeless_accessor_storage = (__runInitializers(this, __templates_extraInitializers), __runInitializers(this, _edgeless_initializers, void 0));
            this.#isDragging_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _isDragging_initializers, false));
            __runInitializers(this, _isDragging_extraInitializers);
        }
    };
})();
export { EdgelessTemplatePanel };
//# sourceMappingURL=template-panel.js.map