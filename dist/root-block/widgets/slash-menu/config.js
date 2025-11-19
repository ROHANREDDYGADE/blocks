import { FigmaIcon, GithubIcon, LoomIcon, YoutubeIcon, } from '@blocksuite/affine-block-embed';
import { ArrowDownBigIcon, ArrowUpBigIcon, CopyIcon, DatabaseKanbanViewIcon20, DatabaseTableViewIcon20, DeleteIcon, FileIcon, FrameIcon, HeadingIcon, ImageIcon20, LinkedDocIcon, LinkIcon, NewDocIcon, NowIcon, TodayIcon, TomorrowIcon, YesterdayIcon, } from '@blocksuite/affine-components/icons';
import { getInlineEditorByModel, insertContent, REFERENCE_NODE, textFormatConfigs, } from '@blocksuite/affine-components/rich-text';
import { toast } from '@blocksuite/affine-components/toast';
import { TelemetryProvider } from '@blocksuite/affine-shared/services';
import { createDefaultDoc, openFileOrFiles, } from '@blocksuite/affine-shared/utils';
import { viewPresets } from '@blocksuite/data-view/view-presets';
import { assertType } from '@blocksuite/global/utils';
import { DualLinkIcon, GroupingIcon, TeXIcon } from '@blocksuite/icons/lit';
import { Slice, Text } from '@blocksuite/store';
import { toggleEmbedCardCreateModal } from '../../../_common/components/embed-card/modal/embed-card-create-modal.js';
import { textConversionConfigs } from '../../../_common/configs/text-conversion.js';
import { addSiblingAttachmentBlocks } from '../../../attachment-block/utils.js';
import { getSurfaceBlock } from '../../../surface-ref-block/utils.js';
import { formatDate, formatTime } from '../../utils/misc.js';
import { slashMenuToolTips } from './tooltips/index.js';
import { createConversionItem, createTextFormatItem, insideEdgelessText, tryRemoveEmptyLine, } from './utils.js';
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

// AES settings (copy yours here)
const AesConfig = {
SecretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
  SecretIv: process.env.NEXT_PUBLIC_IV,
};

const decryptDataWithIv = (encryptedData) => {
  try {
    const iv = CryptoJS.enc.Utf8.parse(AesConfig.SecretIv);
    const key = CryptoJS.enc.Utf8.parse(AesConfig.SecretKey);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error(err);
  }
};

const getJwtToken = () => {
  try {
    const qwise_access_token = Cookies.get("qwise_access_token");
    if (qwise_access_token) {
      const decrypted = decryptDataWithIv(qwise_access_token);
      const authenticated = JSON.parse(decrypted);
      return authenticated.jwt_token || "";
    }
  } catch (error) {
    console.log("JWT token error", error);
  }
  return "";
};
const getUserInfo = () => {
	try {
		const qwise_access_token = Cookies.get("qwise_access_token");
		if (qwise_access_token) {
			const decrypted_data = decryptDataWithIv(qwise_access_token);
			const authenticated = JSON.parse(decrypted_data);
			const user_info = authenticated["user_info"]
			return user_info
		} 		
	} catch (error) {
		console.log("is auth empty error",error)
	}
	return ""
}


const jwtToken = getJwtToken();
const userInfo = getUserInfo();
export const defaultSlashMenuConfig = {
    triggerKeys: ['/'],
    ignoreBlockTypes: ['affine:code'],
    maxHeight: 344,
    tooltipTimeout: 800,
    items: [
        // ---------------------------------------------------------
        { groupName: 'Basic' },
        ...textConversionConfigs
            .filter(i => i.type && ['h1', 'h2', 'h3', 'text'].includes(i.type))
            .map(createConversionItem),
        {
            name: 'Other Headings',
            icon: HeadingIcon,
            subMenu: [
                { groupName: 'Headings' },
                ...textConversionConfigs
                    .filter(i => i.type && ['h4', 'h5', 'h6'].includes(i.type))
                    .map(createConversionItem),
            ],
        },
        ...textConversionConfigs
            .filter(i => i.flavour === 'affine:code')
            .map(createConversionItem),
        ...textConversionConfigs
            .filter(i => i.type && ['divider', 'quote'].includes(i.type))
            .map(config => ({
            ...createConversionItem(config),
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has(config.flavour) &&
                !insideEdgelessText(model),
        })),
        {
            name: 'Inline equation',
            description: 'Create a equation block.',
            icon: TeXIcon({
                width: '20',
                height: '20',
            }),
            alias: ['inlineMath, inlineEquation', 'inlineLatex'],
            action: ({ rootComponent }) => {
                rootComponent.std.command
                    .chain()
                    .getTextSelection()
                    .insertInlineLatex()
                    .run();
            },
        },
        // ---------------------------------------------------------
        { groupName: 'List' },
        ...textConversionConfigs
            .filter(i => i.flavour === 'affine:list')
            .map(createConversionItem),
        // ---------------------------------------------------------
        { groupName: 'Style' },
        ...textFormatConfigs
            .filter(i => !['Code', 'Link'].includes(i.name))
            .map(createTextFormatItem),
        // ---------------------------------------------------------
        {
            groupName: 'Page',
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:embed-linked-doc'),
        },
        {
            name: 'New Doc',
            description: 'Start a new document.',
            icon: NewDocIcon,
            tooltip: slashMenuToolTips['New Doc'],
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:embed-linked-doc'),
            action: ({ rootComponent, model }) => {
                const newDoc = createDefaultDoc(rootComponent.doc.collection);
                insertContent(rootComponent.host, model, REFERENCE_NODE, {
                    reference: {
                        type: 'LinkedPage',
                        pageId: newDoc.id,
                    },
                });
            },
        },
{
    name: 'Link Document',
    description: 'Link to a document as a bookmark card',
    icon: LinkIcon,
    tooltip: 'Insert a linked document as a card',
    alias: ['doc link', 'document'],
    showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:bookmark'),
    
    action: async ({ rootComponent, model }) => {
        const parentModel = rootComponent.doc.getParent(model);
        if (!parentModel) return;

        // 1️⃣ Fetch documents from API
        let docs = [];
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_NFAPI_BASE_URL}api/v1/notes/list_vector_files`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${jwtToken}`
                    },
                    body: JSON.stringify({ data: {} })
                }
            );

            const result = await response.json();
            docs = result?.data?.completed?.documents ?? [];
        } catch (error) {
            console.error("Error fetching documents:", error);
            return;
        }

        if (docs.length === 0) {
            console.warn("No documents found");
            return;
        }

        // 2️⃣ Show custom modal to select document
        const selectedDoc = await showDocumentSelectorModal(rootComponent.host, docs);
        
        if (!selectedDoc) return; // User cancelled

        // 3️⃣ Build the editor URL
        const editorUrl = buildEditorUrl(selectedDoc);

        // 4️⃣ Insert bookmark card with the document link
        const index = parentModel.children.indexOf(model) + 1;
        
        const bookmarkId = rootComponent.doc.addBlock(
            'affine:bookmark',
            {
                url: editorUrl,
                title: `${selectedDoc.filename}.${selectedDoc.file_type}`,
                description: `Created: ${selectedDoc.created}`,
            },
            parentModel,
            index
        );

        // 5️⃣ Remove empty line if present
        tryRemoveEmptyLine(model);

        // 6️⃣ Select the newly created bookmark
        rootComponent.host.selection.setGroup('note', [
            rootComponent.host.selection.create('block', {
                blockId: bookmarkId,
            }),
        ]);
    },
}

