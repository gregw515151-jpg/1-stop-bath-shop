// Auto-Save Module for Bathroom Quote System
// Automatically saves form data to localStorage to prevent data loss

const AUTOSAVE_KEY = 'bathroom_quote_autosave';
const AUTOSAVE_TIMESTAMP_KEY = 'bathroom_quote_autosave_timestamp';
const SAVE_DELAY = 2000; // 2 seconds debounce

let saveTimeout = null;
let lastSaveTime = null;

/**
 * Debounced save function - saves data after user stops typing for SAVE_DELAY ms
 */
function debouncedSave() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        saveFormData();
    }, SAVE_DELAY);
}

/**
 * Collect all form data and save to localStorage
 */
export function saveFormData() {
    try {
        const data = {
            // Customer Details
            customerName: document.getElementById('customer-name')?.value || '',
            customerPhone: document.getElementById('customer-phone')?.value || '',
            customerEmail: document.getElementById('customer-email')?.value || '',
            customerAddress: document.getElementById('customer-address')?.value || '',
            customerNotes: document.getElementById('customer-notes')?.value || '',

            // Scope of Work checkboxes
            scopeOfWork: Array.from(document.querySelectorAll('.scope-item:checked')).map(cb => cb.value),

            // All select dropdowns
            selects: {},

            // All checkboxes (demo items, tile materials, plumbing materials, etc.)
            checkboxes: {},

            // All number inputs (quantities)
            quantities: {},

            // All textareas (section notes)
            textareas: {},

            // Photos
            photos: []
        };

        // Collect all select elements
        document.querySelectorAll('select').forEach(select => {
            if (select.id) {
                data.selects[select.id] = select.value;
            }
        });

        // Collect all checkboxes (grouped by class)
        const checkboxClasses = ['demo-item', 'electrical-item', 'accessory-item'];
        checkboxClasses.forEach(className => {
            data.checkboxes[className] = Array.from(document.querySelectorAll(`.${className}:checked`)).map(cb => cb.value);
        });

        // Collect tile materials checkboxes
        const tileMaterialsContainer = document.getElementById('tile-materials');
        if (tileMaterialsContainer) {
            data.checkboxes['tile-materials'] = Array.from(tileMaterialsContainer.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
        }

        // Collect plumbing materials checkboxes
        const plumbingMaterialsContainer = document.getElementById('plumbing-materials');
        if (plumbingMaterialsContainer) {
            data.checkboxes['plumbing-materials'] = Array.from(plumbingMaterialsContainer.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
        }

        // Collect splash options checkboxes
        const splashOptionsContainer = document.getElementById('splash-options');
        if (splashOptionsContainer) {
            data.checkboxes['splash-options'] = Array.from(splashOptionsContainer.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
        }

        // Collect all quantity inputs
        document.querySelectorAll('input[type="number"]').forEach(input => {
            if (input.id || input.className) {
                const key = input.id || input.className;
                data.quantities[key] = input.value;
            }
        });

        // Collect electrical quantities
        document.querySelectorAll('.electrical-qty').forEach(input => {
            const itemId = input.dataset.item;
            if (itemId) {
                data.quantities[`electrical-qty-${itemId}`] = input.value;
            }
        });

        // Collect accessory quantities
        document.querySelectorAll('.accessory-qty').forEach(input => {
            const itemId = input.dataset.item;
            if (itemId) {
                data.quantities[`accessory-qty-${itemId}`] = input.value;
            }
        });

        // Collect all textareas (section notes)
        const noteFields = [
            'demolition-notes',
            'electrical-notes',
            'fixtures-notes',
            'cabinetry-notes',
            'trim-notes',
            'flooring-notes',
            'tile-notes',
            'plumbing-notes',
            'bathroom-notes'
        ];
        noteFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                data.textareas[fieldId] = field.value;
            }
        });

        // Save to localStorage
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(data));
        localStorage.setItem(AUTOSAVE_TIMESTAMP_KEY, new Date().toISOString());
        lastSaveTime = new Date();

        // Update UI indicator
        updateSaveIndicator('saved');

        console.log('✅ Auto-save completed');
    } catch (error) {
        console.error('❌ Auto-save failed:', error);
        updateSaveIndicator('error');
    }
}

/**
 * Restore form data from localStorage
 */
