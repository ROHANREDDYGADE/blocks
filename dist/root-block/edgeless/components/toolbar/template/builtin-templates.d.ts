import type { Template, TemplateCategory, TemplateManager } from './template-type.js';
export declare const templates: TemplateCategory[];
export declare const builtInTemplates: {
    list: (category: string) => Promise<Template[]>;
    categories: () => Promise<string[]>;
    search: (keyword: string, cateName?: string) => Promise<Template[]>;
    extend(manager: TemplateManager): void;
};
//# sourceMappingURL=builtin-templates.d.ts.map