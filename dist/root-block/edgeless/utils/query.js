import { CommonUtils, GRID_GAP_MAX, GRID_GAP_MIN, } from '@blocksuite/affine-block-surface';
import { ConnectorElementModel, FrameBlockModel, MindmapElementModel, ShapeElementModel, TextElementModel, } from '@blocksuite/affine-model';
import { Bound, deserializeXYWH, getQuadBoundWithRotation, } from '@blocksuite/global/utils';
import { getElementsWithoutGroup } from './group.js';
const { clamp } = CommonUtils;
export function isMindmapNode(element) {
    return element?.group instanceof MindmapElementModel;
}
export function isTopLevelBlock(selectable) {
    return !!selectable && 'flavour' in selectable;
}
export function isNoteBlock(element) {
    return !!element && 'flavour' in element && element.flavour === 'affine:note';
}
export function isEdgelessTextBlock(element) {
    return (!!element &&
        'flavour' in element &&
        element.flavour === 'affine:edgeless-text');
}
export function isFrameBlock(element) {
    return !!element && element.flavour === 'affine:frame';
}
export function isImageBlock(element) {
    return (!!element && 'flavour' in element && element.flavour === 'affine:image');
}
export function isAttachmentBlock(element) {
    return (!!element && 'flavour' in element && element.flavour === 'affine:attachment');
}
export function isBookmarkBlock(element) {
    return (!!element && 'flavour' in element && element.flavour === 'affine:bookmark');
}
export function isEmbeddedBlock(element) {
    return (!!element && 'flavour' in element && /affine:embed-*/.test(element.flavour));
}
/**
 * TODO: Remove this function after the edgeless refactor completed
 * This function is used to check if the block is an AI chat block for edgeless selected rect
 * Should not be used in the future
 * Related issue: https://linear.app/affine-design/issue/BS-1009/
 * @deprecated
 */
export function isAIChatBlock(element) {
    return (!!element &&
        'flavour' in element &&
        element.flavour === 'affine:embed-ai-chat');
}
export function isEmbeddedLinkBlock(element) {
    return (isEmbeddedBlock(element) &&
        !isEmbedSyncedDocBlock(element) &&
        !isEmbedLinkedDocBlock(element));
}
export function isEmbedGithubBlock(element) {
    return (!!element &&
        'flavour' in element &&
        element.flavour === 'affine:embed-github');
}
export function isEmbedYoutubeBlock(element) {
    return (!!element &&
        'flavour' in element &&
        element.flavour === 'affine:embed-youtube');
}
export function isEmbedLoomBlock(element) {
    return (!!element && 'flavour' in element && element.flavour === 'affine:embed-loom');
}
export function isEmbedFigmaBlock(element) {
    return (!!element &&
        'flavour' in element &&
        element.flavour === 'affine:embed-figma');
}
export function isEmbedLinkedDocBlock(element) {
    return (!!element &&
        'flavour' in element &&
        element.flavour === 'affine:embed-linked-doc');
}
export function isEmbedSyncedDocBlock(element) {
    return (!!element &&
        'flavour' in element &&
        element.flavour === 'affine:embed-synced-doc');
}
export function isEmbedHtmlBlock(element) {
    return (!!element && 'flavour' in element && element.flavour === 'affine:embed-html');
}
export function isCanvasElement(selectable) {
    return !isTopLevelBlock(selectable);
}
export function isCanvasElementWithText(element) {
    return (element instanceof TextElementModel || element instanceof ShapeElementModel);
}
export function isConnectable(element) {
    return !!element && element.connectable;
}
export function getSelectionBoxBound(viewport, bound) {
    const { w, h } = bound;
    const [x, y] = viewport.toViewCoord(bound.x, bound.y);
    return new DOMRect(x, y, w * viewport.zoom, h * viewport.zoom);
}
// https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
export function getCursorMode(edgelessTool) {
    if (!edgelessTool) {
        return 'default';
    }
    switch (edgelessTool.type) {
        case 'default':
            return 'default';
        case 'pan':
            return edgelessTool.panning ? 'grabbing' : 'grab';
        case 'brush':
        case 'eraser':
        case 'shape':
        case 'connector':
        case 'frame':
        case 'lasso':
            return 'crosshair';
        case 'text':
            return 'text';
        default:
            return 'default';
    }
}
export function getBackgroundGrid(zoom, showGrid) {
    const step = zoom < 0.5 ? 2 : 1 / (Math.floor(zoom) || 1);
    const gap = clamp(20 * step * zoom, GRID_GAP_MIN, GRID_GAP_MAX);
    return {
        gap,
        grid: showGrid
            ? 'radial-gradient(var(--affine-edgeless-grid-color) 1px, var(--affine-background-primary-color) 1px)'
            : 'unset',
    };
}
export function getSelectedRect(selected) {
    if (selected.length === 0) {
        return new DOMRect();
    }
    const lockedElementsByFrame = selected
        .map(selectable => {
        if (selectable instanceof FrameBlockModel && selectable.isLocked()) {
            return selectable.descendantElements;
        }
        return [];
    })
        .flat();
    selected = [...new Set([...selected, ...lockedElementsByFrame])];
    if (selected.length === 1) {
        const [x, y, w, h] = deserializeXYWH(selected[0].xywh);
        return new DOMRect(x, y, w, h);
    }
    return getElementsWithoutGroup(selected).reduce((bounds, selectable, index) => {
        const rotate = isTopLevelBlock(selectable) ? 0 : selectable.rotate;
        const [x, y, w, h] = deserializeXYWH(selectable.xywh);
        let { left, top, right, bottom } = getQuadBoundWithRotation({
            x,
            y,
            w,
            h,
            rotate,
        });
        if (index !== 0) {
            left = Math.min(left, bounds.left);
            top = Math.min(top, bounds.top);
            right = Math.max(right, bounds.right);
            bottom = Math.max(bottom, bounds.bottom);
        }
        bounds.x = left;
        bounds.y = top;
        bounds.width = right - left;
        bounds.height = bottom - top;
        return bounds;
    }, new DOMRect());
}
export function getSelectableBounds(selected) {
    const bounds = new Map();
    getElementsWithoutGroup(selected).forEach(ele => {
        const bound = Bound.deserialize(ele.xywh);
        const props = {
            bound,
            rotate: ele.rotate,
        };
        if (isCanvasElement(ele) && ele instanceof ConnectorElementModel) {
            props.path = ele.absolutePath.map(p => p.clone());
        }
        bounds.set(ele.id, props);
    });
    return bounds;
}
//# sourceMappingURL=query.js.map