import { withTempBlobData } from '@blocksuite/affine-shared/utils';
import { Extension } from '@blocksuite/block-std';
import { createIdentifier } from '@blocksuite/global/di';
import { html } from 'lit';
import { transformModel } from '../root-block/utils/operations/model.js';
// Single embed config.
export const AttachmentEmbedConfigIdentifier = createIdentifier('AffineAttachmentEmbedConfigIdentifier');
export function AttachmentEmbedConfigExtension(configs = embedConfig) {
    return {
        setup: di => {
            configs.forEach(option => {
                di.addImpl(AttachmentEmbedConfigIdentifier(option.name), () => option);
            });
        },
    };
}
// A embed config map.
export const AttachmentEmbedConfigMapIdentifier = createIdentifier('AffineAttachmentEmbedConfigMapIdentifier');
export const AttachmentEmbedProvider = createIdentifier('AffineAttachmentEmbedProvider');
export class AttachmentEmbedService extends Extension {
    // 10MB
    static { this.MAX_EMBED_SIZE = 10 * 1024 * 1024; }
    get keys() {
        return this.configs.keys();
    }
    get values() {
        return this.configs.values();
    }
    constructor(configs) {
        super();
        this.configs = configs;
    }
    static setup(di) {
        di.addImpl(AttachmentEmbedConfigMapIdentifier, provider => provider.getAll(AttachmentEmbedConfigIdentifier));
        di.addImpl(AttachmentEmbedProvider, AttachmentEmbedService, [
            AttachmentEmbedConfigMapIdentifier,
        ]);
    }
    // Converts to embed view.
    convertTo(model, maxFileSize = AttachmentEmbedService.MAX_EMBED_SIZE) {
        const config = this.values.find(config => config.check(model, maxFileSize));
        if (!config || !config.action) {
            model.doc.updateBlock(model, { embed: true });
            return;
        }
        config.action(model)?.catch(console.error);
    }
    embedded(model, maxFileSize = AttachmentEmbedService.MAX_EMBED_SIZE) {
        return this.values.some(config => config.check(model, maxFileSize));
    }
    render(model, blobUrl, maxFileSize = AttachmentEmbedService.MAX_EMBED_SIZE) {
        if (!model.embed || !blobUrl)
            return;
        const config = this.values.find(config => config.check(model, maxFileSize));
        if (!config || !config.template) {
            console.error('No embed view template found!', model, model.type);
            return;
        }
        return config.template(model, blobUrl);
    }
}
const embedConfig = [
    {
        name: 'image',
        check: model => model.doc.schema.flavourSchemaMap.has('affine:image') &&
            model.type.startsWith('image/'),
        action: model => turnIntoImageBlock(model),
    },
    {
        name: 'pdf',
        check: (model, maxFileSize) => model.type === 'application/pdf' && model.size <= maxFileSize,
        template: (_, blobUrl) => {
            // More options: https://tinytip.co/tips/html-pdf-params/
            // https://chromium.googlesource.com/chromium/src/+/refs/tags/121.0.6153.1/chrome/browser/resources/pdf/open_pdf_params_parser.ts
            const parameters = '#toolbar=0';
            return html `<iframe
        style="width: 100%; color-scheme: auto;"
        height="480"
        src=${blobUrl + parameters}
        loading="lazy"
        scrolling="no"
        frameborder="no"
        allowTransparency
        allowfullscreen
        type="application/pdf"
      ></iframe>`;
        },
    },
    {
        name: 'video',
        check: (model, maxFileSize) => model.type.startsWith('video/') && model.size <= maxFileSize,
        template: (_, blobUrl) => html `<video width="100%;" height="480" controls src=${blobUrl}></video>`,
    },
    {
        name: 'audio',
        check: (model, maxFileSize) => model.type.startsWith('audio/') && model.size <= maxFileSize,
        template: (_, blobUrl) => html `<audio controls src=${blobUrl} style="margin: 4px;"></audio>`,
    },
];
/**
 * Turn the attachment block into an image block.
 */
export function turnIntoImageBlock(model) {
    if (!model.doc.schema.flavourSchemaMap.has('affine:image')) {
        console.error('The image flavour is not supported!');
        return;
    }
    const sourceId = model.sourceId;
    if (!sourceId)
        return;
    const { saveAttachmentData, getImageData } = withTempBlobData();
    saveAttachmentData(sourceId, { name: model.name });
    const imageConvertData = model.sourceId
        ? getImageData(model.sourceId)
        : undefined;
    const imageProp = {
        sourceId,
        caption: model.caption,
        size: model.size,
        ...imageConvertData,
    };
    transformModel(model, 'affine:image', imageProp);
}
//# sourceMappingURL=embed.js.map