import { type TemplateResult } from 'lit';
import type { ShapeToolOption } from '../../../gfx-tool/shape-tool.js';
type TransformState = {
    /** horizental offset base on center */
    x?: number | string;
    /** vertical offset base on center */
    y?: number | string;
    /** scale */
    s?: number;
    /** z-index */
    z?: number;
};
export type DraggableShape = {
    name: ShapeToolOption['shapeName'];
    svg: TemplateResult;
    style: {
        default?: TransformState;
        hover?: TransformState;
        /**
         * The next shape when previous shape is dragged outside toolbar
         */
        next?: TransformState;
    };
};
/**
 * Helper function to build the CSS variables object for the shape
 * @returns
 */
export declare const buildVariablesObject: (style: DraggableShape["style"]) => {};
export type ShapeDragEvent = {
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
export declare const defaultDraggingInfo: {
    startPos: {
        x: number;
        y: number;
    };
    toolbarRect: DOMRect;
    edgelessRect: DOMRect;
    shapeRectOriginal: DOMRect;
    shapeEl: HTMLElement;
    parentToMount: HTMLElement;
    moved: boolean;
    shape: DraggableShape;
    style: CSSStyleDeclaration;
};
export type DraggingInfo = typeof defaultDraggingInfo;
export declare const createShapeDraggingOverlay: (info: DraggingInfo) => HTMLDivElement;
export {};
//# sourceMappingURL=utils.d.ts.map