// Comprehensive Contractor Quote System - Complete Implementation
// Based on handwritten specifications
import { supabase } from './supabaseClient.js';
export const DEFAULT_QUOTE_DATA = {
  scope_of_work: [
    { id: "1", name: "Title Shower", price: 0 },
    { id: "2", name: "Tub to Shower Conversion", price: 0 },
    { id: "3", name: "Replacement Tub", price: 0 },
    { id: "4", name: "Replacement Shower", price: 0 },
    { id: "5", name: "Bathroom Remodel", price: 0 }
  ],
  plumbing_colors: [
    { id: "1", name: "Chrome", price: 0 },
    { id: "2", name: "Brushed Nickel", price: 50 },
    { id: "3", name: "Oil Rubbed Bronze", price: 75 },
    { id: "4", name: "Flat Black", price: 100 },
    { id: "5", name: "Custom", price: 0 }
  ],
  plumbing_styles: [
    { id: "1", name: "Moen", price: 0 },
    { id: "2", name: "Chateau", price: 50 },
    { id: "3", name: "Moen Brushed", price: 25 },
    { id: "4", name: "Moen Glyde", price: 25 },
    { id: "5", name: "Moen Voss", price: 25 },
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
    { id: "2", name: "Gray", price: 25 },
    { id: "3", name: "Almond", price: 25 },
    { id: "4", name: "Biscuit", price: 25 },
    { id: "5", name: "Silver White", price: 50 },
    { id: "6", name: "Basket Weave", price: 75 },
    { id: "7", name: "Lightning", price: 75 },
    { id: "8", name: "Charmeuse", price: 75 },
    { id: "9", name: "Juparana Granite", price: 100 },
    { id: "10", name: "River Rock", price: 75 },
    { id: "11", name: "Brecchia", price: 75 },
    { id: "12", name: "Roman Stone", price: 75 },
    { id: "13", name: "Travertine", price: 75 },
    { id: "14", name: "Other", price: 0 }
  ],
  wall_patterns: [
    { id: "1", name: "Smooth", price: 0 },
    { id: "2", name: "Texture/Brushed", price: 100 },
    { id: "3", name: "3x6 Subway", price: 150 },
    { id: "4", name: "8x8", price: 120 },
    { id: "5", name: "12x12", price: 140 },
    { id: "6", name: "Other", price: 0 }
  ],
  wall_types: [
    { id: "1", name: "Reg Shower", price: 800 },
    { id: "2", name: "Reg Tub", price: 600 },
    { id: "3", name: "Bend Shower", price: 900 },
    { id: "4", name: "Bend Tub", price: 700 }
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
  ],
  tile_materials: [
    { id: "1", name: "KERDI ROLL", price: 0 },
    { id: "2", name: "KERDI SHOWER KIT", price: 0 },
    { id: "3", name: "DRAIN GRATE", price: 0 },
    { id: "4", name: "NICHE", price: 0 },
    { id: "5", name: "PAN SHELF", price: 0 },
    { id: "6", name: "SHOWER WALL TILE", price: 0 },
    { id: "7", name: "SHOWER FLOOR TILE / BACK OF NICHE", price: 0 },
    { id: "8", name: "SHOWER PAN", price: 0 },
    { id: "9", name: "SCHLUTER JOLLY", price: 0 },
    { id: "10", name: "SHOWER SILL", price: 0 },
    { id: "11", name: "KERDI BAND", price: 0 },
    { id: "12", name: "LEVELING KIT", price: 0 },
    { id: "13", name: "MOLD MOISTURE DRYWALL", price: 0 },
    { id: "14", name: "DITRA HEAT WIRE / OUTLET", price: 0 },
    { id: "15", name: "DITRA HEAT WIRE", price: 0 },
    { id: "16", name: "DITRA HEAT STAT", price: 0 },
    { id: "17", name: "CORK", price: 0 },
    { id: "18", name: "GROUT", price: 0 },
    { id: "19", name: "COLOR MATCH SILICONE", price: 0 },
    { id: "20", name: "TRIM", price: 0 },
    { id: "21", name: "SHELF", price: 0 },
    { id: "22", name: "DELIVERY SHIPPING", price: 0 }
  ],
  plumbing_materials: [
    { id: "1", name: "CARTRIDGE VALVE", price: 0 },
    { id: "2", name: "TRANSITIONS", price: 0 },
    { id: "3", name: "DROP EAR EL", price: 0 },
    { id: "4", name: "STAPLES PLUG", price: 0 },
    { id: "5", name: "EXTENDERS", price: 0 },
    { id: "6", name: "PIPE / FITTINGS / SOLDER / PRIMER / GLUE PLUMBING", price: 0 },
    { id: "7", name: "SHOWER TRIM KIT", price: 0 },
    { id: "8", name: "HANDHELD SHOWER", price: 0 },
    { id: "9", name: "GRAB BAR", price: 0 },
    { id: "10", name: "BN TUB DRAIN / OVERFLOW TRIM", price: 0 },
    { id: "11", name: "SHOWER DRAIN", price: 0 },
    { id: "12", name: "DROP EL - AZISBN", price: 0 },
    { id: "13", name: "VANITY FAUCET", price: 0 },
    { id: "14", name: "TUB SPOUT", price: 0 },
    { id: "15", name: "VANITY P-TRAP", price: 0 },
    { id: "16", name: "VANITY EXTENSION DRAIN", price: 0 },
    { id: "17", name: "WAX RING", price: 0 },
    { id: "18", name: "TOILET / TOILET SUPPLY LINE", price: 0 },
    { id: "19", name: "VANITY / TOILET SHUT-OFF VALVES", price: 0 },
    { id: "20", name: "TENSION CURTAIN ROD", price: 0 }
  ],
  shelf_types: [
    { id: "1", name: "Single Shelf", price: 0 },
    { id: "2", name: "Double Shelf", price: 0 },
    { id: "3", name: "None", price: 0 }
  ],
  seat_types: [
    { id: "1", name: "Hexagon", price: 0 },
    { id: "2", name: "Bench", price: 0 },
    { id: "3", name: "LH (Left Hand)", price: 0 },
    { id: "4", name: "RH (Right Hand)", price: 0 },
    { id: "5", name: "Folding", price: 0 },
    { id: "6", name: "None", price: 0 }
  ],
  grab_bar_sizes: [
    { id: "1", name: "16\"", price: 0 },
    { id: "2", name: "24\"", price: 0 },
    { id: "3", name: "None", price: 0 }
  ],
  enclosure_types: [
    { id: "1", name: "Curtain Rod - Bowed", price: 0 },
    { id: "2", name: "Curtain Rod - Straight", price: 0 },
    { id: "3", name: "Shower Door", price: 0 }
  ],
  window_kits: [
    { id: "1", name: "Yes", price: 0 },
    { id: "2", name: "No", price: 0 }
  ],
  shower_door_styles: [
    { id: "1", name: "Bypass Slider", price: 0 },
    { id: "2", name: "Panel Pivot", price: 0 },
    { id: "3", name: "Pivot", price: 0 },
    { id: "4", name: "Other", price: 0 }
  ],
  shower_door_thickness: [
    { id: "1", name: "1/4\"", price: 0 },
    { id: "2", name: "3/8\"", price: 0 },
    { id: "3", name: "Other", price: 0 }
  ],
  shower_door_glass_types: [
    { id: "1", name: "Clear", price: 0 },
    { id: "2", name: "Rain", price: 0 },
    { id: "3", name: "Other", price: 0 }
  ],
  splash_options: [
    { id: "1", name: "Back Splash", price: 0 },
    { id: "2", name: "Left Splash", price: 0 },
    { id: "3", name: "Right Splash", price: 0 }
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
  'window-style': 'window_styles',
  'shelves-type': 'shelf_types',
  'seat-type': 'seat_types',
  'grab-bars-size': 'grab_bar_sizes',
  'grab-bars-size-2': 'grab_bar_sizes',
  'enclosure-type': 'enclosure_types',
  'window-kit': 'window_kits',
  'shower-door-style': 'shower_door_styles',
  'shower-door-thickness': 'shower_door_thickness',
  'shower-door-glass-type': 'shower_door_glass_types'
};

// Checkbox category mappings for dynamic admin controls
const CHECKBOX_MAPPINGS = {
  'tile-materials': 'tile_materials',
  'plumbing-materials': 'plumbing_materials',
  'splash-options': 'splash_options'
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
          ${['Vanity', 'Vanity Top', 'Toilet', 'Drywall', 'Ceiling', 'Fan', 'Vanity Light', 'Ceiling Lights', 'Tub', 'Shower', 'Floor', 'Door Casing', 'Window Casing', 'Baseboard', 'Bill & List'].map(item => `
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
          <label>Fixture Type:</label>
          <select id="fixture-type" class="select-input">
            <option value="">-- Select --</option>
            <option value="tub">Tub</option>
            <option value="shower">Shower</option>
            <option value="tub-shower">Tub/Shower Combo</option>
            <option value="lavatory-faucet">Lavatory Faucet</option>
          </select>
        </div>
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
        <div class="form-group">
          <label>Device Color:</label>
          <select id="electrical-color" class="select-input">
          </select>
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

    <!-- Section 5: Options -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">⚙️ Options</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label>Shower Head:</label>
            <select id="shower-head" class="select-input">
              <option value="">-- Select --</option>
              <option value="standard">Standard</option>
              <option value="handheld">Handheld</option>
            </select>
          </div>
          <div class="form-group">
            <label>Trim Color:</label>
            <select id="trim-color" class="select-input">
              <option value="">-- Select --</option>
              <option value="chrome">Chrome</option>
              <option value="brushed-nickel">Brushed Nickel</option>
              <option value="oil-rubbed-bronze">Oil Rubbed Bronze</option>
              <option value="black">Black</option>
            </select>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 16px;">
          <div class="form-group">
            <label>Shelves:</label>
            <select id="shelves-type" class="select-input">
              <option value="">-- Select --</option>
              <option value="single">Single Shelf</option>
              <option value="double">Double Shelf</option>
              <option value="none">None</option>
            </select>
          </div>
          <div class="form-group">
            <label>Number of Shelves:</label>
            <input type="number" id="shelves-qty" min="0" max="10" class="select-input" placeholder="How many?">
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 16px;">
          <div class="form-group">
            <label>Seat:</label>
            <select id="seat-type" class="select-input">
              <option value="">-- Select --</option>
              <option value="hexagon">Hexagon</option>
              <option value="bench">Bench</option>
              <option value="lh">LH (Left Hand)</option>
              <option value="rh">RH (Right Hand)</option>
              <option value="folding">Folding</option>
              <option value="none">None</option>
            </select>
          </div>
          <div class="form-group">
            <label>Grab Bars Size:</label>
            <select id="grab-bars-size" class="select-input">
              <option value="">-- Select --</option>
              <option value="16">16"</option>
              <option value="24">24"</option>
              <option value="none">None</option>
            </select>
          </div>
          <div class="form-group">
            <label>Grab Bars Size (2):</label>
            <select id="grab-bars-size-2" class="select-input">
              <option value="">-- Select --</option>
              <option value="16">16"</option>
              <option value="24">24"</option>
              <option value="none">None</option>
            </select>
          </div>
          <div class="form-group">
            <label>Number of Grab Bars:</label>
            <input type="number" id="grab-bars-qty" min="0" max="10" class="select-input" placeholder="How many?">
          </div>
        </div>


        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 16px;">
          <div class="form-group">
            <label>Enclosure:</label>
            <select id="enclosure-type" class="select-input">
              <option value="">-- Select --</option>
              <option value="curtain-bowed">Curtain Rod - Bowed</option>
              <option value="curtain-straight">Curtain Rod - Straight</option>
              <option value="shower-door">Shower Door</option>
            </select>
          </div>
          <div class="form-group">
            <label>Window Kit:</label>
            <select id="window-kit" class="select-input">
              <option value="">-- Select --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        
        <h3 style="margin: 20px 0 12px; font-size: 1.1rem; color: #374151; border-top: 1px solid #e5e7eb; padding-top: 16px;">Shower Door</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label>Style:</label>
            <select id="shower-door-style" class="select-input">
              <option value="">-- Select --</option>
              <option value="bypass-slider">Bypass Slider</option>
              <option value="panel-pivot">Panel Pivot</option>
              <option value="pivot">Pivot</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Glass Type:</label>
            <select id="shower-door-glass-type" class="select-input">
              <option value="">-- Select --</option>
              <option value="clear">Clear</option>
              <option value="rain">Rain</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Glass Thickness:</label>
            <select id="shower-door-thickness" class="select-input">
              <option value="">-- Select --</option>
              <option value="1/4">1/4"</option>
              <option value="3/8">3/8"</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div class="form-group" style="margin-top: 16px;">
          <label>Options Notes:</label>
          <textarea id="options-notes" rows="2" class="select-input" placeholder="Any special requirements for shower options..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 6: Cabinetry -->
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
        
        <h3 style="margin: 20px 0 12px; font-size: 1.1rem; color: #374151; border-top: 1px solid #e5e7eb; padding-top: 16px;">Vanity Top</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <div class="form-group">
            <label>Bowl Style:</label>
            <select id="vanity-top-bowl" class="select-input">
              <option value="">-- Select --</option>
              <option value="oval">Oval Bowl</option>
              <option value="square">Square Bowl</option>
            </select>
          </div>
          <div class="form-group">
            <label>Faucet Drill:</label>
            <select id="vanity-top-drill" class="select-input">
              <option value="">-- Select --</option>
              <option value="single">Single Hole</option>
              <option value="4inch">4" Drill</option>
              <option value="8inch">8" Drill</option>
            </select>
          </div>
          <div class="form-group">
            <label>Faucet Count:</label>
            <select id="vanity-top-faucets" class="select-input">
              <option value="">-- Select --</option>
              <option value="single">Single Faucet</option>
              <option value="double">2 Faucets</option>
            </select>
          </div>
        </div>
        <div class="form-group" style="margin-top: 12px;">
          <label>Splash Options:</label>
          <div id="splash-options" style="display: flex; gap: 16px; flex-wrap: wrap; margin-top: 8px;">
            ${products.splash_options.map(item => `
              <label style="display: flex; align-items: center; gap: 6px; font-weight: normal;">
                <input type="checkbox" class="splash-option" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px;">
                <span>${item.name}</span>
                <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
              </label>
            `).join('')}
          </div>
        </div>
        
        <div class="form-group" style="margin-top: 16px;">
          <label>Cabinetry Notes:</label>
          <textarea id="cabinetry-notes" rows="2" class="select-input" placeholder="Any special requirements for vanity or cabinetry..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 8: Accessories -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🧴 Accessories</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label>Towel Bar:</label>
            <input type="number" id="towel-bar-qty" min="0" class="select-input" placeholder="How many?">
          </div>
          <div class="form-group">
            <label>Towel Ring:</label>
            <input type="number" id="towel-ring-qty" min="0" class="select-input" placeholder="How many?">
          </div>
          <div class="form-group">
            <label>T.P. Holder:</label>
            <input type="number" id="tp-holder-qty" min="0" class="select-input" placeholder="How many?">
          </div>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Accessories Finish:</label>
          <select id="accessories-finish" class="select-input">
            <option value="">-- Same as Plumbing Fixtures --</option>
            <option value="chrome">Chrome</option>
            <option value="brushed-nickel">Brushed Nickel</option>
            <option value="oil-rubbed-bronze">Oil Rubbed Bronze</option>
            <option value="black">Black</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Accessories Notes:</label>
          <textarea id="accessories-notes" rows="2" class="select-input" placeholder="Any special requirements for accessories..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 9: Drywall & Paint -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🎨 Drywall & Paint</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label>Drywall Linear Footage:</label>
            <input type="number" id="drywall-linear-ft" min="0" class="select-input" placeholder="Linear feet">
          </div>
          <div class="form-group">
            <label>Drywall Sheets:</label>
            <input type="number" id="drywall-sheets" min="0" class="select-input" placeholder="How many sheets?">
          </div>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label style="font-weight: 600; margin-bottom: 12px; display: block;">Paint Work:</label>
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <label style="display: flex; align-items: center; gap: 6px; font-weight: normal; padding: 8px; background: #f9fafb; border-radius: 6px;">
              <input type="checkbox" id="paint-walls" style="width: 18px; height: 18px;"> 2 Coats Walls
            </label>
            <label style="display: flex; align-items: center; gap: 6px; font-weight: normal; padding: 8px; background: #f9fafb; border-radius: 6px;">
              <input type="checkbox" id="paint-trim" style="width: 18px; height: 18px;"> Trim Paint
            </label>
            <label style="display: flex; align-items: center; gap: 6px; font-weight: normal; padding: 8px; background: #f9fafb; border-radius: 6px;">
              <input type="checkbox" id="paint-ceiling" style="width: 18px; height: 18px;"> Ceiling
            </label>
            <label style="display: flex; align-items: center; gap: 6px; font-weight: normal; padding: 8px; background: #f9fafb; border-radius: 6px;">
              <input type="checkbox" id="point-up-drywall" style="width: 18px; height: 18px;"> Point Up Drywall
            </label>
          </div>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Drywall & Paint Notes:</label>
          <textarea id="drywall-notes" rows="2" class="select-input" placeholder="Any special requirements for drywall or paint..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 10: Trim -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #c471f5 0%, #fa71cd 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🪵 Trim</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label>Casing (Linear Ft):</label>
            <input type="number" id="trim-casing-ft" min="0" class="select-input" placeholder="Linear feet">
          </div>
          <div class="form-group">
            <label>Baseboard (Linear Ft):</label>
            <input type="number" id="trim-baseboard-ft" min="0" class="select-input" placeholder="Linear feet">
          </div>
          <div class="form-group">
            <label>Qtr Round (Linear Ft):</label>
            <input type="number" id="trim-qtr-round-ft" min="0" class="select-input" placeholder="Linear feet">
          </div>
          <div class="form-group">
            <label>Doors (Qty):</label>
            <input type="number" id="trim-doors-qty" min="0" class="select-input" placeholder="How many?">
          </div>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Trim Notes:</label>
          <textarea id="trim-notes" rows="2" class="select-input" placeholder="Any special requirements for trim..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 11: Flooring -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🔨 Flooring</h2>
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
        <div class="form-group" style="margin-top: 16px;">
          <label>Flooring Notes:</label>
          <textarea id="flooring-notes" rows="2" class="select-input" placeholder="Any special flooring requirements..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 12: Tile -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🔧 Tile</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <label style="font-weight: 600; margin-bottom: 12px; display: block;">Select materials and quantities:</label>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 8px;">
          ${products.tile_materials.map(item => `
            <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
              <input type="checkbox" class="tile-item" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px; flex-shrink: 0;">
              <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
                <span style="font-size: 14px;">${item.name}</span>
                <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
              </div>
              <input type="number" class="tile-qty" data-item="${item.id}" min="0" placeholder="Qty" style="width: 60px; padding: 4px 6px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px;">
            </label>
          `).join('')}
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Tile Notes:</label>
          <textarea id="tile-notes" rows="2" class="select-input" placeholder="Any special requirements for tile work or materials..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 13: Plumbing -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🔧 Plumbing</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <label style="font-weight: 600; margin-bottom: 12px; display: block;">Select materials and quantities:</label>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 8px;">
          ${products.plumbing_materials.map(item => `
            <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
              <input type="checkbox" class="plumbing-item" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px; flex-shrink: 0;">
              <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
                <span style="font-size: 14px;">${item.name}</span>
                <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
              </div>
              <input type="number" class="plumbing-qty" data-item="${item.id}" min="0" placeholder="Qty" style="width: 60px; padding: 4px 6px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px;">
            </label>
          `).join('')}
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Plumbing Notes:</label>
          <textarea id="plumbing-notes" rows="2" class="select-input" placeholder="Any special requirements for plumbing materials..."></textarea>
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
    'baseboard-style', 'window-style',
    'grab-bars-size', 'grab-bars-qty',
    'grab-bars-size-2', 'shower-door-style', 'shower-door-thickness', 'shower-door-glass-type'
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
  // selections.scope_of_work = getSelectedItem('scope_of_work-select', products.scope_of_work);
  const scopeItems = Array.from(document.querySelectorAll('.scope-item:checked')).map(cb => cb.value);
  selections.scope_of_work = scopeItems.join(', ');
  selections.demo_items = Array.from(document.querySelectorAll('.demo-item:checked')).map(cb => cb.value);

  // Define all labels for display and selection update
  const fieldMapping = {
    'plumbing-color': { key: 'plumbing_color', label: 'Plumbing Color' },
    'plumbing-style': { key: 'plumbing_style', label: 'Plumbing Style' },
    'electrical-color': { key: 'electrical_color', label: 'Electrical Color' },
    'exhaust-fan': { key: 'exhaust_fan', label: 'Exhaust Fan' },
    'shower-color': { key: 'shower_color', label: 'Shower Color' },
    'shower-size': { key: 'shower_size', label: 'Shower Size' },
    'shower-drain': { key: 'shower_drain', label: 'Shower Drain Location' },
    'tub-depth': { key: 'tub_depth', label: 'Tub Depth' },
    'tub-length': { key: 'tub_length', label: 'Tub Length' },
    'wall-color': { key: 'wall_color', label: 'Wall Color' },
    'wall-pattern': { key: 'wall_pattern', label: 'Wall Pattern' },
    'wall-type': { key: 'wall_type', label: 'Wall Type' },
    'vanity-length': { key: 'vanity_length', label: 'Vanity Length' },
    'flooring-type': { key: 'flooring_type', label: 'Flooring Type' },
    'baseboard-style': { key: 'baseboard_style', label: 'Baseboard Style' },
    'window-style': { key: 'window_style', label: 'Window Style' },
    'grab-bars-size': { key: 'grab_bars_size', label: 'Grab Bars Size' },
    'grab-bars-size-2': { key: 'grab_bars_size_2', label: 'Grab Bars Size (2)' },
    'shower-door-style': { key: 'shower_door_style', label: 'Shower Door Style' },
    'shower-door-thickness': { key: 'shower_door_thickness', label: 'Shower Door Thickness' },
    'shower-door-glass-type': { key: 'shower_door_glass_type', label: 'Shower Door Glass Type' },
  };

  // Build summary
  let html = '';
  let total = 0;

  // Add Scope of Work first if selected
  if (selections.scope_of_work) {
    html += `<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;">
      <strong>Scope of Work:</strong> ${selections.scope_of_work}
    </div>`;
  }

  // Add demolition items
  if (selections.demo_items && selections.demo_items.length > 0) {
    html += `<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;">
      <strong>Demolition Items:</strong> ${selections.demo_items.join(', ')}
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
    body += `SCOPE: ${selections.scope_of_work}\n`;
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
  const ADMIN_PASSWORD = 'admin123';
  let isAdminVisible = false;

  document.getElementById('admin-btn')?.addEventListener('click', () => {
    if (!isAdminVisible) {
      const password = prompt('Enter admin password:');
      if (password && password === ADMIN_PASSWORD) {
        // Activate inline admin mode
        document.body.classList.add('admin-mode'); // THIS IS THE KEY LINE!
        injectAdminControlsToAllDropdowns();
        isAdminVisible = true;
        document.getElementById('admin-btn').textContent = '🔓 Exit Admin';
        document.getElementById('admin-btn').style.background = '#10b981';
      } else if (password) {
        alert('Incorrect password');
      }
    } else {
      // Deactivate inline admin mode
      document.body.classList.remove('admin-mode'); // Remove admin-mode class
      document.querySelectorAll('.dynamic-admin-controls').forEach(el => el.remove());
      isAdminVisible = false;
      document.getElementById('admin-btn').textContent = '🔐 Admin';
      document.getElementById('admin-btn').style.background = '#3b82f6';
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

function showAdminPanel() {
  // Create admin overlay if it doesn't exist
  let overlay = document.getElementById('admin-overlay');
  if (!overlay) {
    overlay = createAdminOverlay();
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling
  renderAdminCategories();
}

function hideAdminPanel() {
  const overlay = document.getElementById('admin-overlay');
  if (overlay) {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}

function createAdminOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'admin-overlay';
  overlay.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    overflow-y: auto;
    padding: 20px;
  `;

  overlay.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto; background: white; border-radius: 16px; padding: 24px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #e5e7eb;">
        <h1 style="margin: 0; font-size: 1.8rem; color: #111827;">🔧 Admin Panel</h1>
        <button id="admin-close-btn" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px;">✕ Close</button>
      </div>
      <div id="admin-categories-container"></div>
    </div>
  `;

  // Close button handler
  overlay.querySelector('#admin-close-btn').addEventListener('click', () => {
    hideAdminPanel();
  });

  // Close on overlay click (outside the panel)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      hideAdminPanel();
    }
  });

  return overlay;
}

function renderAdminCategories() {
  const container = document.getElementById('admin-categories-container');
  if (!container) return;

  const CATEGORIES = [
    { id: 'scope_of_work', name: 'Scope of Work', description: 'Controls: Scope of Work checkboxes' },
    { id: 'plumbing_colors', name: 'Plumbing Colors', description: 'Controls: TRIM COLOR dropdown' },
    { id: 'plumbing_styles', name: 'Plumbing Styles', description: 'Controls: TRIM STYLE dropdown' },
    { id: 'electrical_colors', name: 'Electrical Colors', description: 'Controls: Electrical color options' },
    { id: 'exhaust_fans', name: 'Exhaust Fans', description: 'Controls: EXHAUST FAN dropdown' },
    { id: 'shower_colors', name: 'Shower Colors', description: 'Controls: Shower COLOR dropdown' },
    { id: 'shower_sizes', name: 'Shower Sizes', description: 'Controls: Shower SIZE dropdown' },
    { id: 'drain_locations', name: 'Drain Locations', description: 'Controls: DRAIN LOCATION dropdown' },
    { id: 'tub_depths', name: 'Tub Depths', description: 'Controls: Bathtub DEPTH dropdown' },
    { id: 'tub_lengths', name: 'Tub Lengths', description: 'Controls: Bathtub LENGTH dropdown' },
    { id: 'wall_colors', name: 'Wall Colors', description: 'Controls: Walls COLOR dropdown' },
    { id: 'wall_patterns', name: 'Wall Patterns', description: 'Controls: Walls PATTERN dropdown' },
    { id: 'wall_types', name: 'Wall Types', description: 'Controls: Walls WALL TYPE dropdown' },
    { id: 'vanity_lengths', name: 'Vanity Lengths', description: 'Controls: Vanity LENGTH dropdown' },
    { id: 'flooring_types', name: 'Flooring Types', description: 'Controls: Flooring TYPE dropdown' },
    { id: 'baseboard_styles', name: 'Baseboard Styles', description: 'Controls: BASEBOARD STYLE dropdown' },
    { id: 'window_styles', name: 'Window Styles', description: 'Controls: WINDOW STYLE dropdown' },
    { id: 'tile_materials', name: 'Tile Materials', description: 'Controls: Tile section checkboxes (22 items)' },
    { id: 'plumbing_materials', name: 'Plumbing Materials', description: 'Controls: Plumbing section checkboxes (20 items)' },
    { id: 'splash_options', name: 'Splash Options', description: 'Controls: Splash checkboxes (Cabinetry)' },
    { id: 'shower_door_styles', name: 'Shower Door Styles', description: 'Controls: Shower Door STYLE dropdown' },
    { id: 'shower_door_thickness', name: 'Shower Door Thickness', description: 'Controls: Shower Door THICKNESS dropdown' },
    { id: 'shower_door_glass_types', name: 'Shower Door Glass Types', description: 'Controls: Shower Door GLASS TYPE dropdown' }
  ];

  container.innerHTML = CATEGORIES.map(cat => renderCategory(cat)).join('');

  // Attach event listeners for all categories
  CATEGORIES.forEach(cat => {
    setupCategoryHandlers(cat.id);
  });
}

function renderCategory(cat) {
  const items = products[cat.id] || [];
  const itemsHTML = items.length === 0
    ? '<p style="color: #6b7280; font-size: 14px;">No items in this category.</p>'
    : items.map(item => `
        <div class="admin-item-row" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f9fafb; border-radius: 6px; margin-bottom: 8px;">
          <div style="flex: 1;">
            <strong>${item.name}</strong>
            <span style="color: #6b7280; margin-left: 8px;">$${parseFloat(item.price).toFixed(2)}</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="admin-edit-btn" data-category="${cat.id}" data-id="${item.id}" style="background: #3b82f6; color: white; padding: 6px 16px; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">EDIT</button>
            <button class="admin-delete-btn" data-category="${cat.id}" data-id="${item.id}" style="background: #ef4444; color: white; padding: 6px 16px; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Delete</button>
          </div>
        </div>
      `).join('');

  return `
    <div style="margin-bottom: 32px; padding: 20px; background: #f9fafb; border-radius: 12px;">
      <h2 style="margin: 0 0 4px; font-size: 1.3rem; color: #111827;">${cat.name}</h2>
      <p style="margin: 0 0 16px; font-size: 13px; color: #6b7280; font-style: italic;">${cat.description || ''}</p>
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        <input type="text" id="add-name-${cat.id}" placeholder="Item Name" style="flex: 1; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px;">
        <input type="number" id="add-price-${cat.id}" placeholder="Price" step="0.01" style="width: 120px; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px;">
        <button class="admin-add-btn" data-category="${cat.id}" style="background: #10b981; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600;">ADD</button>
      </div>
      <div id="list-${cat.id}">
        ${itemsHTML}
      </div>
    </div>
  `;
}

function setupCategoryHandlers(categoryId) {
  // Add button handler
  const addBtn = document.querySelector(`.admin-add-btn[data-category="${categoryId}"]`);
  if (addBtn) {
    addBtn.addEventListener('click', async () => {
      const nameInput = document.getElementById(`add-name-${categoryId}`);
      const priceInput = document.getElementById(`add-price-${categoryId}`);
      const name = nameInput.value.trim();
      const price = parseFloat(priceInput.value);

      if (!name || isNaN(price)) {
        alert('Please enter a valid name and price.');
        return;
      }

      try {
        await addItem(categoryId, name, price);
        nameInput.value = '';
        priceInput.value = '';
        renderAdminCategories();
        populateDropdowns(); // Update dropdowns in main form
      } catch (err) {
        console.error(err);
        alert('Error adding item. Check console for details.');
      }
    });
  }

  // Edit button handlers
  document.querySelectorAll(`.admin-edit-btn[data-category="${categoryId}"]`).forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const itemId = e.target.dataset.id;
      const item = products[categoryId]?.find(p => p.id === itemId);
      if (!item) return;

      const newName = prompt('Enter new name:', item.name);
      if (!newName) return;

      const newPrice = prompt('Enter new price:', item.price);
      if (newPrice === null) return;

      const price = parseFloat(newPrice);
      if (isNaN(price)) {
        alert('Invalid price');
        return;
      }

      try {
        await deleteItem(categoryId, itemId);
        await addItem(categoryId, newName, price);
        renderAdminCategories();
        populateDropdowns();
      } catch (err) {
        console.error(err);
        alert('Error updating item.');
      }
    });
  });

  // Delete button handlers
  document.querySelectorAll(`.admin-delete-btn[data-category="${categoryId}"]`).forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const itemId = e.target.dataset.id;
      const item = products[categoryId]?.find(p => p.id === itemId);

      if (!confirm(`Delete "${item?.name}"?`)) return;

      try {
        await deleteItem(categoryId, itemId);
        renderAdminCategories();
        populateDropdowns();
        updateSummary();
      } catch (err) {
        console.error(err);
        alert('Error deleting item.');
      }
    });
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

  // Also inject checkbox controls
  injectAdminControlsToCheckboxes();
}

