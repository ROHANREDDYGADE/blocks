import type { RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import { nothing } from 'lit';
import type { PageRootBlockComponent } from '../../index.js';
import { type LinkedWidgetConfig } from './config.js';
export { type LinkedWidgetConfig } from './config.js';
export declare const AFFINE_LINKED_DOC_WIDGET = "affine-linked-doc-widget";
export declare class AffineLinkedDocWidget extends WidgetComponent<RootBlockModel, PageRootBlockComponent> {
    static styles: import("lit").CSSResult;
    private _disposeObserveInputRects;
    private readonly _getInlineEditor;
    private _inlineEditor;
    private _observeInputRects;
    private readonly _onCompositionEnd;
    private readonly _onKeyDown;
    private readonly _renderLinkedDocMenu;
    private readonly _renderLinkedDocPopover;
    private readonly _show$;
    private _startRange;
    close: () => void;
    show: (mode?: "desktop" | "mobile") => void;
    private get _context();
    get config(): LinkedWidgetConfig;
    private _handleInput;
    private _renderInputMask;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    private accessor _inputRects;
    private accessor _triggerKey;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_LINKED_DOC_WIDGET]: AffineLinkedDocWidget;
    }
}
//# sourceMappingURL=index.d.ts.map