import type { BlockStdScope, EditorHost } from '@blocksuite/block-std';
import type { InlineRange } from '@blocksuite/inline';
import type { TemplateResult } from 'lit';
import { type AffineInlineEditor, insertLinkedNode } from '@blocksuite/affine-components/rich-text';
import { type Signal } from '@blocksuite/affine-shared/utils';
export interface LinkedWidgetConfig {
    /**
     * The first item of the trigger keys will be the primary key
     * e.g. @, [[
     */
    triggerKeys: [string, ...string[]];
    /**
     * Convert trigger key to primary key (the first item of the trigger keys)
     * [[ -> @
     */
    convertTriggerKey: boolean;
    ignoreBlockTypes: (keyof BlockSuite.BlockModels)[];
    getMenus: (query: string, abort: () => void, editorHost: EditorHost, inlineEditor: AffineInlineEditor, abortSignal: AbortSignal) => Promise<LinkedMenuGroup[]> | LinkedMenuGroup[];
    mobile: {
        useScreenHeight?: boolean;
        /**
         * The linked doc menu widget will scroll the container to make sure the input cursor is visible in viewport.
         * It accepts a selector string, HTMLElement or Window
         *
         * @default getViewportElement(editorHost) this is the scrollable container in playground
         */
        scrollContainer?: string | HTMLElement | Window;
        /**
         * The offset between the top of viewport and the input cursor
         *
         * @default 46 The height of header in playground
         */
        scrollTopOffset?: number | (() => number);
    };
}
export type LinkedMenuItem = {
    key: string;
    name: string | TemplateResult<1>;
    icon: TemplateResult<1>;
    suffix?: string | TemplateResult<1>;
    action: () => Promise<void> | void;
};
export type LinkedMenuGroup = {
    name: string;
    items: LinkedMenuItem[] | Signal<LinkedMenuItem[]>;
    styles?: string;
    maxDisplay?: number;
    overflowText?: string;
};
export type LinkedDocContext = {
    std: BlockStdScope;
    inlineEditor: AffineInlineEditor;
    startRange: InlineRange;
    triggerKey: string;
    config: LinkedWidgetConfig;
    close: () => void;
};
export declare function createLinkedDocMenuGroup(query: string, abort: () => void, editorHost: EditorHost, inlineEditor: AffineInlineEditor): {
    name: string;
    items: {
        key: string;
        name: string;
        icon: TemplateResult<1>;
        action: () => void;
    }[];
    maxDisplay: number;
    overflowText: string;
};
export declare function createNewDocMenuGroup(query: string, abort: () => void, editorHost: EditorHost, inlineEditor: AffineInlineEditor): LinkedMenuGroup;
export declare function getMenus(query: string, abort: () => void, editorHost: EditorHost, inlineEditor: AffineInlineEditor): Promise<LinkedMenuGroup[]>;
export declare const LinkedWidgetUtils: {
    createLinkedDocMenuGroup: typeof createLinkedDocMenuGroup;
    createNewDocMenuGroup: typeof createNewDocMenuGroup;
    insertLinkedNode: typeof insertLinkedNode;
};
//# sourceMappingURL=config.d.ts.map