import { AFFINE_KEYBOARD_TOOL_PANEL, AffineKeyboardToolPanel } from './keyboard-tool-panel.js';
import { AFFINE_KEYBOARD_TOOLBAR, AffineKeyboardToolbar } from './keyboard-toolbar.js';
export declare function effects(): void;
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_KEYBOARD_TOOLBAR]: AffineKeyboardToolbar;
        [AFFINE_KEYBOARD_TOOL_PANEL]: AffineKeyboardToolPanel;
    }
}
//# sourceMappingURL=effects.d.ts.map