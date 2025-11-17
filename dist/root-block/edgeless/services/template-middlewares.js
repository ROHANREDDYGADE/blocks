import { CommonUtils, sortIndex } from '@blocksuite/affine-block-surface';
import { assertExists, assertType, Bound } from '@blocksuite/global/utils';
export const replaceIdMiddleware = (job) => {
    const regeneratedIdMap = new Map();
    job.slots.beforeInsert.on(payload => {
        switch (payload.type) {
            case 'block':
                regenerateBlockId(payload.data);
                break;
        }
    });
    const regenerateBlockId = (data) => {
        const { blockJson } = data;
        const newId = regeneratedIdMap.has(blockJson.id)
            ? regeneratedIdMap.get(blockJson.id)
            : job.model.doc.collection.idGenerator();
        if (!regeneratedIdMap.has(blockJson.id)) {
            regeneratedIdMap.set(blockJson.id, newId);
        }
        blockJson.id = newId;
        data.parent = data.parent
            ? (regeneratedIdMap.get(data.parent) ?? data.parent)
            : undefined;
        if (blockJson.flavour === 'affine:surface-ref') {
            assertType(blockJson);
            blockJson.props['reference'] =
                regeneratedIdMap.get(blockJson.props['reference']) ?? '';
        }
        if (blockJson.flavour === 'affine:surface') {
            const elements = {};
            const defered = [];
            Object.entries(blockJson.props.elements).forEach(([id, val]) => {
                const newId = CommonUtils.generateElementId();
                regeneratedIdMap.set(id, newId);
                val.id = newId;
                elements[newId] = val;
                if (['connector', 'group'].includes(val['type'])) {
                    defered.push(newId);
                }
            });
            blockJson.children.forEach(block => {
                regeneratedIdMap.set(block.id, job.model.doc.collection.idGenerator());
            });
            defered.forEach(id => {
                const element = elements[id];
                switch (element['type']) {
                    case 'group':
                        {
                            const children = element['children'];
                            const newChildrenJson = {};
                            Object.entries(children.json).forEach(([key, val]) => {
                                newChildrenJson[regeneratedIdMap.get(key) ?? key] = val;
                            });
                            children.json = newChildrenJson;
                        }
                        break;
                    case 'connector':
                        {
                            const target = element['target'];
                            if (target.id) {
                                element['target'] = {
                                    ...target,
                                    id: regeneratedIdMap.get(target.id),
                                };
                            }
                            const source = element['source'];
                            if (source.id) {
                                element['source'] = {
                                    ...source,
                                    id: regeneratedIdMap.get(source.id),
                                };
                            }
                        }
                        break;
                }
            });
            blockJson.props.elements = elements;
        }
    };
};
export const createInsertPlaceMiddleware = (targetPlace) => {
    return (job) => {
        if (job.type !== 'template')
            return;
        let templateBound = null;
        let offset;
        job.slots.beforeInsert.on(blockData => {
            if (blockData.type === 'template') {
                templateBound = blockData.bound;
                if (templateBound) {
                    offset = {
                        x: targetPlace.x - templateBound.x,
                        y: targetPlace.y - templateBound.y,
                    };
                    templateBound.x = targetPlace.x;
                    templateBound.y = targetPlace.y;
                }
            }
            else {
                if (templateBound && offset)
                    changePosition(blockData.data.blockJson);
            }
        });
        const ignoreType = ['group', 'connector'];
        const changePosition = (blockJson) => {
            assertExists(templateBound);
            if (blockJson.props.xywh) {
                const bound = Bound.deserialize(blockJson.props['xywh']);
                blockJson.props['xywh'] = new Bound(bound.x + offset.x, bound.y + offset.y, bound.w, bound.h).serialize();
            }
            if (blockJson.flavour === 'affine:surface') {
                Object.entries(blockJson.props.elements).forEach(([_, val]) => {
                    const type = val['type'];
                    if (ignoreType.includes(type) && val['xywh']) {
                        delete val['xywh'];
                    }
                    if (val['xywh']) {
                        const bound = Bound.deserialize(val['xywh']);
                        val['xywh'] = new Bound(bound.x + offset.x, bound.y + offset.y, bound.w, bound.h).serialize();
                    }
                    if (type === 'connector') {
                        ['target', 'source'].forEach(prop => {
                            const propVal = val[prop];
                            assertType(propVal);
                            if (propVal['id'] || !propVal['position'])
                                return;
                            const pos = propVal['position'];
                            propVal['position'] = [pos[0] + offset.x, pos[1] + offset.y];
                        });
                    }
                });
            }
        };
    };
};
export const createStickerMiddleware = (center, getIndex) => {
    return (job) => {
        job.slots.beforeInsert.on(blockData => {
            if (blockData.type === 'block') {
                changeInserPosition(blockData.data.blockJson);
            }
        });
        const changeInserPosition = (blockJson) => {
            if (blockJson.flavour === 'affine:image' && blockJson.props.xywh) {
                const bound = Bound.deserialize(blockJson.props['xywh']);
                blockJson.props['xywh'] = new Bound(center.x - bound.w / 2, center.y - bound.h / 2, bound.w, bound.h).serialize();
                blockJson.props.index = getIndex();
            }
        };
    };
};
export const createRegenerateIndexMiddleware = (generateIndex) => {
    return (job) => {
        job.slots.beforeInsert.on(blockData => {
            if (blockData.type === 'template') {
                generateIndexMap();
            }
            if (blockData.type === 'block') {
                resetIndex(blockData.data.blockJson);
            }
        });
        const indexMap = new Map();
        const generateIndexMap = () => {
            const indexList = [];
            const frameList = [];
            const groupIndexMap = new Map();
            job.walk(block => {
                if (block.props.index) {
                    if (block.flavour === 'affine:frame') {
                        frameList.push({
                            id: block.id,
                            index: block.props.index,
                        });
                    }
                    else {
                        indexList.push({
                            id: block.id,
                            index: block.props.index,
                            flavour: block.flavour,
                        });
                    }
                }
                if (block.flavour === 'affine:surface') {
                    Object.entries(block.props.elements).forEach(([_, element]) => {
                        indexList.push({
                            index: element['index'],
                            flavour: element['type'],
                            id: element['id'],
                            element: true,
                        });
                        if (element['type'] === 'group') {
                            const children = element['children'];
                            const groupIndex = {
                                index: element['index'],
                                id: element['id'],
                            };
                            Object.keys(children.json).forEach(key => {
                                groupIndexMap.set(key, groupIndex);
                            });
                        }
                    });
                }
            });
            indexList.sort((a, b) => sortIndex(a, b, groupIndexMap));
            frameList.sort((a, b) => sortIndex(a, b, groupIndexMap));
            frameList.forEach(index => {
                indexMap.set(index.id, generateIndex());
            });
            indexList.forEach(index => {
                indexMap.set(index.id, generateIndex());
            });
        };
        const resetIndex = (blockJson) => {
            if (blockJson.props.index) {
                blockJson.props.index =
                    indexMap.get(blockJson.id) ?? blockJson.props.index;
            }
            if (blockJson.flavour === 'affine:surface') {
                Object.entries(blockJson.props.elements).forEach(([_, element]) => {
                    if (element['index']) {
                        element['index'] = indexMap.get(element['id']);
                    }
                });
            }
        };
    };
};
//# sourceMappingURL=template-middlewares.js.map