export function restoreFormData() {
    try {
        const savedData = localStorage.getItem(AUTOSAVE_KEY);
        if (!savedData) {
            console.log('No auto-save data found');
            return false;
        }

        const data = JSON.parse(savedData);
        const timestamp = localStorage.getItem(AUTOSAVE_TIMESTAMP_KEY);

        console.log('📥 Restoring auto-saved data from:', timestamp);

        // Restore customer details
        if (data.customerName) document.getElementById('customer-name').value = data.customerName;
        if (data.customerPhone) document.getElementById('customer-phone').value = data.customerPhone;
        if (data.customerEmail) document.getElementById('customer-email').value = data.customerEmail;
        if (data.customerAddress) document.getElementById('customer-address').value = data.customerAddress;
        if (data.customerNotes) document.getElementById('customer-notes').value = data.customerNotes;

        // Restore scope of work checkboxes
        if (data.scopeOfWork && data.scopeOfWork.length > 0) {
            document.querySelectorAll('.scope-item').forEach(cb => {
                cb.checked = data.scopeOfWork.includes(cb.value);
            });
        }

        // Restore all select dropdowns
        if (data.selects) {
            Object.entries(data.selects).forEach(([id, value]) => {
                const select = document.getElementById(id);
                if (select && value) {
                    select.value = value;
                }
            });
        }

        // Restore checkboxes
        if (data.checkboxes) {
            Object.entries(data.checkboxes).forEach(([className, values]) => {
                if (className === 'tile-materials') {
                    const container = document.getElementById('tile-materials');
                    if (container) {
                        container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                            cb.checked = values.includes(cb.value);
                        });
                    }
                } else if (className === 'plumbing-materials') {
                    const container = document.getElementById('plumbing-materials');
                    if (container) {
                        container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                            cb.checked = values.includes(cb.value);
                        });
                    }
                } else if (className === 'splash-options') {
                    const container = document.getElementById('splash-options');
                    if (container) {
                        container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                            cb.checked = values.includes(cb.value);
                        });
                    }
                } else {
                    document.querySelectorAll(`.${className}`).forEach(cb => {
                        cb.checked = values.includes(cb.value);
                    });
                }
            });
        }

        // Restore quantities
        if (data.quantities) {
            Object.entries(data.quantities).forEach(([key, value]) => {
                if (key.startsWith('electrical-qty-')) {
                    const itemId = key.replace('electrical-qty-', '');
                    const input = document.querySelector(`.electrical-qty[data-item="${itemId}"]`);
                    if (input && value) {
                        input.value = value;
                    }
                } else if (key.startsWith('accessory-qty-')) {
                    const itemId = key.replace('accessory-qty-', '');
                    const input = document.querySelector(`.accessory-qty[data-item="${itemId}"]`);
                    if (input && value) {
                        input.value = value;
                    }
                } else {
                    const input = document.getElementById(key) || document.querySelector(`.${key}`);
                    if (input && value) {
                        input.value = value;
                    }
                }
            });
        }

        // Restore textareas
        if (data.textareas) {
            Object.entries(data.textareas).forEach(([id, value]) => {
                const textarea = document.getElementById(id);
                if (textarea && value) {
                    textarea.value = value;
                }
            });
        }

        // Show notification
        showRestoreNotification(timestamp);

        // Trigger summary update
        setTimeout(() => {
            const event = new Event('change', { bubbles: true });
            document.querySelector('select')?.dispatchEvent(event);
        }, 100);

        return true;
    } catch (error) {
        console.error('❌ Auto-restore failed:', error);
        return false;
    }
}

/**
 * Clear auto-save data from localStorage
 */
export function clearAutoSave() {
    try {
        localStorage.removeItem(AUTOSAVE_KEY);
        localStorage.removeItem(AUTOSAVE_TIMESTAMP_KEY);
        lastSaveTime = null;
        updateSaveIndicator('cleared');
        console.log('🗑️ Auto-save data cleared');
    } catch (error) {
        console.error('❌ Failed to clear auto-save:', error);
    }
}

/**
 * Initialize auto-save functionality
 */
export function initAutoSave() {
    console.log('🔄 Initializing auto-save...');

    // Restore data on page load
    const restored = restoreFormData();

    // Set up event listeners for auto-save
    const formElements = [
        'input[type="text"]',
        'input[type="email"]',
        'input[type="tel"]',
        'input[type="number"]',
        'textarea',
        'select',
        'input[type="checkbox"]'
    ];

    formElements.forEach(selector => {
        document.addEventListener('input', (e) => {
            if (e.target.matches(selector)) {
                updateSaveIndicator('saving');
                debouncedSave();
            }
        });

        document.addEventListener('change', (e) => {
            if (e.target.matches(selector)) {
                updateSaveIndicator('saving');
                debouncedSave();
            }
        });
    });

    // Add auto-save indicator to UI
    addSaveIndicator();

    console.log('✅ Auto-save initialized');
}

/**
 * Add save indicator to the UI
 */
function addSaveIndicator() {
    const header = document.querySelector('header');
    if (!header) return;

    const indicator = document.createElement('div');
    indicator.id = 'autosave-indicator';
    indicator.style.cssText = `
    position: absolute;
    top: 40px;
    left: 0;
    font-size: 12px;
    color: #6b7280;
    padding: 4px 8px;
    border-radius: 4px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    opacity: 0;
    transition: opacity 0.3s;
  `;
    indicator.innerHTML = '💾 Auto-saved';

    header.appendChild(indicator);
}

/**
 * Update save indicator status
 */
function updateSaveIndicator(status) {
    const indicator = document.getElementById('autosave-indicator');
    if (!indicator) return;

    switch (status) {
        case 'saving':
            indicator.innerHTML = '💾 Saving...';
            indicator.style.opacity = '1';
            indicator.style.color = '#3b82f6';
            break;
        case 'saved':
            indicator.innerHTML = '✓ Auto-saved';
            indicator.style.opacity = '1';
            indicator.style.color = '#10b981';
            // Fade out after 2 seconds
            setTimeout(() => {
                indicator.style.opacity = '0';
            }, 2000);
            break;
        case 'error':
            indicator.innerHTML = '⚠️ Save failed';
            indicator.style.opacity = '1';
            indicator.style.color = '#ef4444';
            setTimeout(() => {
                indicator.style.opacity = '0';
            }, 3000);
            break;
        case 'cleared':
            indicator.style.opacity = '0';
            break;
    }
}

/**
 * Show notification when data is restored
 */
function showRestoreNotification(timestamp) {
    const notification = document.createElement('div');
    notification.style.cssText = `
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: #10b981;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    font-size: 14px;
    font-weight: 500;
    animation: slideDown 0.3s ease-out;
  `;

    const timeAgo = timestamp ? new Date(timestamp).toLocaleString() : 'recently';
    notification.innerHTML = `📥 Previous work restored (saved ${timeAgo})`;

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      transform: translateX(-50%) translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    to {
      transform: translateX(-50%) translateY(-20px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
