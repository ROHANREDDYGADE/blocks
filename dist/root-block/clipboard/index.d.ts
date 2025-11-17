import type { BlockComponent, UIEventHandler } from '@blocksuite/block-std';
import type { BlockSnapshot, Doc } from '@blocksuite/store';
import { DisposableGroup } from '@blocksuite/global/utils';
import { copyMiddleware, pasteMiddleware } from './middlewares/index.js';
export declare class PageClipboard {
    private _copySelected;
    protected _disposables: DisposableGroup;
    protected _init: () => void;
    host: BlockComponent;
    onBlockSnapshotPaste: (snapshot: BlockSnapshot, doc: Doc, parent?: string, index?: number) => Promise<string | null>;
    onPageCopy: UIEventHandler;
    onPageCut: UIEventHandler;
    onPagePaste: UIEventHandler;
    private get _std();
    constructor(host: BlockComponent);
    hostConnected(): void;
    hostDisconnected(): void;
}
export { copyMiddleware, pasteMiddleware };
//# sourceMappingURL=index.d.ts.map