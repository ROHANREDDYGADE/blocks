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
import { assertEquals } from '@blocksuite/global/utils';
import { css, html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ColorUnit } from '../../../edgeless/components/panel/color-panel.js';
import { isSubmenuNode } from '../utils.js';
const styles = css `
  .node-content > svg {
    width: 24px;
    height: 24px;
  }

  .node-content.center[active='true'] > svg,
  .node-content.center[active='true'] > .color-unit,
  .node-content.center[active='true'] > .color-unit > svg {
    width: 2rem !important;
    height: 2rem !important;
  }
`;
let PieNodeContent = (() => {
    let _classSuper = LitElement;
    let __nodeContentElement_decorators;
    let __nodeContentElement_initializers = [];
    let __nodeContentElement_extraInitializers = [];
    let _hoveredNode_decorators;
    let _hoveredNode_initializers = [];
    let _hoveredNode_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _node_decorators;
    let _node_initializers = [];
    let _node_extraInitializers = [];
    return class PieNodeContent extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __nodeContentElement_decorators = [query('.node-content')];
            _hoveredNode_decorators = [property({ attribute: false })];
            _isActive_decorators = [property({ attribute: false })];
            _node_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __nodeContentElement_decorators, { kind: "accessor", name: "_nodeContentElement", static: false, private: false, access: { has: obj => "_nodeContentElement" in obj, get: obj => obj._nodeContentElement, set: (obj, value) => { obj._nodeContentElement = value; } }, metadata: _metadata }, __nodeContentElement_initializers, __nodeContentElement_extraInitializers);
            __esDecorate(this, null, _hoveredNode_decorators, { kind: "accessor", name: "hoveredNode", static: false, private: false, access: { has: obj => "hoveredNode" in obj, get: obj => obj.hoveredNode, set: (obj, value) => { obj.hoveredNode = value; } }, metadata: _metadata }, _hoveredNode_initializers, _hoveredNode_extraInitializers);
            __esDecorate(this, null, _isActive_decorators, { kind: "accessor", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(this, null, _node_decorators, { kind: "accessor", name: "node", static: false, private: false, access: { has: obj => "node" in obj, get: obj => obj.node, set: (obj, value) => { obj.node = value; } }, metadata: _metadata }, _node_initializers, _node_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = styles; }
        _renderCenterNodeContent() {
            if (isSubmenuNode(this.node.model) && !this.isActive) {
                return this._renderChildNodeContent();
            }
            const { menu, model } = this.node;
            const isActiveNode = menu.isActiveNode(this.node);
            const hoveredNode = this.hoveredNode;
            if (this.isActive &&
                isSubmenuNode(model) &&
                model.role === 'color-picker') {
                if (!hoveredNode)
                    return this.node.icon;
                assertEquals(hoveredNode.model.type, 'color', 'IPieSubMenuNode.role with color-picker should have children of type color');
                const { color, hollowCircle } = hoveredNode.model;
                return ColorUnit(color, { hollowCircle });
            }
            const { label } = model;
            const centerLabelOrIcon = this.node.icon ?? label;
            return isActiveNode
                ? hoveredNode
                    ? hoveredNode.model.label
                    : centerLabelOrIcon
                : centerLabelOrIcon;
        }
        _renderChildNodeContent() {
            return this.node.icon;
        }
        render() {
            const content = this.node.isCenterNode()
                ? this._renderCenterNodeContent()
                : this._renderChildNodeContent();
            return html `
      <div
        active="${this.isActive.toString()}"
        class="node-content ${this.node.isCenterNode() ? 'center' : 'child'}"
      >
        ${content}
      </div>
    `;
        }
        updated(changedProperties) {
            super.updated(changedProperties);
            if (!changedProperties.has('hoveredNode') ||
                !this._nodeContentElement ||
                !this.isActive)
                return;
            const fadeIn = [
                {
                    opacity: 0,
                },
                { opacity: 1 },
            ];
            this._nodeContentElement.animate(fadeIn, {
                duration: 250,
                easing: 'cubic-bezier(0.775, 1.325, 0.535, 1)',
                fill: 'forwards',
            });
        }
        #_nodeContentElement_accessor_storage = __runInitializers(this, __nodeContentElement_initializers, void 0);
        get _nodeContentElement() { return this.#_nodeContentElement_accessor_storage; }
        set _nodeContentElement(value) { this.#_nodeContentElement_accessor_storage = value; }
        #hoveredNode_accessor_storage = (__runInitializers(this, __nodeContentElement_extraInitializers), __runInitializers(this, _hoveredNode_initializers, void 0));
        get hoveredNode() { return this.#hoveredNode_accessor_storage; }
        set hoveredNode(value) { this.#hoveredNode_accessor_storage = value; }
        #isActive_accessor_storage = (__runInitializers(this, _hoveredNode_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
        get isActive() { return this.#isActive_accessor_storage; }
        set isActive(value) { this.#isActive_accessor_storage = value; }
        #node_accessor_storage = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _node_initializers, void 0));
        get node() { return this.#node_accessor_storage; }
        set node(value) { this.#node_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _node_extraInitializers);
        }
    };
})();
export { PieNodeContent };
//# sourceMappingURL=pie-node-content.js.map