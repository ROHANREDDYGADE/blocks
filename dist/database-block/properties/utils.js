import { Text } from '@blocksuite/store';
export const toYText = (text) => {
    if (text instanceof Text) {
        return text.yText;
    }
    return text;
};
//# sourceMappingURL=utils.js.map