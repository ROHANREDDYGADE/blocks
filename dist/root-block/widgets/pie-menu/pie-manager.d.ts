import { Slot } from '@blocksuite/store';
import type { EdgelessRootBlockComponent } from '../../edgeless/edgeless-root-block.js';
import type { PieMenuId } from '../../types.js';
import type { PieMenuSchema } from './base.js';
/**
 *   Static class for managing pie menus
 */
export declare class PieManager {
    private static registeredSchemas;
    private static schemas;
    static settings: {
        /**
         * Specifies the distance between the root-node and the child-nodes
         */
        PIE_RADIUS: number;
        /**
         * After the specified time if trigger is released the menu will select the currently hovered node\
         * If released before the time the pie menu will stay open and you can select with mouse or the trigger key\
         * Time is in `milliseconds`
         * @default 150
         */
        SELECT_ON_RELEASE_TIMEOUT: number;
        /**
         * Distance from the center of the active node to start focusing a child node
         */
        ACTIVATE_THRESHOLD_MIN: number;
        /**
         * Time delay to open submenu after hovering a submenu node
         */
        SUBMENU_OPEN_TIMEOUT: number;
        EXPANDABLE_ACTION_NODE_TIMEOUT: number;
    };
    static slots: {
        open: Slot<PieMenuSchema>;
    };
    private static _getSchema;
    private static _register;
    private static _setupTriggers;
    static add(schema: PieMenuSchema): Set<PieMenuSchema>;
    static dispose(): void;
    static open(id: PieMenuId): void;
    static remove(schema: PieMenuSchema): boolean;
    static setup({ rootComponent, }: {
        rootComponent: EdgelessRootBlockComponent;
    }): void;
}
//# sourceMappingURL=pie-manager.d.ts.map