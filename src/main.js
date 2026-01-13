// src/main.js - Contractor Quote System
import './style.css'
import { initializeApp } from './app.js'

/* ---------- Config ---------- */
const DEFAULT_LOGO_URL = "/logos/1-STOP-BATH-SHOP-LOGO.jpg";
const MAX_PHOTOS = 15;
const SITE_PASSWORD = "bath2025"; // Change this to your desired password

/* ---------- Password Protection ---------- */
function checkSiteAccess() {
  const accessGranted = sessionStorage.getItem('siteAccess');
  if (accessGranted === 'true') {
    return true;
  }

  const password = prompt('Enter site password to access:');
  if (password === SITE_PASSWORD) {
    sessionStorage.setItem('siteAccess', 'true');
    return true;
  } else if (password !== null) {
    alert('Incorrect password. Access denied.');
    document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui;"><h1>Access Denied</h1></div>';
    return false;
  } else {
    document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui;"><h1>Access Required</h1></div>';
    return false;
  }
}

// Check access before loading app
if (!checkSiteAccess()) {
  throw new Error('Access denied');
}

/* ---------- HTML Template ---------- */
function getAppHtml(maxPhotos) {
  return `
  <div class="container">
    <!-- Header -->
    <header style="text-align:center; margin-bottom: 16px; position: relative;">
      <button id="admin-btn" class="admin-toggle-btn" style="position: absolute; top: 0; right: 0; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 12px;">🔐 Admin</button>
      <button id="admin-logout-btn" class="admin-control" style="display: none; position: absolute; top: 0; right: 120px; padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 12px;">Logout</button>
      <img id="company-logo" class="header-logo" alt="1 STOP BATH SHOP" src="" />
      <h1 style="margin: 16px 0 4px;">Bathroom Quote System</h1>
    </header>

    <!-- Scope of Work - Centered -->
    <section class="card" style="margin-bottom: 16px; max-width: 500px; margin-left: auto; margin-right: auto;">
      <div class="form-group" style="margin: 0;">
        <label for="scope_of_work-select" style="text-decoration: underline; display: block; text-align: center; font-size: 1.1rem; font-weight: 600; margin-bottom: 12px;">Scope of Work</label>
        <select id="scope_of_work-select" class="select-input">
          <option value="">-- Select --</option>
        </select>
      </div>
    </section>

    <!-- Customer Details -->
    <section class="card" style="margin-bottom:16px;">
      <h2 style="margin:0 0 8px;">Customer Details</h2>
      <div class="row" style="gap:12px; display:flex; flex-wrap:wrap;">
        <input id="customer-name" type="text" placeholder="Customer name" style="flex:1; min-width:220px; padding:8px; border:1px solid #e5e7eb; border-radius:8px;">
        <input id="customer-phone" type="tel" placeholder="Phone" style="flex:1; min-width:220px; padding:8px; border:1px solid #e5e7eb; border-radius:8px;">
        <input id="customer-email" type="email" placeholder="Email" style="flex:1; min-width:220px; padding:8px; border:1px solid #e5e7eb; border-radius:8px;">
      </div>
      <div style="margin-top:8px;">
        <textarea id="customer-address" placeholder="Address" rows="2" style="width:100%; padding:8px; border:1px solid #e5e7eb; border-radius:8px;"></textarea>
      </div>
    </section>

    <!-- Notes -->
    <section class="card" style="margin-bottom:16px;">
      <h2 style="margin:0 0 8px;">Notes</h2>
      <textarea id="customer-notes" placeholder="Add any special notes, terms, or scope details here…" rows="3" style="width:100%; padding:8px; border:1px solid #e5e7eb; border-radius:8px;"></textarea>
    </section>

    <!-- Quote Sections -->
    <div id="quote-sections"></div>

    <!-- Summary & Actions -->
    <section class="card">
      <h2>Estimate Summary</h2>
      <div id="summary" class="summary-content">
        <p class="empty-message">Select items to see your estimate</p>
      </div>
      <div id="total" class="total-section"></div>

      <div style="margin-top: 20px; margin-bottom: 12px;">
        <label for="quote-email" style="display: block; font-weight: 600; margin-bottom: 8px;">Send Quote To:</label>
        <input id="quote-email" type="email" placeholder="Enter your email" style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
      </div>

      <div class="action-buttons" style="display:flex; gap:8px; flex-wrap:wrap;">
        <button id="email-btn" class="btn btn-primary" disabled>Email Quote</button>
        <button id="print-btn" class="btn btn-secondary">Print / Save PDF</button>
        <button id="reset-btn" class="btn btn-secondary" style="margin-left:auto;">Clear All</button>
      </div>
    </section>

    <!-- Photos -->
    <section class="card" style="margin-top:16px;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap;">
        <h2 style="margin:0;">Photos (up to ${maxPhotos})</h2>
        <div>
          <label class="btn btn-primary" style="cursor:pointer;">
            + Add Photos
            <input id="photos-input" type="file" accept="image/*" multiple style="display:none;">
          </label>
          <button id="photos-clear" class="btn btn-secondary" style="margin-left:8px;">Clear All</button>
        </div>
      </div>
      <div id="photos-count" style="font-size:12px; color:#6b7280; margin-top:6px;">0/${maxPhotos} selected</div>
      <div id="photos-grid" style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin-top:12px;"></div>
    </section>

    <!-- Footer -->
    <footer style="margin-top: 32px; text-align: center; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 16px;">
      <p>&copy; 2025 1 STOP BATH SHOP. All rights reserved.</p>
    </footer>
  </div>
  `;
}

