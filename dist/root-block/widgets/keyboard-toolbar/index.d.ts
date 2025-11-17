import type { RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import { nothing } from 'lit';
import type { PageRootBlockComponent } from '../../page/page-root-block.js';
export * from './config.js';
export declare const AFFINE_KEYBOARD_TOOLBAR_WIDGET = "affine-keyboard-toolbar-widget";
export declare class AffineKeyboardToolbarWidget extends WidgetComponent<RootBlockModel, PageRootBlockComponent> {
    private _close;
    private readonly _show$;
    private get _docTitle();
    get config(): {
        items: import("./config.js").KeyboardToolbarItem[];
        useScreenHeight?: boolean;
    };
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_KEYBOARD_TOOLBAR_WIDGET]: AffineKeyboardToolbarWidget;
    }
}
//# sourceMappingURL=index.d.ts.map