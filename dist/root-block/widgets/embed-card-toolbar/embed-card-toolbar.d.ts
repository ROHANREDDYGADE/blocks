import { type MenuItemGroup } from '@blocksuite/affine-components/toolbar';
import { type AliasInfo, type RootBlockModel } from '@blocksuite/affine-model';
import { WidgetComponent } from '@blocksuite/block-std';
import { nothing, type TemplateResult } from 'lit';
import type { RootBlockComponent } from '../../types.js';
import { type EmbedBlockComponent, type EmbedModel } from '../../../_common/components/embed-card/type.js';
import { EmbedCardToolbarContext } from './context.js';
export declare const AFFINE_EMBED_CARD_TOOLBAR_WIDGET = "affine-embed-card-toolbar";
export declare class EmbedCardToolbar extends WidgetComponent<RootBlockModel, RootBlockComponent> {
    static styles: import("lit").CSSResult;
    private _abortController;
    private _copyUrl;
    private _embedOptions;
    private _openEditPopup;
    private _resetAbortController;
    private _showCaption;
    private _toggleCardStyleSelector;
    private _toggleViewSelector;
    private _trackViewSelected;
    moreGroups: MenuItemGroup<EmbedCardToolbarContext>[];
    private get _canConvertToEmbedView();
    private get _canShowUrlOptions();
    private get _embedViewButtonDisabled();
    private get _isCardView();
    private get _isEmbedView();
    get _openButtonDisabled(): boolean | undefined;
    get _originalDocInfo(): AliasInfo | undefined;
    get _originalDocTitle(): string | undefined;
    private get _selection();
    private get _viewType();
    get focusModel(): EmbedModel | undefined;
    private _canShowCardStylePanel;
    private _cardStyleSelector;
    private _convertToCardView;
    private _convertToEmbedView;
    private _hide;
    private _moreActions;
    private _openMenuButton;
    private _setEmbedCardStyle;
    private _show;
    private _turnIntoInlineView;
    private _viewSelector;
    connectedCallback(): void;
    render(): TemplateResult<1> | typeof nothing;
    accessor cardStyleButton: HTMLElement | null;
    accessor embedCardToolbarElement: HTMLElement;
    accessor focusBlock: EmbedBlockComponent | null;
    accessor hide: boolean;
    accessor moreButton: HTMLElement | null;
}
declare global {
    interface HTMLElementTagNameMap {
        [AFFINE_EMBED_CARD_TOOLBAR_WIDGET]: EmbedCardToolbar;
    }
}
//# sourceMappingURL=embed-card-toolbar.d.ts.map