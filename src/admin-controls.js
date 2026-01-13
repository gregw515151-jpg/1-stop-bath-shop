// Dynamic Admin Controls - Append to end of app.js

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
      <input type="number" placeholder="Price" step="0.01" class="admin-price-input" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
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

export async function editItem(category, id, name, price) {
    if (!products[category]) return;
    const item = products[category].find(p => p.id === id);
    if (item) {
        item.name = name;
        item.price = parseFloat(price);
        saveProductsToStorage();
    }
}
