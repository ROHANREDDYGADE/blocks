import { arrayMove, insertPositionToIndex, } from '@blocksuite/affine-shared/utils';
import { BlockModel, defineBlockSchema } from '@blocksuite/store';
export class DataViewBlockModel extends BlockModel {
    constructor() {
        super();
    }
    applyViewsUpdate() {
        this.doc.updateBlock(this, {
            views: this.views,
        });
    }
    deleteView(id) {
        this.doc.captureSync();
        this.doc.transact(() => {
            this.views = this.views.filter(v => v.id !== id);
        });
    }
    duplicateView(id) {
        const newId = this.doc.generateBlockId();
        this.doc.transact(() => {
            const index = this.views.findIndex(v => v.id === id);
            const view = this.views[index];
            if (view) {
                this.views.splice(index + 1, 0, JSON.parse(JSON.stringify({ ...view, id: newId })));
            }
        });
        return newId;
    }
    moveViewTo(id, position) {
        this.doc.transact(() => {
            this.views = arrayMove(this.views, v => v.id === id, arr => insertPositionToIndex(position, arr));
        });
        this.applyViewsUpdate();
    }
    updateView(id, update) {
        this.doc.transact(() => {
            this.views = this.views.map(v => {
                if (v.id !== id) {
                    return v;
                }
                return { ...v, ...update(v) };
            });
        });
        this.applyViewsUpdate();
    }
}
export const DataViewBlockSchema = defineBlockSchema({
    flavour: 'affine:data-view',
    props: () => ({
        views: [],
        title: '',
        columns: [],
        cells: {},
    }),
    metadata: {
        role: 'hub',
        version: 1,
        parent: ['affine:note'],
        children: ['affine:paragraph', 'affine:list'],
    },
    toModel: () => {
        return new DataViewBlockModel();
    },
});
//# sourceMappingURL=data-view-model.js.map