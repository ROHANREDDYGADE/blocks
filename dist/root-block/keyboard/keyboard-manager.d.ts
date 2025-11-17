import type { BlockComponent } from '@blocksuite/block-std';
export declare class PageKeyboardManager {
    rootComponent: BlockComponent;
    private _handleDelete;
    private get _currentSelection();
    private get _doc();
    private get _selection();
    constructor(rootComponent: BlockComponent);
    private _createEmbedBlock;
    private _deleteBlocksBySelection;
    private _replaceBlocksBySelection;
}
//# sourceMappingURL=keyboard-manager.d.ts.map