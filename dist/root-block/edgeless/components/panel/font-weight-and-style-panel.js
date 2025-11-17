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
import { TextUtils } from '@blocksuite/affine-block-surface';
import { CheckIcon } from '@blocksuite/affine-components/icons';
import { FontFamily, FontFamilyMap, FontStyle, FontWeight, } from '@blocksuite/affine-model';
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { join } from 'lit/directives/join.js';
import { repeat } from 'lit/directives/repeat.js';
const FONT_WEIGHT_CHOOSE = [
    [FontWeight.Light, () => 'Light'],
    [FontWeight.Regular, () => 'Regular'],
    [FontWeight.SemiBold, () => 'Semibold'],
];
let EdgelessFontWeightAndStylePanel = (() => {
    let _classSuper = LitElement;
    let _fontFamily_decorators;
    let _fontFamily_initializers = [];
    let _fontFamily_extraInitializers = [];
    let _fontStyle_decorators;
    let _fontStyle_initializers = [];
    let _fontStyle_extraInitializers = [];
    let _fontWeight_decorators;
    let _fontWeight_initializers = [];
    let _fontWeight_extraInitializers = [];
    let _onSelect_decorators;
    let _onSelect_initializers = [];
    let _onSelect_extraInitializers = [];
    return class EdgelessFontWeightAndStylePanel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _fontFamily_decorators = [property({ attribute: false })];
            _fontStyle_decorators = [property({ attribute: false })];
            _fontWeight_decorators = [property({ attribute: false })];
            _onSelect_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _fontFamily_decorators, { kind: "accessor", name: "fontFamily", static: false, private: false, access: { has: obj => "fontFamily" in obj, get: obj => obj.fontFamily, set: (obj, value) => { obj.fontFamily = value; } }, metadata: _metadata }, _fontFamily_initializers, _fontFamily_extraInitializers);
            __esDecorate(this, null, _fontStyle_decorators, { kind: "accessor", name: "fontStyle", static: false, private: false, access: { has: obj => "fontStyle" in obj, get: obj => obj.fontStyle, set: (obj, value) => { obj.fontStyle = value; } }, metadata: _metadata }, _fontStyle_initializers, _fontStyle_extraInitializers);
            __esDecorate(this, null, _fontWeight_decorators, { kind: "accessor", name: "fontWeight", static: false, private: false, access: { has: obj => "fontWeight" in obj, get: obj => obj.fontWeight, set: (obj, value) => { obj.fontWeight = value; } }, metadata: _metadata }, _fontWeight_initializers, _fontWeight_extraInitializers);
            __esDecorate(this, null, _onSelect_decorators, { kind: "accessor", name: "onSelect", static: false, private: false, access: { has: obj => "onSelect" in obj, get: obj => obj.onSelect, set: (obj, value) => { obj.onSelect = value; } }, metadata: _metadata }, _onSelect_initializers, _onSelect_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    :host {
      display: flex;
      align-items: start;
      flex-direction: column;
      min-width: 124px;
    }

    edgeless-tool-icon-button {
      width: 100%;
    }
  `; }
        _isActive(fontWeight, fontStyle = FontStyle.Normal) {
            return this.fontWeight === fontWeight && this.fontStyle === fontStyle;
        }
        _isDisabled(fontWeight, fontStyle = FontStyle.Normal) {
            // Compatible with old data
            if (!(this.fontFamily in FontFamilyMap))
                return false;
            const fontFace = TextUtils.getFontFaces()
                .filter(TextUtils.isSameFontFamily(this.fontFamily))
                .find(fontFace => fontFace.weight === fontWeight && fontFace.style === fontStyle);
            return !fontFace;
        }
        _onSelect(fontWeight, fontStyle = FontStyle.Normal) {
            this.fontWeight = fontWeight;
            this.fontStyle = fontStyle;
            if (this.onSelect) {
                this.onSelect(fontWeight, fontStyle);
            }
        }
        render() {
            let fontFaces = TextUtils.getFontFacesByFontFamily(this.fontFamily);
            // Compatible with old data
            if (fontFaces.length === 0) {
                fontFaces = TextUtils.getFontFacesByFontFamily(FontFamily.Inter);
            }
            const fontFacesWithNormal = fontFaces.filter(fontFace => fontFace.style === FontStyle.Normal);
            const fontFacesWithItalic = fontFaces.filter(fontFace => fontFace.style === FontStyle.Italic);
            return join([
                fontFacesWithNormal.length > 0
                    ? repeat(fontFacesWithNormal, fontFace => fontFace.weight, fontFace => {
                        const active = this._isActive(fontFace.weight);
                        return html `
                  <edgeless-tool-icon-button
                    data-weight="${fontFace.weight}"
                    .iconContainerPadding=${[4, 8]}
                    .justify=${'space-between'}
                    .disabled=${this._isDisabled(fontFace.weight)}
                    .active=${active}
                    @click=${() => this._onSelect(fontFace.weight)}
                  >
                    ${choose(fontFace.weight, FONT_WEIGHT_CHOOSE)}
                    ${active ? CheckIcon : nothing}
                  </edgeless-tool-icon-button>
                `;
                    })
                    : nothing,
                fontFacesWithItalic.length > 0
                    ? repeat(fontFacesWithItalic, fontFace => fontFace.weight, fontFace => {
                        const active = this._isActive(fontFace.weight, FontStyle.Italic);
                        return html `
                  <edgeless-tool-icon-button
                    data-weight="${fontFace.weight} italic"
                    .iconContainerPadding=${[4, 8]}
                    .justify=${'space-between'}
                    .disabled=${this._isDisabled(fontFace.weight, FontStyle.Italic)}
                    .active=${active}
                    @click=${() => this._onSelect(fontFace.weight, FontStyle.Italic)}
                  >
                    ${choose(fontFace.weight, FONT_WEIGHT_CHOOSE)} Italic
                    ${active ? CheckIcon : nothing}
                  </edgeless-tool-icon-button>
                `;
                    })
                    : nothing,
            ].filter(item => item !== nothing), () => html `
        <edgeless-menu-divider
          data-orientation="horizontal"
        ></edgeless-menu-divider>
      `);
        }
        #fontFamily_accessor_storage = __runInitializers(this, _fontFamily_initializers, FontFamily.Inter);
        get fontFamily() { return this.#fontFamily_accessor_storage; }
        set fontFamily(value) { this.#fontFamily_accessor_storage = value; }
        #fontStyle_accessor_storage = (__runInitializers(this, _fontFamily_extraInitializers), __runInitializers(this, _fontStyle_initializers, FontStyle.Normal));
        get fontStyle() { return this.#fontStyle_accessor_storage; }
        set fontStyle(value) { this.#fontStyle_accessor_storage = value; }
        #fontWeight_accessor_storage = (__runInitializers(this, _fontStyle_extraInitializers), __runInitializers(this, _fontWeight_initializers, FontWeight.Regular));
        get fontWeight() { return this.#fontWeight_accessor_storage; }
        set fontWeight(value) { this.#fontWeight_accessor_storage = value; }
        #onSelect_accessor_storage = (__runInitializers(this, _fontWeight_extraInitializers), __runInitializers(this, _onSelect_initializers, void 0));
        get onSelect() { return this.#onSelect_accessor_storage; }
        set onSelect(value) { this.#onSelect_accessor_storage = value; }
        constructor() {
            super(...arguments);
            __runInitializers(this, _onSelect_extraInitializers);
        }
    };
})();
export { EdgelessFontWeightAndStylePanel };
//# sourceMappingURL=font-weight-and-style-panel.js.map