import { WidgetComponent } from '@blocksuite/block-std';
import { nothing, type PropertyValues } from 'lit';
import type { AIPanelGenerating } from './components/index.js';
import type { AffineAIPanelState, AffineAIPanelWidgetConfig } from './type.js';
import { type AffineViewportOverlayWidget } from '../viewport-overlay/viewport-overlay.js';
export declare const AFFINE_AI_PANEL_WIDGET = "affine-ai-panel-widget";
export declare class AffineAIPanelWidget extends WidgetComponent {
    static styles: import("lit").CSSResult;
    private _abortController;
    private _answer;
    private _cancelCallback;
    private _clearDiscardModal;
    private _clickOutside;
    private _discardCallback;
    private _discardModalAbort;
    private _inputFinish;
    private _inputText;
    private _onDocumentClick;
    private _onKeyDown;
    private _resetAbortController;
    private _selection?;
    private _stopAutoUpdate?;
    ctx: unknown;
    discard: () => void;
    /**
     * You can evaluate this method multiple times to regenerate the answer.
     */
    generate: () => void;
    hide: (shouldTriggerCallback?: boolean) => void;
    onInput: (text: string) => void;
    restoreSelection: () => void;
    setState: (state: AffineAIPanelState, reference: Element) => void;
    showDiscardModal: () => Promise<boolean>;
    stopGenerating: () => void;
    toggle: (reference: Element, input?: string, shouldTriggerCallback?: boolean) => void;
    get answer(): string | null;
    get inputText(): string | null;
    get viewportOverlayWidget(): AffineViewportOverlayWidget | null;
    private _autoUpdatePosition;
    private _calcPositionOptions;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
    protected willUpdate(changed: PropertyValues): void;
    accessor config: AffineAIPanelWidgetConfig | null;
    accessor generatingElement: AIPanelGenerating | null;
    accessor state: AffineAIPanelState;
}
//# sourceMappingURL=ai-panel.d.ts.map