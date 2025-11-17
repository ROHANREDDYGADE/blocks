import { EditorHost } from '@blocksuite/block-std';
import { LitElement } from 'lit';
import type { AIItemGroupConfig } from './types.js';
declare const AIItemList_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class AIItemList extends AIItemList_base {
    static styles: import("lit").CSSResult;
    private _abortController;
    private _activeSubMenuItem;
    private _closeSubMenu;
    private _itemClassName;
    private _openSubMenu;
    render(): import("lit-html").TemplateResult<1>;
    accessor groups: AIItemGroupConfig[];
    accessor host: EditorHost;
    accessor onClick: (() => void) | undefined;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-item-list': AIItemList;
    }
}
export {};
//# sourceMappingURL=ai-item-list.d.ts.map