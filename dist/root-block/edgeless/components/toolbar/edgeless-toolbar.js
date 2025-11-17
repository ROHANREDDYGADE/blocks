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
import { popMenu, popupTargetFromElement, } from '@blocksuite/affine-components/context-menu';
import { ArrowLeftSmallIcon, ArrowRightSmallIcon, MoreHorizontalIcon, } from '@blocksuite/affine-components/icons';
import { darkToolbarStyles, lightToolbarStyles, } from '@blocksuite/affine-components/toolbar';
import { ColorScheme } from '@blocksuite/affine-model';
import { EditPropsStore, ThemeProvider, } from '@blocksuite/affine-shared/services';
import { stopPropagation } from '@blocksuite/affine-shared/utils';
import { WidgetComponent } from '@blocksuite/block-std';
import { GfxControllerIdentifier } from '@blocksuite/block-std/gfx';
import { debounce } from '@blocksuite/global/utils';
import { Slot } from '@blocksuite/store';
import { autoPlacement, offset } from '@floating-ui/dom';
import { ContextProvider } from '@lit/context';
import { baseTheme, cssVar } from '@toeverything/theme';
import { css, html, nothing, unsafeCSS } from 'lit';
import { query, state } from 'lit/decorators.js';
import { cache } from 'lit/directives/cache.js';
import { edgelessToolbarContext, edgelessToolbarSlotsContext, edgelessToolbarThemeContext, } from './context.js';
import { getQuickTools, getSeniorTools } from './tools.js';
const TOOLBAR_PADDING_X = 12;
const TOOLBAR_HEIGHT = 64;
const QUICK_TOOLS_GAP = 10;
const QUICK_TOOL_SIZE = 36;
const QUICK_TOOL_MORE_SIZE = 20;
const SENIOR_TOOLS_GAP = 0;
const SENIOR_TOOL_WIDTH = 96;
const SENIOR_TOOL_NAV_SIZE = 20;
const DIVIDER_WIDTH = 8;
const DIVIDER_SPACE = 8;
const SAFE_AREA_WIDTH = 64;
export const EDGELESS_TOOLBAR_WIDGET = 'edgeless-toolbar-widget';
let EdgelessToolbarWidget = (() => {
    let _classSuper = WidgetComponent;
    let _containerWidth_decorators;
    let _containerWidth_initializers = [];
    let _containerWidth_extraInitializers = [];
    let _presentFrameMenuShow_decorators;
    let _presentFrameMenuShow_initializers = [];
    let _presentFrameMenuShow_extraInitializers = [];
    let _presentSettingMenuShow_decorators;
    let _presentSettingMenuShow_initializers = [];
    let _presentSettingMenuShow_extraInitializers = [];
    let _scrollSeniorToolIndex_decorators;
    let _scrollSeniorToolIndex_initializers = [];
    let _scrollSeniorToolIndex_extraInitializers = [];
    let _toolbarContainer_decorators;
    let _toolbarContainer_initializers = [];
    let _toolbarContainer_extraInitializers = [];
    return class EdgelessToolbarWidget extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _containerWidth_decorators = [state()];
            _presentFrameMenuShow_decorators = [state()];
            _presentSettingMenuShow_decorators = [state()];
            _scrollSeniorToolIndex_decorators = [state()];
            _toolbarContainer_decorators = [query('.edgeless-toolbar-container')];
            __esDecorate(this, null, _containerWidth_decorators, { kind: "accessor", name: "containerWidth", static: false, private: false, access: { has: obj => "containerWidth" in obj, get: obj => obj.containerWidth, set: (obj, value) => { obj.containerWidth = value; } }, metadata: _metadata }, _containerWidth_initializers, _containerWidth_extraInitializers);
            __esDecorate(this, null, _presentFrameMenuShow_decorators, { kind: "accessor", name: "presentFrameMenuShow", static: false, private: false, access: { has: obj => "presentFrameMenuShow" in obj, get: obj => obj.presentFrameMenuShow, set: (obj, value) => { obj.presentFrameMenuShow = value; } }, metadata: _metadata }, _presentFrameMenuShow_initializers, _presentFrameMenuShow_extraInitializers);
            __esDecorate(this, null, _presentSettingMenuShow_decorators, { kind: "accessor", name: "presentSettingMenuShow", static: false, private: false, access: { has: obj => "presentSettingMenuShow" in obj, get: obj => obj.presentSettingMenuShow, set: (obj, value) => { obj.presentSettingMenuShow = value; } }, metadata: _metadata }, _presentSettingMenuShow_initializers, _presentSettingMenuShow_extraInitializers);
            __esDecorate(this, null, _scrollSeniorToolIndex_decorators, { kind: "accessor", name: "scrollSeniorToolIndex", static: false, private: false, access: { has: obj => "scrollSeniorToolIndex" in obj, get: obj => obj.scrollSeniorToolIndex, set: (obj, value) => { obj.scrollSeniorToolIndex = value; } }, metadata: _metadata }, _scrollSeniorToolIndex_initializers, _scrollSeniorToolIndex_extraInitializers);
            __esDecorate(this, null, _toolbarContainer_decorators, { kind: "accessor", name: "toolbarContainer", static: false, private: false, access: { has: obj => "toolbarContainer" in obj, get: obj => obj.toolbarContainer, set: (obj, value) => { obj.toolbarContainer = value; } }, metadata: _metadata }, _toolbarContainer_initializers, _toolbarContainer_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
      position: absolute;
      z-index: 1;
      left: calc(50%);
      transform: translateX(-50%);
      bottom: 0;
      -webkit-user-select: none;
      user-select: none;
      width: 100%;
      pointer-events: none;
    }
    .edgeless-toolbar-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .edgeless-toolbar-wrapper[data-app-theme='light'] {
      ${unsafeCSS(lightToolbarStyles.join('\n'))}
    }
    .edgeless-toolbar-wrapper[data-app-theme='dark'] {
      ${unsafeCSS(darkToolbarStyles.join('\n'))}
    }
    .edgeless-toolbar-toggle-control {
      pointer-events: auto;
      padding-bottom: 16px;
      width: fit-content;
      max-width: calc(100% - ${unsafeCSS(SAFE_AREA_WIDTH)}px * 2);
      min-width: 264px;
    }
    .edgeless-toolbar-toggle-control[data-enable='true'] {
      transition: 0.23s ease;
      padding-top: 100px;
      transform: translateY(100px);
    }
    .edgeless-toolbar-toggle-control[data-enable='true']:hover {
      padding-top: 0;
      transform: translateY(0);
    }

    .edgeless-toolbar-smooth-corner {
      display: block;
      width: fit-content;
      max-width: 100%;
    }
    .edgeless-toolbar-container {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 ${unsafeCSS(TOOLBAR_PADDING_X)}px;
      height: ${unsafeCSS(TOOLBAR_HEIGHT)}px;
    }
    :host([disabled]) .edgeless-toolbar-container {
      pointer-events: none;
    }
    .edgeless-toolbar-container[level='second'] {
      position: absolute;
      bottom: 8px;
      transform: translateY(-100%);
    }
    .edgeless-toolbar-container[hidden] {
      display: none;
    }
    .quick-tools {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${unsafeCSS(QUICK_TOOLS_GAP)}px;
    }
    .full-divider {
      width: ${unsafeCSS(DIVIDER_WIDTH)}px;
      height: 100%;
      margin: 0 ${unsafeCSS(DIVIDER_SPACE)}px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .full-divider::after {
      content: '';
      display: block;
      width: 1px;
      height: 100%;
      background-color: var(--affine-border-color);
    }
    .brush-and-eraser {
      display: flex;
      height: 100%;
      gap: 4px;
      justify-content: center;
    }
    .senior-tools {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${unsafeCSS(SENIOR_TOOLS_GAP)}px;
      height: 100%;
      min-width: ${unsafeCSS(SENIOR_TOOL_WIDTH)}px;
    }
    .quick-tool-item {
      width: ${unsafeCSS(QUICK_TOOL_SIZE)}px;
      height: ${unsafeCSS(QUICK_TOOL_SIZE)}px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }
    .quick-tool-more {
      width: 0;
      height: ${unsafeCSS(QUICK_TOOL_SIZE)}px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.23s ease;
      overflow: hidden;
    }
    [data-dense-quick='true'] .quick-tool-more {
      width: ${unsafeCSS(QUICK_TOOL_MORE_SIZE)}px;
      margin-left: ${unsafeCSS(DIVIDER_SPACE)}px;
    }
    .quick-tool-more-button {
      padding: 0;
    }

    .senior-tool-item {
      width: ${unsafeCSS(SENIOR_TOOL_WIDTH)}px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }
    .senior-nav-button-wrapper {
      flex-shrink: 0;
      width: 0px;
      height: ${unsafeCSS(SENIOR_TOOL_NAV_SIZE)}px;
      transition: width 0.23s ease;
      overflow: hidden;
    }
    .senior-nav-button {
      padding: 0;
    }
    .senior-nav-button svg {
      width: 20px;
      height: 20px;
    }
    [data-dense-senior='true'] .senior-nav-button-wrapper {
      width: ${unsafeCSS(SENIOR_TOOL_NAV_SIZE)}px;
    }
    [data-dense-senior='true'] .senior-nav-button-wrapper.prev {
      margin-right: ${unsafeCSS(DIVIDER_SPACE)}px;
    }
    [data-dense-senior='true'] .senior-nav-button-wrapper.next {
      margin-left: ${unsafeCSS(DIVIDER_SPACE)}px;
    }
    .transform-button svg {
      transition: 0.3s ease-in-out;
    }
    .transform-button:hover svg {
      transform: scale(1.15);
    }
  `; }
        #containerWidth_accessor_storage;
        get containerWidth() { return this.#containerWidth_accessor_storage; }
        set containerWidth(value) { this.#containerWidth_accessor_storage = value; }
        // calculate all the width manually
        get _availableWidth() {
            return this.containerWidth - 2 * SAFE_AREA_WIDTH;
        }
        get _cachedPresentHideToolbar() {
            return !!this.std.get(EditPropsStore).getStorage('presentHideToolbar');
        }
        get _denseQuickTools() {
            return (this._availableWidth -
                this._seniorToolNavWidth -
                1 * SENIOR_TOOL_WIDTH -
                2 * TOOLBAR_PADDING_X <
                this._quickToolsWidthTotal);
        }
        get _denseSeniorTools() {
            return (this._availableWidth -
                this._quickToolsWidthTotal -
                this._spaceWidthTotal <
                this._seniorToolsWidthTotal);
        }
        /**
         * When enabled, the toolbar will auto-hide when the mouse is not over it.
         */
        get _enableAutoHide() {
            return (this.isPresentMode &&
                this._cachedPresentHideToolbar &&
                !this.presentSettingMenuShow &&
                !this.presentFrameMenuShow);
        }
        get _hiddenQuickTools() {
            return this._quickTools
                .slice(this._visibleQuickToolSize)
                .filter(tool => !!tool.menu);
        }
        get _quickTools() {
            return getQuickTools({ edgeless: this.block });
        }
        get _quickToolsWidthTotal() {
            return (this._quickTools.length * (QUICK_TOOL_SIZE + QUICK_TOOLS_GAP) -
                QUICK_TOOLS_GAP);
        }
        get _seniorNextTooltip() {
            if (this._seniorScrollNextDisabled)
                return '';
            const nextTool = this._seniorTools[this.scrollSeniorToolIndex + this.scrollSeniorToolSize];
            return nextTool?.name ?? '';
        }
        get _seniorPrevTooltip() {
            if (this._seniorScrollPrevDisabled)
                return '';
            const prevTool = this._seniorTools[this.scrollSeniorToolIndex - 1];
            return prevTool?.name ?? '';
        }
        get _seniorScrollNextDisabled() {
            return (this.scrollSeniorToolIndex + this.scrollSeniorToolSize >=
                this._seniorTools.length);
        }
        get _seniorScrollPrevDisabled() {
            return this.scrollSeniorToolIndex === 0;
        }
        get _seniorToolNavWidth() {
            return this._denseSeniorTools
                ? (SENIOR_TOOL_NAV_SIZE + DIVIDER_SPACE) * 2
                : 0;
        }
        get _seniorTools() {
            return getSeniorTools({
                edgeless: this.block,
                toolbarContainer: this.toolbarContainer,
            });
        }
        get _seniorToolsWidthTotal() {
            return (this._seniorTools.length * (SENIOR_TOOL_WIDTH + SENIOR_TOOLS_GAP) -
                SENIOR_TOOLS_GAP);
        }
        get _spaceWidthTotal() {
            return DIVIDER_WIDTH + DIVIDER_SPACE * 2 + TOOLBAR_PADDING_X * 2;
        }
        get _visibleQuickToolSize() {
            if (!this._denseQuickTools)
                return this._quickTools.length;
            const availableWidth = this._availableWidth -
                this._seniorToolNavWidth -
                this._spaceWidthTotal -
                SENIOR_TOOL_WIDTH;
            return Math.max(1, Math.floor((availableWidth - QUICK_TOOL_MORE_SIZE - DIVIDER_SPACE) /
                (QUICK_TOOL_SIZE + QUICK_TOOLS_GAP)));
        }
        get edgelessTool() {
            return this.gfx.tool.currentToolOption$.value;
        }
        get gfx() {
            return this.std.get(GfxControllerIdentifier);
        }
        get isPresentMode() {
            return this.edgelessTool.type === 'frameNavigator';
        }
        get scrollSeniorToolSize() {
            if (this._denseQuickTools)
                return 1;
            const seniorAvailableWidth = this._availableWidth - this._quickToolsWidthTotal - this._spaceWidthTotal;
            if (seniorAvailableWidth >= this._seniorToolsWidthTotal)
                return this._seniorTools.length;
            return (Math.floor((seniorAvailableWidth - (SENIOR_TOOL_NAV_SIZE + DIVIDER_SPACE) * 2) /
                SENIOR_TOOL_WIDTH) || 1);
        }
        get slots() {
            return this._slotsProvider.value;
        }
        constructor() {
            super();
            this._moreQuickToolsMenu = null;
            this._moreQuickToolsMenuRef = null;
            this.#containerWidth_accessor_storage = __runInitializers(this, _containerWidth_initializers, 1920);
            this._onContainerResize = (__runInitializers(this, _containerWidth_extraInitializers), debounce(({ w }) => {
                if (!this.isConnected)
                    return;
                this.slots.resize.emit({ w, h: TOOLBAR_HEIGHT });
                this.containerWidth = w;
                if (this._denseSeniorTools) {
                    this.scrollSeniorToolIndex = Math.min(this._seniorTools.length - this.scrollSeniorToolSize, this.scrollSeniorToolIndex);
                }
                else {
                    this.scrollSeniorToolIndex = 0;
                }
                if (this._denseQuickTools &&
                    this._moreQuickToolsMenu &&
                    this._moreQuickToolsMenuRef) {
                    this._moreQuickToolsMenu.close();
                    this._openMoreQuickToolsMenu({
                        currentTarget: this._moreQuickToolsMenuRef,
                    });
                }
                if (!this._denseQuickTools && this._moreQuickToolsMenu) {
                    this._moreQuickToolsMenu.close();
                    this._moreQuickToolsMenu = null;
                }
            }, 300));
            this._resizeObserver = null;
            this._slotsProvider = new ContextProvider(this, {
                context: edgelessToolbarSlotsContext,
                initialValue: { resize: new Slot() },
            });
            this._themeProvider = new ContextProvider(this, {
                context: edgelessToolbarThemeContext,
                initialValue: ColorScheme.Light,
            });
            this._toolbarProvider = new ContextProvider(this, {
                context: edgelessToolbarContext,
                initialValue: this,
            });
            this.activePopper = null;
            this.#presentFrameMenuShow_accessor_storage = __runInitializers(this, _presentFrameMenuShow_initializers, false);
            this.#presentSettingMenuShow_accessor_storage = (__runInitializers(this, _presentFrameMenuShow_extraInitializers), __runInitializers(this, _presentSettingMenuShow_initializers, false));
            this.#scrollSeniorToolIndex_accessor_storage = (__runInitializers(this, _presentSettingMenuShow_extraInitializers), __runInitializers(this, _scrollSeniorToolIndex_initializers, 0));
            this.#toolbarContainer_accessor_storage = (__runInitializers(this, _scrollSeniorToolIndex_extraInitializers), __runInitializers(this, _toolbarContainer_initializers, void 0));
            __runInitializers(this, _toolbarContainer_extraInitializers);
        }
        _onSeniorNavNext() {
            if (this._seniorScrollNextDisabled)
                return;
            this.scrollSeniorToolIndex = Math.min(this._seniorTools.length - this.scrollSeniorToolSize, this.scrollSeniorToolIndex + this.scrollSeniorToolSize);
        }
        _onSeniorNavPrev() {
            if (this._seniorScrollPrevDisabled)
                return;
            this.scrollSeniorToolIndex = Math.max(0, this.scrollSeniorToolIndex - this.scrollSeniorToolSize);
        }
        _openMoreQuickToolsMenu(e) {
            if (!this._hiddenQuickTools.length)
                return;
            this._moreQuickToolsMenuRef = e.currentTarget;
            this._moreQuickToolsMenu = popMenu(popupTargetFromElement(e.currentTarget), {
                middleware: [
                    autoPlacement({
                        allowedPlacements: ['top'],
                    }),
                    offset({
                        mainAxis: (TOOLBAR_HEIGHT - QUICK_TOOL_MORE_SIZE) / 2 + 8,
                    }),
                ],
                options: {
                    onClose: () => {
                        this._moreQuickToolsMenu = null;
                        this._moreQuickToolsMenuRef = null;
                    },
                    items: this._hiddenQuickTools.map(tool => tool.menu),
                },
            });
        }
        _renderContent() {
            return html `
      <div class="quick-tools">
        ${this._quickTools
                .slice(0, this._visibleQuickToolSize)
                .map(tool => html `<div class="quick-tool-item">${tool.content}</div>`)}
      </div>
      <div class="quick-tool-more">
        <icon-button
          ?disabled=${!this._denseQuickTools}
          .size=${20}
          class="quick-tool-more-button"
          @click=${this._openMoreQuickToolsMenu}
          ?active=${this._quickTools
                .slice(this._visibleQuickToolSize)
                .some(tool => tool.type === this.edgelessTool?.type)}
        >
          ${MoreHorizontalIcon}
          <affine-tooltip tip-position="top" .offset=${25}>
            More Tools
          </affine-tooltip>
        </icon-button>
      </div>
      <div class="full-divider"></div>
      <div class="senior-nav-button-wrapper prev">
        <icon-button
          .size=${20}
          class="senior-nav-button"
          ?disabled=${this._seniorScrollPrevDisabled}
          @click=${this._onSeniorNavPrev}
        >
          ${ArrowLeftSmallIcon}
          ${cache(this._seniorPrevTooltip
                ? html ` <affine-tooltip tip-position="top" .offset=${4}>
                  ${this._seniorPrevTooltip}
                </affine-tooltip>`
                : nothing)}
        </icon-button>
      </div>
      <div class="senior-tools">
        ${this._seniorTools
                .slice(this.scrollSeniorToolIndex, this.scrollSeniorToolIndex + this.scrollSeniorToolSize)
                .map(tool => html `<div class="senior-tool-item">${tool.content}</div>`)}
      </div>
      <div class="senior-nav-button-wrapper next">
        <icon-button
          .size=${20}
          class="senior-nav-button"
          ?disabled=${this._seniorScrollNextDisabled}
          @click=${this._onSeniorNavNext}
        >
          ${ArrowRightSmallIcon}
          ${cache(this._seniorNextTooltip
                ? html ` <affine-tooltip tip-position="top" .offset=${4}>
                  ${this._seniorNextTooltip}
                </affine-tooltip>`
                : nothing)}
        </icon-button>
      </div>
    `;
        }
        connectedCallback() {
            super.connectedCallback();
            this._toolbarProvider.setValue(this);
            this._resizeObserver = new ResizeObserver(entries => {
                for (const entry of entries) {
                    const { width } = entry.contentRect;
                    this._onContainerResize({ w: width });
                }
            });
            this._resizeObserver.observe(this);
            this.disposables.add(this.std
                .get(ThemeProvider)
                .theme$.subscribe(mode => this._themeProvider.setValue(mode)));
            this._disposables.add(this.block.bindHotKey({
                Escape: () => {
                    if (this.gfx.selection.editing)
                        return;
                    if (this.edgelessTool.type === 'frameNavigator')
                        return;
                    if (this.edgelessTool.type === 'default') {
                        if (this.activePopper) {
                            this.activePopper.dispose();
                            this.activePopper = null;
                        }
                        return;
                    }
                    this.gfx.tool.setTool('default');
                },
            }, { global: true }));
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            if (this._resizeObserver) {
                this._resizeObserver.disconnect();
            }
        }
        firstUpdated() {
            const { _disposables, block, gfx } = this;
            _disposables.add(gfx.viewport.viewportUpdated.on(() => this.requestUpdate()));
            _disposables.add(block.slots.readonlyUpdated.on(() => {
                this.requestUpdate();
            }));
            _disposables.add(block.slots.toolbarLocked.on(disabled => {
                this.toggleAttribute('disabled', disabled);
            }));
            // This state from `editPropsStore` is not reactive,
            // if the value is updated outside of this component, it will not be reflected.
            _disposables.add(this.std.get(EditPropsStore).slots.storageUpdated.on(({ key }) => {
                if (key === 'presentHideToolbar') {
                    this.requestUpdate();
                }
            }));
        }
        render() {
            const { type } = this.edgelessTool || {};
            if (this.doc.readonly && type !== 'frameNavigator') {
                return nothing;
            }
            const appTheme = this.std.get(ThemeProvider).app$.value;
            return html `
      <div class="edgeless-toolbar-wrapper" data-app-theme=${appTheme}>
        <div
          class="edgeless-toolbar-toggle-control"
          data-enable=${this._enableAutoHide}
        >
          <smooth-corner
            class="edgeless-toolbar-smooth-corner"
            .borderRadius=${16}
            .smooth=${0.7}
            .borderWidth=${1}
            .bgColor=${'var(--affine-background-overlay-panel-color)'}
            .borderColor=${'var(--affine-border-color)'}
            style="filter: drop-shadow(${cssVar('toolbarShadow')})"
          >
            <div
              class="edgeless-toolbar-container"
              data-dense-quick=${this._denseQuickTools &&
                this._hiddenQuickTools.length > 0}
              data-dense-senior=${this._denseSeniorTools}
              @dblclick=${stopPropagation}
              @mousedown=${stopPropagation}
              @pointerdown=${stopPropagation}
            >
              <presentation-toolbar
                .visible=${this.isPresentMode}
                .edgeless=${this.block}
                .settingMenuShow=${this.presentSettingMenuShow}
                .frameMenuShow=${this.presentFrameMenuShow}
                .setSettingMenuShow=${(show) => (this.presentSettingMenuShow = show)}
                .setFrameMenuShow=${(show) => (this.presentFrameMenuShow = show)}
                .containerWidth=${this.containerWidth}
              ></presentation-toolbar>
              ${this.isPresentMode ? nothing : this._renderContent()}
            </div>
          </smooth-corner>
        </div>
      </div>
    `;
        }
        #presentFrameMenuShow_accessor_storage;
        get presentFrameMenuShow() { return this.#presentFrameMenuShow_accessor_storage; }
        set presentFrameMenuShow(value) { this.#presentFrameMenuShow_accessor_storage = value; }
        #presentSettingMenuShow_accessor_storage;
        get presentSettingMenuShow() { return this.#presentSettingMenuShow_accessor_storage; }
        set presentSettingMenuShow(value) { this.#presentSettingMenuShow_accessor_storage = value; }
        #scrollSeniorToolIndex_accessor_storage;
        get scrollSeniorToolIndex() { return this.#scrollSeniorToolIndex_accessor_storage; }
        set scrollSeniorToolIndex(value) { this.#scrollSeniorToolIndex_accessor_storage = value; }
        #toolbarContainer_accessor_storage;
        get toolbarContainer() { return this.#toolbarContainer_accessor_storage; }
        set toolbarContainer(value) { this.#toolbarContainer_accessor_storage = value; }
    };
})();
export { EdgelessToolbarWidget };
//# sourceMappingURL=edgeless-toolbar.js.map