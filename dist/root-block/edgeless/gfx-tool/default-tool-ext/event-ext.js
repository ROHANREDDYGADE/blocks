import { Bound, last } from '@blocksuite/global/utils';
import { DefaultModeDragType, DefaultToolExt } from './ext.js';
export class CanvasElementEventExt extends DefaultToolExt {
    constructor() {
        super(...arguments);
        this._currentStackedElm = [];
        this.supportedDragTypes = [
            DefaultModeDragType.None,
        ];
    }
    _callInReverseOrder(callback, arr = this._currentStackedElm) {
        for (let i = arr.length - 1; i >= 0; i--) {
            const view = arr[i];
            callback(view);
        }
    }
    click(_evt) {
        last(this._currentStackedElm)?.dispatch('click', _evt);
    }
    dblClick(_evt) {
        last(this._currentStackedElm)?.dispatch('dblclick', _evt);
    }
    pointerDown(_evt) {
        last(this._currentStackedElm)?.dispatch('pointerdown', _evt);
    }
    pointerMove(_evt) {
        const [x, y] = this.gfx.viewport.toModelCoord(_evt.x, _evt.y);
        const hoveredElmViews = this.gfx.grid
            .search(new Bound(x, y, 1, 1), {
            filter: ['canvas', 'local'],
        })
            .map(model => this.gfx.view.get(model));
        const currentStackedViews = new Set(this._currentStackedElm);
        const visited = new Set();
        this._callInReverseOrder(view => {
            if (currentStackedViews.has(view)) {
                visited.add(view);
                view.dispatch('pointermove', _evt);
            }
            else {
                view.dispatch('pointerenter', _evt);
            }
        }, hoveredElmViews);
        this._callInReverseOrder(view => !visited.has(view) && view.dispatch('pointerleave', _evt));
        this._currentStackedElm = hoveredElmViews;
    }
    pointerUp(_evt) {
        last(this._currentStackedElm)?.dispatch('pointerup', _evt);
    }
}
//# sourceMappingURL=event-ext.js.map