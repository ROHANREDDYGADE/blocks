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
import { RemoteCursor } from '@blocksuite/affine-components/icons';
import { requestThrottledConnectedFrame } from '@blocksuite/affine-shared/utils';
import { WidgetComponent } from '@blocksuite/block-std';
import { assertExists, pickValues } from '@blocksuite/global/utils';
import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { getSelectedRect, isTopLevelBlock, } from '../../../root-block/edgeless/utils/query.js';
import { RemoteColorManager } from '../../../root-block/remote-color-manager/remote-color-manager.js';
export const AFFINE_EDGELESS_REMOTE_SELECTION_WIDGET = 'affine-edgeless-remote-selection-widget';
let EdgelessRemoteSelectionWidget = (() => {
    let _classSuper = WidgetComponent;
    let __remoteCursors_decorators;
    let __remoteCursors_initializers = [];
    let __remoteCursors_extraInitializers = [];
    let __remoteRects_decorators;
    let __remoteRects_initializers = [];
    let __remoteRects_extraInitializers = [];
    return class EdgelessRemoteSelectionWidget extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __remoteCursors_decorators = [state()];
            __remoteRects_decorators = [state()];
            __esDecorate(this, null, __remoteCursors_decorators, { kind: "accessor", name: "_remoteCursors", static: false, private: false, access: { has: obj => "_remoteCursors" in obj, get: obj => obj._remoteCursors, set: (obj, value) => { obj._remoteCursors = value; } }, metadata: _metadata }, __remoteCursors_initializers, __remoteCursors_extraInitializers);
            __esDecorate(this, null, __remoteRects_decorators, { kind: "accessor", name: "_remoteRects", static: false, private: false, access: { has: obj => "_remoteRects" in obj, get: obj => obj._remoteRects, set: (obj, value) => { obj._remoteRects = value; } }, metadata: _metadata }, __remoteRects_initializers, __remoteRects_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      pointer-events: none;
      position: absolute;
      left: 0;
      top: 0;
      transform-origin: left top;
      contain: size layout;
      z-index: 1;
    }

    .remote-rect {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 4px;
      box-sizing: border-box;
      border-width: 3px;
      z-index: 1;
      transform-origin: center center;
    }

    .remote-cursor {
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: left top;
      z-index: 1;
    }

    .remote-cursor > svg {
      display: block;
    }

    .remote-username {
      margin-left: 22px;
      margin-top: -2px;

      color: white;

      max-width: 160px;
      padding: 0px 3px;
      border: 1px solid var(--affine-pure-black-20);

      box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.16);
      border-radius: 4px;

      font-size: 12px;
      line-height: 18px;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `; }
        get edgeless() {
            return this.block;
        }
        get selection() {
            return this.edgeless.service.selection;
        }
        get surface() {
            return this.edgeless.surface;
        }
        connectedCallback() {
            super.connectedCallback();
            const { _disposables, doc, edgeless } = this;
            pickValues(edgeless.service.surface, [
                'elementAdded',
                'elementRemoved',
                'elementUpdated',
            ]).forEach(slot => {
                _disposables.add(slot.on(this._updateOnElementChange));
            });
            _disposables.add(doc.slots.blockUpdated.on(this._updateOnElementChange));
            _disposables.add(this.selection.slots.remoteUpdated.on(this._updateRemoteRects));
            _disposables.add(this.selection.slots.remoteCursorUpdated.on(this._updateRemoteCursor));
            _disposables.add(edgeless.service.viewport.viewportUpdated.on(() => {
                this._updateTransform();
            }));
            this._updateTransform();
            this._updateRemoteRects();
            this._remoteColorManager = new RemoteColorManager(this.std);
        }
        render() {
            const { _remoteRects, _remoteCursors, _remoteColorManager } = this;
            assertExists(_remoteColorManager);
            const rects = repeat(_remoteRects.entries(), value => value[0], ([id, rect]) => html `<div
          data-client-id=${id}
          class="remote-rect"
          style=${styleMap({
                pointerEvents: 'none',
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                borderStyle: rect.borderStyle,
                borderColor: _remoteColorManager.get(id),
                transform: `translate(${rect.left}px, ${rect.top}px) rotate(${rect.rotate}deg)`,
            })}
        ></div>`);
            const cursors = repeat(_remoteCursors.entries(), value => value[0], ([id, cursor]) => {
                return html `<div
          data-client-id=${id}
          class="remote-cursor"
          style=${styleMap({
                    pointerEvents: 'none',
                    transform: `translate(${cursor.x}px, ${cursor.y}px) scale(calc(1/var(--v-zoom)))`,
                    color: _remoteColorManager.get(id),
                })}
        >
          ${RemoteCursor}
          <div
            class="remote-username"
            style=${styleMap({
                    backgroundColor: _remoteColorManager.get(id),
                })}
          >
            ${cursor.user?.name ?? 'Unknown'}
          </div>
        </div>`;
            });
            return html `
      <div class="affine-edgeless-remote-selection">${rects}${cursors}</div>
    `;
        }
        #_remoteCursors_accessor_storage;
        get _remoteCursors() { return this.#_remoteCursors_accessor_storage; }
        set _remoteCursors(value) { this.#_remoteCursors_accessor_storage = value; }
        #_remoteRects_accessor_storage;
        get _remoteRects() { return this.#_remoteRects_accessor_storage; }
        set _remoteRects(value) { this.#_remoteRects_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._remoteColorManager = null;
            this._updateOnElementChange = (element) => {
                const id = typeof element === 'string' ? element : element.id;
                if (this.isConnected && this.selection.hasRemote(id))
                    this._updateRemoteRects();
            };
            this._updateRemoteCursor = () => {
                const remoteCursors = new Map();
                const status = this.doc.awarenessStore.getStates();
                this.selection.remoteCursorSelectionMap.forEach((cursorSelection, clientId) => {
                    remoteCursors.set(clientId, {
                        x: cursorSelection.x,
                        y: cursorSelection.y,
                        user: status.get(clientId)?.user,
                    });
                });
                this._remoteCursors = remoteCursors;
            };
            this._updateRemoteRects = () => {
                const { selection, block } = this;
                const remoteSelectionsMap = selection.remoteSurfaceSelectionsMap;
                const remoteRects = new Map();
                remoteSelectionsMap.forEach((selections, clientId) => {
                    selections.forEach(selection => {
                        if (selection.elements.length === 0)
                            return;
                        const elements = selection.elements
                            .map(id => block.service.getElementById(id))
                            .filter(element => element);
                        const rect = getSelectedRect(elements);
                        if (rect.width === 0 || rect.height === 0)
                            return;
                        const { left, top } = rect;
                        const [width, height] = [rect.width, rect.height];
                        let rotate = 0;
                        if (elements.length === 1) {
                            const element = elements[0];
                            if (!isTopLevelBlock(element)) {
                                rotate = element.rotate ?? 0;
                            }
                        }
                        remoteRects.set(clientId, {
                            width,
                            height,
                            borderStyle: 'solid',
                            left,
                            top,
                            rotate,
                        });
                    });
                });
                this._remoteRects = remoteRects;
            };
            this._updateTransform = requestThrottledConnectedFrame(() => {
                const { translateX, translateY, zoom } = this.edgeless.service.viewport;
                this.style.setProperty('--v-zoom', `${zoom}`);
                this.style.setProperty('transform', `translate(${translateX}px, ${translateY}px) scale(var(--v-zoom))`);
            }, this);
            this.#_remoteCursors_accessor_storage = __runInitializers(this, __remoteCursors_initializers, new Map());
            this.#_remoteRects_accessor_storage = (__runInitializers(this, __remoteCursors_extraInitializers), __runInitializers(this, __remoteRects_initializers, new Map()));
            __runInitializers(this, __remoteRects_extraInitializers);
        }
    };
})();
export { EdgelessRemoteSelectionWidget };
//# sourceMappingURL=index.js.map