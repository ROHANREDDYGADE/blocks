import type { SurfaceBlockComponent, SurfaceBlockModel } from '@blocksuite/affine-block-surface';
import type { RootBlockModel } from '@blocksuite/affine-model';
import type { UIEventHandler } from '@blocksuite/block-std';
import { BlockComponent } from '@blocksuite/block-std';
import { type GfxViewportElement } from '@blocksuite/block-std/gfx';
import type { Viewport } from '../../_common/utils/index.js';
import type { EdgelessRootBlockWidgetName } from '../types.js';
import type { EdgelessSelectedRectWidget } from './components/rects/edgeless-selected-rect.js';
import type { EdgelessRootService } from './edgeless-root-service.js';
import { EdgelessClipboardController } from './clipboard/clipboard.js';
import { EdgelessPageKeyboardManager } from './edgeless-keyboard.js';
export declare class EdgelessRootBlockComponent extends BlockComponent<RootBlockModel, EdgelessRootService, EdgelessRootBlockWidgetName> {
    static styles: import("lit").CSSResult;
    private _refreshLayerViewport;
    private _resizeObserver;
    private _viewportElement;
    clipboardController: EdgelessClipboardController;
    keyboardManager: EdgelessPageKeyboardManager | null;
    get dispatcher(): import("@blocksuite/block-std").UIEventDispatcher;
    get gfx(): import("@blocksuite/block-std/gfx").GfxController;
    get selectedRectWidget(): EdgelessSelectedRectWidget;
    get slots(): {
        pressShiftKeyUpdated: import("@blocksuite/global/utils").Slot<boolean>;
        copyAsPng: import("@blocksuite/global/utils").Slot<{
            blocks: BlockSuite.EdgelessBlockModelType[];
            shapes: BlockSuite.SurfaceModel[];
        }>;
        readonlyUpdated: import("@blocksuite/global/utils").Slot<boolean>;
        draggingAreaUpdated: import("@blocksuite/global/utils").Slot<void>;
        navigatorSettingUpdated: import("@blocksuite/global/utils").Slot<{
            hideToolbar?: boolean;
            blackBackground?: boolean;
            fillScreen?: boolean;
        }>;
        navigatorFrameChanged: import("@blocksuite/global/utils").Slot<import("@blocksuite/affine-model").FrameBlockModel>;
        fullScreenToggled: import("@blocksuite/global/utils").Slot<void>;
        elementResizeStart: import("@blocksuite/global/utils").Slot<void>;
        elementResizeEnd: import("@blocksuite/global/utils").Slot<void>;
        toggleNoteSlicer: import("@blocksuite/global/utils").Slot<void>;
        toolbarLocked: import("@blocksuite/global/utils").Slot<boolean>;
    };
    get surfaceBlockModel(): SurfaceBlockModel;
    /**
     * Don't confuse with `gfx.viewport` which is edgeless-only concept.
     * This refers to the wrapper element of the EditorHost.
     */
    get viewport(): Viewport;
    get viewportElement(): HTMLElement;
    private _initFontLoader;
    private _initLayerUpdateEffect;
    private _initPanEvent;
    private _initPinchEvent;
    private _initPixelRatioChangeEffect;
    private _initRemoteCursor;
    private _initResizeEffect;
    private _initSlotEffects;
    private _initViewport;
    private _initWheelEvent;
    bindHotKey(keymap: Record<string, UIEventHandler>, options?: {
        global?: boolean;
        flavour?: boolean;
    }): () => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    renderBlock(): import("lit-html").TemplateResult<1>;
    accessor backgroundElm: HTMLDivElement | null;
    accessor gfxViewportElm: GfxViewportElement;
    accessor mountElm: HTMLDivElement | null;
    accessor surface: SurfaceBlockComponent;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-edgeless-root': EdgelessRootBlockComponent;
    }
}
//# sourceMappingURL=edgeless-root-block.d.ts.map