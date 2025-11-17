import type { DocCollection } from '@blocksuite/store';
import { LitElement, type PropertyValues } from 'lit';
export type OnSuccessHandler = (pageIds: string[], options: {
    isWorkspaceFile: boolean;
    importedCount: number;
}) => void;
export type OnFailHandler = (message: string) => void;
declare const ImportDoc_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class ImportDoc extends ImportDoc_base {
    private collection;
    private onSuccess?;
    private onFail?;
    private abortController;
    static styles: import("lit").CSSResult;
    constructor(collection: DocCollection, onSuccess?: OnSuccessHandler | undefined, onFail?: OnFailHandler | undefined, abortController?: AbortController);
    private _importHtml;
    private _importMarkDown;
    private _importNotion;
    private _onCloseClick;
    private _onFail;
    private _onImportSuccess;
    private _onMouseDown;
    private _onMouseMove;
    private _onMouseUp;
    private _openLearnImportLink;
    render(): import("lit-html").TemplateResult<1>;
    updated(changedProps: PropertyValues): void;
    accessor _loading: boolean;
    accessor _startX: number;
    accessor _startY: number;
    accessor containerEl: HTMLElement;
    accessor x: number;
    accessor y: number;
}
export {};
//# sourceMappingURL=import-doc.d.ts.map