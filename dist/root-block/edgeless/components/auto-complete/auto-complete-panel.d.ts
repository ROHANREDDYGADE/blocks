import type { ConnectorElementModel, ShapeElementModel } from '@blocksuite/affine-model';
import { NoteBlockModel } from '@blocksuite/affine-model';
import { type BlockStdScope } from '@blocksuite/block-std';
import { LitElement, nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
declare const EdgelessAutoCompletePanel_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessAutoCompletePanel extends EdgelessAutoCompletePanel_base {
    static styles: import("lit").CSSResult;
    private _overlay;
    get gfx(): import("@blocksuite/block-std/gfx").GfxController;
    constructor(position: [number, number], edgeless: EdgelessRootBlockComponent, currentSource: ShapeElementModel | NoteBlockModel, connector: ConnectorElementModel);
    private _addFrame;
    private _addNote;
    private _addShape;
    private _addText;
    private _autoComplete;
    private _connectorExist;
    private _generateTarget;
    private _getCurrentSourceInfo;
    private _getPanelPosition;
    private _getTargetXYWH;
    private _removeOverlay;
    private _showFrameOverlay;
    private _showNoteOverlay;
    private _showOverlay;
    private _showShapeOverlay;
    private _showTextOverlay;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    accessor connector: ConnectorElementModel;
    accessor currentSource: ShapeElementModel | NoteBlockModel;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor position: [number, number];
    accessor std: BlockStdScope;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-auto-complete-panel': EdgelessAutoCompletePanel;
    }
}
export {};
//# sourceMappingURL=auto-complete-panel.d.ts.map