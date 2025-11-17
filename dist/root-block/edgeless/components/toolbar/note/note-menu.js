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
import { AttachmentIcon, LinkIcon } from '@blocksuite/affine-components/icons';
import { TelemetryProvider } from '@blocksuite/affine-shared/services';
import { effect } from '@preact/signals-core';
import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { getImageFilesFromLocal, openFileOrFiles, } from '../../../../../_common/utils/index.js';
import { ImageIcon } from '../../../../../image-block/styles.js';
import { addAttachments, addImages } from '../../../utils/common.js';
import { getTooltipWithShortcut } from '../../utils.js';
import { EdgelessToolbarToolMixin } from '../mixins/tool.mixin.js';
import { NOTE_MENU_ITEMS } from './note-menu-config.js';
let EdgelessNoteMenu = (() => {
    let _classSuper = EdgelessToolbarToolMixin(LitElement);
    let __imageLoading_decorators;
    let __imageLoading_initializers = [];
    let __imageLoading_extraInitializers = [];
    let _childFlavour_decorators;
    let _childFlavour_initializers = [];
    let _childFlavour_extraInitializers = [];
    let _childType_decorators;
    let _childType_initializers = [];
    let _childType_extraInitializers = [];
    let _onChange_decorators;
    let _onChange_initializers = [];
    let _onChange_extraInitializers = [];
    let _tip_decorators;
    let _tip_initializers = [];
    let _tip_extraInitializers = [];
    return class EdgelessNoteMenu extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __imageLoading_decorators = [state()];
            _childFlavour_decorators = [property({ attribute: false })];
            _childType_decorators = [property({ attribute: false })];
            _onChange_decorators = [property({ attribute: false })];
            _tip_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __imageLoading_decorators, { kind: "accessor", name: "_imageLoading", static: false, private: false, access: { has: obj => "_imageLoading" in obj, get: obj => obj._imageLoading, set: (obj, value) => { obj._imageLoading = value; } }, metadata: _metadata }, __imageLoading_initializers, __imageLoading_extraInitializers);
            __esDecorate(this, null, _childFlavour_decorators, { kind: "accessor", name: "childFlavour", static: false, private: false, access: { has: obj => "childFlavour" in obj, get: obj => obj.childFlavour, set: (obj, value) => { obj.childFlavour = value; } }, metadata: _metadata }, _childFlavour_initializers, _childFlavour_extraInitializers);
            __esDecorate(this, null, _childType_decorators, { kind: "accessor", name: "childType", static: false, private: false, access: { has: obj => "childType" in obj, get: obj => obj.childType, set: (obj, value) => { obj.childType = value; } }, metadata: _metadata }, _childType_initializers, _childType_extraInitializers);
            __esDecorate(this, null, _onChange_decorators, { kind: "accessor", name: "onChange", static: false, private: false, access: { has: obj => "onChange" in obj, get: obj => obj.onChange, set: (obj, value) => { obj.onChange = value; } }, metadata: _metadata }, _onChange_initializers, _onChange_extraInitializers);
            __esDecorate(this, null, _tip_decorators, { kind: "accessor", name: "tip", static: false, private: false, access: { has: obj => "tip" in obj, get: obj => obj.tip, set: (obj, value) => { obj.tip = value; } }, metadata: _metadata }, _tip_initializers, _tip_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      position: absolute;
      display: flex;
      z-index: -1;
    }
    .menu-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .button-group-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 14px;
      fill: var(--affine-icon-color);
    }
    .button-group-container svg {
      width: 20px;
      height: 20px;
    }
    .divider {
      width: 1px;
      height: 24px;
      background: var(--affine-border-color);
      transform: scaleX(0.5);
      margin: 0 14px;
    }
  `; }
        async _addImages() {
            this._imageLoading = true;
            const imageFiles = await getImageFilesFromLocal();
            const ids = await addImages(this.edgeless.std, imageFiles);
            this._imageLoading = false;
            this.edgeless.gfx.tool.setTool('default');
            this.edgeless.gfx.selection.set({ elements: ids });
        }
        _onHandleLinkButtonClick() {
            const { insertedLinkType } = this.edgeless.service.std.command.exec('insertLinkByQuickSearch');
            insertedLinkType
                ?.then(type => {
                const flavour = type?.flavour;
                if (!flavour)
                    return;
                this.edgeless.std
                    .getOptional(TelemetryProvider)
                    ?.track('CanvasElementAdded', {
                    control: 'toolbar:general',
                    page: 'whiteboard editor',
                    module: 'toolbar',
                    type: flavour.split(':')[1],
                });
            })
                .catch(console.error);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
        }
        firstUpdated() {
            this.disposables.add(effect(() => {
                const tool = this.edgeless.gfx.tool.currentToolOption$.value;
                if (tool?.type !== 'affine:note')
                    return;
                this.childFlavour = tool.childFlavour;
                this.childType = tool.childType;
                this.tip = tool.tip;
            }));
        }
        render() {
            const { childType } = this;
            return html `
      <edgeless-slide-menu>
        <div class="menu-content">
          <!-- add to edgeless -->
          <div class="button-group-container">
            <edgeless-tool-icon-button
              .activeMode=${'background'}
              .tooltip=${'Image'}
              @click=${this._addImages}
              .disabled=${this._imageLoading}
            >
              ${ImageIcon}
            </edgeless-tool-icon-button>

            <edgeless-tool-icon-button
              .activeMode=${'background'}
              .tooltip=${getTooltipWithShortcut('Link', '@')}
              @click=${() => {
                this._onHandleLinkButtonClick();
            }}
            >
              ${LinkIcon}
            </edgeless-tool-icon-button>

            <edgeless-tool-icon-button
              .activeMode=${'background'}
              .tooltip=${'File'}
              @click=${async () => {
                const file = await openFileOrFiles();
                if (!file)
                    return;
                await addAttachments(this.edgeless.std, [file]);
                this.edgeless.gfx.tool.setTool('default');
                this.edgeless.std
                    .getOptional(TelemetryProvider)
                    ?.track('CanvasElementAdded', {
                    control: 'toolbar:general',
                    page: 'whiteboard editor',
                    module: 'toolbar',
                    segment: 'toolbar',
                    type: 'attachment',
                });
            }}
            >
              ${AttachmentIcon}
            </edgeless-tool-icon-button>
          </div>

          <div class="divider"></div>

          <!-- add to note -->
          <div class="button-group-container">
            ${repeat(NOTE_MENU_ITEMS, item => item.childFlavour, item => html `
                <edgeless-tool-icon-button
                  .active=${childType === item.childType}
                  .activeMode=${'background'}
                  .tooltip=${item.tooltip}
                  @click=${() => this.onChange({
                childFlavour: item.childFlavour,
                childType: item.childType,
                tip: item.tooltip,
            })}
                >
                  ${item.icon}
                </edgeless-tool-icon-button>
              `)}
          </div>
        </div>
      </edgeless-slide-menu>
    `;
        }
        #_imageLoading_accessor_storage;
        get _imageLoading() { return this.#_imageLoading_accessor_storage; }
        set _imageLoading(value) { this.#_imageLoading_accessor_storage = value; }
        #childFlavour_accessor_storage;
        get childFlavour() { return this.#childFlavour_accessor_storage; }
        set childFlavour(value) { this.#childFlavour_accessor_storage = value; }
        #childType_accessor_storage;
        get childType() { return this.#childType_accessor_storage; }
        set childType(value) { this.#childType_accessor_storage = value; }
        #onChange_accessor_storage;
        get onChange() { return this.#onChange_accessor_storage; }
        set onChange(value) { this.#onChange_accessor_storage = value; }
        #tip_accessor_storage;
        get tip() { return this.#tip_accessor_storage; }
        set tip(value) { this.#tip_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this.type = 'affine:note';
            this.#_imageLoading_accessor_storage = __runInitializers(this, __imageLoading_initializers, false);
            this.#childFlavour_accessor_storage = (__runInitializers(this, __imageLoading_extraInitializers), __runInitializers(this, _childFlavour_initializers, void 0));
            this.#childType_accessor_storage = (__runInitializers(this, _childFlavour_extraInitializers), __runInitializers(this, _childType_initializers, void 0));
            this.#onChange_accessor_storage = (__runInitializers(this, _childType_extraInitializers), __runInitializers(this, _onChange_initializers, void 0));
            this.#tip_accessor_storage = (__runInitializers(this, _onChange_extraInitializers), __runInitializers(this, _tip_initializers, void 0));
            __runInitializers(this, _tip_extraInitializers);
        }
    };
})();
export { EdgelessNoteMenu };
//# sourceMappingURL=note-menu.js.map