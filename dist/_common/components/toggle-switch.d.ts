import { LitElement } from 'lit';
export declare class ToggleSwitch extends LitElement {
    static styles: import("lit").CSSResult;
    private _toggleSwitch;
    render(): import("lit-html").TemplateResult<1>;
    accessor on: boolean;
    accessor onChange: ((on: boolean) => void) | undefined;
}
declare global {
    interface HTMLElementTagNameMap {
        'toggle-switch': ToggleSwitch;
    }
}
//# sourceMappingURL=toggle-switch.d.ts.map