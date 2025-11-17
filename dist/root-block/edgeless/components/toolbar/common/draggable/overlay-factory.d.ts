import type { ElementInfo, OverlayLayer } from './types.js';
export type DraggingInfo<T> = {
    startPos: {
        x: number;
        y: number;
    };
    offsetPos: {
        x: number;
        y: number;
    };
    startTime: number;
    scopeRect: DOMRect | null;
    edgelessRect: DOMRect;
    elementRectOriginal: DOMRect;
    element: HTMLElement;
    elementInfo: ElementInfo<T>;
    parentToMount: HTMLElement;
    moved: boolean;
    validMoved: boolean;
};
export declare const defaultInfo: {
    startPos: {
        x: number;
        y: number;
    };
    offsetPos: {
        x: number;
        y: number;
    };
    startTime: number;
    scopeRect: DOMRect;
    edgelessRect: DOMRect;
    elementRectOriginal: DOMRect;
    element: HTMLElement;
    elementInfo: ElementInfo<unknown>;
    parentToMount: HTMLElement;
    moved: false;
    validMoved: false;
};
export declare const createShapeDraggingOverlay: <T>(info: DraggingInfo<T>) => OverlayLayer;
//# sourceMappingURL=overlay-factory.d.ts.map