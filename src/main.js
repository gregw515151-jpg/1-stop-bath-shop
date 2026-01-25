import './style.css'
import { initializeApp, getSelections, generateEmailBody, DEFAULT_TERMS } from './app.js'
import { supabase } from './supabaseClient.js'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { initAdmin } from './admin.js'
import { saveDraft, loadDraft, getDrafts } from './drafts.js'

/* ---------- Config ---------- */
const DEFAULT_LOGO_URL = "/logos/1-STOP-BATH-SHOP-LOGO.jpg";
const MAX_PHOTOS = 15;

/* ---------- HTML Template ---------- */
function getAppHtml(maxPhotos) {
  return `
  <div class="container">
    <!-- Header -->
    <header style="text-align:center; margin-bottom: 16px; position: relative;">
      <button id="admin-btn" class="admin-toggle-btn" style="position: absolute; top: 0; right: 0; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 12px;">🔐 Admin</button>
      <button id="admin-logout-btn" class="admin-control" style="display: none; position: absolute; top: 0; right: 120px; padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 12px;">Logout</button>
      <button id="admin-reset-btn" class="admin-control" style="display: none; position: absolute; top: 0; right: 240px; padding: 8px 16px; background: #f59e0b; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 12px;">🔄 Reset Data</button>
      <button id="company-info-btn" class="admin-control" style="display: none; position: absolute; top: 0; right: 360px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 12px;" onclick="document.getElementById('admin-overlay').style.display='flex'">🏢 Company Info</button>
      <img id="company-logo" class="header-logo" alt="1 STOP BATH SHOP" src="" />
      <h1 style="margin: 16px 0 4px;">Bathroom Quote System</h1>
    </header>

    <!-- Scope of Work - Centered -->
    <section class="card" style="margin-bottom: 16px; max-width: 600px; margin-left: auto; margin-right: auto;">
      <div style="margin: 0;">
        <label style="text-decoration: underline; display: block; text-align: center; font-size: 1.1rem; font-weight: 600; margin-bottom: 12px;">Scope of Work</label>
        <div id="scope-of-work-checkboxes" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px;">
          <!-- Populated dynamically by app.js -->
        </div>
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

      <div class="action-buttons" style="display:flex; gap:8px; flex-wrap:wrap; margin-top: 20px;">
        <button id="share-btn" class="btn btn-primary" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">📤 Share PDF</button>
        <button id="print-btn" class="btn btn-secondary">Print / Save PDF</button>
        <button id="reset-btn" class="btn btn-secondary" style="margin-left:auto;">Clear All</button>
      </div>
    </section>

    <!--PDF Viewer Modal -->
    <div id="pdf-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.9); z-index: 9999; overflow: auto;">
      <div style="max-width: 600px; margin: 60px auto; background: white; border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); position: relative;">
        <div style="padding: 24px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px 16px 0 0;">
          <h2 style="margin: 0; font-size: 1.4rem;">📄 Your Quote is Ready!</h2>
          <button id="modal-close-btn" style="background: rgba(255, 255, 255, 0.2); border: none; color: white; font-size:28px; cursor: pointer; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; hover: background: rgba(255,255,255,0.3);">✕</button>
        </div>
        <div style="padding: 32px; text-align: center;">
          <div style="font-size: 16px; color: #374151; margin-bottom: 24px; line-height: 1.6;">
            Your bathroom estimate quote has been generated and uploaded successfully! 
            Use the buttons below to view, share, or download your PDF.
          </div>
          <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px;">
            <button id="modal-view-btn" class="btn btn-primary" style="width: 100%; padding: 16px; font-size: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">👁️ View PDF</button>
            <button id="modal-share-btn" class="btn btn-primary" style="width: 100%; padding: 16px; font-size: 16px;">📤 Share PDF</button>
            <button id="modal-copy-link-btn" class="btn btn-secondary" style="width: 100%; padding: 16px; font-size: 16px;">📋 Copy Link</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin Overlay (Restored) -->
    <div id="admin-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; overflow-y: auto;">
      <style>
        .admin-container {
            max-width: 800px;
            margin: 40px auto;
            padding: 24px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            position: relative;
        }
        .login-screen {
            text-align: center;
            padding: 40px;
        }
        .admin-panel {
            display: none;
        }
        .category-section {
            margin-bottom: 32px;
            padding: 16px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
        }
        .item-list {
            margin-top: 12px;
        }
        .item-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
            border-bottom: 1px solid #f3f4f6;
        }
        .item-row:last-child {
            border-bottom: none;
        }
        .add-form {
            display: flex;
            gap: 8px;
            margin-bottom: 16px;
        }
        .add-form input {
            padding: 8px;
            border: 1px solid #d1d5db;
            border-radius: 4px;
        }
        .btn-delete {
            background: #fee2e2;
            color: #dc2626;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            border: none;
        }
        .btn-delete:hover {
            background: #fecaca;
        }
      </style>
      <div class="admin-container">
          <button id="close-admin-btn" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; cursor: pointer; color: #6b7280;">✕</button>
          <div id="login-screen" class="login-screen">
              <h1>Admin Access</h1>
              <p>Please enter the admin password to manage products.</p>
              <div style="margin-top: 20px;">
                  <input type="password" id="admin-password" placeholder="Password" style="padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
                  <button id="login-btn" class="btn btn-primary">Login</button>
              </div>
              <p id="login-error" style="color: red; margin-top: 10px; display: none;">Incorrect password.</p>
          </div>

          <div id="admin-panel" class="admin-panel">
              <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                  <h1>Product Management</h1>
                  <button id="logout-btn" class="btn btn-secondary">Logout</button>
              </header>

              <div id="categories-container">
                  <!-- Categories will be rendered here -->
              </div>
          </div>
      </div>
    </div>

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

// Initialize Admin Module
initAdmin().catch(console.error);

// Add event listener for main Admin button
document.getElementById('admin-btn')?.addEventListener('click', () => {
  const overlay = document.getElementById('admin-overlay');
  if (overlay) overlay.style.display = 'flex';
});

/* ---------- Draft Button Event Listeners ---------- */
// Wait for DOM to be fully ready before attaching draft button listeners
function attachDraftListeners() {
  // Save Draft Button
  const saveDraftBtn = document.getElementById('save-draft-btn');
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', async () => {
      const name = prompt("Enter a name for this draft:");
      if (!name) return;

      const { error } = await saveDraft(name);
      if (error) {
        if (error.message && error.message.includes('relation "public.drafts" does not exist')) {
          alert("Drafts table missing! Please run the SQL setup script.");
          console.error(error);
        } else {
          alert("Error saving draft: " + error.message);
        }
      } else {
        alert("Draft saved successfully!");
      }
    });
    console.log('✅ Save Draft button listener attached');
  } else {
    console.warn('⚠️ Save Draft button not found');
  }

  // Load Draft Button
  const loadDraftBtn = document.getElementById('load-draft-btn');
  if (loadDraftBtn) {
    loadDraftBtn.addEventListener('click', async () => {
      const { data: drafts, error } = await getDrafts();
      if (error) {
        alert("Error loading drafts: " + error.message);
        return;
      }

      if (!drafts || drafts.length === 0) {
        alert("No drafts found.");
        return;
      }

      const draftList = drafts.map(d =>
        `${new Date(d.created_at).toLocaleString()} - ${d.name} (ID: ${d.id.slice(0, 8)}...)`
      ).join('\n');

      const input = prompt("Enter the Name (exact) or ID of the draft to load:\n\n" + draftList);
      if (!input) return;

      // find ID based on name or ID match
      const selectedDraft = drafts.find(d => d.id === input || d.name === input || d.id.startsWith(input));
      const idToLoad = selectedDraft ? selectedDraft.id : null;

      if (!idToLoad) {
        alert("Draft not found.");
        return;
      }

      const result = await loadDraft(idToLoad);
      if (result.error) {
        alert("Error loading draft: " + result.error.message);
      } else {
        alert("Draft loaded successfully!");
      }
    });
    console.log('✅ Load Draft button listener attached');
  } else {
    console.warn('⚠️ Load Draft button not found');
  }
}

// Attach listeners after a small delay to ensure DOM is fully ready
// The buttons are in index.html, but we need to wait for full DOM readiness
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attachDraftListeners);
} else {
  // DOM already loaded, attach immediately
  setTimeout(attachDraftListeners, 100);
}

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

function getCustomerInfo() {
  const name = document.getElementById('customer-name')?.value || '';
  const address = document.getElementById('customer-address')?.value || '';
  const phone = document.getElementById('customer-phone')?.value || '';
  const email = document.getElementById('customer-email')?.value || '';
  const notes = document.getElementById('customer-notes')?.value || '';
  return { name, address, phone, email, notes };
}

async function generateQuotePDF({ logo, photos, fileName = 'quote.pdf' } = {}) {
  const summaryEl = document.getElementById('summary');
  const totalEl = document.getElementById('total');
  const customer = getCustomerInfo();

  // Get Company Info from Supabase
  let companyInfo = { name: '1 Stop Bath Shop' };
  try {
    const { data } = await supabase.from('company_settings').select('*').eq('id', 'default').single();
    if (data) companyInfo = data;
  } catch (e) {
    console.warn('Failed to fetch company info for PDF, using defaults');
  }

  // Collect all section notes
  const noteFields = [
    { id: 'demolition-notes', label: 'Demolition Notes' },
    { id: 'electrical-notes', label: 'Electrical Notes' },
    { id: 'fixtures-notes', label: 'Fixtures & Finishes Notes' },
    { id: 'cabinetry-notes', label: 'Cabinetry Notes' },
    { id: 'trim-notes', label: 'Trim Notes' },
    { id: 'flooring-notes', label: 'Flooring Notes' },
    { id: 'tile-notes', label: 'Tile Notes' },
    { id: 'plumbing-notes', label: 'Plumbing Notes' },
    { id: 'bathroom-notes', label: 'Additional Notes' }
  ];

  let allNotesHTML = '';

  // Add main customer notes first if they exist
  if (customer.notes) {
    allNotesHTML += `<div style="margin-bottom: 12px;">${esc(customer.notes)}</div>`;
  }

  // Add section notes
  noteFields.forEach(field => {
    const val = document.getElementById(field.id)?.value;
    if (val && val.trim()) {
      allNotesHTML += `
        <div style="margin-top: 8px;">
          <strong>${field.label}:</strong>
          <div style="margin-top: 2px; white-space: pre-wrap;">${esc(val)}</div>
        </div>
      `;
    }
  });

  // Temporary off-screen container for clean render
  const pdfRoot = document.createElement('div');
  pdfRoot.style.width = '800px';
  pdfRoot.style.padding = '24px';
  pdfRoot.style.background = '#ffffff';
  pdfRoot.style.color = '#111827';
  pdfRoot.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
  pdfRoot.style.lineHeight = '1.5';
  pdfRoot.style.position = 'fixed';
  pdfRoot.style.left = '-99999px';

  const logoHTML = (logo && logo.dataUrl)
    ? `<img src="${logo.dataUrl}" alt="Logo" style="max-height:90px; width:auto; display:block; margin:0 auto; object-fit:contain;">`
    : '';

  // Company Info Section (centered under logo)
  const companyInfoHTML = `
    <div style="text-align: center; margin: 12px 0 20px; font-size: 12px; color: #374151; line-height: 1.6;">
      ${companyInfo.company_name ? `<div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${esc(companyInfo.company_name)}</div>` : ''}
      ${companyInfo.address ? `<div>${esc(companyInfo.address)}</div>` : ''}
      ${companyInfo.mhic ? `<div>${esc(companyInfo.mhic)}</div>` : ''}
      <div>
        ${companyInfo.phone ? `<span>${esc(companyInfo.phone)}</span>` : ''}
        ${companyInfo.phone && companyInfo.email ? ' | ' : ''}
        ${companyInfo.email ? `<span>${esc(companyInfo.email)}</span>` : ''}
      </div>
    </div>
  `;

  const customerHTML = `
    <h2 style="font-size:16px; margin: 12px 0 8px;">Customer</h2>
    <div style="font-size:14px;">
      <div><strong>Name:</strong> ${esc(customer.name)}</div>
      <div><strong>Phone:</strong> ${esc(customer.phone)}</div>
      <div><strong>Email:</strong> ${esc(customer.email)}</div>
      <div style="margin-top:6px;"><strong>Address:</strong><br>${esc(customer.address).replace(/\n/g, '<br>')}</div>
    </div>
    
    ${allNotesHTML ? `<h2 style="font-size:16px; margin: 16px 0 8px;">Notes</h2><div style="font-size:14px;">${allNotesHTML}</div>` : ''}
  `;

  const photosGridHTML = (photos || []).map((p) => `
    <div style="break-inside: avoid; margin-bottom: 20px; text-align: center;">
      <img src="${p.dataUrl}" alt="${esc(p.name)}" style="max-width:700px; width:100%; height:auto; display:block; margin:0 auto; border-radius:4px; border:1px solid #eee; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      ${p.caption ? `<div style="font-size:12px; color:#555; margin-top:8px; font-style:italic;">${esc(p.caption)}</div>` : ''}
    </div>
  `).join('');

  // Split content into main and terms
  const mainContent = `
    <div style="text-align:center; margin-bottom: 10px;">
      ${logoHTML}
      ${companyInfoHTML}
    </div>

    ${customerHTML}

    <h2 style="font-size:16px; margin: 16px 0 8px;">Summary</h2>
    <div>${summaryEl ? summaryEl.innerHTML.replace(/\s*-\s*\$\d+(\.\d+)?/g, '').replace(/:\s*\$\d+(\.\d+)?/g, '').replace(/\s*×\s*\$\d+(\.\d+)?\s*=\s*\$\d+(\.\d+)?/g, '') : ''}</div>

    <div style="border-top:1px solid #e5e7eb; margin:12px 0;"></div>

    <h2 style="font-size:16px; margin: 16px 0 8px;">Photos</h2>
    <div>${photosGridHTML || '<div style="font-size:12px;color:#6b7280;">No photos attached.</div>'}</div>
  `;

  const termsContent = `
    <div style="padding: 24px; font-size: 10px; line-height: 1.4;">
      <h2 style="font-size:16px; margin: 0 0 12px; text-align: center; text-transform: uppercase;">Terms and Conditions</h2>
      ${companyInfo.terms || DEFAULT_TERMS}
    </div>
  `;

  // Render main content
  pdfRoot.innerHTML = mainContent;
  document.body.appendChild(pdfRoot);

  const mainCanvas = await html2canvas(pdfRoot, { scale: 2, useCORS: true });
  const mainImgData = mainCanvas.toDataURL('image/png');

  // Render terms content
  pdfRoot.innerHTML = termsContent;
  const termsCanvas = await html2canvas(pdfRoot, { scale: 2, useCORS: true });
  const termsImgData = termsCanvas.toDataURL('image/png');

  document.body.removeChild(pdfRoot);

  // Create PDF with pagination
  const pdf = new jsPDF('p', 'pt', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Add main content pages
  const mainImgWidth = pageWidth;
  const mainImgHeight = (mainCanvas.height * mainImgWidth) / mainCanvas.width;

  let heightLeft = mainImgHeight;
  let position = 0;

  pdf.addImage(mainImgData, 'PNG', 0, position, mainImgWidth, mainImgHeight, undefined, 'FAST');
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    pdf.addPage();
    position = heightLeft - mainImgHeight;
    pdf.addImage(mainImgData, 'PNG', 0, position, mainImgWidth, mainImgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;
  }

  // Add terms on a new page
  pdf.addPage();
  const termsImgWidth = pageWidth;
  const termsImgHeight = (termsCanvas.height * termsImgWidth) / termsCanvas.width;
  pdf.addImage(termsImgData, 'PNG', 0, 0, termsImgWidth, termsImgHeight, undefined, 'FAST');

  // If terms content is longer than one page, add additional pages
  let termsHeightLeft = termsImgHeight - pageHeight;
  let termsPosition = 0;
  while (termsHeightLeft > 0) {
    pdf.addPage();
    termsPosition = termsHeightLeft - termsImgHeight;
    pdf.addImage(termsImgData, 'PNG', 0, termsPosition, termsImgWidth, termsImgHeight, undefined, 'FAST');
    termsHeightLeft -= pageHeight;
  }

  const blob = pdf.output('blob');
  const base64 = pdf.output('datauristring').split(',')[1];
  // document.body.removeChild(pdfRoot); // This line was removed as pdfRoot is already removed

  const download = () => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return { blob, base64, download };
}

// Helper to upload PDF to Supabase
async function uploadToSupabase(blob, fileName) {
  const timestamp = new Date().getTime();
  const path = `${timestamp}_${fileName}`;

  const { data, error } = await supabase.storage
    .from('quotes')
    .upload(path, blob, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('quotes')
    .getPublicUrl(path);

  return publicUrl;
}

/* ---------- Share PDF (Store current PDF URL) ---------- */
let currentPdfUrl = null; // Store the current PDF URL for sharing

/* ---------- Modal Close Button ---------- */
document.getElementById('modal-close-btn')?.addEventListener('click', () => {
  const modal = document.getElementById('pdf-modal');
  modal.style.display = 'none';
});

// Close modal when clicking outside
document.getElementById('pdf-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'pdf-modal') {
    document.getElementById('pdf-modal').style.display = 'none';
  }
});

/* ---------- Modal View PDF Button ---------- */
document.getElementById('modal-view-btn')?.addEventListener('click', () => {
  if (!currentPdfUrl) {
    alert('No PDF to view. Please generate a quote first.');
    return;
  }

  // Open PDF in new tab
  window.open(currentPdfUrl, '_blank');
});

/* ---------- Modal Share Button ---------- */
document.getElementById('modal-share-btn')?.addEventListener('click', async () => {
  if (!currentPdfUrl) {
    alert('No PDF to share. Please generate a quote first.');
    return;
  }

  try {
    // Try to use Web Share API (works great on mobile!)
    if (navigator.share) {
      await navigator.share({
        title: 'Bathroom Estimate Quote - 1 Stop Bath Shop',
        text: 'Here is your bathroom estimate quote from 1 Stop Bath Shop',
        url: currentPdfUrl
      });
      console.log('Share completed!');
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(currentPdfUrl);
      alert('Web Share not supported. PDF link copied to clipboard! You can now paste and share it. 📋');
    }
  } catch (error) {
    // User cancelled or error occurred
    if (error.name !== 'AbortError') {
      console.error('Share error:', error);
      // Try clipboard fallback
      try {
        await navigator.clipboard.writeText(currentPdfUrl);
        alert('PDF link copied to clipboard! 📋');
      } catch (clipError) {
        alert('Share failed. PDF URL: ' + currentPdfUrl);
      }
    }
  }
});

/* ---------- Modal Copy Link Button ---------- */
document.getElementById('modal-copy-link-btn')?.addEventListener('click', async () => {
  if (!currentPdfUrl) {
    alert('No PDF link to copy. Please generate a quote first.');
    return;
  }

  try {
    await navigator.clipboard.writeText(currentPdfUrl);
    alert('PDF link copied to clipboard! ✅');
  } catch (error) {
    console.error('Copy error:', error);
    // Fallback: show the URL
    prompt('Copy this PDF link:', currentPdfUrl);
  }
});

/* ---------- Share PDF Button ---------- */
document.getElementById('share-btn')?.addEventListener('click', async () => {
  const shareBtn = document.getElementById('share-btn');
  const originalText = shareBtn.textContent;

  const selections = getSelections();
  const summaryEl = document.getElementById('summary');
  const hasSelections = summaryEl && !summaryEl.querySelector('.empty-message');

  if (!hasSelections) {
    alert('Please select some items before sharing the quote.');
    return;
  }

  try {
    shareBtn.disabled = true;
    shareBtn.textContent = 'Generating PDF...';

    // Step 1: Generate the PDF
    const { blob } = await generateQuotePDF({
      logo: state.logo,
      photos: state.photos,
      fileName: 'quote.pdf'
    });

    shareBtn.textContent = 'Uploading PDF...';

    // Step 2: Upload PDF to Supabase Storage
    const pdfUrl = await uploadToSupabase(blob, 'quote.pdf');
    currentPdfUrl = pdfUrl; // Store for sharing

    shareBtn.textContent = 'Opening...';

    // Step 3: Show modal
    const modal = document.getElementById('pdf-modal');
    modal.style.display = 'block';

    // Save to Supabase for tracking
    try {
      const customer = getCustomerInfo();
      await supabase.from('quotes_sent').insert([{
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        pdf_url: pdfUrl,
        created_at: new Date().toISOString()
      }]);
      console.log('Quote saved to Supabase');
    } catch (dbError) {
      console.warn('Failed to save to database:', dbError);
    }

  } catch (error) {
    console.error('Share error:', error);
    alert('Error preparing PDF: ' + error.message);
  } finally {
    shareBtn.disabled = false;
    shareBtn.textContent = originalText;
  }
});

/* ---------- Print Button ---------- */
document.getElementById('print-btn')?.addEventListener('click', async () => {
  const printBtn = document.getElementById('print-btn');
  const originalText = printBtn.textContent;

  try {
    printBtn.disabled = true;
    printBtn.textContent = 'Generating PDF...';

    const { blob } = await generateQuotePDF({
      logo: state.logo,
      photos: state.photos,
      fileName: 'quote.pdf'
    });

    // Create a blob URL and open it in a new window to trigger print dialog
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');

    // Clean up blob URL after window opens
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        printWindow.print();
        // Clean up after a delay to ensure print dialog has opened
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      });
    } else {
      // Fallback: if popup blocked, just download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quote.pdf';
      a.click();
      URL.revokeObjectURL(url);
    }

  } catch (error) {
    console.error('Print error:', error);
    alert('Error generating PDF: ' + error.message);
  } finally {
    printBtn.disabled = false;
    printBtn.textContent = originalText;
  }
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
});

// Export state for other modules
window.appState = state;
