import { getInlineEditorByModel, } from '@blocksuite/affine-components/rich-text';
import { getCurrentNativeRange, matchFlavours, } from '@blocksuite/affine-shared/utils';
import { WidgetComponent } from '@blocksuite/block-std';
import { assertExists, assertType, debounce, DisposableGroup, throttle, } from '@blocksuite/global/utils';
import { InlineEditor } from '@blocksuite/inline';
import { getPopperPosition } from '../../utils/position.js';
import { defaultSlashMenuConfig, } from './config.js';
import { SlashMenu } from './slash-menu-popover.js';
import { filterEnabledSlashMenuItems } from './utils.js';
let globalAbortController = new AbortController();
function closeSlashMenu() {
    globalAbortController.abort();
}
const showSlashMenu = debounce(({ context, container = document.body, abortController = new AbortController(), config, triggerKey, }) => {
    const curRange = getCurrentNativeRange();
    if (!curRange)
        return;
    globalAbortController = abortController;
    const disposables = new DisposableGroup();
    abortController.signal.addEventListener('abort', () => disposables.dispose());
    const inlineEditor = getInlineEditorByModel(context.rootComponent.host, context.model);
    if (!inlineEditor)
        return;
    const slashMenu = new SlashMenu(inlineEditor, abortController);
    disposables.add(() => slashMenu.remove());
    slashMenu.context = context;
    slashMenu.config = config;
    slashMenu.triggerKey = triggerKey;
    // Handle position
    const updatePosition = throttle(() => {
        const slashMenuElement = slashMenu.slashMenuElement;
        assertExists(slashMenuElement, 'You should render the slash menu node even if no position');
        const position = getPopperPosition(slashMenuElement, curRange);
        slashMenu.updatePosition(position);
    }, 10);
    disposables.addFromEvent(window, 'resize', updatePosition);
    // FIXME(Flrande): It is not a best practice,
    // but merely a temporary measure for reusing previous components.
    // Mount
    container.append(slashMenu);
    // Wait for the Node to be mounted
    setTimeout(updatePosition);
    return slashMenu;
}, 100);
export const AFFINE_SLASH_MENU_WIDGET = 'affine-slash-menu-widget';
export class AffineSlashMenuWidget extends WidgetComponent {
    constructor() {
        super(...arguments);
        this._getInlineEditor = (evt) => {
            if (evt.target instanceof HTMLElement) {
                const editor = evt.target.closest('.inline-editor')?.inlineEditor;
                if (editor instanceof InlineEditor) {
                    return editor;
                }
            }
            const textSelection = this.host.selection.find('text');
            if (!textSelection)
                return;
            const model = this.host.doc.getBlock(textSelection.blockId)?.model;
            if (!model)
                return;
            return getInlineEditorByModel(this.host, model);
        };
        this._handleInput = (inlineEditor, isCompositionEnd) => {
            const inlineRangeApplyCallback = (callback) => {
                // the inline ranged updated in compositionEnd event before this event callback
                if (isCompositionEnd)
                    callback();
                else
                    inlineEditor.slots.inlineRangeSync.once(callback);
            };
            const rootComponent = this.block;
            if (rootComponent.model.flavour !== 'affine:page') {
                console.error('SlashMenuWidget should be used in RootBlock');
                return;
            }
            assertType(rootComponent);
            inlineRangeApplyCallback(() => {
                const textSelection = this.host.selection.find('text');
                if (!textSelection)
                    return;
                const model = this.host.doc.getBlock(textSelection.blockId)?.model;
                if (!model)
                    return;
                if (matchFlavours(model, this.config.ignoreBlockTypes))
                    return;
                const inlineRange = inlineEditor.getInlineRange();
                if (!inlineRange)
                    return;
                const textPoint = inlineEditor.getTextPoint(inlineRange.index);
                if (!textPoint)
                    return;
                const [leafStart, offsetStart] = textPoint;
                const text = leafStart.textContent
                    ? leafStart.textContent.slice(0, offsetStart)
                    : '';
                const matchedKey = this.config.triggerKeys.find(triggerKey => text.endsWith(triggerKey));
                if (!matchedKey)
                    return;
                const config = {
                    ...this.config,
                    items: filterEnabledSlashMenuItems(this.config.items, {
                        model,
                        rootComponent,
                    }),
                };
                closeSlashMenu();
                showSlashMenu({
                    context: {
                        model,
                        rootComponent,
                    },
                    triggerKey: matchedKey,
                    config,
                });
            });
        };
        this._onCompositionEnd = (ctx) => {
            const event = ctx.get('defaultState').event;
            if (!this.config.triggerKeys.some(triggerKey => triggerKey.includes(event.data)))
                return;
            const inlineEditor = this._getInlineEditor(event);
            if (!inlineEditor)
                return;
            this._handleInput(inlineEditor, true);
        };
        this._onKeyDown = (ctx) => {
            const eventState = ctx.get('keyboardState');
            const event = eventState.raw;
            const key = event.key;
            // check event is not composing
            if (key === undefined || // in mac os, the key may be undefined
                key === 'Process' ||
                event.isComposing)
                return;
            if (!this.config.triggerKeys.some(triggerKey => triggerKey.includes(key)))
                return;
            const inlineEditor = this._getInlineEditor(event);
            if (!inlineEditor)
                return;
            this._handleInput(inlineEditor, false);
        };
        this.config = AffineSlashMenuWidget.DEFAULT_CONFIG;
    }
    static { this.DEFAULT_CONFIG = defaultSlashMenuConfig; }
    connectedCallback() {
        super.connectedCallback();
        if (this.config.triggerKeys.some(key => key.length === 0)) {
            console.error('Trigger key of slash menu should not be empty string');
            return;
        }
        // this.handleEvent('beforeInput', this._onBeforeInput);
        this.handleEvent('keyDown', this._onKeyDown);
        this.handleEvent('compositionEnd', this._onCompositionEnd);
    }
}
//# sourceMappingURL=index.js.map