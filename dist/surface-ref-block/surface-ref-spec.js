import { BlockViewExtension, CommandExtension, FlavourExtension, WidgetViewMapExtension, } from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';
import { commands } from './commands.js';
import { SurfaceRefBlockService } from './surface-ref-service.js';
export const PageSurfaceRefBlockSpec = [
    FlavourExtension('affine:surface-ref'),
    SurfaceRefBlockService,
    CommandExtension(commands),
    BlockViewExtension('affine:surface-ref', literal `affine-surface-ref`),
    WidgetViewMapExtension('affine:surface-ref', {
        surfaceToolbar: literal `affine-surface-ref-toolbar`,
    }),
];
export const EdgelessSurfaceRefBlockSpec = [
    FlavourExtension('affine:surface-ref'),
    SurfaceRefBlockService,
    BlockViewExtension('affine:surface-ref', literal `affine-edgeless-surface-ref`),
];
//# sourceMappingURL=surface-ref-spec.js.map