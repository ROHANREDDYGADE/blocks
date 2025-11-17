import { RootBlockSchema } from '@blocksuite/affine-model';
import { BlockService } from '@blocksuite/block-std';
import { FileDropManager, } from '../_common/components/file-drop-manager.js';
import { HtmlTransformer, MarkdownTransformer, ZipTransformer, } from '../_common/transformers/index.js';
export class RootService extends BlockService {
    constructor() {
        super(...arguments);
        this._fileDropOptions = {
            flavour: this.flavour,
        };
        this.fileDropManager = new FileDropManager(this, this._fileDropOptions);
        this.transformers = {
            markdown: MarkdownTransformer,
            html: HtmlTransformer,
            zip: ZipTransformer,
        };
    }
    static { this.flavour = RootBlockSchema.model.flavour; }
    get selectedBlocks() {
        let result = [];
        this.std.command
            .chain()
            .tryAll(chain => [
            chain.getTextSelection(),
            chain.getImageSelections(),
            chain.getBlockSelections(),
        ])
            .getSelectedBlocks()
            .inline(({ selectedBlocks }) => {
            if (!selectedBlocks)
                return;
            result = selectedBlocks;
        })
            .run();
        return result;
    }
    get selectedModels() {
        return this.selectedBlocks.map(block => block.model);
    }
    get viewportElement() {
        const rootId = this.std.doc.root?.id;
        if (!rootId)
            return null;
        const rootComponent = this.std.view.getBlock(rootId);
        if (!rootComponent)
            return null;
        const viewportElement = rootComponent.viewportElement;
        return viewportElement;
    }
    mounted() {
        super.mounted();
        this.disposables.addFromEvent(this.host, 'dragover', this.fileDropManager.onDragOver);
        this.disposables.addFromEvent(this.host, 'dragleave', this.fileDropManager.onDragLeave);
        this.disposables.add(this.std.event.add('pointerDown', ctx => {
            const state = ctx.get('pointerState');
            state.raw.stopPropagation();
        }));
    }
}
//# sourceMappingURL=root-service.js.map