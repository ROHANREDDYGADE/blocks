import { insertPositionToIndex, } from '@blocksuite/affine-shared/utils';
import { DataSourceBase, getTagColor, ViewManagerBase, } from '@blocksuite/data-view';
import { propertyPresets } from '@blocksuite/data-view/property-presets';
import { IS_MOBILE } from '@blocksuite/global/env';
import { assertExists } from '@blocksuite/global/utils';
import { nanoid, Text } from '@blocksuite/store';
import { computed } from '@preact/signals-core';
import { getIcon } from './block-icons.js';
import { databaseBlockAllPropertyMap, databaseBlockPropertyList, databasePropertyConverts, } from './properties/index.js';
import { titlePurePropertyConfig } from './properties/title/define.js';
import { addProperty, applyCellsUpdate, applyPropertyUpdate, copyCellsByProperty, deleteRows, deleteView, duplicateView, findPropertyIndex, getCell, getProperty, moveViewTo, updateCell, updateCells, updateProperty, updateView, } from './utils/block-utils.js';
import { databaseBlockViewConverts, databaseBlockViewMap, databaseBlockViews, } from './views/index.js';
export class DatabaseBlockDataSource extends DataSourceBase {
    get doc() {
        return this._model.doc;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get propertyMetas() {
        return databaseBlockPropertyList;
    }
    constructor(model) {
        super();
        this._batch = 0;
        this.featureFlags$ = computed(() => {
            return {
                enable_number_formatting: this.doc.awarenessStore.getFlag('enable_database_number_formatting') ??
                    false,
            };
        });
        this.properties$ = computed(() => {
            return this._model.columns$.value.map(column => column.id);
        });
        this.readonly$ = computed(() => {
            return (this._model.doc.readonly ||
                // TODO(@L-Sun): use block level readonly
                IS_MOBILE);
        });
        this.rows$ = computed(() => {
            return this._model.children.map(v => v.id);
        });
        this.viewConverts = databaseBlockViewConverts;
        this.viewDataList$ = computed(() => {
            return this._model.views$.value;
        });
        this.viewManager = new ViewManagerBase(this);
        this.viewMetas = databaseBlockViews;
        this._model = model;
    }
    _runCapture() {
        if (this._batch) {
            return;
        }
        this._batch = requestAnimationFrame(() => {
            this.doc.captureSync();
            this._batch = 0;
        });
    }
    getModelById(rowId) {
        return this._model.children[this._model.childMap.value.get(rowId) ?? -1];
    }
    newPropertyName() {
        let i = 1;
        while (this._model.columns$.value.some(column => column.name === `Column ${i}`)) {
            i++;
        }
        return `Column ${i}`;
    }
    cellValueChange(rowId, propertyId, value) {
        this._runCapture();
        const type = this.propertyTypeGet(propertyId);
        const update = this.propertyMetaGet(type).config.valueUpdate;
        let newValue = value;
        if (update) {
            const old = this.cellValueGet(rowId, propertyId);
            newValue = update({
                value: old,
                data: this.propertyDataGet(propertyId),
                dataSource: this,
                newValue: value,
            });
        }
        if (type === 'title' && newValue instanceof Text) {
            this._model.doc.transact(() => {
                this._model.text?.clear();
                this._model.text?.join(newValue);
            });
            return;
        }
        if (this._model.columns$.value.some(v => v.id === propertyId)) {
            updateCell(this._model, rowId, {
                columnId: propertyId,
                value: newValue,
            });
            applyCellsUpdate(this._model);
        }
    }
    cellValueGet(rowId, propertyId) {
        if (propertyId === 'type') {
            const model = this.getModelById(rowId);
            if (!model) {
                return;
            }
            return getIcon(model);
        }
        const type = this.propertyTypeGet(propertyId);
        if (type === 'title') {
            const model = this.getModelById(rowId);
            return model?.text;
        }
        return getCell(this._model, rowId, propertyId)?.value;
    }
    propertyAdd(insertToPosition, type) {
        this.doc.captureSync();
        const result = addProperty(this._model, insertToPosition, databaseBlockAllPropertyMap[type ?? propertyPresets.multiSelectPropertyConfig.type].create(this.newPropertyName()));
        applyPropertyUpdate(this._model);
        return result;
    }
    propertyDataGet(propertyId) {
        return (this._model.columns$.value.find(v => v.id === propertyId)?.data ?? {});
    }
    propertyDataSet(propertyId, data) {
        this._runCapture();
        updateProperty(this._model, propertyId, () => ({ data }));
        applyPropertyUpdate(this._model);
    }
    propertyDataTypeGet(propertyId) {
        const data = this._model.columns$.value.find(v => v.id === propertyId);
        if (!data) {
            return;
        }
        const meta = this.propertyMetaGet(data.type);
        return meta.config.type({
            data: data.data,
            dataSource: this,
        });
    }
    propertyDelete(id) {
        this.doc.captureSync();
        const index = findPropertyIndex(this._model, id);
        if (index < 0)
            return;
        this.doc.transact(() => {
            this._model.columns = this._model.columns.filter((_, i) => i !== index);
        });
    }
    propertyDuplicate(propertyId) {
        this.doc.captureSync();
        const currentSchema = getProperty(this._model, propertyId);
        assertExists(currentSchema);
        const { id: copyId, ...nonIdProps } = currentSchema;
        const names = new Set(this._model.columns$.value.map(v => v.name));
        let index = 1;
        while (names.has(`${nonIdProps.name}(${index})`)) {
            index++;
        }
        const schema = { ...nonIdProps, name: `${nonIdProps.name}(${index})` };
        const id = addProperty(this._model, {
            before: false,
            id: propertyId,
        }, schema);
        copyCellsByProperty(this._model, copyId, id);
        applyPropertyUpdate(this._model);
        return id;
    }
    propertyMetaGet(type) {
        return databaseBlockAllPropertyMap[type];
    }
    propertyNameGet(propertyId) {
        if (propertyId === 'type') {
            return 'Block Type';
        }
        return (this._model.columns$.value.find(v => v.id === propertyId)?.name ?? '');
    }
    propertyNameSet(propertyId, name) {
        this.doc.captureSync();
        updateProperty(this._model, propertyId, () => ({ name }));
        applyPropertyUpdate(this._model);
    }
    propertyReadonlyGet(propertyId) {
        if (propertyId === 'type')
            return true;
        return false;
    }
    propertyTypeGet(propertyId) {
        if (propertyId === 'type') {
            return 'image';
        }
        return (this._model.columns$.value.find(v => v.id === propertyId)?.type ?? '');
    }
    propertyTypeSet(propertyId, toType) {
        const currentType = this.propertyTypeGet(propertyId);
        const currentData = this.propertyDataGet(propertyId);
        const rows = this.rows$.value;
        const currentCells = rows.map(rowId => this.cellValueGet(rowId, propertyId));
        const convertFunction = databasePropertyConverts.find(v => v.from === currentType && v.to === toType)?.convert;
        const result = convertFunction?.(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        currentData, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        currentCells) ?? {
            property: databaseBlockAllPropertyMap[toType].config.defaultData(),
            cells: currentCells.map(() => undefined),
        };
        this.doc.captureSync();
        updateProperty(this._model, propertyId, () => ({
            type: toType,
            data: result.property,
        }));
        const cells = {};
        currentCells.forEach((value, i) => {
            if (value != null || result.cells[i] != null) {
                cells[rows[i]] = result.cells[i];
            }
        });
        updateCells(this._model, propertyId, cells);
        applyPropertyUpdate(this._model);
    }
    rowAdd(insertPosition) {
        this.doc.captureSync();
        const index = typeof insertPosition === 'number'
            ? insertPosition
            : insertPositionToIndex(insertPosition, this._model.children);
        return this.doc.addBlock('affine:paragraph', {}, this._model.id, index);
    }
    rowDelete(ids) {
        this.doc.captureSync();
        for (const id of ids) {
            const block = this.doc.getBlock(id);
            if (block) {
                this.doc.deleteBlock(block.model);
            }
        }
        deleteRows(this._model, ids);
    }
    rowMove(rowId, position) {
        const model = this.doc.getBlockById(rowId);
        if (model) {
            const index = insertPositionToIndex(position, this._model.children);
            const target = this._model.children[index];
            if (target?.id === rowId) {
                return;
            }
            this.doc.moveBlocks([model], this._model, target);
        }
    }
    viewDataAdd(viewData) {
        this._model.doc.captureSync();
        this._model.doc.transact(() => {
            this._model.views = [...this._model.views, viewData];
        });
        return viewData.id;
    }
    viewDataDelete(viewId) {
        this._model.doc.captureSync();
        deleteView(this._model, viewId);
    }
    viewDataDuplicate(id) {
        return duplicateView(this._model, id);
    }
    viewDataGet(viewId) {
        return this.viewDataList$.value.find(data => data.id === viewId);
    }
    viewDataMoveTo(id, position) {
        moveViewTo(this._model, id, position);
    }
    viewDataUpdate(id, updater) {
        updateView(this._model, id, updater);
    }
    viewMetaGet(type) {
        return databaseBlockViewMap[type];
    }
    viewMetaGetById(viewId) {
        const view = this.viewDataGet(viewId);
        return this.viewMetaGet(view.mode);
    }
}
export const databaseViewAddView = (model, viewType) => {
    const dataSource = new DatabaseBlockDataSource(model);
    dataSource.viewManager.viewAdd(viewType);
};
export const databaseViewInitEmpty = (model, viewType) => {
    addProperty(model, 'start', titlePurePropertyConfig.create(titlePurePropertyConfig.config.name));
    databaseViewAddView(model, viewType);
};
export const databaseViewInitConvert = (model, viewType) => {
    addProperty(model, 'end', propertyPresets.multiSelectPropertyConfig.create('Tag', { options: [] }));
    databaseViewInitEmpty(model, viewType);
};
export const databaseViewInitTemplate = (model, viewType) => {
    const ids = [nanoid(), nanoid(), nanoid()];
    const statusId = addProperty(model, 'end', propertyPresets.selectPropertyConfig.create('Status', {
        options: [
            {
                id: ids[0],
                color: getTagColor(),
                value: 'TODO',
            },
            {
                id: ids[1],
                color: getTagColor(),
                value: 'In Progress',
            },
            {
                id: ids[2],
                color: getTagColor(),
                value: 'Done',
            },
        ],
    }));
    for (let i = 0; i < 4; i++) {
        const rowId = model.doc.addBlock('affine:paragraph', {
            text: new model.doc.Text(`Task ${i + 1}`),
        }, model.id);
        updateCell(model, rowId, {
            columnId: statusId,
            value: ids[i],
        });
    }
    databaseViewInitEmpty(model, viewType);
};
export const convertToDatabase = (host, viewType) => {
    const [_, ctx] = host.std.command
        .chain()
        .getSelectedModels({
        types: ['block', 'text'],
    })
        .run();
    const { selectedModels } = ctx;
    if (!selectedModels || selectedModels.length === 0)
        return;
    host.doc.captureSync();
    const parentModel = host.doc.getParent(selectedModels[0]);
    if (!parentModel) {
        return;
    }
    const id = host.doc.addBlock('affine:database', {}, parentModel, parentModel.children.indexOf(selectedModels[0]));
    const databaseModel = host.doc.getBlock(id)?.model;
    if (!databaseModel) {
        return;
    }
    databaseViewInitConvert(databaseModel, viewType);
    applyPropertyUpdate(databaseModel);
    host.doc.moveBlocks(selectedModels, databaseModel);
    const selectionManager = host.selection;
    selectionManager.clear();
};
//# sourceMappingURL=data-source.js.map