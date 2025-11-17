import { isInsideBlockByFlavour } from '@blocksuite/affine-shared/utils';
import { assertType } from '@blocksuite/global/utils';
import { slashMenuToolTips } from './tooltips/index.js';
export function isGroupDivider(item) {
    return 'groupName' in item;
}
export function notGroupDivider(item) {
    return !isGroupDivider(item);
}
export function isActionItem(item) {
    return 'action' in item;
}
export function isSubMenuItem(item) {
    return 'subMenu' in item;
}
export function isMenuItemGenerator(item) {
    return typeof item === 'function';
}
export function slashItemClassName(item) {
    const name = isGroupDivider(item) ? item.groupName : item.name;
    return name.split(' ').join('-').toLocaleLowerCase();
}
export function filterEnabledSlashMenuItems(items, context) {
    const result = items
        .map(item => (isMenuItemGenerator(item) ? item(context) : item))
        .flat()
        .filter(item => (item.showWhen ? item.showWhen(context) : true))
        .map(item => {
        if (isSubMenuItem(item)) {
            return {
                ...item,
                subMenu: filterEnabledSlashMenuItems(item.subMenu, context),
            };
        }
        else {
            return { ...item };
        }
    });
    return result;
}
export function getFirstNotDividerItem(items) {
    const firstItem = items.find(item => !isGroupDivider(item));
    assertType(firstItem);
    return firstItem ?? null;
}
export function insideEdgelessText(model) {
    return isInsideBlockByFlavour(model.doc, model, 'affine:edgeless-text');
}
export function tryRemoveEmptyLine(model) {
    if (model.text?.length === 0) {
        model.doc.deleteBlock(model);
    }
}
export function createConversionItem(config) {
    const { name, description, icon, flavour, type } = config;
    return {
        name,
        description,
        icon,
        tooltip: slashMenuToolTips[name],
        showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has(flavour),
        action: ({ rootComponent }) => {
            rootComponent.std.command
                .chain()
                .updateBlockType({
                flavour,
                props: { type },
            })
                .run();
        },
    };
}
export function createTextFormatItem(config) {
    const { name, icon, id, action } = config;
    return {
        name,
        icon,
        tooltip: slashMenuToolTips[name],
        action: ({ rootComponent, model }) => {
            const { std, host } = rootComponent;
            if (model.text?.length !== 0) {
                std.command
                    .chain()
                    .formatBlock({
                    blockSelections: [
                        std.selection.create('block', {
                            blockId: model.id,
                        }),
                    ],
                    styles: { [id]: true },
                })
                    .run();
            }
            else {
                // like format bar when the line is empty
                action(host);
            }
        },
    };
}
//# sourceMappingURL=utils.js.map