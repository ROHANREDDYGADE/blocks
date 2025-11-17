import { type VirtualKeyboardControllerConfig } from '@blocksuite/affine-components/virtual-keyboard';
import { LitElement, nothing } from 'lit';
import type { LinkedDocContext } from './config.js';
import { PageRootBlockComponent } from '../../index.js';
export declare const AFFINE_MOBILE_LINKED_DOC_MENU = "affine-mobile-linked-doc-menu";
declare const AffineMobileLinkedDocMenu_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class AffineMobileLinkedDocMenu extends AffineMobileLinkedDocMenu_base {
    static styles: import("lit").CSSResult;
    private readonly _expand$;
    private _firstActionItem;
    private readonly _keyboardController;
    private readonly _linkedDocGroup$;
    private readonly _renderItem;
    private _scrollInputToTop;
    private readonly _updateLinkedDocGroup;
    private _updateLinkedDocGroupAbortController;
    private get _query();
    get virtualKeyboardControllerConfig(): VirtualKeyboardControllerConfig;
    connectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    accessor context: LinkedDocContext;
    accessor rootComponent: PageRootBlockComponent;
}
export {};
//# sourceMappingURL=mobile-linked-doc-menu.d.ts.map