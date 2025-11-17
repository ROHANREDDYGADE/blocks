import { AttachmentAdapterFactoryExtension } from './attachment.js';
import { BlockHtmlAdapterExtensions } from './html-adapter/block-matcher.js';
import { HtmlAdapterFactoryExtension } from './html-adapter/html.js';
import { ImageAdapterFactoryExtension } from './image.js';
import { BlockMarkdownAdapterExtensions } from './markdown/block-matcher.js';
import { MarkdownAdapterFactoryExtension } from './markdown/markdown.js';
import { MixTextAdapterFactoryExtension } from './mix-text.js';
import { BlockNotionHtmlAdapterExtensions } from './notion-html/block-matcher.js';
import { NotionHtmlAdapterFactoryExtension } from './notion-html/notion-html.js';
import { NotionTextAdapterFactoryExtension } from './notion-text.js';
import { BlockPlainTextAdapterExtensions } from './plain-text/block-matcher.js';
import { PlainTextAdapterFactoryExtension } from './plain-text/plain-text.js';
export const AdapterFactoryExtensions = [
    AttachmentAdapterFactoryExtension,
    ImageAdapterFactoryExtension,
    MarkdownAdapterFactoryExtension,
    PlainTextAdapterFactoryExtension,
    HtmlAdapterFactoryExtension,
    NotionTextAdapterFactoryExtension,
    NotionHtmlAdapterFactoryExtension,
    MixTextAdapterFactoryExtension,
];
export const BlockAdapterMatcherExtensions = [
    BlockPlainTextAdapterExtensions,
    BlockMarkdownAdapterExtensions,
    BlockHtmlAdapterExtensions,
    BlockNotionHtmlAdapterExtensions,
].flat();
//# sourceMappingURL=extension.js.map