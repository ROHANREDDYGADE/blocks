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
import { ExpandIcon, LineStyleIcon, NoteCornerIcon, NoteShadowIcon, ScissorsIcon, ShrinkIcon, SmallArrowDownIcon, } from '@blocksuite/affine-components/icons';
import { renderToolbarSeparator, } from '@blocksuite/affine-components/toolbar';
import { DEFAULT_NOTE_BACKGROUND_COLOR, NOTE_BACKGROUND_COLORS, NoteDisplayMode, } from '@blocksuite/affine-model';
import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { matchFlavours } from '@blocksuite/affine-shared/utils';
import { assertExists, Bound, countBy, maxBy, WithDisposable, } from '@blocksuite/global/utils';
import { html, LitElement, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { join } from 'lit/directives/join.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { when } from 'lit/directives/when.js';
import { packColor, packColorsWithColorScheme, } from '../../edgeless/components/color-picker/utils.js';
import { LineStylesPanel, } from '../../edgeless/components/panel/line-styles-panel.js';
import { getTooltipWithShortcut } from '../../edgeless/components/utils.js';
const SIZE_LIST = [
    { name: 'None', value: 0 },
    { name: 'Small', value: 8 },
    { name: 'Medium', value: 16 },
    { name: 'Large', value: 24 },
    { name: 'Huge', value: 32 },
];
const DisplayModeMap = {
    [NoteDisplayMode.DocAndEdgeless]: 'Both',
    [NoteDisplayMode.EdgelessOnly]: 'Edgeless',
    [NoteDisplayMode.DocOnly]: 'Page',
};
function getMostCommonBackground(elements, colorScheme) {
    const colors = countBy(elements, (ele) => {
        return typeof ele.background === 'object'
            ? (ele.background[colorScheme] ?? ele.background.normal ?? null)
            : ele.background;
    });
    const max = maxBy(Object.entries(colors), ([_k, count]) => count);
    return max ? max[0] : null;
}
let EdgelessChangeNoteButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _backgroundButton_decorators;
    let _backgroundButton_initializers = [];
    let _backgroundButton_extraInitializers = [];
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _enableNoteSlicer_decorators;
    let _enableNoteSlicer_initializers = [];
    let _enableNoteSlicer_extraInitializers = [];
    let _notes_decorators;
    let _notes_initializers = [];
    let _notes_extraInitializers = [];
    let _quickConnectButton_decorators;
    let _quickConnectButton_initializers = [];
    let _quickConnectButton_extraInitializers = [];
    return class EdgelessChangeNoteButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _backgroundButton_decorators = [query('edgeless-color-picker-button.background')];
            _edgeless_decorators = [property({ attribute: false })];
            _enableNoteSlicer_decorators = [property({ attribute: false })];
            _notes_decorators = [property({ attribute: false })];
            _quickConnectButton_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _backgroundButton_decorators, { kind: "accessor", name: "backgroundButton", static: false, private: false, access: { has: obj => "backgroundButton" in obj, get: obj => obj.backgroundButton, set: (obj, value) => { obj.backgroundButton = value; } }, metadata: _metadata }, _backgroundButton_initializers, _backgroundButton_extraInitializers);
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _enableNoteSlicer_decorators, { kind: "accessor", name: "enableNoteSlicer", static: false, private: false, access: { has: obj => "enableNoteSlicer" in obj, get: obj => obj.enableNoteSlicer, set: (obj, value) => { obj.enableNoteSlicer = value; } }, metadata: _metadata }, _enableNoteSlicer_initializers, _enableNoteSlicer_extraInitializers);
            __esDecorate(this, null, _notes_decorators, { kind: "accessor", name: "notes", static: false, private: false, access: { has: obj => "notes" in obj, get: obj => obj.notes, set: (obj, value) => { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
            __esDecorate(this, null, _quickConnectButton_decorators, { kind: "accessor", name: "quickConnectButton", static: false, private: false, access: { has: obj => "quickConnectButton" in obj, get: obj => obj.quickConnectButton, set: (obj, value) => { obj.quickConnectButton = value; } }, metadata: _metadata }, _quickConnectButton_initializers, _quickConnectButton_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get _advancedVisibilityEnabled() {
            return this.doc.awarenessStore.getFlag('enable_advanced_block_visibility');
        }
        get doc() {
            return this.edgeless.doc;
        }
        _getScaleLabel(scale) {
            return Math.round(scale * 100) + '%';
        }
        _handleNoteSlicerButtonClick() {
            const surfaceService = this.edgeless.service;
            if (!surfaceService)
                return;
            this.edgeless.slots.toggleNoteSlicer.emit();
        }
        _setBackground(background) {
            this.notes.forEach(element => {
                this.edgeless.service.updateElement(element.id, { background });
            });
        }
        _setCollapse() {
            this.notes.forEach(note => {
                const { collapse, collapsedHeight } = note.edgeless;
                if (collapse) {
                    this.doc.updateBlock(note, () => {
                        note.edgeless.collapse = false;
                    });
                }
                else if (collapsedHeight) {
                    const { xywh, edgeless } = note;
                    const bound = Bound.deserialize(xywh);
                    bound.h = collapsedHeight * (edgeless.scale ?? 1);
                    this.doc.updateBlock(note, () => {
                        note.edgeless.collapse = true;
                        note.xywh = bound.serialize();
                    });
                }
            });
            this.requestUpdate();
        }
        _setDisplayMode(note, newMode) {
            const { displayMode: currentMode } = note;
            if (newMode === currentMode) {
                return;
            }
            this.edgeless.service.updateElement(note.id, { displayMode: newMode });
            const noteParent = this.doc.getParent(note);
            assertExists(noteParent);
            const noteParentChildNotes = noteParent.children.filter(block => matchFlavours(block, ['affine:note']));
            const noteParentLastNote = noteParentChildNotes[noteParentChildNotes.length - 1];
            if (currentMode === NoteDisplayMode.EdgelessOnly &&
                newMode !== NoteDisplayMode.EdgelessOnly &&
                note !== noteParentLastNote) {
                // move to the end
                this.doc.moveBlocks([note], noteParent, noteParentLastNote, false);
            }
            // if change note to page only, should clear the selection
            if (newMode === NoteDisplayMode.DocOnly) {
                this.edgeless.service.selection.clear();
            }
        }
        _setShadowType(shadowType) {
            this.notes.forEach(note => {
                const props = {
                    edgeless: {
                        style: {
                            ...note.edgeless.style,
                            shadowType,
                        },
                    },
                };
                this.edgeless.service.updateElement(note.id, props);
            });
        }
        _setStrokeStyle(borderStyle) {
            this.notes.forEach(note => {
                const props = {
                    edgeless: {
                        style: {
                            ...note.edgeless.style,
                            borderStyle,
                        },
                    },
                };
                this.edgeless.service.updateElement(note.id, props);
            });
        }
        _setStrokeWidth(borderSize) {
            this.notes.forEach(note => {
                const props = {
                    edgeless: {
                        style: {
                            ...note.edgeless.style,
                            borderSize,
                        },
                    },
                };
                this.edgeless.service.updateElement(note.id, props);
            });
        }
        _setStyles({ type, value }) {
            if (type === 'size') {
                this._setStrokeWidth(value);
                return;
            }
            if (type === 'lineStyle') {
                this._setStrokeStyle(value);
            }
        }
        render() {
            const len = this.notes.length;
            const note = this.notes[0];
            const { edgeless, displayMode } = note;
            const { shadowType, borderRadius, borderSize, borderStyle } = edgeless.style;
            const colorScheme = this.edgeless.surface.renderer.getColorScheme();
            const background = getMostCommonBackground(this.notes, colorScheme) ??
                DEFAULT_NOTE_BACKGROUND_COLOR;
            const { collapse } = edgeless;
            const scale = edgeless.scale ?? 1;
            const currentMode = DisplayModeMap[displayMode];
            const onlyOne = len === 1;
            const isDocOnly = displayMode === NoteDisplayMode.DocOnly;
            const theme = this.edgeless.std.get(ThemeProvider).theme;
            const buttons = [
                onlyOne && this._advancedVisibilityEnabled
                    ? html `
            <span class="display-mode-button-label">Show in</span>
            <editor-menu-button
              .contentPadding=${'8px'}
              .button=${html `
                <editor-icon-button
                  aria-label="Mode"
                  .tooltip=${'Display mode'}
                  .justify=${'space-between'}
                  .labelHeight=${'20px'}
                >
                  <span class="label">${currentMode}</span>
                  ${SmallArrowDownIcon}
                </editor-icon-button>
              `}
            >
              <note-display-mode-panel
                .displayMode=${displayMode}
                .onSelect=${(newMode) => this._setDisplayMode(note, newMode)}
              >
              </note-display-mode-panel>
            </editor-menu-button>
          `
                    : nothing,
                isDocOnly
                    ? nothing
                    : when(this.edgeless.doc.awarenessStore.getFlag('enable_color_picker'), () => {
                        const { type, colors } = packColorsWithColorScheme(colorScheme, background, note.background);
                        return html `
                <edgeless-color-picker-button
                  class="background"
                  .label=${'Background'}
                  .pick=${this.pickColor}
                  .color=${background}
                  .colorType=${type}
                  .colors=${colors}
                  .palettes=${NOTE_BACKGROUND_COLORS}
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
                  .options=${NOTE_BACKGROUND_COLORS}
                  @select=${(e) => this._setBackground(e.detail)}
                >
                </edgeless-color-panel>
              </editor-menu-button>
            `),
                isDocOnly
                    ? nothing
                    : html `
            <editor-menu-button
              .contentPadding=${'6px'}
              .button=${html `
                <editor-icon-button
                  aria-label="Shadow style"
                  .tooltip=${'Shadow style'}
                >
                  ${NoteShadowIcon}${SmallArrowDownIcon}
                </editor-icon-button>
              `}
            >
              <edgeless-note-shadow-panel
                .theme=${theme}
                .value=${shadowType}
                .background=${background}
                .onSelect=${(value) => this._setShadowType(value)}
              >
              </edgeless-note-shadow-panel>
            </editor-menu-button>

            <editor-menu-button
              .button=${html `
                <editor-icon-button
                  aria-label="Border style"
                  .tooltip=${'Border style'}
                >
                  ${LineStyleIcon}${SmallArrowDownIcon}
                </editor-icon-button>
              `}
            >
              <div data-orientation="horizontal">
                ${LineStylesPanel({
                        selectedLineSize: borderSize,
                        selectedLineStyle: borderStyle,
                        onClick: event => this._setStyles(event),
                    })}
              </div>
            </editor-menu-button>

            <editor-menu-button
              ${ref(this._cornersPanelRef)}
              .contentPadding=${'8px'}
              .button=${html `
                <editor-icon-button aria-label="Corners" .tooltip=${'Corners'}>
                  ${NoteCornerIcon}${SmallArrowDownIcon}
                </editor-icon-button>
              `}
            >
              <edgeless-size-panel
                .size=${borderRadius}
                .sizeList=${SIZE_LIST}
                .minSize=${0}
                .onSelect=${(size) => this._setBorderRadius(size)}
                .onPopperCose=${() => this._cornersPanelRef.value?.hide()}
              >
              </edgeless-size-panel>
            </editor-menu-button>
          `,
                onlyOne && this._advancedVisibilityEnabled
                    ? html `
            <editor-icon-button
              aria-label="Slicer"
              .tooltip=${getTooltipWithShortcut('Cutting mode', '-')}
              .active=${this.enableNoteSlicer}
              @click=${() => this._handleNoteSlicerButtonClick()}
            >
              ${ScissorsIcon}
            </editor-icon-button>
          `
                    : nothing,
                onlyOne ? this.quickConnectButton : nothing,
                html `
        <editor-icon-button
          aria-label="Size"
          .tooltip=${collapse ? 'Auto height' : 'Customized height'}
          @click=${() => this._setCollapse()}
        >
          ${collapse ? ExpandIcon : ShrinkIcon}
        </editor-icon-button>

        <editor-menu-button
          ${ref(this._scalePanelRef)}
          .contentPadding=${'8px'}
          .button=${html `
            <editor-icon-button
              aria-label="Scale"
              .tooltip=${'Scale'}
              .justify=${'space-between'}
              .labelHeight=${'20px'}
              .iconContainerWidth=${'65px'}
            >
              <span class="label">${this._getScaleLabel(scale)}</span
              >${SmallArrowDownIcon}
            </editor-icon-button>
          `}
        >
          <edgeless-scale-panel
            .scale=${Math.round(scale * 100)}
            .onSelect=${(scale) => this._setNoteScale(scale)}
            .onPopperCose=${() => this._scalePanelRef.value?.hide()}
          ></edgeless-scale-panel>
        </editor-menu-button>
      `,
            ];
            return join(buttons.filter(button => button !== nothing), renderToolbarSeparator);
        }
        #_cornersPanelRef_accessor_storage;
        get _cornersPanelRef() { return this.#_cornersPanelRef_accessor_storage; }
        set _cornersPanelRef(value) { this.#_cornersPanelRef_accessor_storage = value; }
        #_scalePanelRef_accessor_storage;
        get _scalePanelRef() { return this.#_scalePanelRef_accessor_storage; }
        set _scalePanelRef(value) { this.#_scalePanelRef_accessor_storage = value; }
        #backgroundButton_accessor_storage;
        get backgroundButton() { return this.#backgroundButton_accessor_storage; }
        set backgroundButton(value) { this.#backgroundButton_accessor_storage = value; }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #enableNoteSlicer_accessor_storage;
        get enableNoteSlicer() { return this.#enableNoteSlicer_accessor_storage; }
        set enableNoteSlicer(value) { this.#enableNoteSlicer_accessor_storage = value; }
        #notes_accessor_storage;
        get notes() { return this.#notes_accessor_storage; }
        set notes(value) { this.#notes_accessor_storage = value; }
        #quickConnectButton_accessor_storage;
        get quickConnectButton() { return this.#quickConnectButton_accessor_storage; }
        set quickConnectButton(value) { this.#quickConnectButton_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._setBorderRadius = (borderRadius) => {
                this.notes.forEach(note => {
                    const props = {
                        edgeless: {
                            style: {
                                ...note.edgeless.style,
                                borderRadius,
                            },
                        },
                    };
                    this.edgeless.service.updateElement(note.id, props);
                });
            };
            this._setNoteScale = (scale) => {
                this.notes.forEach(note => {
                    this.doc.updateBlock(note, () => {
                        const bound = Bound.deserialize(note.xywh);
                        const oldScale = note.edgeless.scale ?? 1;
                        const ratio = scale / oldScale;
                        bound.w *= ratio;
                        bound.h *= ratio;
                        const xywh = bound.serialize();
                        note.xywh = xywh;
                        note.edgeless.scale = scale;
                    });
                });
            };
            this.pickColor = (event) => {
                if (event.type === 'pick') {
                    this.notes.forEach(element => {
                        const props = packColor('background', { ...event.detail });
                        this.edgeless.service.updateElement(element.id, props);
                    });
                    return;
                }
                this.notes.forEach(ele => ele[event.type === 'start' ? 'stash' : 'pop']('background'));
            };
            this.#_cornersPanelRef_accessor_storage = createRef();
            this.#_scalePanelRef_accessor_storage = createRef();
            this.#backgroundButton_accessor_storage = __runInitializers(this, _backgroundButton_initializers, void 0);
            this.#edgeless_accessor_storage = (__runInitializers(this, _backgroundButton_extraInitializers), __runInitializers(this, _edgeless_initializers, void 0));
            this.#enableNoteSlicer_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _enableNoteSlicer_initializers, void 0));
            this.#notes_accessor_storage = (__runInitializers(this, _enableNoteSlicer_extraInitializers), __runInitializers(this, _notes_initializers, []));
            this.#quickConnectButton_accessor_storage = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _quickConnectButton_initializers, void 0));
            __runInitializers(this, _quickConnectButton_extraInitializers);
        }
    };
})();
export { EdgelessChangeNoteButton };
export function renderNoteButton(edgeless, notes, quickConnectButton) {
    if (!notes?.length)
        return nothing;
    return html `
    <edgeless-change-note-button
      .notes=${notes}
      .edgeless=${edgeless}
      .enableNoteSlicer=${false}
      .quickConnectButton=${quickConnectButton?.pop() ?? nothing}
    >
    </edgeless-change-note-button>
  `;
}
//# sourceMappingURL=change-note-button.js.map