import type { DeltaInsert } from '@blocksuite/inline';
import type { Text } from '@blocksuite/store';
import { type RichText } from '@blocksuite/affine-components/rich-text';
import { BaseCellRenderer } from '@blocksuite/data-view';
import { type TemplateResult } from 'lit';
declare abstract class BaseTextCell extends BaseCellRenderer<Text> {
    static styles: import("lit").CSSResult;
    activity: boolean;
    docId$: import("@preact/signals-core").Signal<string | undefined>;
    isLinkedDoc$: import("@preact/signals-core").ReadonlySignal<boolean>;
    linkedDocTitle$: import("@preact/signals-core").ReadonlySignal<Text | undefined>;
    get attributeRenderer(): import("@blocksuite/inline").AttributeRenderer<import("@blocksuite/affine-shared/types").AffineTextAttributes> | undefined;
    get attributesSchema(): import("zod").ZodObject<Record<keyof import("@blocksuite/affine-shared/types").AffineTextAttributes, import("zod").ZodTypeAny>, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
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
    get host(): import("@blocksuite/block-std").EditorHost | undefined;
    get inlineEditor(): import("@blocksuite/affine-components/rich-text").AffineInlineEditor | null;
    get inlineManager(): import("@blocksuite/affine-components/rich-text").InlineManager | undefined;
    get service(): import("../../database-service.js").DatabaseBlockService | null | undefined;
    get topContenteditableElement(): import("@blocksuite/block-std").BlockComponent<import("@blocksuite/store").BlockModel<object, object & {}>, import("@blocksuite/block-std").BlockService, string> | null | undefined;
    connectedCallback(): void;
    protected render(): unknown;
    abstract renderBlockText(): TemplateResult;
    renderIcon(): TemplateResult | undefined;
    abstract renderLinkedDoc(): TemplateResult;
    accessor richText: RichText;
    accessor showIcon: boolean;
}
export declare class HeaderAreaTextCell extends BaseTextCell {
    renderBlockText(): TemplateResult;
    renderLinkedDoc(): TemplateResult;
}
export declare class HeaderAreaTextCellEditing extends BaseTextCell {
    private _onCopy;
    private _onCut;
    private _onPaste;
    activity: boolean;
    insertDelta: (delta: DeltaInsert) => void;
    private get std();
    connectedCallback(): void;
    firstUpdated(props: Map<string, unknown>): void;
    renderBlockText(): TemplateResult;
    renderLinkedDoc(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'data-view-header-area-text': HeaderAreaTextCell;
        'data-view-header-area-text-editing': HeaderAreaTextCellEditing;
    }
}
export {};
//# sourceMappingURL=text.d.ts.map