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
import { CommonUtils } from '@blocksuite/affine-block-surface';
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { getPosition } from '../utils.js';
const styles = css `
  .rotator {
    position: absolute;
    background: var(--affine-background-overlay-panel-color);
    box-shadow: var(--affine-shadow-2);
    border: 2px solid var(--affine-primary-color);
    border-radius: 50%;
    width: 7px;
    height: 7px;
    top: 50%;
    left: 50%;
  }
`;
let PieCenterRotator = (() => {
    let _classSuper = LitElement;
    let _angle_decorators;
    let _angle_initializers = [];
    let _angle_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    return class PieCenterRotator extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _angle_decorators = [property({ attribute: false })];
            _isActive_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _angle_decorators, { kind: "accessor", name: "angle", static: false, private: false, access: { has: obj => "angle" in obj, get: obj => obj.angle, set: (obj, value) => { obj.angle = value; } }, metadata: _metadata }, _angle_initializers, _angle_extraInitializers);
            __esDecorate(this, null, _isActive_decorators, { kind: "accessor", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = styles; }
        render() {
            if (!this.isActive || this.angle === null)
                return nothing;
            const [x, y] = getPosition(CommonUtils.toRadian(this.angle), [45, 45]);
            const styles = {
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
            };
            return html `<span style="${styleMap(styles)}" class="rotator"></span>`;
        }
        #angle_accessor_storage = __runInitializers(this, _angle_initializers, null);
        get angle() { return this.#angle_accessor_storage; }
        set angle(value) { this.#angle_accessor_storage = value; }
        #isActive_accessor_storage = (__runInitializers(this, _angle_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        get isActive() { return this.#isActive_accessor_storage; }
        set isActive(value) { this.#isActive_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _isActive_extraInitializers);
        }
    };
})();
export { PieCenterRotator };
//# sourceMappingURL=rotator.js.map