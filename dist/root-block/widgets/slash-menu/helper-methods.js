import Chart from "chart.js/auto";
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
import * as Y from 'yjs';
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
export function showMentionPopup(rootComponent, model, members) {
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
export function renderCoverImageFromBlock(rootComponent, coverBlock) {
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

export function createCoverUI(rootComponent, coverBlock, imageData, coverData) {
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
export function initializeCoverImages(rootComponent) {
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


export function addCoverImageToPage(rootComponent, imageData) {
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
export async function restoreCoverImageFromDoc(rootComponent) {
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
export function createControlButton(text, onClick) {
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



export function addCoverImageToPagePersistent(rootComponent, imageData) {
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
export function initializeCoverImage(rootComponent) {
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
export function renderCoverImage(rootComponent, imageData, blobId) {
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


export function buildEditorUrl(doc) {
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
export async function showDocumentSelectorModal(host, docs) {
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






export async function showChartCreatorNormal(rootComponent, model, chartType) {
    return new Promise((resolve) => {
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

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 8px;
            padding: 24px;
            width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

        const title = document.createElement('h3');
        title.textContent = `Create ${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`;
        title.style.cssText = 'margin: 0 0 16px 0; font-size: 18px; color: #333;';

        // Chart Title Input
        const titleInput = document.createElement('input');
        titleInput.placeholder = 'Chart Title';
        titleInput.style.cssText = `
            width: 100%;
            padding: 10px;
            margin-bottom: 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        `;

        // Data Input Label
        const dataLabel = document.createElement('label');
        dataLabel.textContent = 'Enter chart data:';
        dataLabel.style.cssText = 'display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;';

        // Table Container
        const tableContainer = document.createElement('div');
        tableContainer.style.cssText = `
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            margin-bottom: 12px;
            max-height: 300px;
            overflow-y: auto;
        `;

        // Table Header
        const tableHeader = document.createElement('div');
        tableHeader.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr 40px;
            gap: 8px;
            padding: 10px;
            background: #f5f5f5;
            border-bottom: 1px solid #e0e0e0;
            font-weight: 600;
            font-size: 13px;
            color: #666;
            position: sticky;
            top: 0;
            z-index: 1;
        `;
        
        const labelHeader = document.createElement('div');
        labelHeader.textContent = 'Label';
        
        const valueHeader = document.createElement('div');
        valueHeader.textContent = 'Value';
        
        const actionHeader = document.createElement('div');
        
        tableHeader.appendChild(labelHeader);
        tableHeader.appendChild(valueHeader);
        tableHeader.appendChild(actionHeader);

        // Rows Container
        const rowsContainer = document.createElement('div');
        rowsContainer.style.cssText = 'padding: 8px;';

        let rowCount = 0;

        function createDataRow(labelValue = '', valueValue = '') {
            const row = document.createElement('div');
            row.className = 'chart-data-row';
            row.dataset.rowId = rowCount++;
            row.style.cssText = `
                display: grid;
                grid-template-columns: 1fr 1fr 40px;
                gap: 8px;
                margin-bottom: 8px;
                align-items: center;
                color:black;
            `;

            // Label Input
            const labelInput = document.createElement('input');
            labelInput.type = 'text';
            labelInput.placeholder = chartType === 'pie' ? 'e.g., Red' : 'e.g., January';
            labelInput.value = labelValue;
            labelInput.style.cssText = `
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 13px;
                width: 100%;
                color:black;
            `;

            // Value Input (numbers only)
            const valueInput = document.createElement('input');
            valueInput.type = 'number';
            valueInput.placeholder = 'e.g., 100';
            valueInput.value = valueValue;
            valueInput.step = 'any';
            valueInput.style.cssText = `
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 13px;
                width: 100%;
                color:black;
            `;

            // Remove Button
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '×';
            removeBtn.title = 'Remove row';
            removeBtn.style.cssText = `
                width: 32px;
                height: 32px;
                border: 1px solid #ff4444;
                background: white;
                color: #ff4444;
                border-radius: 4px;
                cursor: pointer;
                font-size: 20px;
                line-height: 1;
                transition: all 0.2s;
            `;
            
            removeBtn.onmouseover = () => {
                removeBtn.style.background = '#ff4444';
                removeBtn.style.color = 'white';
            };
            removeBtn.onmouseout = () => {
                removeBtn.style.background = 'white';
                removeBtn.style.color = '#ff4444';
            };

            removeBtn.onclick = () => {
                const rows = rowsContainer.querySelectorAll('.chart-data-row');
                if (rows.length > 1) {
                    row.remove();
                } else {
                    toast(rootComponent.host, 'At least one row is required');
                }
            };

            row.appendChild(labelInput);
            row.appendChild(valueInput);
            row.appendChild(removeBtn);

            return row;
        }

        // Add initial rows
        for (let i = 0; i < 3; i++) {
            rowsContainer.appendChild(createDataRow());
        }

        // Add Row Button
        const addRowBtn = document.createElement('button');
        addRowBtn.textContent = '+ Add Row';
        addRowBtn.style.cssText = `
            width: 100%;
            padding: 10px;
            margin-bottom: 16px;
            border: 1px dashed #667eea;
            background: white;
            color: #667eea;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.2s;
        `;
        
        addRowBtn.onmouseover = () => {
            addRowBtn.style.background = '#f0f4ff';
            addRowBtn.style.borderStyle = 'solid';
        };
        addRowBtn.onmouseout = () => {
            addRowBtn.style.background = 'white';
            addRowBtn.style.borderStyle = 'dashed';
        };

        addRowBtn.onclick = () => {
            rowsContainer.appendChild(createDataRow());
            // Scroll to bottom
            tableContainer.scrollTop = tableContainer.scrollHeight;
        };

        tableContainer.appendChild(tableHeader);
        tableContainer.appendChild(rowsContainer);

        // Preview Canvas
        const previewCanvas = document.createElement('canvas');
        previewCanvas.style.cssText = `
            margin-bottom: 16px; 
            border: 1px solid #eee;
            border-radius: 4px;
            max-width: 100%;
        `;

        // Buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; gap: 8px; justify-content: flex-end;';

        const previewBtn = document.createElement('button');
        previewBtn.textContent = 'Preview';
        previewBtn.style.cssText = `
            padding: 10px 20px;
            border: 1px solid #667eea;
            background: white;
            color: #667eea;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s;
            
        `;
        previewBtn.onmouseover = () => previewBtn.style.background = '#f0f4ff';
        previewBtn.onmouseout = () => previewBtn.style.background = 'white';

        const insertBtn = document.createElement('button');
        insertBtn.textContent = 'Insert Chart';
        insertBtn.style.cssText = `
            padding: 10px 20px;
            border: none;
            background: #667eea;
            color: white;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s;
        `;
        insertBtn.onmouseover = () => insertBtn.style.background = '#5568d3';
        insertBtn.onmouseout = () => insertBtn.style.background = '#667eea';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.cssText = `
            padding: 10px 20px;
            border: 1px solid #ccc;
            background: white;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
            color:black;
        `;
        cancelBtn.onmouseover = () => cancelBtn.style.background = '#f5f5f5';
        cancelBtn.onmouseout = () => cancelBtn.style.background = 'white';

        let currentChart = null;

        function getChartData() {
            const rows = rowsContainer.querySelectorAll('.chart-data-row');
            const labels = [];
            const data = [];
            
            rows.forEach(row => {
                const labelInput = row.querySelector('input[type="text"]');
                const valueInput = row.querySelector('input[type="number"]');
                
                const label = labelInput.value.trim();
                const value = parseFloat(valueInput.value);
                
                if (label && !isNaN(value)) {
                    labels.push(label);
                    data.push(value);
                }
            });

            return { labels, data };
        }

        previewBtn.onclick = () => {
            const { labels, data } = getChartData();
            
            if (labels.length === 0 || data.length === 0) {
                toast(rootComponent.host, 'Please enter at least one valid data row');
                return;
            }

            if (currentChart) currentChart.destroy();
            currentChart = createChartPreview(
                previewCanvas, 
                chartType, 
                titleInput.value, 
                labels, 
                data
            );
        };

        insertBtn.onclick = async () => {
            const { labels, data } = getChartData();
            
            if (labels.length === 0 || data.length === 0) {
                toast(rootComponent.host, 'Please enter at least one valid data row');
                return;
            }

            if (!currentChart) {
                currentChart = createChartPreview(
                    previewCanvas, 
                    chartType, 
                    titleInput.value, 
                    labels, 
                    data
                );
            }
            
            await insertChartAsImage(rootComponent, model, previewCanvas, titleInput.value);
            if (currentChart) currentChart.destroy();
            document.body.removeChild(overlay);
            resolve();
        };

        cancelBtn.onclick = () => {
            if (currentChart) currentChart.destroy();
            document.body.removeChild(overlay);
            resolve();
        };

        buttonContainer.appendChild(previewBtn);
        buttonContainer.appendChild(insertBtn);
        buttonContainer.appendChild(cancelBtn);

        modal.appendChild(title);
        modal.appendChild(titleInput);
        modal.appendChild(dataLabel);
        modal.appendChild(tableContainer);
        modal.appendChild(addRowBtn);
        modal.appendChild(previewCanvas);
        modal.appendChild(buttonContainer);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.onclick = (e) => {
            if (e.target === overlay) {
                if (currentChart) currentChart.destroy();
                document.body.removeChild(overlay);
                resolve();
            }
        };
    });
}
function generateDistinctColors(count) {
    const colors = [];
    const goldenAngle = 137.508; // prevents repetition

    for (let i = 0; i < count; i++) {
        const hue = (i * goldenAngle) % 360;
        colors.push(`hsl(${hue}, 65%, 55%)`);
    }

    return colors;
}

export function createChartPreview(canvas, chartType, title, labels, data) {
    const ctx = canvas.getContext('2d');
    
    // Clear any existing chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const colors = chartType === "pie"
        ? generateDistinctColors(labels.length)
        : 'rgba(102, 126, 234, 0.6)';
    const config = {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: title || 'Dataset',
                data: data,
                backgroundColor: colors,
                borderColor: chartType === 'pie' ? '#fff' : 'rgba(102, 126, 234, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: !!title,
                    text: title,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: chartType === 'pie',
                    position: 'bottom'
                }
            },
            scales: chartType !== 'pie' ? {
                y: {
                    beginAtZero: true
                }
            } : {}
        }
    };

    return new Chart(ctx, config);
}

export async function insertChartAsImage(rootComponent, model, canvas, chartTitle) {
    try {
        // Convert canvas to blob
        const blob = await new Promise(resolve => {
            canvas.toBlob(resolve, 'image/png');
        });

        // Store in BlockSuite blob storage (same as cover image)
        const doc = rootComponent.doc;
        const storage = doc.collection.blobSync;
        const blobId = await storage.set(blob);

        // Insert as image block
        const parentModel = doc.getParent(model);
        if (!parentModel) return;

        const index = parentModel.children.indexOf(model) + 1;
        
        const imageId = doc.addBlock(
            'affine:image',
            {
                sourceId: blobId,
                caption: chartTitle || 'Chart'
            },
            parentModel,
            index
        );

        tryRemoveEmptyLine(model);

        rootComponent.host.selection.setGroup('note', [
            rootComponent.host.selection.create('block', {
                blockId: imageId,
            }),
        ]);

        toast(rootComponent.host, 'Chart inserted successfully');
    } catch (error) {
        console.error('Error inserting chart:', error);
        toast(rootComponent.host, 'Failed to insert chart');
    }
}


export function showAppSelectorModal(host, apps, onSelect) {
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
    title.textContent = 'Select an App';
    title.style.cssText = 'margin: 0 0 16px 0; font-size: 18px; color: #333;';
    
    const list = document.createElement('div');
    list.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
    
    if (apps.length === 0) {
        const noData = document.createElement('p');
        noData.textContent = 'No apps found';
        noData.style.cssText = 'text-align: center; color: #999; padding: 20px;';
        list.appendChild(noData);
    } else {
        apps.forEach(app => {
            const item = document.createElement('button');
            item.style.cssText = `
                padding: 16px;
                border: 1px solid #e0e0e0;
                border-radius: 6px;
                background: white;
                cursor: pointer;
                text-align: left;
                transition: all 0.2s;
            `;
            
            const appTitle = document.createElement('div');
            appTitle.textContent = app.app_name;
            appTitle.style.cssText = 'font-weight: 600; color: #333; margin-bottom: 4px;';
            
            const appDesc = document.createElement('div');
            appDesc.textContent = app.description || 'No description';
            appDesc.style.cssText = 'font-size: 12px; color: #666;';
            
            const appMeta = document.createElement('div');
            appMeta.textContent = `${app.app_type} • ${app.created_at}`;
            appMeta.style.cssText = 'font-size: 11px; color: #999; margin-top: 4px;';
            
            item.appendChild(appTitle);
            item.appendChild(appDesc);
            item.appendChild(appMeta);
            
            item.onmouseover = () => {
                item.style.background = '#f5f5f5';
                item.style.borderColor = '#667eea';
            };
            item.onmouseout = () => {
                item.style.background = 'white';
                item.style.borderColor = '#e0e0e0';
            };
            
            item.onclick = () => {
                document.body.removeChild(overlay);
                onSelect(app);
            };
            
            list.appendChild(item);
        });
    }
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        margin-top: 16px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        background: white;
        cursor: pointer;
        width: 100%;
        transition: background 0.2s;
        color:black;
    `;
    cancelBtn.onmouseover = () => cancelBtn.style.background = '#f5f5f5';
    cancelBtn.onmouseout = () => cancelBtn.style.background = 'white';
    cancelBtn.onclick = () => document.body.removeChild(overlay);
    
    modal.appendChild(title);
    modal.appendChild(list);
    modal.appendChild(cancelBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    };
}

export function showTableSelectorModal(host, tables, onSelect) {
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
    title.textContent = 'Select a Table';
    title.style.cssText = 'margin: 0 0 16px 0; font-size: 18px; color: #333;';
    
    const list = document.createElement('div');
    list.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
    
    if (tables.length === 0) {
        const noData = document.createElement('p');
        noData.textContent = 'No tables found';
        noData.style.cssText = 'text-align: center; color: #999; padding: 20px;';
        list.appendChild(noData);
    } else {
        tables.forEach(table => {
            const item = document.createElement('button');
            item.style.cssText = `
                padding: 16px;
                border: 1px solid #e0e0e0;
                border-radius: 6px;
                background: white;
                cursor: pointer;
                text-align: left;
                transition: all 0.2s;
            `;
            
            const tableName = document.createElement('div');
            tableName.textContent = table.name;
            tableName.style.cssText = 'font-weight: 600; color: #333; margin-bottom: 4px;';
            
            const tableType = document.createElement('div');
            tableType.textContent = table.table_type || 'Standard Table';
            tableType.style.cssText = 'font-size: 12px; color: #666;';
            
            item.appendChild(tableName);
            item.appendChild(tableType);
            
            item.onmouseover = () => {
                item.style.background = '#f5f5f5';
                item.style.borderColor = '#667eea';
            };
            item.onmouseout = () => {
                item.style.background = 'white';
                item.style.borderColor = '#e0e0e0';
            };
            
            item.onclick = () => {
                document.body.removeChild(overlay);
                onSelect(table);
            };
            
            list.appendChild(item);
        });
    }
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        margin-top: 16px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        background: white;
        cursor: pointer;
        width: 100%;
        color:black;
        transition: background 0.2s;
    `;
    cancelBtn.onmouseover = () => cancelBtn.style.background = '#f5f5f5';
    cancelBtn.onmouseout = () => cancelBtn.style.background = 'white';
    cancelBtn.onclick = () => document.body.removeChild(overlay);
    
    modal.appendChild(title);
    modal.appendChild(list);
    modal.appendChild(cancelBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    };
}
export function showFilterModal(host, fields, tableData, onApply) {
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
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 24px;
        width: 90%;
        max-width: 1000px;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    const title = document.createElement('h3');
    title.textContent = 'Configure Filters';
    title.style.cssText = 'margin: 0 0 8px 0; font-size: 18px; color: #333;';
    
    const subtitle = document.createElement('p');
    subtitle.textContent = `Total records: ${tableData.length}`;
    subtitle.style.cssText = 'margin: 0 0 20px 0; font-size: 13px; color: #666;';
    
    // Scrollable content area
    const scrollContainer = document.createElement('div');
    scrollContainer.style.cssText = `
        flex: 1;
        overflow-y: auto;
        margin-bottom: 16px;
    `;
    
    const filtersContainer = document.createElement('div');
    filtersContainer.style.cssText = 'display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;';
    
    // Store active filters
    let activeFilters = [];
    
    // Get operator options based on field type
    function getOperatorsByType(fieldType) {
        if (fieldType === 'number') {
            return [
                { value: 'equals', label: 'Equals' },
                { value: 'not_equals', label: 'Not Equals' },
                { value: 'greater_than', label: 'Greater Than' },
                { value: 'less_than', label: 'Less Than' },
                { value: 'greater_or_equal', label: 'Greater or Equal' },
                { value: 'less_or_equal', label: 'Less or Equal' },
                { value: 'is_empty', label: 'Is Empty' },
                { value: 'is_not_empty', label: 'Is Not Empty' }
            ];
        } else if (fieldType === 'date') {
            return [
                { value: 'is', label: 'Is' },
                { value: 'is_not', label: 'Is Not' },
                { value: 'is_before', label: 'Is Before' },
                { value: 'is_after', label: 'Is After' },
                { value: 'is_on_or_before', label: 'Is On or Before' },
                { value: 'is_on_or_after', label: 'Is On or After' },
                { value: 'is_empty', label: 'Is Empty' },
                { value: 'is_not_empty', label: 'Is Not Empty' }
            ];
        } else { // text or default
            return [
                { value: 'is', label: 'Is' },
                { value: 'is_not', label: 'Is Not' },
                { value: 'contains', label: 'Contains' },
                { value: 'does_not_contain', label: 'Does Not Contain' },
                { value: 'starts_with', label: 'Starts With' },
                { value: 'ends_with', label: 'Ends With' },
                { value: 'is_empty', label: 'Is Empty' },
                { value: 'is_not_empty', label: 'Is Not Empty' }
            ];
        }
    }
    
    // Function to create a filter row
    function createFilterRow(filterId = Date.now()) {
        const filterRow = document.createElement('div');
        filterRow.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr 1fr auto;
            gap: 8px;
            padding: 12px;
            background: #f9f9f9;
            border-radius: 6px;
            align-items: start;
        `;
        filterRow.dataset.filterId = filterId;
        
        // Field selector
        const fieldSelect = document.createElement('select');
        fieldSelect.style.cssText = `
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 13px;
            background: white;
            color:black;
        `;
        
        fields.forEach(field => {
            const option = document.createElement('option');
            option.value = field.name;
            option.dataset.type = field.type;
            option.textContent = field.label || field.name;
            fieldSelect.appendChild(option);
        });
        
        // Operator selector
        const operatorSelect = document.createElement('select');
        operatorSelect.style.cssText = `
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 13px;
            background: white;
            color:black;
        `;
        
        // Value input container
        const valueContainer = document.createElement('div');
        valueContainer.style.cssText = 'position: relative;';
        
        let valueInput = document.createElement('input');
        valueInput.type = 'text';
        valueInput.placeholder = 'Enter value...';
        valueInput.style.cssText = `
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 13px;
            box-sizing: border-box;
            color:black;
        `;
        valueContainer.appendChild(valueInput);
        
        // Function to update operators and input based on field type
        function updateFieldType() {
            const selectedOption = fieldSelect.options[fieldSelect.selectedIndex];
            const fieldType = selectedOption.dataset.type;
            
            // Update operators
            operatorSelect.innerHTML = '';
            const operators = getOperatorsByType(fieldType);
            operators.forEach(op => {
                const option = document.createElement('option');
                option.value = op.value;
                option.textContent = op.label;
                operatorSelect.appendChild(option);
            });
            
            // Update input type based on field type
            const oldValue = valueInput.value;
            valueContainer.innerHTML = '';
            
            if (fieldType === 'date') {
                valueInput = document.createElement('input');
                valueInput.type = 'date';
                valueInput.value = oldValue;
                valueInput.style.cssText = `
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 13px;
                    color:black;
                    box-sizing: border-box;
                `;
            } else if (fieldType === 'number') {
                valueInput = document.createElement('input');
                valueInput.type = 'number';
                valueInput.placeholder = 'Enter number...';
                valueInput.value = oldValue;
                valueInput.style.cssText = `
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 13px;
                    box-sizing: border-box;
                    color:black;
                `;
            } else {
                valueInput = document.createElement('input');
                valueInput.type = 'text';
                valueInput.placeholder = 'Enter value...';
                valueInput.value = oldValue;
                valueInput.style.cssText = `
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 13px;
                    box-sizing: border-box;
                    color:black;
                `;
            }
            
            valueContainer.appendChild(valueInput);
            valueInput.addEventListener('input', updateFilter);
            updateOperatorChange();
        }
        
        // Disable value input for operators that don't need it
        function updateOperatorChange() {
            const needsValue = !['is_empty', 'is_not_empty'].includes(operatorSelect.value);
            valueInput.disabled = !needsValue;
            valueInput.style.background = needsValue ? 'white' : '#f5f5f5';
            if (!needsValue) valueInput.value = '';
            updateFilter();
        }
        
        fieldSelect.addEventListener('change', () => {
            updateFieldType();
            updateFilter();
        });
        
        operatorSelect.addEventListener('change', updateOperatorChange);
        
        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.style.cssText = `
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            font-size: 18px;
            color: #666;
            transition: all 0.2s;
        `;
        removeBtn.onmouseover = () => {
            removeBtn.style.background = '#fee';
            removeBtn.style.borderColor = '#fcc';
            removeBtn.style.color = '#c00';
        };
        removeBtn.onmouseout = () => {
            removeBtn.style.background = 'white';
            removeBtn.style.borderColor = '#ddd';
            removeBtn.style.color = '#666';
        };
        removeBtn.onclick = () => {
            filterRow.remove();
            activeFilters = activeFilters.filter(f => f.id !== filterId);
            updatePreview();
        };
        
        // Store filter data
        const updateFilter = () => {
            const selectedOption = fieldSelect.options[fieldSelect.selectedIndex];
            const filterIndex = activeFilters.findIndex(f => f.id === filterId);
            const filterData = {
                id: filterId,
                field: fieldSelect.value,
                fieldType: selectedOption.dataset.type,
                operator: operatorSelect.value,
                value: valueInput.value
            };
            
            if (filterIndex >= 0) {
                activeFilters[filterIndex] = filterData;
            } else {
                activeFilters.push(filterData);
            }
            updatePreview();
        };
        
        valueInput.addEventListener('input', updateFilter);
        
        filterRow.appendChild(fieldSelect);
        filterRow.appendChild(operatorSelect);
        filterRow.appendChild(valueContainer);
        filterRow.appendChild(removeBtn);
        
        // Initialize
        updateFieldType();
        
        return filterRow;
    }
    
    // Preview section with record count and table
    const previewSection = document.createElement('div');
    previewSection.style.cssText = `
        padding: 12px;
        background: #f0f7ff;
        border: 1px solid #b3d9ff;
        border-radius: 6px;
        margin-bottom: 16px;
    `;
    
    const previewText = document.createElement('div');
    previewText.style.cssText = 'font-size: 13px; color: #333; font-weight: 600; margin-bottom: 8px;';
    previewText.textContent = `All ${tableData.length} records will be loaded`;
    previewSection.appendChild(previewText);
    
    // Preview table container
    const previewTableContainer = document.createElement('div');
    previewTableContainer.style.cssText = `
        max-height: 300px;
        overflow: auto;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        display: none;
    `;
    previewSection.appendChild(previewTableContainer);
    
    // Function to create preview table
    function createPreviewTable(filteredData) {
        if (filteredData.length === 0) {
            previewTableContainer.style.display = 'none';
            return;
        }
        
        previewTableContainer.style.display = 'block';
        previewTableContainer.innerHTML = '';
        
        const table = document.createElement('table');
        table.style.cssText = `
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
        `;
        
        // Header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.style.cssText = 'background: #f5f5f5; position: sticky; top: 0;';
        
        const columnKeys = Object.keys(filteredData[0]).filter(key => !key.startsWith('_'));
        columnKeys.forEach(key => {
            const th = document.createElement('th');
            th.textContent = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
            th.style.cssText = `
                padding: 8px;
                text-align: left;
                border-bottom: 2px solid #ddd;
                font-weight: 600;
                white-space: nowrap;
                color:black;
            `;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Body - show first 50 records
        const tbody = document.createElement('tbody');
        const displayData = filteredData.slice(0, 50);
        
        displayData.forEach((row, idx) => {
            const tr = document.createElement('tr');
            tr.style.cssText = `
                background: ${idx % 2 === 0 ? 'white' : '#fafafa'};
            `;
            
            columnKeys.forEach(key => {
                const td = document.createElement('td');
                td.textContent = row[key] || '';
                td.style.cssText = `
                    padding: 8px;
                    border-bottom: 1px solid #eee;
                    max-width: 200px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color:black;
                `;
                tr.appendChild(td);
            });
            
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        
        // Show message if more records exist
        if (filteredData.length > 50) {
            const moreMsg = document.createElement('div');
            moreMsg.textContent = `Showing first 50 of ${filteredData.length} records`;
            moreMsg.style.cssText = `
                padding: 8px;
                text-align: center;
                color: #666;
                font-size: 11px;
                background: #f9f9f9;
                border-top: 1px solid #ddd;
                color:black;
            `;
            previewTableContainer.appendChild(table);
            previewTableContainer.appendChild(moreMsg);
        } else {
            previewTableContainer.appendChild(table);
        }
    }
    
    // Function to update preview
    function updatePreview() {
        const filteredData = applyFilters(tableData, activeFilters);
        const filterCount = activeFilters.length;
        
        if (filterCount === 0) {
            previewText.textContent = `All ${tableData.length} records will be loaded`;
            previewSection.style.background = '#f0f7ff';
            previewSection.style.borderColor = '#b3d9ff';
            previewTableContainer.style.display = 'none';
        } else {
            previewText.textContent = `${filteredData.length} of ${tableData.length} records match (${filterCount} filter${filterCount > 1 ? 's' : ''} applied)`;
            if (filteredData.length === 0) {
                previewSection.style.background = '#fff0f0';
                previewSection.style.borderColor = '#ffb3b3';
                previewTableContainer.style.display = 'none';
            } else {
                previewSection.style.background = '#f0fff0';
                previewSection.style.borderColor = '#b3ffb3';
                createPreviewTable(filteredData);
            }
        }
    }
    
    // Add filter button
    const addFilterBtn = document.createElement('button');
    addFilterBtn.textContent = '+ Add Filter';
    addFilterBtn.style.cssText = `
        padding: 10px 16px;
        border: 1px dashed #667eea;
        border-radius: 6px;
        background: white;
        color: #667eea;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: all 0.2s;
        margin-bottom: 16px;
    `;
    addFilterBtn.onmouseover = () => {
        addFilterBtn.style.background = '#f5f7ff';
        addFilterBtn.style.borderStyle = 'solid';
    };
    addFilterBtn.onmouseout = () => {
        addFilterBtn.style.background = 'white';
        addFilterBtn.style.borderStyle = 'dashed';
    };
    addFilterBtn.onclick = () => {
        const filterRow = createFilterRow();
        filtersContainer.appendChild(filterRow);
    };
    
    // Assemble scroll content
    scrollContainer.appendChild(filtersContainer);
    scrollContainer.appendChild(addFilterBtn);
    scrollContainer.appendChild(previewSection);
    
    // Action buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'display: flex; gap: 8px; margin-top: auto;';
    
    const applyBtn = document.createElement('button');
    applyBtn.textContent = 'Load Data';
    applyBtn.style.cssText = `
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 6px;
        background: #667eea;
        color: white;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: background 0.2s;
    `;
    applyBtn.onmouseover = () => applyBtn.style.background = '#5568d3';
    applyBtn.onmouseout = () => applyBtn.style.background = '#667eea';
    applyBtn.onclick = () => {
        document.body.removeChild(overlay);
        onApply(activeFilters);
    };
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        flex: 1;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 6px;
        background: white;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.2s;
    `;
    cancelBtn.onmouseover = () => cancelBtn.style.background = '#f5f5f5';
    cancelBtn.onmouseout = () => cancelBtn.style.background = 'white';
    cancelBtn.onclick = () => document.body.removeChild(overlay);
    
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear All';
    clearBtn.style.cssText = `
        padding: 12px 20px;
        border: 1px solid #ddd;
        border-radius: 6px;
        background: white;
        cursor: pointer;
        font-size: 14px;
        color: #666;
        transition: all 0.2s;
    `;
    clearBtn.onmouseover = () => {
        clearBtn.style.background = '#fff0f0';
        clearBtn.style.borderColor = '#ffb3b3';
    };
    clearBtn.onmouseout = () => {
        clearBtn.style.background = 'white';
        clearBtn.style.borderColor = '#ddd';
    };
    clearBtn.onclick = () => {
        filtersContainer.innerHTML = '';
        activeFilters = [];
        updatePreview();
    };
    
    buttonContainer.appendChild(clearBtn);
    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(applyBtn);
    
    // Assemble modal
    modal.appendChild(title);
    modal.appendChild(subtitle);
    modal.appendChild(scrollContainer);
    modal.appendChild(buttonContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    };
}

// Enhanced apply filters function with type support
export function applyFilters(data, filters) {
    if (!filters || filters.length === 0) {
        return data;
    }

    return data.filter(row => {
        return filters.every(filter => {
            const rawValue = row[filter.field];
            const fieldType = filter.fieldType;
            
            // Handle empty checks first
            if (filter.operator === 'is_empty') {
                return rawValue === null || rawValue === undefined || rawValue === '';
            }
            if (filter.operator === 'is_not_empty') {
                return rawValue !== null && rawValue !== undefined && rawValue !== '';
            }
            
            // Type-specific filtering
            if (fieldType === 'number') {
                const value = parseFloat(rawValue);
                const filterValue = parseFloat(filter.value);
                
                if (isNaN(value) || isNaN(filterValue)) return false;
                
                switch (filter.operator) {
                    case 'equals': return value === filterValue;
                    case 'not_equals': return value !== filterValue;
                    case 'greater_than': return value > filterValue;
                    case 'less_than': return value < filterValue;
                    case 'greater_or_equal': return value >= filterValue;
                    case 'less_or_equal': return value <= filterValue;
                    default: return true;
                }
            } else if (fieldType === 'date') {
                const value = new Date(rawValue);
                const filterValue = new Date(filter.value);
                
                if (isNaN(value.getTime()) || isNaN(filterValue.getTime())) return false;
                
                // Compare dates without time
                const valueDate = new Date(value.getFullYear(), value.getMonth(), value.getDate());
                const filterDate = new Date(filterValue.getFullYear(), filterValue.getMonth(), filterValue.getDate());
                
                switch (filter.operator) {
                    case 'is': return valueDate.getTime() === filterDate.getTime();
                    case 'is_not': return valueDate.getTime() !== filterDate.getTime();
                    case 'is_before': return valueDate < filterDate;
                    case 'is_after': return valueDate > filterDate;
                    case 'is_on_or_before': return valueDate <= filterDate;
                    case 'is_on_or_after': return valueDate >= filterDate;
                    default: return true;
                }
            } else { // text
                const value = String(rawValue || '').toLowerCase();
                const filterValue = String(filter.value || '').toLowerCase();

                switch (filter.operator) {
                    case 'is': return value === filterValue;
                    case 'is_not': return value !== filterValue;
                    case 'contains': return value.includes(filterValue);
                    case 'does_not_contain': return !value.includes(filterValue);
                    case 'starts_with': return value.startsWith(filterValue);
                    case 'ends_with': return value.endsWith(filterValue);
                    default: return true;
                }
            }
        });
    });
}



export async function insertDatabaseWithData(rootComponent, tableData, selectedApp, selectedTable, filters, userId, jwtToken, fields = []) {
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

            // Enhanced metadata with filter conditions
            const superAppMetadata = {
                source: 'superapp_table',
                userId: userId,
                appName: selectedApp.app_name,
                tableName: selectedTable.name,
                filters: filters || [],
                // fields: fields,
                lastFetched: new Date().toISOString(),
                version: '2.0'
            };

            // Wait for database block to be fully initialized
            await new Promise((resolve) => setTimeout(resolve, 100));

            const columnKeys = Object.keys(tableData[0]).filter(key => !key.startsWith('_'));
            const columnIdMap = {};

            // Delete all default rows
            const defaultChildren = dbModel.children ? [...dbModel.children] : [];
            for (const childId of defaultChildren) {
                doc.deleteBlock(childId);
            }
            
            await new Promise((resolve) => setTimeout(resolve, 100));

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

            // CREATE ALL COLUMNS AND VIEW IN ONE TRANSACTION
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
                
                // Add regular data columns
                for (let i = 1; i < columnKeys.length; i++) {
                    const key = columnKeys[i];
                    const columnName = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
                    
                    const colId = doc.generateBlockId();
                    
                    dbModel.columns.push({
                        type: 'rich-text',
                        name: columnName,
                        data: {},
                        id: colId
                    });
                    
                    viewColumns.push({
                        id: colId,
                        hide: false
                    });
                    
                    columnIdMap[key] = colId;
                    console.log(`Created column: ${columnName} (${colId})`);
                }
                
                // ✅ CREATE HIDDEN METADATA COLUMN
                const metadataColumnId = '__superapp_metadata__';
                dbModel.columns.push({
                    type: 'rich-text',
                    name: '__SuperApp_Metadata__',
                    id: metadataColumnId,
                    data: {
                        superAppMetadata: superAppMetadata
                    }
                });
                
                console.log("✅ Created metadata column with data:", superAppMetadata);
                
                // Update view
                if (dbModel.views && dbModel.views.length > 0) {
                    const tableView = dbModel.views[0];
                    
                    if (!tableView.header) {
                        tableView.header = {};
                    }
                    tableView.header.titleColumn = titleColumnId;
                    tableView.header.iconColumn = "type";
                    
                    // Add regular columns to view (visible)
                    tableView.columns = [...viewColumns];
                    
                    // Optionally hide metadata column from view
                    // tableView.columns.push({
                    //     id: metadataColumnId,
                    //     hide: true
                    // });
                }
                
                console.log(`Created ${viewColumns.length} data columns + 1 metadata column`);
            });

            await new Promise((resolve) => setTimeout(resolve, 500));

            // INSERT DATA ROWS
            console.log("Inserting", tableData.length, "rows...");
            
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
                await new Promise((resolve) => setTimeout(resolve, 50));
            }

            await new Promise((resolve) => setTimeout(resolve, 100));

            // POPULATE ALL CELLS IN A SINGLE TRANSACTION
            console.log("Populating cells...");
            doc.transact(() => {
                if (!dbModel.cells) {
                    dbModel.cells = {};
                }

                for (let rowIndex = 0; rowIndex < tableData.length; rowIndex++) {
                    const rowId = rowIds[rowIndex];
                    const row = tableData[rowIndex];
                    
                    if (!dbModel.cells[rowId]) {
                        dbModel.cells[rowId] = {};
                    }

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
                }
            });

            // UPDATE DB TITLE WITH FILTER INDICATION
            doc.transact(() => {
                if (dbModel.title) {
                    dbModel.title.clear();
                    const filterSuffix = filters && filters.length > 0 ? ` (${filters.length} filter${filters.length > 1 ? 's' : ''})` : '';
                    dbModel.title.insert(
                        `${selectedApp.app_name} - ${selectedTable.name}${filterSuffix}`,
                        0
                    );
                }
            });

            await new Promise((resolve) => setTimeout(resolve, 200));

            console.log("=== COMPLETE ===");
            console.log("Final columns:", dbModel.columns.length);
            console.log("Total rows created:", rowIds.length);
            console.log("Final metadata:", getSuperAppMetadata(dbModel));
            
            const filterMsg = filters && filters.length > 0 ? ` with ${filters.length} filter(s)` : '';
            toast(rootComponent.host, `Loaded ${tableData.length} rows with ${dbModel.columns.length} columns${filterMsg}!`);
            
            // VERIFY METADATA IS STORED AND WILL BE EXPORTED
            setTimeout(() => {
                const finalMetadata = getSuperAppMetadata(dbModel);
                if (finalMetadata) {
                    console.log("✅ Metadata successfully stored and will persist in exports:", finalMetadata);
                } else {
                    console.error("❌ Metadata not stored properly");
                }
            }, 500);
        })
        .run();
}

// ✅ UPDATED HELPER FUNCTIONS
function storeSuperAppMetadata(dbModel, metadata) {
    const metadataColumnId = '__superapp_metadata__';
    let columnIndex = dbModel.columns.findIndex(col => col.id === metadataColumnId);
    
    if (columnIndex === -1) {
        // Add hidden metadata column
        dbModel.columns.push({
            type: 'rich-text',
            name: '__SuperApp_Metadata__',
            id: metadataColumnId,
            data: {
                superAppMetadata: metadata
            }
        });
        console.log("✅ Created metadata column");
    } else {
        // Update existing column's data
        dbModel.columns[columnIndex] = {
            ...dbModel.columns[columnIndex],
            data: {
                superAppMetadata: metadata
            }
        };
        console.log("✅ Updated metadata column");
    }
    
    console.log("✅ Stored SuperApp metadata:", metadata);
}

function getSuperAppMetadata(dbModel) {
    const metadataColumn = dbModel.columns.find(col => col.id === '__superapp_metadata__');
    const metadata = metadataColumn?.data?.superAppMetadata;
    console.log("📖 Retrieved metadata:", metadata);
    return metadata;
}

// ✅ FUNCTION TO GET ALL DATABASE BLOCKS WITH METADATA
export function getAllDatabasesWithMetadata(doc) {
    const databases = [];
    
    const findDatabaseBlocks = (blockId) => {
        const block = doc.getBlock(blockId);
        if (!block) return;
        
        if (block.flavour === 'affine:database') {
            const metadata = getSuperAppMetadata(block.model);
            if (metadata) {
                databases.push({
                    id: block.id,
                    title: block.model.title?.toString() || 'Untitled',
                    metadata: metadata,
                    model: block.model
                });
            }
        }
        
        // Recursively check children
        if (block.model.children) {
            block.model.children.forEach(childId => findDatabaseBlocks(childId));
        }
    };
    
    if (doc.root) {
        findDatabaseBlocks(doc.root.id);
    }
    
    return databases;
}

// ✅ FUNCTION TO UPDATE EXISTING DATABASE WITH NEW DATA
export async function updateDatabaseWithNewData(doc, databaseBlockId, newTableData, newFilters) {
    const dbBlock = doc.getBlock(databaseBlockId);
    if (!dbBlock) {
        console.error("Database block not found");
        return false;
    }
    
    const dbModel = dbBlock.model;
    
    // Get existing metadata
    const existingMetadata = getSuperAppMetadata(dbModel);
    if (!existingMetadata) {
        console.error("No metadata found for this database");
        return false;
    }
    
    // Update metadata with new filters and timestamp
    const updatedMetadata = {
        ...existingMetadata,
        filters: newFilters || existingMetadata.filters,
        lastFetched: new Date().toISOString()
    };
    
    // Clear existing rows
    const existingChildren = dbModel.children ? [...dbModel.children] : [];
    for (const childId of existingChildren) {
        doc.deleteBlock(childId);
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Get column mapping
    const columnKeys = Object.keys(newTableData[0]).filter(key => !key.startsWith('_'));
    const columnIdMap = {};
    
    // Map column keys to existing column IDs
    for (const key of columnKeys) {
        const columnName = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
        const existingCol = dbModel.columns.find(col => 
            col.name.toLowerCase() === columnName.toLowerCase()
        );
        if (existingCol) {
            columnIdMap[key] = existingCol.id;
        }
    }
    
    // Insert new rows
    const rowIds = [];
    const firstKey = columnKeys[0];
    
    for (let rowIndex = 0; rowIndex < newTableData.length; rowIndex++) {
        const row = newTableData[rowIndex];
        const titleValue = row[firstKey] || '';

        const rowId = doc.addBlock(
            'affine:paragraph',
            { 
                type: 'text',
                text: new doc.Text(String(titleValue))
            },
            databaseBlockId
        );
        
        rowIds.push(rowId);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Populate cells
    doc.transact(() => {
        dbModel.cells = {};
        
        for (let rowIndex = 0; rowIndex < newTableData.length; rowIndex++) {
            const rowId = rowIds[rowIndex];
            const row = newTableData[rowIndex];
            
            dbModel.cells[rowId] = {};

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
        }
        
        // Update metadata
        storeSuperAppMetadata(dbModel, updatedMetadata);
        
        // Update title
        if (dbModel.title) {
            dbModel.title.clear();
            const filterSuffix = updatedMetadata.filters && updatedMetadata.filters.length > 0 
                ? ` (${updatedMetadata.filters.length} filter${updatedMetadata.filters.length > 1 ? 's' : ''})` 
                : '';
            dbModel.title.insert(
                `${updatedMetadata.appName} - ${updatedMetadata.tableName}${filterSuffix}`,
                0
            );
        }
    });
    
    console.log(`✅ Updated database with ${newTableData.length} rows`);
    return true;
}

export function addRefreshAction(rootComponent, blockId, userId, jwtToken) {

    console.log(`Refresh action available for block ${blockId}`);
    

}
export async function refreshSuperAppTable(rootComponent, blockId, userId, jwtToken) {
    const doc = rootComponent.doc;
    const dbBlock = doc.getBlock(blockId);
    
    if (!dbBlock || !dbBlock.model.meta?.superAppMetadata) {
        toast(rootComponent.host, 'This is not a SuperApp table block');
        return;
    }

    const metadata = dbBlock.model.meta.superAppMetadata;
    
    toast(rootComponent.host, `Refreshing ${metadata.tableName}...`);

    try {
        const response = await fetchTableData(
            metadata.userId,
            metadata.appName,
            metadata.tableName,
            jwtToken
        );

        const rawTableData = response?.data?.data?.data || response?.data?.data || [];
        
        if (!rawTableData || rawTableData.length === 0) {
            toast(rootComponent.host, 'No data found');
            return;
        }

        // Apply the same filters
        const filteredData = applyFilters(rawTableData, metadata.filters);

        // Clear existing data and repopulate
        // ... (similar to initial population but clearing first)
        
        // Update metadata timestamp
        metadata.lastFetched = new Date().toISOString();
        
        toast(rootComponent.host, `Refreshed with ${filteredData.length} rows!`);
        
    } catch (err) {
        console.error("Error refreshing table:", err);
        toast(rootComponent.host, "Failed to refresh table");
    }
}





























export function showChartFieldSelector(rootComponent, model, chartType, data, fields, selectedApp, selectedTable, filters) {
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

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 24px;
        width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    const title = document.createElement('h3');
    title.textContent = `Configure ${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`;
    title.style.cssText = 'margin: 0 0 16px 0; font-size: 18px; color: #333;';

    // Chart Title Input
    const titleInput = document.createElement('input');
    titleInput.placeholder = 'Chart Title';
    titleInput.style.cssText = `
        width: 100%;
        padding: 10px;
        margin-bottom: 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    `;

    // Field selection based on chart type
    const fieldSelectionContainer = document.createElement('div');
    fieldSelectionContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px;';

    const getCompatibleFields = (chartType, fields) => {
        const compatibleFields = [];
        
        fields.forEach(field => {
            let isCompatible = false;
            
            switch (chartType) {
                case 'bar':
                case 'line':
                    // For bar/line charts: category (text/date) + value (number)
                    if (field.type === 'number') {
                        isCompatible = { type: 'value', label: `Value: ${field.label || field.name}` };
                    } else if (field.type === 'text' || field.type === 'date') {
                        isCompatible = { type: 'category', label: `Category: ${field.label || field.name}` };
                    }
                    break;
                    
                case 'pie':
                    // For pie charts: label (text) + value (number)
                    if (field.type === 'number') {
                        isCompatible = { type: 'value', label: `Value: ${field.label || field.name}` };
                    } else if (field.type === 'text') {
                        isCompatible = { type: 'label', label: `Label: ${field.label || field.name}` };
                    }
                    break;
            }
            
            if (isCompatible) {
                compatibleFields.push({
                    ...field,
                    role: isCompatible.type,
                    displayLabel: isCompatible.label
                });
            }
        });
        
        return compatibleFields;
    };

    const compatibleFields = getCompatibleFields(chartType, fields);
    
    // Declare these variables at the function scope
    let categorySelect = null;
    let valueSelect = null;
    let currentChart = null;
    let previewCanvas = null;

    if (compatibleFields.length === 0) {
        const noFieldsMsg = document.createElement('p');
        noFieldsMsg.textContent = 'No compatible fields found for this chart type. Bar/Line charts need text/date and number fields. Pie charts need text and number fields.';
        noFieldsMsg.style.cssText = 'color: #666; font-size: 14px; text-align: center; padding: 20px;';
        fieldSelectionContainer.appendChild(noFieldsMsg);
    } else {
        // Category/Label field selection
        const categoryFields = compatibleFields.filter(f => f.role === 'category' || f.role === 'label');
        if (categoryFields.length > 0) {
            const categoryLabel = document.createElement('label');
            categoryLabel.textContent = chartType === 'pie' ? 'Select Label Field:' : 'Select Category Field:';
            categoryLabel.style.cssText = 'font-weight: 600; margin-bottom: 8px;';
            
            categorySelect = document.createElement('select');
            categorySelect.style.cssText = 'width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;';
            
            categoryFields.forEach(field => {
                const option = document.createElement('option');
                option.value = field.name;
                option.textContent = field.displayLabel;
                categorySelect.appendChild(option);
            });
            
            fieldSelectionContainer.appendChild(categoryLabel);
            fieldSelectionContainer.appendChild(categorySelect);
        }

        // Value field selection
        const valueFields = compatibleFields.filter(f => f.role === 'value');
        if (valueFields.length > 0) {
            const valueLabel = document.createElement('label');
            valueLabel.textContent = 'Select Value Field:';
            valueLabel.style.cssText = 'font-weight: 600; margin-bottom: 8px;';
            
            valueSelect = document.createElement('select');
            valueSelect.style.cssText = 'width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;';
            
            valueFields.forEach(field => {
                const option = document.createElement('option');
                option.value = field.name;
                option.textContent = field.displayLabel;
                valueSelect.appendChild(option);
            });
            
            fieldSelectionContainer.appendChild(valueLabel);
            fieldSelectionContainer.appendChild(valueSelect);
        }

        // Preview section
        const previewSection = document.createElement('div');
        previewSection.style.cssText = 'margin: 20px 0; padding: 16px; background: #f9f9f9; border-radius: 6px;';
        
        const previewTitle = document.createElement('h4');
        previewTitle.textContent = 'Preview';
        previewTitle.style.cssText = 'margin: 0 0 12px 0; font-size: 14px;';
        
        previewCanvas = document.createElement('canvas');
        previewCanvas.style.cssText = 'max-width: 100%; border: 1px solid #eee; border-radius: 4px;';
        
        previewSection.appendChild(previewTitle);
        previewSection.appendChild(previewCanvas);

        const updatePreview = () => {
            if (!categorySelect || !valueSelect) return;
            
            const categoryField = categorySelect.value;
            const valueField = valueSelect.value;
            
            if (!categoryField || !valueField) return;

            // Process data for chart
            const chartData = processDataForChart(data, categoryField, valueField, chartType);
            
            if (currentChart) currentChart.destroy();
            
            currentChart = createChartPreview(
                previewCanvas, 
                chartType, 
                titleInput.value || 'Chart', 
                chartData.labels, 
                chartData.values
            );
        };

        // Add event listeners for live preview
        if (categorySelect) categorySelect.addEventListener('change', updatePreview);
        if (valueSelect) valueSelect.addEventListener('change', updatePreview);
        titleInput.addEventListener('input', updatePreview);

        // Initial preview
        setTimeout(updatePreview, 100);
        
        modal.appendChild(previewSection);
    }

    // Buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'display: flex; gap: 8px; justify-content: flex-end; margin-top: 20px;';

    const insertBtn = document.createElement('button');
    insertBtn.textContent = 'Insert Chart';
    insertBtn.style.cssText = `
        padding: 10px 20px;
        border: none;
        background: #667eea;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
    `;

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        padding: 10px 20px;
        border: 1px solid #ccc;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        color:black;
    `;

    insertBtn.onclick = async () => {
        if (!categorySelect || !valueSelect) {
            toast(rootComponent.host, 'Please select both fields');
            return;
        }

        const categoryField = categorySelect.value;
        const valueField = valueSelect.value;
        
        if (!categoryField || !valueField) {
            toast(rootComponent.host, 'Please select both fields');
            return;
        }

        const chartData = processDataForChart(data, categoryField, valueField, chartType);
        
        // Create final chart and insert as image with metadata
        await createAndInsertChartWithMetadata(
            rootComponent,
            model,
            chartType,
            chartData.labels,
            chartData.values,
            titleInput.value,
            selectedApp,
            selectedTable,
            filters,
            { categoryField, valueField }
        );

        if (currentChart) currentChart.destroy();
        document.body.removeChild(overlay);
    };

    cancelBtn.onclick = () => {
        if (currentChart) currentChart.destroy();
        document.body.removeChild(overlay);
    };

    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(insertBtn);

    modal.appendChild(title);
    modal.appendChild(titleInput);
    modal.appendChild(fieldSelectionContainer);
    modal.appendChild(buttonContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.onclick = (e) => {
        if (e.target === overlay) {
            if (currentChart) currentChart.destroy();
            document.body.removeChild(overlay);
        }
    };
}

export async function showSuperAppChartCreator(rootComponent, model, chartType) {
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

                const rawTableData = response?.data?.data?.data || response?.data?.data || [];
                const fields = response?.data?.fields || [];

                if (!rawTableData || rawTableData.length === 0) {
                    toast(rootComponent.host, 'No data found in this table');
                    return;
                }

                // Show filter modal first
                showFilterModal(rootComponent.host, fields, rawTableData, async (filters) => {
                    const filteredData = applyFilters(rawTableData, filters);

                    if (filteredData.length === 0) {
                        toast(rootComponent.host, 'No data matches the applied filters');
                        return;
                    }

                    // Then show chart configuration with field selection
                    showChartFieldSelector(
                        rootComponent, 
                        model, 
                        chartType, 
                        filteredData, 
                        fields,
                        selectedApp,
                        selectedTable,
                        filters
                    );
                });
            });
        });

    } catch (err) {
        console.error("Error creating SuperApp chart:", err);
        toast(rootComponent.host, "Failed to create chart");
    }
}


export function processDataForChart(data, categoryField, valueField, chartType) {
    if (chartType === 'pie') {
        // Aggregate data for pie chart
        const aggregated = {};
        data.forEach(row => {
            const category = row[categoryField];
            const value = parseFloat(row[valueField]) || 0;
            if (category) {
                aggregated[category] = (aggregated[category] || 0) + value;
            }
        });
        
        return {
            labels: Object.keys(aggregated),
            values: Object.values(aggregated)
        };
    } else {
        // For bar/line charts, use raw data or aggregate if needed
        const labels = [];
        const values = [];
        
        data.forEach(row => {
            const label = row[categoryField];
            const value = parseFloat(row[valueField]);
            
            if (label && !isNaN(value)) {
                labels.push(label);
                values.push(value);
            }
        });
        
        return { labels, values };
    }
}


export async function createAndInsertChartWithMetadata(
    rootComponent,
    model,
    chartType,
    labels,
    values,
    chartTitle,
    selectedApp,
    selectedTable,
    filters,
    fieldMapping
) {
    try {
        console.log('Using existing preview canvas...');
        
        const previewCanvas = document.querySelector('canvas');
        if (!previewCanvas) {
            throw new Error('No canvas found in DOM');
        }
        
        console.log('Found canvas:', previewCanvas);
        
        // Prepare metadata to store
        const chartMetadata = {
            chartType: chartType,
            appName: selectedApp.app_name,
            appId: selectedApp.id,
            tableName: selectedTable.name,
            tableId: selectedTable.id,
            filters: filters,
            fieldMapping: fieldMapping,
            createdAt: new Date().toISOString(),
            title: chartTitle
        };
        
        // Insert chart and get the image block ID
        const imageBlockId = await insertChartAsImageWithMetadata(
            rootComponent, 
            model, 
            previewCanvas, 
            chartTitle,
            chartMetadata
        );
        
        console.log('✅ Chart inserted with metadata:', chartMetadata);
        
    } catch (error) {
        console.error('Error creating chart:', error);
        toast(rootComponent.host, 'Failed to create chart: ' + error.message);
    }
}

// Make sure we're using the exact same createChartPreview function
export function createChartPreview2(canvas, chartType, title, labels, data) {
    const ctx = canvas.getContext('2d');
    
    // Clear any existing chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const colors = chartType === "pie"
        ? generateDistinctColors(labels.length)
        : 'rgba(102, 126, 234, 0.6)';

    const config = {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: title || 'Dataset',
                data: data,
                backgroundColor: colors,
                borderColor: chartType === 'pie' ? '#fff' : 'rgba(102, 126, 234, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: !!title,
                    text: title,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: chartType === 'pie',
                    position: 'bottom'
                }
            },
            scales: chartType !== 'pie' ? {
                y: {
                    beginAtZero: true
                }
            } : {}
        }
    };

    return new Chart(ctx, config);
}

// Use the exact same insertChartAsImage function from working version
export async function insertChartAsImage2(rootComponent, model, canvas, chartTitle) {
    try {
        // Convert canvas to blob
        const blob = await new Promise(resolve => {
            canvas.toBlob(resolve, 'image/png');
        });

        // Store in BlockSuite blob storage (same as cover image)
        const doc = rootComponent.doc;
        const storage = doc.collection.blobSync;
        const blobId = await storage.set(blob);

        // Insert as image block
        const parentModel = doc.getParent(model);
        if (!parentModel) return;

        const index = parentModel.children.indexOf(model) + 1;
        
        const imageId = doc.addBlock(
            'affine:image',
            {
                sourceId: blobId,
                caption: chartTitle || 'Chart'
            },
            parentModel,
            index
        );

        tryRemoveEmptyLine(model);

        rootComponent.host.selection.setGroup('note', [
            rootComponent.host.selection.create('block', {
                blockId: imageId,
            }),
        ]);

        toast(rootComponent.host, 'Chart inserted successfully');
    } catch (error) {
        console.error('Error inserting chart:', error);
        toast(rootComponent.host, 'Failed to insert chart');
    }
}
export async function insertChartAsImageWithMetadata(rootComponent, model, canvas, chartTitle, metadata) {
    try {
        // Convert canvas to blob
        const blob = await new Promise(resolve => {
            canvas.toBlob(resolve, 'image/png');
        });

        // Store in BlockSuite blob storage
        const doc = rootComponent.doc;
        const storage = doc.collection.blobSync;
        const blobId = await storage.set(blob);

        // Insert as image block
        const parentModel = doc.getParent(model);
        if (!parentModel) return;

        const index = parentModel.children.indexOf(model) + 1;
        
        const imageId = doc.addBlock(
            'affine:image',
            {
                sourceId: blobId,
                caption: chartTitle || 'Chart',
                '__superapp_chart_metadata__': JSON.stringify(metadata)
            },
            parentModel,
            index
        );

        tryRemoveEmptyLine(model);

        rootComponent.host.selection.setGroup('note', [
            rootComponent.host.selection.create('block', {
                blockId: imageId,
            }),
        ]);

        toast(rootComponent.host, 'Chart inserted successfully');
        
        return imageId;
    } catch (error) {
        console.error('Error inserting chart:', error);
        toast(rootComponent.host, 'Failed to insert chart');
        throw error;
    }
}



// ✅ IMAGE METADATA HELPER FUNCTIONS
function storeImageMetadata(imageModel, metadata) {
    // Store metadata in a custom property on the image block
    const metadataString = JSON.stringify(metadata);
    
    // BlockSuite allows custom properties - store it directly on the model
    if (!imageModel.caption) {
        imageModel.caption = '';
    }
    
    // Store metadata in a hidden format that won't be visible to users
    // Using a special prefix that we can parse later
    imageModel['__superapp_chart_metadata__'] = metadataString;
    
    console.log("✅ Stored image chart metadata:", metadata);
}

function getImageMetadata(imageModel) {
    try {
        const metadataString = imageModel['__superapp_chart_metadata__'];
        if (!metadataString) return null;
        
        const metadata = JSON.parse(metadataString);
        console.log("📖 Retrieved image metadata:", metadata);
        return metadata;
    } catch (error) {
        console.error("Error parsing image metadata:", error);
        return null;
    }
}

// ✅ FUNCTION TO GET ALL CHART IMAGES WITH METADATA
export function getAllChartsWithMetadata(doc) {
    const charts = [];
    
    const findImageBlocks = (blockId) => {
        const block = doc.getBlock(blockId);
        if (!block) return;
        
        if (block.flavour === 'affine:image') {
            const metadata = getImageMetadata(block.model);
            if (metadata) {
                charts.push({
                    id: block.id,
                    caption: block.model.caption || 'Untitled Chart',
                    sourceId: block.model.sourceId,
                    metadata: metadata,
                    model: block.model
                });
            }
        }
        
        // Recursively check children
        if (block.model.children) {
            block.model.children.forEach(child => {
                if (typeof child === 'string') {
                    findImageBlocks(child);
                } else if (child.id) {
                    findImageBlocks(child.id);
                }
            });
        }
    };
    
    if (doc.root) {
        findImageBlocks(doc.root.id);
    }
    
    return charts;
}