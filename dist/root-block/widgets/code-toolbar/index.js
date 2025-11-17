import { HoverController } from '@blocksuite/affine-components/hover';
import { cloneGroups } from '@blocksuite/affine-components/toolbar';
import { WidgetComponent } from '@blocksuite/block-std';
import { limitShift, shift } from '@floating-ui/dom';
import { html } from 'lit';
import { PAGE_HEADER_HEIGHT } from '../../../_common/consts.js';
import { getMoreMenuConfig } from '../../configs/toolbar.js';
import { MORE_GROUPS, PRIMARY_GROUPS } from './config.js';
import { CodeBlockToolbarContext } from './context.js';
export const AFFINE_CODE_TOOLBAR_WIDGET = 'affine-code-toolbar-widget';
export class AffineCodeToolbarWidget extends WidgetComponent {
    constructor() {
        super(...arguments);
        this._hoverController = null;
        this._isActivated = false;
        this._setHoverController = () => {
            this._hoverController = null;
            this._hoverController = new HoverController(this, ({ abortController }) => {
                const codeBlock = this.block;
                const selection = this.host.selection;
                const textSelection = selection.find('text');
                if (!!textSelection &&
                    (!!textSelection.to || !!textSelection.from.length)) {
                    return null;
                }
                const blockSelections = selection.filter('block');
                if (blockSelections.length > 1 ||
                    (blockSelections.length === 1 &&
                        blockSelections[0].blockId !== codeBlock.blockId)) {
                    return null;
                }
                const setActive = (active) => {
                    this._isActivated = active;
                    if (!active && !this._hoverController?.isHovering) {
                        this._hoverController?.abort();
                    }
                };
                const context = new CodeBlockToolbarContext(codeBlock, abortController, setActive);
                return {
                    template: html `<affine-code-toolbar
            .context=${context}
            .primaryGroups=${this.primaryGroups}
            .moreGroups=${this.moreGroups}
            .onActiveStatusChange=${setActive}
          ></affine-code-toolbar>`,
                    container: this.block,
                    // stacking-context(editor-host)
                    portalStyles: {
                        zIndex: 'var(--affine-z-index-popover)',
                    },
                    computePosition: {
                        referenceElement: codeBlock,
                        placement: 'right-start',
                        middleware: [
                            shift({
                                crossAxis: true,
                                padding: {
                                    top: PAGE_HEADER_HEIGHT + 12,
                                    bottom: 12,
                                    right: 12,
                                },
                                limiter: limitShift(),
                            }),
                        ],
                        autoUpdate: true,
                    },
                };
            }, { allowMultiple: true });
            const codeBlock = this.block;
            this._hoverController.setReference(codeBlock);
            this._hoverController.onAbort = () => {
                // If the more menu is opened, don't close it.
                if (this._isActivated)
                    return;
                this._hoverController?.abort();
                return;
            };
        };
        this.addMoretems = (items, index, type) => {
            let group;
            if (type) {
                group = this.moreGroups.find(g => g.type === type);
            }
            if (!group) {
                group = this.moreGroups[0];
            }
            if (index === undefined) {
                group.items.push(...items);
                return this;
            }
            group.items.splice(index, 0, ...items);
            return this;
        };
        this.addPrimaryItems = (items, index) => {
            if (index === undefined) {
                this.primaryGroups[0].items.push(...items);
                return this;
            }
            this.primaryGroups[0].items.splice(index, 0, ...items);
            return this;
        };
        /*
         * Caches the more menu items.
         * Currently only supports configuring more menu.
         */
        this.moreGroups = cloneGroups(MORE_GROUPS);
        this.primaryGroups = cloneGroups(PRIMARY_GROUPS);
    }
    firstUpdated() {
        this.moreGroups = getMoreMenuConfig(this.std).configure(this.moreGroups);
        this._setHoverController();
    }
}
//# sourceMappingURL=index.js.map