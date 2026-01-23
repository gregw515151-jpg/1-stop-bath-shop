import { supabase } from './supabaseClient.js';
import { getSelections, products } from './app.js';

export async function saveDraft(name) {
    if (!name) return { error: 'Name is required' };

    // CRITICAL: Call updateSummary() to populate selections object from current DOM state
    // This ensures all form values (dropdowns, checkboxes, inputs) are captured
    if (typeof window.updateSummary === 'function') {
        window.updateSummary();
    }

    const selections = getSelections();

    // Collect customer info from DOM
    const customer = {
        name: document.getElementById('customer-name')?.value || '',
        address: document.getElementById('customer-address')?.value || '',
        phone: document.getElementById('customer-phone')?.value || '',
        email: document.getElementById('customer-email')?.value || '',
        notes: document.getElementById('customer-notes')?.value || ''
    };

    // Collect all notes
    const noteFields = [
        'demolition-notes', 'electrical-notes', 'fixtures-notes',
        'cabinetry-notes', 'trim-notes', 'flooring-notes',
        'tile-notes', 'plumbing-notes', 'bathroom-notes',
        'change-order-notes', 'labor-notes'
    ];

    const notes = {};
    noteFields.forEach(id => {
        notes[id] = document.getElementById(id)?.value || '';
    });

    const draftData = {
        selections,
        customer,
        notes,
        // We are NOT saving the entire products definition, just the user choices
        // Photos are heavy, but we could try to save them if they are small data URLs. 
        // For V1, let's skip photos or warn the user.
        timestamp: new Date().toISOString()
    };

    console.log('💾 Saving draft data:', draftData); // Debug log

    const { data, error } = await supabase
        .from('drafts')
        .insert([
            { name: name, data: draftData }
        ])
        .select();

    return { data, error };
}

export async function getDrafts() {
    const { data, error } = await supabase
        .from('drafts')
        .select('id, name, created_at')
        .order('created_at', { ascending: false });

    return { data, error };
}

export async function loadDraft(id) {
    const { data, error } = await supabase
        .from('drafts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return { error };

    const draft = data.data;

    // restore selections
    if (draft.selections) {
        const currentSelections = getSelections();
        Object.assign(currentSelections, draft.selections);
    }

    // restore customer info
    if (draft.customer) {
        if (draft.customer.name) document.getElementById('customer-name').value = draft.customer.name;
        if (draft.customer.address) document.getElementById('customer-address').value = draft.customer.address;
        if (draft.customer.phone) document.getElementById('customer-phone').value = draft.customer.phone;
        if (draft.customer.email) document.getElementById('customer-email').value = draft.customer.email;
        if (draft.customer.notes) document.getElementById('customer-notes').value = draft.customer.notes;
    }

    // restore notes
    if (draft.notes) {
        Object.entries(draft.notes).forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (el) el.value = val;
        });
    }

    // Trigger necessary UI updates
    restoreDropdownsFromState(draft.selections);

    return { data };
}

function restoreDropdownsFromState(selections) {
    if (!selections) {
        return;
    }

    console.log('📂 Restoring selections:', selections); // Debug log

    // Restore all dropdown and input values
    Object.entries(selections).forEach(([key, val]) => {
        let el = document.getElementById(key);
        if (!el) el = document.getElementById(key.replace(/_/g, '-'));

        if (el && (el.tagName === 'SELECT' || el.tagName === 'INPUT')) {
            el.value = val || '';
            // Trigger change to update summary
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });

    // Checkboxes for Scope of Work need special handling
    if (selections.scope_of_work) {
        const scopeNames = selections.scope_of_work.split(', ').map(s => s.trim());
        document.querySelectorAll('.scope-item').forEach(cb => {
            const cbValue = cb.value.replace(/&quot;/g, '"');
            cb.checked = scopeNames.includes(cbValue);
        });
    }

    // Restore demo checkboxes
    if (selections.demo_items && Array.isArray(selections.demo_items)) {
        document.querySelectorAll('.demo-item').forEach(cb => {
            cb.checked = selections.demo_items.includes(cb.value);
        });
    }

    // Restore Tile Materials (New Format)
    if (selections.tile_materials_data && Array.isArray(selections.tile_materials_data)) {
        selections.tile_materials_data.forEach(item => {
            const cb = document.querySelector(`.tile-item[value="${item.id}"]`);
            if (cb) {
                cb.checked = true;
                const qtyInput = document.querySelector(`.tile-qty[data-item="${item.id}"]`);
                if (qtyInput) qtyInput.value = item.qty;
            }
        });
    }

    // Restore Plumbing Materials (New Format)
    if (selections.plumbing_materials_data && Array.isArray(selections.plumbing_materials_data)) {
        selections.plumbing_materials_data.forEach(item => {
            const cb = document.querySelector(`.plumbing-item[value="${item.id}"]`);
            if (cb) {
                cb.checked = true;
                const qtyInput = document.querySelector(`.plumbing-qty[data-item="${item.id}"]`);
                if (qtyInput) qtyInput.value = item.qty;
            }
        });
    }

    // Restore Electrical Items (New Format)
    if (selections.electrical_items_data && Array.isArray(selections.electrical_items_data)) {
        selections.electrical_items_data.forEach(item => {
            const cb = document.querySelector(`.electrical-item[value="${item.id}"]`);
            if (cb) {
                cb.checked = true;
                const qtyInput = document.querySelector(`.electrical-qty[data-item="${item.id}"]`);
                if (qtyInput) qtyInput.value = item.qty;
            }
        });
    }

    // Restore Accessory Items (New Format)
    if (selections.accessory_items_data && Array.isArray(selections.accessory_items_data)) {
        selections.accessory_items_data.forEach(item => {
            const cb = document.querySelector(`.accessory-item[value="${item.id}"]`);
            if (cb) {
                cb.checked = true;
                const qtyInput = document.querySelector(`.accessory-qty[data-item="${item.id}"]`);
                if (qtyInput) qtyInput.value = item.qty;
            }
        });
    }

    // Restore Splash Options (New Format)
    if (selections.splash_options_data && Array.isArray(selections.splash_options_data)) {
        selections.splash_options_data.forEach(itemId => {
            const cb = document.querySelector(`.splash-option[value="${itemId}"]`);
            if (cb) cb.checked = true;
        });
    }

    // Restore Change Order Items
    if (selections.change_order_items_data && Array.isArray(selections.change_order_items_data)) {
        selections.change_order_items_data.forEach(item => {
            const cb = document.querySelector(`.change-order-item[value="${item.id}"]`);
            if (cb) {
                cb.checked = true;
                const qtyInput = document.querySelector(`.change-order-qty[data-item="${item.id}"]`);
                if (qtyInput) qtyInput.value = item.qty;
            }
        });
    }

    // Restore Labor Items
    if (selections.labor_items_data && Array.isArray(selections.labor_items_data)) {
        selections.labor_items_data.forEach(item => {
            const cb = document.querySelector(`.labor-item[value="${item.id}"]`);
            if (cb) {
                cb.checked = true;
                const qtyInput = document.querySelector(`.labor-qty[data-item="${item.id}"]`);
                if (qtyInput) qtyInput.value = item.qty;
            }
        });
    }

    // Trigger updateSummary to refresh the display
    if (typeof window.updateSummary === 'function') {
        window.updateSummary();
    }
}

