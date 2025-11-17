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
  .pie-node.child {
    width: 3rem;
    height: 3rem;
    padding: 0.6rem;
    animation: my-anim 250ms cubic-bezier(0.775, 1.325, 0.535, 1);
  }

  .pie-node.child.node-color {
    width: 0.7rem;
    height: 0.7rem;
  }

  .pie-node.child:not(.node-color)::after {
    content: attr(index);
    color: var(--affine-text-secondary-color);
    position: absolute;
    font-size: 8px;
    bottom: 10%;
    right: 30%;
  }

  .pie-node.child[hovering='true'] {
    border-color: var(--affine-primary-color);
    background-color: var(--affine-hover-color-filled);
    scale: 1.06;
  }

  .pie-node.child.node-submenu::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    background-color: var(--affine-primary-color);
    border-radius: 50%;
  }
`;
let PieNodeChild = (() => {
    let _classSuper = LitElement;
    let _hovering_decorators;
    let _hovering_initializers = [];
    let _hovering_extraInitializers = [];
    let _node_decorators;
    let _node_initializers = [];
    let _node_extraInitializers = [];
    let _onClick_decorators;
    let _onClick_initializers = [];
    let _onClick_extraInitializers = [];
    let _visible_decorators;
    let _visible_initializers = [];
    let _visible_extraInitializers = [];
    return class PieNodeChild extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _hovering_decorators = [property({ attribute: false })];
            _node_decorators = [property({ attribute: false })];
            _onClick_decorators = [property({ attribute: false })];
            _visible_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _hovering_decorators, { kind: "accessor", name: "hovering", static: false, private: false, access: { has: obj => "hovering" in obj, get: obj => obj.hovering, set: (obj, value) => { obj.hovering = value; } }, metadata: _metadata }, _hovering_initializers, _hovering_extraInitializers);
            __esDecorate(this, null, _node_decorators, { kind: "accessor", name: "node", static: false, private: false, access: { has: obj => "node" in obj, get: obj => obj.node, set: (obj, value) => { obj.node = value; } }, metadata: _metadata }, _node_initializers, _node_extraInitializers);
            __esDecorate(this, null, _onClick_decorators, { kind: "accessor", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick, set: (obj, value) => { obj.onClick = value; } }, metadata: _metadata }, _onClick_initializers, _onClick_extraInitializers);
            __esDecorate(this, null, _visible_decorators, { kind: "accessor", name: "visible", static: false, private: false, access: { has: obj => "visible" in obj, get: obj => obj.visible, set: (obj, value) => { obj.visible = value; } }, metadata: _metadata }, _visible_initializers, _visible_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = [PieNode.styles, styles]; }
        render() {
            const { model, position } = this.node;
            const [x, y] = position;
            const styles = {
                top: '50%',
                left: '50%',
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                visibility: this.visible ? 'visible' : 'hidden',
            };
            return html `<li
      style="${styleMap(styles)}"
      hovering="${this.hovering.toString()}"
      @click="${this.onClick}"
      index="${this.node.index}"
      class=${`pie-node child node-${model.type}`}
    >
      <pie-node-content
        .node=${this.node}
        .isActive=${false}
        .hoveredNode=${null}
      >
      </pie-node-content>
    </li>`;
        }
        #hovering_accessor_storage = __runInitializers(this, _hovering_initializers, void 0);
        get hovering() { return this.#hovering_accessor_storage; }
        set hovering(value) { this.#hovering_accessor_storage = value; }
        #node_accessor_storage = (__runInitializers(this, _hovering_extraInitializers), __runInitializers(this, _node_initializers, void 0));
        get node() { return this.#node_accessor_storage; }
        set node(value) { this.#node_accessor_storage = value; }
        #onClick_accessor_storage = (__runInitializers(this, _node_extraInitializers), __runInitializers(this, _onClick_initializers, void 0));
        get onClick() { return this.#onClick_accessor_storage; }
        set onClick(value) { this.#onClick_accessor_storage = value; }
        #visible_accessor_storage = (__runInitializers(this, _onClick_extraInitializers), __runInitializers(this, _visible_initializers, void 0));
        get visible() { return this.#visible_accessor_storage; }
        set visible(value) { this.#visible_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _visible_extraInitializers);
        }
    };
})();
export { PieNodeChild };
//# sourceMappingURL=pie-node-child.js.map