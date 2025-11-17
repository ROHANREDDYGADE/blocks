import type { AffineTextAttributes } from '@blocksuite/affine-shared/types';
import { type AffineInlineEditor } from '@blocksuite/affine-components/rich-text';
import { BaseCellRenderer } from '@blocksuite/data-view';
import { Text } from '@blocksuite/store';
import { nothing, type PropertyValues } from 'lit';
export declare class RichTextCell extends BaseCellRenderer<Text> {
    static styles: import("lit").CSSResult;
    get attributeRenderer(): import("@blocksuite/inline").AttributeRenderer<AffineTextAttributes> | undefined;
    get attributesSchema(): import("zod").ZodObject<Record<keyof AffineTextAttributes, import("zod").ZodTypeAny>, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
        color?: any;
        code?: any;
        link?: any;
        strike?: any;
        bold?: any;
        latex?: any;
        italic?: any;
        underline?: any;
        reference?: any;
        background?: any;
    }, {
        color?: any;
        code?: any;
        link?: any;
        strike?: any;
        bold?: any;
        latex?: any;
        italic?: any;
        underline?: any;
        reference?: any;
        background?: any;
    }> | undefined;
    get inlineEditor(): AffineInlineEditor;
    get inlineManager(): import("@blocksuite/affine-components/rich-text").InlineManager | undefined;
    get service(): import("../../database-service.js").DatabaseBlockService | null | undefined;
    get topContenteditableElement(): import("@blocksuite/block-std").BlockComponent<import("@blocksuite/store").BlockModel<object, object & {}>, import("@blocksuite/block-std").BlockService, string> | null | undefined;
    private changeUserSelectAccordToReadOnly;
    connectedCallback(): void;
    render(): import("lit-html/directive.js").DirectiveResult<typeof import("lit-html/directives/keyed.js").Keyed>;
    updated(changedProperties: PropertyValues): void;
    private accessor _richTextElement;
}
export declare class RichTextCellEditing extends BaseCellRenderer<Text> {
    static styles: import("lit").CSSResult;
    private _handleKeyDown;
    private _initYText;
    private _onSoftEnter;
    get attributeRenderer(): import("@blocksuite/inline").AttributeRenderer<AffineTextAttributes> | undefined;
    get attributesSchema(): import("zod").ZodObject<Record<keyof AffineTextAttributes, import("zod").ZodTypeAny>, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
        color?: any;
        code?: any;
        link?: any;
        strike?: any;
        bold?: any;
        latex?: any;
        italic?: any;
        underline?: any;
        reference?: any;
        background?: any;
    }, {
        color?: any;
        code?: any;
        link?: any;
        strike?: any;
        bold?: any;
        latex?: any;
        italic?: any;
        underline?: any;
        reference?: any;
        background?: any;
    }> | undefined;
    get inlineEditor(): AffineInlineEditor;
    get inlineManager(): import("@blocksuite/affine-components/rich-text").InlineManager | undefined;
    get service(): import("../../database-service.js").DatabaseBlockService | null | undefined;
    get topContenteditableElement(): import("@blocksuite/block-std").BlockComponent<import("@blocksuite/store").BlockModel<object, object & {}>, import("@blocksuite/block-std").BlockService, string> | null | undefined;
    connectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult | typeof nothing;
    private accessor _richTextElement;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-database-rich-text-cell-editing': RichTextCellEditing;
    }
}
export declare const richTextColumnConfig: import("@blocksuite/data-view").PropertyMetaConfig<"rich-text", Record<string, never>, import("../utils.js").RichTextCellType>;
//# sourceMappingURL=cell-renderer.d.ts.map