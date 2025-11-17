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
import { ColorScheme, FrameBlockModel } from '@blocksuite/affine-model';
import { ThemeProvider } from '@blocksuite/affine-shared/services';
import { PropTypes, requiredProperties, stdContext, } from '@blocksuite/block-std';
import { GfxControllerIdentifier } from '@blocksuite/block-std/gfx';
import { Bound, SignalWatcher, WithDisposable, } from '@blocksuite/global/utils';
import { consume } from '@lit/context';
import { themeToVar } from '@toeverything/theme/v2';
import { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { parseStringToRgba } from '../../edgeless/components/color-picker/utils.js';
import { isTransparent } from '../../edgeless/components/panel/color-panel.js';
import { frameTitleStyle, frameTitleStyleVars } from './styles.js';
export const AFFINE_FRAME_TITLE = 'affine-frame-title';
let AffineFrameTitle = (() => {
    let _classDecorators = [requiredProperties({
            model: PropTypes.instanceOf(FrameBlockModel),
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = SignalWatcher(WithDisposable(LitElement));
    let __editing_decorators;
    let __editing_initializers = [];
    let __editing_extraInitializers = [];
    let __frameTitle_decorators;
    let __frameTitle_initializers = [];
    let __frameTitle_extraInitializers = [];
    let __nestedFrame_decorators;
    let __nestedFrame_initializers = [];
    let __nestedFrame_extraInitializers = [];
    let __xywh_decorators;
    let __xywh_initializers = [];
    let __xywh_extraInitializers = [];
    let __zoom_decorators;
    let __zoom_initializers = [];
    let __zoom_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _std_decorators;
    let _std_initializers = [];
    let _std_extraInitializers = [];
    var AffineFrameTitle = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __editing_decorators = [state()];
            __frameTitle_decorators = [state()];
            __nestedFrame_decorators = [state()];
            __xywh_decorators = [state()];
            __zoom_decorators = [state()];
            _model_decorators = [property({ attribute: false })];
            _std_decorators = [consume({ context: stdContext })];
            __esDecorate(this, null, __editing_decorators, { kind: "accessor", name: "_editing", static: false, private: false, access: { has: obj => "_editing" in obj, get: obj => obj._editing, set: (obj, value) => { obj._editing = value; } }, metadata: _metadata }, __editing_initializers, __editing_extraInitializers);
            __esDecorate(this, null, __frameTitle_decorators, { kind: "accessor", name: "_frameTitle", static: false, private: false, access: { has: obj => "_frameTitle" in obj, get: obj => obj._frameTitle, set: (obj, value) => { obj._frameTitle = value; } }, metadata: _metadata }, __frameTitle_initializers, __frameTitle_extraInitializers);
            __esDecorate(this, null, __nestedFrame_decorators, { kind: "accessor", name: "_nestedFrame", static: false, private: false, access: { has: obj => "_nestedFrame" in obj, get: obj => obj._nestedFrame, set: (obj, value) => { obj._nestedFrame = value; } }, metadata: _metadata }, __nestedFrame_initializers, __nestedFrame_extraInitializers);
            __esDecorate(this, null, __xywh_decorators, { kind: "accessor", name: "_xywh", static: false, private: false, access: { has: obj => "_xywh" in obj, get: obj => obj._xywh, set: (obj, value) => { obj._xywh = value; } }, metadata: _metadata }, __xywh_initializers, __xywh_extraInitializers);
            __esDecorate(this, null, __zoom_decorators, { kind: "accessor", name: "_zoom", static: false, private: false, access: { has: obj => "_zoom" in obj, get: obj => obj._zoom, set: (obj, value) => { obj._zoom = value; } }, metadata: _metadata }, __zoom_initializers, __zoom_extraInitializers);
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(this, null, _std_decorators, { kind: "accessor", name: "std", static: false, private: false, access: { has: obj => "std" in obj, get: obj => obj.std, set: (obj, value) => { obj.std = value; } }, metadata: _metadata }, _std_initializers, _std_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AffineFrameTitle = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = frameTitleStyle; }
        get colors() {
            let backgroundColor = this.std
                .get(ThemeProvider)
                .getColorValue(this.model.background, undefined, true);
            if (isTransparent(backgroundColor)) {
                backgroundColor = this.std
                    .get(ThemeProvider)
                    .getCssVariableColor(themeToVar('edgeless/frame/background/white'));
            }
            const { r, g, b, a } = parseStringToRgba(backgroundColor);
            const theme = this.std.get(ThemeProvider).theme;
            let textColor;
            {
                let rPrime, gPrime, bPrime;
                if (theme === ColorScheme.Light) {
                    rPrime = 1 - a + a * r;
                    gPrime = 1 - a + a * g;
                    bPrime = 1 - a + a * b;
                }
                else {
                    rPrime = a * r;
                    gPrime = a * g;
                    bPrime = a * b;
                }
                // light
                const L = 0.299 * rPrime + 0.587 * gPrime + 0.114 * bPrime;
                textColor = L > 0.5 ? 'black' : 'white';
            }
            return {
                background: backgroundColor,
                text: textColor,
            };
        }
        get doc() {
            return this.model.doc;
        }
        get gfx() {
            return this.std.get(GfxControllerIdentifier);
        }
        get rootService() {
            return this.std.getService('affine:page');
        }
        _isInsideFrame() {
            return this.gfx.grid.has(this.model.elementBound, true, true, model => model !== this.model && model instanceof FrameBlockModel);
        }
        _updateFrameTitleSize() {
            const { _nestedFrame, _zoom: zoom } = this;
            const { elementBound } = this.model;
            const width = this._cachedWidth / zoom;
            const height = this._cachedHeight / zoom;
            const { nestedFrameOffset } = frameTitleStyleVars;
            if (width && height) {
                this.model.externalXYWH = `[${elementBound.x + (_nestedFrame ? nestedFrameOffset / zoom : 0)},${elementBound.y +
                    (_nestedFrame
                        ? nestedFrameOffset / zoom
                        : -(height + nestedFrameOffset / zoom))},${width},${height}]`;
                this.gfx.grid.update(this.model);
            }
            else {
                this.model.externalXYWH = undefined;
            }
        }
        _updateStyle() {
            if (this._frameTitle.length === 0 ||
                this._editing ||
                this.gfx.tool.currentToolName$.value === 'frameNavigator') {
                this.style.display = 'none';
                return;
            }
            const model = this.model;
            const bound = Bound.deserialize(model.xywh);
            const { _zoom: zoom } = this;
            const { nestedFrameOffset, height } = frameTitleStyleVars;
            const nestedFrame = this._nestedFrame;
            const maxWidth = nestedFrame
                ? bound.w * zoom - nestedFrameOffset / zoom
                : bound.w * zoom;
            const hidden = height / zoom >= bound.h;
            const transformOperation = [
                `translate(0%, ${nestedFrame ? 0 : -100}%)`,
                `translate(${nestedFrame ? nestedFrameOffset : 0}px, ${nestedFrame ? nestedFrameOffset : -nestedFrameOffset}px)`,
            ];
            const anchor = this.gfx.viewport.toViewCoord(bound.x, bound.y);
            this.style.display = '';
            this.style.setProperty('--bg-color', this.colors.background);
            this.style.left = `${anchor[0]}px`;
            this.style.top = `${anchor[1]}px`;
            this.style.display = hidden ? 'none' : 'flex';
            this.style.transform = transformOperation.join(' ');
            this.style.maxWidth = `${maxWidth}px`;
            this.style.transformOrigin = nestedFrame ? 'top left' : 'bottom left';
            this.style.color = this.colors.text;
        }
        connectedCallback() {
            super.connectedCallback();
            const { _disposables, doc, gfx, rootService } = this;
            this._nestedFrame = this._isInsideFrame();
            _disposables.add(doc.slots.blockUpdated.on(payload => {
                if ((payload.type === 'update' &&
                    payload.props.key === 'xywh' &&
                    doc.getBlock(payload.id)?.model instanceof FrameBlockModel) ||
                    (payload.type === 'add' && payload.flavour === 'affine:frame')) {
                    this._nestedFrame = this._isInsideFrame();
                }
                if (payload.type === 'delete' &&
                    payload.model instanceof FrameBlockModel &&
                    payload.model !== this.model) {
                    this._nestedFrame = this._isInsideFrame();
                }
            }));
            _disposables.add(this.model.propsUpdated.on(() => {
                this._xywh = this.model.xywh;
                this.requestUpdate();
            }));
            _disposables.add(rootService.selection.slots.updated.on(() => {
                this._editing =
                    rootService.selection.selectedIds[0] === this.model.id &&
                        rootService.selection.editing;
            }));
            _disposables.add(gfx.viewport.viewportUpdated.on(({ zoom }) => {
                this._zoom = zoom;
                this.requestUpdate();
            }));
            this._zoom = gfx.viewport.zoom;
            const updateTitle = () => {
                this._frameTitle = this.model.title.toString().trim();
            };
            _disposables.add(() => {
                this.model.title.yText.unobserve(updateTitle);
            });
            this.model.title.yText.observe(updateTitle);
            this._frameTitle = this.model.title.toString().trim();
            this._xywh = this.model.xywh;
        }
        firstUpdated() {
            this._cachedWidth = this.clientWidth;
            this._cachedHeight = this.clientHeight;
            this._updateFrameTitleSize();
        }
        render() {
            this._updateStyle();
            return this._frameTitle;
        }
        updated(_changedProperties) {
            if (!this.gfx.viewport.viewportBounds.contains(this.model.elementBound) &&
                !this.gfx.viewport.viewportBounds.isIntersectWithBound(this.model.elementBound)) {
                return;
            }
            let sizeChanged = false;
            if (this._cachedWidth === 0 ||
                this._cachedHeight === 0 ||
                _changedProperties.has('_frameTitle') ||
                _changedProperties.has('_nestedFrame') ||
                _changedProperties.has('_xywh') ||
                _changedProperties.has('_editing')) {
                this._cachedWidth = this.clientWidth;
                this._cachedHeight = this.clientHeight;
                sizeChanged = true;
            }
            if (sizeChanged || _changedProperties.has('_zoom')) {
                this._updateFrameTitleSize();
            }
        }
        #_editing_accessor_storage;
        get _editing() { return this.#_editing_accessor_storage; }
        set _editing(value) { this.#_editing_accessor_storage = value; }
        #_frameTitle_accessor_storage;
        get _frameTitle() { return this.#_frameTitle_accessor_storage; }
        set _frameTitle(value) { this.#_frameTitle_accessor_storage = value; }
        #_nestedFrame_accessor_storage;
        get _nestedFrame() { return this.#_nestedFrame_accessor_storage; }
        set _nestedFrame(value) { this.#_nestedFrame_accessor_storage = value; }
        #_xywh_accessor_storage;
        get _xywh() { return this.#_xywh_accessor_storage; }
        set _xywh(value) { this.#_xywh_accessor_storage = value; }
        #_zoom_accessor_storage;
        get _zoom() { return this.#_zoom_accessor_storage; }
        set _zoom(value) { this.#_zoom_accessor_storage = value; }
        #model_accessor_storage;
        get model() { return this.#model_accessor_storage; }
        set model(value) { this.#model_accessor_storage = value; }
        #std_accessor_storage;
        get std() { return this.#std_accessor_storage; }
        set std(value) { this.#std_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._cachedHeight = 0;
            this._cachedWidth = 0;
            this.#_editing_accessor_storage = __runInitializers(this, __editing_initializers, false);
            this.#_frameTitle_accessor_storage = (__runInitializers(this, __editing_extraInitializers), __runInitializers(this, __frameTitle_initializers, ''));
            this.#_nestedFrame_accessor_storage = (__runInitializers(this, __frameTitle_extraInitializers), __runInitializers(this, __nestedFrame_initializers, false));
            this.#_xywh_accessor_storage = (__runInitializers(this, __nestedFrame_extraInitializers), __runInitializers(this, __xywh_initializers, null));
            this.#_zoom_accessor_storage = (__runInitializers(this, __xywh_extraInitializers), __runInitializers(this, __zoom_initializers, 1));
            this.#model_accessor_storage = (__runInitializers(this, __zoom_extraInitializers), __runInitializers(this, _model_initializers, void 0));
            this.#std_accessor_storage = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _std_initializers, void 0));
            __runInitializers(this, _std_extraInitializers);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AffineFrameTitle = _classThis;
})();
export { AffineFrameTitle };
//# sourceMappingURL=frame-title.js.map