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



export async function showChartCreator(rootComponent, model, chartType) {
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

export function createChartPreview(canvas, chartType, title, labels, data) {
    const ctx = canvas.getContext('2d');
    
    // Clear any existing chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const config = {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: title || 'Dataset',
                data: data,
                backgroundColor: chartType === 'pie' ? [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
                    '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
                ] : 'rgba(102, 126, 234, 0.6)',
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