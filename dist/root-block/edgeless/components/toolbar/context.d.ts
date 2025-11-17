import type { ColorScheme } from '@blocksuite/affine-model';
import type { Slot } from '@blocksuite/store';
import type { EdgelessToolbarWidget } from './edgeless-toolbar.js';
export interface EdgelessToolbarSlots {
    resize: Slot<{
        w: number;
        h: number;
    }>;
}
export declare const edgelessToolbarSlotsContext: {
    __context__: EdgelessToolbarSlots;
};
export declare const edgelessToolbarThemeContext: {
    __context__: ColorScheme;
};
export declare const edgelessToolbarContext: {
    __context__: EdgelessToolbarWidget;
};
//# sourceMappingURL=context.d.ts.map