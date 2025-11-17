import type { TemplateResult } from 'lit';
import { ColorScheme } from '@blocksuite/affine-model';
type EmbedCardIcons = {
    LoadingIcon: TemplateResult<1>;
    EmbedCardBannerIcon: TemplateResult<1>;
    EmbedCardHorizontalIcon: TemplateResult<1>;
    EmbedCardListIcon: TemplateResult<1>;
    EmbedCardVerticalIcon: TemplateResult<1>;
    EmbedCardCubeIcon: TemplateResult<1>;
};
export declare function getEmbedCardIcons(theme: ColorScheme): EmbedCardIcons;
export declare function extractSearchParams(link: string): {
    params: {
        mode?: "edgeless" | "page" | undefined;
        blockIds?: string[] | undefined;
        elementIds?: string[] | undefined;
        databaseId?: string | undefined;
        databaseRowId?: string | undefined;
    };
} | null;
export {};
//# sourceMappingURL=url.d.ts.map