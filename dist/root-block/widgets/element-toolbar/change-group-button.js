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
import { NoteIcon, RenameIcon, UngroupButtonIcon, } from '@blocksuite/affine-components/icons';
import { toast } from '@blocksuite/affine-components/toast';
import { renderToolbarSeparator } from '@blocksuite/affine-components/toolbar';
import { DEFAULT_NOTE_HEIGHT, NoteDisplayMode } from '@blocksuite/affine-model';
import { matchFlavours } from '@blocksuite/affine-shared/utils';
import { deserializeXYWH, serializeXYWH, WithDisposable, } from '@blocksuite/global/utils';
import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { join } from 'lit/directives/join.js';
import { mountGroupTitleEditor } from '../../edgeless/utils/text.js';
let EdgelessChangeGroupButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    let _groups_decorators;
    let _groups_initializers = [];
    let _groups_extraInitializers = [];
    return class EdgelessChangeGroupButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _edgeless_decorators = [property({ attribute: false })];
            _groups_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            __esDecorate(this, null, _groups_decorators, { kind: "accessor", name: "groups", static: false, private: false, access: { has: obj => "groups" in obj, get: obj => obj.groups, set: (obj, value) => { obj.groups = value; } }, metadata: _metadata }, _groups_initializers, _groups_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        _insertIntoPage() {
            if (!this.edgeless.doc.root)
                return;
            const rootModel = this.edgeless.doc.root;
            const notes = rootModel.children.filter(model => matchFlavours(model, ['affine:note']) &&
                model.displayMode !== NoteDisplayMode.EdgelessOnly);
            const lastNote = notes[notes.length - 1];
            const referenceGroup = this.groups[0];
            let targetParent = lastNote?.id;
            if (!lastNote) {
                const targetXYWH = deserializeXYWH(referenceGroup.xywh);
                targetXYWH[1] = targetXYWH[1] + targetXYWH[3];
                targetXYWH[3] = DEFAULT_NOTE_HEIGHT;
                const newAddedNote = this.edgeless.doc.addBlock('affine:note', {
                    xywh: serializeXYWH(...targetXYWH),
                }, rootModel.id);
                targetParent = newAddedNote;
            }
            this.edgeless.doc.addBlock('affine:surface-ref', {
                reference: this.groups[0].id,
                refFlavour: 'group',
            }, targetParent);
            toast(this.edgeless.host, 'Group has been inserted into page');
        }
        render() {
            const { groups } = this;
            const onlyOne = groups.length === 1;
            return join([
                onlyOne
                    ? html `
              <editor-icon-button
                aria-label="Insert into Page"
                .tooltip=${'Insert into Page'}
                .iconSize=${'20px'}
                .labelHeight=${'20px'}
                @click=${this._insertIntoPage}
              >
                ${NoteIcon}
                <span class="label">Insert into Page</span>
              </editor-icon-button>
            `
                    : nothing,
                onlyOne
                    ? html `
              <editor-icon-button
                aria-label="Rename"
                .tooltip=${'Rename'}
                .iconSize=${'20px'}
                @click=${() => mountGroupTitleEditor(groups[0], this.edgeless)}
              >
                ${RenameIcon}
              </editor-icon-button>
            `
                    : nothing,
                html `
          <editor-icon-button
            aria-label="Ungroup"
            .tooltip=${'Ungroup'}
            .iconSize=${'20px'}
            @click=${() => groups.forEach(group => this.edgeless.service.ungroup(group))}
          >
            ${UngroupButtonIcon}
          </editor-icon-button>
        `,
            ].filter(button => button !== nothing), renderToolbarSeparator);
        }
        #edgeless_accessor_storage = __runInitializers(this, _edgeless_initializers, void 0);
        get edgeless() { return this.#edgeless_accessor_storage; }
        set edgeless(value) { this.#edgeless_accessor_storage = value; }
        #groups_accessor_storage = (__runInitializers(this, _edgeless_extraInitializers), __runInitializers(this, _groups_initializers, void 0));
        get groups() { return this.#groups_accessor_storage; }
        set groups(value) { this.#groups_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _groups_extraInitializers);
        }
    };
})();
export { EdgelessChangeGroupButton };
export function renderGroupButton(edgeless, groups) {
    if (!groups?.length)
        return nothing;
    return html `
    <edgeless-change-group-button .edgeless=${edgeless} .groups=${groups}>
    </edgeless-change-group-button>
  `;
}
//# sourceMappingURL=change-group-button.js.map