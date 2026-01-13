// Comprehensive Contractor Quote System
// This file handles all data, UI generation, and logic for the bathroom quote system

export const DEFAULT_QUOTE_DATA = {
  scope_of_work: [
    { id: "1", name: "Demolition & Removal", price: 800 },
    { id: "2", name: "Plumbing Rough-In", price: 1200 },
    { id: "3", name: "Electrical Work", price: 1000 }
  ]
};

export let products = { ...DEFAULT_QUOTE_DATA };
export let selections = { scope_of_work: null };

let isAdminMode = false;

// Load/Save from localStorage
export function loadProductsFromStorage() {
  const stored = localStorage.getItem('bathroom_quote_products');
  if (stored) {
    try {
      products = JSON.parse(stored);
    } catch (e) {
      products = { ...DEFAULT_QUOTE_DATA };
    }
  }
}

export function saveProductsToStorage() {
  localStorage.setItem('bathroom_quote_products', JSON.stringify(products));
}

// Admin functions
export function loginAdmin(password) {
  if (password === 'admin123') {
    isAdminMode = true;
    document.body.classList.add('admin-mode');
    return true;
  }
  return false;
}

export function logoutAdmin() {
  isAdminMode = false;
  document.body.classList.remove('admin-mode');
}

export function isAdmin() {
  return isAdminMode;
}

export function getSelections() {
  return selections;
}

// Add/Delete items
export async function addItem(category, name, price) {
  if (!products[category]) products[category] = [];
  const newId = String(products[category].length + 1);
  const newItem = { id: newId, name, price: parseFloat(price) };
  products[category].push(newItem);
  saveProductsToStorage();
  return newItem;
}

export async function deleteItem(category, id) {
  if (!products[category]) return;
  products[category] = products[category].filter(item => item.id !== id);
  saveProductsToStorage();
}

// Populate dropdowns
function populateDropdown(selectId, items) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.innerHTML = '<option value="">-- Select --</option>' +
    items.map(item => `<option value="${item.id}">${item.name} - $${item.price.toFixed(2)}</option>`).join('');
}

// Initialize app
export async function initializeApp() {
  loadProductsFromStorage();

  // Populate scope of work
  populateDropdown('scope_of_work-select', products.scope_of_work);

  // Setup admin controls
  setupAdminControls();

  // Setup change listeners
  setupChangeListeners();

  // Build quote sections
  buildQuoteSections();
}

function buildQuoteSections() {
  const container = document.getElementById('quote-sections');
  if (!container) return;

  container.innerHTML = `
    <p style="text-align: center; color: #6b7280; padding: 40px;">
      Comprehensive quote system is being built...<br>
      <small>This will include all sections from your specifications</small>
    </p>
  `;
}

function setupChangeListeners() {
  const scopeSelect = document.getElementById('scope_of_work-select');
  if (scopeSelect) {
    scopeSelect.addEventListener('change', updateSummary);
  }
}

function updateSummary() {
  const scopeSelect = document.getElementById('scope_of_work-select');
  const summaryDiv = document.getElementById('summary');
  const totalDiv = document.getElementById('total');
  const emailBtn = document.getElementById('email-btn');

  if (!scopeSelect || !summaryDiv || !totalDiv) return;

  const selectedId = scopeSelect.value;

  if (!selectedId) {
    summaryDiv.innerHTML = '<p class="empty-message">Select items to see your estimate</p>';
    totalDiv.innerHTML = '';
    if (emailBtn) emailBtn.disabled = true;
    return;
  }

  const item = products.scope_of_work.find(p => p.id === selectedId);
  if (!item) return;

  selections.scope_of_work = item;

  summaryDiv.innerHTML = `
    <div style="padding: 12px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px;">
      <strong>Scope of Work:</strong> ${item.name}<br>
      <span style="color: #059669;">$${item.price.toFixed(2)}</span>
    </div>
  `;

  totalDiv.innerHTML = `
    <div style="padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin-top: 16px;">
      <div style="font-size: 14px; opacity: 0.9;">Total Estimate</div>
      <div style="font-size: 28px; font-weight: bold; margin-top: 4px;">$${item.price.toFixed(2)}</div>
    </div>
  `;

  if (emailBtn) emailBtn.disabled = false;
}

export function generateEmailBody(selections) {
  let body = "BATHROOM QUOTE\n\n";

  if (selections.scope_of_work) {
    body += `Scope of Work: ${selections.scope_of_work.name} - $${selections.scope_of_work.price.toFixed(2)}\n`;
  }

  return body;
}

function setupAdminControls() {
  const adminBtn = document.getElementById('admin-btn');
  if (adminBtn) {
    adminBtn.addEventListener('click', () => {
      const password = prompt('Enter admin password:');
      if (password && loginAdmin(password)) {
        alert('Admin mode activated!');
      } else if (password) {
        alert('Incorrect password');
      }
    });
  }

  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutAdmin();
      alert('Logged out of admin mode');
    });
  }
}
