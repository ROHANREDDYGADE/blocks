import { LitElement, nothing } from 'lit';
export declare class PieCenterRotator extends LitElement {
    static styles: import("lit").CSSResult;
    protected render(): import("lit-html").TemplateResult<1> | typeof nothing;
    accessor angle: number | null;
    accessor isActive: boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        'pie-center-rotator': PieCenterRotator;
    }
}
//# sourceMappingURL=rotator.d.ts.map