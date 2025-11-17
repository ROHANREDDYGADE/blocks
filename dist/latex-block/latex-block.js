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
import { CaptionedBlockComponent } from '@blocksuite/affine-components/caption';
import { createLitPortal } from '@blocksuite/affine-components/portal';
import { effect } from '@preact/signals-core';
import katex from 'katex';
import { html, render } from 'lit';
import { query } from 'lit/decorators.js';
import { latexBlockStyles } from './styles.js';
let LatexBlockComponent = (() => {
    let _classSuper = CaptionedBlockComponent;
    let __katexContainer_decorators;
    let __katexContainer_initializers = [];
    let __katexContainer_extraInitializers = [];
    return class LatexBlockComponent extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __katexContainer_decorators = [query('.latex-block-container')];
            __esDecorate(this, null, __katexContainer_decorators, { kind: "accessor", name: "_katexContainer", static: false, private: false, access: { has: obj => "_katexContainer" in obj, get: obj => obj._katexContainer, set: (obj, value) => { obj._katexContainer = value; } }, metadata: _metadata }, __katexContainer_initializers, __katexContainer_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = latexBlockStyles; }
        get editorPlacement() {
            return 'bottom';
        }
        get isBlockSelected() {
            const blockSelection = this.selection.filter('block');
            return blockSelection.some(selection => selection.blockId === this.model.id);
        }
        firstUpdated(props) {
            super.firstUpdated(props);
            const { disposables } = this;
            this._editorAbortController?.abort();
            this._editorAbortController = new AbortController();
            disposables.add(() => {
                this._editorAbortController?.abort();
            });
            const katexContainer = this._katexContainer;
            if (!katexContainer)
                return;
            disposables.add(effect(() => {
                const latex = this.model.latex$.value;
                katexContainer.replaceChildren();
                // @ts-ignore
                delete katexContainer['_$litPart$'];
                if (latex.length === 0) {
                    render(html `<span class="latex-block-empty-placeholder">Equation</span>`, katexContainer);
                }
                else {
                    try {
                        katex.render(latex, katexContainer, {
                            displayMode: true,
                            output: 'mathml',
                        });
                    }
                    catch {
                        katexContainer.replaceChildren();
                        // @ts-ignore
                        delete katexContainer['_$litPart$'];
                        render(html `<span class="latex-block-error-placeholder"
                >Error equation</span
              >`, katexContainer);
                    }
                }
            }));
            this.disposables.addFromEvent(this, 'click', () => {
                if (this.isBlockSelected) {
                    this.toggleEditor();
                }
                else {
                    this.selectBlock();
                }
            });
        }
        removeEditor(portal) {
            portal.remove();
        }
        renderBlock() {
            return html `
      <div contenteditable="false" class="latex-block-container">
        <div class="katex"></div>
      </div>
    `;
        }
        selectBlock() {
            this.host.command.exec('selectBlock', {
                focusBlock: this,
            });
        }
        toggleEditor() {
            const katexContainer = this._katexContainer;
            if (!katexContainer)
                return;
            this._editorAbortController?.abort();
            this._editorAbortController = new AbortController();
            this.selection.setGroup('note', []);
            const portal = createLitPortal({
                template: html `<latex-editor-menu
        .std=${this.std}
        .latexSignal=${this.model.latex$}
        .abortController=${this._editorAbortController}
      ></latex-editor-menu>`,
                container: this.host,
                computePosition: {
                    referenceElement: this,
                    placement: this.editorPlacement,
                    autoUpdate: {
                        animationFrame: true,
                    },
                },
                closeOnClickAway: true,
                abortController: this._editorAbortController,
                shadowDom: false,
                portalStyles: {
                    zIndex: 'var(--affine-z-index-popover)',
                },
            });
            this._editorAbortController.signal.addEventListener('abort', () => {
                this.removeEditor(portal);
            }, { once: true });
        }
        #_katexContainer_accessor_storage;
        get _katexContainer() { return this.#_katexContainer_accessor_storage; }
        set _katexContainer(value) { this.#_katexContainer_accessor_storage = value; }
        constructor() {
            super(...arguments);
            this._editorAbortController = null;
            this.#_katexContainer_accessor_storage = __runInitializers(this, __katexContainer_initializers, void 0);
            __runInitializers(this, __katexContainer_extraInitializers);
        }
    };
})();
export { LatexBlockComponent };
//# sourceMappingURL=latex-block.js.map