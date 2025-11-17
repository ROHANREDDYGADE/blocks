import type { MenuItemGroup } from '@blocksuite/affine-components/toolbar';
import { LitElement } from 'lit';
import type { EdgelessRootBlockComponent } from '../../../edgeless/edgeless-root-block.js';
import { ElementToolbarMoreMenuContext } from './context.js';
declare const EdgelessMoreButton_base: typeof LitElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class EdgelessMoreButton extends EdgelessMoreButton_base {
    render(): import("lit-html").TemplateResult<1>;
    accessor edgeless: EdgelessRootBlockComponent;
    accessor elements: BlockSuite.EdgelessModel[];
    accessor groups: MenuItemGroup<ElementToolbarMoreMenuContext>[];
    accessor vertical: boolean;
}
export {};
//# sourceMappingURL=button.d.ts.map