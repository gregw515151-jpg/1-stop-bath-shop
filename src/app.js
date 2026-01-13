// Comprehensive Contractor Quote System - Complete Implementation
// Dynamic Admin Controls for All Dropdowns

export const DEFAULT_QUOTE_DATA = {
  scope_of_work: [
    { id: "1", name: "Demolition & Removal", price: 800 },
    { id: "2", name: "Plumbing Rough-In", price: 1200 },
    { id: "3", name: "Electrical Work", price: 1000 }
  ],
  plumbing_colors: [
    { id: "1", name: "Chrome", price: 0 },
    { id: "2", name: "Brushed Nickel", price: 50 },
    { id: "3", name: "Oil Rubbed Bronze", price: 75 },
    { id: "4", name: "Flat Black", price: 100 },
    { id: "5", name: "Custom", price: 0 }
  ],
  plumbing_styles: [
    { id: "1", name: "Modern", price: 0 },
    { id: "2", name: "Chateau", price: 50 },
    { id: "3", name: "Modern Brushed", price: 25 },
    { id: "4", name: "Modern Glyde", price: 25 },
    { id: "5", name: "Modern Voss", price: 25 },
    { id: "6", name: "Custom", price: 0 }
  ],
  electrical_colors: [
    { id: "1", name: "White", price: 0 },
    { id: "2", name: "Light Almond", price: 5 },
    { id: "3", name: "Ivory", price: 5 },
    { id: "4", name: "Custom", price: 0 }
  ],
  exhaust_fans: [
    { id: "1", name: "Fan Only", price: 100 },
    { id: "2", name: "Fan + Light", price: 150 },
    { id: "3", name: "Fan + Light + Heater", price: 250 }
  ],
  shower_colors: [
    { id: "1", name: "White", price: 0 },
    { id: "2", name: "Almond", price: 25 },
    { id: "3", name: "Biscuit", price: 25 },
    { id: "4", name: "Gray", price: 50 },
    { id: "5", name: "Custom", price: 0 }
  ],
  shower_sizes: [
    { id: "1", name: "60x30", price: 320 },
    { id: "2", name: "54x30", price: 340 },
    { id: "3", name: "72x36", price: 420 }
  ],
  drain_locations: [
    { id: "1", name: "Left", price: 0 },
    { id: "2", name: "Right", price: 0 },
    { id: "3", name: "Center", price: 0 }
  ],
  tub_depths: [
    { id: "1", name: '12"', price: 0 },
    { id: "2", name: '13"', price: 20 },
    { id: "3", name: '15"', price: 40 },
    { id: "4", name: '17"', price: 60 },
    { id: "5", name: '18"', price: 80 }
  ],
  tub_lengths: [
    { id: "1", name: '48"', price: 400 },
    { id: "2", name: '50"', price: 420 },
    { id: "3", name: '52"', price: 440 },
    { id: "4", name: '53"', price: 450 },
    { id: "5", name: '54"', price: 460 },
    { id: "6", name: '55"', price: 470 },
    { id: "7", name: '56"', price: 480 },
    { id: "8", name: '57"', price: 490 },
    { id: "9", name: '58"', price: 500 },
    { id: "10", name: '59"', price: 510 },
    { id: "11", name: '60"', price: 520 }
  ],
  wall_colors: [
    { id: "1", name: "White", price: 0 },
    { id: "2", name: "Almond", price: 25 },
    { id: "3", name: "Biscuit", price: 25 },
    { id: "4", name: "Afterwhite", price: 50 },
    { id: "5", name: "Custom", price: 0 }
  ],
  wall_patterns: [
    { id: "1", name: "Smooth", price: 0 },
    { id: "2", name: "Texture/Brushed", price: 100 },
    { id: "3", name: "3x6 Subway", price: 150 },
    { id: "4", name: "8x8", price: 120 },
    { id: "5", name: "12x12", price: 140 }
  ],
  wall_types: [
    { id: "1", name: "Reg Shower", price: 800 },
    { id: "2", name: "Reg Tub", price: 600 },
    { id: "3", name: "4 Bead Shower", price: 900 },
    { id: "4", name: "4 Bead Tub", price: 700 }
  ],
  vanity_lengths: [
    { id: "1", name: '18"', price: 300 },
    { id: "2", name: '24"', price: 400 },
    { id: "3", name: '36"', price: 600 },
    { id: "4", name: '42"', price: 700 },
    { id: "5", name: '48"', price: 800 },
    { id: "6", name: '54"', price: 900 },
    { id: "7", name: '60"', price: 1000 },
    { id: "8", name: '78"', price: 1400 }
  ],
  flooring_types: [
    { id: "1", name: "LVP", price: 4 },
    { id: "2", name: "Tile", price: 8 }
  ],
  baseboard_styles: [
    { id: "1", name: 'WM623 - 3¼" Colonial', price: 2.50 },
    { id: "2", name: 'WM713 - 3½" Clamshell', price: 2.75 },
    { id: "3", name: 'WM663 - 3¼" Ogee', price: 2.60 },
    { id: "4", name: "Custom", price: 0 }
  ],
  window_styles: [
    { id: "1", name: 'WM376 - 2⅛" Colonial', price: 2.00 },
    { id: "2", name: 'WM366 - 2¼" Flat Edge', price: 2.10 },
    { id: "3", name: 'WM445 - 3¼" Colonial', price: 2.50 },
    { id: "4", name: "Custom", price: 0 }
  ]
};

