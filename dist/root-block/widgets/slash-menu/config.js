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
import {showMentionPopup,renderCoverImageFromBlock,createCoverUI,initializeCoverImages,addCoverImageToPage,restoreCoverImageFromDoc,createControlButton,addCoverImageToPagePersistent,initializeCoverImage,renderCoverImage,buildEditorUrl,showDocumentSelectorModal,showAppSelectorModal,showTableSelectorModal,showChartCreator,createChartPreview,insertChartAsImage} from './helper-methods.js'
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import Chart from "chart.js/auto";


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
async function waitForDbReady(dbModel, dbService) {
    return new Promise((resolve) => {
        const check = () => {
            const views = dbService.getViews(dbModel);
            if (views && views.length > 0) {
                resolve();
                return;
            }
            requestAnimationFrame(check);
        };
        check();
    });
}

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

const API_BASE_URL = process.env.NEXT_PUBLIC_NFAPI_BASE_URL || 'http://127.0.0.1:8002';

async function fetchSuperApps(userId, jwtToken) {
    try {
        const response = await fetch(`${API_BASE_URL}api/v1/wise/nf_superapp_app_list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${jwtToken}`
            },
            body: JSON.stringify({
                data: {
                    user_id: userId,
                    command: "list_apps"
                }
            })
        });
        
        const result = await response.json();
        return result.status ? result.data.data : [];
    } catch (error) {
        console.error('Error fetching apps:', error);
        return [];
    }
}

async function fetchAppTables(userId, appName, jwtToken) {
    try {
        const response = await fetch(`${API_BASE_URL}api/v1/wise/nf_superapp_table_list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${jwtToken}`
            },
            body: JSON.stringify({
                data: {
                    user_id: userId.toString(),
                    app_name: appName
                }
            })
        });
        
        const result = await response.json();
        return result.status ? result.data.data : [];
    } catch (error) {
        console.error('Error fetching tables:', error);
        return [];
    }
}

