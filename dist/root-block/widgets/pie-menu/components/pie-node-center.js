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
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { PieNode } from '../node.js';
const styles = css `
  .pie-parent-node-container {
    position: absolute;
    list-style-type: none;
  }

  .pie-node.center {
    width: 6rem;
    height: 6rem;
    padding: 0.4rem;
  }

  .pie-node.center[active='true'] .node-content > svg,
  .pie-node.center[active='true'] .node-content > .color-unit,
  .pie-node.center[active='true'] .node-content > .color-unit > svg {
    width: 2rem !important;
    height: 2rem !important;
  }

  .pie-node.center[active='false'] {
    width: 3rem;
    height: 3rem;
    opacity: 0.6;
  }
`;
let PieNodeCenter = (() => {
    let _classSuper = LitElement;
    let _hoveredNode_decorators;
    let _hoveredNode_initializers = [];
    let _hoveredNode_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _node_decorators;
    let _node_initializers = [];
    let _node_extraInitializers = [];
    let _onMouseEnter_decorators;
    let _onMouseEnter_initializers = [];
    let _onMouseEnter_extraInitializers = [];
    let _rotatorAngle_decorators;
    let _rotatorAngle_initializers = [];
    let _rotatorAngle_extraInitializers = [];
    return class PieNodeCenter extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _hoveredNode_decorators = [property({ attribute: false })];
            _isActive_decorators = [property({ attribute: false })];
            _node_decorators = [property({ attribute: false })];
            _onMouseEnter_decorators = [property({ attribute: false })];
            _rotatorAngle_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _hoveredNode_decorators, { kind: "accessor", name: "hoveredNode", static: false, private: false, access: { has: obj => "hoveredNode" in obj, get: obj => obj.hoveredNode, set: (obj, value) => { obj.hoveredNode = value; } }, metadata: _metadata }, _hoveredNode_initializers, _hoveredNode_extraInitializers);
            __esDecorate(this, null, _isActive_decorators, { kind: "accessor", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(this, null, _node_decorators, { kind: "accessor", name: "node", static: false, private: false, access: { has: obj => "node" in obj, get: obj => obj.node, set: (obj, value) => { obj.node = value; } }, metadata: _metadata }, _node_initializers, _node_extraInitializers);
            __esDecorate(this, null, _onMouseEnter_decorators, { kind: "accessor", name: "onMouseEnter", static: false, private: false, access: { has: obj => "onMouseEnter" in obj, get: obj => obj.onMouseEnter, set: (obj, value) => { obj.onMouseEnter = value; } }, metadata: _metadata }, _onMouseEnter_initializers, _onMouseEnter_extraInitializers);
            __esDecorate(this, null, _rotatorAngle_decorators, { kind: "accessor", name: "rotatorAngle", static: false, private: false, access: { has: obj => "rotatorAngle" in obj, get: obj => obj.rotatorAngle, set: (obj, value) => { obj.rotatorAngle = value; } }, metadata: _metadata }, _rotatorAngle_initializers, _rotatorAngle_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = [PieNode.styles, styles]; }
        render() {
            const [x, y] = this.node.position;
            const styles = {
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
            };
            return html `
      <div style="${styleMap(styles)}" class="pie-parent-node-container">
        <div
          style="${styleMap({ transform: 'translate(-50%, -50%)' })}"
          active="${this.isActive.toString()}"
          @mouseenter="${this.onMouseEnter}"
          class="pie-node center"
        >
          <pie-node-content
            .node="${this.node}"
            .hoveredNode="${this.hoveredNode}"
            .isActive="${this.isActive}"
          ></pie-node-content>

          <pie-center-rotator
            .angle=${this.rotatorAngle}
            .isActive=${this.isActive}
          ></pie-center-rotator>
        </div>
        <slot></slot>
      </div>
    `;
        }
        #hoveredNode_accessor_storage = __runInitializers(this, _hoveredNode_initializers, void 0);
        get hoveredNode() { return this.#hoveredNode_accessor_storage; }
        set hoveredNode(value) { this.#hoveredNode_accessor_storage = value; }
        #isActive_accessor_storage = (__runInitializers(this, _hoveredNode_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        get isActive() { return this.#isActive_accessor_storage; }
        set isActive(value) { this.#isActive_accessor_storage = value; }
        #node_accessor_storage = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _node_initializers, void 0));
        get node() { return this.#node_accessor_storage; }
        set node(value) { this.#node_accessor_storage = value; }
        #onMouseEnter_accessor_storage = (__runInitializers(this, _node_extraInitializers), __runInitializers(this, _onMouseEnter_initializers, void 0));
        get onMouseEnter() { return this.#onMouseEnter_accessor_storage; }
        set onMouseEnter(value) { this.#onMouseEnter_accessor_storage = value; }
        #rotatorAngle_accessor_storage = (__runInitializers(this, _onMouseEnter_extraInitializers), __runInitializers(this, _rotatorAngle_initializers, null));
        get rotatorAngle() { return this.#rotatorAngle_accessor_storage; }
        set rotatorAngle(value) { this.#rotatorAngle_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _rotatorAngle_extraInitializers);
        }
    };
})();
export { PieNodeCenter };
//# sourceMappingURL=pie-node-center.js.map