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
import { NoteIcon, RenameIcon, UngroupButtonIcon, } from '@blocksuite/affine-components/icons';
import { toast } from '@blocksuite/affine-components/toast';
import { renderToolbarSeparator } from '@blocksuite/affine-components/toolbar';
import { DEFAULT_NOTE_HEIGHT, FRAME_BACKGROUND_COLORS, NoteDisplayMode, } from '@blocksuite/affine-model';
import { matchFlavours } from '@blocksuite/affine-shared/utils';
import { GfxExtensionIdentifier } from '@blocksuite/block-std/gfx';
import { countBy, deserializeXYWH, maxBy, serializeXYWH, WithDisposable, } from '@blocksuite/global/utils';
import { html, LitElement, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { join } from 'lit/directives/join.js';
import { when } from 'lit/directives/when.js';
import { packColor, packColorsWithColorScheme, } from '../../edgeless/components/color-picker/utils.js';
import { mountFrameTitleEditor } from '../../edgeless/utils/text.js';
function getMostCommonColor(elements, colorScheme) {
    const colors = countBy(elements, (ele) => {
        return typeof ele.background === 'object'
            ? (ele.background[colorScheme] ?? ele.background.normal ?? null)
            : ele.background;
    });
    const max = maxBy(Object.entries(colors), ([_k, count]) => count);
    return max ? max[0] : null;
}
let EdgelessChangeFrameButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _backgroundButton_decorators;
    let _backgroundButton_initializers = [];
    let _backgroundButton_extraInitializers = [];
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _frames_decorators;
    let _frames_initializers = [];
    let _frames_extraInitializers = [];
    return class EdgelessChangeFrameButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _backgroundButton_decorators = [query('edgeless-color-picker-button.background')];
            _edgeless_decorators = [property({ attribute: false })];
            _frames_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _backgroundButton_decorators, { kind: "accessor", name: "backgroundButton", static: false, private: false, access: { has: obj => "backgroundButton" in obj, get: obj => obj.backgroundButton, set: (obj, value) => { obj.backgroundButton = value; } }, metadata: _metadata }, _backgroundButton_initializers, _backgroundButton_extraInitializers);
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _frames_decorators, { kind: "accessor", name: "frames", static: false, private: false, access: { has: obj => "frames" in obj, get: obj => obj.frames, set: (obj, value) => { obj.frames = value; } }, metadata: _metadata }, _frames_initializers, _frames_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get service() {
            return this.edgeless.service;
        }
        _insertIntoPage() {
            if (!this.edgeless.doc.root)
                return;
            const rootModel = this.edgeless.doc.root;
            const notes = rootModel.children.filter(model => matchFlavours(model, ['affine:note']) &&
                model.displayMode !== NoteDisplayMode.EdgelessOnly);
            const lastNote = notes[notes.length - 1];
            const referenceFrame = this.frames[0];
            let targetParent = lastNote?.id;
            if (!lastNote) {
                const targetXYWH = deserializeXYWH(referenceFrame.xywh);
                targetXYWH[1] = targetXYWH[1] + targetXYWH[3];
                targetXYWH[3] = DEFAULT_NOTE_HEIGHT;
                const newAddedNote = this.edgeless.doc.addBlock('affine:note', {
                    xywh: serializeXYWH(...targetXYWH),
                }, rootModel.id);
                targetParent = newAddedNote;
            }
            this.edgeless.doc.addBlock('affine:surface-ref', {
                reference: this.frames[0].id,
                refFlavour: 'affine:frame',
            }, targetParent);
            toast(this.edgeless.host, 'Frame has been inserted into doc');
        }
        _setFrameBackground(color) {
            this.frames.forEach(frame => {
                this.service.updateElement(frame.id, { background: color });
            });
        }
        render() {
            const { frames } = this;
            const len = frames.length;
            const onlyOne = len === 1;
            const colorScheme = this.edgeless.surface.renderer.getColorScheme();
            const background = getMostCommonColor(frames, colorScheme) ?? '--affine-palette-transparent';
            return join([
                onlyOne
                    ? html `
              <editor-icon-button
                aria-label=${'Insert into Page'}
                .tooltip=${'Insert into Page'}
                .iconSize=${'20px'}
                .labelHeight=${'20px'}
                @click=${this._insertIntoPage}
              >
                ${NoteIcon}
                <span class="label">Insert into Page</span>
              </editor-icon-button>
            `
                    : nothing,
                onlyOne
                    ? html `
              <editor-icon-button
                aria-label="Rename"
                .tooltip=${'Rename'}
                .iconSize=${'20px'}
                @click=${() => mountFrameTitleEditor(this.frames[0], this.edgeless)}
              >
                ${RenameIcon}
              </editor-icon-button>
            `
                    : nothing,
                html `
          <editor-icon-button
            aria-label="Ungroup"
            .tooltip=${'Ungroup'}
            .iconSize=${'20px'}
            @click=${() => {
                    this.edgeless.doc.captureSync();
                    const frameMgr = this.edgeless.std.get(GfxExtensionIdentifier('frame-manager'));
                    frames.forEach(frame => frameMgr.removeAllChildrenFromFrame(frame));
                    frames.forEach(frame => {
                        this.edgeless.service.removeElement(frame);
                    });
                    this.edgeless.service.selection.clear();
                }}
          >
            ${UngroupButtonIcon}
          </editor-icon-button>
        `,
                when(this.edgeless.doc.awarenessStore.getFlag('enable_color_picker'), () => {
                    const { type, colors } = packColorsWithColorScheme(colorScheme, background, this.frames[0].background);
                    return html `
              <edgeless-color-picker-button
                class="background"
                .label=${'Background'}
                .pick=${this.pickColor}
                .color=${background}
                .colors=${colors}
                .colorType=${type}
                .palettes=${FRAME_BACKGROUND_COLORS}
              >
              </edgeless-color-picker-button>
            `;
                }, () => html `
            <editor-menu-button
              .contentPadding=${'8px'}
              .button=${html `
                <editor-icon-button
                  aria-label="Background"
                  .tooltip=${'Background'}
                >
                  <edgeless-color-button
                    .color=${background}
                  ></edgeless-color-button>
                </editor-icon-button>
              `}
            >
              <edgeless-color-panel
                .value=${background}
                .options=${FRAME_BACKGROUND_COLORS}
                @select=${(e) => this._setFrameBackground(e.detail)}
              >
              </edgeless-color-panel>
            </editor-menu-button>
          `),
            ].filter(button => button !== nothing), renderToolbarSeparator);
        }
        #backgroundButton_accessor_storage;
        get backgroundButton() { return this.#backgroundButton_accessor_storage; }
        set backgroundButton(value) { this.#backgroundButton_accessor_storage = value; }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #frames_accessor_storage;
        get frames() { return this.#frames_accessor_storage; }
        set frames(value) { this.#frames_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this.pickColor = (event) => {
                if (event.type === 'pick') {
                    this.frames.forEach(ele => this.service.updateElement(ele.id, packColor('background', { ...event.detail })));
                    return;
                }
                this.frames.forEach(ele => ele[event.type === 'start' ? 'stash' : 'pop']('background'));
            };
            this.#backgroundButton_accessor_storage = __runInitializers(this, _backgroundButton_initializers, void 0);
            this.#edgeless_accessor_storage = (__runInitializers(this, _backgroundButton_extraInitializers), __runInitializers(this, _edgeless_initializers, void 0));
            this.#frames_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _frames_initializers, []));
            __runInitializers(this, _frames_extraInitializers);
        }
    };
})();
export { EdgelessChangeFrameButton };
export function renderFrameButton(edgeless, frames) {
    if (!frames?.length)
        return nothing;
    return html `
    <edgeless-change-frame-button
      .edgeless=${edgeless}
      .frames=${frames}
    ></edgeless-change-frame-button>
  `;
}
//# sourceMappingURL=change-frame-button.js.map