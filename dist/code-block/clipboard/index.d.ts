import { type BlockComponent, type UIEventHandler } from '@blocksuite/block-std';
import { DisposableGroup } from '@blocksuite/global/utils';
export declare class CodeClipboardController {
    private _clipboard;
    protected _disposables: DisposableGroup;
    protected _init: () => void;
    host: BlockComponent;
    onPagePaste: UIEventHandler;
    private get _std();
    constructor(host: BlockComponent);
    hostConnected(): void;
    hostDisconnected(): void;
}
//# sourceMappingURL=index.d.ts.map