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
import { EdgelessIcon, PageIcon } from '@blocksuite/affine-components/icons';
import { NoteDisplayMode } from '@blocksuite/affine-model';
import { stopPropagation } from '@blocksuite/affine-shared/utils';
import { WithDisposable } from '@blocksuite/global/utils';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
let NoteDisplayModePanel = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _displayMode_decorators;
    let _displayMode_initializers = [];
    let _displayMode_extraInitializers = [];
    let _onSelect_decorators;
    let _onSelect_initializers = [];
    let _onSelect_extraInitializers = [];
    let _panelWidth_decorators;
    let _panelWidth_initializers = [];
    let _panelWidth_extraInitializers = [];
    return class NoteDisplayModePanel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _displayMode_decorators = [property({ attribute: false })];
            _onSelect_decorators = [property({ attribute: false })];
            _panelWidth_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _displayMode_decorators, { kind: "accessor", name: "displayMode", static: false, private: false, access: { has: obj => "displayMode" in obj, get: obj => obj.displayMode, set: (obj, value) => { obj.displayMode = value; } }, metadata: _metadata }, _displayMode_initializers, _displayMode_extraInitializers);
            __esDecorate(this, null, _onSelect_decorators, { kind: "accessor", name: "onSelect", static: false, private: false, access: { has: obj => "onSelect" in obj, get: obj => obj.onSelect, set: (obj, value) => { obj.onSelect = value; } }, metadata: _metadata }, _onSelect_initializers, _onSelect_extraInitializers);
            __esDecorate(this, null, _panelWidth_decorators, { kind: "accessor", name: "panelWidth", static: false, private: false, access: { has: obj => "panelWidth" in obj, get: obj => obj.panelWidth, set: (obj, value) => { obj.panelWidth = value; } }, metadata: _metadata }, _panelWidth_initializers, _panelWidth_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 180px;
      width: var(--panel-width);
      gap: 4px;
    }
    .item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 30px;
      padding: 4px 12px;
      border-radius: 4px;
      gap: 4px;
      box-sizing: border-box;
      cursor: pointer;
    }
    .item-label {
      flex: 1 1 0;
    }
    .item-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      color: var(--affine-icon-color);
    }
    .item:hover,
    .item.selected {
      background-color: var(--affine-hover-color);
    }
  `; }
        _DisplayModeIcon(mode) {
            switch (mode) {
                case NoteDisplayMode.DocAndEdgeless:
                    return html `${PageIcon} ${EdgelessIcon}`;
                case NoteDisplayMode.DocOnly:
                    return html `${PageIcon}`;
                case NoteDisplayMode.EdgelessOnly:
                    return html `${EdgelessIcon}`;
            }
        }
        _DisplayModeLabel(mode) {
            switch (mode) {
                case NoteDisplayMode.DocAndEdgeless:
                    return 'In Both';
                case NoteDisplayMode.DocOnly:
                    return 'In Page Only';
                case NoteDisplayMode.EdgelessOnly:
                    return 'In Edgeless Only';
            }
        }
        render() {
            this.style.setProperty('--panel-width', `${this.panelWidth}px`);
            return repeat(Object.keys(NoteDisplayMode), mode => mode, mode => {
                const displayMode = NoteDisplayMode[mode];
                const isSelected = displayMode === this.displayMode;
                return html `<div
          class="item ${isSelected ? 'selected' : ''} ${displayMode}"
          @click=${() => this.onSelect(displayMode)}
          @dblclick=${stopPropagation}
          @pointerdown=${stopPropagation}
        >
          <div class="item-label">${this._DisplayModeLabel(displayMode)}</div>
          <div class="item-icon">${this._DisplayModeIcon(displayMode)}</div>
        </div>`;
            });
        }
        #displayMode_accessor_storage = __runInitializers(this, _displayMode_initializers, void 0);
        get displayMode() { return this.#displayMode_accessor_storage; }
        set displayMode(value) { this.#displayMode_accessor_storage = value; }
        #onSelect_accessor_storage = (__runInitializers(this, _displayMode_extraInitializers), __runInitializers(this, _onSelect_initializers, void 0));
        get onSelect() { return this.#onSelect_accessor_storage; }
        set onSelect(value) { this.#onSelect_accessor_storage = value; }
        #panelWidth_accessor_storage = (__runInitializers(this, _onSelect_extraInitializers), __runInitializers(this, _panelWidth_initializers, 240));
        get panelWidth() { return this.#panelWidth_accessor_storage; }
        set panelWidth(value) { this.#panelWidth_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _panelWidth_extraInitializers);
        }
    };
})();
export { NoteDisplayModePanel };
//# sourceMappingURL=note-display-mode-panel.js.map