/* ---------- Render App ---------- */
document.querySelector('#app').innerHTML = getAppHtml(MAX_PHOTOS);

/* ---------- App State ---------- */
const state = {
  logo: { name: "", dataUrl: "", source: "none" },
  photos: []
};

/* ---------- Initialize ---------- */
initializeApp();

/* ---------- Preload Logo ---------- */
(async function preloadLogo() {
  try {
    const res = await fetch(DEFAULT_LOGO_URL, { cache: "force-cache" });
    if (!res.ok) return;
    const blob = await res.blob();
    const reader = new FileReader();
    reader.onload = () => {
      state.logo = { name: "1-STOP-BATH-SHOP-LOGO.jpg", dataUrl: reader.result, source: "default" };
      document.getElementById('company-logo').src = state.logo.dataUrl;
    };
    reader.readAsDataURL(blob);
  } catch (_) { }
})();

/* ---------- Photos ---------- */
const readFileAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = () => {
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function refreshPhotosUI() {
  const photosCount = document.getElementById('photos-count');
  const photosGrid = document.getElementById('photos-grid');

  photosCount.textContent = `${state.photos.length}/${MAX_PHOTOS} selected`;

  photosGrid.innerHTML = state.photos.map((p, idx) => `
    <div style="background:#f9fafb;border-radius:12px;padding:12px;border:1px solid #eef2f7;">
      <img src="${p.dataUrl}" alt="${esc(p.name)}" style="width:100%; height:144px; object-fit:cover; border-radius:8px;">
      <div style="margin-top:6px;font-size:12px;color:#374151;">${esc(p.name)}</div>
      <input type="text" placeholder="Caption (optional)" data-idx="${idx}" class="photo-caption" 
             style="margin-top:6px;width:100%;padding:8px;border:1px solid #e5e7eb;border-radius:8px;" 
             value="${esc(p.caption || '')}">
      <div style="margin-top:6px;text-align:right;">
        <button data-idx="${idx}" class="btn btn-secondary photo-remove">Remove</button>
      </div>
    </div>
  `).join('');

  photosGrid.querySelectorAll('.photo-caption').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const i = Number(e.currentTarget.dataset.idx);
      state.photos[i].caption = e.target.value;
    });
  });

  photosGrid.querySelectorAll('.photo-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const i = Number(e.currentTarget.dataset.idx);
      state.photos.splice(i, 1);
      refreshPhotosUI();
    });
  });
}

document.getElementById('photos-input')?.addEventListener('change', async (e) => {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;
  const remaining = Math.max(0, MAX_PHOTOS - state.photos.length);
  const toLoad = files.slice(0, remaining);
  const loaded = await Promise.all(
    toLoad.map(async (f) => ({
      name: f.name,
      dataUrl: await readFileAsDataURL(f),
      caption: "",
    }))
  );
  state.photos = [...state.photos, ...loaded];
  refreshPhotosUI();
  e.target.value = "";
});

document.getElementById('photos-clear')?.addEventListener('click', () => {
  state.photos = [];
  refreshPhotosUI();
});

/* ---------- Reset Button ---------- */
document.getElementById('reset-btn')?.addEventListener('click', () => {
  // Clear all form inputs
  document.querySelectorAll('select, input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea').forEach(el => {
    if (el.id !== 'company-logo' && el.id !== 'photos-input') {
      el.value = '';
    }
  });

  // Clear checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);

  // Clear photos
  state.photos = [];
  refreshPhotosUI();

  // Reset summary
  document.getElementById('summary').innerHTML = '<p class="empty-message">Select items to see your estimate</p>';
  document.getElementById('total').innerHTML = '';
  document.getElementById('email-btn').disabled = true;
});

// Export state for other modules
window.appState = state;
