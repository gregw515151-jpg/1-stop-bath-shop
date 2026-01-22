import { initializeApp, products, addItem, deleteItem, loginAdmin, logoutAdmin } from './app.js';
import duckHuntMemories from './assets/duck-hunt-memories.mp4';
import duckHuntDogJump from './assets/duck-hunt-dog-jump.mp4';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

// Function to play Duck Hunt video overlay
function playDuckHuntVideo(videoSrc, onComplete) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'duck-hunt-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
    `;

    // Create video element
    const video = document.createElement('video');
    video.src = videoSrc;
    video.autoplay = true;
    video.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 12px;
        box-shadow: 0 0 40px rgba(0, 255, 0, 0.5);
    `;

    // Skip message
    const skipText = document.createElement('div');
    skipText.textContent = 'Click anywhere to skip';
    skipText.style.cssText = `
        position: absolute;
        bottom: 20px;
        color: white;
        font-size: 14px;
        opacity: 0.7;
    `;

    overlay.appendChild(video);
    overlay.appendChild(skipText);
    document.body.appendChild(overlay);

    // Handle video end
    video.onended = () => {
        overlay.remove();
        if (onComplete) onComplete();
    };

    // Handle click to skip
    overlay.onclick = () => {
        video.pause();
        overlay.remove();
        if (onComplete) onComplete();
    };

    // Handle video error
    video.onerror = () => {
        console.warn('Duck Hunt video failed to load, skipping animation');
        overlay.remove();
        if (onComplete) onComplete();
    };
}


export async function initAdmin() {
    console.log('Initializing Admin Panel...');

    // Re-select elements inside init to ensure they exist
    const loginScreen = document.getElementById('login-screen');
    const adminPanel = document.getElementById('admin-panel');
    const passwordInput = document.getElementById('admin-password');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const categoriesContainer = document.getElementById('categories-container');
    const closeAdminBtn = document.getElementById('close-admin-btn');
    const adminOverlay = document.getElementById('admin-overlay');

    if (!loginScreen || !adminPanel) {
        console.error('Admin elements not found!');
        return;
    }

    await initializeApp();

    const handleLoginWrapper = () => {
        if (passwordInput.value === ADMIN_PASSWORD) {
            // Sync with global admin state
            loginAdmin(passwordInput.value);

            loginScreen.style.display = 'none';
            // Play Duck Hunt Memories on login
            playDuckHuntVideo(duckHuntMemories, () => {
                adminPanel.style.display = 'block';
                renderCategories(categoriesContainer);
                // Auto-close overlay after login, requiring explicit click on "Company Info" to re-open
                if (adminOverlay) adminOverlay.style.display = 'none';
            });
        } else {
            loginError.style.display = 'block';
        }
    };

    loginBtn.addEventListener('click', handleLoginWrapper);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLoginWrapper();
    });

    logoutBtn.addEventListener('click', () => {
        // Sync global logout
        logoutAdmin();

        // Play Duck Hunt Dog Jump on logout
        playDuckHuntVideo(duckHuntDogJump, () => {
            adminPanel.style.display = 'none';
            loginScreen.style.display = 'block';
            passwordInput.value = '';
            // Close the overlay too if desired, or just reset to login screen
            if (adminOverlay) adminOverlay.style.display = 'none';
        });
    });

    // Close button functionality
    if (closeAdminBtn && adminOverlay) {
        closeAdminBtn.addEventListener('click', () => {
            adminOverlay.style.display = 'none';
        });
    }
}

function renderCategories(container) {
    if (!container) return;
    container.innerHTML = '';

    // Add company info section first
    const companyInfo = localStorage.getItem('company_info') ? JSON.parse(localStorage.getItem('company_info')) : {
        name: '1 Stop Bath Shop',
        address: '',
        mhic: '',
        phone: '',
        email: ''
    };

    const companySection = document.createElement('section');
    companySection.className = 'category-section';
    companySection.style.cssText = 'background: #f0f9ff; border: 2px solid #3b82f6; margin-bottom: 24px;';
    companySection.innerHTML = `
        <h2 style="color: #1e40af;">🏢 Company Information</h2>
        <div style="display: grid; gap: 12px; margin-top: 16px;">
            <div>
                <label style="display: block; font-weight: 600; margin-bottom: 4px;">Company Name:</label>
                <input type="text" id="company-name" value="${companyInfo.name}" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
            </div>
            <div>
                <label style="display: block; font-weight: 600; margin-bottom: 4px;">Address:</label>
                <input type="text" id="company-address" value="${companyInfo.address}" placeholder="123 Main St, City, State ZIP" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
            </div>
            <div>
                <label style="display: block; font-weight: 600; margin-bottom: 4px;">MHIC #:</label>
                <input type="text" id="company-mhic" value="${companyInfo.mhic}" placeholder="Maryland Home Improvement Commission #" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div>
                    <label style="display: block; font-weight: 600; margin-bottom: 4px;">Phone:</label>
                    <input type="tel" id="company-phone" value="${companyInfo.phone}" placeholder="(555) 123-4567" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
                </div>
                <div>
                    <label style="display: block; font-weight: 600; margin-bottom: 4px;">Email:</label>
                    <input type="email" id="company-email" value="${companyInfo.email}" placeholder="info@company.com" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px;">
                </div>
            </div>
            <button class="btn btn-primary" onclick="window.saveCompanyInfo()" style="margin-top: 8px;">💾 Save Company Info</button>
        </div>
    `;
    container.appendChild(companySection);

    CATEGORIES.forEach(cat => {
        const section = document.createElement('section');
        section.className = 'category-section';

        section.innerHTML = `
            <h2>${cat.name}</h2>
            <div class="add-form">
                <input type="text" id="add-name-${cat.id}" placeholder="Item Name">
                <input type="number" id="add-price-${cat.id}" placeholder="Price" step="0.01">
                <button class="btn btn-primary" onclick="window.handleAdd('${cat.id}')">Add</button>
                <button class="btn btn-cancel" onclick="window.handleCancel('${cat.id}')" style="background: #6b7280; margin-left: 4px;">Cancel</button>
            </div>
            <div class="item-list" id="list-${cat.id}">
                ${renderItemList(cat.id)}
            </div>
        `;
        container.appendChild(section);
    });
}

