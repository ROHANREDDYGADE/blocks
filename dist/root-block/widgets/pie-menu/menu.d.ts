import type { IVec } from '@blocksuite/global/utils';
import { Slot } from '@blocksuite/global/utils';
import { LitElement } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
import type { PieMenuSchema } from './base.js';
import type { AffinePieMenuWidget } from './index.js';
import { PieNode } from './node.js';
declare const PieMenu_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class PieMenu extends PieMenu_base {
    static styles: import("lit").CSSResult;
    private _handleKeyDown;
    private _handlePointerMove;
    private _hoveredNode;
    private _openSubmenuTimeout?;
    private selectChildWithIndex;
    abortController: AbortController;
    selectionChain: PieNode[];
    slots: {
        pointerAngleUpdated: Slot<number | null>;
        requestNodeUpdate: Slot<void>;
    };
    get activeNode(): PieNode;
    get hoveredNode(): PieNode | null;
    get rootNode(): PieNode;
    private _createNodeTree;
    private _setupEvents;
    close(): void;
    connectedCallback(): void;
    /**
     * Position of the active node relative to the view
     */
    getActiveNodeRelPos(): IVec;
    getActiveNodeToMouseLenSq(mouse: IVec): number;
    getNodeRelPos(node: PieNode): IVec;
    isActiveNode(node: PieNode): boolean;
    isChildOfActiveNode(node: PieNode): boolean;
    openSubmenu(submenu: PieNode): void;
    popSelectionChainTo(node: PieNode): void;
    render(): import("lit-html").TemplateResult<1>;
    selectHovered(): void;
    setHovered(node: PieNode | null): void;
    accessor position: IVec;
    accessor rootComponent: EdgelessRootBlockComponent;
    accessor schema: PieMenuSchema;
    accessor widgetComponent: AffinePieMenuWidget;
}
export {};
//# sourceMappingURL=menu.d.ts.map