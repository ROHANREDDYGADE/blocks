import type { ActionFunction, PieColorNodeModel, PieCommandNodeModel, PieMenuContext, PieMenuSchema, PieNodeModel, PieSubmenuNodeModel } from './base.js';
export interface IPieColorPickerNodeProps {
    label: string;
    active: (ctx: PieMenuContext) => string;
    onChange: PieColorNodeModel['onChange'];
    openOnHover?: PieSubmenuNodeModel['openOnHover'];
    hollow?: boolean;
    colors: {
        color: string;
    }[];
}
type PieBuilderConstructorProps = Omit<PieMenuSchema, 'root' | 'angle' | 'startAngle' | 'endAngle' | 'disabled'> & {
    icon: PieNodeModel['icon'];
};
export declare class PieMenuBuilder {
    private _schema;
    private _stack;
    constructor(base: PieBuilderConstructorProps);
    private _computeAngles;
    private _currentNode;
    beginSubmenu(node: Omit<PieSubmenuNodeModel, 'type' | 'children' | 'role'>, action?: PieSubmenuNodeModel['action']): this;
    build(): PieMenuSchema;
    colorPicker(props: IPieColorPickerNodeProps): void;
    command(node: Omit<PieCommandNodeModel, 'type'>): this;
    endSubmenu(): this;
    expandableCommand(node: Omit<PieSubmenuNodeModel, 'type' | 'children' | 'role'> & {
        action: ActionFunction;
        submenus: (pie: PieMenuBuilder) => void;
    }): void;
    reset(base: PieBuilderConstructorProps): void;
}
export {};
//# sourceMappingURL=pie-builder.d.ts.map