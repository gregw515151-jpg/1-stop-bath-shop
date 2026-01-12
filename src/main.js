
// src/main.js
import './style.css'
import { initializeApp, generateEmailBody, getSelections } from './app.js'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

/* ---------- Config ---------- */
const DEFAULT_LOGO_URL = "/logos/1-STOP-BATH-SHOP-LOGO.jpg"; // ensure file exists in public/logos/
const MAX_PHOTOS = 15;

/* ---------- HTML Template ---------- */
function getAppHtml(maxPhotos) {
  return `
  <div class="container">

    <!-- Header with centered logo -->
    <header style="text-align:center; margin-bottom: 16px; position: relative;">
      <button id="admin-btn" class="admin-toggle-btn" style="position: absolute; top: 0; right: 0; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 12px;">🔐 Admin</button>
      <button id="admin-logout-btn" class="admin-control" style="display: none; position: absolute; top: 0; right: 120px; padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 12px;">Logout</button>
      <img id="company-logo" class="header-logo" alt="1 STOP BATH SHOP" src="" />
      <h1 style="margin: 16px 0 4px;">Bath Products Selector</h1>
    </header>

    <!-- Customer details -->
    <section class="card" style="margin-bottom:16px;">
      <h2 style="margin:0 0 8px;">Customer Details</h2>
      <div class="row" style="gap:12px; display:flex; flex-wrap:wrap;">
        <input id="customer-name" type="text" placeholder="Customer name"
               style="flex:1; min-width:220px; padding:8px; border:1px solid #e5e7eb; border-radius:8px;">
        <input id="customer-phone" type="tel" placeholder="Phone"
               style="flex:1; min-width:220px; padding:8px; border:1px solid #e5e7eb; border-radius:8px;">
        <input id="customer-email" type="email" placeholder="Email"
               style="flex:1; min-width:220px; padding:8px; border:1px solid #e5e7eb; border-radius:8px;">
      </div>
      <div style="margin-top:8px;">
        <textarea id="customer-address" placeholder="Address"
                  rows="2"
                  style="width:100%; padding:8px; border:1px solid #e5e7eb; border-radius:8px;"></textarea>
      </div>
    </section>

    <!-- Notes -->
    <section class="card" style="margin-bottom:16px;">
      <h2 style="margin:0 0 8px;">Notes</h2>
      <textarea id="customer-notes" placeholder="Add any special notes, terms, or scope details here…"
                rows="3"
                style="width:100%; padding:8px; border:1px solid #e5e7eb; border-radius:8px;"></textarea>
    </section>

    <div class="content" style="display:flex; gap:16px; flex-wrap:wrap;">
      <!-- Selections Panel -->
      <div class="selections-panel" style="flex:1 1 360px;">
        <h2>Product Selection</h2>

        <div class="form-group">
          <label for="bathtub-select">Bathtub</label>
          <select id="bathtub-select" class="select-input">
            <option value="">Loading...</option>
          </select>
          <div class="admin-control" style="display: none; margin-top: 8px; padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bfdbfe;">
            <input id="add-bathtubs-name" type="text" placeholder="Product name" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <input id="add-bathtubs-price" type="number" placeholder="Price" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <div style="display: flex; gap: 8px;">
              <button id="add-bathtubs-btn" class="btn btn-primary" style="flex: 1; padding: 6px 12px; font-size: 12px;">➕ Add</button>
              <button id="delete-bathtubs-btn" class="btn btn-secondary" style="flex: 1; padding: 6px 12px; font-size: 12px;">🗑️ Delete Selected</button>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="shower-select">Shower</label>
          <select id="shower-select" class="select-input">
            <option value="">Loading...</option>
          </select>
          <div class="admin-control" style="display: none; margin-top: 8px; padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bfdbfe;">
            <input id="add-showers-name" type="text" placeholder="Product name" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <input id="add-showers-price" type="number" placeholder="Price" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <div style="display: flex; gap: 8px;">
              <button id="add-showers-btn" class="btn btn-primary" style="flex: 1; padding: 6px 12px; font-size: 12px;">➕ Add</button>
              <button id="delete-showers-btn" class="btn btn-secondary" style="flex: 1; padding: 6px 12px; font-size: 12px;">🗑️ Delete Selected</button>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="trim-select">Trim &amp; Fixtures</label>
          <select id="trim-select" class="select-input">
            <option value="">Loading...</option>
          </select>
          <div class="admin-control" style="display: none; margin-top: 8px; padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bfdbfe;">
            <input id="add-trim-name" type="text" placeholder="Product name" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <input id="add-trim-price" type="number" placeholder="Price" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <div style="display: flex; gap: 8px;">
              <button id="add-trim-btn" class="btn btn-primary" style="flex: 1; padding: 6px 12px; font-size: 12px;">➕ Add</button>
              <button id="delete-trim-btn" class="btn btn-secondary" style="flex: 1; padding: 6px 12px; font-size: 12px;">🗑️ Delete Selected</button>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="toilet-select">Toilet</label>
          <select id="toilet-select" class="select-input">
            <option value="">Loading...</option>
          </select>
          <div class="admin-control" style="display: none; margin-top: 8px; padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bfdbfe;">
            <input id="add-toilets-name" type="text" placeholder="Product name" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <input id="add-toilets-price" type="number" placeholder="Price" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <div style="display: flex; gap: 8px;">
              <button id="add-toilets-btn" class="btn btn-primary" style="flex: 1; padding: 6px 12px; font-size: 12px;">➕ Add</button>
              <button id="delete-toilets-btn" class="btn btn-secondary" style="flex: 1; padding: 6px 12px; font-size: 12px;">🗑️ Delete Selected</button>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="sink-select">Sink</label>
          <select id="sink-select" class="select-input">
            <option value="">Loading...</option>
          </select>
          <div class="admin-control" style="display: none; margin-top: 8px; padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bfdbfe;">
            <input id="add-sinks-name" type="text" placeholder="Product name" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <input id="add-sinks-price" type="number" placeholder="Price" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <div style="display: flex; gap: 8px;">
              <button id="add-sinks-btn" class="btn btn-primary" style="flex: 1; padding: 6px 12px; font-size: 12px;">➕ Add</button>
              <button id="delete-sinks-btn" class="btn btn-secondary" style="flex: 1; padding: 6px 12px; font-size: 12px;">🗑️ Delete Selected</button>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="tile-select">Tile</label>
          <select id="tile-select" class="select-input">
            <option value="">Loading...</option>
          </select>
          <div class="admin-control" style="display: none; margin-top: 8px; padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bfdbfe;">
            <input id="add-tiles-name" type="text" placeholder="Product name" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <input id="add-tiles-price" type="number" placeholder="Price" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <div style="display: flex; gap: 8px;">
              <button id="add-tiles-btn" class="btn btn-primary" style="flex: 1; padding: 6px 12px; font-size: 12px;">➕ Add</button>
              <button id="delete-tiles-btn" class="btn btn-secondary" style="flex: 1; padding: 6px 12px; font-size: 12px;">🗑️ Delete Selected</button>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="labor-select">Labor &amp; Installation</label>
          <select id="labor-select" class="select-input">
            <option value="">Loading...</option>
          </select>
          <div class="admin-control" style="display: none; margin-top: 8px; padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bfdbfe;">
            <input id="add-labor-name" type="text" placeholder="Product name" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <input id="add-labor-price" type="number" placeholder="Price" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <div style="display: flex; gap: 8px;">
              <button id="add-labor-btn" class="btn btn-primary" style="flex: 1; padding: 6px 12px; font-size: 12px;">➕ Add</button>
              <button id="delete-labor-btn" class="btn btn-secondary" style="flex: 1; padding: 6px 12px; font-size: 12px;">🗑️ Delete Selected</button>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="scope_of_work-select" style="text-decoration: underline;">Scope of Work</label>
          <select id="scope_of_work-select" class="select-input">
            <option value="">Loading...</option>
          </select>
          <div class="admin-control" style="display: none; margin-top: 8px; padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bfdbfe;">
            <input id="add-scope_of_work-name" type="text" placeholder="Product name" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <input id="add-scope_of_work-price" type="number" placeholder="Price" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
            <div style="display: flex; gap: 8px;">
              <button id="add-scope_of_work-btn" class="btn btn-primary" style="flex: 1; padding: 6px 12px; font-size: 12px;">➕ Add</button>
              <button id="delete-scope_of_work-btn" class="btn btn-secondary" style="flex: 1; padding: 6px 12px; font-size: 12px;">🗑️ Delete Selected</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Panel -->
      <div class="summary-panel" style="flex:1 1 360px;">
        <h2>Estimate Summary</h2>
        <div id="summary" class="summary-content">
          <p class="empty-message">Select items to see your estimate</p>
        </div>
        <div id="total" class="total-section"></div>

        <div style="margin-top: 20px; margin-bottom: 12px;">
          <label for="quote-email" style="display: block; font-weight: 600; color: var(--text-color); margin-bottom: 8px; font-size: 0.9375rem;">Send Quote To:</label>
          <input id="quote-email" type="email" placeholder="Enter your email" style="width: 100%; padding: 12px; border: 2px solid var(--border-color); border-radius: 8px; font-size: 1rem;">
        </div>

        <div class="action-buttons" style="display:flex; gap:8px; flex-wrap:wrap;">
          <button id="email-btn" class="btn btn-primary" disabled>Email Quote</button>
          <button id="print-btn" class="btn btn-secondary">Print / Save PDF</button>
          <button id="reset-btn" class="btn btn-secondary" style="margin-left:auto;">Clear Selections</button>
        </div>
      </div>
    </div>

    <!-- Photos Uploader -->
    <section class="card" style="margin-top:16px;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap;">
        <h2 style="margin:0;">Photos (attach up to ${maxPhotos})</h2>
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

/* ---------- Utilities ---------- */
/* ---------- Utilities ---------- */
const readFileAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    // Create image object
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = () => {
        // resize logic
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

        // Compress to JPEG at 0.7 quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// Escape user text for safe HTML insertion (simple)
const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nl2br = (s) => String(s || '').replace(/\n/g, '<br>');

/* ---------- Gather Customer Info from inputs ---------- */
function getCustomerInfo() {
  const name = document.getElementById('customer-name')?.value || '';
  const address = document.getElementById('customer-address')?.value || '';
  const phone = document.getElementById('customer-phone')?.value || '';
  const email = document.getElementById('customer-email')?.value || '';
  const notes = document.getElementById('customer-notes')?.value || '';
  return { name, address, phone, email, notes };
}

/**
 * Generates a multi‑page PDF that includes:
 * - Header logo (centered, not too big)
 * - Customer info + notes
 * - Summary & Total (copied from current DOM)
 * - All attached photos with optional captions
 */
async function generateQuotePDF({ logo, photos, fileName = 'quote.pdf' } = {}) {
  const summaryEl = document.getElementById('summary');
  const totalEl = document.getElementById('total');
  const customer = getCustomerInfo();

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
    ? `< img src = "${logo.dataUrl}" alt = "Logo" style = "max-height:90px; width:auto; display:block; margin:0 auto; object-fit:contain;" > `
    : '';

  const customerHTML = `
    < h2 style = "font-size:16px; margin: 12px 0 8px;" > Customer</h2 >
    <div style="font-size:14px;">
      <div><strong>Name:</strong> ${esc(customer.name)}</div>
      <div><strong>Phone:</strong> ${esc(customer.phone)}</div>
      <div><strong>Email:</strong> ${esc(customer.email)}</div>
      <div style="margin-top:6px;"><strong>Address:</strong><br>${esc(customer.address).replace(/\n/g, '<br>')}</div>
    </div>
    <h2 style="font-size:16px; margin: 12px 0 8px;">Notes</h2>
    <div style="font-size:14px; white-space:pre-wrap;">${esc(customer.notes)}</div>
  `;

  const photosGridHTML = (photos || []).map((p) => `
    < div style = "page-break-inside: avoid; margin-bottom: 20px; text-align: center;" >
      <img src="${p.dataUrl}" alt="${esc(p.name)}" style="max-width:100%; max-height:500px; height:auto; width:auto; border-radius:4px; border:1px solid #eee; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        ${p.caption ? `<div style="font-size:12px; color:#555; margin-top:8px; font-style:italic;">${esc(p.caption)}</div>` : ''}
      </div>
  `).join('');

  pdfRoot.innerHTML = `
    < div style = "text-align:center; margin-bottom: 10px;" >
      ${logoHTML}
    </div >

    ${customerHTML}

    <h2 style="font-size:16px; margin: 16px 0 8px;">Summary</h2>
    <div>${summaryEl ? summaryEl.innerHTML : ''}</div>

    <div style="border-top:1px solid #e5e7eb; margin:12px 0;"></div>
    <div>${totalEl ? totalEl.innerHTML : ''}</div>

    <h2 style="font-size:16px; margin: 16px 0 8px;">Photos</h2>
    <div>${photosGridHTML || '<div style="font-size:12px;color:#6b7280;">No photos attached.</div>'}</div>
  `;

  document.body.appendChild(pdfRoot);

  // Render to hi‑res canvas
  const canvas = await html2canvas(pdfRoot, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL('image/png');

  // Create PDF with pagination
  const pdf = new jsPDF('p', 'pt', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    pdf.addPage();
    position = heightLeft - imgHeight;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;
  }

  const blob = pdf.output('blob');
  document.body.removeChild(pdfRoot);

  const download = () => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return { blob, download };
}

/* ---------- Render App ---------- */
document.querySelector('#app').innerHTML = getAppHtml(MAX_PHOTOS);

/* ---------- App State ---------- */
const state = {
  logo: { name: "", dataUrl: "", source: "none" },
  photos: [] // [{ name, dataUrl, caption }]
};
window.state = state; // optional for debugging

/* ---------- Initialize product logic ---------- */
initializeApp();

/* ---------- Preload default header logo ---------- */
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

/* ---------- Photos UI ---------- */
const photosInput = document.getElementById('photos-input');
const photosGrid = document.getElementById('photos-grid');
const photosCount = document.getElementById('photos-count');

function refreshPhotosUI() {
  photosCount.textContent = `${state.photos.length}/${MAX_PHOTOS} selected`;

  photosGrid.innerHTML = state.photos.map((p, idx) => `
    <div class="avoid-break" style="background:#f9fafb;border-radius:12px;padding:12px;border:1px solid #eef2f7;">
      <img src="${p.dataUrl}" alt="${esc(p.name)}" style="width:100%; height:144px; object-fit:cover; border-radius:8px; border:1px solid #eee;">
      <div style="margin-top:6px;font-size:12px;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
        ${esc(p.name)}
      </div>
      <input type="text" placeholder="Caption (optional)"
             data-idx="${idx}" class="photo-caption"
             style="margin-top:6px;width:100%;padding:8px;border:1px solid #e5e7eb;border-radius:8px;font-size:14px;"
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

photosInput?.addEventListener('change', async (e) => {
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

/* ---------- Email Quote → Send via Resend API ---------- */
document.getElementById('email-btn')?.addEventListener('click', async () => {
  const selections = getSelections();
  const hasSelections = Object.values(selections).some(item => item !== null);
  if (!hasSelections) return;

  const emailBtn = document.getElementById('email-btn');
  const originalText = emailBtn.textContent;

  try {
    // Show loading state
    emailBtn.disabled = true;
    emailBtn.textContent = '📧 Sending...';

    const baseBody = generateEmailBody(selections);
    const customer = getCustomerInfo();

    // Get email from the quote-email input instead
    const quoteEmailInput = document.getElementById('quote-email');
    const recipientEmail = quoteEmailInput?.value || customer.email;

    if (!recipientEmail) {
      alert('Please enter an email address in the "Send Quote To" field.');
      emailBtn.textContent = originalText;
      emailBtn.disabled = false;
      return;
    }

    // Build the PDF that includes logo + selections + photos + customer + notes
    const { blob } = await generateQuotePDF({
      logo: state.logo,
      photos: state.photos,
      fileName: 'quote.pdf'
    });

    // Convert PDF blob to base64
    const reader = new FileReader();
    const pdfBase64 = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result.split(',')[1]); // Remove data:application/pdf;base64, prefix
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    // Prepare photos list for email
    const photosList = state.photos.map((p, i) =>
      `${i + 1}. ${p.name}${p.caption ? ' - ' + p.caption : ''}`
    );

    // Send email via Netlify function
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: recipientEmail,  // Use the quote-email input value
        customerInfo: {
          name: customer.name,
          phone: customer.phone,
          email: recipientEmail,  // Use the quote-email input value
          address: customer.address,
        },
        summary: baseBody,
        notes: customer.notes,
        pdfBase64: pdfBase64,
        // photosList: photosList, // No longer sending raw photos to backend for body
      }),
    });

    let result;
    const contentType = response.headers.get("content-type");
    if (response.ok) {
      // If status is 200-299, try to parse JSON, or fallback to text if strictly needed
      try {
        result = await response.json();
      } catch (e) {
        console.warn('Response was ok but not JSON', e);
        result = { success: true }; // Assume success if 200 OK but no JSON body
      }
    } else if (contentType && contentType.indexOf("application/json") !== -1) {
      result = await response.json();
    } else {
      // If not JSON, read as text to see the error (e.g. 404 HTML or 500 error)
      const text = await response.text();
      throw new Error(`Server returned ${response.status} ${response.statusText}: ${text.substring(0, 100)}`);
    }

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    // Success!
    emailBtn.textContent = '✅ Sent!';
    alert(`✅ Email sent successfully to ${recipientEmail}!`);

    // Reset button after 3 seconds
    setTimeout(() => {
      emailBtn.textContent = originalText;
      emailBtn.disabled = false;
    }, 3000);

  } catch (error) {
    console.error('Email error:', error);
    emailBtn.textContent = '❌ Failed';
    alert(`Failed to send email: ${error.message}\n\nPlease check your internet connection and try again.`);

    // Reset button after 3 seconds
    setTimeout(() => {
      emailBtn.textContent = originalText;
      emailBtn.disabled = false;
    }, 3000);
  }
});

