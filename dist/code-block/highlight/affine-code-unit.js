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
import { ShadowlessElement } from '@blocksuite/block-std';
import { ZERO_WIDTH_SPACE } from '@blocksuite/inline';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
let AffineCodeUnit = (() => {
    let _classSuper = ShadowlessElement;
    let _delta_decorators;
    let _delta_initializers = [];
    let _delta_extraInitializers = [];
    return class AffineCodeUnit extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _delta_decorators = [property({ type: Object })];
            __esDecorate(this, null, _delta_decorators, { kind: "accessor", name: "delta", static: false, private: false, access: { has: obj => "delta" in obj, get: obj => obj.delta, set: (obj, value) => { obj.delta = value; } }, metadata: _metadata }, _delta_initializers, _delta_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        get codeBlock() {
            return this.closest('affine-code');
        }
        get vElement() {
            return this.closest('v-element');
        }
        render() {
            const plainContent = html `<span
      ><v-text .str=${this.delta.insert}></v-text
    ></span>`;
            const codeBlock = this.codeBlock;
            const vElement = this.vElement;
            if (!codeBlock || !vElement)
                return plainContent;
            const tokens = codeBlock.highlightTokens$.value;
            if (tokens.length === 0)
                return plainContent;
            // copy the tokens to avoid modifying the original tokens
            const lineTokens = structuredClone(tokens[vElement.lineIndex]);
            if (lineTokens.length === 0)
                return plainContent;
            const startOffset = vElement.startOffset;
            const endOffset = vElement.endOffset;
            const includedTokens = [];
            lineTokens.forEach(token => {
                if ((token.offset <= startOffset &&
                    token.offset + token.content.length >= startOffset) ||
                    (token.offset >= startOffset &&
                        token.offset + token.content.length <= endOffset) ||
                    (token.offset <= endOffset &&
                        token.offset + token.content.length >= endOffset)) {
                    includedTokens.push(token);
                }
            });
            if (includedTokens.length === 0)
                return plainContent;
            if (includedTokens.length === 1) {
                const token = includedTokens[0];
                const content = token.content.slice(startOffset - token.offset, endOffset - token.offset);
                return html `<v-text
        .str=${content}
        style=${styleMap({
                    color: token.color,
                })}
      ></v-text>`;
            }
            else {
                const firstToken = includedTokens[0];
                const lastToken = includedTokens[includedTokens.length - 1];
                const firstContent = firstToken.content.slice(startOffset - firstToken.offset, firstToken.content.length);
                const lastContent = lastToken.content.slice(0, endOffset - lastToken.offset);
                firstToken.content = firstContent;
                lastToken.content = lastContent;
                const vTexts = includedTokens.map(token => {
                    return html `<v-text
          .str=${token.content}
          style=${styleMap({
                        color: token.color,
                    })}
        ></v-text>`;
                });
                return html `<span>${vTexts}</span>`;
            }
        }
        #delta_accessor_storage = __runInitializers(this, _delta_initializers, {
            insert: ZERO_WIDTH_SPACE,
        });
        get delta() { return this.#delta_accessor_storage; }
        set delta(value) { this.#delta_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _delta_extraInitializers);
        }
    };
})();
export { AffineCodeUnit };
//# sourceMappingURL=affine-code-unit.js.map