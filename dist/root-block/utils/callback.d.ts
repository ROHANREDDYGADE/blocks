import type { RichText } from '@blocksuite/affine-components/rich-text';
import type { BlockComponent, EditorHost } from '@blocksuite/block-std';
import type { BlockModel } from '@blocksuite/store';
export declare function onModelTextUpdated(editorHost: EditorHost, model: BlockModel, callback?: (text: RichText) => void): Promise<void>;
export declare function onModelElementUpdated(editorHost: EditorHost, model: BlockModel, callback: (block: BlockComponent) => void): Promise<void>;
//# sourceMappingURL=callback.d.ts.map