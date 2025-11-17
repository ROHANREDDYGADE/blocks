import { assertExists, Bound } from '@blocksuite/global/utils';
import { ExportManager } from '../../../_common/export-manager/export-manager.js';
import { isTopLevelBlock } from '../../../root-block/edgeless/utils/query.js';
export const edgelessToBlob = async (host, options) => {
    const { edgelessElement } = options;
    const exportManager = host.std.get(ExportManager);
    const bound = Bound.deserialize(edgelessElement.xywh);
    const isBlock = isTopLevelBlock(edgelessElement);
    return exportManager
        .edgelessToCanvas(options.surfaceRenderer, bound, undefined, isBlock ? [edgelessElement] : undefined, isBlock ? undefined : [edgelessElement], { zoom: options.surfaceRenderer.viewport.zoom })
        .then(canvas => {
        assertExists(canvas);
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => (blob ? resolve(blob) : reject(null)), 'image/png');
        });
    });
};
export const writeImageBlobToClipboard = async (blob) => {
    // @ts-ignore
    if (window.apis?.clipboard?.copyAsImageFromString) {
        // @ts-ignore
        await window.apis.clipboard?.copyAsImageFromString(blob);
    }
    else {
        await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
    }
};
//# sourceMappingURL=utils.js.map