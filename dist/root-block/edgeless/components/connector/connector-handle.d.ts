import type { ConnectorElementModel } from '@blocksuite/affine-model';
import type { Doc } from '@blocksuite/store';
import { type ConnectionOverlay } from '@blocksuite/affine-block-surface';
import { type BlockStdScope } from '@blocksuite/block-std';
import { LitElement } from 'lit';
import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
declare const EdgelessConnectorHandle_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessConnectorHandle extends EdgelessConnectorHandle_base {
    static styles: import("lit").CSSResult;
    private _lastZoom;
    get connectionOverlay(): ConnectionOverlay;
    get gfx(): import("@blocksuite/block-std/gfx").GfxController;
    private _bindEvent;
    private _capPointerDown;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _endHandler;
    private accessor _startHandler;
    accessor connector: ConnectorElementModel;
    accessor doc: Doc;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor std: BlockStdScope;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-connector-handle': EdgelessConnectorHandle;
    }
}
export {};
//# sourceMappingURL=connector-handle.d.ts.map