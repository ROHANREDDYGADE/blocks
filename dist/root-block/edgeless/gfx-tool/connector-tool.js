import { calculateNearestLocation, CanvasElementType, ConnectorEndpointLocations, ConnectorEndpointLocationsOnTriangle, OverlayIdentifier, } from '@blocksuite/affine-block-surface';
import { GroupElementModel, ShapeElementModel, ShapeType, } from '@blocksuite/affine-model';
import { TelemetryProvider } from '@blocksuite/affine-shared/services';
import { BaseTool } from '@blocksuite/block-std/gfx';
import { Bound } from '@blocksuite/global/utils';
var ConnectorToolMode;
(function (ConnectorToolMode) {
    // Dragging connect
    ConnectorToolMode[ConnectorToolMode["Dragging"] = 0] = "Dragging";
    // Quick connect
    ConnectorToolMode[ConnectorToolMode["Quick"] = 1] = "Quick";
})(ConnectorToolMode || (ConnectorToolMode = {}));
export class ConnectorTool extends BaseTool {
    constructor() {
        super(...arguments);
        // Likes pressing `ESC`
        this._allowCancel = false;
        this._connector = null;
        this._mode = ConnectorToolMode.Dragging;
        this._source = null;
        this._sourceBounds = null;
        this._sourceLocations = ConnectorEndpointLocations;
        this._startPoint = null;
    }
    static { this.toolName = 'connector'; }
    get _overlay() {
        return this.std.get(OverlayIdentifier('connection'));
    }
    _createConnector() {
        if (!(this._source && this._startPoint) || !this.gfx.surface) {
            this._source = null;
            this._startPoint = null;
            return;
        }
        this.doc.captureSync();
        const id = this.gfx.surface.addElement({
            type: CanvasElementType.CONNECTOR,
            mode: this.activatedOption.mode,
            controllers: [],
            source: this._source,
            target: { position: this._startPoint },
        });
        this.gfx.std.getOptional(TelemetryProvider)?.track('CanvasElementAdded', {
            control: 'canvas:draw',
            page: 'whiteboard editor',
            module: 'toolbar',
            segment: 'toolbar',
            type: CanvasElementType.CONNECTOR,
        });
        const connector = this.gfx.getElementById(id);
        if (!connector) {
            this._source = null;
            this._startPoint = null;
            return;
        }
        this._connector = connector;
    }
    click() {
        if (this._mode === ConnectorToolMode.Dragging)
            return;
        if (!this._connector)
            return;
        const { id, source, target } = this._connector;
        let focusedId = id;
        if (source?.id && !target?.id) {
            focusedId = source.id;
            this._allowCancel = true;
        }
        this.gfx.tool.setTool('default');
        this.gfx.selection.set({ elements: [focusedId] });
    }
    deactivate() {
        const id = this._connector?.id;
        if (this._allowCancel && id) {
            this.gfx.surface?.deleteElement(id);
        }
        this._overlay?.clear();
        this._mode = ConnectorToolMode.Dragging;
        this._connector = null;
        this._source = null;
        this._sourceBounds = null;
        this._startPoint = null;
        this._allowCancel = false;
    }
    dragEnd() {
        if (this._mode === ConnectorToolMode.Quick)
            return;
        if (!this._connector)
            return;
        const connector = this._connector;
        this.doc.captureSync();
        this.gfx.tool.setTool('default');
        this.gfx.selection.set({ elements: [connector.id] });
    }
    dragMove(e) {
        this.findTargetByPoint([e.x, e.y]);
    }
    dragStart() {
        if (this._mode === ConnectorToolMode.Quick)
            return;
        this._createConnector();
    }
    findTargetByPoint(point) {
        if (!this._connector || !this.gfx.surface)
            return;
        const { _connector } = this;
        point = this.gfx.viewport.toModelCoord(point[0], point[1]);
        const excludedIds = [];
        if (_connector.source?.id) {
            excludedIds.push(_connector.source.id);
        }
        const target = this._overlay?.renderConnector(point, excludedIds);
        this.gfx.updateElement(_connector, { target });
    }
    pointerDown(e) {
        this._startPoint = this.gfx.viewport.toModelCoord(e.x, e.y);
        this._source = this._overlay?.renderConnector(this._startPoint) ?? null;
    }
    pointerMove(e) {
        if (this._mode === ConnectorToolMode.Dragging)
            return;
        if (!this._sourceBounds)
            return;
        if (!this._connector)
            return;
        const sourceId = this._connector.source?.id;
        if (!sourceId)
            return;
        const point = this.gfx.viewport.toModelCoord(e.x, e.y);
        const target = this._overlay.renderConnector(point, [sourceId]);
        this._allowCancel = !target.id;
        this._connector.source.position = calculateNearestLocation(point, this._sourceBounds, this._sourceLocations);
        this.gfx.updateElement(this._connector, {
            target,
            source: this._connector.source,
        });
    }
    pointerUp(_) {
        this._overlay?.clear();
    }
    quickConnect(point, element) {
        this._startPoint = this.gfx.viewport.toModelCoord(point[0], point[1]);
        this._mode = ConnectorToolMode.Quick;
        this._sourceBounds = Bound.deserialize(element.xywh);
        this._sourceBounds.rotate = element.rotate;
        this._sourceLocations =
            element instanceof ShapeElementModel &&
                element.shapeType === ShapeType.Triangle
                ? ConnectorEndpointLocationsOnTriangle
                : ConnectorEndpointLocations;
        this._source = {
            id: element.id,
            position: calculateNearestLocation(this._startPoint, this._sourceBounds, this._sourceLocations),
        };
        this._allowCancel = true;
        this._createConnector();
        if (element instanceof GroupElementModel && this._overlay) {
            this._overlay.sourceBounds = this._sourceBounds;
        }
        this.findTargetByPoint(point);
    }
}
//# sourceMappingURL=connector-tool.js.map