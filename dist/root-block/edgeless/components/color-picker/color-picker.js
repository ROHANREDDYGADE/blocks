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
import { on, once, stopPropagation } from '@blocksuite/affine-shared/utils';
import { SignalWatcher, WithDisposable } from '@blocksuite/global/utils';
import { batch, computed, signal } from '@preact/signals-core';
import { html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { AREA_CIRCLE_R, MATCHERS, SLIDER_CIRCLE_R } from './consts.js';
import { COLOR_PICKER_STYLE } from './styles.js';
import { bound01, clamp, defaultHsva, eq, hsvaToHex8, hsvaToRgba, linearGradientAt, parseHexToHsva, renderCanvas, rgbaToHex8, rgbaToHsva, rgbToHex, rgbToHsv, } from './utils.js';
const TABS = [
    { type: 'colors', name: 'Colors' },
    { type: 'custom', name: 'Custom' },
];
let EdgelessColorPicker = (() => {
    let _classSuper = SignalWatcher(WithDisposable(LitElement));
    let _alphaControl_decorators;
    let _alphaControl_initializers = [];
    let _alphaControl_extraInitializers = [];
    let _canvas_decorators;
    let _canvas_initializers = [];
    let _canvas_extraInitializers = [];
    let _colors_decorators;
    let _colors_initializers = [];
    let _colors_extraInitializers = [];
    let _hueControl_decorators;
    let _hueControl_initializers = [];
    let _hueControl_extraInitializers = [];
    let _paletteControl_decorators;
    let _paletteControl_initializers = [];
    let _paletteControl_extraInitializers = [];
    let _pick_decorators;
    let _pick_initializers = [];
    let _pick_extraInitializers = [];
    return class EdgelessColorPicker extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _alphaControl_decorators = [query('.color-slider-wrapper.alpha .color-slider')];
            _canvas_decorators = [query('canvas')];
            _colors_decorators = [property({ attribute: false })];
            _hueControl_decorators = [query('.color-slider-wrapper.hue .color-slider')];
            _paletteControl_decorators = [query('.color-palette')];
            _pick_decorators = [property({ attribute: false })];
            __esDecorate(this, null, _alphaControl_decorators, { kind: "accessor", name: "alphaControl", static: false, private: false, access: { has: obj => "alphaControl" in obj, get: obj => obj.alphaControl, set: (obj, value) => { obj.alphaControl = value; } }, metadata: _metadata }, _alphaControl_initializers, _alphaControl_extraInitializers);
            __esDecorate(this, null, _canvas_decorators, { kind: "accessor", name: "canvas", static: false, private: false, access: { has: obj => "canvas" in obj, get: obj => obj.canvas, set: (obj, value) => { obj.canvas = value; } }, metadata: _metadata }, _canvas_initializers, _canvas_extraInitializers);
            __esDecorate(this, null, _colors_decorators, { kind: "accessor", name: "colors", static: false, private: false, access: { has: obj => "colors" in obj, get: obj => obj.colors, set: (obj, value) => { obj.colors = value; } }, metadata: _metadata }, _colors_initializers, _colors_extraInitializers);
            __esDecorate(this, null, _hueControl_decorators, { kind: "accessor", name: "hueControl", static: false, private: false, access: { has: obj => "hueControl" in obj, get: obj => obj.hueControl, set: (obj, value) => { obj.hueControl = value; } }, metadata: _metadata }, _hueControl_initializers, _hueControl_extraInitializers);
            __esDecorate(this, null, _paletteControl_decorators, { kind: "accessor", name: "paletteControl", static: false, private: false, access: { has: obj => "paletteControl" in obj, get: obj => obj.paletteControl, set: (obj, value) => { obj.paletteControl = value; } }, metadata: _metadata }, _paletteControl_initializers, _paletteControl_extraInitializers);
            __esDecorate(this, null, _pick_decorators, { kind: "accessor", name: "pick", static: false, private: false, access: { has: obj => "pick" in obj, get: obj => obj.pick, set: (obj, value) => { obj.pick = value; } }, metadata: _metadata }, _pick_initializers, _pick_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static { this.styles = COLOR_PICKER_STYLE; }
        #alphaRect = new DOMRect();
        #editAlpha = (e) => {
            const target = e.target;
            const orignalValue = target.value;
            let value = orignalValue.trim().replace(/[^0-9]/, '');
            const alpha = clamp(0, Number(value), 100);
            const a = bound01(alpha, 100);
            const hsva = this.hsva$.peek();
            value = `${alpha}`;
            if (orignalValue !== value) {
                target.value = value;
            }
            if (hsva.a === a)
                return;
            const x = this.#alphaRect.width * a;
            this.alphaPosX$.value = x;
            this.#pick();
        };
        #editHex = (e) => {
            e.stopPropagation();
            const target = e.target;
            if (e.key === 'Enter') {
                const orignalValue = target.value;
                let value = orignalValue.trim().replace(MATCHERS.other, '');
                let matched;
                if ((matched = value.match(MATCHERS.hex3)) ||
                    (matched = value.match(MATCHERS.hex6))) {
                    const oldHsva = this.hsva$.peek();
                    const hsv = parseHexToHsva(matched[1]);
                    const newHsva = { ...oldHsva, ...hsv };
                    value = rgbToHex(hsvaToRgba(newHsva));
                    if (orignalValue !== value) {
                        target.value = value;
                    }
                    if (eq(newHsva, oldHsva))
                        return;
                    this.#setControlsPos(newHsva);
                    this.#pick();
                }
                else {
                    target.value = this.hex6WithoutHash$.peek();
                }
            }
        };
        #hueRect = new DOMRect();
        #paletteRect = new DOMRect();
        #pick() {
            const hsva = this.hsva$.peek();
            const type = this.modeType$.peek();
            const detail = { [type]: hsvaToHex8(hsva) };
            if (type !== 'normal') {
                const another = type === 'light' ? 'dark' : 'light';
                const { hsva } = this[`${another}$`].peek();
                detail[another] = hsvaToHex8(hsva);
            }
            this.pick?.({ type: 'pick', detail });
        }
        #pickEnd() {
            this.pick?.({ type: 'end' });
        }
        #pickStart() {
            this.pick?.({ type: 'start' });
        }
        #setAlphaPos(clientX) {
            const { left, width } = this.#alphaRect;
            const x = clamp(0, clientX - left, width);
            this.alphaPosX$.value = x;
        }
        #setAlphaPosWithWheel(y) {
            const { width } = this.#alphaRect;
            const px = this.alphaPosX$.peek();
            const ax = clamp(0, px + (y * width) / 100, width);
            this.alphaPosX$.value = ax;
        }
        #setControlsPos({ h, s, v, a }) {
            const hx = this.#hueRect.width * h;
            const px = this.#paletteRect.width * s;
            const py = this.#paletteRect.height * (1 - v);
            const ax = this.#alphaRect.width * a;
            batch(() => {
                this.huePosX$.value = hx;
                this.alphaPosX$.value = ax;
                this.palettePos$.value = { x: px, y: py };
            });
        }
        #setHuePos(clientX) {
            const { left, width } = this.#hueRect;
            const x = clamp(0, clientX - left, width);
            this.huePosX$.value = x;
        }
        #setHuePosWithWheel(y) {
            const { width } = this.#hueRect;
            const px = this.huePosX$.peek();
            const ax = clamp(0, px + (y * width) / 100, width);
            this.huePosX$.value = ax;
        }
        #setPalettePos(clientX, clientY) {
            const { left, top, width, height } = this.#paletteRect;
            const x = clamp(0, clientX - left, width);
            const y = clamp(0, clientY - top, height);
            this.palettePos$.value = { x, y };
        }
        #setPalettePosWithWheel(x, y) {
            const { width, height } = this.#paletteRect;
            const pos = this.palettePos$.peek();
            const px = clamp(0, pos.x + (x * width) / 100, width);
            const py = clamp(0, pos.y + (y * height) / 100, height);
            this.palettePos$.value = { x: px, y: py };
        }
        #setRect({ left, top, width, height }, offset) {
            return new DOMRect(left + offset, top + offset, Math.round(width - offset * 2), Math.round(height - offset * 2));
        }
        #setRects() {
            this.#paletteRect = this.#setRect(this.paletteControl.getBoundingClientRect(), AREA_CIRCLE_R);
            this.#hueRect = this.#setRect(this.hueControl.getBoundingClientRect(), SLIDER_CIRCLE_R);
            this.#alphaRect = this.#setRect(this.alphaControl.getBoundingClientRect(), SLIDER_CIRCLE_R);
        }
        #switchModeTab(type) {
            this.modeType$.value = type;
            this.#setControlsPos(this.mode$.peek().hsva);
        }
        #switchNavTab(type) {
            this.navType$.value = type;
            if (type === 'colors') {
                const mode = this.mode$.peek();
                this.modes$.value[0].hsva = { ...mode.hsva };
                this.modeType$.value = 'normal';
            }
            else {
                const [normal, light, dark] = this.modes$.value;
                light.hsva = { ...normal.hsva };
                dark.hsva = { ...normal.hsva };
                this.modeType$.value = 'light';
            }
        }
        firstUpdated() {
            let clicked = false;
            let dragged = false;
            let outed = false;
            let picked = false;
            let pointerenter;
            let pointermove;
            let pointerout;
            let timerId = 0;
            this.disposables.addFromEvent(this, 'wheel', (e) => {
                e.stopPropagation();
                const target = e.composedPath()[0];
                const isInHue = target === this.hueControl;
                const isInAlpha = !isInHue && target === this.alphaControl;
                const isInPalette = !isInAlpha && target === this.paletteControl;
                picked = isInHue || isInAlpha || isInPalette;
                if (timerId) {
                    clearTimeout(timerId);
                }
                // update target rect
                if (picked) {
                    if (!timerId) {
                        this.#pickStart();
                    }
                    timerId = window.setTimeout(() => {
                        this.#pickEnd();
                        timerId = 0;
                    }, 110);
                }
                const update = (x, y) => {
                    if (!picked)
                        return;
                    const absX = Math.abs(x);
                    const absY = Math.abs(y);
                    x = Math.sign(x);
                    y = Math.sign(y);
                    if (Math.hypot(x, y) === 0)
                        return;
                    x *= Math.max(1, Math.log10(absX)) * -1;
                    y *= Math.max(1, Math.log10(absY)) * -1;
                    if (isInHue) {
                        this.#setHuePosWithWheel(x | y);
                    }
                    if (isInAlpha) {
                        this.#setAlphaPosWithWheel(x | y);
                    }
                    if (isInPalette) {
                        this.#setPalettePosWithWheel(x, y);
                    }
                    this.#pick();
                };
                update(e.deltaX, e.deltaY);
            });
            this.disposables.addFromEvent(this, 'pointerdown', (e) => {
                e.stopPropagation();
                if (timerId) {
                    clearTimeout(timerId);
                    timerId = 0;
                }
                // checks pointer enter/out
                pointerenter = on(this, 'pointerenter', () => (outed = false));
                pointerout = on(this, 'pointerout', () => (outed = true));
                // cleanups
                once(document, 'pointerup', () => {
                    pointerenter?.();
                    pointermove?.();
                    pointerout?.();
                    if (picked) {
                        this.#pickEnd();
                    }
                    // When dragging the points, the color picker panel should not be triggered to close.
                    if (dragged && outed) {
                        once(document, 'click', stopPropagation, true);
                    }
                    pointerenter = pointermove = pointerout = null;
                    clicked = dragged = outed = picked = false;
                });
                clicked = true;
                const target = e.composedPath()[0];
                const isInHue = target === this.hueControl;
                const isInAlpha = !isInHue && target === this.alphaControl;
                const isInPalette = !isInAlpha && target === this.paletteControl;
                picked = isInHue || isInAlpha || isInPalette;
                // update target rect
                if (picked) {
                    this.#pickStart();
                    const rect = target.getBoundingClientRect();
                    if (isInHue) {
                        this.#hueRect = this.#setRect(rect, SLIDER_CIRCLE_R);
                    }
                    else if (isInAlpha) {
                        this.#alphaRect = this.#setRect(rect, SLIDER_CIRCLE_R);
                    }
                    else if (isInPalette) {
                        this.#paletteRect = this.#setRect(rect, AREA_CIRCLE_R);
                    }
                }
                const update = (x, y) => {
                    if (!picked)
                        return;
                    if (isInHue) {
                        this.#setHuePos(x);
                    }
                    if (isInAlpha) {
                        this.#setAlphaPos(x);
                    }
                    if (isInPalette) {
                        this.#setPalettePos(x, y);
                    }
                    this.#pick();
                };
                update(e.x, e.y);
                pointermove = on(document, 'pointermove', (e) => {
                    if (!clicked)
                        return;
                    if (!dragged)
                        dragged = true;
                    update(e.x, e.y);
                });
            });
            this.disposables.addFromEvent(this, 'click', stopPropagation);
            const batches = [];
            const { type, modes } = this.colors;
            // Updates UI states
            if (['dark', 'light'].includes(type)) {
                batches.push(() => {
                    this.modeType$.value = type;
                    this.navType$.value = 'custom';
                });
            }
            // Updates modes
            if (modes?.length) {
                batches.push(() => {
                    this.modes$.value.reduce((fallback, curr, n) => {
                        const m = modes[n];
                        curr.hsva = m ? rgbaToHsva(m.rgba) : fallback;
                        return { ...curr.hsva };
                    }, defaultHsva());
                });
            }
            // Updates controls' positions
            batches.push(() => {
                const mode = this.mode$.peek();
                this.#setControlsPos(mode.hsva);
            });
            // Updates controls' rects
            this.#setRects();
            batch(() => batches.forEach(fn => fn()));
            this.updateComplete
                .then(() => {
                this.disposables.add(this.hsva$.subscribe((hsva) => {
                    const type = this.modeType$.peek();
                    const mode = this.modes$.value.find(mode => mode.type === type);
                    if (mode) {
                        mode.hsva = { ...hsva };
                    }
                }));
                this.disposables.add(this.huePosX$.subscribe((x) => {
                    const { width } = this.#hueRect;
                    const rgb = linearGradientAt(bound01(x, width));
                    // Updates palette canvas
                    renderCanvas(this.canvas, rgb);
                    this.hue$.value = rgb;
                }));
                this.disposables.add(this.hue$.subscribe((rgb) => {
                    const hsva = this.hsva$.peek();
                    const h = rgbToHsv(rgb).h;
                    this.hsva$.value = { ...hsva, h };
                }));
                this.disposables.add(this.alphaPosX$.subscribe((x) => {
                    const hsva = this.hsva$.peek();
                    const { width } = this.#alphaRect;
                    const a = bound01(x, width);
                    this.hsva$.value = { ...hsva, a };
                }));
                this.disposables.add(this.palettePos$.subscribe(({ x, y }) => {
                    const hsva = this.hsva$.peek();
                    const { width, height } = this.#paletteRect;
                    const s = bound01(x, width);
                    const v = bound01(height - y, height);
                    this.hsva$.value = { ...hsva, s, v };
                }));
            })
                .catch(console.error);
        }
        render() {
            return html `
      <header>
        <nav>
          ${repeat(TABS, tab => tab.type, ({ type, name }) => html `
              <button
                ?active=${type === this.navType$.value}
                @click=${() => this.#switchNavTab(type)}
              >
                ${name}
              </button>
            `)}
        </nav>
      </header>

      <div class="modes" ?active=${this.navType$.value === 'custom'}>
        ${repeat([this.light$.value, this.dark$.value], mode => mode.type, ({ type, name, hsva }) => html `
            <div
              class="${classMap({ mode: true, [type]: true })}"
              style=${styleMap({ '--c': hsvaToHex8(hsva) })}
            >
              <button
                ?active=${this.modeType$.value === type}
                @click=${() => this.#switchModeTab(type)}
              >
                <div class="color"></div>
                <div>${name}</div>
              </button>
            </div>
          `)}
      </div>

      <div class="content">
        <div
          class="color-palette-wrapper"
          style=${styleMap(this.paletteStyle$.value)}
        >
          <canvas></canvas>
          <div class="color-circle"></div>
          <div class="color-palette"></div>
        </div>
        <div
          class="color-slider-wrapper hue"
          style=${styleMap(this.hueStyle$.value)}
        >
          <div class="color-circle"></div>
          <div class="color-slider"></div>
        </div>
        <div
          class="color-slider-wrapper alpha"
          style=${styleMap(this.alphaStyle$.value)}
        >
          <div class="color-circle"></div>
          <div class="color-slider"></div>
        </div>
      </div>

      <footer>
        <label class="field color">
          <span>#</span>
          <input
            autocomplete="off"
            spellcheck="false"
            minlength="1"
            maxlength="6"
            .value=${live(this.hex6WithoutHash$.value)}
            @keydown=${this.#editHex}
            @cut=${stopPropagation}
            @copy=${stopPropagation}
            @paste=${stopPropagation}
          />
        </label>
        <label class="field alpha">
          <input
            type="number"
            min="0"
            max="100"
            .value=${live(this.alpha100$.value)}
            @input=${this.#editAlpha}
            @cut=${stopPropagation}
            @copy=${stopPropagation}
            @paste=${stopPropagation}
          />
          <span>%</span>
        </label>
      </footer>
    `;
        }
        #alpha100$_accessor_storage = computed(() => `${Math.round(this.hsva$.value.a * 100)}`);
        // 0-100
        get alpha100$() { return this.#alpha100$_accessor_storage; }
        set alpha100$(value) { this.#alpha100$_accessor_storage = value; }
        #alphaControl_accessor_storage = __runInitializers(this, _alphaControl_initializers, void 0);
        get alphaControl() { return this.#alphaControl_accessor_storage; }
        set alphaControl(value) { this.#alphaControl_accessor_storage = value; }
        #alphaPosX$_accessor_storage = (__runInitializers(this, _alphaControl_extraInitializers), signal(0));
        get alphaPosX$() { return this.#alphaPosX$_accessor_storage; }
        set alphaPosX$(value) { this.#alphaPosX$_accessor_storage = value; }
        #alphaStyle$_accessor_storage = computed(() => {
            const x = this.alphaPosX$.value;
            const rgba = this.rgba$.value;
            const hex = `#${rgbToHex(rgba)}`;
            return {
                '--o': rgba.a,
                '--s': `${hex}00`,
                '--c': `${hex}ff`,
                '--x': `${x}px`,
                '--r': `${SLIDER_CIRCLE_R}px`,
            };
        });
        get alphaStyle$() { return this.#alphaStyle$_accessor_storage; }
        set alphaStyle$(value) { this.#alphaStyle$_accessor_storage = value; }
        #canvas_accessor_storage = __runInitializers(this, _canvas_initializers, void 0);
        get canvas() { return this.#canvas_accessor_storage; }
        set canvas(value) { this.#canvas_accessor_storage = value; }
        #colors_accessor_storage = (__runInitializers(this, _canvas_extraInitializers), __runInitializers(this, _colors_initializers, { type: 'normal' }));
        get colors() { return this.#colors_accessor_storage; }
        set colors(value) { this.#colors_accessor_storage = value; }
        #dark$_accessor_storage = (__runInitializers(this, _colors_extraInitializers), computed(() => this.modes$.value[2]));
        get dark$() { return this.#dark$_accessor_storage; }
        set dark$(value) { this.#dark$_accessor_storage = value; }
        #hex6$_accessor_storage = computed(() => this.hex8$.value.substring(0, 7));
        // #ffffff
        get hex6$() { return this.#hex6$_accessor_storage; }
        set hex6$(value) { this.#hex6$_accessor_storage = value; }
        #hex6WithoutHash$_accessor_storage = computed(() => this.hex6$.value.substring(1));
        // ffffff
        get hex6WithoutHash$() { return this.#hex6WithoutHash$_accessor_storage; }
        set hex6WithoutHash$(value) { this.#hex6WithoutHash$_accessor_storage = value; }
        #hex8$_accessor_storage = computed(() => rgbaToHex8(this.rgba$.value));
        // #ffffffff
        get hex8$() { return this.#hex8$_accessor_storage; }
        set hex8$(value) { this.#hex8$_accessor_storage = value; }
        #hsva$_accessor_storage = signal(defaultHsva());
        get hsva$() { return this.#hsva$_accessor_storage; }
        set hsva$(value) { this.#hsva$_accessor_storage = value; }
        #hue$_accessor_storage = signal({ r: 0, g: 0, b: 0 });
        get hue$() { return this.#hue$_accessor_storage; }
        set hue$(value) { this.#hue$_accessor_storage = value; }
        #hueControl_accessor_storage = __runInitializers(this, _hueControl_initializers, void 0);
        get hueControl() { return this.#hueControl_accessor_storage; }
        set hueControl(value) { this.#hueControl_accessor_storage = value; }
        #huePosX$_accessor_storage = (__runInitializers(this, _hueControl_extraInitializers), signal(0));
        get huePosX$() { return this.#huePosX$_accessor_storage; }
        set huePosX$(value) { this.#huePosX$_accessor_storage = value; }
        #hueStyle$_accessor_storage = computed(() => {
            const x = this.huePosX$.value;
            const rgb = this.hue$.value;
            return {
                '--x': `${x}px`,
                '--c': `#${rgbToHex(rgb)}`,
                '--r': `${SLIDER_CIRCLE_R}px`,
            };
        });
        get hueStyle$() { return this.#hueStyle$_accessor_storage; }
        set hueStyle$(value) { this.#hueStyle$_accessor_storage = value; }
        #light$_accessor_storage = computed(() => this.modes$.value[1]);
        get light$() { return this.#light$_accessor_storage; }
        set light$(value) { this.#light$_accessor_storage = value; }
        #mode$_accessor_storage = computed(() => {
            const modeType = this.modeType$.value;
            return this.modes$.value.find(mode => mode.type === modeType);
        });
        get mode$() { return this.#mode$_accessor_storage; }
        set mode$(value) { this.#mode$_accessor_storage = value; }
        #modes$_accessor_storage = signal([
            { type: 'normal', name: 'Normal', hsva: defaultHsva() },
            { type: 'light', name: 'Light', hsva: defaultHsva() },
            { type: 'dark', name: 'Dark', hsva: defaultHsva() },
        ]);
        get modes$() { return this.#modes$_accessor_storage; }
        set modes$(value) { this.#modes$_accessor_storage = value; }
        #modeType$_accessor_storage = signal('normal');
        get modeType$() { return this.#modeType$_accessor_storage; }
        set modeType$(value) { this.#modeType$_accessor_storage = value; }
        #navType$_accessor_storage = signal('colors');
        get navType$() { return this.#navType$_accessor_storage; }
        set navType$(value) { this.#navType$_accessor_storage = value; }
        #paletteControl_accessor_storage = __runInitializers(this, _paletteControl_initializers, void 0);
        get paletteControl() { return this.#paletteControl_accessor_storage; }
        set paletteControl(value) { this.#paletteControl_accessor_storage = value; }
        #palettePos$_accessor_storage = (__runInitializers(this, _paletteControl_extraInitializers), signal({ x: 0, y: 0 }));
        get palettePos$() { return this.#palettePos$_accessor_storage; }
        set palettePos$(value) { this.#palettePos$_accessor_storage = value; }
        #paletteStyle$_accessor_storage = computed(() => {
            const { x, y } = this.palettePos$.value;
            const c = this.hex6$.value;
            return {
                '--c': c,
                '--x': `${x}px`,
                '--y': `${y}px`,
                '--r': `${AREA_CIRCLE_R}px`,
            };
        });
        get paletteStyle$() { return this.#paletteStyle$_accessor_storage; }
        set paletteStyle$(value) { this.#paletteStyle$_accessor_storage = value; }
        #pick_accessor_storage = __runInitializers(this, _pick_initializers, void 0);
        get pick() { return this.#pick_accessor_storage; }
        set pick(value) { this.#pick_accessor_storage = value; }
        #rgba$_accessor_storage = (__runInitializers(this, _pick_extraInitializers), computed(() => hsvaToRgba(this.hsva$.value)));
        get rgba$() { return this.#rgba$_accessor_storage; }
        set rgba$(value) { this.#rgba$_accessor_storage = value; }
    };
})();
export { EdgelessColorPicker };
//# sourceMappingURL=color-picker.js.map