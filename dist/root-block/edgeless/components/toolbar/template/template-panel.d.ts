import { LitElement } from 'lit';
import type { EdgelessRootBlockComponent } from '../../../edgeless-root-block.js';
import type { Template } from './template-type.js';
import { EdgelessDraggableElementController } from '../common/draggable/draggable-element.controller.js';
declare const EdgelessTemplatePanel_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessTemplatePanel extends EdgelessTemplatePanel_base {
    static styles: import("lit").CSSResult;
    static templates: {
        list: (category: string) => Promise<Template[]>;
        categories: () => Promise<string[]>;
        search: (keyword: string, cateName?: string) => Promise<Template[]>;
        extend(manager: import("./template-type.js").TemplateManager): void;
    };
    private _fetchJob;
    draggableController: EdgelessDraggableElementController<Template>;
    private _closePanel;
    private _fetch;
    private _getLocalSelectedCategory;
    private _initCategory;
    private _initDragController;
    private _insertTemplate;
    private _updateSearchKeyword;
    private _updateTemplates;
    connectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    private accessor _categories;
    private accessor _currentCategory;
    private accessor _loading;
    private accessor _loadingTemplate;
    private accessor _searchKeyword;
    private accessor _templates;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor isDragging: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'edgeless-templates-panel': EdgelessTemplatePanel;
    }
}
export {};
//# sourceMappingURL=template-panel.d.ts.map