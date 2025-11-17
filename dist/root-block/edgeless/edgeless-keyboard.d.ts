import type { EdgelessRootBlockComponent } from './edgeless-root-block.js';
import { PageKeyboardManager } from '../keyboard/keyboard-manager.js';
export declare class EdgelessPageKeyboardManager extends PageKeyboardManager {
    rootComponent: EdgelessRootBlockComponent;
    constructor(rootComponent: EdgelessRootBlockComponent);
    private _bindShiftKey;
    private _bindToggleHand;
    private _delete;
    private _move;
    private _setEdgelessTool;
    private _shift;
    private _space;
}
//# sourceMappingURL=edgeless-keyboard.d.ts.map