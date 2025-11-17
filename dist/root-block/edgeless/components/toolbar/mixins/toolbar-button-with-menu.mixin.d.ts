import type { Constructor } from '@blocksuite/global/utils';
import type { LitElement } from 'lit';
import { type EdgelessToolbarToolClass } from './tool.mixin.js';
export declare abstract class ToolbarButtonWithMenuClass extends EdgelessToolbarToolClass {
}
export declare const ToolbarButtonWithMenuMixin: <T extends Constructor<LitElement> = Constructor<LitElement>>(SuperClass: T) => T & Constructor<ToolbarButtonWithMenuClass>;
//# sourceMappingURL=toolbar-button-with-menu.mixin.d.ts.map