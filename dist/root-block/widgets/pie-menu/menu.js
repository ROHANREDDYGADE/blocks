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
import { assertEquals, assertExists, Slot, Vec, WithDisposable, } from '@blocksuite/global/utils';
import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { PieNode } from './node.js';
import { PieManager } from './pie-manager.js';
import { pieMenuStyles } from './styles.js';
import { getPosition, isColorNode, isCommandNode, isNodeWithAction, isNodeWithChildren, isRootNode, isSubmenuNode, } from './utils.js';
const { toDegree, toRadian } = CommonUtils;
let PieMenu = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _position_decorators;
    let _position_initializers = [];
    let _position_extraInitializers = [];
    let _rootComponent_decorators;
    let _rootComponent_initializers = [];
    let _rootComponent_extraInitializers = [];
    let _schema_decorators;
    let _schema_initializers = [];
    let _schema_extraInitializers = [];
    let _widgetComponent_decorators;
    let _widgetComponent_initializers = [];
    let _widgetComponent_extraInitializers = [];
    return class PieMenu extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _position_decorators = [property({ attribute: false })];
            _rootComponent_decorators = [property({ attribute: false })];
            _schema_decorators = [property({ attribute: false })];
            _widgetComponent_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _position_decorators, { kind: "accessor", name: "position", static: false, private: false, access: { has: obj => "position" in obj, get: obj => obj.position, set: (obj, value) => { obj.position = value; } }, metadata: _metadata }, _position_initializers, _position_extraInitializers);
            __esDecorate(this, null, _rootComponent_decorators, { kind: "accessor", name: "rootComponent", static: false, private: false, access: { has: obj => "rootComponent" in obj, get: obj => obj.rootComponent, set: (obj, value) => { obj.rootComponent = value; } }, metadata: _metadata }, _rootComponent_initializers, _rootComponent_extraInitializers);
            __esDecorate(this, null, _schema_decorators, { kind: "accessor", name: "schema", static: false, private: false, access: { has: obj => "schema" in obj, get: obj => obj.schema, set: (obj, value) => { obj.schema = value; } }, metadata: _metadata }, _schema_initializers, _schema_extraInitializers);
            __esDecorate(this, null, _widgetComponent_decorators, { kind: "accessor", name: "widgetComponent", static: false, private: false, access: { has: obj => "widgetComponent" in obj, get: obj => obj.widgetComponent, set: (obj, value) => { obj.widgetComponent = value; } }, metadata: _metadata }, _widgetComponent_initializers, _widgetComponent_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = pieMenuStyles; }
        get activeNode() {
            const node = this.selectionChain[this.selectionChain.length - 1];
            assertExists(node, 'Required atLeast 1 node active');
            return node;
        }
        get hoveredNode() {
            return this._hoveredNode;
        }
        get rootNode() {
            const node = this.selectionChain[0];
            assertExists(node, 'No root node');
            return node;
        }
        _createNodeTree(nodeSchema) {
            const node = new PieNode();
            const { angle, startAngle, endAngle, label } = nodeSchema;
            node.id = label;
            node.model = nodeSchema;
            node.angle = angle ?? 0;
            node.startAngle = startAngle ?? 0;
            node.endAngle = endAngle ?? 0;
            node.menu = this;
            if (!isRootNode(nodeSchema)) {
                node.slot = 'children-slot';
                const { PIE_RADIUS } = PieManager.settings;
                const isColorNode = nodeSchema.type === 'color';
                const radius = isColorNode ? PIE_RADIUS * 0.6 : PIE_RADIUS;
                node.position = getPosition(toRadian(node.angle), [radius, radius]);
            }
            else {
                node.position = [0, 0];
            }
            if (isNodeWithChildren(nodeSchema)) {
                nodeSchema.children.forEach((childSchema, i) => {
                    const childNode = this._createNodeTree(childSchema);
                    childNode.containerNode = node;
                    childNode.index = i + 1;
                    childNode.setAttribute('index', childNode.index.toString());
                    node.append(childNode);
                });
            }
            return node;
        }
        _setupEvents() {
            this._disposables.addFromEvent(this.widgetComponent, 'pointermove', this._handlePointerMove);
            this._disposables.addFromEvent(document, 'keydown', this._handleKeyDown);
        }
        close() {
            this.abortController.abort();
        }
        connectedCallback() {
            super.connectedCallback();
            this._setupEvents();
            const root = this._createNodeTree(this.schema.root);
            this.selectionChain.push(root);
        }
        /**
         * Position of the active node relative to the view
         */
        getActiveNodeRelPos() {
            const position = [...this.position]; // use the menus position at start which will be the position of the root node
            for (const node of this.selectionChain) {
                position[0] += node.position[0];
                position[1] += node.position[1];
            }
            return position;
        }
        getActiveNodeToMouseLenSq(mouse) {
            const [x, y] = mouse;
            const [nodeX, nodeY] = this.getActiveNodeRelPos();
            const dx = x - nodeX;
            const dy = y - nodeY;
            return Vec.len2([dx, dy]);
        }
        getNodeRelPos(node) {
            const position = [...this.position];
            let cur = node;
            while (cur !== null) {
                position[0] += cur.position[0];
                position[1] += cur.position[1];
                cur = cur.containerNode;
            }
            return position;
        }
        isActiveNode(node) {
            return this.activeNode === node;
        }
        isChildOfActiveNode(node) {
            return node.containerNode === this.activeNode;
        }
        openSubmenu(submenu) {
            assertEquals(submenu.model.type, 'submenu', 'Need node of type submenu');
            if (isNodeWithAction(submenu.model))
                submenu.select();
            this.selectionChain.push(submenu);
            this.setHovered(null);
            this.slots.requestNodeUpdate.emit();
        }
        popSelectionChainTo(node) {
            assertEquals(isNodeWithChildren(node.model), true, 'Required a root node or a submenu node');
            while (this.selectionChain.length > 1 && this.activeNode !== node) {
                this.selectionChain.pop();
            }
            this.requestUpdate();
            this.slots.requestNodeUpdate.emit();
        }
        render() {
            const [x, y] = this.position;
            const menuStyles = {
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
            };
            return html ` <div class="pie-menu-container">
      <div class="overlay" @click="${() => this.abortController.abort()}"></div>

      <div style="${styleMap(menuStyles)}" class="pie-menu">
        ${this.rootNode ?? nothing}
      </div>
    </div>`;
        }
        selectHovered() {
            const { hoveredNode } = this;
            if (hoveredNode) {
                hoveredNode.select();
            }
        }
        setHovered(node) {
            clearTimeout(this._openSubmenuTimeout);
            this._hoveredNode = node;
            if (!node)
                return;
            if (isSubmenuNode(node.model)) {
                const { openOnHover, timeoutOverride } = node.model;
                const { SUBMENU_OPEN_TIMEOUT } = PieManager.settings;
                if (openOnHover !== undefined && !openOnHover)
                    return;
                this._openSubmenuTimeout = setTimeout(() => {
                    this.openSubmenu(node);
                }, timeoutOverride ?? SUBMENU_OPEN_TIMEOUT);
            }
        }
        #position_accessor_storage;
        get position() { return this.#position_accessor_storage; }
        set position(value) { this.#position_accessor_storage = value; }
        #rootComponent_accessor_storage;
        get rootComponent() { return this.#rootComponent_accessor_storage; }
        set rootComponent(value) { this.#rootComponent_accessor_storage = value; }
        #schema_accessor_storage;
        get schema() { return this.#schema_accessor_storage; }
        set schema(value) { this.#schema_accessor_storage = value; }
        #widgetComponent_accessor_storage;
        get widgetComponent() { return this.#widgetComponent_accessor_storage; }
        set widgetComponent(value) { this.#widgetComponent_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._handleKeyDown = (ev) => {
                const { key } = ev;
                if (key === 'Escape') {
                    return this.abortController.abort();
                }
                if (ev.code === 'Backspace') {
                    if (this.selectionChain.length <= 1)
                        return;
                    const { containerNode } = this.activeNode;
                    if (containerNode)
                        this.popSelectionChainTo(containerNode);
                }
                if (key.match(/\d+/)) {
                    this.selectChildWithIndex(parseInt(key));
                }
            };
            this._handlePointerMove = (ev) => {
                const { clientX, clientY } = ev;
                const { ACTIVATE_THRESHOLD_MIN } = PieManager.settings;
                const lenSq = this.getActiveNodeToMouseLenSq([clientX, clientY]);
                if (lenSq > ACTIVATE_THRESHOLD_MIN ** 2) {
                    const [nodeX, nodeY] = this.getActiveNodeRelPos();
                    const dx = clientX - nodeX;
                    const dy = clientY - nodeY;
                    const TAU = Math.PI * 2;
                    const angle = toDegree((Math.atan2(dy, dx) + TAU) % TAU); // convert from [-PI, PI] to [0  TAU]
                    this.slots.pointerAngleUpdated.emit(angle);
                }
                else {
                    this.slots.pointerAngleUpdated.emit(null); // acts like a abort signal
                }
            };
            this._hoveredNode = null;
            this.selectChildWithIndex = (index) => {
                const activeNode = this.activeNode;
                if (!activeNode || isNaN(index))
                    return;
                const node = activeNode.querySelector(`& > affine-pie-node[index='${index}']`);
                if (node instanceof PieNode && !isColorNode(node.model)) {
                    // colors are more than 9 may be another method ?
                    if (isSubmenuNode(node.model))
                        this.openSubmenu(node);
                    else
                        node.select();
                    if (isCommandNode(node.model))
                        this.close();
                }
            };
            this.abortController = new AbortController();
            this.selectionChain = [];
            this.slots = {
                pointerAngleUpdated: new Slot(),
                requestNodeUpdate: new Slot(),
            };
            this.#position_accessor_storage = __runInitializers(this, _position_initializers, void 0);
            this.#rootComponent_accessor_storage = (__runInitializers(this, _position_extraInitializers), __runInitializers(this, _rootComponent_initializers, void 0));
            this.#schema_accessor_storage = (__runInitializers(this, _rootComponent_extraInitializers), __runInitializers(this, _schema_initializers, void 0));
            this.#widgetComponent_accessor_storage = (__runInitializers(this, _schema_extraInitializers), __runInitializers(this, _widgetComponent_initializers, void 0));
            __runInitializers(this, _widgetComponent_extraInitializers);
        }
    };
})();
export { PieMenu };
//# sourceMappingURL=menu.js.map