/* ---------- Print → Generate same PDF ---------- */
document.getElementById('print-btn')?.addEventListener('click', async () => {
  const { download } = await generateQuotePDF({
    logo: state.logo,
    photos: state.photos,
    fileName: 'quote.pdf'
  });
  download();
});

/* ---------- Reset selections + photos + customer fields ---------- */
document.getElementById('reset-btn')?.addEventListener('click', () => {
  // Clear selection dropdowns (your app.js handles summary enable/disable)
  document.getElementById('bathtub-select').value = '';
  document.getElementById('shower-select').value = '';
  document.getElementById('trim-select').value = '';
  document.getElementById('toilet-select').value = '';
  document.getElementById('sink-select').value = '';
  document.getElementById('tile-select').value = '';
  document.getElementById('labor-select').value = '';

  // Reset summary UI
  document.getElementById('summary').innerHTML = '<p class="empty-message">Select items to see your estimate</p>';
  document.getElementById('total').innerHTML = '';
  document.getElementById('email-btn').disabled = true;

  // Clear photos
  state.photos = [];
  refreshPhotosUI();

  // Clear customer info
  document.getElementById('customer-name').value = '';
  document.getElementById('customer-phone').value = '';
  document.getElementById('customer-email').value = '';
  document.getElementById('customer-address').value = '';
  document.getElementById('customer-notes').value = '';
});
