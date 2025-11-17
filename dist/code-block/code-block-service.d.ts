import { BlockService } from '@blocksuite/block-std';
import { type Signal } from '@preact/signals-core';
import { type HighlighterCore, type MaybeGetter } from 'shiki';
export declare class CodeBlockService extends BlockService {
    static readonly flavour: "affine:code";
    private _darkThemeKey;
    private _lightThemeKey;
    highlighter$: Signal<HighlighterCore | null>;
    get langs(): import("shiki").BundledLanguageInfo[];
    get themeKey(): string | undefined;
    mounted(): void;
}
/**
 * https://github.com/shikijs/shiki/blob/933415cdc154fe74ccfb6bbb3eb6a7b7bf183e60/packages/core/src/internal.ts#L31
 */
export declare function normalizeGetter<T>(p: MaybeGetter<T>): Promise<T>;
//# sourceMappingURL=code-block-service.d.ts.map