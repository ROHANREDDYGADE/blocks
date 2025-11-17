import { EmbedFigmaBlockComponent, EmbedGithubBlockComponent, EmbedHtmlBlockComponent, EmbedLinkedDocBlockComponent, EmbedLoomBlockComponent, EmbedSyncedDocBlockComponent, EmbedYoutubeBlockComponent, } from '@blocksuite/affine-block-embed';
import { EmbedLinkedDocModel, EmbedSyncedDocModel, } from '@blocksuite/affine-model';
import { BookmarkBlockComponent } from '../../../bookmark-block/bookmark-block.js';
export function isEmbedCardBlockComponent(block) {
    return (block instanceof BookmarkBlockComponent ||
        block instanceof EmbedFigmaBlockComponent ||
        block instanceof EmbedGithubBlockComponent ||
        block instanceof EmbedHtmlBlockComponent ||
        block instanceof EmbedLoomBlockComponent ||
        block instanceof EmbedYoutubeBlockComponent ||
        block instanceof EmbedLinkedDocBlockComponent ||
        block instanceof EmbedSyncedDocBlockComponent);
}
export function isInternalEmbedModel(model) {
    return (model instanceof EmbedLinkedDocModel || model instanceof EmbedSyncedDocModel);
}
//# sourceMappingURL=type.js.map