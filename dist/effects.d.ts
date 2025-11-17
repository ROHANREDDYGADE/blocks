import type { BlockComponent } from '@blocksuite/block-std';
import type { BlockModel } from '@blocksuite/store';
import type { insertBookmarkCommand } from './bookmark-block/commands/insert-bookmark.js';
import type { insertEdgelessTextCommand } from './edgeless-text-block/commands/insert-edgeless-text.js';
import type { updateBlockType } from './note-block/commands/block-type.js';
import type { dedentBlock } from './note-block/commands/dedent-block.js';
import type { dedentBlockToRoot } from './note-block/commands/dedent-block-to-root.js';
import type { dedentBlocks } from './note-block/commands/dedent-blocks.js';
import type { dedentBlocksToRoot } from './note-block/commands/dedent-blocks-to-root.js';
import type { focusBlockEnd } from './note-block/commands/focus-block-end.js';
import type { focusBlockStart } from './note-block/commands/focus-block-start.js';
import type { indentBlock } from './note-block/commands/indent-block.js';
import type { indentBlocks } from './note-block/commands/indent-blocks.js';
import type { selectBlock } from './note-block/commands/select-block.js';
import type { selectBlocksBetween } from './note-block/commands/select-blocks-between.js';
import { type AttachmentBlockService } from './attachment-block/index.js';
import { type BookmarkBlockService } from './bookmark-block/index.js';
import { type CodeBlockConfig } from './code-block/index.js';
import { type DatabaseBlockService } from './database-block/index.js';
import { type ImageBlockService } from './image-block/index.js';
import { type NoteBlockService } from './note-block/index.js';
import { type RootBlockConfig, type RootService } from './root-block/index.js';
import { type SurfaceRefBlockService } from './surface-ref-block/index.js';
export declare function effects(): void;
declare global {
    namespace BlockSuite {
        interface Commands {
            selectBlock: typeof selectBlock;
            selectBlocksBetween: typeof selectBlocksBetween;
            focusBlockStart: typeof focusBlockStart;
            focusBlockEnd: typeof focusBlockEnd;
            indentBlocks: typeof indentBlocks;
            dedentBlock: typeof dedentBlock;
            dedentBlocksToRoot: typeof dedentBlocksToRoot;
            dedentBlocks: typeof dedentBlocks;
            indentBlock: typeof indentBlock;
            insertBookmark: typeof insertBookmarkCommand;
            updateBlockType: typeof updateBlockType;
            insertEdgelessText: typeof insertEdgelessTextCommand;
            dedentBlockToRoot: typeof dedentBlockToRoot;
        }
        interface CommandContext {
            focusBlock?: BlockComponent | null;
            anchorBlock?: BlockComponent | null;
            updatedBlocks?: BlockModel[];
            textId?: string;
        }
        interface BlockConfigs {
            'affine:code': CodeBlockConfig;
            'affine:page': RootBlockConfig;
        }
        interface BlockServices {
            'affine:note': NoteBlockService;
            'affine:page': RootService;
            'affine:attachment': AttachmentBlockService;
            'affine:bookmark': BookmarkBlockService;
            'affine:database': DatabaseBlockService;
            'affine:image': ImageBlockService;
            'affine:surface-ref': SurfaceRefBlockService;
        }
    }
}
//# sourceMappingURL=effects.d.ts.map