import { SurfaceBlockSchema } from '@blocksuite/affine-block-surface';
import { RootBlockSchema } from '@blocksuite/affine-model';
import { DocModeService, ThemeService, } from '@blocksuite/affine-shared/services';
import { BlockViewExtension, FlavourExtension, } from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';
import { MindmapService } from './minmap-service.js';
import { MindmapSurfaceBlockService } from './surface-service.js';
export const MiniMindmapSpecs = [
    DocModeService,
    ThemeService,
    FlavourExtension('affine:page'),
    MindmapService,
    BlockViewExtension('affine:page', literal `mini-mindmap-root-block`),
    FlavourExtension('affine:surface'),
    MindmapSurfaceBlockService,
    BlockViewExtension('affine:surface', literal `mini-mindmap-surface-block`),
];
export const MiniMindmapSchema = [
    RootBlockSchema,
    SurfaceBlockSchema,
];
//# sourceMappingURL=spec.js.map