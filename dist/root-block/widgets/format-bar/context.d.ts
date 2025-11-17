import type { AffineFormatBarWidget } from './format-bar.js';
import { MenuContext } from '../../configs/toolbar.js';
export declare class FormatBarContext extends MenuContext {
    toolbar: AffineFormatBarWidget;
    get doc(): import("@blocksuite/store").Doc;
    get host(): import("@blocksuite/block-std").EditorHost;
    get selectedBlockModels(): import("@blocksuite/store").BlockModel<object, object & {}>[];
    get std(): import("@blocksuite/block-std").BlockStdScope;
    constructor(toolbar: AffineFormatBarWidget);
    isEmpty(): boolean;
    isMultiple(): boolean;
    isSingle(): boolean;
}
//# sourceMappingURL=context.d.ts.map