export let products = { ...DEFAULT_QUOTE_DATA };

// Comprehensive selections object
export let selections = {
  scope_of_work: null,
  demo_items: [],
  demolition_notes: "",
  plumbing_color: "",
  plumbing_style: "",
  plumbing_type: "",
  electrical_color: "",
  fixtures_notes: "",
  exhaust_fan: "",
  switches: 0,
  outlets: 0,
  recessed_lights: 0,
  electrical_notes: "",
  shower_color: "",
  shower_size: "",
  shower_drain: "",
  tub_color: "",
  tub_depth: "",
  tub_length: "",
  tub_width: "",
  tub_drain: "",
  wall_color: "",
  wall_pattern: "",
  wall_type: "",
  vanity_style: "",
  vanity_length: "",
  vanity_drawer: "",
  vanity_combo: "",
  vanity_top_bowl: "",
  vanity_top_holes: "",
  vanity_top_faucets: "",
  vanity_top_splashes: [],
  bathroom_notes: "",
  flooring_type: "",
  flooring_sqft: 0,
  baseboard_style: "",
  baseboard_finish: "",
  window_style: "",
  window_finish: "",
  flooring_notes: ""
};

let isAdminMode = false;

// Dropdown mappings
const DROPDOWN_MAPPINGS = {
  'scope_of_work-select': 'scope_of_work',
  'plumbing-color': 'plumbing_colors',
  'plumbing-style': 'plumbing_styles',
  'electrical-color': 'electrical_colors',
  'exhaust-fan': 'exhaust_fans',
  'shower-color': 'shower_colors',
  'shower-size': 'shower_sizes',
  'shower-drain': 'drain_locations',
  'tub-depth': 'tub_depths',
  'tub-length': 'tub_lengths',
  'wall-color': 'wall_colors',
  'wall-pattern': 'wall_patterns',
  'wall-type': 'wall_types',
  'vanity-length': 'vanity_lengths',
  'flooring-type': 'flooring_types',
  'baseboard-style': 'baseboard_styles',
  'window-style': 'window_styles'
};

// Load/Save
export function loadProductsFromStorage() {
  const stored = localStorage.getItem('bathroom_quote_products');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all categories exist
      products = { ...DEFAULT_QUOTE_DATA, ...parsed };
    } catch (e) {
      products = { ...DEFAULT_QUOTE_DATA };
    }
  }
}

export function saveProductsToStorage() {
  localStorage.setItem('bathroom_quote_products', JSON.stringify(products));
}

// Admin
export function loginAdmin(password) {
  if (password === 'admin123') {
    isAdminMode = true;
    document.body.classList.add('admin-mode');
    injectAdminControlsToAllDropdowns();
    return true;
  }
  return false;
}

export function logoutAdmin() {
  isAdminMode = false;
  document.body.classList.remove('admin-mode');
  removeAdminControlsFromAllDropdowns();
}

export function isAdmin() {
  return isAdminMode;
}

export function getSelections() {
  return selections;
}

