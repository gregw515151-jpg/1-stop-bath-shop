// Login authentication logic
// Credentials are stored as SHA-256 hashes for basic security

const VALID_USER_HASH = 'c8522cb00d453cc0b55f8dda82e46c776769cc98e28744f2785d5f5c712425b4';
const VALID_PASS_HASH = '5a4938827bb714e7bde8c4635ae6ca3ffbadb0fc2991526315c91541c1dd0aa9';
const SESSION_KEY = 'estimatepro_session';
const SESSION_EXPIRY_KEY = 'estimatepro_session_expiry';

// SHA-256 hash function using Web Crypto API
async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Check if already logged in — redirect to app
function checkExistingSession() {
    const session = localStorage.getItem(SESSION_KEY);
    const expiry = localStorage.getItem(SESSION_EXPIRY_KEY);

    if (session && expiry) {
        const now = Date.now();
        if (now < parseInt(expiry)) {
            // Valid session exists, redirect to app
            window.location.href = '/';
            return true;
        } else {
            // Session expired, clear it
            localStorage.removeItem(SESSION_KEY);
            localStorage.removeItem(SESSION_EXPIRY_KEY);
        }
    }
    return false;
}

// Run session check on page load
checkExistingSession();

// Handle login form submission
const form = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');
const loginBtn = document.getElementById('login-btn');

form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    if (!username || !password) {
        showError('Please enter both username and password.');
        return;
    }

    // Disable button and show loading state
    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in...';
    errorMsg.classList.remove('show');

    try {
        // Hash the inputs and compare
        const userHash = await sha256(username);
        const passHash = await sha256(password);

        if (userHash === VALID_USER_HASH && passHash === VALID_PASS_HASH) {
            // Success! Create session
            const sessionToken = await sha256(username + Date.now().toString());
            const expiryTime = rememberMe
                ? Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
                : Date.now() + (8 * 60 * 60 * 1000);       // 8 hours

            localStorage.setItem(SESSION_KEY, sessionToken);
            localStorage.setItem(SESSION_EXPIRY_KEY, expiryTime.toString());

            // Brief success animation then redirect
            loginBtn.textContent = '✅ Welcome!';
            loginBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            setTimeout(() => {
                window.location.href = '/';
            }, 600);
        } else {
            showError('Invalid username or password. Please try again.');
            loginBtn.disabled = false;
            loginBtn.textContent = 'Sign In';
        }
    } catch (err) {
        console.error('Login error:', err);
        showError('An error occurred. Please try again.');
        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign In';
    }
});

function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.add('show');
    // Re-trigger shake animation
    errorMsg.style.animation = 'none';
    errorMsg.offsetHeight; // Force reflow
    errorMsg.style.animation = 'shake 0.5s ease';
}

// Allow Enter key to submit
document.getElementById('password')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
    }
});
