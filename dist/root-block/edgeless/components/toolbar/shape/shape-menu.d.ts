import { type ShapeName } from '@blocksuite/affine-model';
import { LitElement } from 'lit';
import type { EdgelessRootBlockComponent } from '../../../edgeless-root-block.js';
declare const EdgelessShapeMenu_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessShapeMenu extends EdgelessShapeMenu_base {
    static styles: import("lit").CSSResult;
    private _shapeName$;
    accessor edgeless: EdgelessRootBlockComponent;
    private _props$;
    private _setFillColor;
    private _setShapeStyle;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor onChange: (name: ShapeName) => void;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-shape-menu': EdgelessShapeMenu;
    }
}
export {};
//# sourceMappingURL=shape-menu.d.ts.map