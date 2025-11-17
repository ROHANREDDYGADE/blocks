import { LitElement } from 'lit';
import type { Hsva, ModeRgba, ModeTab, ModeType, NavType, PickColorEvent, Point, Rgb } from './types.js';
declare const EdgelessColorPicker_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessColorPicker extends EdgelessColorPicker_base {
    #private;
    static styles: import("lit").CSSResult;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor alpha100$: import("@preact/signals-core").ReadonlySignal<string>;
    accessor alphaControl: HTMLDivElement;
    accessor alphaPosX$: import("@preact/signals-core").Signal<number>;
    accessor alphaStyle$: import("@preact/signals-core").ReadonlySignal<{
        '--o': number;
        '--s': string;
        '--c': string;
        '--x': string;
        '--r': string;
    }>;
    accessor canvas: HTMLCanvasElement;
    accessor colors: {
        type: ModeType;
        modes?: ModeRgba[];
    };
    accessor dark$: import("@preact/signals-core").ReadonlySignal<ModeTab<ModeType>>;
    accessor hex6$: import("@preact/signals-core").ReadonlySignal<string>;
    accessor hex6WithoutHash$: import("@preact/signals-core").ReadonlySignal<string>;
    accessor hex8$: import("@preact/signals-core").ReadonlySignal<string>;
    accessor hsva$: import("@preact/signals-core").Signal<Hsva>;
    accessor hue$: import("@preact/signals-core").Signal<Rgb>;
    accessor hueControl: HTMLDivElement;
    accessor huePosX$: import("@preact/signals-core").Signal<number>;
    accessor hueStyle$: import("@preact/signals-core").ReadonlySignal<{
        '--x': string;
        '--c': string;
        '--r': string;
    }>;
    accessor light$: import("@preact/signals-core").ReadonlySignal<ModeTab<ModeType>>;
    accessor mode$: import("@preact/signals-core").ReadonlySignal<ModeTab<ModeType>>;
    accessor modes$: import("@preact/signals-core").Signal<ModeTab<ModeType>[]>;
    accessor modeType$: import("@preact/signals-core").Signal<ModeType>;
    accessor navType$: import("@preact/signals-core").Signal<NavType>;
    accessor paletteControl: HTMLDivElement;
    accessor palettePos$: import("@preact/signals-core").Signal<Point>;
    accessor paletteStyle$: import("@preact/signals-core").ReadonlySignal<{
        '--c': string;
        '--x': string;
        '--y': string;
        '--r': string;
    }>;
    accessor pick: (event: PickColorEvent) => void;
    accessor rgba$: import("@preact/signals-core").ReadonlySignal<import("./types.js").Rgba>;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-color-picker': EdgelessColorPicker;
    }
}
export {};
//# sourceMappingURL=color-picker.d.ts.map