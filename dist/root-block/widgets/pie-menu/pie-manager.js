import { assertExists } from '@blocksuite/global/utils';
import { Slot } from '@blocksuite/store';
/**
 *   Static class for managing pie menus
 */
export class PieManager {
    static { this.registeredSchemas = {}; }
    static { this.schemas = new Set(); }
    static { this.settings = {
        /**
         * Specifies the distance between the root-node and the child-nodes
         */
        PIE_RADIUS: 150,
        /**
         * After the specified time if trigger is released the menu will select the currently hovered node\
         * If released before the time the pie menu will stay open and you can select with mouse or the trigger key\
         * Time is in `milliseconds`
         * @default 150
         */
        SELECT_ON_RELEASE_TIMEOUT: 150,
        /**
         * Distance from the center of the active node to start focusing a child node
         */
        ACTIVATE_THRESHOLD_MIN: 60,
        /**
         * Time delay to open submenu after hovering a submenu node
         */
        SUBMENU_OPEN_TIMEOUT: 200,
        EXPANDABLE_ACTION_NODE_TIMEOUT: 300,
    }; }
    static { this.slots = {
        open: new Slot(),
    }; }
    static _getSchema(id) {
        const schema = this.registeredSchemas[id];
        assertExists(schema);
        return schema;
    }
    static _register(schema) {
        const { id } = schema;
        if (this.registeredSchemas[id]) {
            return;
        }
        this.registeredSchemas[id] = schema;
    }
    static _setupTriggers(rootComponent) {
        Object.values(this.registeredSchemas).forEach(schema => {
            const { trigger } = schema;
            rootComponent.handleEvent('keyDown', ctx => {
                const ev = ctx.get('keyboardState');
                if (trigger({ keyEvent: ev.raw, rootComponent }) && !ev.raw.repeat) {
                    this.open(schema.id);
                }
            }, { global: true });
        });
    }
    static add(schema) {
        return this.schemas.add(schema);
    }
    static dispose() {
        this.registeredSchemas = {};
    }
    static open(id) {
        this.slots.open.emit(this._getSchema(id));
    }
    static remove(schema) {
        return this.schemas.delete(schema);
    }
    static setup({ rootComponent, }) {
        this.schemas.forEach(schema => this._register(schema));
        this._setupTriggers(rootComponent);
    }
}
//# sourceMappingURL=pie-manager.js.map