// Add/Delete/Edit items
export async function addItem(category, name, price) {
  if (!products[category]) products[category] = [];
  const newId = String(Date.now()); // Use timestamp for unique ID
  products[category].push({ id: newId, name, price: parseFloat(price) });
  saveProductsToStorage();
  return newId;
}

export async function deleteItem(category, id) {
  if (!products[category]) return;
  products[category] = products[category].filter(item => item.id !== id);
  saveProductsToStorage();
}

export async function editItem(category, id, name, price) {
  if (!products[category]) return;
  const item = products[category].find(p => p.id === id);
  if (item) {
    item.name = name;
    item.price = parseFloat(price);
    saveProductsToStorage();
  }
}

// Dynamically inject admin controls to all dropdowns
function injectAdminControlsToAllDropdowns() {
  Object.entries(DROPDOWN_MAPPINGS).forEach(([selectId, category]) => {
    const select = document.getElementById(selectId);
    if (!select) return;

    // Check if admin controls already exist
    const existingControls = select.parentElement.querySelector('.dynamic-admin-controls');
    if (existingControls) return;

    // Create admin controls
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'dynamic-admin-controls admin-control';
    controlsDiv.style.cssText = 'margin-top: 8px; padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bfdbfe;';

    controlsDiv.innerHTML = `
      <input type="text" placeholder="Item name" class="admin-name-input" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
      <input type="number" placeholder="Price" class="admin-price-input" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-primary admin-add-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">➕ Add</button>
        <button class="btn btn-secondary admin-edit-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">✏️ Edit</button>
        <button class="btn btn-secondary admin-delete-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">🗑️ Delete</button>
      </div>
    `;

    select.parentElement.appendChild(controlsDiv);

    // Setup event listeners
    setupDynamicAdminControls(selectId, category, controlsDiv);
  });
}

function removeAdminControlsFromAllDropdowns() {
  document.querySelectorAll('.dynamic-admin-controls').forEach(el => el.remove());
}

function setupDynamicAdminControls(selectId, category, controlsDiv) {
  const select = document.getElementById(selectId);
  const nameInput = controlsDiv.querySelector('.admin-name-input');
  const priceInput = controlsDiv.querySelector('.admin-price-input');
  const addBtn = controlsDiv.querySelector('.admin-add-btn');
  const editBtn = controlsDiv.querySelector('.admin-edit-btn');
  const deleteBtn = controlsDiv.querySelector('.admin-delete-btn');

  // Add button
  addBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value) || 0;

    if (!name) {
      alert('Please enter an item name');
      return;
    }

    await addItem(category, name, price);
    nameInput.value = '';
    priceInput.value = '';
    populateDropdowns();
    alert(`Added "${name}"`);
  });

  // Edit button
  editBtn.addEventListener('click', async () => {
    const selectedId = select.value;
    if (!selectedId) {
      alert('Please select an item to edit');
      return;
    }

    const item = products[category]?.find(p => p.id === selectedId);
    if (!item) return;

    // Pre-fill inputs
    nameInput.value = item.name;
    priceInput.value = item.price;

    // Change Add button to Update
    addBtn.textContent = '✅ Update';
    addBtn.onclick = async () => {
      const newName = nameInput.value.trim();
      const newPrice = parseFloat(priceInput.value) || 0;

      if (!newName) {
        alert('Please enter an item name');
        return;
      }

      await editItem(category, selectedId, newName, newPrice);
      nameInput.value = '';
      priceInput.value = '';
      addBtn.textContent = '➕ Add';
      addBtn.onclick = null;
      setupDynamicAdminControls(selectId, category, controlsDiv);
      populateDropdowns();
      updateSummary();
      alert(`Updated "${newName}"`);
    };
  });

  // Delete button
  deleteBtn.addEventListener('click', async () => {
    const selectedId = select.value;
    if (!selectedId) {
      alert('Please select an item to delete');
      return;
    }

    const item = products[category]?.find(p => p.id === selectedId);
    if (item && confirm(`Delete "${item.name}"?`)) {
      await deleteItem(category, selectedId);
      populateDropdowns();
      updateSummary();
      alert(`Deleted "${item.name}"`);
    }
  });
}

// Initialize
export async function initializeApp() {
  loadProductsFromStorage();
  populateDropdowns();
  buildQuoteSections();
  setupAdminControls();
  setupListeners();
}

