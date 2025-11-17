import { getScrollContainer } from '@blocksuite/affine-shared/utils';
export class PageWatcher {
    get pageRoot() {
        return this.widget.rootComponent;
    }
    constructor(widget) {
        this.widget = widget;
    }
    watch() {
        const { pageRoot } = this;
        const { disposables } = this.widget;
        const scrollContainer = getScrollContainer(pageRoot);
        disposables.add(this.widget.doc.slots.blockUpdated.on(() => this.widget.hide()));
        disposables.add(pageRoot.slots.viewportUpdated.on(() => {
            this.widget.hide();
            if (this.widget.dropIndicator) {
                this.widget.dropIndicator.rect = null;
            }
        }));
        disposables.addFromEvent(scrollContainer, 'scrollend', this.widget.updateDropIndicatorOnScroll);
    }
}
//# sourceMappingURL=page-watcher.js.map