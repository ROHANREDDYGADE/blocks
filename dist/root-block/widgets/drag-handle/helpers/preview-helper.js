import { SpecProvider } from '@blocksuite/affine-shared/utils';
import { BlockStdScope, } from '@blocksuite/block-std';
import { Point } from '@blocksuite/global/utils';
import { BlockViewType } from '@blocksuite/store';
import { DragPreview } from '../components/drag-preview.js';
export class PreviewHelper {
    constructor(widget) {
        this.widget = widget;
        this._calculatePreviewOffset = (blocks, state) => {
            const { top, left } = blocks[0].getBoundingClientRect();
            const previewOffset = new Point(state.raw.x - left, state.raw.y - top);
            return previewOffset;
        };
        this._calculateQuery = (selectedIds) => {
            const ids = selectedIds.map(id => ({
                id,
                viewType: BlockViewType.Display,
            }));
            // The ancestors of the selected blocks should be rendered as Bypass
            selectedIds.map(block => {
                let parent = block;
                do {
                    if (!selectedIds.includes(parent)) {
                        ids.push({ viewType: BlockViewType.Bypass, id: parent });
                    }
                    parent = this.widget.doc.blockCollection.crud.getParent(parent);
                } while (parent && !ids.map(({ id }) => id).includes(parent));
            });
            // The children of the selected blocks should be rendered as Display
            const addChildren = (id) => {
                const children = this.widget.doc.getBlock(id)?.model.children ?? [];
                children.forEach(child => {
                    ids.push({ viewType: BlockViewType.Display, id: child.id });
                    addChildren(child.id);
                });
            };
            selectedIds.forEach(addChildren);
            return {
                match: ids,
                mode: 'strict',
            };
        };
        this.createDragPreview = (blocks, state, dragPreviewEl, dragPreviewOffset) => {
            if (this.widget.dragPreview) {
                this.widget.dragPreview.remove();
            }
            let dragPreview;
            if (dragPreviewEl) {
                dragPreview = new DragPreview(dragPreviewOffset);
                dragPreview.append(dragPreviewEl);
            }
            else {
                let width = 0;
                blocks.forEach(element => {
                    width = Math.max(width, element.getBoundingClientRect().width);
                });
                const selectedIds = blocks.map(block => block.model.id);
                const query = this._calculateQuery(selectedIds);
                const doc = this.widget.doc.blockCollection.getDoc({ query });
                const previewSpec = SpecProvider.getInstance().getSpec('page:preview');
                const previewStd = new BlockStdScope({
                    doc,
                    extensions: previewSpec.value,
                });
                const previewTemplate = previewStd.render();
                const offset = this._calculatePreviewOffset(blocks, state);
                const posX = state.raw.x - offset.x;
                const posY = state.raw.y - offset.y;
                const altKey = state.raw.altKey;
                dragPreview = new DragPreview(offset);
                dragPreview.template = previewTemplate;
                dragPreview.onRemove = () => {
                    this.widget.doc.blockCollection.clearQuery(query);
                };
                dragPreview.style.width = `${width / this.widget.scaleInNote.peek()}px`;
                dragPreview.style.transform = `translate(${posX}px, ${posY}px) scale(${this.widget.scaleInNote.peek()})`;
                dragPreview.style.opacity = altKey ? '1' : '0.5';
            }
            this.widget.rootComponent.append(dragPreview);
            return dragPreview;
        };
        this.removeDragPreview = () => {
            if (this.widget.dragPreview) {
                this.widget.dragPreview.remove();
                this.widget.dragPreview = null;
            }
        };
    }
}
//# sourceMappingURL=preview-helper.js.map