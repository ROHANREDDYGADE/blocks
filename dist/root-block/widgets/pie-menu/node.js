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
import { WithDisposable } from '@blocksuite/global/utils';
import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { pieNodeStyles } from './styles.js';
import { isAngleBetween, isColorNode, isCommandNode, isNodeWithAction, isNodeWithChildren, isRootNode, } from './utils.js';
let PieNode = (() => {
    let _classSuper = WithDisposable(LitElement);
    let __isHovering_decorators;
    let __isHovering_initializers = [];
    let __isHovering_extraInitializers = [];
    let _angle_decorators;
    let _angle_initializers = [];
    let _angle_extraInitializers = [];
    let _containerNode_decorators;
    let _containerNode_initializers = [];
    let _containerNode_extraInitializers = [];
    let _endAngle_decorators;
    let _endAngle_initializers = [];
    let _endAngle_extraInitializers = [];
    let _index_decorators;
    let _index_initializers = [];
    let _index_extraInitializers = [];
    let _menu_decorators;
    let _menu_initializers = [];
    let _menu_extraInitializers = [];
    let _model_decorators;
    let _model_initializers = [];
    let _model_extraInitializers = [];
    let _position_decorators;
    let _position_initializers = [];
    let _position_extraInitializers = [];
    let _startAngle_decorators;
    let _startAngle_initializers = [];
    let _startAngle_extraInitializers = [];
    return class PieNode extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __isHovering_decorators = [state()];
            _angle_decorators = [property({ attribute: false })];
            _containerNode_decorators = [property({ attribute: false })];
            _endAngle_decorators = [property({ attribute: false })];
            _index_decorators = [property({ attribute: false })];
            _menu_decorators = [property({ attribute: false })];
            _model_decorators = [property({ attribute: false })];
            _position_decorators = [property({ attribute: false })];
            _startAngle_decorators = [property({ attribute: false })];
            __esDecorate(this, null, __isHovering_decorators, { kind: "accessor", name: "_isHovering", static: false, private: false, access: { has: obj => "_isHovering" in obj, get: obj => obj._isHovering, set: (obj, value) => { obj._isHovering = value; } }, metadata: _metadata }, __isHovering_initializers, __isHovering_extraInitializers);
            __esDecorate(this, null, _angle_decorators, { kind: "accessor", name: "angle", static: false, private: false, access: { has: obj => "angle" in obj, get: obj => obj.angle, set: (obj, value) => { obj.angle = value; } }, metadata: _metadata }, _angle_initializers, _angle_extraInitializers);
            __esDecorate(this, null, _containerNode_decorators, { kind: "accessor", name: "containerNode", static: false, private: false, access: { has: obj => "containerNode" in obj, get: obj => obj.containerNode, set: (obj, value) => { obj.containerNode = value; } }, metadata: _metadata }, _containerNode_initializers, _containerNode_extraInitializers);
            __esDecorate(this, null, _endAngle_decorators, { kind: "accessor", name: "endAngle", static: false, private: false, access: { has: obj => "endAngle" in obj, get: obj => obj.endAngle, set: (obj, value) => { obj.endAngle = value; } }, metadata: _metadata }, _endAngle_initializers, _endAngle_extraInitializers);
            __esDecorate(this, null, _index_decorators, { kind: "accessor", name: "index", static: false, private: false, access: { has: obj => "index" in obj, get: obj => obj.index, set: (obj, value) => { obj.index = value; } }, metadata: _metadata }, _index_initializers, _index_extraInitializers);
            __esDecorate(this, null, _menu_decorators, { kind: "accessor", name: "menu", static: false, private: false, access: { has: obj => "menu" in obj, get: obj => obj.menu, set: (obj, value) => { obj.menu = value; } }, metadata: _metadata }, _menu_initializers, _menu_extraInitializers);
            __esDecorate(this, null, _model_decorators, { kind: "accessor", name: "model", static: false, private: false, access: { has: obj => "model" in obj, get: obj => obj.model, set: (obj, value) => { obj.model = value; } }, metadata: _metadata }, _model_initializers, _model_extraInitializers);
            __esDecorate(this, null, _position_decorators, { kind: "accessor", name: "position", static: false, private: false, access: { has: obj => "position" in obj, get: obj => obj.position, set: (obj, value) => { obj.position = value; } }, metadata: _metadata }, _position_initializers, _position_extraInitializers);
            __esDecorate(this, null, _startAngle_decorators, { kind: "accessor", name: "startAngle", static: false, private: false, access: { has: obj => "startAngle" in obj, get: obj => obj.startAngle, set: (obj, value) => { obj.startAngle = value; } }, metadata: _metadata }, _startAngle_initializers, _startAngle_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = pieNodeStyles; }
        get icon() {
            const icon = this.model.icon;
            if (typeof icon === 'function') {
                const { menu } = this;
                const { rootComponent, widgetComponent } = menu;
                return icon({
                    rootComponent,
                    menu,
                    widgetComponent,
                    node: this,
                });
            }
            return icon;
        }
        _renderCenterNode() {
            const isActiveNode = this.isActive();
            return html `
      <pie-node-center
        .node=${this}
        .hoveredNode=${this.menu.hoveredNode}
        .isActive=${isActiveNode}
        .onMouseEnter=${this._handleGoBack}
        .rotatorAngle="${this._rotatorAngle}"
      >
        <slot name="children-slot"></slot>
      </pie-node-center>
    `;
        }
        _renderChildNode() {
            const visible = this.menu.isChildOfActiveNode(this);
            return html `<pie-node-child
      .node="${this}"
      .visible="${visible}"
      .hovering="${this._isHovering}"
      .onClick="${this._handleChildNodeClick}"
    >
    </pie-node-child>`;
        } // for selecting with keyboard
        _setupEvents() {
            this._disposables.add(this.menu.slots.pointerAngleUpdated.on(this._onPointerAngleUpdated));
            this._disposables.add(this.menu.slots.requestNodeUpdate.on(() => this.requestUpdate()));
        }
        connectedCallback() {
            super.connectedCallback();
            this._setupEvents();
        }
        isActive() {
            return this.menu.isActiveNode(this);
        }
        isCenterNode() {
            return (isNodeWithChildren(this.model) && this.menu.selectionChain.includes(this));
        }
        render() {
            return this.isCenterNode()
                ? this._renderCenterNode()
                : this._renderChildNode();
        }
        select() {
            const schema = this.model;
            if (isRootNode(schema))
                return;
            const ctx = {
                rootComponent: this.menu.rootComponent,
                menu: this.menu,
                widgetComponent: this.menu.widgetComponent,
                node: this,
            };
            if (isNodeWithAction(schema)) {
                schema.action(ctx);
            }
            else if (isColorNode(schema)) {
                schema.onChange(schema.color, ctx);
            }
            this.requestUpdate();
        }
        #_isHovering_accessor_storage;
        get _isHovering() { return this.#_isHovering_accessor_storage; }
        set _isHovering(value) { this.#_isHovering_accessor_storage = value; }
        #angle_accessor_storage;
        get angle() { return this.#angle_accessor_storage; }
        set angle(value) { this.#angle_accessor_storage = value; }
        #containerNode_accessor_storage;
        get containerNode() { return this.#containerNode_accessor_storage; }
        set containerNode(value) { this.#containerNode_accessor_storage = value; }
        #endAngle_accessor_storage;
        get endAngle() { return this.#endAngle_accessor_storage; }
        set endAngle(value) { this.#endAngle_accessor_storage = value; }
        #index_accessor_storage;
        get index() { return this.#index_accessor_storage; }
        set index(value) { this.#index_accessor_storage = value; }
        #menu_accessor_storage;
        get menu() { return this.#menu_accessor_storage; }
        set menu(value) { this.#menu_accessor_storage = value; }
        #model_accessor_storage;
        get model() { return this.#model_accessor_storage; }
        set model(value) { this.#model_accessor_storage = value; }
        #position_accessor_storage;
        get position() { return this.#position_accessor_storage; }
        set position(value) { this.#position_accessor_storage = value; }
        #startAngle_accessor_storage;
        get startAngle() { return this.#startAngle_accessor_storage; }
        set startAngle(value) { this.#startAngle_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._handleChildNodeClick = () => {
                this.select();
                if (isCommandNode(this.model))
                    this.menu.close();
            };
            this._handleGoBack = () => {
                // If the node is not active and if it is hovered then we can go back to that node
                if (this.menu.activeNode !== this) {
                    this.menu.popSelectionChainTo(this);
                }
            };
            this._onPointerAngleUpdated = (angle) => {
                this._rotatorAngle = angle;
                this.menu.activeNode.requestUpdate();
                if (isRootNode(this.model) || !this.menu.isChildOfActiveNode(this))
                    return;
                if (angle === null) {
                    this._isHovering = false;
                    this.menu.setHovered(null);
                    return;
                }
                if (isAngleBetween(angle, this.startAngle, this.endAngle)) {
                    if (this.menu.hoveredNode !== this) {
                        this._isHovering = true;
                        this.menu.setHovered(this);
                    }
                }
                else {
                    this._isHovering = false;
                }
            };
            this._rotatorAngle = null;
            this.#_isHovering_accessor_storage = __runInitializers(this, __isHovering_initializers, false);
            this.#angle_accessor_storage = (__runInitializers(this, __isHovering_extraInitializers), __runInitializers(this, _angle_initializers, void 0));
            this.#containerNode_accessor_storage = (__runInitializers(this, _angle_extraInitializers), __runInitializers(this, _containerNode_initializers, null));
            this.#endAngle_accessor_storage = (__runInitializers(this, _containerNode_extraInitializers), __runInitializers(this, _endAngle_initializers, void 0));
            this.#index_accessor_storage = (__runInitializers(this, _endAngle_extraInitializers), __runInitializers(this, _index_initializers, void 0));
            this.#menu_accessor_storage = (__runInitializers(this, _index_extraInitializers), __runInitializers(this, _menu_initializers, void 0));
            this.#model_accessor_storage = (__runInitializers(this, _menu_extraInitializers), __runInitializers(this, _model_initializers, void 0));
            this.#position_accessor_storage = (__runInitializers(this, _model_extraInitializers), __runInitializers(this, _position_initializers, void 0));
            this.#startAngle_accessor_storage = (__runInitializers(this, _position_extraInitializers), __runInitializers(this, _startAngle_initializers, void 0));
            __runInitializers(this, _startAngle_extraInitializers);
        }
    };
})();
export { PieNode };
//# sourceMappingURL=node.js.map