function injectAdminControlsToCheckboxes() {
  console.log('Injecting admin controls to checkboxes...');

  // 1. Tile Materials
  const tileSection = document.getElementById('tile-notes')?.closest('.section-content');
  if (tileSection) {
    const container = tileSection.querySelector('div[style*="grid-template-columns"]');
    if (container && !container.nextElementSibling?.classList.contains('dynamic-admin-controls')) {
      const controlsDiv = createCheckboxAdminControls('tile_materials');
      container.parentNode.insertBefore(controlsDiv, container.nextElementSibling);
      setupDynamicAdminControlsForCheckboxes('tile_materials', controlsDiv);
    }
  }

  // 2. Plumbing Materials
  const plumbingSection = document.getElementById('plumbing-notes')?.closest('.section-content');
  if (plumbingSection) {
    const container = plumbingSection.querySelector('div[style*="grid-template-columns"]');
    if (container && !container.nextElementSibling?.classList.contains('dynamic-admin-controls')) {
      const controlsDiv = createCheckboxAdminControls('plumbing_materials');
      container.parentNode.insertBefore(controlsDiv, container.nextElementSibling);
      setupDynamicAdminControlsForCheckboxes('plumbing_materials', controlsDiv);
    }
  }

  // 3. Splash Options (Cabinetry)
  const splashContainer = document.getElementById('splash-options');
  if (splashContainer && !splashContainer.nextElementSibling?.classList.contains('dynamic-admin-controls')) {
    const controlsDiv = createCheckboxAdminControls('splash_options');
    splashContainer.parentNode.insertBefore(controlsDiv, splashContainer.nextElementSibling);
    setupDynamicAdminControlsForCheckboxes('splash_options', controlsDiv);
  }
}

