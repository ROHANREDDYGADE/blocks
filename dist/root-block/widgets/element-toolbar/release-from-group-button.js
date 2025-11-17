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
import { ReleaseFromGroupButtonIcon } from '@blocksuite/affine-components/icons';
import { GroupElementModel } from '@blocksuite/affine-model';
import { WithDisposable } from '@blocksuite/global/utils';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
let EdgelessReleaseFromGroupButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    return class EdgelessReleaseFromGroupButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _edgeless_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        _releaseFromGroup() {
            const service = this.edgeless.service;
            const element = service.selection.firstElement;
            if (!(element.group instanceof GroupElementModel))
                return;
            const group = element.group;
            // eslint-disable-next-line unicorn/prefer-dom-node-remove
            group.removeChild(element);
            element.index = service.layer.generateIndex();
            const parent = group.group;
            if (parent instanceof GroupElementModel) {
                parent.addChild(element);
            }
        }
        render() {
            return html `
      <editor-icon-button
        aria-label="Release from group"
        .tooltip=${'Release from group'}
        .iconSize=${'20px'}
        @click=${() => this._releaseFromGroup()}
      >
        ${ReleaseFromGroupButtonIcon}
      </editor-icon-button>
    `;
        }
        #edgeless_accessor_storage = __runInitializers(this, _edgeless_initializers, void 0);
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _edgeless_extraInitializers);
        }
    };
})();
export { EdgelessReleaseFromGroupButton };
export function renderReleaseFromGroupButton(edgeless) {
    return html `
    <edgeless-release-from-group-button
      .edgeless=${edgeless}
    ></edgeless-release-from-group-button>
  `;
}
//# sourceMappingURL=release-from-group-button.js.map