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
import { renderGroups } from '@blocksuite/affine-components/toolbar';
import { WithDisposable } from '@blocksuite/global/utils';
import { MoreHorizontalIcon, MoreVerticalIcon } from '@blocksuite/icons/lit';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { ElementToolbarMoreMenuContext } from './context.js';
let EdgelessMoreButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _elements_decorators;
    let _elements_initializers = [];
    let _elements_extraInitializers = [];
    let _groups_decorators;
    let _groups_initializers = [];
    let _groups_extraInitializers = [];
    let _vertical_decorators;
    let _vertical_initializers = [];
    let _vertical_extraInitializers = [];
    return class EdgelessMoreButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _edgeless_decorators = [property({ attribute: false })];
            _elements_decorators = [property({ attribute: false })];
            _groups_decorators = [property({ attribute: false })];
            _vertical_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _elements_decorators, { kind: "accessor", name: "elements", static: false, private: false, access: { has: obj => "elements" in obj, get: obj => obj.elements, set: (obj, value) => { obj.elements = value; } }, metadata: _metadata }, _elements_initializers, _elements_extraInitializers);
            __esDecorate(this, null, _groups_decorators, { kind: "accessor", name: "groups", static: false, private: false, access: { has: obj => "groups" in obj, get: obj => obj.groups, set: (obj, value) => { obj.groups = value; } }, metadata: _metadata }, _groups_initializers, _groups_extraInitializers);
            __esDecorate(this, null, _vertical_decorators, { kind: "accessor", name: "vertical", static: false, private: false, access: { has: obj => "vertical" in obj, get: obj => obj.vertical, set: (obj, value) => { obj.vertical = value; } }, metadata: _metadata }, _vertical_initializers, _vertical_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        render() {
            const context = new ElementToolbarMoreMenuContext(this.edgeless);
            const actions = renderGroups(this.groups, context);
            return html `
      <editor-menu-button
        .contentPadding=${'8px'}
        .button=${html `
          <editor-icon-button aria-label="More" .tooltip=${'More'}>
            ${this.vertical
                ? MoreVerticalIcon({ width: '20', height: '20' })
                : MoreHorizontalIcon({ width: '20', height: '20' })}
          </editor-icon-button>
        `}
      >
        <div
          class="more-actions-container"
          data-size="large"
          data-orientation="vertical"
        >
          ${actions}
        </div>
      </editor-menu-button>
    `;
        }
        #edgeless_accessor_storage = __runInitializers(this, _edgeless_initializers, void 0);
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #elements_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _elements_initializers, []));
        get elements() { return this.#elements_accessor_storage; }
        set elements(value) { this.#elements_accessor_storage = value; }
        #groups_accessor_storage = (__runInitializers(this, _elements_extraInitializers), __runInitializers(this, _groups_initializers, void 0));
        get groups() { return this.#groups_accessor_storage; }
        set groups(value) { this.#groups_accessor_storage = value; }
        #vertical_accessor_storage = (__runInitializers(this, _groups_extraInitializers), __runInitializers(this, _vertical_initializers, false));
        get vertical() { return this.#vertical_accessor_storage; }
        set vertical(value) { this.#vertical_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _vertical_extraInitializers);
        }
    };
})();
export { EdgelessMoreButton };
//# sourceMappingURL=button.js.map