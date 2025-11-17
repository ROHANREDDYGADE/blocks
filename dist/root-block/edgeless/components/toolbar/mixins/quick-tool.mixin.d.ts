import type { Constructor } from '@blocksuite/global/utils';
import type { LitElement } from 'lit';
import { type EdgelessToolbarToolClass } from './tool.mixin.js';
export declare abstract class QuickToolMixinClass extends EdgelessToolbarToolClass {
}
/**
 * Mixin for quick tool item.
 */
export declare const QuickToolMixin: <T extends Constructor<LitElement>>(SuperClass: T) => T & Constructor<QuickToolMixinClass>;
//# sourceMappingURL=quick-tool.mixin.d.ts.map