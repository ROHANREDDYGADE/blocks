import { insertPositionToIndex, } from '@blocksuite/affine-shared/utils';
import { DataSourceBase } from '@blocksuite/data-view';
import { propertyPresets } from '@blocksuite/data-view/property-presets';
import { assertExists, Slot } from '@blocksuite/global/utils';
import { databaseBlockAllPropertyMap, databasePropertyConverts, } from '../database-block/properties/index.js';
import { blockMetaMap } from './block-meta/index.js';
import { queryBlockAllColumnMap, queryBlockColumns } from './columns/index.js';
// @ts-ignore
export class BlockQueryDataSource extends DataSourceBase {
    get blocks() {
        return [...this.blockMap.values()];
    }
    get properties() {
        return [
            ...this.meta.properties.map(v => v.key),
            ...this.block.columns.map(v => v.id),
        ];
    }
    get propertyMetas() {
        return queryBlockColumns;
    }
    get rows() {
        return this.blocks.map(v => v.id);
    }
    get workspace() {
        return this.host.doc.collection;
    }
    constructor(host, block, config) {
        super();
        this.host = host;
        this.block = block;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.columnMetaMap = new Map();
        this.blockMap = new Map();
        this.docDisposeMap = new Map();
        this.slots = {
            update: new Slot(),
        };
        this.meta = blockMetaMap[config.type];
        for (const property of this.meta.properties) {
            this.columnMetaMap.set(property.metaConfig.type, property.metaConfig);
        }
        for (const collection of this.workspace.docs.values()) {
            for (const block of Object.values(collection.getDoc().blocks.peek())) {
                if (this.meta.selector(block)) {
                    this.blockMap.set(block.id, block);
                }
            }
        }
        this.workspace.docs.forEach(doc => {
            this.listenToDoc(doc.getDoc());
        });
        this.workspace.slots.docAdded.on(id => {
            const doc = this.workspace.getDoc(id);
            if (doc) {
                this.listenToDoc(doc);
            }
        });
        this.workspace.slots.docRemoved.on(id => {
            this.docDisposeMap.get(id)?.();
        });
    }
    getProperty(propertyId) {
        const property = this.meta.properties.find(v => v.key === propertyId);
        assertExists(property, `property ${propertyId} not found`);
        return property;
    }
    newColumnName() {
        let i = 1;
        while (this.block.columns.some(column => column.name === `Column ${i}`)) {
            i++;
        }
        return `Column ${i}`;
    }
    cellValueChange(rowId, propertyId, value) {
        const viewColumn = this.getViewColumn(propertyId);
        if (viewColumn) {
            this.block.cells[rowId] = {
                ...this.block.cells[rowId],
                [propertyId]: value,
            };
            return;
        }
        const block = this.blockMap.get(rowId);
        if (block) {
            this.meta.properties
                .find(v => v.key === propertyId)
                ?.set?.(block.model, value);
        }
    }
    cellValueGet(rowId, propertyId) {
        const viewColumn = this.getViewColumn(propertyId);
        if (viewColumn) {
            return this.block.cells[rowId]?.[propertyId];
        }
        const block = this.blockMap.get(rowId);
        if (block) {
            return this.getProperty(propertyId)?.get(block.model);
        }
        return;
    }
    getViewColumn(id) {
        return this.block.columns.find(v => v.id === id);
    }
    listenToDoc(doc) {
        this.docDisposeMap.set(doc.id, doc.slots.blockUpdated.on(v => {
            if (v.type === 'add') {
                const blockById = doc.getBlock(v.id);
                if (blockById && this.meta.selector(blockById)) {
                    this.blockMap.set(v.id, blockById);
                }
            }
            else if (v.type === 'delete') {
                this.blockMap.delete(v.id);
            }
            this.slots.update.emit();
        }).dispose);
    }
    propertyAdd(insertToPosition, type) {
        const doc = this.block.doc;
        doc.captureSync();
        const column = databaseBlockAllPropertyMap[type ?? propertyPresets.multiSelectPropertyConfig.type].create(this.newColumnName());
        const id = doc.generateBlockId();
        if (this.block.columns.some(v => v.id === id)) {
            return id;
        }
        doc.transact(() => {
            const col = {
                ...column,
                id,
            };
            this.block.columns.splice(insertPositionToIndex(insertToPosition, this.block.columns), 0, col);
        });
        return id;
    }
    propertyDataGet(propertyId) {
        const viewColumn = this.getViewColumn(propertyId);
        if (viewColumn) {
            return viewColumn.data;
        }
        const property = this.getProperty(propertyId);
        return (property.getColumnData?.(this.blocks[0].model) ??
            property.metaConfig.config.defaultData());
    }
    propertyDataSet(propertyId, data) {
        const viewColumn = this.getViewColumn(propertyId);
        if (viewColumn) {
            viewColumn.data = data;
        }
    }
    propertyDelete(_id) {
        const index = this.block.columns.findIndex(v => v.id === _id);
        if (index >= 0) {
            this.block.columns.splice(index, 1);
        }
    }
    propertyDuplicate(_columnId) {
        throw new Error('Method not implemented.');
    }
    propertyMetaGet(type) {
        const meta = this.columnMetaMap.get(type);
        if (meta) {
            return meta;
        }
        return queryBlockAllColumnMap[type];
    }
    propertyNameGet(propertyId) {
        const viewColumn = this.getViewColumn(propertyId);
        if (viewColumn) {
            return viewColumn.name;
        }
        if (propertyId === 'type') {
            return 'Block Type';
        }
        return this.getProperty(propertyId)?.name ?? '';
    }
    propertyNameSet(propertyId, name) {
        const viewColumn = this.getViewColumn(propertyId);
        if (viewColumn) {
            viewColumn.name = name;
        }
    }
    propertyReadonlyGet(propertyId) {
        const viewColumn = this.getViewColumn(propertyId);
        if (viewColumn) {
            return false;
        }
        if (propertyId === 'type')
            return true;
        return this.getProperty(propertyId)?.set == null;
    }
    propertyTypeGet(propertyId) {
        const viewColumn = this.getViewColumn(propertyId);
        if (viewColumn) {
            return viewColumn.type;
        }
        if (propertyId === 'type') {
            return 'image';
        }
        return this.getProperty(propertyId).metaConfig.type;
    }
    propertyTypeSet(propertyId, toType) {
        const viewColumn = this.getViewColumn(propertyId);
        if (viewColumn) {
            const currentType = viewColumn.type;
            const currentData = viewColumn.data;
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
            this.block.doc.captureSync();
            viewColumn.type = toType;
            viewColumn.data = result.property;
            currentCells.forEach((value, i) => {
                if (value != null || result.cells[i] != null) {
                    this.block.cells[rows[i]] = {
                        ...this.block.cells[rows[i]],
                        [propertyId]: result.cells[i],
                    };
                }
            });
        }
    }
    rowAdd(_insertPosition) {
        throw new Error('Method not implemented.');
    }
    rowDelete(_ids) {
        throw new Error('Method not implemented.');
    }
    rowMove(_rowId, _position) { }
}
//# sourceMappingURL=data-source.js.map