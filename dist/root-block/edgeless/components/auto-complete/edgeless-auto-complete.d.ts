import type { NoteBlockModel } from '@blocksuite/affine-model';
import { type ConnectionOverlay } from '@blocksuite/affine-block-surface';
import { ShapeElementModel } from '@blocksuite/affine-model';
import { type BlockStdScope } from '@blocksuite/block-std';
import { LitElement, nothing } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
import type { SelectedRect } from '../rects/edgeless-selected-rect.js';
declare const EdgelessAutoComplete_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessAutoComplete extends EdgelessAutoComplete_base {
    static styles: import("lit").CSSResult;
    private _autoCompleteOverlay;
    private _onPointerDown;
    private _pathGenerator;
    private _timer;
    get canShowAutoComplete(): boolean;
    get connectionOverlay(): ConnectionOverlay;
    private _addConnector;
    private _addMindmapNode;
    private _computeLine;
    private _computeNextBound;
    private _createAutoCompletePanel;
    private _generateElementOnClick;
    private _getConnectedElements;
    private _getMindmapButtons;
    private _initOverlay;
    private _renderArrow;
    private _renderMindMapButtons;
    private _showNextShape;
    connectedCallback(): void;
    firstUpdated(): void;
    removeOverlay(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    private accessor _isHover;
    private accessor _isMoving;
    accessor current: ShapeElementModel | NoteBlockModel;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor selectedRect: SelectedRect;
    accessor std: BlockStdScope;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-auto-complete': EdgelessAutoComplete;
    }
}
export {};
//# sourceMappingURL=edgeless-auto-complete.d.ts.map