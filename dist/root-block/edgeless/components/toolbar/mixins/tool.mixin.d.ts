import type { ColorScheme } from '@blocksuite/affine-model';
import type { GfxToolsFullOptionValue, ToolController } from '@blocksuite/block-std/gfx';
import type { LitElement } from 'lit';
import { type Constructor, type DisposableClass } from '@blocksuite/global/utils';
import type { EdgelessRootBlockComponent } from '../../../edgeless-root-block.js';
import type { EdgelessToolbarWidget } from '../edgeless-toolbar.js';
import { createPopper, type MenuPopper } from '../common/create-popper.js';
import { type EdgelessToolbarSlots } from '../context.js';
export declare abstract class EdgelessToolbarToolClass extends DisposableClass {
    active: boolean;
    createPopper: typeof createPopper;
    edgeless: EdgelessRootBlockComponent;
    edgelessTool: GfxToolsFullOptionValue;
    enableActiveBackground?: boolean;
    popper: MenuPopper<HTMLElement> | null;
    setEdgelessTool: ToolController['setTool'];
    theme: ColorScheme;
    toolbarContainer: HTMLElement | null;
    toolbarSlots: EdgelessToolbarSlots;
    /**
     * @return true if operation was successful
     */
    tryDisposePopper: () => boolean;
    abstract type: GfxToolsFullOptionValue['type'] | GfxToolsFullOptionValue['type'][];
    accessor toolbar: EdgelessToolbarWidget;
}
export declare const EdgelessToolbarToolMixin: <T extends Constructor<LitElement>>(SuperClass: T) => T & Constructor<EdgelessToolbarToolClass>;
//# sourceMappingURL=tool.mixin.d.ts.map