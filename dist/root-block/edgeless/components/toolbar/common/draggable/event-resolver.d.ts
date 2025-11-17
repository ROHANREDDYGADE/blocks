export type ElementDragEvent = {
    inputType: 'mouse' | 'touch';
    x: number;
    y: number;
    el: HTMLElement;
    originalEvent: MouseEvent | TouchEvent;
};
export declare const touchResolver: (event: TouchEvent) => {
    inputType: "touch";
    x: number;
    y: number;
    el: HTMLElement;
    originalEvent: TouchEvent;
};
export declare const mouseResolver: (event: MouseEvent) => {
    inputType: "mouse";
    x: number;
    y: number;
    el: HTMLElement;
    originalEvent: MouseEvent;
};
//# sourceMappingURL=event-resolver.d.ts.map