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
import { CanvasElementType, CommonUtils, } from '@blocksuite/affine-block-surface';
import { FontFamilyIcon, FrameIcon, SmallNoteIcon, } from '@blocksuite/affine-components/icons';
import { DEFAULT_NOTE_BACKGROUND_COLOR, DEFAULT_NOTE_WIDTH, DEFAULT_SHAPE_FILL_COLOR, DEFAULT_SHAPE_STROKE_COLOR, DEFAULT_TEXT_COLOR, FontFamily, FontStyle, FontWeight, getShapeName, GroupElementModel, NoteBlockModel, ShapeStyle, TextElementModel, } from '@blocksuite/affine-model';
import { EditPropsStore, ThemeProvider, } from '@blocksuite/affine-shared/services';
import { captureEventTarget } from '@blocksuite/affine-shared/utils';
import { stdContext } from '@blocksuite/block-std';
import { GfxControllerIdentifier } from '@blocksuite/block-std/gfx';
import { assertInstanceOf, Bound, serializeXYWH, Vec, WithDisposable, } from '@blocksuite/global/utils';
import { DocCollection } from '@blocksuite/store';
import { consume } from '@lit/context';
import { baseTheme } from '@toeverything/theme';
import { css, html, LitElement, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { SHAPE_OVERLAY_HEIGHT, SHAPE_OVERLAY_WIDTH, } from '../../utils/consts.js';
import { mountShapeTextEditor, mountTextElementEditor, } from '../../utils/text.js';
import { ShapeComponentConfig } from '../toolbar/shape/shape-menu-config.js';
import { AutoCompleteFrameOverlay, AutoCompleteNoteOverlay, AutoCompleteShapeOverlay, AutoCompleteTextOverlay, capitalizeFirstLetter, createShapeElement, DEFAULT_NOTE_OVERLAY_HEIGHT, DEFAULT_TEXT_HEIGHT, DEFAULT_TEXT_WIDTH, Direction, isShape, PANEL_HEIGHT, PANEL_WIDTH, } from './utils.js';
let EdgelessAutoCompletePanel = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _connector_decorators;
    let _connector_initializers = [];
    let _connector_extraInitializers = [];
    let _currentSource_decorators;
    let _currentSource_initializers = [];
    let _currentSource_extraInitializers = [];
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _position_decorators;
    let _position_initializers = [];
    let _position_extraInitializers = [];
    let _std_decorators;
    let _std_initializers = [];
    let _std_extraInitializers = [];
    return class EdgelessAutoCompletePanel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _connector_decorators = [property({ attribute: false })];
            _currentSource_decorators = [property({ attribute: false })];
            _edgeless_decorators = [property({ attribute: false })];
            _position_decorators = [property({ attribute: false })];
            _std_decorators = [consume({
                    context: stdContext,
                })];
            __esDecorate(this, null, _connector_decorators, { kind: "accessor", name: "connector", static: false, private: false, access: { has: obj => "connector" in obj, get: obj => obj.connector, set: (obj, value) => { obj.connector = value; } }, metadata: _metadata }, _connector_initializers, _connector_extraInitializers);
            __esDecorate(this, null, _currentSource_decorators, { kind: "accessor", name: "currentSource", static: false, private: false, access: { has: obj => "currentSource" in obj, get: obj => obj.currentSource, set: (obj, value) => { obj.currentSource = value; } }, metadata: _metadata }, _currentSource_initializers, _currentSource_extraInitializers);
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _position_decorators, { kind: "accessor", name: "position", static: false, private: false, access: { has: obj => "position" in obj, get: obj => obj.position, set: (obj, value) => { obj.position = value; } }, metadata: _metadata }, _position_initializers, _position_extraInitializers);
            __esDecorate(this, null, _std_decorators, { kind: "accessor", name: "std", static: false, private: false, access: { has: obj => "std" in obj, get: obj => obj.std, set: (obj, value) => { obj.std = value; } }, metadata: _metadata }, _std_initializers, _std_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .auto-complete-panel-container {
      position: absolute;
      display: flex;
      width: 136px;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 8px 0;
      gap: 8px;
      border-radius: 8px;
      background: var(--affine-background-overlay-panel-color);
      box-shadow: var(--affine-shadow-2);
      z-index: 1;
    }

    .row-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 28px;
      padding: 4px 0;
      text-align: center;
      border-radius: 8px;
      font-family: ${unsafeCSS(baseTheme.fontSansFamily)};
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      border: 1px solid var(--affine-border-color, #e3e2e4);
      box-sizing: border-box;
    }
  `; }
        get gfx() {
            return this.std.get(GfxControllerIdentifier);
        }
        constructor(position, edgeless, currentSource, connector) {
            super();
            this._overlay = null;
            this.#connector_accessor_storage = __runInitializers(this, _connector_initializers, void 0);
            this.#currentSource_accessor_storage = (__runInitializers(this, _connector_extraInitializers), __runInitializers(this, _currentSource_initializers, void 0));
            this.#edgeless_accessor_storage = (__runInitializers(this, _currentSource_extraInitializers), __runInitializers(this, _edgeless_initializers, void 0));
            this.#position_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _position_initializers, void 0));
            this.#std_accessor_storage = (__runInitializers(this, _position_extraInitializers), __runInitializers(this, _std_initializers, void 0));
            __runInitializers(this, _std_extraInitializers);
            this.position = position;
            this.edgeless = edgeless;
            this.currentSource = currentSource;
            this.connector = connector;
        }
        _addFrame() {
            const bound = this._generateTarget(this.connector)?.nextBound;
            if (!bound)
                return;
            const { h } = bound;
            const w = h / 0.75;
            const target = this._getTargetXYWH(w, h);
            if (!target)
                return;
            const { xywh, position } = target;
            const edgeless = this.edgeless;
            const { service, surfaceBlockModel } = edgeless;
            const frameMgr = service.frame;
            const frameIndex = service.frames.length + 1;
            const id = service.addBlock('affine:frame', {
                title: new DocCollection.Y.Text(`Frame ${frameIndex}`),
                xywh: serializeXYWH(...xywh),
                presentationIndex: frameMgr.generatePresentationIndex(),
            }, surfaceBlockModel);
            edgeless.doc.captureSync();
            const frame = service.getElementById(id);
            if (!frame)
                return;
            this.connector.target = {
                id,
                position,
            };
            edgeless.service.selection.set({
                elements: [frame.id],
                editing: false,
            });
        }
        _addNote() {
            const { doc } = this.edgeless;
            const service = this.edgeless.service;
            const target = this._getTargetXYWH(DEFAULT_NOTE_WIDTH, DEFAULT_NOTE_OVERLAY_HEIGHT);
            if (!target)
                return;
            const { xywh, position } = target;
            const id = service.addBlock('affine:note', {
                xywh: serializeXYWH(...xywh),
            }, doc.root?.id);
            const note = doc.getBlock(id)?.model;
            assertInstanceOf(note, NoteBlockModel);
            doc.addBlock('affine:paragraph', { type: 'text' }, id);
            const group = this.currentSource.group;
            if (group instanceof GroupElementModel) {
                group.addChild(note);
            }
            this.connector.target = {
                id,
                position: position,
            };
            service.updateElement(this.connector.id, {
                target: { id, position },
            });
            this.edgeless.service.selection.set({
                elements: [id],
                editing: false,
            });
        }
        _addShape(targetType) {
            const edgeless = this.edgeless;
            const result = this._generateTarget(this.connector);
            if (!result)
                return;
            const currentSource = this.currentSource;
            const { nextBound, position } = result;
            const { service } = edgeless;
            const id = createShapeElement(edgeless, currentSource, targetType);
            service.updateElement(id, { xywh: nextBound.serialize() });
            service.updateElement(this.connector.id, {
                target: { id, position },
            });
            mountShapeTextEditor(service.getElementById(id), this.edgeless);
            edgeless.service.selection.set({
                elements: [id],
                editing: true,
            });
            edgeless.doc.captureSync();
        }
        _addText() {
            const target = this._getTargetXYWH(DEFAULT_TEXT_WIDTH, DEFAULT_TEXT_HEIGHT);
            if (!target)
                return;
            const { xywh, position } = target;
            const bound = Bound.fromXYWH(xywh);
            const edgelessService = this.edgeless.service;
            const textFlag = this.edgeless.doc.awarenessStore.getFlag('enable_edgeless_text');
            if (textFlag) {
                const { textId } = this.edgeless.std.command.exec('insertEdgelessText', {
                    x: bound.x,
                    y: bound.y,
                });
                if (!textId)
                    return;
                const textElement = edgelessService.getElementById(textId);
                if (!textElement)
                    return;
                edgelessService.updateElement(this.connector.id, {
                    target: { id: textId, position },
                });
                if (this.currentSource.group instanceof GroupElementModel) {
                    this.currentSource.group.addChild(textElement);
                }
                this.edgeless.service.selection.set({
                    elements: [textId],
                    editing: false,
                });
                this.edgeless.doc.captureSync();
            }
            else {
                const textId = edgelessService.addElement(CanvasElementType.TEXT, {
                    xywh: bound.serialize(),
                    text: new DocCollection.Y.Text(),
                    textAlign: 'left',
                    fontSize: 24,
                    fontFamily: FontFamily.Inter,
                    color: DEFAULT_TEXT_COLOR,
                    fontWeight: FontWeight.Regular,
                    fontStyle: FontStyle.Normal,
                });
                const textElement = edgelessService.getElementById(textId);
                assertInstanceOf(textElement, TextElementModel);
                edgelessService.updateElement(this.connector.id, {
                    target: { id: textId, position },
                });
                if (this.currentSource.group instanceof GroupElementModel) {
                    this.currentSource.group.addChild(textElement);
                }
                this.edgeless.service.selection.set({
                    elements: [textId],
                    editing: false,
                });
                this.edgeless.doc.captureSync();
                mountTextElementEditor(textElement, this.edgeless);
            }
        }
        _autoComplete(targetType) {
            this._removeOverlay();
            if (!this._connectorExist())
                return;
            switch (targetType) {
                case 'text':
                    this._addText();
                    break;
                case 'note':
                    this._addNote();
                    break;
                case 'frame':
                    this._addFrame();
                    break;
                default:
                    this._addShape(targetType);
            }
            this.remove();
        }
        _connectorExist() {
            return !!this.edgeless.service.getElementById(this.connector.id);
        }
        _generateTarget(connector) {
            const { currentSource } = this;
            let w = SHAPE_OVERLAY_WIDTH;
            let h = SHAPE_OVERLAY_HEIGHT;
            if (isShape(currentSource)) {
                const bound = Bound.deserialize(currentSource.xywh);
                w = bound.w;
                h = bound.h;
            }
            const point = connector.target.position;
            if (!point)
                return;
            const len = connector.path.length;
            const angle = CommonUtils.normalizeDegAngle(CommonUtils.toDegree(Vec.angle(connector.path[len - 2], connector.path[len - 1])));
            let nextBound;
            let position;
            // direction of the connector target arrow
            let direction;
            if (angle >= 45 && angle <= 135) {
                nextBound = new Bound(point[0] - w / 2, point[1], w, h);
                position = [0.5, 0];
                direction = Direction.Bottom;
            }
            else if (angle >= 135 && angle <= 225) {
                nextBound = new Bound(point[0] - w, point[1] - h / 2, w, h);
                position = [1, 0.5];
                direction = Direction.Left;
            }
            else if (angle >= 225 && angle <= 315) {
                nextBound = new Bound(point[0] - w / 2, point[1] - h, w, h);
                position = [0.5, 1];
                direction = Direction.Top;
            }
            else {
                nextBound = new Bound(point[0], point[1] - h / 2, w, h);
                position = [0, 0.5];
                direction = Direction.Right;
            }
            return { nextBound, position, direction };
        }
        _getCurrentSourceInfo() {
            const { currentSource } = this;
            if (isShape(currentSource)) {
                const { shapeType, shapeStyle, radius } = currentSource;
                return {
                    style: shapeStyle,
                    type: getShapeName(shapeType, radius),
                };
            }
            return {
                style: ShapeStyle.General,
                type: 'note',
            };
        }
        _getPanelPosition() {
            const { viewport } = this.edgeless.service;
            const { boundingClientRect: viewportRect, zoom } = viewport;
            const result = this._getTargetXYWH(PANEL_WIDTH / zoom, PANEL_HEIGHT / zoom);
            const pos = result ? result.xywh.slice(0, 2) : this.position;
            const coord = viewport.toViewCoord(pos[0], pos[1]);
            const { width, height } = viewportRect;
            coord[0] = CommonUtils.clamp(coord[0], 20, width - 20 - PANEL_WIDTH);
            coord[1] = CommonUtils.clamp(coord[1], 20, height - 20 - PANEL_HEIGHT);
            return coord;
        }
        _getTargetXYWH(width, height) {
            const result = this._generateTarget(this.connector);
            if (!result)
                return null;
            const { nextBound: bound, direction, position } = result;
            if (!bound)
                return null;
            const { w, h } = bound;
            let x = bound.x;
            let y = bound.y;
            switch (direction) {
                case Direction.Right:
                    y += h / 2 - height / 2;
                    break;
                case Direction.Bottom:
                    x -= width / 2 - w / 2;
                    break;
                case Direction.Left:
                    y += h / 2 - height / 2;
                    x -= width - w;
                    break;
                case Direction.Top:
                    x -= width / 2 - w / 2;
                    y += h - height;
                    break;
            }
            const xywh = [x, y, width, height];
            return { xywh, position };
        }
        _removeOverlay() {
            if (this._overlay)
                this.edgeless.surface.renderer.removeOverlay(this._overlay);
        }
        _showFrameOverlay() {
            const bound = this._generateTarget(this.connector)?.nextBound;
            if (!bound)
                return;
            const { h } = bound;
            const w = h / 0.75;
            const xywh = this._getTargetXYWH(w, h)?.xywh;
            if (!xywh)
                return;
            const strokeColor = this.std
                .get(ThemeProvider)
                .getCssVariableColor('--affine-black-30');
            this._overlay = new AutoCompleteFrameOverlay(this.gfx, xywh, strokeColor);
            this.edgeless.surface.renderer.addOverlay(this._overlay);
        }
        _showNoteOverlay() {
            const xywh = this._getTargetXYWH(DEFAULT_NOTE_WIDTH, DEFAULT_NOTE_OVERLAY_HEIGHT)?.xywh;
            if (!xywh)
                return;
            const background = this.edgeless.std
                .get(ThemeProvider)
                .getColorValue(this.edgeless.std.get(EditPropsStore).lastProps$.value['affine:note']
                .background, DEFAULT_NOTE_BACKGROUND_COLOR, true);
            this._overlay = new AutoCompleteNoteOverlay(this.gfx, xywh, background);
            this.edgeless.surface.renderer.addOverlay(this._overlay);
        }
        _showOverlay(targetType) {
            this._removeOverlay();
            if (!this._connectorExist())
                return;
            switch (targetType) {
                case 'text':
                    this._showTextOverlay();
                    break;
                case 'note':
                    this._showNoteOverlay();
                    break;
                case 'frame':
                    this._showFrameOverlay();
                    break;
                default:
                    this._showShapeOverlay(targetType);
            }
            this.edgeless.surface.refresh();
        }
        _showShapeOverlay(targetType) {
            const bound = this._generateTarget(this.connector)?.nextBound;
            if (!bound)
                return;
            const { x, y, w, h } = bound;
            const xywh = [x, y, w, h];
            const { shapeStyle, strokeColor, fillColor, strokeWidth, roughness } = this.edgeless.std.get(EditPropsStore).lastProps$.value[`shape:${targetType}`];
            const stroke = this.edgeless.std
                .get(ThemeProvider)
                .getColorValue(strokeColor, DEFAULT_SHAPE_STROKE_COLOR, true);
            const fill = this.edgeless.std
                .get(ThemeProvider)
                .getColorValue(fillColor, DEFAULT_SHAPE_FILL_COLOR, true);
            const options = {
                seed: 666,
                roughness: roughness,
                strokeLineDash: [0, 0],
                stroke,
                strokeWidth,
                fill,
            };
            this._overlay = new AutoCompleteShapeOverlay(this.gfx, xywh, targetType, options, shapeStyle);
            this.edgeless.surface.renderer.addOverlay(this._overlay);
        }
        _showTextOverlay() {
            const xywh = this._getTargetXYWH(DEFAULT_TEXT_WIDTH, DEFAULT_TEXT_HEIGHT)?.xywh;
            if (!xywh)
                return;
            this._overlay = new AutoCompleteTextOverlay(this.gfx, xywh);
            this.edgeless.surface.renderer.addOverlay(this._overlay);
        }
        connectedCallback() {
            super.connectedCallback();
            this.edgeless.handleEvent('click', ctx => {
                const { target } = ctx.get('pointerState').raw;
                const element = captureEventTarget(target);
                const clickAway = !element?.closest('edgeless-auto-complete-panel');
                if (clickAway)
                    this.remove();
            });
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this._removeOverlay();
        }
        firstUpdated() {
            this.disposables.add(this.edgeless.service.viewport.viewportUpdated.on(() => this.requestUpdate()));
        }
        render() {
            const position = this._getPanelPosition();
            if (!position)
                return nothing;
            const style = styleMap({
                left: `${position[0]}px`,
                top: `${position[1]}px`,
            });
            const { style: currentSourceStyle, type: currentSourceType } = this._getCurrentSourceInfo();
            const shapeButtons = repeat(ShapeComponentConfig, ({ name, generalIcon, scribbledIcon, tooltip }) => html `
        <edgeless-tool-icon-button
          .tooltip=${tooltip}
          @pointerenter=${() => this._showOverlay(name)}
          @pointerleave=${() => this._removeOverlay()}
          @click=${() => this._autoComplete(name)}
        >
          ${currentSourceStyle === 'General' ? generalIcon : scribbledIcon}
        </edgeless-tool-icon-button>
      `);
            return html `<div class="auto-complete-panel-container" style=${style}>
      ${shapeButtons}

      <edgeless-tool-icon-button
        .tooltip=${'Text'}
        @pointerenter=${() => this._showOverlay('text')}
        @pointerleave=${() => this._removeOverlay()}
        @click=${() => this._autoComplete('text')}
      >
        ${FontFamilyIcon}
      </edgeless-tool-icon-button>
      <edgeless-tool-icon-button
        .tooltip=${'Note'}
        @pointerenter=${() => this._showOverlay('note')}
        @pointerleave=${() => this._removeOverlay()}
        @click=${() => this._autoComplete('note')}
      >
        ${SmallNoteIcon}
      </edgeless-tool-icon-button>
      <edgeless-tool-icon-button
        .tooltip=${'Frame'}
        @pointerenter=${() => this._showOverlay('frame')}
        @pointerleave=${() => this._removeOverlay()}
        @click=${() => this._autoComplete('frame')}
      >
        ${FrameIcon}
      </edgeless-tool-icon-button>

      <edgeless-tool-icon-button
        .iconContainerPadding=${0}
        .tooltip=${capitalizeFirstLetter(currentSourceType)}
        @pointerenter=${() => this._showOverlay(currentSourceType)}
        @pointerleave=${() => this._removeOverlay()}
        @click=${() => this._autoComplete(currentSourceType)}
      >
        <div class="row-button">Add a same object</div>
      </edgeless-tool-icon-button>
    </div>`;
        }
        #connector_accessor_storage;
        get connector() { return this.#connector_accessor_storage; }
        set connector(value) { this.#connector_accessor_storage = value; }
        #currentSource_accessor_storage;
        get currentSource() { return this.#currentSource_accessor_storage; }
        set currentSource(value) { this.#currentSource_accessor_storage = value; }
        #edgeless_accessor_storage;
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #position_accessor_storage;
        get position() { return this.#position_accessor_storage; }
        set position(value) { this.#position_accessor_storage = value; }
        #std_accessor_storage;
        get std() { return this.#std_accessor_storage; }
        set std(value) { this.#std_accessor_storage = value; }
    };
})();
export { EdgelessAutoCompletePanel };
//# sourceMappingURL=auto-complete-panel.js.map