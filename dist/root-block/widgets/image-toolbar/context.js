import { MenuContext } from '../../configs/toolbar.js';
export class ImageToolbarContext extends MenuContext {
    get doc() {
        return this.blockComponent.doc;
    }
    get host() {
        return this.blockComponent.host;
    }
    get selectedBlockModels() {
        return [this.blockComponent.model];
    }
    get std() {
        return this.blockComponent.std;
    }
    constructor(blockComponent, abortController) {
        super();
        this.blockComponent = blockComponent;
        this.abortController = abortController;
        this.close = () => {
            this.abortController.abort();
        };
    }
    isEmpty() {
        return false;
    }
    isMultiple() {
        return false;
    }
    isSingle() {
        return true;
    }
}
//# sourceMappingURL=context.js.map