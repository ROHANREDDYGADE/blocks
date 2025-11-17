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
import { GroupElementModel, MindmapElementModel, } from '@blocksuite/affine-model';
import { TelemetryProvider, } from '@blocksuite/affine-shared/services';
import { SignalWatcher, WithDisposable } from '@blocksuite/global/utils';
import { LockIcon, UnlockIcon } from '@blocksuite/icons/lit';
import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
let EdgelessLockButton = (() => {
    let _classSuper = SignalWatcher(WithDisposable(LitElement));
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    return class EdgelessLockButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _edgeless_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get _selectedElements() {
            const elements = new Set();
            this.edgeless.service.selection.selectedElements.forEach(element => {
                if (element.group instanceof MindmapElementModel) {
                    elements.add(element.group);
                }
                else {
                    elements.add(element);
                }
            });
            return [...elements];
        }
        _lock() {
            const { service, doc, std } = this.edgeless;
            doc.captureSync();
            // get most top selected elements(*) from tree, like in a tree below
            //         G0
            //        /  \
            //      E1*  G1
            //          /  \
            //        E2*  E3*
            //
            // (*) selected elements, [E1, E2, E3]
            // return [E1]
            const selectedElements = this._selectedElements;
            const levels = selectedElements.map(element => element.groups.length);
            const topElement = selectedElements[levels.indexOf(Math.min(...levels))];
            const otherElements = selectedElements.filter(element => element !== topElement);
            // release other elements from their groups and group with top element
            otherElements.forEach(element => {
                // eslint-disable-next-line unicorn/prefer-dom-node-remove
                element.group?.removeChild(element);
                topElement.group?.addChild(element);
            });
            if (otherElements.length === 0) {
                topElement.lock();
                this.edgeless.gfx.selection.set({
                    editing: false,
                    elements: [topElement.id],
                });
                track(std, topElement, 'lock');
                return;
            }
            const groupId = service.createGroup([topElement, ...otherElements]);
            if (groupId) {
                const group = service.getElementById(groupId);
                if (group) {
                    group.lock();
                    this.edgeless.gfx.selection.set({
                        editing: false,
                        elements: [groupId],
                    });
                    track(std, group, 'group-lock');
                    return;
                }
            }
            selectedElements.forEach(e => {
                e.lock();
                track(std, e, 'lock');
            });
            this.edgeless.gfx.selection.set({
                editing: false,
                elements: selectedElements.map(e => e.id),
            });
        }
        _unlock() {
            const { service, doc } = this.edgeless;
            doc.captureSync();
            this._selectedElements.forEach(element => {
                if (element instanceof GroupElementModel) {
                    service.ungroup(element);
                }
                else {
                    element.lockedBySelf = false;
                }
                track(this.edgeless.std, element, 'unlock');
            });
        }
        render() {
            const hasLocked = this._selectedElements.some(element => element.isLocked());
            this.dataset.locked = hasLocked ? 'true' : 'false';
            const icon = hasLocked ? UnlockIcon : LockIcon;
            return html `<editor-icon-button
      @click=${hasLocked ? this._unlock : this._lock}
    >
      ${icon({ width: '20px', height: '20px' })}
      ${hasLocked
                ? html `<span class="label medium">Click to unlock</span>`
                : nothing}
    </editor-icon-button>`;
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
export { EdgelessLockButton };
function track(std, element, control) {
    const type = 'flavour' in element
        ? (element.flavour.split(':')[1] ?? element.flavour)
        : element.type;
    std.getOptional(TelemetryProvider)?.track('EdgelessElementLocked', {
        page: 'whiteboard editor',
        segment: 'element toolbar',
        module: 'element toolbar',
        control,
        type,
    });
}
//# sourceMappingURL=lock-button.js.map