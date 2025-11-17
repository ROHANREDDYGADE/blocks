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
import { updateXYWH } from '@blocksuite/affine-block-surface';
import { AlignBottomIcon, AlignDistributeHorizontallyIcon, AlignDistributeVerticallyIcon, AlignHorizontallyIcon, AlignLeftIcon, AlignRightIcon, AlignTopIcon, AlignVerticallyIcon, SmallArrowDownIcon, } from '@blocksuite/affine-components/icons';
import { MindmapElementModel } from '@blocksuite/affine-model';
import { Bound, WithDisposable } from '@blocksuite/global/utils';
import { AutoTidyUpIcon, ResizeTidyUpIcon } from '@blocksuite/icons/lit';
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
var Alignment;
(function (Alignment) {
    Alignment["AutoArrange"] = "Auto arrange";
    Alignment["AutoResize"] = "Resize & Align";
    Alignment["Bottom"] = "Align bottom";
    Alignment["DistributeHorizontally"] = "Distribute horizontally";
    Alignment["DistributeVertically"] = "Distribute vertically";
    Alignment["Horizontally"] = "Align horizontally";
    Alignment["Left"] = "Align left";
    Alignment["Right"] = "Align right";
    Alignment["Top"] = "Align top";
    Alignment["Vertically"] = "Align vertically";
})(Alignment || (Alignment = {}));
const HORIZONTAL_ALIGNMENT = [
    {
        name: Alignment.Left,
        content: AlignLeftIcon,
    },
    {
        name: Alignment.Horizontally,
        content: AlignHorizontallyIcon,
    },
    {
        name: Alignment.Right,
        content: AlignRightIcon,
    },
    {
        name: Alignment.DistributeHorizontally,
        content: AlignDistributeHorizontallyIcon,
    },
];
const VERTICAL_ALIGNMENT = [
    {
        name: Alignment.Top,
        content: AlignTopIcon,
    },
    {
        name: Alignment.Vertically,
        content: AlignVerticallyIcon,
    },
    {
        name: Alignment.Bottom,
        content: AlignBottomIcon,
    },
    {
        name: Alignment.DistributeVertically,
        content: AlignDistributeVerticallyIcon,
    },
];
const AUTO_ALIGNMENT = [
    {
        name: Alignment.AutoArrange,
        content: AutoTidyUpIcon({ width: '20px', height: '20px' }),
    },
    {
        name: Alignment.AutoResize,
        content: ResizeTidyUpIcon({ width: '20px', height: '20px' }),
    },
];
let EdgelessAlignButton = (() => {
    let _classSuper = WithDisposable(LitElement);
    let _edgeless_decorators;
    let _edgeless_initializers = [];
    let _edgeless_extraInitializers = [];
    return class EdgelessAlignButton extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _edgeless_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _edgeless_decorators, { kind: "accessor", name: "edgeless", static: false, private: false, access: { has: obj => "edgeless" in obj, get: obj => obj.edgeless, set: (obj, value) => { obj.edgeless = value; } }, metadata: _metadata }, _edgeless_initializers, _edgeless_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = css `
    .align-menu-content {
      max-width: 120px;
      flex-wrap: wrap;
      padding: 8px 2px;
    }
    .align-menu-separator {
      width: 120px;
      height: 1px;
      background-color: var(--affine-background-tertiary-color);
    }
  `; }
        get elements() {
            return this.edgeless.service.selection.selectedElements;
        }
        _align(type) {
            switch (type) {
                case Alignment.Left:
                    this._alignLeft();
                    break;
                case Alignment.Horizontally:
                    this._alignHorizontally();
                    break;
                case Alignment.Right:
                    this._alignRight();
                    break;
                case Alignment.DistributeHorizontally:
                    this._alignDistributeHorizontally();
                    break;
                case Alignment.Top:
                    this._alignTop();
                    break;
                case Alignment.Vertically:
                    this._alignVertically();
                    break;
                case Alignment.Bottom:
                    this._alignBottom();
                    break;
                case Alignment.DistributeVertically:
                    this._alignDistributeVertically();
                    break;
                case Alignment.AutoArrange:
                    this.edgeless.std.command.exec('autoArrangeElements');
                    break;
                case Alignment.AutoResize:
                    this.edgeless.std.command.exec('autoResizeElements');
                    break;
            }
        }
        _alignBottom() {
            const { elements } = this;
            const bounds = elements.map(a => a.elementBound);
            const bottom = Math.max(...bounds.map(b => b.maxY));
            elements.forEach((ele, index) => {
                const elementBound = bounds[index];
                const bound = Bound.deserialize(ele.xywh);
                const offset = bound.maxY - elementBound.maxY;
                bound.y = bottom - bound.h + offset;
                this._updateXYWH(ele, bound);
            });
        }
        _alignDistributeHorizontally() {
            const { elements } = this;
            elements.sort((a, b) => a.elementBound.minX - b.elementBound.minX);
            const bounds = elements.map(a => a.elementBound);
            const left = bounds[0].minX;
            const right = bounds[bounds.length - 1].maxX;
            const totalWidth = right - left;
            const totalGap = totalWidth - elements.reduce((prev, ele) => prev + ele.elementBound.w, 0);
            const gap = totalGap / (elements.length - 1);
            let next = bounds[0].maxX + gap;
            for (let i = 1; i < elements.length - 1; i++) {
                const bound = Bound.deserialize(elements[i].xywh);
                bound.x = next + bounds[i].w / 2 - bound.w / 2;
                next += gap + bounds[i].w;
                this._updateXYWH(elements[i], bound);
            }
        }
        _alignDistributeVertically() {
            const { elements } = this;
            elements.sort((a, b) => a.elementBound.minY - b.elementBound.minY);
            const bounds = elements.map(a => a.elementBound);
            const top = bounds[0].minY;
            const bottom = bounds[bounds.length - 1].maxY;
            const totalHeight = bottom - top;
            const totalGap = totalHeight -
                elements.reduce((prev, ele) => prev + ele.elementBound.h, 0);
            const gap = totalGap / (elements.length - 1);
            let next = bounds[0].maxY + gap;
            for (let i = 1; i < elements.length - 1; i++) {
                const bound = Bound.deserialize(elements[i].xywh);
                bound.y = next + bounds[i].h / 2 - bound.h / 2;
                next += gap + bounds[i].h;
                this._updateXYWH(elements[i], bound);
            }
        }
        _alignHorizontally() {
            const { elements } = this;
            const bounds = elements.map(a => a.elementBound);
            const left = Math.min(...bounds.map(b => b.minX));
            const right = Math.max(...bounds.map(b => b.maxX));
            const centerX = (left + right) / 2;
            elements.forEach(ele => {
                const bound = Bound.deserialize(ele.xywh);
                bound.x = centerX - bound.w / 2;
                this._updateXYWH(ele, bound);
            });
        }
        _alignLeft() {
            const { elements } = this;
            const bounds = elements.map(a => a.elementBound);
            const left = Math.min(...bounds.map(b => b.minX));
            elements.forEach((ele, index) => {
                const elementBound = bounds[index];
                const bound = Bound.deserialize(ele.xywh);
                const offset = bound.minX - elementBound.minX;
                bound.x = left + offset;
                this._updateXYWH(ele, bound);
            });
        }
        _alignRight() {
            const { elements } = this;
            const bounds = elements.map(a => a.elementBound);
            const right = Math.max(...bounds.map(b => b.maxX));
            elements.forEach((ele, index) => {
                const elementBound = bounds[index];
                const bound = Bound.deserialize(ele.xywh);
                const offset = bound.maxX - elementBound.maxX;
                bound.x = right - bound.w + offset;
                this._updateXYWH(ele, bound);
            });
        }
        _alignTop() {
            const { elements } = this;
            const bounds = elements.map(a => a.elementBound);
            const top = Math.min(...bounds.map(b => b.minY));
            elements.forEach((ele, index) => {
                const elementBound = bounds[index];
                const bound = Bound.deserialize(ele.xywh);
                const offset = bound.minY - elementBound.minY;
                bound.y = top + offset;
                this._updateXYWH(ele, bound);
            });
        }
        _alignVertically() {
            const { elements } = this;
            const bounds = elements.map(a => a.elementBound);
            const top = Math.min(...bounds.map(b => b.minY));
            const bottom = Math.max(...bounds.map(b => b.maxY));
            const centerY = (top + bottom) / 2;
            elements.forEach(ele => {
                const bound = Bound.deserialize(ele.xywh);
                bound.y = centerY - bound.h / 2;
                this._updateXYWH(ele, bound);
            });
        }
        _updateXYWH(ele, bound) {
            const { updateElement } = this.edgeless.service;
            const { updateBlock } = this.edgeless.doc;
            updateXYWH(ele, bound, updateElement, updateBlock);
        }
        renderIcons(icons) {
            return html `
      ${repeat(icons, (item, index) => item.name + index, ({ name, content }) => {
                return html `
            <editor-icon-button
              aria-label=${name}
              .tooltip=${name}
              @click=${() => this._align(name)}
            >
              ${content}
            </editor-icon-button>
          `;
            })}
    `;
        }
        firstUpdated() {
            this._disposables.add(this.edgeless.service.selection.slots.updated.on(() => this.requestUpdate()));
        }
        render() {
            return html `
      <editor-menu-button
        .button=${html `
          <editor-icon-button
            aria-label="Align objects"
            .tooltip=${'Align objects'}
          >
            ${AlignLeftIcon}${SmallArrowDownIcon}
          </editor-icon-button>
        `}
      >
        <div class="align-menu-content">
          ${this.renderIcons(HORIZONTAL_ALIGNMENT)}
          ${this.renderIcons(VERTICAL_ALIGNMENT)}
          <div class="align-menu-separator"></div>
          ${this.renderIcons(AUTO_ALIGNMENT)}
        </div>
      </editor-menu-button>
    `;
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
export { EdgelessAlignButton };
export function renderAlignButton(edgeless, elements) {
    if (elements.length < 2)
        return nothing;
    if (elements.some(e => e.group instanceof MindmapElementModel))
        return nothing;
    return html `
    <edgeless-align-button .edgeless=${edgeless}></edgeless-align-button>
  `;
}
//# sourceMappingURL=align-button.js.map