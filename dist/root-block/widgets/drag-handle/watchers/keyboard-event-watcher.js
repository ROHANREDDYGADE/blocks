export class KeyboardEventWatcher {
    constructor(widget) {
        this.widget = widget;
        this._keyboardHandler = ctx => {
            if (!this.widget.dragging || !this.widget.dragPreview) {
                return;
            }
            const state = ctx.get('defaultState');
            const event = state.event;
            event.preventDefault();
            event.stopPropagation();
            const altKey = event.key === 'Alt' && event.altKey;
            this.widget.dragPreview.style.opacity = altKey ? '1' : '0.5';
        };
    }
    watch() {
        this.widget.handleEvent('beforeInput', () => this.widget.hide());
        this.widget.handleEvent('keyDown', this._keyboardHandler, { global: true });
        this.widget.handleEvent('keyUp', this._keyboardHandler, { global: true });
    }
}
//# sourceMappingURL=keyboard-event-watcher.js.map