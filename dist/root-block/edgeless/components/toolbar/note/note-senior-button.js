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
import { Heading1Icon, LinkIcon, TextIcon, } from '@blocksuite/affine-components/icons';
import { EditPropsStore, ThemeProvider, } from '@blocksuite/affine-shared/services';
import { SignalWatcher } from '@blocksuite/global/utils';
import { computed } from '@preact/signals-core';
import { css, html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { getTooltipWithShortcut } from '../../utils.js';
import { EdgelessToolbarToolMixin } from '../mixins/tool.mixin.js';
import { toShapeNotToAdapt } from './icon.js';
let EdgelessNoteSeniorButton = (() => {
    let _classSuper = EdgelessToolbarToolMixin(SignalWatcher(LitElement));
    let _childFlavour_decorators;
    let _childFlavour_initializers = [];
    let _childFlavour_extraInitializers = [];
    let _childType_decorators;
    let _childType_initializers = [];
    let _childType_extraInitializers = [];
    let _tip_decorators;
    let _tip_initializers = [];
    let _tip_extraInitializers = [];
    return class EdgelessNoteSeniorButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _childFlavour_decorators = [state()];
            _childType_decorators = [state()];
            _tip_decorators = [state()];
            __esDecorate(this, null, _childFlavour_decorators, { kind: "accessor", name: "childFlavour", static: false, private: false, access: { has: obj => "childFlavour" in obj, get: obj => obj.childFlavour, set: (obj, value) => { obj.childFlavour = value; } }, metadata: _metadata }, _childFlavour_initializers, _childFlavour_extraInitializers);
            __esDecorate(this, null, _childType_decorators, { kind: "accessor", name: "childType", static: false, private: false, access: { has: obj => "childType" in obj, get: obj => obj.childType, set: (obj, value) => { obj.childType = value; } }, metadata: _metadata }, _childType_initializers, _childType_extraInitializers);
            __esDecorate(this, null, _tip_decorators, { kind: "accessor", name: "tip", static: false, private: false, access: { has: obj => "tip" in obj, get: obj => obj.tip, set: (obj, value) => { obj.tip = value; } }, metadata: _metadata }, _tip_initializers, _tip_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host,
    .edgeless-note-button {
      display: block;
      width: 100%;
      height: 100%;
    }
    :host * {
      box-sizing: border-box;
    }

    .note-root[data-app-theme='light'] {
      --paper-border-color: var(--affine-pure-white);
      --paper-foriegn-color: rgba(0, 0, 0, 0.1);
      --paper-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
      --icon-card-bg: #fff;
      --icon-card-shadow: 0px 2px 4px rgba(0, 0, 0, 0.22),
        inset 0px -2px 1px rgba(0, 0, 0, 0.14);
    }
    .note-root[data-app-theme='dark'] {
      --paper-border-color: var(--affine-divider-color);
      --paper-foriegn-color: rgba(255, 255, 255, 0.12);
      --paper-shadow: 0px 2px 6px rgba(0, 0, 0, 0.8);
      --icon-card-bg: #343434;
      --icon-card-shadow: 0px 2px 4px rgba(0, 0, 0, 0.6),
        inset 0px -2px 1px rgba(255, 255, 255, 0.06);
    }

    .note-root {
      width: 100%;
      height: 64px;
      background: transparent;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
    .paper {
      --y: 20px;
      --r: 4.42deg;
      width: 60px;
      height: 72px;
      background: var(--paper-bg);
      border: 1px solid var(--paper-border-color);
      position: absolute;
      transform: translateY(var(--y)) rotate(var(--r));
      color: var(--paper-foriegn-color);
      box-shadow: var(--paper-shadow);
      padding-top: 32px;
      padding-left: 3px;
      transition: transform 0.4s ease;
    }
    .edgeless-toolbar-note-icon {
      position: absolute;
      width: 26px;
      height: 26px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--affine-icon-secondary);
      background: var(--icon-card-bg);
      box-shadow: var(--icon-card-shadow);
      bottom: 12px;
      transition: transform 0.4s ease;
      transform: translateX(var(--x)) translateY(var(--y)) rotate(var(--r));
    }
    .edgeless-toolbar-note-icon.link {
      --x: -22px;
      --y: -5px;
      --r: -6deg;
      transform-origin: 0% 100%;
    }
    .edgeless-toolbar-note-icon.text {
      --r: 4deg;
      --x: 0px;
      --y: 0px;
    }
    .edgeless-toolbar-note-icon.heading {
      --x: 21px;
      --y: -7px;
      --r: 8deg;
      transform-origin: 0% 100%;
    }

    .note-root:hover .paper {
      --y: 15px;
    }
    .note-root:hover .link {
      --x: -25px;
      --y: -5px;
      --r: -9.5deg;
    }
    .note-root:hover .text {
      --y: -10px;
    }
    .note-root:hover .heading {
      --x: 23px;
      --y: -8px;
      --r: 15deg;
    }
  `; }
        _toggleNoteMenu() {
            if (this.tryDisposePopper())
                return;
            const { edgeless, childFlavour, childType, tip } = this;
            this.setEdgelessTool({
                type: 'affine:note',
                childFlavour,
                childType,
                tip,
            });
            const menu = this.createPopper('edgeless-note-menu', this);
            Object.assign(menu.element, {
                edgeless,
                childFlavour,
                childType,
                tip,
                onChange: (props) => {
                    this._states.forEach(key => {
                        if (props[key] != undefined) {
                            Object.assign(this, { [key]: props[key] });
                        }
                    });
                    this.setEdgelessTool({
                        type: 'affine:note',
                        childFlavour: this.childFlavour,
                        childType: this.childType,
                        tip: this.tip,
                    });
                },
            });
        }
        render() {
            const appTheme = this.edgeless.std.get(ThemeProvider).app$.value;
            return html `<edgeless-toolbar-button
      class="edgeless-note-button"
      .tooltip=${this.popper ? '' : getTooltipWithShortcut('Note', 'N')}
      .tooltipOffset=${5}
    >
      <div
        class="note-root"
        data-app-theme=${appTheme}
        @click=${this._toggleNoteMenu}
        style="--paper-bg: ${this._noteBg$.value}"
      >
        <div class="paper">${toShapeNotToAdapt}</div>
        <div class="edgeless-toolbar-note-icon link">${LinkIcon}</div>
        <div class="edgeless-toolbar-note-icon heading">${Heading1Icon}</div>
        <div class="edgeless-toolbar-note-icon text">${TextIcon}</div>
      </div>
    </edgeless-toolbar-button>`;
        }
        #childFlavour_accessor_storage;
        // TODO: better to extract these states outside of component?
        get childFlavour() { return this.#childFlavour_accessor_storage; }
        set childFlavour(value) { this.#childFlavour_accessor_storage = value; }
        #childType_accessor_storage;
        get childType() { return this.#childType_accessor_storage; }
        set childType(value) { this.#childType_accessor_storage = value; }
        #tip_accessor_storage;
        get tip() { return this.#tip_accessor_storage; }
        set tip(value) { this.#tip_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._noteBg$ = computed(() => {
                return this.edgeless.std
                    .get(ThemeProvider)
                    .generateColorProperty(this.edgeless.std.get(EditPropsStore).lastProps$.value['affine:note']
                    .background);
            });
            this._states = ['childFlavour', 'childType', 'tip'];
            this.enableActiveBackground = true;
            this.type = 'affine:note';
            this.#childFlavour_accessor_storage = __runInitializers(this, _childFlavour_initializers, 'affine:paragraph');
            this.#childType_accessor_storage = (__runInitializers(this, _childFlavour_extraInitializers), __runInitializers(this, _childType_initializers, 'text'));
            this.#tip_accessor_storage = (__runInitializers(this, _childType_extraInitializers), __runInitializers(this, _tip_initializers, 'Note'));
            __runInitializers(this, _tip_extraInitializers);
        }
    };
})();
export { EdgelessNoteSeniorButton };
//# sourceMappingURL=note-senior-button.js.map