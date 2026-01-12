export const DEFAULT_PRODUCTS = {
  bathtubs: [
    { id: "1", name: "Standard Alcove Tub", price: 450 },
    { id: "2", name: "Freestanding Soaking Tub", price: 1200 },
    { id: "3", name: "Walk-in Safety Tub", price: 3500 }
  ],
  showers: [
    { id: "1", name: "Standard Shower Stall", price: 800 },
    { id: "2", name: "Walk-in Shower", price: 1500 },
    { id: "3", name: "Custom Tile Shower", price: 3000 }
  ],
  trim: [
    { id: "1", name: "Chrome Faucet Set", price: 150 },
    { id: "2", name: "Brushed Nickel Fixtures", price: 200 },
    { id: "3", name: "Rainfall Showerhead", price: 250 }
  ],
  toilets: [
    { id: "1", name: "Standard Two-Piece", price: 250 },
    { id: "2", name: "One-Piece Elongated", price: 400 },
    { id: "3", name: "Wall-Mounted", price: 600 }
  ],
  sinks: [
    { id: "1", name: "Pedestal Sink", price: 200 },
    { id: "2", name: "Vanity with Sink", price: 500 },
    { id: "3", name: "Vessel Sink", price: 350 }
  ],
  tiles: [
    { id: "1", name: "Ceramic Floor Tile (per sq ft)", price: 5 },
    { id: "2", name: "Porcelain Wall Tile (per sq ft)", price: 8 },
    { id: "3", name: "Natural Stone (per sq ft)", price: 15 }
  ],
  labor: [
    { id: "1", name: "Basic Installation", price: 500 },
    { id: "2", name: "Full Bathroom Remodel", price: 5000 },
    { id: "3", name: "Plumbing Work (per hour)", price: 100 }
  ],
  scope_of_work: [
    { id: "1", name: "Demolition & Removal", price: 800 },
    { id: "2", name: "Plumbing Rough-In", price: 1200 },
    { id: "3", name: "Electrical Work", price: 1000 }
  ]
};

export let products = { ...DEFAULT_PRODUCTS };

export let selections = {
  bathtub: null,
  shower: null,
  trim: null,
  toilet: null,
  sink: null,
  tile: null,
  labor: null,
  scope_of_work: null
};

let isAdminMode = false;

// Load products from localStorage or use defaults
function loadProductsFromStorage() {
  const stored = localStorage.getItem('bathProducts');
  if (stored) {
    try {
      products = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load products from storage:', e);
      products = { ...DEFAULT_PRODUCTS };
    }
  } else {
    products = { ...DEFAULT_PRODUCTS };
  }
}

// Save products to localStorage
function saveProductsToStorage() {
  localStorage.setItem('bathProducts', JSON.stringify(products));
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

export function addItem(category, name, price) {
  if (!isAdminMode) {
    alert('Admin access required');
    return;
  }

  const newItem = {
    id: Date.now().toString(),
    name,
    price: parseFloat(price)
  };

  products[category].push(newItem);
  saveProductsToStorage();
  populateDropdowns();
  return newItem;
}

export function deleteItem(category, id) {
  if (!isAdminMode) {
    alert('Admin access required');
    return;
  }

  products[category] = products[category].filter(item => item.id !== id);
  saveProductsToStorage();
  populateDropdowns();
}

export async function initializeApp() {
  loadProductsFromStorage();
  populateDropdowns();
  attachEventListeners();
  setupAdminControls();
}

function populateDropdowns() {
  populateDropdown('bathtub-select', products.bathtubs);
  populateDropdown('shower-select', products.showers);
  populateDropdown('trim-select', products.trim);
  populateDropdown('toilet-select', products.toilets);
  populateDropdown('sink-select', products.sinks);
  populateDropdown('tile-select', products.tiles);
  populateDropdown('labor-select', products.labor);
}

function populateDropdown(selectId, items) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.innerHTML = '<option value="">-- Select --</option>';

  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = `${item.name} - $${parseFloat(item.price).toFixed(2)}`;
    option.dataset.price = item.price;
    option.dataset.name = item.name;
    select.appendChild(option);
  });
}

function attachEventListeners() {
  document.getElementById('bathtub-select')?.addEventListener('change', (e) => updateSelection('bathtub', e));
  document.getElementById('shower-select')?.addEventListener('change', (e) => updateSelection('shower', e));
  document.getElementById('trim-select')?.addEventListener('change', (e) => updateSelection('trim', e));
  document.getElementById('toilet-select')?.addEventListener('change', (e) => updateSelection('toilet', e));
  document.getElementById('sink-select')?.addEventListener('change', (e) => updateSelection('sink', e));
  document.getElementById('tile-select')?.addEventListener('change', (e) => updateSelection('tile', e));
  document.getElementById('labor-select')?.addEventListener('change', (e) => updateSelection('labor', e));
}

