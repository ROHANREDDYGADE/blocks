import { LitElement } from 'lit';
declare const AIPanelInput_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class AIPanelInput extends AIPanelInput_base {
    static styles: import("lit").CSSResult;
    private _onInput;
    private _onKeyDown;
    private _sendToAI;
    render(): import("lit-html").TemplateResult<1>;
    updated(_changedProperties: Map<PropertyKey, unknown>): void;
    private accessor _arrow;
    private accessor _hasContent;
    accessor onFinish: ((input: string) => void) | undefined;
    accessor onInput: ((input: string) => void) | undefined;
    accessor textarea: HTMLTextAreaElement;
}
declare global {
    interface HTMLElementTagNameMap {
        'ai-panel-input': AIPanelInput;
    }
}
export {};
//# sourceMappingURL=input.d.ts.map