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
import { ShapeStyle } from '@blocksuite/affine-model';
import { Slot } from '@blocksuite/global/utils';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { ShapeComponentConfig } from '../toolbar/shape/shape-menu-config.js';
let EdgelessShapePanel = (() => {
    let _classSuper = LitElement;
    let _selectedShape_decorators;
    let _selectedShape_initializers = [];
    let _selectedShape_extraInitializers = [];
    let _shapeStyle_decorators;
    let _shapeStyle_initializers = [];
    let _shapeStyle_extraInitializers = [];
    return class EdgelessShapePanel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _selectedShape_decorators = [property({ attribute: false })];
            _shapeStyle_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _selectedShape_decorators, { kind: "accessor", name: "selectedShape", static: false, private: false, access: { has: obj => "selectedShape" in obj, get: obj => obj.selectedShape, set: (obj, value) => { obj.selectedShape = value; } }, metadata: _metadata }, _selectedShape_initializers, _selectedShape_extraInitializers);
            __esDecorate(this, null, _shapeStyle_decorators, { kind: "accessor", name: "shapeStyle", static: false, private: false, access: { has: obj => "shapeStyle" in obj, get: obj => obj.shapeStyle, set: (obj, value) => { obj.shapeStyle = value; } }, metadata: _metadata }, _shapeStyle_initializers, _shapeStyle_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  `; }
        _onSelect(value) {
            this.selectedShape = value;
            this.slots.select.emit(value);
        }
        disconnectedCallback() {
            this.slots.select.dispose();
            super.disconnectedCallback();
        }
        render() {
            return repeat(ShapeComponentConfig, item => item.name, ({ name, generalIcon, scribbledIcon, tooltip, disabled }) => html `<edgeless-tool-icon-button
          .disabled=${disabled}
          .tooltip=${tooltip}
          .active=${this.selectedShape === name}
          .activeMode=${'background'}
          @click=${() => {
                if (disabled)
                    return;
                this._onSelect(name);
            }}
        >
          ${this.shapeStyle === ShapeStyle.General
                ? generalIcon
                : scribbledIcon}
        </edgeless-tool-icon-button>`);
        }
        #selectedShape_accessor_storage;
        get selectedShape() { return this.#selectedShape_accessor_storage; }
        set selectedShape(value) { this.#selectedShape_accessor_storage = value; }
        #shapeStyle_accessor_storage;
        get shapeStyle() { return this.#shapeStyle_accessor_storage; }
        set shapeStyle(value) { this.#shapeStyle_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this.slots = {
                select: new Slot(),
            };
            this.#selectedShape_accessor_storage = __runInitializers(this, _selectedShape_initializers, undefined);
            this.#shapeStyle_accessor_storage = (__runInitializers(this, _selectedShape_extraInitializers), __runInitializers(this, _shapeStyle_initializers, ShapeStyle.Scribbled));
            __runInitializers(this, _shapeStyle_extraInitializers);
        }
    };
})();
export { EdgelessShapePanel };
//# sourceMappingURL=shape-panel.js.map