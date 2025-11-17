import { CanvasElementType } from '@blocksuite/affine-block-surface';
import { TextElementModel } from '@blocksuite/affine-model';
import { TelemetryProvider } from '@blocksuite/affine-shared/services';
import { assertInstanceOf, Bound } from '@blocksuite/global/utils';
import { DocCollection } from '@blocksuite/store';
import { mountTextElementEditor } from '../../../utils/text.js';
const unitMap = { x: 'px', y: 'px', r: 'deg', s: '', z: '', o: '' };
export const textConfig = {
    default: { x: -20, y: -8, r: 7.74, s: 0.92, z: 2 },
    active: { x: -22, y: -9, r: -8, s: 0.92 },
    hover: { x: -22, y: -9, r: -8, s: 1, z: 3 },
    next: { x: -22, y: 64, r: 0 },
};
export const mindmapConfig = {
    default: { x: 4, y: -4, s: 1, z: 1, r: -7 },
    active: { x: 11, y: -14, r: 9, s: 1 },
    hover: { x: 11, y: -14, r: 9, s: 1.16, z: 3 },
    next: { y: 64, r: 0 },
};
export const getMindmapRender = (mindmapStyle) => (bound, edgelessService) => {
    const [x, y, _, h] = bound.toXYWH();
    const rootW = 145;
    const rootH = 50;
    const nodeW = 80;
    const nodeH = 35;
    const centerVertical = y + h / 2;
    const rootX = x;
    const rootY = centerVertical - rootH / 2;
    const root = {
        children: [],
        text: 'Mind Map',
        xywh: `[${rootX},${rootY},${rootW},${rootH}]`,
    };
    for (let i = 0; i < 3; i++) {
        const nodeX = x + rootW + 300;
        const nodeY = centerVertical - nodeH / 2 + (i - 1) * 50;
        root.children.push({
            children: [],
            text: 'Text',
            xywh: `[${nodeX},${nodeY},${nodeW},${nodeH}]`,
        });
    }
    const mindmapId = edgelessService.addElement('mindmap', {
        style: mindmapStyle,
        children: root,
    });
    edgelessService.std
        .getOptional(TelemetryProvider)
        ?.track('CanvasElementAdded', {
        control: 'toolbar:dnd', // for now we use toolbar:dnd for all mindmap creation here
        page: 'whiteboard editor',
        module: 'toolbar',
        segment: 'toolbar',
        type: 'mindmap',
    });
    return mindmapId;
};
export const textRender = (bound, service, edgeless) => {
    const vCenter = bound.y + bound.h / 2;
    const w = 100;
    const h = 32;
    const flag = edgeless.doc.awarenessStore.getFlag('enable_edgeless_text');
    let id;
    if (flag) {
        const { textId } = edgeless.std.command.exec('insertEdgelessText', {
            x: bound.x,
            y: vCenter - h / 2,
        });
        id = textId;
    }
    else {
        id = service.addElement(CanvasElementType.TEXT, {
            xywh: new Bound(bound.x, vCenter - h / 2, w, h).serialize(),
            text: new DocCollection.Y.Text(),
        });
        edgeless.doc.captureSync();
        const textElement = edgeless.service.getElementById(id);
        assertInstanceOf(textElement, TextElementModel);
        mountTextElementEditor(textElement, edgeless);
    }
    service.std.getOptional(TelemetryProvider)?.track('CanvasElementAdded', {
        control: 'toolbar:dnd',
        page: 'whiteboard editor',
        module: 'toolbar',
        segment: 'toolbar',
        type: 'text',
    });
    return id;
};
const toolStyle2StyleObj = (state, style = {}) => {
    const styleObj = {};
    for (const [key, value] of Object.entries(style)) {
        styleObj[`--${state}-${key}`] = `${value}${unitMap[key]}`;
    }
    return styleObj;
};
export const toolConfig2StyleObj = (config) => {
    const styleObj = {};
    for (const [state, style] of Object.entries(config)) {
        Object.assign(styleObj, toolStyle2StyleObj(state, {
            ...config.default,
            ...style,
        }));
    }
    return styleObj;
};
//# sourceMappingURL=basket-elements.js.map