async function fetchTableData(userId, appName, tableName, jwtToken) {
    try {
        const response = await fetch(`${API_BASE_URL}api/v1/wise/nf_superapp_table_details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${jwtToken}`
            },
            body: JSON.stringify({
                data: {
                    user_id: userId.toString(),
                    app_name: appName,
                    table_name: tableName,
                    foreign_key: {}
                }
            })
        });
        
        const result = await response.json();
        return result
    } catch (error) {
        console.error('Error fetching table data:', error);
        return [];
    }
}
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
            name: 'SuperApp Table',
            description: 'Insert data from your SuperApp tables.',
            alias: ['database', 'superapp', 'table data'],
            icon: DatabaseTableViewIcon20,
            tooltip: 'Insert SuperApp table data',

            showWhen: ({ model }) =>
                model.doc.schema.flavourSchemaMap.has('affine:database') &&
                !insideEdgelessText(model),
        action: async ({ rootComponent }) => {
            try {
                const userId = userInfo?.userid || userInfo?.id || 1;

                toast(rootComponent.host, 'Loading apps...');

                const apps = await fetchSuperApps(userId, jwtToken);
                if (apps.length === 0) {
                    toast(rootComponent.host, 'No apps found');
                    return;
                }

                showAppSelectorModal(rootComponent.host, apps, async (selectedApp) => {
                    toast(rootComponent.host, `Loading tables for ${selectedApp.app_name}...`);

                    const tables = await fetchAppTables(userId, selectedApp.app_name, jwtToken);
                    if (tables.length === 0) {
                        toast(rootComponent.host, 'No tables found in this app');
                        return;
                    }

                    showTableSelectorModal(rootComponent.host, tables, async (selectedTable) => {
                        toast(rootComponent.host, `Loading data from ${selectedTable.name}...`);

                        const response = await fetchTableData(
                            userId,
                            selectedApp.app_name,
                            selectedTable.name,
                            jwtToken
                        );

                        const tableData = response?.data?.data?.data || response?.data?.data || [];

                        if (!tableData || tableData.length === 0) {
                            toast(rootComponent.host, 'No data found in this table');
                            return;
                        }

                        rootComponent.std.command
                            .chain()
                            .getSelectedModels()
                            .insertDatabaseBlock({
                                viewType: viewPresets.tableViewMeta.type,
                                place: "after",
                                removeEmptyLine: true
                            })
                            .inline(async ({ insertedDatabaseBlockId }) => {

                                if (!insertedDatabaseBlockId) {
                                    console.error("Failed to create database block");
                                    return;
                                }

                                const doc = rootComponent.doc;
                                const dbBlock = doc.getBlock(insertedDatabaseBlockId);
                                if (!dbBlock) return;

                                const dbModel = dbBlock.model;
                                const dbService = rootComponent.std.getService("affine:database");

                                if (!dbService) {
                                    console.error("Missing service affine:database");
                                    return;
                                }

                                // Wait for database block to be fully initialized
                                await new Promise((resolve) => setTimeout(resolve, 500));

                                const columnKeys = Object.keys(tableData[0]).filter(key => !key.startsWith('_'));
                                const columnIdMap = {};

                                // Delete all default rows
                                const defaultChildren = dbModel.children ? [...dbModel.children] : [];
                                for (const childId of defaultChildren) {
                                    doc.deleteBlock(childId);
                                }
                                
                                await new Promise((resolve) => setTimeout(resolve, 200));

                                // Find title column
                                let titleColumnId = null;
                                for (const col of dbModel.columns || []) {
                                    if (col.type === 'title') {
                                        titleColumnId = col.id;
                                        break;
                                    }
                                }

                                if (!titleColumnId) {
                                    console.error("No title column found!");
                                    return;
                                }

                                const firstKey = columnKeys[0];
                                columnIdMap[firstKey] = titleColumnId;

                                // ===================================================
                                // CREATE ALL COLUMNS AND VIEW IN ONE TRANSACTION
                                // ===================================================
                                console.log("Creating all columns in single transaction...");
                                
                                doc.transact(() => {
                                    // Clear everything first
                                    dbModel.columns = dbModel.columns.filter(col => col.type === 'title');
                                    dbModel.cells = {};
                                    
                                    if (dbModel.views && dbModel.views.length > 0) {
                                        dbModel.views[0].columns = [];
                                    }
                                    
                                    // Update title column name
                                    const titleCol = dbModel.columns.find(c => c.id === titleColumnId);
                                    if (titleCol) {
                                        titleCol.name = firstKey.charAt(0).toUpperCase() + firstKey.slice(1).replace(/_/g, ' ');
                                    }
                                    
                                    // Create all new columns at once
                                    const viewColumns = [];
                                    
                                    for (let i = 1; i < columnKeys.length; i++) {
                                        const key = columnKeys[i];
                                        const columnName = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
                                        
                                        // Generate unique ID
                                        const colId = doc.generateBlockId();
                                        
                                        // Add column to model
                                        dbModel.columns.push({
                                            type: 'rich-text',
                                            name: columnName,
                                            data: {},
                                            id: colId
                                            // width: 180
                                        });
                                        
                                        // Add to view columns
                                        viewColumns.push({
                                            id: colId,
                                            hide: false
                                            // width: 180
                                        });
                                        
                                        columnIdMap[key] = colId;
                                        console.log(`Created column: ${columnName} (${colId})`);
                                    }
                                    
                                    // Update view
                                    if (dbModel.views && dbModel.views.length > 0) {
                                        const tableView = dbModel.views[0];
                                        
                                        if (!tableView.header) {
                                            tableView.header = {};
                                        }
                                        tableView.header.titleColumn = titleColumnId;
                                        tableView.header.iconColumn = "type";
                                        
                                        tableView.columns = viewColumns;
                                    }
                                    
                                    console.log("Created", viewColumns.length, "columns in view");
                                });

                                await new Promise((resolve) => setTimeout(resolve, 500));

                                console.log("Total columns:", dbModel.columns.length);
                                console.log("View columns:", dbModel.views[0].columns.length);

                                // ===================================================
                                // INSERT DATA ROWS WITH PROPER TRANSACTION MANAGEMENT
                                // ===================================================
                                console.log("Inserting", tableData.length, "rows...");
                                
                                // First, create all rows
                                const rowIds = [];
                                for (let rowIndex = 0; rowIndex < tableData.length; rowIndex++) {
                                    const row = tableData[rowIndex];
                                    const titleValue = row[firstKey] || '';

                                    const rowId = doc.addBlock(
                                        'affine:paragraph',
                                        { 
                                            type: 'text',
                                            text: new doc.Text(String(titleValue))
                                        },
                                        insertedDatabaseBlockId
                                    );
                                    
                                    rowIds.push(rowId);
                                    
                                    // Small delay to ensure block is created
                                    await new Promise((resolve) => setTimeout(resolve, 50));
                                }

                                // Wait a bit more to ensure all rows are properly created
                                await new Promise((resolve) => setTimeout(resolve, 300));

                                // Now, populate all cells in a single transaction
                                doc.transact(() => {
                                    // Ensure cells object exists
                                    if (!dbModel.cells) {
                                        dbModel.cells = {};
                                    }

                                    for (let rowIndex = 0; rowIndex < tableData.length; rowIndex++) {
                                        const rowId = rowIds[rowIndex];
                                        const row = tableData[rowIndex];
                                        
                                        // Ensure row entry exists in cells
                                        if (!dbModel.cells[rowId]) {
                                            dbModel.cells[rowId] = {};
                                        }

                                        // Populate all columns for this row
                                        for (let i = 1; i < columnKeys.length; i++) {
                                            const key = columnKeys[i];
                                            const value = row[key];
                                            const columnId = columnIdMap[key];

                                            if (columnId && value !== null && value !== undefined && value !== '') {
                                                dbModel.cells[rowId][columnId] = {
                                                    columnId: columnId,
                                                    value: new doc.Text(String(value))
                                                };
                                            }
                                        }
                                        
                                        console.log(`Row ${rowIndex + 1}: Populated ${Object.keys(dbModel.cells[rowId]).length} cells`);
                                    }
                                });

                                // Update DB title
                                doc.transact(() => {
                                    if (dbModel.title) {
                                        dbModel.title.clear();
                                        dbModel.title.insert(
                                            `${selectedApp.app_name} - ${selectedTable.name}`,
                                            0
                                        );
                                    }
                                });

                                // Final wait to ensure everything is rendered
                                await new Promise((resolve) => setTimeout(resolve, 500));

                                console.log("=== COMPLETE ===");
                                console.log("Final columns:", dbModel.columns.length);
                                console.log("Final view columns:", dbModel.views[0].columns.length);
                                console.log("Total rows created:", rowIds.length);
                                
                                // Verify data was inserted correctly
                                let totalCells = 0;
                                if (dbModel.cells) {
                                    Object.keys(dbModel.cells).forEach(rowId => {
                                        totalCells += Object.keys(dbModel.cells[rowId]).length;
                                    });
                                }
                                console.log("Total cells populated:", totalCells);
                                
                                toast(rootComponent.host, `Loaded ${tableData.length} rows with ${dbModel.columns.length} columns!`);
                            })
                            .run();

                    });
                });

            } catch (err) {
                console.error("Error loading SuperApp table:", err);
                toast(rootComponent.host, "Failed to load table data");
            }
        }
     

        },

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
                
        { groupName: 'Charts' },
        {
            name: 'Line Chart',
            description: 'Create a line chart visualization.',
            icon: ImageIcon20, // or create a custom chart icon
            tooltip: 'Insert line chart',
            alias: ['graph', 'plot', 'line graph'],
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:image'),
            action: async ({ rootComponent, model }) => {
                await showChartCreator(rootComponent, model, 'line');
            }
        },
        {
            name: 'Bar Chart',
            description: 'Create a bar chart visualization.',
            icon: ImageIcon20,
            tooltip: 'Insert bar chart',
            alias: ['bar graph', 'column chart'],
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:image'),
            action: async ({ rootComponent, model }) => {
                await showChartCreator(rootComponent, model, 'bar');
            }
        },
        {
            name: 'Pie Chart',
            description: 'Create a pie chart visualization.',
            icon: ImageIcon20,
            tooltip: 'Insert pie chart',
            alias: ['donut chart', 'circle graph'],
            showWhen: ({ model }) => model.doc.schema.flavourSchemaMap.has('affine:image'),
            action: async ({ rootComponent, model }) => {
                await showChartCreator(rootComponent, model, 'pie');
            }
        }

    ],
};







