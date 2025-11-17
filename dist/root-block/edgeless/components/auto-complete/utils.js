import { CommonUtils, Overlay, } from '@blocksuite/affine-block-surface';
import { getShapeRadius, getShapeType, GroupElementModel, ShapeElementModel, } from '@blocksuite/affine-model';
import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';
import { assertType, Bound } from '@blocksuite/global/utils';
import { DocCollection } from '@blocksuite/store';
import { ShapeFactory } from '../../utils/tool-overlay.js';
export var Direction;
(function (Direction) {
    Direction[Direction["Right"] = 0] = "Right";
    Direction[Direction["Bottom"] = 1] = "Bottom";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Top"] = 3] = "Top";
})(Direction || (Direction = {}));
export const PANEL_WIDTH = 136;
export const PANEL_HEIGHT = 108;
export const MAIN_GAP = 100;
export const SECOND_GAP = 20;
export const DEFAULT_NOTE_OVERLAY_HEIGHT = 110;
export const DEFAULT_TEXT_WIDTH = 116;
export const DEFAULT_TEXT_HEIGHT = 24;
class AutoCompleteTargetOverlay extends Overlay {
    constructor(gfx, xywh) {
        super(gfx);
        this.xywh = xywh;
    }
    render(_ctx, _rc) { }
}
export class AutoCompleteTextOverlay extends AutoCompleteTargetOverlay {
    constructor(gfx, xywh) {
        super(gfx, xywh);
    }
    render(ctx, _rc) {
        const [x, y, w, h] = this.xywh;
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = '#1e96eb';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, w, h);
        // fill text placeholder
        ctx.font = '15px sans-serif';
        ctx.fillStyle = '#C0BFC1';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("Type '/' to insert", x + w / 2, y + h / 2);
    }
}
export class AutoCompleteNoteOverlay extends AutoCompleteTargetOverlay {
    constructor(gfx, xywh, background) {
        super(gfx, xywh);
        this._background = background;
    }
    render(ctx, _rc) {
        const [x, y, w, h] = this.xywh;
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = this._background;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.10)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // fill text placeholder
        ctx.font = '15px sans-serif';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText("Type '/' for command", x + 24, y + h / 2);
    }
}
export class AutoCompleteFrameOverlay extends AutoCompleteTargetOverlay {
    constructor(gfx, xywh, strokeColor) {
        super(gfx, xywh);
        this._strokeColor = strokeColor;
    }
    render(ctx, _rc) {
        const [x, y, w, h] = this.xywh;
        // frame title background
        const titleWidth = 72;
        const titleHeight = 30;
        const titleY = y - titleHeight - 10;
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.beginPath();
        ctx.roundRect(x, titleY, titleWidth, titleHeight, 4);
        ctx.closePath();
        ctx.fill();
        // fill title text
        ctx.globalAlpha = 1;
        ctx.font = '14px sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Frame', x + titleWidth / 2, titleY + titleHeight / 2);
        // frame stroke
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = this._strokeColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 8);
        ctx.closePath();
        ctx.stroke();
    }
}
export class AutoCompleteShapeOverlay extends Overlay {
    constructor(gfx, xywh, type, options, shapeStyle) {
        super(gfx);
        this._shape = ShapeFactory.createShape(xywh, type, options, shapeStyle);
    }
    render(ctx, rc) {
        ctx.globalAlpha = 0.4;
        this._shape.draw(ctx, rc);
    }
}
export function nextBound(type, curShape, elements) {
    const bound = Bound.deserialize(curShape.xywh);
    const { x, y, w, h } = bound;
    let nextBound;
    let angle = 0;
    switch (type) {
        case Direction.Right:
            angle = 0;
            break;
        case Direction.Bottom:
            angle = 90;
            break;
        case Direction.Left:
            angle = 180;
            break;
        case Direction.Top:
            angle = 270;
            break;
    }
    angle = CommonUtils.normalizeDegAngle(angle + curShape.rotate);
    if (angle >= 45 && angle <= 135) {
        nextBound = new Bound(x, y + h + MAIN_GAP, w, h);
    }
    else if (angle >= 135 && angle <= 225) {
        nextBound = new Bound(x - w - MAIN_GAP, y, w, h);
    }
    else if (angle >= 225 && angle <= 315) {
        nextBound = new Bound(x, y - h - MAIN_GAP, w, h);
    }
    else {
        nextBound = new Bound(x + w + MAIN_GAP, y, w, h);
    }
    function isValidBound(bound) {
        return !elements.some(a => bound.isOverlapWithBound(a.elementBound));
    }
    let count = 0;
    function findValidBound() {
        count++;
        const number = Math.ceil(count / 2);
        const next = nextBound.clone();
        switch (type) {
            case Direction.Right:
            case Direction.Left:
                next.y =
                    count % 2 === 1
                        ? nextBound.y - (h + SECOND_GAP) * number
                        : nextBound.y + (h + SECOND_GAP) * number;
                break;
            case Direction.Bottom:
            case Direction.Top:
                next.x =
                    count % 2 === 1
                        ? nextBound.x - (w + SECOND_GAP) * number
                        : nextBound.x + (w + SECOND_GAP) * number;
                break;
        }
        if (isValidBound(next))
            return next;
        return findValidBound();
    }
    return isValidBound(nextBound) ? nextBound : findValidBound();
}
export function getPosition(type) {
    let startPosition;
    let endPosition;
    switch (type) {
        case Direction.Right:
            startPosition = [1, 0.5];
            endPosition = [0, 0.5];
            break;
        case Direction.Bottom:
            startPosition = [0.5, 1];
            endPosition = [0.5, 0];
            break;
        case Direction.Left:
            startPosition = [0, 0.5];
            endPosition = [1, 0.5];
            break;
        case Direction.Top:
            startPosition = [0.5, 0];
            endPosition = [0.5, 1];
            break;
    }
    return { startPosition, endPosition };
}
export function isShape(element) {
    return element instanceof ShapeElementModel;
}
export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function createEdgelessElement(edgeless, current, bound) {
    let id;
    const { service } = edgeless;
    let element = null;
    if (isShape(current)) {
        id = service.addElement(current.type, {
            ...current.serialize(),
            text: new DocCollection.Y.Text(),
            xywh: bound.serialize(),
        });
        element = service.getElementById(id);
    }
    else {
        const { doc } = edgeless;
        id = doc.addBlock('affine:note', {
            background: current.background,
            displayMode: current.displayMode,
            edgeless: current.edgeless,
            xywh: bound.serialize(),
        }, edgeless.model.id);
        const note = doc.getBlock(id)?.model;
        if (!note) {
            throw new BlockSuiteError(ErrorCode.GfxBlockElementError, 'Note block is not found after creation');
        }
        assertType(note);
        doc.updateBlock(note, () => {
            note.edgeless.collapse = true;
        });
        doc.addBlock('affine:paragraph', {}, note.id);
        element = note;
    }
    if (!element) {
        throw new BlockSuiteError(ErrorCode.GfxBlockElementError, 'Element is not found after creation');
    }
    const group = current.group;
    if (group instanceof GroupElementModel) {
        group.addChild(element);
    }
    return id;
}
export function createShapeElement(edgeless, current, targetType) {
    const service = edgeless.service;
    const id = service.addElement('shape', {
        shapeType: getShapeType(targetType),
        radius: getShapeRadius(targetType),
        text: new DocCollection.Y.Text(),
    });
    const element = service.getElementById(id);
    const group = current.group;
    if (group instanceof GroupElementModel && element) {
        group.addChild(element);
    }
    return id;
}
//# sourceMappingURL=utils.js.map