,
        // ---------------------------------------------------------
        // { groupName: 'Mentions' },
{ groupName: 'Mentions' },
{
    name: '@Mention',
    description: 'Mention a team member.',
    icon: DualLinkIcon({ width: '20', height: '20' }),
    alias: ['mention', 'at', 'tag'],
    tooltip: 'Mention a team member',
    action: async ({ rootComponent, model }) => {
        try {
            
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_NFAPI_BASE_URL}api/v1/wise/superapp/superapp_list_all_app_members`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Token ${jwtToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: {
                            sidemenu: true
                        }
                    })
                }
            );
            
            const data = await response.json();
            
            if (data.status && data.data && data.data.length > 0) {
                showMentionPopup(rootComponent, model, data.data);
            } else {
                toast(rootComponent.host, 'No team members found');
            }
        } catch (error) {
            console.error('Error:', error);
            toast(rootComponent.host, 'Failed to load team members');
        }
    },
},
        // ---------------------------------------------------------
        { groupName: 'Content & Media' },
        {
            name: 'Image',
            description: 'Insert an image.',
            icon: ImageIcon20,
            tooltip: slashMenuToolTips['Image'],
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:image'),
            action: async ({ rootComponent }) => {
                const [success, ctx] = rootComponent.std.command
                    .chain()
                    .getSelectedModels()
                    .insertImages({ removeEmptyLine: true })
                    .run();
                if (success)
                    await ctx.insertedImageIds;
            },
        },
{
    name: 'Cover Image',
    description: 'Add a cover image at the top of the page.',
    icon: ImageIcon20,
    tooltip: 'Add cover image to page',
    alias: ['cover', 'header', 'banner'],
    showWhen: ({ model, rootComponent }) => {
        const doc = rootComponent.doc;
        const parent = doc.getParent(model);
        return parent && parent.flavour === 'affine:note';
    },
    action: async ({ rootComponent, model }) => {
        try {
            const doc = rootComponent.doc;
            
            // ✅ STEP 1: Find and DELETE existing cover block + its blob
            const paragraphs = doc.getBlocksByFlavour('affine:paragraph');
            
            for (const blockInstance of paragraphs) {
                const block = blockInstance.model;
                if (block && block.type === 'cover-image' && block.coverData) {
                    console.log("🗑️ Removing old cover block:", block.id);
                    
                    // Delete the old blob from storage
                    if (block.coverData.blobId) {
                        try {
                            await doc.collection.blobSync.delete(block.coverData.blobId);
                            console.log("🗑️ Deleted old blob:", block.coverData.blobId);
                        } catch (err) {
                            console.warn("⚠️ Could not delete old blob:", err);
                        }
                    }
                    
                    // Delete the cover block
                    doc.deleteBlock(block);
                    
                    // Remove cover UI from DOM
                    const oldCoverUI = document.querySelector('.page-cover-container');
                    if (oldCoverUI) oldCoverUI.remove();
                }
            }
            
            // ✅ STEP 2: Add new cover image
            const file = await openFileOrFiles({ acceptType: 'Images', multiple: false });
            if (!file) return;
            
            const imageFile = Array.isArray(file) ? file[0] : file;
            
            if (imageFile.size > 5 * 1024 * 1024) {
                toast(rootComponent.host, 'Image too large. Max 5MB.');
                return;
            }
            
            // Store in BlockSuite's blob storage
            const storage = doc.collection.blobSync;
            const blobId = await storage.set(imageFile);
            
            // Create new cover block at position 0 (top)
            const pageBlock = doc.getBlockByFlavour('affine:page')[0];
            if (!pageBlock) return;
            
            const noteBlock = pageBlock.children[0];
            if (!noteBlock) return;
            
            const coverBlockId = doc.addBlock(
                'affine:paragraph',
                {
                    type: 'cover-image',
                    text: new doc.Text(''),
                    coverData: {
                        blobId: blobId,
                        height: 200,
                        fitMode: 'contain',
                        timestamp: Date.now()
                    }
                },
                noteBlock,
                0
            );
            
            const coverBlock = doc.getBlock(coverBlockId)?.model;
            
            if (coverBlock) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    renderCoverImageFromBlock(rootComponent, coverBlock);
                    toast(rootComponent.host, 'Cover image added');
                };
                reader.readAsDataURL(imageFile);
            }
            
            tryRemoveEmptyLine(model);
            
        } catch (error) {
            console.error('Error adding cover:', error);
            toast(rootComponent.host, 'Failed to add cover image');
        }
    },
}

,


        {
            name: 'Link',
            description: 'Add a bookmark for reference.',
            icon: LinkIcon,
            tooltip: slashMenuToolTips['Link'],
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:bookmark'),
            action: async ({ rootComponent, model }) => {
                const parentModel = rootComponent.doc.getParent(model);
                if (!parentModel) {
                    return;
                }
                const index = parentModel.children.indexOf(model) + 1;
                await toggleEmbedCardCreateModal(rootComponent.host, 'Links', 'The added link will be displayed as a card view.', { mode: 'page', parentModel, index });
                tryRemoveEmptyLine(model);
            },
        },
        {
            name: 'Attachment',
            description: 'Attach a file to document.',
            icon: FileIcon,
            tooltip: slashMenuToolTips['Attachment'],
            alias: ['file'],
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:attachment'),
            action: async ({ rootComponent, model }) => {
                const file = await openFileOrFiles();
                if (!file)
                    return;
                const attachmentService = rootComponent.std.getService('affine:attachment');
                if (!attachmentService)
                    return;
                const maxFileSize = attachmentService.maxFileSize;
                await addSiblingAttachmentBlocks(rootComponent.host, [file], maxFileSize, model);
                tryRemoveEmptyLine(model);
            },
        },
        {
            name: 'YouTube',
            description: 'Embed a YouTube video.',
            icon: YoutubeIcon,
            tooltip: slashMenuToolTips['YouTube'],
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:embed-youtube'),
            action: async ({ rootComponent, model }) => {
                const parentModel = rootComponent.doc.getParent(model);
                if (!parentModel) {
                    return;
                }
                const index = parentModel.children.indexOf(model) + 1;
                await toggleEmbedCardCreateModal(rootComponent.host, 'YouTube', 'The added YouTube video link will be displayed as an embed view.', { mode: 'page', parentModel, index });
                tryRemoveEmptyLine(model);
            },
        },
        {
            name: 'GitHub',
            description: 'Link to a GitHub repository.',
            icon: GithubIcon,
            tooltip: slashMenuToolTips['Github'],
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:embed-github'),
            action: async ({ rootComponent, model }) => {
                const parentModel = rootComponent.doc.getParent(model);
                if (!parentModel) {
                    return;
                }
                const index = parentModel.children.indexOf(model) + 1;
                await toggleEmbedCardCreateModal(rootComponent.host, 'GitHub', 'The added GitHub issue or pull request link will be displayed as a card view.', { mode: 'page', parentModel, index });
                tryRemoveEmptyLine(model);
            },
        },
        // TODO: X Twitter
        {
            name: 'Figma',
            description: 'Embed a Figma document.',
            icon: FigmaIcon,
            tooltip: slashMenuToolTips['Figma'],
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:embed-figma'),
            action: async ({ rootComponent, model }) => {
                const parentModel = rootComponent.doc.getParent(model);
                if (!parentModel) {
                    return;
                }
                const index = parentModel.children.indexOf(model) + 1;
                await toggleEmbedCardCreateModal(rootComponent.host, 'Figma', 'The added Figma link will be displayed as an embed view.', { mode: 'page', parentModel, index });
                tryRemoveEmptyLine(model);
            },
        },
        {
            name: 'Loom',
            icon: LoomIcon,
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:embed-loom'),
            action: async ({ rootComponent, model }) => {
                const parentModel = rootComponent.doc.getParent(model);
                if (!parentModel) {
                    return;
                }
                const index = parentModel.children.indexOf(model) + 1;
                await toggleEmbedCardCreateModal(rootComponent.host, 'Loom', 'The added Loom video link will be displayed as an embed view.', { mode: 'page', parentModel, index });
                tryRemoveEmptyLine(model);
            },
        },
        {
            name: 'Equation',
            description: 'Create a equation block.',
            icon: TeXIcon({
                width: '20',
                height: '20',
            }),
            alias: ['mathBlock, equationBlock', 'latexBlock'],
            action: ({ rootComponent }) => {
                rootComponent.std.command
                    .chain()
                    .getSelectedModels()
                    .insertLatexBlock({
                    place: 'after',
                    removeEmptyLine: true,
                })
                    .run();
            },
        },
        // TODO(@L-Sun): Linear
        // ---------------------------------------------------------
        ({ model, rootComponent }) => {
            const { doc } = rootComponent;
            const surfaceModel = getSurfaceBlock(doc);
            if (!surfaceModel)
                return [];
            const parent = doc.getParent(model);
            if (!parent)
                return [];
            const frameModels = doc
                .getBlocksByFlavour('affine:frame')
                .map(block => block.model);
            const frameItems = frameModels.map(frameModel => ({
                name: 'Frame: ' + frameModel.title,
                icon: FrameIcon,
                action: ({ rootComponent }) => {
                    rootComponent.std.command
                        .chain()
                        .getSelectedModels()
                        .insertSurfaceRefBlock({
                        reference: frameModel.id,
                        place: 'after',
                        removeEmptyLine: true,
                    })
                        .run();
                },
            }));
            const groupElements = surfaceModel.getElementsByType('group');
            const groupItems = groupElements.map(group => ({
                name: 'Group: ' + group.title.toString(),
                icon: GroupingIcon(),
                action: () => {
                    rootComponent.std.command
                        .chain()
                        .getSelectedModels()
                        .insertSurfaceRefBlock({
                        reference: group.id,
                        place: 'after',
                        removeEmptyLine: true,
                    })
                        .run();
                },
            }));
            const items = [...frameItems, ...groupItems];
            if (items.length !== 0) {
                return [
                    {
                        groupName: 'Document Group & Frame',
                    },
                    ...items,
                ];
            }
            else {
                return [];
            }
        },
        // ---------------------------------------------------------
        { groupName: 'Date' },
        () => {
            const now = new Date();
            const tomorrow = new Date();
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return [
                {
                    name: 'Today',
                    icon: TodayIcon,
                    tooltip: slashMenuToolTips['Today'],
                    description: formatDate(now),
                    action: ({ rootComponent, model }) => {
                        insertContent(rootComponent.host, model, formatDate(now));
                    },
                },
                {
                    name: 'Tomorrow',
                    icon: TomorrowIcon,
                    tooltip: slashMenuToolTips['Tomorrow'],
                    description: formatDate(tomorrow),
                    action: ({ rootComponent, model }) => {
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        insertContent(rootComponent.host, model, formatDate(tomorrow));
                    },
                },
                {
                    name: 'Yesterday',
                    icon: YesterdayIcon,
                    tooltip: slashMenuToolTips['Yesterday'],
                    description: formatDate(yesterday),
                    action: ({ rootComponent, model }) => {
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        insertContent(rootComponent.host, model, formatDate(yesterday));
                    },
                },
                {
                    name: 'Now',
                    icon: NowIcon,
                    tooltip: slashMenuToolTips['Now'],
                    description: formatTime(now),
                    action: ({ rootComponent, model }) => {
                        insertContent(rootComponent.host, model, formatTime(now));
                    },
                },
            ];
        },
        // ---------------------------------------------------------
        { groupName: 'Database' },
        {
            name: 'Table View',
            description: 'Display items in a table format.',
            alias: ['database'],
            icon: DatabaseTableViewIcon20,
            tooltip: slashMenuToolTips['Table View'],
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:database') &&
                !insideEdgelessText(model),
            action: ({ rootComponent }) => {
                rootComponent.std.command
                    .chain()
                    .getSelectedModels()
                    .insertDatabaseBlock({
                    viewType: viewPresets.tableViewMeta.type,
                    place: 'after',
                    removeEmptyLine: true,
                })
                    .inline(({ insertedDatabaseBlockId }) => {
                    if (insertedDatabaseBlockId) {
                        const telemetry = rootComponent.std.getOptional(TelemetryProvider);
                        telemetry?.track('AddDatabase', {
                            blockId: insertedDatabaseBlockId,
                        });
                    }
                })
                    .run();
            },
        },
        {
            name: 'Todo',
            alias: ['todo view'],
            icon: DatabaseTableViewIcon20,
            tooltip: slashMenuToolTips['Todo'],
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:database') &&
                !insideEdgelessText(model) &&
                !!model.doc.awarenessStore.getFlag('enable_block_query'),
            action: ({ model, rootComponent }) => {
                const parent = rootComponent.doc.getParent(model);
                if (!parent)
                    return;
                const index = parent.children.indexOf(model);
                const id = rootComponent.doc.addBlock('affine:data-view', {}, rootComponent.doc.getParent(model), index + 1);
                const dataViewModel = rootComponent.doc.getBlock(id);
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                Promise.resolve().then(() => {
                    const dataView = rootComponent.std.view.getBlock(dataViewModel.id);
                    dataView?.dataSource.viewManager.viewAdd('table');
                });
                tryRemoveEmptyLine(model);
            },
        },
        {
            name: 'Kanban View',
            description: 'Visualize data in a dashboard.',
            alias: ['database'],
            icon: DatabaseKanbanViewIcon20,
            tooltip: slashMenuToolTips['Kanban View'],
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:database') &&
                !insideEdgelessText(model),
            action: ({ rootComponent }) => {
                rootComponent.std.command
                    .chain()
                    .getSelectedModels()
                    .insertDatabaseBlock({
                    viewType: viewPresets.kanbanViewMeta.type,
                    place: 'after',
                    removeEmptyLine: true,
                })
                    .inline(({ insertedDatabaseBlockId }) => {
                    if (insertedDatabaseBlockId) {
                        const telemetry = rootComponent.std.getOptional(TelemetryProvider);
                        telemetry?.track('AddDatabase', {
                            blockId: insertedDatabaseBlockId,
                        });
                    }
                })
                    .run();
            },
        },
        // ---------------------------------------------------------
        { groupName: 'Actions' },
        {
            name: 'Move Up',
            description: 'Shift this line up.',
            icon: ArrowUpBigIcon,
            tooltip: slashMenuToolTips['Move Up'],
            action: ({ rootComponent, model }) => {
                const doc = rootComponent.doc;
                const previousSiblingModel = doc.getPrev(model);
                if (!previousSiblingModel)
                    return;
                const parentModel = doc.getParent(previousSiblingModel);
                if (!parentModel)
                    return;
                doc.moveBlocks([model], parentModel, previousSiblingModel, true);
            },
        },
        {
            name: 'Move Down',
            description: 'Shift this line down.',
            icon: ArrowDownBigIcon,
            tooltip: slashMenuToolTips['Move Down'],
            action: ({ rootComponent, model }) => {
                const doc = rootComponent.doc;
                const nextSiblingModel = doc.getNext(model);
                if (!nextSiblingModel)
                    return;
                const parentModel = doc.getParent(nextSiblingModel);
                if (!parentModel)
                    return;
                doc.moveBlocks([model], parentModel, nextSiblingModel, false);
            },
        },
        {
            name: 'Copy',
            description: 'Copy this line to clipboard.',
            icon: CopyIcon,
            tooltip: slashMenuToolTips['Copy'],
            action: ({ rootComponent, model }) => {
                const slice = Slice.fromModels(rootComponent.std.doc, [model]);
                rootComponent.std.clipboard
                    .copy(slice)
                    .then(() => {
                    toast(rootComponent.host, 'Copied to clipboard');
                })
                    .catch(e => {
                    console.error(e);
                });
            },
        },
        {
            name: 'Duplicate',
            description: 'Create a duplicate of this line.',
            icon: DualLinkIcon({ width: '20', height: '20' }),
            tooltip: slashMenuToolTips['Copy'],
            action: ({ rootComponent, model }) => {
                if (!model.text || !(model.text instanceof Text)) {
                    console.error("Can't duplicate a block without text");
                    return;
                }
                const parent = rootComponent.doc.getParent(model);
                if (!parent) {
                    console.error('Failed to duplicate block! Parent not found: ' +
                        model.id +
                        '|' +
                        model.flavour);
                    return;
                }
                const index = parent.children.indexOf(model);
                // TODO add clone model util
                rootComponent.doc.addBlock(model.flavour, {
                    type: model.type,
                    text: new rootComponent.doc.Text(model.text.toDelta()),
                    // @ts-expect-error
                    checked: model.checked,
                }, rootComponent.doc.getParent(model), index);
            },
        },
        {
            name: 'Delete',
            description: 'Remove this line permanently.',
            alias: ['remove'],
            icon: DeleteIcon,
            tooltip: slashMenuToolTips['Delete'],
            action: ({ rootComponent, model }) => {
                rootComponent.doc.deleteBlock(model);
            },
        },
    ],
};
function showMentionPopup(rootComponent, model, members) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        width: 400px;
        max-height: 500px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    `;
    
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        padding: 16px;
        border-bottom: 1px solid #e0e0e0;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search members...';
    searchInput.style.cssText = `
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        outline: none;
    `;
    searchInput.addEventListener('focus', () => {
        searchInput.style.borderColor = '#4CAF50';
    });
    searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = '#ddd';
    });
    
    searchContainer.appendChild(searchInput);
    
    const membersList = document.createElement('div');
    membersList.style.cssText = `
        overflow-y: auto;
        max-height: 350px;
        padding: 8px 0;
    `;
    
    let filteredMembers = [...members];
    let selectedIndex = 0;
    
    function renderMembers(searchTerm = '') {
        filteredMembers = members.filter(member => 
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        membersList.innerHTML = '';
        
        if (filteredMembers.length === 0) {
            const noResults = document.createElement('div');
            noResults.textContent = 'No members found';
            noResults.style.cssText = `
                padding: 16px;
                text-align: center;
                color: #999;
            `;
            membersList.appendChild(noResults);
            return;
        }
        
        filteredMembers.forEach((member, index) => {
            const memberItem = document.createElement('div');
            memberItem.className = 'mention-member-item';
            memberItem.dataset.index = index;
            memberItem.style.cssText = `
                padding: 12px 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 12px;
                transition: background 0.2s;
                position: relative;
                ${index === selectedIndex ? 'background: #f0f0f0;' : ''}
            `;
            
            memberItem.addEventListener('mouseenter', (e) => {
                selectedIndex = index;
                // Update all items' background
                document.querySelectorAll('.mention-member-item').forEach((item, idx) => {
                    item.style.background = idx === index ? '#f0f0f0' : 'transparent';
                });
                
                // Show hover card
                showHoverCard(member, e.currentTarget);
            });
            
            memberItem.addEventListener('mouseleave', () => {
                hideHoverCard();
            });
            
            memberItem.addEventListener('click', (e) => {
                e.stopPropagation();
                selectMember(member);
            });
            
            const avatar = document.createElement('img');
            avatar.src = member.image ;
            avatar.style.cssText = `
                width: 32px;
                height: 32px;
                border-radius: 50%;
                object-fit: cover;
            `;
     
            
            const info = document.createElement('div');
            info.style.cssText = `
                flex: 1;
                overflow: hidden;
            `;
            
            const name = document.createElement('div');
            name.textContent = `${member.name}${member.is_you ? ' (You)' : ''}`;
            name.style.cssText = `
                font-weight: 500;
                font-size: 14px;
                color: #333;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            `;
            
            const email = document.createElement('div');
            email.textContent = member.email;
            email.style.cssText = `
                font-size: 12px;
                color: #666;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            `;
            
            info.appendChild(name);
            info.appendChild(email);
            
            memberItem.appendChild(avatar);
            memberItem.appendChild(info);
            membersList.appendChild(memberItem);
        });
    }
    
    let hoverCard = null;
    let hoverTimeout = null;
    

function showHoverCard(member, rect) {
    hideHoverCard();

    hoverCard = document.createElement("div");
    hoverCard.className = "mention-hover-card";
    hoverCard.style.cssText = `
        position: fixed;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,.15);
        padding: 16px;
        width: 260px;
        z-index: 99999;
    `;

    hoverCard.innerHTML = `
        <img src="${member.image}" style="width:48px;height:48px;border-radius:50%;display:block;margin:0 auto 10px"/>
        <div style="text-align:center;font-weight:600">${member.name}</div>
        <div style="text-align:center;font-size:12px;color:#666">${member.email}</div>
    `;

    document.body.appendChild(hoverCard);

    hoverCard.style.left = rect.left + "px";
    hoverCard.style.top = rect.bottom + 5 + "px";
}

function hideHoverCard() {
    if (hoverCard) {
        hoverCard.remove();
        hoverCard = null;
    }
}

 document.addEventListener("mouseover", (e) => {
    const el = e.target.closest("[data-mention-id]");
    if (!el) return;

    const rect = el.getBoundingClientRect();

    showHoverCard({
        name: el.dataset.mentionName,
        email: el.dataset.mentionEmail,
        image: el.dataset.mentionImage
    }, rect);
});

document.addEventListener("mouseout", (e) => {
    if (e.relatedTarget && e.relatedTarget.closest(".mention-hover-card")) return;
    hideHoverCard();
});
   
function selectMember(member) {
    hideHoverCard();

    try {
        const inlineEditor = getInlineEditorByModel(rootComponent.host, model);
        const mentionText = `@${member.name}`;
        const profileUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/people?user=${member.id}&reg=${member.is_registered ? 1 : 0}`;

        if (inlineEditor) {
            // Insert mention
            const range = inlineEditor.getInlineRange();
            
            inlineEditor.insertText(range, mentionText, {
                link: profileUrl,
                bold: true,
                color: '#000000',
                attributes: {
                    "data-mention-id": member.id,
                    "data-mention-name": member.name,
                    "data-mention-email": member.email,
                    "data-mention-image": member.image,
                    "class": "qwise-mention"
                }
            });

            // Move cursor after mention
            const newPos = range.index + mentionText.length;
            inlineEditor.setInlineRange({ index: newPos, length: 0 });

            // Add space
            inlineEditor.insertText(inlineEditor.getInlineRange(), " ");

            // Clear slash menu
            inlineEditor.clear();
        }

        toast(rootComponent.host, `Mentioned ${member.name}`);
    } catch (error) {
        console.error("Error inserting mention:", error);
    }

    closePopup();
}

    
    function closePopup() {
        hideHoverCard(); // Clean up hover card on close
        document.body.removeChild(overlay);
    }
    
    searchInput.addEventListener('input', (e) => {
        selectedIndex = 0;
        renderMembers(e.target.value);
    });
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, filteredMembers.length - 1);
            renderMembers(searchInput.value);
            
            const selectedItem = membersList.children[selectedIndex];
            if (selectedItem) {
                selectedItem.scrollIntoView({ block: 'nearest' });
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, 0);
            renderMembers(searchInput.value);
            
            const selectedItem = membersList.children[selectedIndex];
            if (selectedItem) {
                selectedItem.scrollIntoView({ block: 'nearest' });
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredMembers[selectedIndex]) {
                selectMember(filteredMembers[selectedIndex]);
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closePopup();
        }
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closePopup();
        }
    });
    
    renderMembers();
    
    popup.appendChild(searchContainer);
    popup.appendChild(membersList);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    setTimeout(() => searchInput.focus(), 100);
}
//# sourceMappingURL=config.js.map








// Function to render cover from a block
function renderCoverImageFromBlock(rootComponent, coverBlock) {
    const doc = rootComponent.doc;
    const coverData = coverBlock.coverData;
    
    if (!coverData || !coverData.blobId) return;
    
    // Retrieve blob from storage
    const storage = doc.collection.blobSync;
    storage.get(coverData.blobId).then(blob => {
        if (!blob) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            createCoverUI(rootComponent, coverBlock, e.target.result, coverData);
        };
        reader.readAsDataURL(blob);
    });
}

function createCoverUI(rootComponent, coverBlock, imageData, coverData) {
    const doc = rootComponent.doc;
    
    // Find editor root
    let editorRoot = rootComponent.host;
    while (editorRoot.parentElement) {
        if (editorRoot.classList?.contains('affine-editor-container') ||
            editorRoot.tagName === 'AFFINE-EDITOR-CONTAINER' ||
            editorRoot.parentElement.tagName === 'BODY') {
            break;
        }
        editorRoot = editorRoot.parentElement;
    }
    
    // Remove existing cover if present
    const existingCover = document.querySelector('.page-cover-container');
    if (existingCover) existingCover.remove();
    
    // Create cover container
    const coverContainer = document.createElement('div');
    coverContainer.className = 'page-cover-container';
    coverContainer.dataset.blockId = coverBlock.id;
    coverContainer.style.cssText = `
        width: 100%;
        height: ${coverData.height || 200}px;
        min-height: 200px;
        max-height: 500px;
        position: relative;
        margin-bottom: 24px;
        overflow: hidden;
        background: #f0f0f0;
        border-radius: 0;
    `;
    
    // Add image
    const img = document.createElement('img');
    img.src = imageData;
    img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: ${coverData.fitMode || 'contain'};
        object-position: center;
        display: block;
        background: #f5f5f5;
    `;
    
    // Add controls
    const controls = document.createElement('div');
    controls.className = 'cover-controls';
    controls.style.cssText = `
        position: absolute;
        bottom: 16px;
        right: 16px;
        display: flex;
        gap: 8px;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 10;
    `;
    
    // Fit mode button
    let currentFitMode = coverData.fitMode || 'contain';
    const fitBtn = createControlButton(`Fit: ${currentFitMode}`, () => {
        if (currentFitMode === 'contain') {
            currentFitMode = 'cover';
            img.style.objectFit = 'cover';
        } else if (currentFitMode === 'cover') {
            currentFitMode = 'fill';
            img.style.objectFit = 'fill';
        } else {
            currentFitMode = 'contain';
            img.style.objectFit = 'contain';
        }
        fitBtn.textContent = `Fit: ${currentFitMode}`;
        
        // Update block properties
        doc.updateBlock(coverBlock, {
            coverData: {
                ...coverBlock.coverData,
                fitMode: currentFitMode
            }
        });
    });
    
    // Change button
    const changeBtn = createControlButton('Change', async () => {
        try {
            const file = await openFileOrFiles({ acceptType: 'Images', multiple: false });
            if (!file) return;
            
            const imageFile = Array.isArray(file) ? file[0] : file;
            if (imageFile.size > 5 * 1024 * 1024) {
                toast(rootComponent.host, 'Image too large. Max 5MB.');
                return;
            }
            
            const storage = doc.collection.blobSync;
            const newBlobId = await storage.set(imageFile);
            
            // Update block
            doc.updateBlock(coverBlock, {
                coverData: {
                    ...coverBlock.coverData,
                    blobId: newBlobId
                }
            });
            
            // Update display
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
                toast(rootComponent.host, 'Cover updated');
            };
            reader.readAsDataURL(imageFile);
        } catch (error) {
            console.error('Error updating cover:', error);
        }
    });
    
    // Remove button
    const removeBtn = createControlButton('Remove', () => {
        coverContainer.remove();
        doc.deleteBlock(coverBlock);
        toast(rootComponent.host, 'Cover removed');
    });
    
    controls.appendChild(fitBtn);
    controls.appendChild(changeBtn);
    controls.appendChild(removeBtn);
    
    // Resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 8px;
        background: rgba(0, 0, 0, 0.1);
        cursor: ns-resize;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 10;
    `;
    
    let isResizing = false;
    let startY = 0;
    let startHeight = 0;
    
    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startY = e.clientY;
        startHeight = coverContainer.offsetHeight;
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        const newHeight = Math.max(200, Math.min(500, startHeight + (e.clientY - startY)));
        coverContainer.style.height = newHeight + 'px';
    });
    
    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            doc.updateBlock(coverBlock, {
                coverData: {
                    ...coverBlock.coverData,
                    height: parseInt(coverContainer.style.height)
                }
            });
        }
    });
    
    // Hover effects
    coverContainer.addEventListener('mouseenter', () => {
        controls.style.opacity = '1';
        resizeHandle.style.opacity = '1';
    });
    
    coverContainer.addEventListener('mouseleave', () => {
        controls.style.opacity = '0';
        resizeHandle.style.opacity = '0';
    });
    
    coverContainer.appendChild(img);
    coverContainer.appendChild(controls);
    coverContainer.appendChild(resizeHandle);
    
    const parent = editorRoot.parentElement || document.body;
    parent.insertBefore(coverContainer, editorRoot);
}

// Initialize covers on document load
function initializeCoverImages(rootComponent) {
    const doc = rootComponent.doc;
    
    // Find all cover blocks
    const allBlocks = doc.getBlocks();
    allBlocks.forEach(block => {
        if (block.model.flavour === 'affine:paragraph' && 
            block.model.type === 'cover-image' &&
            block.model.coverData) {
            renderCoverImageFromBlock(rootComponent, block.model);
        }
    });
}











function addCoverImageToPage(rootComponent, imageData) {
    const doc = rootComponent.doc;
    
    // ✅ SAVE TO DOCUMENT METADATA
    doc.collection.meta.setDocMeta(doc.id, {
        ...doc.collection.meta.getDocMeta(doc.id),
        coverImage: imageData,
        coverHeight: 200,
        coverFitMode: 'contain'
    });
    
    // Find the actual editor root container - need to go higher up in the DOM
    let editorRoot = rootComponent.host;
    
    // Try to find the affine-editor-container or the outermost container
    while (editorRoot.parentElement) {
        if (editorRoot.classList?.contains('affine-editor-container') ||
            editorRoot.tagName === 'AFFINE-EDITOR-CONTAINER' ||
            editorRoot.parentElement.tagName === 'BODY') {
            break;
        }
        editorRoot = editorRoot.parentElement;
    }
    
    // Check if cover already exists
    let coverContainer = document.querySelector('.page-cover-container');
    
    if (!coverContainer) {
        coverContainer = document.createElement('div');
        coverContainer.className = 'page-cover-container';
        coverContainer.style.cssText = `
            width: 100%;
            height: 200px;
            min-height: 200px;
            max-height: 500px;
            position: relative;
            margin-bottom: 24px;
            overflow: hidden;
            background: #f0f0f0;
            border-radius: 0;
        `;
        
        // Insert at the absolute top - before everything including title
        const parent = editorRoot.parentElement || document.body;
        parent.insertBefore(coverContainer, editorRoot);
    }
    
    // Clear existing content
    coverContainer.innerHTML = '';
    
    // Add image with contain to show full image
    const img = document.createElement('img');
    img.src = imageData;
    img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
        display: block;
        background: #f5f5f5;
    `;
    
    // Add controls overlay
    const controls = document.createElement('div');
    controls.className = 'cover-controls';
    controls.style.cssText = `
        position: absolute;
        bottom: 16px;
        right: 16px;
        display: flex;
        gap: 8px;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 10;
    `;
    
    // Fit mode toggle button
    let fitMode = 'fill'; // contain, cover, fill
    img.style.objectFit = 'fill';

    const fitBtn = createControlButton('Fit: Fill', () => {
        if (fitMode === 'fill') {
            fitMode = 'cover';
            fitBtn.textContent = 'Fit: Cover';
            img.style.objectFit = 'cover';
        } else if (fitMode === 'cover') {
            fitMode = 'contain';
            fitBtn.textContent = 'Fit: Contain';
            img.style.objectFit = 'contain';
        } else {
            fitMode = 'fill';
            fitBtn.textContent = 'Fit: Fill';
            img.style.objectFit = 'fill';
        }
        
        // ✅ SAVE FIT MODE TO METADATA
        const currentMeta = doc.collection.meta.getDocMeta(doc.id) || {};
        doc.collection.meta.setDocMeta(doc.id, {
            ...currentMeta,
            coverFitMode: fitMode
        });
    });
    
    // Change image button
    const changeBtn = createControlButton('Change', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    img.src = event.target.result;
                    
                    // ✅ SAVE NEW IMAGE TO METADATA
                    const currentMeta = doc.collection.meta.getDocMeta(doc.id) || {};
                    doc.collection.meta.setDocMeta(doc.id, {
                        ...currentMeta,
                        coverImage: event.target.result
                    });
                    
                    toast(rootComponent.host, 'Cover image updated');
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    });
    
    // Remove button
    const removeBtn = createControlButton('Remove', () => {
        coverContainer.remove();
        
        // ✅ REMOVE FROM METADATA
        const currentMeta = doc.collection.meta.getDocMeta(doc.id) || {};
        delete currentMeta.coverImage;
        delete currentMeta.coverHeight;
        delete currentMeta.coverFitMode;
        doc.collection.meta.setDocMeta(doc.id, currentMeta);
        
        toast(rootComponent.host, 'Cover image removed');
    });
    
    controls.appendChild(fitBtn);
    controls.appendChild(changeBtn);
    controls.appendChild(removeBtn);
    
    // Show controls on hover
    coverContainer.addEventListener('mouseenter', () => {
        controls.style.opacity = '1';
        resizeHandle.style.opacity = '1';
    });
    
    coverContainer.addEventListener('mouseleave', () => {
        controls.style.opacity = '0';
        resizeHandle.style.opacity = '0';
    });
    
    // Add resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 8px;
        background: rgba(0, 0, 0, 0.1);
        cursor: ns-resize;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 10;
    `;
    
    // Resize functionality
    let isResizing = false;
    let startY = 0;
    let startHeight = 0;
    
    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startY = e.clientY;
        startHeight = coverContainer.offsetHeight;
        e.preventDefault();
        document.body.style.userSelect = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        
        const deltaY = e.clientY - startY;
        const newHeight = Math.max(200, Math.min(500, startHeight + deltaY));
        coverContainer.style.height = newHeight + 'px';
    });
    
    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.userSelect = '';
            
            // ✅ SAVE HEIGHT TO METADATA
            const currentMeta = doc.collection.meta.getDocMeta(doc.id) || {};
            doc.collection.meta.setDocMeta(doc.id, {
                ...currentMeta,
                coverHeight: parseInt(coverContainer.style.height)
            });
        }
    });
    
    coverContainer.appendChild(img);
    coverContainer.appendChild(controls);
    coverContainer.appendChild(resizeHandle);
    
    toast(rootComponent.host, 'Cover image added');
}

// ✅ ADD THIS FUNCTION TO RESTORE COVER ON LOAD
async function restoreCoverImageFromDoc(rootComponent) {
    const doc = rootComponent.doc;
    const docMeta = doc.collection.meta.getDocMeta(doc.id);
    
    if (docMeta && docMeta.coverImage) {
        try {
            // Retrieve blob from storage
            const storage = doc.collection.blobSync;
            const blob = await storage.get(docMeta.coverImage);
            
            if (blob) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    renderCoverImage(rootComponent, e.target.result, docMeta.coverImage);
                };
                reader.readAsDataURL(blob);
            }
        } catch (error) {
            console.error('Error restoring cover image:', error);
        }
    }
}

// Helper to create control buttons
function createControlButton(text, onClick) {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.style.cssText = `
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 6px 12px;
        font-size: 12px;
        cursor: pointer;
        transition: background 0.2s;
        color:black;
    `;
    
    btn.addEventListener('mouseenter', () => {
        btn.style.background = '#f5f5f5';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.background = 'white';
    });
    
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        onClick();
    });
    
    return btn;
}



function addCoverImageToPagePersistent(rootComponent, imageData) {
    const doc = rootComponent.doc;
    
    // Store cover in document metadata
    doc.meta.setMeta('coverImage', {
        url: imageData,
        height: 200
    });
    
    // Then render it (same as above)
    addCoverImageToPage(rootComponent, imageData);
}

// On document load, check for cover and render it
function initializeCoverImage(rootComponent) {
    const doc = rootComponent.doc;
    const coverMeta = doc.meta.getMeta('coverImage');
    
    if (coverMeta && coverMeta.url) {
        addCoverImageToPage(rootComponent, coverMeta.url);
        
        // Restore height
        setTimeout(() => {
            const coverContainer = document.querySelector('.page-cover-container');
            if (coverContainer && coverMeta.height) {
                coverContainer.style.height = coverMeta.height + 'px';
            }
        }, 100);
    }
}
function renderCoverImage(rootComponent, imageData, blobId) {
    const doc = rootComponent.doc;
    const docMeta = doc.collection.meta.getDocMeta(doc.id) || {};
    
    // Find the editor root container
    let editorRoot = rootComponent.host;
    
    while (editorRoot.parentElement) {
        if (editorRoot.classList?.contains('affine-editor-container') ||
            editorRoot.tagName === 'AFFINE-EDITOR-CONTAINER' ||
            editorRoot.parentElement.tagName === 'BODY') {
            break;
        }
        editorRoot = editorRoot.parentElement;
    }
    
    // Check if cover already exists
    let coverContainer = document.querySelector('.page-cover-container');
    
    if (!coverContainer) {
        coverContainer = document.createElement('div');
        coverContainer.className = 'page-cover-container';
        coverContainer.style.cssText = `
            width: 100%;
            height: ${docMeta.coverHeight || 200}px;
            min-height: 200px;
            max-height: 500px;
            position: relative;
            margin-bottom: 24px;
            overflow: hidden;
            background: #f0f0f0;
            border-radius: 0;
        `;
        
        // Insert at the absolute top
        const parent = editorRoot.parentElement || document.body;
        parent.insertBefore(coverContainer, editorRoot);
    }
    
    // Clear existing content
    coverContainer.innerHTML = '';
    
    // Store blobId on the container
    coverContainer.dataset.blobId = blobId;
    
    // Add image
    const img = document.createElement('img');
    img.src = imageData;
    const fitMode = docMeta.coverFitMode || 'contain';
    img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: ${fitMode};
        object-position: center;
        display: block;
        background: #f5f5f5;
    `;
    
    // Add controls overlay
    const controls = document.createElement('div');
    controls.className = 'cover-controls';
    controls.style.cssText = `
        position: absolute;
        bottom: 16px;
        right: 16px;
        display: flex;
        gap: 8px;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 10;
    `;
    
    // Fit mode toggle button
    let currentFitMode = fitMode;
    const fitModeText = currentFitMode.charAt(0).toUpperCase() + currentFitMode.slice(1);
    const fitBtn = createControlButton(`Fit: ${fitModeText}`, () => {
        if (currentFitMode === 'contain') {
            currentFitMode = 'cover';
            fitBtn.textContent = 'Fit: Cover';
            img.style.objectFit = 'cover';
        } else if (currentFitMode === 'cover') {
            currentFitMode = 'fill';
            fitBtn.textContent = 'Fit: Fill';
            img.style.objectFit = 'fill';
        } else {
            currentFitMode = 'contain';
            fitBtn.textContent = 'Fit: Contain';
            img.style.objectFit = 'contain';
        }
        
        // ✅ Save fit mode - Using correct API
        const currentMeta = doc.collection.meta.getDocMeta(doc.id) || {};
        doc.collection.meta.setDocMeta(doc.id, {
            ...currentMeta,
            coverFitMode: currentFitMode
        });
    });
    
    // Change image button
    const changeBtn = createControlButton('Change', async () => {
        try {
            const file = await openFileOrFiles({ acceptType: 'Images', multiple: false });
            if (!file) return;
            
            const imageFile = Array.isArray(file) ? file[0] : file;
            
            if (imageFile.size > 5 * 1024 * 1024) {
                toast(rootComponent.host, 'Image too large. Max 5MB.');
                return;
            }
            
            // Store new blob
            const storage = doc.collection.blobSync;
            const newBlobId = await storage.set(imageFile);
            
            // ✅ Update metadata - Using correct API
            const currentMeta = doc.collection.meta.getDocMeta(doc.id) || {};
            doc.collection.meta.setDocMeta(doc.id, {
                ...currentMeta,
                coverImage: newBlobId
            });
            
            // Update display
            const reader = new FileReader();
            reader.onload = (event) => {
                img.src = event.target.result;
                coverContainer.dataset.blobId = newBlobId;
                toast(rootComponent.host, 'Cover image updated');
            };
            reader.readAsDataURL(imageFile);
            
        } catch (error) {
            console.error('Error updating cover:', error);
            toast(rootComponent.host, 'Failed to update cover image');
        }
    });
    
    // Remove button
    const removeBtn = createControlButton('Remove', () => {
        coverContainer.remove();
        
        // ✅ Remove from metadata - Using correct API
        const currentMeta = doc.collection.meta.getDocMeta(doc.id) || {};
        const { coverImage, coverHeight, coverFitMode, ...rest } = currentMeta;
        doc.collection.meta.setDocMeta(doc.id, rest);
        
        toast(rootComponent.host, 'Cover image removed');
    });
    
    controls.appendChild(fitBtn);
    controls.appendChild(changeBtn);
    controls.appendChild(removeBtn);
    
    // Add resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 8px;
        background: rgba(0, 0, 0, 0.1);
        cursor: ns-resize;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 10;
    `;
    
    // Resize functionality
    let isResizing = false;
    let startY = 0;
    let startHeight = 0;
    
    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startY = e.clientY;
        startHeight = coverContainer.offsetHeight;
        e.preventDefault();
        document.body.style.userSelect = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        
        const deltaY = e.clientY - startY;
        const newHeight = Math.max(200, Math.min(500, startHeight + deltaY));
        coverContainer.style.height = newHeight + 'px';
    });
    
    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.userSelect = '';
            
            // ✅ Save height - Using correct API
            const currentMeta = doc.collection.meta.getDocMeta(doc.id) || {};
            doc.collection.meta.setDocMeta(doc.id, {
                ...currentMeta,
                coverHeight: parseInt(coverContainer.style.height)
            });
        }
    });
    
    // Show/hide controls on hover
    coverContainer.addEventListener('mouseenter', () => {
        controls.style.opacity = '1';
        resizeHandle.style.opacity = '1';
    });
    
    coverContainer.addEventListener('mouseleave', () => {
        controls.style.opacity = '0';
        resizeHandle.style.opacity = '0';
    });
    
    // Append all elements
    coverContainer.appendChild(img);
    coverContainer.appendChild(controls);
    coverContainer.appendChild(resizeHandle);
}









function buildEditorUrl(doc) {
    const fileType = doc.file_type.toLowerCase();
    
    // For HTML files - use editorjs
    if (fileType === 'html') {
        const params = new URLSearchParams({
            mode: 'update',
            fileId: doc.vector_document_id,
            fileName: doc.filename,
            fileUrl: doc.file_url,
            fileType: doc.file_type
        });
        return `${process.env.NEXT_PUBLIC_APP_BASE_URL}/editorjs?${params.toString()}`;
    }
    
    // For Office files (xlsx, pptx, docx) - use alleditor
    if (['xlsx', 'pptx', 'docx','.pptx','.xslx','.docx'].includes(fileType)) {
        const params = new URLSearchParams({
            fileUrl: doc.file_url,
            fileName: `${doc.filename}.${doc.file_type}`,
            viewOnly: 'false',
            token: jwtToken, // Use the JWT token from your auth
            userId: userInfo.userid,
            userName:userInfo.name
        });
        return `${process.env.NEXT_PUBLIC_APP_BASE_URL}/alleditor?${params.toString()}`;
    }
    
    // For all other file types - open the file URL directly
    return doc.file_url;
}

// Helper function to show document selector modal
async function showDocumentSelectorModal(host, docs) {
    return new Promise((resolve) => {
        // Create a simple modal overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 8px;
            padding: 24px;
            max-width: 500px;
            max-height: 600px;
            overflow-y: auto;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

        const title = document.createElement('h3');
        title.textContent = 'Select a Document';
        title.style.cssText = 'margin: 0 0 16px 0; font-size: 18px;';

        const list = document.createElement('div');
        list.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

        docs.forEach(doc => {
            const item = document.createElement('button');
            item.textContent = `${doc.filename}.${doc.file_type}`;
            item.style.cssText = `
                padding: 12px;
                border: 1px solid #e0e0e0;
                border-radius: 4px;
                background: white;
                cursor: pointer;
                text-align: left;
                transition: background 0.2s;
            `;
            
            item.onmouseover = () => item.style.background = '#f5f5f5';
            item.onmouseout = () => item.style.background = 'white';
            
            item.onclick = () => {
                document.body.removeChild(overlay);
                resolve(doc);
            };

            list.appendChild(item);
        });

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.cssText = `
            margin-top: 16px;
            padding: 8px 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: white;
            cursor: pointer;
        `;
        cancelBtn.onclick = () => {
            document.body.removeChild(overlay);
            resolve(null);
        };

        modal.appendChild(title);
        modal.appendChild(list);
        modal.appendChild(cancelBtn);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Close on overlay click
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
                resolve(null);
            }
        };
    });
}