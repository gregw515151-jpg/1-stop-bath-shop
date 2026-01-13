// Comprehensive Contractor Quote System - Complete Implementation
// Based on handwritten specifications

export const DEFAULT_QUOTE_DATA = {
  scope_of_work: [
    { id: "1", name: "Demolition & Removal", price: 800 },
    { id: "2", name: "Plumbing Rough-In", price: 1200 },
    { id: "3", name: "Electrical Work", price: 1000 }
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

// Load/Save
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

// Admin
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

// Add/Delete
export async function addItem(category, name, price) {
  if (!products[category]) products[category] = [];
  const newId = String(products[category].length + 1);
  products[category].push({ id: newId, name, price: parseFloat(price) });
  saveProductsToStorage();
}

export async function deleteItem(category, id) {
  if (!products[category]) return;
  products[category] = products[category].filter(item => item.id !== id);
  saveProductsToStorage();
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
  const select = document.getElementById('scope_of_work-select');
  if (select && products.scope_of_work) {
    select.innerHTML = '<option value="">-- Select --</option>' +
      products.scope_of_work.map(item =>
        `<option value="${item.id}">${item.name} - $${item.price.toFixed(2)}</option>`
      ).join('');
  }
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
            <option value="">-- Select --</option>
            <option value="Chrome">Chrome</option>
            <option value="Brushed Nickel">Brushed Nickel (+$50)</option>
            <option value="Oil Rubbed Bronze">Oil Rubbed Bronze (+$75)</option>
            <option value="Flat Black">Flat Black (+$100)</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div class="form-group">
          <label>Plumbing Fixture Style:</label>
          <select id="plumbing-style" class="select-input">
            <option value="">-- Select --</option>
            <option value="Modern">Modern</option>
            <option value="Chateau">Chateau (+$50)</option>
            <option value="Modern Brushed">Modern Brushed (+$25)</option>
            <option value="Modern Glyde">Modern Glyde (+$25)</option>
            <option value="Modern Voss">Modern Voss (+$25)</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div class="form-group">
          <label>Electrical Device Color:</label>
          <select id="electrical-color" class="select-input">
            <option value="">-- Select --</option>
            <option value="White">White</option>
            <option value="Light Almond">Light Almond (+$5)</option>
            <option value="Ivory">Ivory (+$5)</option>
            <option value="Custom">Custom</option>
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
            <option value="">-- Select --</option>
            <option value="Fan Only">Fan Only ($100)</option>
            <option value="Fan + Light">Fan + Light ($150)</option>
            <option value="Fan + Light + Heater">Fan + Light + Heater ($250)</option>
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

    <!-- Section 4: Bathroom Products -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🛁 Bathroom Products</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
        <div>
          <h3 style="margin: 0 0 12px; font-size: 1.1rem; color: #374151;">Shower Pan</h3>
          <div class="form-group">
            <label>Color:</label>
            <select id="shower-color" class="select-input">
              <option value="">-- Select --</option>
              <option value="White">White</option>
              <option value="Almond">Almond (+$25)</option>
              <option value="Biscuit">Biscuit (+$25)</option>
              <option value="Gray">Gray (+$50)</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div class="form-group">
            <label>Size:</label>
            <select id="shower-size" class="select-input">
              <option value="">-- Select --</option>
              <option value="60x30">60x30 ($320)</option>
              <option value="54x30">54x30 ($340)</option>
              <option value="72x36">72x36 ($420)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Drain Location:</label>
            <select id="shower-drain" class="select-input">
              <option value="">-- Select --</option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
              <option value="Center">Center</option>
            </select>
          </div>

          <h3 style="margin: 20px 0 12px; font-size: 1.1rem; color: #374151;">Bathtub</h3>
          <div class="form-group">
            <label>Depth:</label>
            <select id="tub-depth" class="select-input">
              <option value="">-- Select --</option>
              <option value='12"'>12"</option>
              <option value='13"'>13" (+$20)</option>
              <option value='15"'>15" (+$40)</option>
              <option value='17"'>17" (+$60)</option>
              <option value='18"'>18" (+$80)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Length:</label>
            <select id="tub-length" class="select-input">
              <option value="">-- Select --</option>
              ${['48', '50', '52', '53', '54', '55', '56', '57', '58', '59', '60'].map((len, i) =>
    `<option value='${len}"'>${len}" ($${400 + i * 20})</option>`
  ).join('')}
            </select>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 12px; font-size: 1.1rem; color: #374151;">Walls</h3>
          <div class="form-group">
            <label>Color:</label>
            <select id="wall-color" class="select-input">
              <option value="">-- Select --</option>
              <option value="White">White</option>
              <option value="Almond">Almond (+$25)</option>
              <option value="Biscuit">Biscuit (+$25)</option>
              <option value="Afterwhite">Afterwhite (+$50)</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div class="form-group">
            <label>Pattern:</label>
            <select id="wall-pattern" class="select-input">
              <option value="">-- Select --</option>
              <option value="Smooth">Smooth</option>
              <option value="Texture">Texture/Brushed (+$100)</option>
              <option value="3x6 Subway">3x6 Subway (+$150)</option>
              <option value="8x8">8x8 (+$120)</option>
              <option value="12x12">12x12 (+$140)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Wall Type:</label>
            <select id="wall-type" class="select-input">
              <option value="">-- Select --</option>
              <option value="Reg Shower">Regular Shower ($800)</option>
              <option value="Reg Tub">Regular Tub ($600)</option>
              <option value="4 Bead Shower">4 Bead Shower ($900)</option>
              <option value="4 Bead Tub">4 Bead Tub ($700)</option>
            </select>
          </div>

          <h3 style="margin: 20px 0 12px; font-size: 1.1rem; color: #374151;">Vanity</h3>
          <div class="form-group">
            <label>Length:</label>
            <select id="vanity-length" class="select-input">
              <option value="">-- Select --</option>
              ${['18', '24', '36', '42', '48', '54', '60', '78'].map((len, i) =>
    `<option value='${len}"'>${len}" ($${300 + i * 100})</option>`
  ).join('')}
            </select>
          </div>
        </div>
        <div class="form-group" style="margin-top: 20px; grid-column: 1 / -1;">
          <label>Bathroom Products Notes:</label>
          <textarea id="bathroom-notes" rows="2" class="select-input" placeholder="Any special requirements for shower, tub, walls, or vanity..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 5: Flooring & Trim -->
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
              <option value="">-- Select --</option>
              <option value="LVP">LVP ($4/sqft)</option>
              <option value="Tile">Tile ($8/sqft)</option>
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
              <option value="">-- Select --</option>
              <option value="WM623">WM623 - 3¼" Colonial ($2.50/ft)</option>
              <option value="WM713">WM713 - 3½" Clamshell ($2.75/ft)</option>
              <option value="WM663">WM663 - 3¼" Ogee ($2.60/ft)</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div class="form-group">
            <label>Window/Door Trim:</label>
            <select id="window-style" class="select-input">
              <option value="">-- Select --</option>
              <option value="WM376">WM376 - 2⅛" Colonial ($2.00/ft)</option>
              <option value="WM366">WM366 - 2¼" Flat Edge ($2.10/ft)</option>
              <option value="WM445">WM445 - 3¼" Colonial ($2.50/ft)</option>
              <option value="Custom">Custom</option>
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

  // Build summary
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

  // Add other selections
  const fields = [
    { id: 'plumbing-color', label: 'Plumbing Color' },
    { id: 'plumbing-style', label: 'Plumbing Style' },
    { id: 'exhaust-fan', label: 'Exhaust Fan' },
    { id: 'shower-size', label: 'Shower Size' },
    { id: 'wall-type', label: 'Wall Type' },
    { id: 'vanity-length', label: 'Vanity Length' },
    { id: 'flooring-type', label: 'Flooring' }
  ];

  fields.forEach(field => {
    const el = document.getElementById(field.id);
    if (el && el.value) {
      html += `<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;">
        <strong>${field.label}:</strong> ${el.options[el.selectedIndex].text}
      </div>`;
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
      alert('Admin mode activated!');
    } else if (password) {
      alert('Incorrect password');
    }
  });

  document.getElementById('admin-logout-btn')?.addEventListener('click', () => {
    logoutAdmin();
    alert('Logged out');
  });

  // Setup admin for scope_of_work
  setupCategoryAdmin('scope_of_work');
}

function setupCategoryAdmin(category) {
  const addBtn = document.getElementById(`add-${category}-btn`);
  const deleteBtn = document.getElementById(`delete-${category}-btn`);
  const nameInput = document.getElementById(`add-${category}-name`);
  const priceInput = document.getElementById(`add-${category}-price`);
  const select = document.getElementById(`${category}-select`);

  if (addBtn && nameInput && priceInput) {
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
      alert(`Added "${name}" to ${category.replace('_', ' ')}`);
    });
  }

  if (deleteBtn && select) {
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
}
