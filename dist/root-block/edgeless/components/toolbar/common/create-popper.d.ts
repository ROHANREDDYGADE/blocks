export interface MenuPopper<T extends HTMLElement> {
    element: T;
    dispose: () => void;
    cancel?: () => void;
}
export declare function createPopper<T extends keyof HTMLElementTagNameMap>(tagName: T, reference: HTMLElement, options?: {
    /** transition duration in ms */
    duration?: number;
    onDispose?: () => void;
    setProps?: (ele: HTMLElementTagNameMap[T]) => void;
}): MenuPopper<HTMLElementTagNameMap[T]>;
//# sourceMappingURL=create-popper.d.ts.map