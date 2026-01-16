import { initializeApp, products, addItem, deleteItem } from './app.js';
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

const loginScreen = document.getElementById('login-screen');
const adminPanel = document.getElementById('admin-panel');
const passwordInput = document.getElementById('admin-password');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const categoriesContainer = document.getElementById('categories-container');

const CATEGORIES = [
    { id: 'bathtubs', name: 'Bathtubs' },
    { id: 'showers', name: 'Showers' },
    { id: 'trim', name: 'Trim & Fixtures' },
    { id: 'toilets', name: 'Toilets' },
    { id: 'sinks', name: 'Sinks' },
    { id: 'tiles', name: 'Tiles' },
    { id: 'labor', name: 'Labor & Installation' }
];

async function init() {
    await initializeApp();

    loginBtn.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    logoutBtn.addEventListener('click', () => {
        // Play Duck Hunt Dog Jump on logout
        playDuckHuntVideo(duckHuntDogJump, () => {
            adminPanel.style.display = 'none';
            loginScreen.style.display = 'block';
            passwordInput.value = '';
        });
    });
}

function handleLogin() {
    if (passwordInput.value === ADMIN_PASSWORD) {
        loginScreen.style.display = 'none';
        // Play Duck Hunt Memories on login
        playDuckHuntVideo(duckHuntMemories, () => {
            adminPanel.style.display = 'block';
            renderCategories();
        });
    } else {
        loginError.style.display = 'block';
    }
}

function renderCategories() {
    categoriesContainer.innerHTML = '';

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
        categoriesContainer.appendChild(section);
    });
}

function renderItemList(categoryId) {
    const items = products[categoryId] || [];
    if (items.length === 0) return '<p style="color: #6b7280; font-size: 14px;">No items in this category.</p>';

    return items.map(item => `
        <div class="item-row">
            <div>
                <strong>${item.name}</strong>
                <span style="color: #6b7280; margin-left: 8px;">$${parseFloat(item.price).toFixed(2)}</span>
            </div>
            <button class="btn-delete" onclick="window.handleDelete('${categoryId}', '${item.id}')">Delete</button>
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

init();