function renderItemList(categoryId) {
    const items = products[categoryId] || [];
    if (items.length === 0) return '<p style="color: #6b7280; font-size: 14px;">No items in this category.</p>';

    return items.map(item => `
        <div class="item-row" id="item-${categoryId}-${item.id}">
            <div style="flex: 1;">
                <strong>${item.name}</strong>
                <span style="color: #6b7280; margin-left: 8px;">$${parseFloat(item.price).toFixed(2)}</span>
            </div>
            <div style="display: flex; gap: 8px;">
                <button class="btn" style="background: #3b82f6; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; border: none; cursor: pointer;" onclick="window.handleEdit('${categoryId}', '${item.id}', '${item.name.replace(/'/g, "\\'")}', ${item.price})">Edit</button>
                <button class="btn-delete" onclick="window.handleDelete('${categoryId}', '${item.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

window.handleAdd = async (categoryId) => {
    const nameInp = document.getElementById(`add-name-${categoryId}`);
    const priceInp = document.getElementById(`add-price-${categoryId}`);
    const name = nameInp.value.trim();
    const price = parseFloat(priceInp.value);

    if (!name || isNaN(price)) {
        alert('Please enter a valid name and price.');
        return;
    }

    try {
        await addItem(categoryId, name, price);
        nameInp.value = '';
        priceInp.value = '';
        renderCategories(); // Refresh all to keep state in sync
    } catch (err) {
        console.error(err);
        alert('Error adding item. Check console for details.');
    }
};

window.handleEdit = async (categoryId, itemId, currentName, currentPrice) => {
    const itemRow = document.getElementById(`item-${categoryId}-${itemId}`);
    if (!itemRow) return;

    // Replace item display with edit form
    itemRow.innerHTML = `
        <div style="flex: 1; display: flex; gap: 8px; align-items: center;">
            <input type="text" id="edit-name-${categoryId}-${itemId}" value="${currentName}" style="flex: 1; padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
            <input type="number" id="edit-price-${categoryId}-${itemId}" value="${currentPrice}" step="0.01" style="width: 100px; padding: 6px; border: 1px solid #d1d5db; border-radius: 4px;">
        </div>
        <div style="display: flex; gap: 8px;">
            <button class="btn" style="background: #10b981; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; border: none; cursor: pointer;" onclick="window.handleSaveEdit('${categoryId}', '${itemId}')">Save</button>
            <button class="btn" style="background: #6b7280; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; border: none; cursor: pointer;" onclick="window.handleCancelEdit('${categoryId}')">Cancel</button>
        </div>
    `;
};

window.handleSaveEdit = async (categoryId, itemId) => {
    const nameInput = document.getElementById(`edit-name-${categoryId}-${itemId}`);
    const priceInput = document.getElementById(`edit-price-${categoryId}-${itemId}`);

    const newName = nameInput.value.trim();
    const newPrice = parseFloat(priceInput.value);

    if (!newName || isNaN(newPrice)) {
        alert('Please enter a valid name and price.');
        return;
    }

    try {
        // Delete the old item
        await deleteItem(categoryId, itemId);
        // Add the item with new values but same ID
        const categoryItems = products[categoryId];
        categoryItems.push({ id: itemId, name: newName, price: newPrice });
        // Sort by ID
        categoryItems.sort((a, b) => parseInt(a.id) - parseInt(b.id));

        // Save to storage
        await import('./app.js').then(module => module.saveProductsToStorage());

        renderCategories();
    } catch (err) {
        console.error(err);
        alert('Error updating item. Check console for details.');
    }
};

window.handleCancelEdit = (categoryId) => {
    renderCategories();
};

window.handleDelete = async (categoryId, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
        await deleteItem(categoryId, id);
        renderCategories();
    } catch (err) {
        console.error(err);
        alert('Error deleting item.');
    }
};

window.handleCancel = (categoryId) => {
    const nameInp = document.getElementById(`add-name-${categoryId}`);
    const priceInp = document.getElementById(`add-price-${categoryId}`);
    nameInp.value = '';
    priceInp.value = '';
};

window.saveCompanyInfo = () => {
    const companyInfo = {
        name: document.getElementById('company-name').value,
        address: document.getElementById('company-address').value,
        mhic: document.getElementById('company-mhic').value,
        phone: document.getElementById('company-phone').value,
        email: document.getElementById('company-email').value
    };
    localStorage.setItem('company_info', JSON.stringify(companyInfo));
    alert('✅ Company information saved successfully!');
};

// init(); calls removed, use exported initAdmin()

