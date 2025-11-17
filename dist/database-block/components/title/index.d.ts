import type { Text } from '@blocksuite/store';
import { ShadowlessElement } from '@blocksuite/block-std';
import type { DatabaseBlockComponent } from '../../database-block.js';
declare const DatabaseTitle_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class DatabaseTitle extends DatabaseTitle_base {
    static styles: import("lit").CSSResult;
    private compositionEnd;
    private onBlur;
    private onFocus;
    private onInput;
    private onKeyDown;
    updateText: () => void;
    get database(): DatabaseBlockComponent | null;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private accessor input;
    accessor isComposing: boolean;
    private accessor isFocus;
    accessor onPressEnterKey: (() => void) | undefined;
    accessor readonly: boolean;
    private accessor text;
    accessor titleText: Text;
}
declare global {
    interface HTMLElementTagNameMap {
        'affine-database-title': DatabaseTitle;
    }
}
export {};
//# sourceMappingURL=index.d.ts.map