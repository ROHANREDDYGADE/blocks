import { type ShapeName, type ShapeStyle } from '@blocksuite/affine-model';
import { LitElement, type PropertyValues, type TemplateResult } from 'lit';
import type { EdgelessRootBlockComponent } from '../../../edgeless-root-block.js';
export interface Shape {
    name: ShapeName;
    svg: TemplateResult<1>;
}
declare const EdgelessShapeToolElement_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessShapeToolElement extends EdgelessShapeToolElement_base {
    static styles: import("lit").CSSResult;
    private _addShape;
    private _onDragEnd;
    private _onDragMove;
    private _onDragStart;
    private _onMouseMove;
    private _onMouseUp;
    private _onTouchEnd;
    private _touchMove;
    private _transformMap;
    connectedCallback(): void;
    render(): TemplateResult<1>;
    updated(changedProperties: PropertyValues<this>): void;
    private accessor _backupShapeElement;
    private accessor _dragging;
    private accessor _isOutside;
    private accessor _shapeElement;
    private accessor _startCoord;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor getContainerRect: () => DOMRect;
    accessor handleClick: () => void;
    accessor order: number;
    accessor shape: Shape;
    accessor shapeStyle: ShapeStyle;
    accessor shapeType: ShapeName;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-shape-tool-element': EdgelessShapeToolElement;
    }
}
export {};
//# sourceMappingURL=shape-tool-element.d.ts.map