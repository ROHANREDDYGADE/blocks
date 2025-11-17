import type { RootBlockModel } from '@blocksuite/affine-model';
import type { Viewport } from '@blocksuite/affine-shared/types';
import type { Text } from '@blocksuite/store';
import { BlockComponent } from '@blocksuite/block-std';
import type { PageRootBlockWidgetName } from '../index.js';
import type { PageRootService } from './page-root-service.js';
import { PageClipboard } from '../clipboard/index.js';
import { PageKeyboardManager } from '../keyboard/keyboard-manager.js';
export declare class PageRootBlockComponent extends BlockComponent<RootBlockModel, PageRootService, PageRootBlockWidgetName> {
    static styles: import("lit").CSSResult;
    private _viewportElement;
    clipboardController: PageClipboard;
    focusFirstParagraph: () => void;
    keyboardManager: PageKeyboardManager | null;
    prependParagraphWithText: (text: Text) => void;
    get rootScrollContainer(): HTMLElement;
    get slots(): {
        viewportUpdated: import("@blocksuite/store").Slot<Viewport>;
    };
    get viewport(): Viewport | null;
    get viewportElement(): HTMLDivElement | null;
    private _createDefaultNoteBlock;
    private _getDefaultNoteBlock;
    private _initViewportResizeEffect;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    renderBlock(): import("lit-html").TemplateResult<1>;
    accessor rootElementContainer: HTMLDivElement;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-page-root': PageRootBlockComponent;
    }
}
//# sourceMappingURL=page-root-block.d.ts.map