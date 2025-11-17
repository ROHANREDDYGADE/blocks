import type { FrameBlockProps, SerializedConnectorElement, SerializedGroupElement, SerializedMindmapElement } from '@blocksuite/affine-model';
import type { BlockStdScope } from '@blocksuite/block-std';
import { ConnectorElementModel } from '@blocksuite/affine-model';
import { type GfxModel, type SerializedElement } from '@blocksuite/block-std/gfx';
import { type BlockSnapshot, Job } from '@blocksuite/store';
/**
 * return all elements in the tree of the elements
 */
export declare function getSortedCloneElements(elements: GfxModel[]): GfxModel[];
export declare function prepareCloneData(elements: GfxModel[], std: BlockStdScope): (SerializedElement | BlockSnapshot)[];
export declare function serializeElement(element: GfxModel, elements: GfxModel[], job: Job): SerializedElement | {
    type: "block";
    id: string;
    flavour: string;
    version?: number;
    props: Record<string, unknown>;
    children: BlockSnapshot[];
} | undefined;
export declare function serializeConnector(connector: ConnectorElementModel, elements: GfxModel[]): SerializedConnectorElement;
/**
 * There are interdependencies between elements,
 * so they must be added in a certain order
 * @param elements edgeless model list
 * @returns sorted edgeless model list
 */
export declare function sortEdgelessElements(elements: GfxModel[]): GfxModel[];
/**
 * map connector source & target ids
 * @param props serialized element props
 * @param ids old element id to new element id map
 * @returns updated element props
 */
export declare function mapConnectorIds(props: SerializedConnectorElement, ids: Map<string, string>): SerializedConnectorElement;
/**
 * map group children ids
 * @param props serialized element props
 * @param ids old element id to new element id map
 * @returns updated element props
 */
export declare function mapGroupIds(props: SerializedGroupElement, ids: Map<string, string>): SerializedGroupElement;
/**
 * map frame children ids
 * @param props frame block props
 * @param ids old element id to new element id map
 * @returns updated frame block props
 */
export declare function mapFrameIds(props: FrameBlockProps, ids: Map<string, string>): FrameBlockProps;
/**
 * map mindmap children & parent ids
 * @param props serialized element props
 * @param ids old element id to new element id map
 * @returns updated element props
 */
export declare function mapMindmapIds(props: SerializedMindmapElement, ids: Map<string, string>): SerializedMindmapElement;
export declare function getElementProps(element: BlockSuite.SurfaceModel, ids: Map<string, string>): SerializedElement;
//# sourceMappingURL=clone-utils.d.ts.map