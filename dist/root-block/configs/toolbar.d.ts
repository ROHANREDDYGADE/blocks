import type { MenuItemGroup } from '@blocksuite/affine-components/toolbar';
import type { BlockStdScope, EditorHost } from '@blocksuite/block-std';
import type { GfxModel } from '@blocksuite/block-std/gfx';
import type { BlockModel, Doc } from '@blocksuite/store';
export declare abstract class MenuContext {
    abstract get doc(): Doc;
    get firstElement(): GfxModel | null;
    abstract get host(): EditorHost;
    abstract get selectedBlockModels(): BlockModel[];
    abstract get std(): BlockStdScope;
    close(): void;
    isElement(): boolean;
    abstract isEmpty(): boolean;
    abstract isMultiple(): boolean;
    abstract isSingle(): boolean;
}
export interface ToolbarMoreMenuConfig {
    configure: <T extends MenuContext>(groups: MenuItemGroup<T>[]) => MenuItemGroup<T>[];
}
export declare function getMoreMenuConfig(std: BlockStdScope): ToolbarMoreMenuConfig;
//# sourceMappingURL=toolbar.d.ts.map