import { AffineCodeToolbar } from './components/code-toolbar.js';
import { LanguageListButton } from './components/lang-button.js';
import { AFFINE_CODE_TOOLBAR_WIDGET, AffineCodeToolbarWidget } from './index.js';
export declare function effects(): void;
declare global {
    interface HTMLElementTagNameMap {
        'language-list-button': LanguageListButton;
        'affine-code-toolbar': AffineCodeToolbar;
        [AFFINE_CODE_TOOLBAR_WIDGET]: AffineCodeToolbarWidget;
    }
}
//# sourceMappingURL=effects.d.ts.map