import { LitElement } from 'lit';
import type { DraggableShape } from './utils.js';
import { EdgelessDraggableElementController } from '../common/draggable/draggable-element.controller.js';
declare const EdgelessToolbarShapeDraggable_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("../mixins/tool.mixin.js").EdgelessToolbarToolClass>;
export declare class EdgelessToolbarShapeDraggable extends EdgelessToolbarShapeDraggable_base {
    static styles: import("lit").CSSResult;
    draggableController: EdgelessDraggableElementController<DraggableShape>;
    draggingShape: DraggableShape['name'];
    type: "shape";
    get shapeShadow(): "0 0 7px rgba(0, 0, 0, .22)" | "0 0 5px rgba(0, 0, 0, .2)";
    private _setShapeOverlayLock;
    initDragController(): void;
    render(): import("lit-html").TemplateResult<1>;
    updated(_changedProperties: Map<PropertyKey, unknown>): void;
    accessor onShapeClick: (shape: DraggableShape) => void;
    accessor readyToDrop: boolean;
    accessor shapeContainer: HTMLDivElement;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-toolbar-shape-draggable': EdgelessToolbarShapeDraggable;
    }
}
export {};
//# sourceMappingURL=shape-draggable.d.ts.map