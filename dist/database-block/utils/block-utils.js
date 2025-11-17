import { arrayMove, insertPositionToIndex, } from '@blocksuite/affine-shared/utils';
export function addProperty(model, position, column) {
    const id = column.id ?? model.doc.generateBlockId();
    if (model.columns.some(v => v.id === id)) {
        return id;
    }
    model.doc.transact(() => {
        const col = {
            ...column,
            id,
        };
        model.columns.splice(insertPositionToIndex(position, model.columns), 0, col);
    });
    return id;
}
export function applyCellsUpdate(model) {
    model.doc.updateBlock(model, {
        cells: model.cells,
    });
}
export function applyPropertyUpdate(model) {
    model.doc.updateBlock(model, {
        columns: model.columns,
    });
}
export function applyViewsUpdate(model) {
    model.doc.updateBlock(model, {
        views: model.views,
    });
}
export function copyCellsByProperty(model, fromId, toId) {
    model.doc.transact(() => {
        Object.keys(model.cells).forEach(rowId => {
            const cell = model.cells[rowId][fromId];
            if (cell) {
                model.cells[rowId][toId] = {
                    ...cell,
                    columnId: toId,
                };
            }
        });
    });
}
export function deleteColumn(model, columnId) {
    const index = findPropertyIndex(model, columnId);
    if (index < 0)
        return;
    model.doc.transact(() => {
        model.columns.splice(index, 1);
    });
}
export function deleteRows(model, rowIds) {
    model.doc.transact(() => {
        for (const rowId of rowIds) {
            delete model.cells[rowId];
        }
    });
}
export function deleteView(model, id) {
    model.doc.captureSync();
    model.doc.transact(() => {
        model.views = model.views.filter(v => v.id !== id);
    });
}
export function duplicateView(model, id) {
    const newId = model.doc.generateBlockId();
    model.doc.transact(() => {
        const index = model.views.findIndex(v => v.id === id);
        const view = model.views[index];
        if (view) {
            model.views.splice(index + 1, 0, JSON.parse(JSON.stringify({ ...view, id: newId })));
        }
    });
    return newId;
}
export function findPropertyIndex(model, id) {
    return model.columns.findIndex(v => v.id === id);
}
export function getCell(model, rowId, columnId) {
    if (columnId === 'title') {
        return {
            columnId: 'title',
            value: rowId,
        };
    }
    const yRow = model.cells$.value[rowId];
    const yCell = yRow?.[columnId] ?? null;
    if (!yCell)
        return null;
    return {
        columnId: yCell.columnId,
        value: yCell.value,
    };
}
export function getProperty(model, id) {
    return model.columns.find(v => v.id === id);
}
export function moveViewTo(model, id, position) {
    model.doc.transact(() => {
        model.views = arrayMove(model.views, v => v.id === id, arr => insertPositionToIndex(position, arr));
    });
    applyViewsUpdate(model);
}
export function updateCell(model, rowId, cell) {
    const hasRow = rowId in model.cells;
    if (!hasRow) {
        model.cells[rowId] = Object.create(null);
    }
    model.doc.transact(() => {
        model.cells[rowId][cell.columnId] = {
            columnId: cell.columnId,
            value: cell.value,
        };
    });
}
export function updateCells(model, columnId, cells) {
    model.doc.transact(() => {
        Object.entries(cells).forEach(([rowId, value]) => {
            if (!model.cells[rowId]) {
                model.cells[rowId] = Object.create(null);
            }
            model.cells[rowId][columnId] = {
                columnId,
                value,
            };
        });
    });
}
export function updateProperty(model, id, updater) {
    const index = model.columns.findIndex(v => v.id === id);
    if (index == null) {
        return;
    }
    model.doc.transact(() => {
        const column = model.columns[index];
        const result = updater(column);
        model.columns[index] = { ...column, ...result };
    });
    return id;
}
export const updateView = (model, id, update) => {
    model.doc.transact(() => {
        model.views = model.views.map(v => {
            if (v.id !== id) {
                return v;
            }
            return { ...v, ...update(v) };
        });
    });
    applyViewsUpdate(model);
};
export const DATABASE_CONVERT_WHITE_LIST = ['affine:list', 'affine:paragraph'];
//# sourceMappingURL=block-utils.js.map