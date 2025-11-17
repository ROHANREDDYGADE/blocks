export var DefaultModeDragType;
(function (DefaultModeDragType) {
    /** press alt/option key to clone selected  */
    DefaultModeDragType["AltCloning"] = "alt-cloning";
    /** Moving connector label */
    DefaultModeDragType["ConnectorLabelMoving"] = "connector-label-moving";
    /** Moving selected contents */
    DefaultModeDragType["ContentMoving"] = "content-moving";
    /** Native range dragging inside active note block */
    DefaultModeDragType["NativeEditing"] = "native-editing";
    /** Default void state */
    DefaultModeDragType["None"] = "none";
    /** Dragging preview */
    DefaultModeDragType["PreviewDragging"] = "preview-dragging";
    /** Expanding the dragging area, select the content covered inside */
    DefaultModeDragType["Selecting"] = "selecting";
})(DefaultModeDragType || (DefaultModeDragType = {}));
export class DefaultToolExt {
    get gfx() {
        return this.defaultTool.gfx;
    }
    get std() {
        return this.defaultTool.std;
    }
    constructor(defaultTool) {
        this.defaultTool = defaultTool;
        this.supportedDragTypes = [];
    }
    click(_evt) { }
    dblClick(_evt) { }
    initDrag(_) {
        return {};
    }
    mounted() { }
    pointerDown(_evt) { }
    pointerMove(_evt) { }
    pointerUp(_evt) { }
    unmounted() { }
}
//# sourceMappingURL=ext.js.map