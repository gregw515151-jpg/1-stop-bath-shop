// Comprehensive Contractor Quote System - Complete Implementation
// Based on handwritten specifications
import { supabase } from './supabaseClient.js';
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

// Dropdown mappings for dynamic admin controls
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

// Load/Save to Supabase
export async function loadProductsFromStorage() {
  try {
    // First try to load from Supabase
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.warn('Supabase load error, falling back to defaults:', error.message);
      products = { ...DEFAULT_QUOTE_DATA };
      return;
    }

    if (data && data.length > 0) {
      // Convert array of {category, items} to object format
      const loadedProducts = {};
      data.forEach(row => {
        if (row.category && row.items) {
          loadedProducts[row.category] = row.items;
        }
      });
      // Merge with defaults to ensure all categories exist
      products = { ...DEFAULT_QUOTE_DATA, ...loadedProducts };
      console.log('Products loaded from Supabase:', Object.keys(loadedProducts).length, 'categories');
    } else {
      // No data in Supabase yet, use defaults and save them
      products = { ...DEFAULT_QUOTE_DATA };
      console.log('No products in Supabase, using defaults');
      await saveProductsToStorage(); // Save defaults to Supabase
    }
  } catch (err) {
    console.error('Error loading products:', err);
    products = { ...DEFAULT_QUOTE_DATA };
  }
}

export async function saveProductsToStorage() {
  try {
    // Save each category as a separate row in Supabase
    for (const [category, items] of Object.entries(products)) {
      const { error } = await supabase
        .from('products')
        .upsert(
          { category: category, items: items },
          { onConflict: 'category' }
        );

      if (error) {
        console.error(`Error saving ${category}:`, error.message);
      }
    }
    console.log('Products saved to Supabase');
  } catch (err) {
    console.error('Error saving products:', err);
  }
}