function populateDropdowns() {
  Object.entries(DROPDOWN_MAPPINGS).forEach(([selectId, category]) => {
    const select = document.getElementById(selectId);
    if (select && products[category]) {
      select.innerHTML = '<option value="">-- Select --</option>' +
        products[category].map(item =>
          `<option value="${item.id}">${item.name}${item.price > 0 ? ' (+$' + item.price.toFixed(2) + ')' : item.price < 0 ? ' (-$' + Math.abs(item.price).toFixed(2) + ')' : ''}</option>`
        ).join('');
    }
  });
}

function buildQuoteSections() {
  const container = document.getElementById('quote-sections');
  if (!container) return;

  container.innerHTML = `
    <p style="text-align: center; color: #6b7280; padding: 20px;">
      <strong>Comprehensive Quote System Loaded</strong><br>
      <small>Use the dropdowns to select options. Login as admin to manage items.</small>
    </p>
  `;
}

function setupListeners() {
  document.getElementById('scope_of_work-select')?.addEventListener('change', updateSummary);

  const inputs = [
    'plumbing-color', 'plumbing-style', 'electrical-color', 'exhaust-fan',
    'switches', 'outlets', 'recessed-lights', 'electrical-notes',
    'demolition-notes', 'fixtures-notes', 'bathroom-notes', 'flooring-notes',
    'shower-color', 'shower-size', 'shower-drain',
    'tub-depth', 'tub-length',
    'wall-color', 'wall-pattern', 'wall-type',
    'vanity-length', 'flooring-type', 'flooring-sqft',
    'baseboard-style', 'window-style'
  ];

  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateSummary);
  });

  document.querySelectorAll('.demo-item').forEach(cb => {
    cb.addEventListener('change', updateSummary);
  });
}

function updateSummary() {
  selections.scope_of_work = getSelectedItem('scope_of_work-select', 'scope_of_work');
  selections.demo_items = Array.from(document.querySelectorAll('.demo-item:checked')).map(cb => cb.value);

  let total = 0;
  let html = '';

  if (selections.scope_of_work) {
    html += `<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;">
      <strong>Scope:</strong> ${selections.scope_of_work.name} <span style="color: #059669;">$${selections.scope_of_work.price}</span>
    </div>`;
    total += selections.scope_of_work.price;
  }

  if (selections.demo_items.length > 0) {
    html += `<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;">
      <strong>Demo:</strong> ${selections.demo_items.join(', ')}
    </div>`;
  }

  const summaryDiv = document.getElementById('summary');
  const totalDiv = document.getElementById('total');
  const emailBtn = document.getElementById('email-btn');

  if (html) {
    summaryDiv.innerHTML = html;
    totalDiv.innerHTML = `
      <div style="padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin-top: 16px;">
        <div style="font-size: 14px; opacity: 0.9;">Total Estimate</div>
        <div style="font-size: 28px; font-weight: bold; margin-top: 4px;">$${total.toFixed(2)}</div>
      </div>
    `;
    if (emailBtn) emailBtn.disabled = false;
  } else {
    summaryDiv.innerHTML = '<p class="empty-message">Select items to see your estimate</p>';
    totalDiv.innerHTML = '';
    if (emailBtn) emailBtn.disabled = true;
  }
}

function getSelectedItem(selectId, category) {
  const select = document.getElementById(selectId);
  if (!select || !select.value) return null;
  return products[category]?.find(item => item.id === select.value) || null;
}

export function generateEmailBody(selections) {
  let body = "BATHROOM QUOTE\n\n";
  if (selections.scope_of_work) {
    body += `Scope: ${selections.scope_of_work.name} - $${selections.scope_of_work.price}\n`;
  }
  if (selections.demo_items.length > 0) {
    body += `\nDemo Items: ${selections.demo_items.join(', ')}\n`;
  }
  return body;
}

function setupAdminControls() {
  document.getElementById('admin-btn')?.addEventListener('click', () => {
    const password = prompt('Enter admin password:');
    if (password && loginAdmin(password)) {
      alert('Admin mode activated! Admin controls added to all dropdowns.');
    } else if (password) {
      alert('Incorrect password');
    }
  });

  document.getElementById('admin-logout-btn')?.addEventListener('click', () => {
    logoutAdmin();
    alert('Logged out');
  });
}
