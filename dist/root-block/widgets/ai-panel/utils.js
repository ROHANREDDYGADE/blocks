import { isInsidePageEditor } from '@blocksuite/affine-shared/utils';
export function filterAIItemGroup(host, configs) {
    const editorMode = isInsidePageEditor(host) ? 'page' : 'edgeless';
    return configs
        .map(group => ({
        ...group,
        items: group.items.filter(item => item.showWhen
            ? item.showWhen(host.command.chain(), editorMode, host)
            : true),
    }))
        .filter(group => group.items.length > 0);
}
//# sourceMappingURL=utils.js.map