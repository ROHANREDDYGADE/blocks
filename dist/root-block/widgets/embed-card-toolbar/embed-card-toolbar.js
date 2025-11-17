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
import { getDocContentWithMaxLength } from '@blocksuite/affine-block-embed';
import { CaptionIcon, CenterPeekIcon, CopyIcon, EditIcon, ExpandFullSmallIcon, MoreVerticalIcon, OpenIcon, PaletteIcon, SmallArrowDownIcon, } from '@blocksuite/affine-components/icons';
import { notifyLinkedDocSwitchedToEmbed } from '@blocksuite/affine-components/notification';
import { isPeekable, peek } from '@blocksuite/affine-components/peek';
import { toast } from '@blocksuite/affine-components/toast';
import { cloneGroups, renderGroups, renderToolbarSeparator, } from '@blocksuite/affine-components/toolbar';
import { BookmarkStyles, } from '@blocksuite/affine-model';
import { EmbedOptionProvider, GenerateDocUrlProvider, TelemetryProvider, ThemeProvider, } from '@blocksuite/affine-shared/services';
import { getHostName, referenceToNode } from '@blocksuite/affine-shared/utils';
import { WidgetComponent } from '@blocksuite/block-std';
import { DocCollection } from '@blocksuite/store';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { html, nothing } from 'lit';
import { query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { join } from 'lit/directives/join.js';
import { repeat } from 'lit/directives/repeat.js';
import { toggleEmbedCardCaptionEditModal } from '../../../_common/components/embed-card/modal/embed-card-caption-edit-modal.js';
import { toggleEmbedCardEditModal } from '../../../_common/components/embed-card/modal/embed-card-edit-modal.js';
import { isEmbedCardBlockComponent, isInternalEmbedModel, } from '../../../_common/components/embed-card/type.js';
import { getEmbedCardIcons } from '../../../_common/utils/url.js';
import { getMoreMenuConfig } from '../../configs/toolbar.js';
import { isBookmarkBlock, isEmbedGithubBlock, isEmbedHtmlBlock, isEmbedLinkedDocBlock, isEmbedSyncedDocBlock, } from '../../edgeless/utils/query.js';
import { BUILT_IN_GROUPS } from './config.js';
import { EmbedCardToolbarContext } from './context.js';
import { embedCardToolbarStyle } from './styles.js';
export const AFFINE_EMBED_CARD_TOOLBAR_WIDGET = 'affine-embed-card-toolbar';
let EmbedCardToolbar = (() => {
    let _classSuper = WidgetComponent;
    let _cardStyleButton_decorators;
    let _cardStyleButton_initializers = [];
    let _cardStyleButton_extraInitializers = [];
    let _embedCardToolbarElement_decorators;
    let _embedCardToolbarElement_initializers = [];
    let _embedCardToolbarElement_extraInitializers = [];
    let _focusBlock_decorators;
    let _focusBlock_initializers = [];
    let _focusBlock_extraInitializers = [];
    let _hide_decorators;
    let _hide_initializers = [];
    let _hide_extraInitializers = [];
    let _moreButton_decorators;
    let _moreButton_initializers = [];
    let _moreButton_extraInitializers = [];
    return class EmbedCardToolbar extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _cardStyleButton_decorators = [query('.embed-card-toolbar-button.card-style')];
            _embedCardToolbarElement_decorators = [query('.embed-card-toolbar')];
            _focusBlock_decorators = [state()];
            _hide_decorators = [state()];
            _moreButton_decorators = [query('.embed-card-toolbar-button.more-button')];
            __esDecorate(this, null, _cardStyleButton_decorators, { kind: "accessor", name: "cardStyleButton", static: false, private: false, access: { has: obj => "cardStyleButton" in obj, get: obj => obj.cardStyleButton, set: (obj, value) => { obj.cardStyleButton = value; } }, metadata: _metadata }, _cardStyleButton_initializers, _cardStyleButton_extraInitializers);
            __esDecorate(this, null, _embedCardToolbarElement_decorators, { kind: "accessor", name: "embedCardToolbarElement", static: false, private: false, access: { has: obj => "embedCardToolbarElement" in obj, get: obj => obj.embedCardToolbarElement, set: (obj, value) => { obj.embedCardToolbarElement = value; } }, metadata: _metadata }, _embedCardToolbarElement_initializers, _embedCardToolbarElement_extraInitializers);
            __esDecorate(this, null, _focusBlock_decorators, { kind: "accessor", name: "focusBlock", static: false, private: false, access: { has: obj => "focusBlock" in obj, get: obj => obj.focusBlock, set: (obj, value) => { obj.focusBlock = value; } }, metadata: _metadata }, _focusBlock_initializers, _focusBlock_extraInitializers);
            __esDecorate(this, null, _hide_decorators, { kind: "accessor", name: "hide", static: false, private: false, access: { has: obj => "hide" in obj, get: obj => obj.hide, set: (obj, value) => { obj.hide = value; } }, metadata: _metadata }, _hide_initializers, _hide_extraInitializers);
            __esDecorate(this, null, _moreButton_decorators, { kind: "accessor", name: "moreButton", static: false, private: false, access: { has: obj => "moreButton" in obj, get: obj => obj.moreButton, set: (obj, value) => { obj.moreButton = value; } }, metadata: _metadata }, _moreButton_initializers, _moreButton_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = embedCardToolbarStyle; }
        get _canConvertToEmbedView() {
            // synced doc entry controlled by awareness flag
            if (this.focusModel && isEmbedLinkedDocBlock(this.focusModel)) {
                const isSyncedDocEnabled = this.doc.awarenessStore.getFlag('enable_synced_doc_block');
                if (!isSyncedDocEnabled) {
                    return false;
                }
            }
            if (!this.focusBlock)
                return false;
            return ('convertToEmbed' in this.focusBlock ||
                this._embedOptions?.viewType === 'embed');
        }
        get _canShowUrlOptions() {
            return this.focusModel && 'url' in this.focusModel && this._isCardView;
        }
        get _embedViewButtonDisabled() {
            if (this.doc.readonly) {
                return true;
            }
            return (this.focusModel &&
                this.focusBlock &&
                isEmbedLinkedDocBlock(this.focusModel) &&
                (referenceToNode(this.focusModel) ||
                    !!this.focusBlock.closest('affine-embed-synced-doc-block') ||
                    this.focusModel.pageId === this.doc.id));
        }
        get _isCardView() {
            return (this.focusModel &&
                (isBookmarkBlock(this.focusModel) ||
                    isEmbedLinkedDocBlock(this.focusModel) ||
                    this._embedOptions?.viewType === 'card'));
        }
        get _isEmbedView() {
            return (this.focusModel &&
                !isBookmarkBlock(this.focusModel) &&
                (isEmbedSyncedDocBlock(this.focusModel) ||
                    this._embedOptions?.viewType === 'embed'));
        }
        get _openButtonDisabled() {
            return (this.focusModel &&
                isEmbedLinkedDocBlock(this.focusModel) &&
                this.focusModel.pageId === this.doc.id);
        }
        get _originalDocInfo() {
            const model = this.focusModel;
            if (!model)
                return undefined;
            const doc = isInternalEmbedModel(model)
                ? this.std.collection.getDoc(model.pageId)
                : null;
            if (doc) {
                const title = doc.meta?.title;
                const description = isEmbedLinkedDocBlock(model)
                    ? getDocContentWithMaxLength(doc)
                    : undefined;
                return { title, description };
            }
            return undefined;
        }
        get _originalDocTitle() {
            const model = this.focusModel;
            if (!model)
                return undefined;
            const doc = isInternalEmbedModel(model)
                ? this.std.collection.getDoc(model.pageId)
                : null;
            return doc?.meta?.title || 'Untitled';
        }
        get _selection() {
            return this.host.selection;
        }
        get _viewType() {
            if (this._isCardView) {
                return 'card';
            }
            if (this._isEmbedView) {
                return 'embed';
            }
            return 'inline';
        }
        get focusModel() {
            return this.focusBlock?.model;
        }
        _canShowCardStylePanel(model) {
            return (isBookmarkBlock(model) ||
                isEmbedGithubBlock(model) ||
                isEmbedLinkedDocBlock(model));
        }
        _cardStyleSelector() {
            const model = this.focusModel;
            if (!model)
                return nothing;
            if (!this._canShowCardStylePanel(model))
                return nothing;
            const theme = this.std.get(ThemeProvider).theme;
            const { EmbedCardHorizontalIcon, EmbedCardListIcon } = getEmbedCardIcons(theme);
            const buttons = [
                {
                    type: 'horizontal',
                    label: 'Large horizontal style',
                    icon: EmbedCardHorizontalIcon,
                },
                {
                    type: 'list',
                    label: 'Small horizontal style',
                    icon: EmbedCardListIcon,
                },
            ];
            return html `
      <editor-menu-button
        class="card-style-select"
        .contentPadding=${'8px'}
        .button=${html `
          <editor-icon-button aria-label="Card style" .tooltip=${'Card style'}>
            ${PaletteIcon}
          </editor-icon-button>
        `}
        @toggle=${this._toggleCardStyleSelector}
      >
        <div>
          ${repeat(buttons, button => button.type, ({ type, label, icon }) => html `
              <icon-button
                width="76px"
                height="76px"
                aria-label=${label}
                class=${classMap({
                selected: model.style === type,
            })}
                @click=${() => this._setEmbedCardStyle(type)}
              >
                ${icon}
                <affine-tooltip .offset=${4}>${label}</affine-tooltip>
              </icon-button>
            `)}
        </div>
      </editor-menu-button>
    `;
        }
        _convertToCardView() {
            if (this._isCardView) {
                return;
            }
            if (!this.focusBlock) {
                return;
            }
            if ('convertToCard' in this.focusBlock) {
                this.focusBlock.convertToCard();
                return;
            }
            if (!this.focusModel || !('url' in this.focusModel)) {
                return;
            }
            const targetModel = this.focusModel;
            const { doc, url, style, caption } = targetModel;
            let targetFlavour = 'affine:bookmark', targetStyle = style;
            if (this._embedOptions && this._embedOptions.viewType === 'card') {
                const { flavour, styles } = this._embedOptions;
                targetFlavour = flavour;
                targetStyle = styles.includes(style) ? style : styles[0];
            }
            else {
                targetStyle = BookmarkStyles.includes(style)
                    ? style
                    : BookmarkStyles.filter(style => style !== 'vertical' && style !== 'cube')[0];
            }
            const parent = doc.getParent(targetModel);
            if (!parent)
                return;
            const index = parent.children.indexOf(targetModel);
            doc.addBlock(targetFlavour, { url, style: targetStyle, caption }, parent, index);
            this.std.selection.setGroup('note', []);
            doc.deleteBlock(targetModel);
        }
        _convertToEmbedView() {
            if (this._isEmbedView) {
                return;
            }
            if (!this.focusBlock) {
                return;
            }
            if ('convertToEmbed' in this.focusBlock) {
                const referenceInfo = this.focusBlock.referenceInfo$.peek();
                this.focusBlock.convertToEmbed();
                if (referenceInfo.title || referenceInfo.description) {
                    notifyLinkedDocSwitchedToEmbed(this.std);
                }
                return;
            }
            if (!this.focusModel || !('url' in this.focusModel)) {
                return;
            }
            const targetModel = this.focusModel;
            const { doc, url, style, caption } = targetModel;
            if (!this._embedOptions || this._embedOptions.viewType !== 'embed') {
                return;
            }
            const { flavour, styles } = this._embedOptions;
            const targetStyle = styles.includes(style)
                ? style
                : styles.filter(style => style !== 'vertical' && style !== 'cube')[0];
            const parent = doc.getParent(targetModel);
            if (!parent)
                return;
            const index = parent.children.indexOf(targetModel);
            doc.addBlock(flavour, { url, style: targetStyle, caption }, parent, index);
            this.std.selection.setGroup('note', []);
            doc.deleteBlock(targetModel);
        }
        _hide() {
            this._resetAbortController();
            this.focusBlock = null;
            this.hide = true;
        }
        _moreActions() {
            if (!this.focusBlock)
                return nothing;
            const context = new EmbedCardToolbarContext(this.focusBlock, this._abortController);
            return renderGroups(this.moreGroups, context);
        }
        _openMenuButton() {
            const buttons = [];
            if (this.focusModel &&
                (isEmbedLinkedDocBlock(this.focusModel) ||
                    isEmbedSyncedDocBlock(this.focusModel))) {
                buttons.push({
                    type: 'open-this-doc',
                    label: 'Open this doc',
                    icon: ExpandFullSmallIcon,
                    action: () => this.focusBlock?.open(),
                });
            }
            // open in new tab
            const element = this.focusBlock;
            if (element && isPeekable(element)) {
                buttons.push({
                    type: 'open-in-center-peek',
                    label: 'Open in center peek',
                    icon: CenterPeekIcon,
                    action: () => peek(element),
                });
            }
            // open in split view
            if (buttons.length === 0) {
                return nothing;
            }
            return html `
      <editor-menu-button
        .contentPadding=${'8px'}
        .button=${html `
          <editor-icon-button
            aria-label="Open"
            .justify=${'space-between'}
            .labelHeight=${'20px'}
          >
            ${OpenIcon}${SmallArrowDownIcon}
          </editor-icon-button>
        `}
      >
        <div data-size="small" data-orientation="vertical">
          ${repeat(buttons, button => button.label, ({ label, icon, action, disabled }) => html `
              <editor-menu-action
                aria-label=${ifDefined(label)}
                ?disabled=${disabled}
                @click=${action}
              >
                ${icon}<span class="label">${label}</span>
              </editor-menu-action>
            `)}
        </div>
      </editor-menu-button>
    `;
        }
        _setEmbedCardStyle(style) {
            const model = this.focusModel;
            if (!model)
                return;
            model.doc.updateBlock(model, { style });
            this.requestUpdate();
            this._abortController.abort();
            track(this.std, model, this._viewType, 'SelectedCardStyle', {
                control: 'select card style',
                type: style,
            });
        }
        _show() {
            if (!this.focusBlock) {
                return;
            }
            this.hide = false;
            this._abortController.signal.addEventListener('abort', autoUpdate(this.focusBlock, this, () => {
                if (!this.focusBlock) {
                    return;
                }
                computePosition(this.focusBlock, this, {
                    placement: 'top-start',
                    middleware: [flip(), offset(8)],
                })
                    .then(({ x, y }) => {
                    this.style.left = `${x}px`;
                    this.style.top = `${y}px`;
                })
                    .catch(console.error);
            }));
        }
        _turnIntoInlineView() {
            if (this.focusBlock && 'covertToInline' in this.focusBlock) {
                this.focusBlock.covertToInline();
                return;
            }
            if (!this.focusModel || !('url' in this.focusModel)) {
                return;
            }
            const targetModel = this.focusModel;
            const { doc, title, caption, url } = targetModel;
            const parent = doc.getParent(targetModel);
            const index = parent?.children.indexOf(targetModel);
            const yText = new DocCollection.Y.Text();
            const insert = title || caption || url;
            yText.insert(0, insert);
            yText.format(0, insert.length, { link: url });
            const text = new doc.Text(yText);
            doc.addBlock('affine:paragraph', {
                text,
            }, parent, index);
            doc.deleteBlock(targetModel);
        }
        _viewSelector() {
            const buttons = [];
            buttons.push({
                type: 'inline',
                label: 'Inline view',
                action: () => this._turnIntoInlineView(),
                disabled: this.doc.readonly,
            });
            buttons.push({
                type: 'card',
                label: 'Card view',
                action: () => this._convertToCardView(),
                disabled: this.doc.readonly,
            });
            if (this._canConvertToEmbedView || this._isEmbedView) {
                buttons.push({
                    type: 'embed',
                    label: 'Embed view',
                    action: () => this._convertToEmbedView(),
                    disabled: this.doc.readonly || this._embedViewButtonDisabled,
                });
            }
            return html `
      <editor-menu-button
        .contentPadding=${'8px'}
        .button=${html `
          <editor-icon-button
            aria-label="Switch view"
            .justify=${'space-between'}
            .labelHeight=${'20px'}
            .iconContainerWidth=${'110px'}
          >
            <div class="label">
              <span style="text-transform: capitalize">${this._viewType}</span>
              view
            </div>
            ${SmallArrowDownIcon}
          </editor-icon-button>
        `}
        @toggle=${this._toggleViewSelector}
      >
        <div data-size="small" data-orientation="vertical">
          ${repeat(buttons, button => button.type, ({ type, label, action, disabled }) => html `
              <editor-menu-action
                data-testid=${`link-to-${type}`}
                aria-label=${ifDefined(label)}
                ?data-selected=${this._viewType === type}
                ?disabled=${disabled || this._viewType === type}
                @click=${() => {
                action();
                this._trackViewSelected(type);
                this._hide();
            }}
              >
                ${label}
              </editor-menu-action>
            `)}
        </div>
      </editor-menu-button>
    `;
        }
        connectedCallback() {
            super.connectedCallback();
            this.moreGroups = getMoreMenuConfig(this.std).configure(this.moreGroups);
            this.disposables.add(this._selection.slots.changed.on(() => {
                const hasTextSelection = this._selection.find('text');
                if (hasTextSelection) {
                    this._hide();
                    return;
                }
                const blockSelections = this._selection.filter('block');
                if (!blockSelections || blockSelections.length !== 1) {
                    this._hide();
                    return;
                }
                const block = this.std.view.getBlock(blockSelections[0].blockId);
                if (!block || !isEmbedCardBlockComponent(block)) {
                    this._hide();
                    return;
                }
                this.focusBlock = block;
                this._show();
            }));
        }
        render() {
            if (this.hide)
                return nothing;
            const model = this.focusModel;
            if (!model)
                return nothing;
            this._embedOptions =
                'url' in model
                    ? this.std.get(EmbedOptionProvider).getEmbedBlockOptions(model.url)
                    : null;
            const hasUrl = this._canShowUrlOptions && 'url' in model;
            const buttons = [
                this._openMenuButton(),
                hasUrl
                    ? html `
            <a
              class="affine-link-preview"
              href=${model.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>${getHostName(model.url)}</span>
            </a>
          `
                    : nothing,
                // internal embed model
                isEmbedLinkedDocBlock(model) && model.title
                    ? html `
            <editor-icon-button
              class="doc-title"
              aria-label="Doc title"
              .hover=${false}
              .labelHeight=${'20px'}
              .tooltip=${this._originalDocTitle}
              @click=${this.focusBlock?.open}
            >
              <span class="label">${this._originalDocTitle}</span>
            </editor-icon-button>
          `
                    : nothing,
                isEmbedHtmlBlock(model)
                    ? nothing
                    : html `
            <editor-icon-button
              aria-label="Copy link"
              data-testid="copy-link"
              .tooltip=${'Copy link'}
              @click=${this._copyUrl}
            >
              ${CopyIcon}
            </editor-icon-button>

            <editor-icon-button
              aria-label="Edit"
              data-testid="edit"
              .tooltip=${'Edit'}
              ?disabled=${this.doc.readonly}
              @click=${this._openEditPopup}
            >
              ${EditIcon}
            </editor-icon-button>
          `,
                this._viewSelector(),
                this._cardStyleSelector(),
                html `
        <editor-icon-button
          aria-label="Caption"
          .tooltip=${'Add Caption'}
          ?disabled=${this.doc.readonly}
          @click=${this._showCaption}
        >
          ${CaptionIcon}
        </editor-icon-button>
      `,
                html `
        <editor-menu-button
          .contentPadding=${'8px'}
          .button=${html `
            <editor-icon-button aria-label="More" .tooltip=${'More'}>
              ${MoreVerticalIcon}
            </editor-icon-button>
          `}
        >
          <div data-size="large" data-orientation="vertical">
            ${this._moreActions()}
          </div>
        </editor-menu-button>
      `,
            ];
            return html `
      <editor-toolbar class="embed-card-toolbar">
        ${join(buttons.filter(button => button !== nothing), renderToolbarSeparator)}
      </editor-toolbar>
    `;
        }
        #cardStyleButton_accessor_storage;
        get cardStyleButton() { return this.#cardStyleButton_accessor_storage; }
        set cardStyleButton(value) { this.#cardStyleButton_accessor_storage = value; }
        #embedCardToolbarElement_accessor_storage;
        get embedCardToolbarElement() { return this.#embedCardToolbarElement_accessor_storage; }
        set embedCardToolbarElement(value) { this.#embedCardToolbarElement_accessor_storage = value; }
        #focusBlock_accessor_storage;
        get focusBlock() { return this.#focusBlock_accessor_storage; }
        set focusBlock(value) { this.#focusBlock_accessor_storage = value; }
        #hide_accessor_storage;
        get hide() { return this.#hide_accessor_storage; }
        set hide(value) { this.#hide_accessor_storage = value; }
        #moreButton_accessor_storage;
        get moreButton() { return this.#moreButton_accessor_storage; }
        set moreButton(value) { this.#moreButton_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._abortController = new AbortController();
            this._copyUrl = () => {
                const model = this.focusModel;
                if (!model)
                    return;
                let url;
                const isInternal = isInternalEmbedModel(model);
                if ('url' in model) {
                    url = model.url;
                }
                else if (isInternal) {
                    url = this.std
                        .getOptional(GenerateDocUrlProvider)
                        ?.generateDocUrl(model.pageId, model.params);
                }
                if (!url)
                    return;
                navigator.clipboard.writeText(url).catch(console.error);
                toast(this.std.host, 'Copied link to clipboard');
                track(this.std, model, this._viewType, 'CopiedLink', {
                    control: 'copy link',
                });
            };
            this._embedOptions = null;
            this._openEditPopup = (e) => {
                e.stopPropagation();
                const model = this.focusModel;
                if (!model || isEmbedHtmlBlock(model))
                    return;
                const originalDocInfo = this._originalDocInfo;
                this._hide();
                toggleEmbedCardEditModal(this.host, model, this._viewType, originalDocInfo);
                track(this.std, model, this._viewType, 'OpenedAliasPopup', {
                    control: 'edit',
                });
            };
            this._resetAbortController = () => {
                this._abortController.abort();
                this._abortController = new AbortController();
            };
            this._showCaption = () => {
                const focusBlock = this.focusBlock;
                if (!focusBlock) {
                    return;
                }
                try {
                    focusBlock.captionEditor?.show();
                }
                catch (_) {
                    toggleEmbedCardCaptionEditModal(focusBlock);
                }
                this._resetAbortController();
                const model = this.focusModel;
                if (!model)
                    return;
                track(this.std, model, this._viewType, 'OpenedCaptionEditor', {
                    control: 'add caption',
                });
            };
            this._toggleCardStyleSelector = (e) => {
                const opened = e.detail;
                if (!opened)
                    return;
                const model = this.focusModel;
                if (!model)
                    return;
                track(this.std, model, this._viewType, 'OpenedCardStyleSelector', {
                    control: 'switch card style',
                });
            };
            this._toggleViewSelector = (e) => {
                const opened = e.detail;
                if (!opened)
                    return;
                const model = this.focusModel;
                if (!model)
                    return;
                track(this.std, model, this._viewType, 'OpenedViewSelector', {
                    control: 'switch view',
                });
            };
            this._trackViewSelected = (type) => {
                const model = this.focusModel;
                if (!model)
                    return;
                track(this.std, model, this._viewType, 'SelectedView', {
                    control: 'selected view',
                    type: `${type} view`,
                });
            };
            /*
             * Caches the more menu items.
             * Currently only supports configuring more menu.
             */
            this.moreGroups = cloneGroups(BUILT_IN_GROUPS);
            this.#cardStyleButton_accessor_storage = __runInitializers(this, _cardStyleButton_initializers, null);
            this.#embedCardToolbarElement_accessor_storage = (__runInitializers(this, _cardStyleButton_extraInitializers), __runInitializers(this, _embedCardToolbarElement_initializers, void 0));
            this.#focusBlock_accessor_storage = (__runInitializers(this, _embedCardToolbarElement_extraInitializers), __runInitializers(this, _focusBlock_initializers, null));
            this.#hide_accessor_storage = (__runInitializers(this, _focusBlock_extraInitializers), __runInitializers(this, _hide_initializers, true));
            this.#moreButton_accessor_storage = (__runInitializers(this, _hide_extraInitializers), __runInitializers(this, _moreButton_initializers, null));
            __runInitializers(this, _moreButton_extraInitializers);
        }
    };
})();
export { EmbedCardToolbar };
function track(std, model, viewType, event, props) {
    std.getOptional(TelemetryProvider)?.track(event, {
        segment: 'toolbar',
        page: 'doc editor',
        module: 'embed card toolbar',
        type: `${viewType} view`,
        category: isInternalEmbedModel(model) ? 'linked doc' : 'link',
        ...props,
    });
}
//# sourceMappingURL=embed-card-toolbar.js.map