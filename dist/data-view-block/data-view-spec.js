import { BlockViewExtension, FlavourExtension, } from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';
import { DataViewBlockService } from './database-service.js';
export const DataViewBlockSpec = [
    FlavourExtension('affine:data-view'),
    DataViewBlockService,
    BlockViewExtension('affine:data-view', literal `affine-data-view`),
];
//# sourceMappingURL=data-view-spec.js.map