// Admin
export function loginAdmin(password) {
  if (password === 'admin123') {
    isAdminMode = true;
    document.body.classList.add('admin-mode');
    setTimeout(() => injectAdminControlsToAllDropdowns(), 100);
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

// Add/Delete with sequential ID system
export async function addItem(category, name, price) {
  if (!products[category]) products[category] = [];

  // Find the lowest available ID from 1-100
  const usedIds = new Set(products[category].map(item => parseInt(item.id)));
  let newId = 1;
  while (usedIds.has(newId) && newId <= 100) {
    newId++;
  }

  if (newId > 100) {
    alert('Maximum of 100 items per category reached');
    return;
  }

  products[category].push({ id: String(newId), name, price: parseFloat(price) });

  // Sort by ID to keep them in order
  products[category].sort((a, b) => parseInt(a.id) - parseInt(b.id));

  saveProductsToStorage();
}

export async function deleteItem(category, id) {
  if (!products[category]) return;
  products[category] = products[category].filter(item => item.id !== id);
  saveProductsToStorage();
}

// Renumber all items in all categories to use sequential IDs 1-100
function renumberAllItems() {
  console.log('Renumbering all items to sequential IDs...');

  Object.keys(products).forEach(category => {
    if (Array.isArray(products[category])) {
      products[category].forEach((item, index) => {
        item.id = String(index + 1);
      });
      console.log(`Renumbered ${products[category].length} items in ${category}`);
    }
  });

  saveProductsToStorage();
  console.log('All items renumbered and saved');
}

// Initialize
export async function initializeApp() {
  await loadProductsFromStorage(); // Now async - loads from Supabase
  renumberAllItems(); // Ensure all items have sequential IDs
  buildQuoteSections(); // Build HTML first
  populateDropdowns(); // Then populate with data
  setupAdminControls();
  setupListeners();
}

function populateDropdowns() {
  // Populate all dropdowns using DROPDOWN_MAPPINGS
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
    <!-- Section 1: Demolition & Disposal -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🗑️ Demolition & Disposal</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <label style="font-weight: 600; margin-bottom: 12px; display: block;">Select items to demo:</label>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px;">
          ${['Vanity', 'Vanity Top', 'Toilet', 'Drywall', 'Ceiling', 'Fan', 'Vanity Light', 'Ceiling Lights', 'Tub', 'Shower', 'Floor', 'Door Casing', 'Window Casing', 'Bill & List'].map(item => `
            <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
              <input type="checkbox" class="demo-item" value="${item}" style="width: 18px; height: 18px;">
              <span>${item}</span>
            </label>
          `).join('')}
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Demolition Notes:</label>
          <textarea id="demolition-notes" rows="2" class="select-input" placeholder="Any special demolition requirements or notes..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 2: Fixtures & Finishes -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🚰 Fixtures & Finishes</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div class="form-group">
          <label>Plumbing Fixture Color:</label>
          <select id="plumbing-color" class="select-input">
          </select>
        </div>
        <div class="form-group">
          <label>Plumbing Fixture Style:</label>
          <select id="plumbing-style" class="select-input">
          </select>
        </div>
        <div class="form-group">
          <label>Electrical Device Color:</label>
          <select id="electrical-color" class="select-input">
          </select>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Fixtures & Finishes Notes:</label>
          <textarea id="fixtures-notes" rows="2" class="select-input" placeholder="Any special fixture or finish requirements..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 3: Electrical -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">⚡ Electrical</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div class="form-group">
          <label>Exhaust Fan Type:</label>
          <select id="exhaust-fan" class="select-input">
          </select>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <div class="form-group">
            <label>Switches:</label>
            <input type="number" id="switches" min="0" class="select-input" placeholder="How many?">
          </div>
          <div class="form-group">
            <label>Outlets:</label>
            <input type="number" id="outlets" min="0" class="select-input" placeholder="How many?">
          </div>
          <div class="form-group">
            <label>Recessed Lights:</label>
            <input type="number" id="recessed-lights" min="0" class="select-input" placeholder="How many?">
          </div>
        </div>
        <div class="form-group">
          <label>Electrical Notes:</label>
          <textarea id="electrical-notes" rows="2" class="select-input" placeholder="Any special electrical requirements..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 4: Acrylics (Shower Pan, Bathtub, Walls) -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🛁 Acrylics</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
        <div>
          <h3 style="margin: 0 0 12px; font-size: 1.1rem; color: #374151;">Shower Pan</h3>
          <div class="form-group">
            <label>Color:</label>
            <select id="shower-color" class="select-input">
          </select>
          </div>
          <div class="form-group">
            <label>Size:</label>
            <select id="shower-size" class="select-input">
          </select>
          </div>
          <div class="form-group">
            <label>Drain Location:</label>
            <select id="shower-drain" class="select-input">
          </select>
          </div>

          <h3 style="margin: 20px 0 12px; font-size: 1.1rem; color: #374151;">Bathtub</h3>
          <div class="form-group">
            <label>Depth:</label>
            <select id="tub-depth" class="select-input">
          </select>
          </div>
          <div class="form-group">
            <label>Length:</label>
            <select id="tub-length" class="select-input">
          </select>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 12px; font-size: 1.1rem; color: #374151;">Walls</h3>
          <div class="form-group">
            <label>Color:</label>
            <select id="wall-color" class="select-input">
          </select>
          </div>
          <div class="form-group">
            <label>Pattern:</label>
            <select id="wall-pattern" class="select-input">
          </select>
          </div>
          <div class="form-group">
            <label>Wall Type:</label>
            <select id="wall-type" class="select-input">
          </select>
          </div>
        </div>
        <div class="form-group" style="margin-top: 20px; grid-column: 1 / -1;">
          <label>Acrylics Notes:</label>
          <textarea id="bathroom-notes" rows="2" class="select-input" placeholder="Any special requirements for shower pan, bathtub, or walls..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 5: Cabinetry -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🪵 Cabinetry</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div class="form-group">
          <label>Vanity Length:</label>
          <select id="vanity-length" class="select-input">
          </select>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Cabinetry Notes:</label>
          <textarea id="cabinetry-notes" rows="2" class="select-input" placeholder="Any special requirements for vanity or cabinetry..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 6: Flooring & Trim -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🔨 Flooring & Trim</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label>Flooring Type:</label>
            <select id="flooring-type" class="select-input">
          </select>
          </div>
          <div class="form-group">
            <label>Square Footage:</label>
            <input type="number" id="flooring-sqft" min="0" class="select-input" placeholder="Enter sq ft">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-top: 16px;">
          <div class="form-group">
            <label>Baseboard Style:</label>
            <select id="baseboard-style" class="select-input">
          </select>
          </div>
          <div class="form-group">
            <label>Window/Door Trim:</label>
            <select id="window-style" class="select-input">
          </select>
          </div>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Flooring & Trim Notes:</label>
          <textarea id="flooring-notes" rows="2" class="select-input" placeholder="Any special flooring or trim requirements..."></textarea>
        </div>
      </div>
    </section>
  `;

  // Make toggle function global
  window.toggleSection = function (header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    if (content.style.display === 'none') {
      content.style.display = 'block';
      icon.textContent = '▼';
    } else {
      content.style.display = 'none';
      icon.textContent = '▶';
    }
  };
}

function setupListeners() {
  // Scope of work
  document.getElementById('scope_of_work-select')?.addEventListener('change', updateSummary);

  // All other inputs
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

  // Demo checkboxes
  document.querySelectorAll('.demo-item').forEach(cb => {
    cb.addEventListener('change', updateSummary);
  });
}

function updateSummary() {
  // Update selections
  selections.scope_of_work = getSelectedItem('scope_of_work-select', products.scope_of_work);
  selections.demo_items = Array.from(document.querySelectorAll('.demo-item:checked')).map(cb => cb.value);

  // Define all labels for display and selection update
  const fieldMapping = {
    'plumbing-color': { key: 'plumbing_color', label: 'Plumbing Color' },
    'plumbing-style': { key: 'plumbing_style', label: 'Plumbing Style' },
    'plumbing-type': { key: 'plumbing_type', label: 'Plumbing Type' },
    'exhaust-fan': { key: 'exhaust_fan', label: 'Exhaust Fan' },
    'shower-size': { key: 'shower_size', label: 'Shower Size' },
    'wall-type': { key: 'wall_type', label: 'Wall Type' },
    'vanity-length': { key: 'vanity_length', label: 'Vanity Length' },
    'flooring-type': { key: 'flooring_type', label: 'Flooring' }
  };

  // Build summary
  let total = 0;
  let html = '';

  if (selections.scope_of_work) {
    html += `<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;">
      <strong>Scope:</strong> ${selections.scope_of_work.name} <span style="color: #059669;">$${selections.scope_of_work.price.toFixed(2)}</span>
    </div>`;
    total += selections.scope_of_work.price;
  }

  if (selections.demo_items.length > 0) {
    html += `<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;">
      <strong>Demo:</strong> ${selections.demo_items.join(', ')}
    </div>`;
  }

  // Update other selections and build HTML
  Object.entries(fieldMapping).forEach(([id, config]) => {
    const el = document.getElementById(id);
    if (el) {
      const val = el.value;
      selections[config.key] = val ? el.options[el.selectedIndex].text : "";

      if (val) {
        // Try to estimate price if it's in the text (e.g. "+$100")
        const priceMatch = el.options[el.selectedIndex].text.match(/\(\+\$([0-9.]+)\)/);
        if (priceMatch) {
          total += parseFloat(priceMatch[1]);
        }

        html += `<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;">
          <strong>${config.label}:</strong> ${el.options[el.selectedIndex].text}
        </div>`;
      }
    }
  });

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

function getSelectedItem(selectId, items) {
  const select = document.getElementById(selectId);
  if (!select || !select.value) return null;
  return items?.find(item => item.id === select.value) || null;
}

export function generateEmailBody(selections) {
  let body = "";

  if (selections.scope_of_work) {
    body += `SCOPE: ${selections.scope_of_work.name} - $${selections.scope_of_work.price.toFixed(2)}\n`;
  }

  if (selections.demo_items && selections.demo_items.length > 0) {
    body += `\nDEMO ITEMS:\n- ${selections.demo_items.join('\n- ')}\n`;
  }

  const fieldLabels = {
    'plumbing_color': 'Shower Pan Color',
    'plumbing_style': 'Faucet Style',
    'plumbing_type': 'Plumbing Type',
    'exhaust_fan': 'Exhaust Fan',
    'shower_size': 'Shower Size',
    'wall_type': 'Wall Surround Type',
    'vanity_length': 'Vanity Length',
    'flooring_type': 'Flooring Type'
  };

  let hasOther = false;
  Object.entries(fieldLabels).forEach(([key, label]) => {
    if (selections[key] && selections[key] !== "") {
      if (!hasOther) { body += "\nPRODUCT SELECTIONS:\n"; hasOther = true; }
      body += `${label}: ${selections[key]}\n`;
    }
  });

  return body;
}

function setupAdminControls() {
  document.getElementById('admin-btn')?.addEventListener('click', () => {
    const password = prompt('Enter admin password:');
    if (password && loginAdmin(password)) {
      alert('Admin mode activated!');
    } else if (password) {
      alert('Incorrect password');
    }
  });

  document.getElementById('admin-logout-btn')?.addEventListener('click', () => {
    logoutAdmin();
    alert('Logged out');
  });

  document.getElementById('admin-reset-btn')?.addEventListener('click', () => {
    if (confirm('⚠️ This will reset all dropdown data to defaults and clear any custom items you added. Continue?')) {
      localStorage.removeItem('bathroom_quote_products');
      alert('Data reset! Page will reload.');
      window.location.reload();
    }
  });
}
// Dynamic Admin Controls - Append to end of app.js

// Dynamically inject admin controls to all dropdowns
function injectAdminControlsToAllDropdowns() {
  console.log('Injecting admin controls to all dropdowns...');
  console.log('DROPDOWN_MAPPINGS:', DROPDOWN_MAPPINGS);

  Object.entries(DROPDOWN_MAPPINGS).forEach(([selectId, category]) => {
    console.log(`Looking for dropdown: ${selectId}`);
    const select = document.getElementById(selectId);

    if (!select) {
      console.warn(`Dropdown not found: ${selectId}`);
      return;
    }

    console.log(`Found dropdown: ${selectId}, parent:`, select.parentElement);

    // Check if admin controls already exist
    const existingControls = select.parentElement.querySelector('.dynamic-admin-controls');
    if (existingControls) {
      console.log(`Admin controls already exist for ${selectId}`);
      return;
    }

    console.log(`Creating admin controls for ${selectId}`);

    // Create admin controls
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'dynamic-admin-controls admin-control';
    controlsDiv.style.cssText = 'margin-top: 8px; padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bfdbfe;';

    controlsDiv.innerHTML = `
      <input type="text" placeholder="Item name" class="admin-name-input" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
      <input type="number" placeholder="Price" step="0.01" class="admin-price-input" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-primary admin-add-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">➕ Add</button>
        <button class="btn btn-secondary admin-edit-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">✏️ Edit</button>
        <button class="btn btn-secondary admin-delete-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">🗑️ Delete</button>
        <button class="btn btn-secondary admin-cancel-btn" style="display: none; flex: 1; padding: 6px 12px; font-size: 12px; background: #6b7280;">❌ Cancel</button>
      </div>
    `;

    select.parentElement.appendChild(controlsDiv);
    console.log(`Admin controls added for ${selectId}`);

    // Setup event listeners
    setupDynamicAdminControls(selectId, category, controlsDiv);
  });

  console.log('Admin control injection complete');
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

  // Add button (handles both Add and Update)
  addBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value) || 0;

    if (!name) {
      alert('Please enter an item name');
      return;
    }

    // Check if we're in edit mode
    if (addBtn.dataset.editingId) {
      // Update existing item
      await editItem(category, addBtn.dataset.editingId, name, price);
      delete addBtn.dataset.editingId;
      delete addBtn.dataset.editingCategory;
      addBtn.textContent = '➕ Add';
      alert(`Updated "${name}"`);
    } else {
      // Add new item
      await addItem(category, name, price);
      alert(`Added "${name}"`);
    }

    nameInput.value = '';
    priceInput.value = '';
    populateDropdowns();
    updateSummary();
  });

  // Edit button
  editBtn.addEventListener('click', async () => {
    const selectedId = select.value;
    if (!selectedId) {
      alert('Please select an item to edit');
      return;
    }

    console.log('Edit clicked - Category:', category, 'Selected ID:', selectedId);
    console.log('Available items:', products[category]);

    const item = products[category]?.find(p => String(p.id) === String(selectedId));
    if (!item) {
      console.error('Item not found! Looking for ID:', selectedId, 'in', products[category]);
      alert(`Item not found. ID: ${selectedId}`);
      return;
    }

    console.log('Found item:', item);

    // Pre-fill inputs
    nameInput.value = item.name;
    priceInput.value = item.price;

    // Change Add button to Update and store the selected ID
    addBtn.textContent = '✅ Update';
    addBtn.dataset.editingId = selectedId;
    addBtn.dataset.editingCategory = category;

    // Show Cancel button
    const cancelBtn = controlsDiv.querySelector('.admin-cancel-btn');
    if (cancelBtn) cancelBtn.style.display = 'block';
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

  // Cancel button
  const cancelBtn = controlsDiv.querySelector('.admin-cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      // Clear inputs
      nameInput.value = '';
      priceInput.value = '';

      // Reset Add button
      addBtn.textContent = '➕ Add';
      delete addBtn.dataset.editingId;
      delete addBtn.dataset.editingCategory;

      // Hide Cancel button
      cancelBtn.style.display = 'none';
    });
  }
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