function createCheckboxAdminControls(category) {
  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'dynamic-admin-controls admin-control';
  controlsDiv.style.cssText = 'margin-top: 12px; padding: 12px; background: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;';

  controlsDiv.innerHTML = `
    <div style="font-size: 13px; font-weight: 600; color: #1e40af; margin-bottom: 8px;">Edit Selected Item:</div>
    <input type="text" placeholder="Item name" class="admin-name-input" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
    <input type="number" placeholder="Price" step="0.01" class="admin-price-input" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
    <div style="display: flex; gap: 8px;">
      <button class="btn btn-primary admin-add-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">➕ Add</button>
      <button class="btn btn-secondary admin-edit-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">✏️ Edit</button>
      <button class="btn btn-secondary admin-delete-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">🗑️ Delete</button>
      <button class="btn btn-secondary admin-cancel-btn" style="display: none; flex: 1; padding: 6px 12px; font-size: 12px; background: #6b7280;">❌ Cancel</button>
    </div>
    <div style="font-size: 11px; color: #6b7280; margin-top: 6px; font-style: italic;">* Select a checkbox above to populate fields</div>
  `;

  return controlsDiv;
}

function setupDynamicAdminControlsForCheckboxes(category, controlsDiv) {
  const nameInput = controlsDiv.querySelector('.admin-name-input');
  const priceInput = controlsDiv.querySelector('.admin-price-input');
  const addBtn = controlsDiv.querySelector('.admin-add-btn');
  const editBtn = controlsDiv.querySelector('.admin-edit-btn');
  const deleteBtn = controlsDiv.querySelector('.admin-delete-btn');
  const cancelBtn = controlsDiv.querySelector('.admin-cancel-btn');

  // Find the container of checkboxes
  let checkboxContainer;
  if (category === 'splash_options') {
    checkboxContainer = document.getElementById('splash-options');
  } else if (category === 'tile_materials') {
    checkboxContainer = document.getElementById('tile-notes').closest('.section-content').querySelector('div[style*="grid-template-columns"]');
  } else if (category === 'plumbing_materials') {
    checkboxContainer = document.getElementById('plumbing-notes').closest('.section-content').querySelector('div[style*="grid-template-columns"]');
  }

  // Add click listener to checkboxes to populate form
  if (checkboxContainer) {
    checkboxContainer.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox' && document.body.classList.contains('admin-mode')) {
        // Uncheck others to focus on one edit at a time (visual only for admin convenience)
        // checkboxContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        //   if (cb !== e.target) cb.checked = false;
        // });

        const itemId = e.target.value;
        const item = products[category]?.find(p => String(p.id) === String(itemId));

        if (item) {
          nameInput.value = item.name;
          priceInput.value = item.price;

          addBtn.textContent = '✅ Update';
          addBtn.dataset.editingId = itemId;
          cancelBtn.style.display = 'block';

          // Highlight the selected item row
          // e.target.closest('label').style.background = '#dbeafe';
        }
      }
    });
  }

  // Reuse the logic from setupDynamicAdminControls - but adapted for this context

  // Add/Update Button
  addBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value) || 0;

    if (!name) {
      alert('Please enter an item name');
      return;
    }

    if (addBtn.dataset.editingId) {
      // Update
      await editItem(category, addBtn.dataset.editingId, name, price);
      // Reset UI
      addBtn.textContent = '➕ Add';
      delete addBtn.dataset.editingId;
      cancelBtn.style.display = 'none';
      alert(`Updated "${name}"`);
    } else {
      // Add
      await addItem(category, name, price);
      alert(`Added "${name}"`);
    }

    nameInput.value = '';
    priceInput.value = '';

    // Refresh UI
    if (category === 'splash_options') {
      // Re-render splash options
      const container = document.getElementById('splash-options');
      container.innerHTML = products.splash_options.map(item => `
        <label style="display: flex; align-items: center; gap: 6px; font-weight: normal;">
          <input type="checkbox" class="splash-option" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px;">
          <span>${item.name}</span>
          <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
        </label>
      `).join('');
    } else {
      // Re-render the app to update checkbox lists
      // Ideally we'd just re-render the section, but re-init is safer to ensure consistency
      // But re-init closes admin... let's try to just re-render the specific section HTML

      if (category === 'tile_materials') {
        checkboxContainer.innerHTML = products.tile_materials.map(item => `
          <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
            <input type="checkbox" class="tile-item" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px; flex-shrink: 0;">
            <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 14px;">${item.name}</span>
              <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
            </div>
            <input type="number" class="tile-qty" data-item="${item.id}" min="0" placeholder="Qty" style="width: 60px; padding: 4px 6px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px;">
          </label>
        `).join('');
      } else if (category === 'plumbing_materials') {
        checkboxContainer.innerHTML = products.plumbing_materials.map(item => `
          <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
            <input type="checkbox" class="plumbing-item" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px; flex-shrink: 0;">
            <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 14px;">${item.name}</span>
              <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
            </div>
            <input type="number" class="plumbing-qty" data-item="${item.id}" min="0" placeholder="Qty" style="width: 60px; padding: 4px 6px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px;">
          </label>
        `).join('');
      }
    }

    // Re-attach listeners just in case
    setupListeners();
  });

  // Edit Button (manual triggering)
  editBtn.addEventListener('click', () => {
    // If user manually clicks edit without selecting a checkbox, prompt them
    if (!addBtn.dataset.editingId) {
      alert('Please select a checkbox item above to edit it.');
    }
  });

  // Delete Button
  deleteBtn.addEventListener('click', async () => {
    if (!addBtn.dataset.editingId) {
      alert('Please select a checkbox item above to delete it.');
      return;
    }

    const itemId = addBtn.dataset.editingId;
    const item = products[category]?.find(p => String(p.id) === String(itemId));

    if (confirm(`Delete "${item?.name}"?`)) {
      await deleteItem(category, itemId);

      // Clear form
      nameInput.value = '';
      priceInput.value = '';
      addBtn.textContent = '➕ Add';
      delete addBtn.dataset.editingId;
      cancelBtn.style.display = 'none';

      // Refresh UI (COPY PASTE from above - could be refactored)
      if (category === 'splash_options') {
        const container = document.getElementById('splash-options');
        container.innerHTML = products.splash_options.map(item => `
          <label style="display: flex; align-items: center; gap: 6px; font-weight: normal;">
            <input type="checkbox" class="splash-option" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px;">
            <span>${item.name}</span>
            <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
          </label>
        `).join('');
      } else if (category === 'tile_materials') {
        checkboxContainer.innerHTML = products.tile_materials.map(item => `
          <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
            <input type="checkbox" class="tile-item" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px; flex-shrink: 0;">
            <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 14px;">${item.name}</span>
              <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
            </div>
            <input type="number" class="tile-qty" data-item="${item.id}" min="0" placeholder="Qty" style="width: 60px; padding: 4px 6px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px;">
          </label>
        `).join('');
      } else if (category === 'plumbing_materials') {
        checkboxContainer.innerHTML = products.plumbing_materials.map(item => `
          <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
            <input type="checkbox" class="plumbing-item" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px; flex-shrink: 0;">
            <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 14px;">${item.name}</span>
              <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
            </div>
            <input type="number" class="plumbing-qty" data-item="${item.id}" min="0" placeholder="Qty" style="width: 60px; padding: 4px 6px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px;">
          </label>
        `).join('');
      }

      setupListeners();
      alert(`Deleted "${item.name}"`);
    }
  });

  // Cancel Button
  cancelBtn.addEventListener('click', () => {
    nameInput.value = '';
    priceInput.value = '';
    addBtn.textContent = '➕ Add';
    delete addBtn.dataset.editingId;
    cancelBtn.style.display = 'none';
  });
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

