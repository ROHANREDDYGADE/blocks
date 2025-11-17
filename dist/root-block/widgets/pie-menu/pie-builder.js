import { assertExists } from '@blocksuite/global/utils';
import { ColorUnit } from '../../edgeless/components/panel/color-panel.js';
import { PieManager } from './pie-manager.js';
import { calcNodeAngles, calcNodeWedges, isNodeWithChildren } from './utils.js';
export class PieMenuBuilder {
    constructor(base) {
        this._schema = null;
        this._stack = [];
        this._schema = {
            ...base,
            root: {
                type: 'root',
                children: [],
                label: base.label,
                icon: base.icon,
                disabled: false,
            },
        };
        this._stack.push(this._schema.root);
    }
    _computeAngles(node) {
        if (!isNodeWithChildren(node) ||
            !node.children ||
            node.children.length === 0) {
            return;
        }
        const parentAngle = node.angle == undefined ? undefined : (node.angle + 180) % 360;
        const angles = calcNodeAngles(node.children, parentAngle);
        const wedges = calcNodeWedges(angles, parentAngle);
        for (let i = 0; i < node.children.length; ++i) {
            const child = node.children[i];
            child.angle = angles[i];
            child.startAngle = wedges[i].start;
            child.endAngle = wedges[i].end;
            this._computeAngles(child);
        }
    }
    _currentNode() {
        const node = this._stack[this._stack.length - 1];
        assertExists(node, 'No node active');
        return node;
    }
    beginSubmenu(node, action) {
        const curNode = this._currentNode();
        const submenuNode = {
            openOnHover: true,
            ...node,
            type: 'submenu',
            role: action ? 'default' : 'command',
            action,
            children: [],
        };
        if (submenuNode.action !== undefined)
            submenuNode.timeoutOverride =
                PieManager.settings.EXPANDABLE_ACTION_NODE_TIMEOUT;
        if (isNodeWithChildren(curNode)) {
            curNode.children.push(submenuNode);
        }
        this._stack.push(submenuNode);
        return this;
    }
    build() {
        const schema = this._schema;
        assertExists(schema);
        this._computeAngles(schema.root);
        this._schema = null;
        this._stack = [];
        return schema;
    }
    colorPicker(props) {
        const hollow = props.hollow ?? false;
        const icon = (ctx) => {
            const color = props.active(ctx);
            return ColorUnit(color, { hollowCircle: hollow });
        };
        const colorPickerNode = {
            type: 'submenu',
            icon,
            label: props.label,
            role: 'color-picker',
            openOnHover: props.openOnHover ?? true,
            children: props.colors.map(({ color }) => ({
                icon: () => ColorUnit(color, { hollowCircle: hollow }),
                type: 'color',
                hollowCircle: hollow,
                label: color,
                color: color,
                onChange: props.onChange,
            })),
        };
        const curNode = this._currentNode();
        if (isNodeWithChildren(curNode)) {
            curNode.children.push(colorPickerNode);
        }
    }
    command(node) {
        const curNode = this._currentNode();
        const actionNode = { ...node, type: 'command' };
        if (isNodeWithChildren(curNode)) {
            curNode.children.push(actionNode);
        }
        return this;
    }
    endSubmenu() {
        if (this._stack.length === 1)
            throw new Error('Cant end submenu already on the root node');
        this._stack.pop();
        return this;
    }
    expandableCommand(node) {
        const { icon, label } = node;
        this.beginSubmenu({ icon, label }, node.action);
        node.submenus(this);
        this.endSubmenu();
    }
    reset(base) {
        this._stack = [];
        this._schema = {
            ...base,
            root: { type: 'root', children: [], label: base.label },
        };
        this._stack.push(this._schema.root);
    }
}
//# sourceMappingURL=pie-builder.js.map