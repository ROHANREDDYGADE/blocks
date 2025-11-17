import type { RichText } from '@blocksuite/affine-components/rich-text';
import type { TextElementModel } from '@blocksuite/affine-model';
import { ShadowlessElement } from '@blocksuite/block-std';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
declare const EdgelessTextEditor_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessTextEditor extends EdgelessTextEditor_base {
    static BORDER_WIDTH: number;
    static PADDING_HORIZONTAL: number;
    static PADDING_VERTICAL: number;
    static PLACEHOLDER_TEXT: string;
    static styles: import("lit").CSSResult;
    private _isComposition;
    private _keeping;
    private _updateRect;
    get inlineEditor(): import("@blocksuite/affine-components/rich-text").AffineInlineEditor;
    get inlineEditorContainer(): import("@blocksuite/inline").InlineRootElement<import("@blocksuite/affine-shared/types").AffineTextAttributes>;
    connectedCallback(): void;
    firstUpdated(): void;
    getContainerOffset(): string;
    getCoordsOnCenterAlign(rect: {
        w: number;
        h: number;
        r: number;
        x: number;
        y: number;
    }, w1: number, h1: number): {
        x: number;
        y: number;
    };
    getCoordsOnLeftAlign(rect: {
        w: number;
        h: number;
        r: number;
        x: number;
        y: number;
    }, w1: number, h1: number): {
        x: number;
        y: number;
    };
    getCoordsOnRightAlign(rect: {
        w: number;
        h: number;
        r: number;
        x: number;
        y: number;
    }, w1: number, h1: number): {
        x: number;
        y: number;
    };
    getUpdateComplete(): Promise<boolean>;
    getVisualPosition(element: TextElementModel): import("@blocksuite/global/utils").IVec;
    render(): import("lit-html").TemplateResult<1>;
    setKeeping(keeping: boolean): void;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor element: TextElementModel;
    accessor richText: RichText;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-text-editor': EdgelessTextEditor;
    }
}
export {};
//# sourceMappingURL=edgeless-text-editor.d.ts.map