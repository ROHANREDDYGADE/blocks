import type { AttachmentBlockModel } from '@blocksuite/affine-model';
import type { ExtensionType } from '@blocksuite/block-std';
import type { Container } from '@blocksuite/global/di';
import type { TemplateResult } from 'lit';
import { Extension } from '@blocksuite/block-std';
export type AttachmentEmbedConfig = {
    name: string;
    /**
     * Check if the attachment can be turned into embed view.
     */
    check: (model: AttachmentBlockModel, maxFileSize: number) => boolean;
    /**
     * The action will be executed when the 「Turn into embed view」 button is clicked.
     */
    action?: (model: AttachmentBlockModel) => Promise<void> | void;
    /**
     * The template will be used to render the embed view.
     */
    template?: (model: AttachmentBlockModel, blobUrl: string) => TemplateResult;
};
export declare const AttachmentEmbedConfigIdentifier: import("@blocksuite/global/di").ServiceIdentifier<AttachmentEmbedConfig> & ((variant: import("@blocksuite/global/di").ServiceVariant) => import("@blocksuite/global/di").ServiceIdentifier<AttachmentEmbedConfig>);
export declare function AttachmentEmbedConfigExtension(configs?: AttachmentEmbedConfig[]): ExtensionType;
export declare const AttachmentEmbedConfigMapIdentifier: import("@blocksuite/global/di").ServiceIdentifier<Map<string, AttachmentEmbedConfig>> & ((variant: import("@blocksuite/global/di").ServiceVariant) => import("@blocksuite/global/di").ServiceIdentifier<Map<string, AttachmentEmbedConfig>>);
export declare const AttachmentEmbedProvider: import("@blocksuite/global/di").ServiceIdentifier<AttachmentEmbedService> & ((variant: import("@blocksuite/global/di").ServiceVariant) => import("@blocksuite/global/di").ServiceIdentifier<AttachmentEmbedService>);
export declare class AttachmentEmbedService extends Extension {
    private configs;
    static MAX_EMBED_SIZE: number;
    get keys(): MapIterator<string>;
    get values(): MapIterator<AttachmentEmbedConfig>;
    constructor(configs: Map<string, AttachmentEmbedConfig>);
    static setup(di: Container): void;
    convertTo(model: AttachmentBlockModel, maxFileSize?: number): void;
    embedded(model: AttachmentBlockModel, maxFileSize?: number): boolean;
    render(model: AttachmentBlockModel, blobUrl?: string, maxFileSize?: number): TemplateResult | undefined;
}
/**
 * Turn the attachment block into an image block.
 */
export declare function turnIntoImageBlock(model: AttachmentBlockModel): void;
//# sourceMappingURL=embed.d.ts.map