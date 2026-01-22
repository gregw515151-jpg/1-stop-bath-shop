import { supabase } from './supabaseClient.js';
import { getSelections, products } from './app.js';

export async function saveDraft(name) {
    if (!name) return { error: 'Name is required' };

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
        'tile-notes', 'plumbing-notes', 'bathroom-notes'
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
    // For dropdowns, we might need to manually trigger change events if the app relies on them
    // But since getSelections() object is updated, any *future* reads will be correct.
    // The visual dropdowns need to be set to match the state.
    restoreDropdownsFromState(draft.selections);

    return { data };
}

function restoreDropdownsFromState(selections) {
    // Helper to set dropdown values based on restored state
    // This assumes the keys in `selections` match the IDs of the dropdowns or we have a mapping
    // Looking at app.js, `selections` keys often match IDs but not always.
    // We can try to map them or iterate known inputs.

    // Simple update for known keys that match element IDs
    // (This is a simplified approach, may need refinement based on exact app.js logic)

    // Example: selections.plumbing_color -> document.getElementById('plumbing-color')
    Object.entries(selections).forEach(([key, val]) => {
        // Many selection keys match the element ID directly or with hyphen replacements
        let el = document.getElementById(key);
        if (!el) el = document.getElementById(key.replace(/_/g, '-'));

        if (el && (el.tagName === 'SELECT' || el.tagName === 'INPUT')) {
            el.value = val || '';
        }
    });

    // Checkboxes for Scope of Work need special handling
    if (selections.scope_of_work) {
        // This is a bit complex as scope_of_work is array of objects in products
        // but selection state might track it differently. 
        // Looking at app.js: populateScopeOfWork() generates inputs with class 'scope-item'
        // We should re-trigger the checkbox checks based on loaded data if needed.
    }
}
