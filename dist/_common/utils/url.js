import { DarkLoadingIcon, EmbedCardDarkBannerIcon, EmbedCardDarkCubeIcon, EmbedCardDarkHorizontalIcon, EmbedCardDarkListIcon, EmbedCardDarkVerticalIcon, EmbedCardLightBannerIcon, EmbedCardLightCubeIcon, EmbedCardLightHorizontalIcon, EmbedCardLightListIcon, EmbedCardLightVerticalIcon, LightLoadingIcon, } from '@blocksuite/affine-components/icons';
import { ColorScheme, } from '@blocksuite/affine-model';
import { DocModes } from '@blocksuite/affine-model';
export function getEmbedCardIcons(theme) {
    if (theme === ColorScheme.Light) {
        return {
            LoadingIcon: LightLoadingIcon,
            EmbedCardBannerIcon: EmbedCardLightBannerIcon,
            EmbedCardHorizontalIcon: EmbedCardLightHorizontalIcon,
            EmbedCardListIcon: EmbedCardLightListIcon,
            EmbedCardVerticalIcon: EmbedCardLightVerticalIcon,
            EmbedCardCubeIcon: EmbedCardLightCubeIcon,
        };
    }
    else {
        return {
            LoadingIcon: DarkLoadingIcon,
            EmbedCardBannerIcon: EmbedCardDarkBannerIcon,
            EmbedCardHorizontalIcon: EmbedCardDarkHorizontalIcon,
            EmbedCardListIcon: EmbedCardDarkListIcon,
            EmbedCardVerticalIcon: EmbedCardDarkVerticalIcon,
            EmbedCardCubeIcon: EmbedCardDarkCubeIcon,
        };
    }
}
export function extractSearchParams(link) {
    try {
        const url = new URL(link);
        const mode = url.searchParams.get('mode');
        if (mode && DocModes.includes(mode)) {
            const params = { mode: mode };
            const blockIds = url.searchParams
                .get('blockIds')
                ?.trim()
                .split(',')
                .map(id => id.trim())
                .filter(id => id.length);
            const elementIds = url.searchParams
                .get('elementIds')
                ?.trim()
                .split(',')
                .map(id => id.trim())
                .filter(id => id.length);
            if (blockIds?.length) {
                params.blockIds = blockIds;
            }
            if (elementIds?.length) {
                params.elementIds = elementIds;
            }
            return { params };
        }
    }
    catch (err) {
        console.error(err);
    }
    return null;
}
//# sourceMappingURL=url.js.map