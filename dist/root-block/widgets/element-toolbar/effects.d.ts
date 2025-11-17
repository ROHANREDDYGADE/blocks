import { EdgelessAddFrameButton } from './add-frame-button.js';
import { EdgelessAddGroupButton } from './add-group-button.js';
import { EdgelessAlignButton } from './align-button.js';
import { EdgelessChangeAttachmentButton } from './change-attachment-button.js';
import { EdgelessChangeBrushButton } from './change-brush-button.js';
import { EdgelessChangeConnectorButton } from './change-connector-button.js';
import { EdgelessChangeEmbedCardButton } from './change-embed-card-button.js';
import { EdgelessChangeFrameButton } from './change-frame-button.js';
import { EdgelessChangeGroupButton } from './change-group-button.js';
import { EdgelessChangeMindmapButton, EdgelessChangeMindmapLayoutPanel, EdgelessChangeMindmapStylePanel } from './change-mindmap-button.js';
import { EdgelessChangeNoteButton } from './change-note-button.js';
import { EdgelessChangeShapeButton } from './change-shape-button.js';
import { EdgelessChangeTextMenu } from './change-text-menu.js';
import { EDGELESS_ELEMENT_TOOLBAR_WIDGET, EdgelessElementToolbarWidget } from './index.js';
import { EdgelessLockButton } from './lock-button.js';
import { EdgelessMoreButton } from './more-menu/button.js';
import { EdgelessReleaseFromGroupButton } from './release-from-group-button.js';
export declare function effects(): void;
declare global {
    interface HTMLElementTagNameMap {
        [EDGELESS_ELEMENT_TOOLBAR_WIDGET]: EdgelessElementToolbarWidget;
        'edgeless-add-frame-button': EdgelessAddFrameButton;
        'edgeless-add-group-button': EdgelessAddGroupButton;
        'edgeless-align-button': EdgelessAlignButton;
        'edgeless-change-attachment-button': EdgelessChangeAttachmentButton;
        'edgeless-change-brush-button': EdgelessChangeBrushButton;
        'edgeless-change-connector-button': EdgelessChangeConnectorButton;
        'edgeless-change-embed-card-button': EdgelessChangeEmbedCardButton;
        'edgeless-change-frame-button': EdgelessChangeFrameButton;
        'edgeless-change-group-button': EdgelessChangeGroupButton;
        'edgeless-change-mindmap-style-panel': EdgelessChangeMindmapStylePanel;
        'edgeless-change-mindmap-layout-panel': EdgelessChangeMindmapLayoutPanel;
        'edgeless-change-mindmap-button': EdgelessChangeMindmapButton;
        'edgeless-change-note-button': EdgelessChangeNoteButton;
        'edgeless-change-shape-button': EdgelessChangeShapeButton;
        'edgeless-change-text-menu': EdgelessChangeTextMenu;
        'edgeless-release-from-group-button': EdgelessReleaseFromGroupButton;
        'edgeless-more-button': EdgelessMoreButton;
        'edgeless-lock-button': EdgelessLockButton;
    }
}
//# sourceMappingURL=effects.d.ts.map