function setupAdminControls() {
  // Admin login button
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

  // Admin logout button
  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutAdmin();
      alert('Logged out of admin mode');
    });
  }

  // Setup add buttons for each category
  setupCategoryAdmin('bathtubs');
  setupCategoryAdmin('showers');
  setupCategoryAdmin('trim');
  setupCategoryAdmin('toilets');
  setupCategoryAdmin('sinks');
  setupCategoryAdmin('tiles');
  setupCategoryAdmin('labor');
  setupCategoryAdmin('scope_of_work');
}

function setupCategoryAdmin(category) {
  const addBtn = document.getElementById(`add-${category}-btn`);
  const nameInput = document.getElementById(`add-${category}-name`);
  const priceInput = document.getElementById(`add-${category}-price`);

  if (addBtn && nameInput && priceInput) {
    addBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      const price = priceInput.value.trim();

      if (name && price) {
        addItem(category, name, parseFloat(price));
        nameInput.value = '';
        priceInput.value = '';
        alert(`Added ${name} to ${category}!`);
      } else {
        alert('Please enter both name and price');
      }
    });
  }

  // Setup delete buttons
  const selectId = category === 'labor' ? 'labor-select' : `${category.slice(0, -1)}-select`;
  const deleteBtn = document.getElementById(`delete-${category}-btn`);
  const select = document.getElementById(selectId);

  if (deleteBtn && select) {
    deleteBtn.addEventListener('click', () => {
      const selectedId = select.value;
      if (selectedId) {
        const item = products[category].find(p => p.id === selectedId);
        if (item && confirm(`Delete ${item.name}?`)) {
          deleteItem(category, selectedId);
          alert('Item deleted!');
        }
      } else {
        alert('Please select an item to delete');
      }
    });
  }
}

function updateSelection(category, event) {
  const select = event.target;
  const selectedOption = select.options[select.selectedIndex];

  if (selectedOption.value) {
    selections[category] = {
      id: selectedOption.value,
      name: selectedOption.dataset.name,
      price: parseFloat(selectedOption.dataset.price)
    };
  } else {
    selections[category] = null;
  }

  updateSummary();
}

function updateSummary() {
  const summaryDiv = document.getElementById('summary');
  const totalDiv = document.getElementById('total');
  const emailBtn = document.getElementById('email-btn');

  let summaryHTML = '';
  let total = 0;

  Object.entries(selections).forEach(([category, item]) => {
    if (item) {
      const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);
      summaryHTML += `
        <div class="summary-item">
          <span class="summary-label">${displayCategory}:</span>
          <span class="summary-value">${item.name}</span>
          <span class="summary-price">$${item.price.toFixed(2)}</span>
        </div>
      `;
      total += item.price;
    }
  });

  if (summaryHTML) {
    summaryDiv.innerHTML = summaryHTML;
    totalDiv.innerHTML = `Total Estimate: <strong>$${total.toFixed(2)}</strong>`;
    if (emailBtn) emailBtn.disabled = false;
  } else {
    summaryDiv.innerHTML = '<p class="empty-message">Select items to see your estimate</p>';
    totalDiv.innerHTML = '';
    if (emailBtn) emailBtn.disabled = true;
  }
}

export function getSelections() {
  return selections;
}

export function generateEmailBody(selections) {
  let body = 'BATHROOM ESTIMATE QUOTE\n';
  body += '='.repeat(50) + '\n\n';

  let total = 0;

  const categoryNames = {
    bathtub: 'Bathtub',
    shower: 'Shower',
    trim: 'Trim & Fixtures',
    toilet: 'Toilet',
    sink: 'Sink',
    tile: 'Tile',
    labor: 'Labor & Installation'
  };

  Object.entries(selections).forEach(([category, item]) => {
    if (item) {
      body += `${categoryNames[category]}: ${item.name}\n`;
      body += `Price: $${item.price.toFixed(2)}\n\n`;
      total += item.price;
    }
  });

  body += '='.repeat(50) + '\n';
  body += `TOTAL ESTIMATE: $${total.toFixed(2)}\n`;
  body += '='.repeat(50) + '\n\n';
  body += 'Please contact us for more information or to proceed with your order.\n';
  body += 'Thank you for your interest in our bathroom products and services!';

  return body;
}
