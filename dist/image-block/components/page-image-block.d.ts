import { ShadowlessElement } from '@blocksuite/block-std';
import { type PropertyValues } from 'lit';
import type { ImageBlockComponent } from '../image-block.js';
declare const ImageBlockPageComponent_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class ImageBlockPageComponent extends ImageBlockPageComponent_base {
    static styles: import("lit").CSSResult;
    private _isDragging;
    private get _doc();
    private get _host();
    private get _model();
    private _bindKeyMap;
    private _handleError;
    private _handleSelection;
    private _normalizeImageSize;
    private _observeDrag;
    connectedCallback(): void;
    firstUpdated(changedProperties: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
    accessor _isSelected: boolean;
    accessor block: ImageBlockComponent;
    accessor resizeImg: HTMLElement;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-page-image': ImageBlockPageComponent;
    }
}
export {};
//# sourceMappingURL=page-image-block.d.ts.map