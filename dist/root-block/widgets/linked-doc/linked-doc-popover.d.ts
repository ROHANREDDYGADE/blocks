import { LitElement } from 'lit';
import type { IconButton } from '../../../_common/components/button.js';
import type { LinkedDocContext } from './config.js';
declare const LinkedDocPopover_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class LinkedDocPopover extends LinkedDocPopover_base {
    static styles: import("lit").CSSResult;
    private _abort;
    private _expanded;
    private _updateLinkedDocGroup;
    private _updateLinkedDocGroupAbortController;
    private get _actionGroup();
    private get _flattenActionList();
    private get _query();
    private _getActionItems;
    private _isTextOverflowing;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    updatePosition(position: {
        height: number;
        x: string;
        y: string;
    }): void;
    willUpdate(): void;
    private accessor _activatedItemIndex;
    private accessor _linkedDocGroup;
    private accessor _position;
    private accessor _showTooltip;
    accessor context: LinkedDocContext;
    accessor iconButtons: NodeListOf<IconButton>;
    accessor linkedDocElement: Element | null;
}
export {};
//# sourceMappingURL=linked-doc-popover.d.ts.map