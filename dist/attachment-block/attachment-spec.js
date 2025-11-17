import { BlockViewExtension, FlavourExtension, } from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';
import { AttachmentBlockService, AttachmentDragHandleOption, } from './attachment-service.js';
import { AttachmentEmbedConfigExtension, AttachmentEmbedService, } from './embed.js';
export const AttachmentBlockSpec = [
    FlavourExtension('affine:attachment'),
    AttachmentBlockService,
    BlockViewExtension('affine:attachment', model => {
        return model.parent?.flavour === 'affine:surface'
            ? literal `affine-edgeless-attachment`
            : literal `affine-attachment`;
    }),
    AttachmentDragHandleOption,
    AttachmentEmbedConfigExtension(),
    AttachmentEmbedService,
];
//# sourceMappingURL=attachment-spec.js.map