import type { EditorHost } from '@blocksuite/block-std';
import type { DetailSlotProps } from '@blocksuite/data-view';
import type { KanbanSingleView, TableSingleView } from '@blocksuite/data-view/view-presets';
import { ShadowlessElement } from '@blocksuite/block-std';
declare const BlockRenderer_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class BlockRenderer extends BlockRenderer_base implements DetailSlotProps {
    static styles: import("lit").CSSResult;
    get attributeRenderer(): import("@blocksuite/inline").AttributeRenderer<import("@blocksuite/affine-shared/types").AffineTextAttributes>;
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
    }>;
    get inlineManager(): import("@blocksuite/affine-components/rich-text").InlineManager;
    get model(): import("@blocksuite/store").BlockModel<object, object> | undefined;
    get service(): import("../database-service.js").DatabaseBlockService | null;
    connectedCallback(): void;
    protected render(): unknown;
    renderIcon(): import("lit-html").TemplateResult<1> | undefined;
    accessor host: EditorHost;
    accessor openDoc: (docId: string) => void;
    accessor rowId: string;
    accessor view: TableSingleView | KanbanSingleView;
}
export {};
//# sourceMappingURL=block-renderer.d.ts.map